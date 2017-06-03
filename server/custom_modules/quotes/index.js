import Quotes from './models/quotes.js';
import mongoose from 'mongoose';
import fs from 'fs';
import request  from 'request';


module.exports = class User {
    constructor(req, res, next) {
       this.res = res;
       this.req = req;
       this.next = next;
    }

/*To add new questionnaire category*/
    insertSymbol() {
      console.log("inside controller");
      let _this = this;
      let data = this.req.body;
      console.log(data);
      //_this.res.status(200).send({res: 'done'});

      this.getSymbolDetails(data,function(symbolDetails){
      	console.log(symbolDetails);
        if(symbolDetails.last != "" && symbolDetails.last != undefined) {
          Quotes.insertQuote(symbolDetails, function(err, data){
            console.log(err);
            if(err) _this.res.status(500).send(err.errmsg);

            return _this.res.status(200).send({message: "Symbol added successfully","status":"1"});
          });
        } else {
          return _this.res.status(500).send({message: "Symbol does not exists.","status":"0"});
        }
      });

      

      
    }

    getSymbolDetails(quoteDetails,callBack) {
      console.log("inside getSymbolDetails = ", quoteDetails.symbol);
      let url = 'http://momo-activetick.elasticbeanstalk.com/quoteData?symbol='+quoteDetails.symbol+'&field=4+10+11+27';
      //let url = 'http://alpha.foomanchew.com/uber/mean.php?symbol=' + quoteDetails.symbol;
      request(url, function (error, response, apiResponse) {
        
        //let apiResponse = 'GOOGLE,1,5,1,7,153.4555,10,1,7,153.7111,11,1,7,152.3100,27,1,4,1921232';

        var data = apiResponse.split(',');
        
        let quoteData = {
          symbol: data[0],
          last: data[5],
          high: data[9],
          low: data[13],
          volume: data[17]
        };

        if(quoteDetails._id !="") {
          quoteData.id = quoteDetails._id;
        }

        callBack(quoteData);
      });

      
    }



    checkSymbolExists() {
      console.log("inside controller");
      let _this = this;
      let symbol = this.req.body.symbol;

      //_this.res.status(200).send({res: 'done'});

      Quotes.findSymbol(symbol, function(err, data){
        if(err) _this.res.status(500).send();

        if(data) {
          console.log(symbol+ " already exists");
          _this.res.status(401).json({message: symbol+" already exists", status:"0"});
        } else {
          _this.next();
        }

      });
    }

    fetchQuotes() {
      console.log("Insde controller: fetchQuotes()");

      let _this = this;
      Quotes.findAllQuotes(function(err, quotes){
        if(err) _this.res.status(500).send();
        
        if (quotes.length==0) {
           _this.res.status(200).json({data:[], status:"1",adminLogin:true});
        }

        if(quotes) {
            
          let quotesData = [];

          try{ 
            for (var i = 0; i <quotes.length; i++) {
               
              let symbol = quotes[i].symbol;
              let dataCount = quotes.length;
                let allQuotes = quotes;
              _this.getSymbolDetails(quotes[i],function(symbolDetails){
                
                quotesData.push(symbolDetails);
                
                if(dataCount == quotesData.length) {
                   
                    var result = [];
                    allQuotes.forEach(function(key) {
                        var found = false;
                        
                        quotesData = quotesData.filter(function(item) {
                            try{
                                if(!found && item.id == key._id) {
                                    result.push(item);
                                    found = true;
                                    return false;
                                } else 
                                    return true;
                            } catch(e) {
                                console.log(e);
                            }
                        })
                        if (result.length == dataCount) {
                            try{
                                console.log(result.length);
                                _this.res.status(200).json({data:result, status:"1",adminLogin:true});
                            } catch(e) {
                                console.log(e);
                            }
                        }
                        
                    })
                }
              });
            }
          } catch(e) {
            console.log(e);
          }
         
        }

      });

    }

    getQuoueDetails() {
      let _this = this;
      let symbol = this.req.params.symbol;

      _this.getSymbolDetails({symbol:symbol},function(symbolDetails){
        _this.res.status(200).json({data:symbolDetails, status:"1"});
      });
    }

    // loginUser() {
    //   console.log("Insde controller: loginUser()");
    //   let _this = this;
    //   let email = this.req.body.email;
    //   let password = this.req.body.password;

    //   let userObj = {email, password};

    //   Users.authenticateUser(userObj, function(err, data){
    //       if(err) _this.res.status(500).send();

    //       console.log("user data in controller: ", data);

    //       if(data) {
    //         _this.res.status(200).json({data:data, status:"1"});
    //       }

    //   });

    // }

    deleteQuote() {
      let _this = this;
      let quote_id = this.req.params.id;

      Quotes.deleteQuote(quote_id, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json(data);
          }
      });
    }

    // fetchUser() {
    //   let _this = this;
    //   let user_id = this.req.params.id;

    //   Users.fetchUserData(user_id, function(err, data){
    //       if(err) _this.res.status(500).send();

    //       if(data) {
    //         _this.res.status(200).json(data);
    //       }
    //   });
    // }


    // updateUser() {
    //   console.log("Insde controller: updateUser()");
    //   let data = this.req.body;
    //   let _this = this;
    //   console.log(data);
    //   if("profile_image" in  data) {
    //     let image_name = __dirname + '/../../public/images/user_images/' + data.id + '.png';
    //     let buff = new Buffer(data.profile_image
    //         .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

    //     fs.writeFile(image_name, buff, function (err) {
    //         console.log('done');
    //     });
    //   }
      


    //   Users.updateUserDetail(data, function(err, data){
    //       if(err) _this.res.status(500).send(err);

    //       if(data.n==1) {
    //         return _this.res.status(200).send({message: "User updated successfully","status":"1"});
    //       } else {

    //       }

    //       return _this.res.status(200).send({message: "Data not updated","status":"0"});

    //   });
    // }

    // fetchUserByEmail() {
    //   console.log("inside controller");
    //   let _this = this;
    //   let email = this.req.body.email;

    //   //_this.res.status(200).send({res: 'done'});

    //   Users.findUser(email, function(err, data){
    //       if(err) _this.res.status(500).send();

    //       if(data) {
    //         console.log(email+ " already exists");
    //         return _this.res.status(200).json({message: email+" already exists", status:"0"});
    //       }

    //       return _this.res.status(200).send({message: "","status":"1"});

    //   });
    // }



}
