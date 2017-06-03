/**
 * @class         :	404
 * @description   : Not Found
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { getStockExchangeQuote, getQuoteData, deleteQuote, addQuote, notEligibleForQuote } from '../../actions';
import Alert from 'react-s-alert';
import { Scrollbars } from 'react-custom-scrollbars';


class ListQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime : null,
            quoteData : [],
            stockData : [],
            inputVal : null
        };
    }

    componentWillMount() {
        let currentTime = moment().format('HH:MM');
        this.setState({ currentTime : currentTime });
        let This = this;
        this.props.getQuoteData();
        setInterval(function(){ 
            This.props.getQuoteData();            
         }, 30000); // 30 sec - 30000
    }

    componentWillReceiveProps( nextProps ) {

        if ( nextProps.quoteData && this.props.quoteData !== nextProps.quoteData ) {
                   
            let quote = nextProps.quoteData;
            this.setState( { quoteData : quote } );
        }
        if ( nextProps.stockData && this.props.stockData !== nextProps.stockData ) {
                   
            let seqData = nextProps.stockData;
            this.setState( { stockData : seqData } );
        }        
    }

    deleteRow(e, deleteId) {
        e.preventDefault();        
        // call api to delete row
        this.props.deleteQuote(deleteId);       
    }

    renderLists() {
        
        if(this.state.quoteData.length === 0) {
            return(
                <li className="col-sm-12">
                    <div className="row col-sm-12">
                        <h5>No quote available.</h5>
                    </div>
                </li>
                
            );
        }
        
        if(this.state.quoteData) {
            
            return this.state.quoteData.map((quote) => {console.log(quote);
                return(
                    <li className="col-sm-12" key={quote.id} id={`row_${quote.id}`}>
                        <div className="">
                            <div className="col-xs-2">
                                <h5>{ quote.symbol }</h5>
                            </div>
                               <div className="col-xs-6">
                                <div className="row">
                                    <div className="col-xs-4">
                                        <h5>LAST <span>{ quote.last }</span></h5>
                                    </div>
                                    <div className="col-xs-4">
                                        <h5>High <span>{ quote.high }</span></h5>
                                    </div>
                                    <div className="col-xs-4">
                                        <h5>Low <span>{ quote.low  }</span></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <h5>Vol <span>{ quote.volume || 'NA'}</span></h5>
                                <span className="pull-right">
                                    <a onClick={(e)=>this.deleteRow(e, quote.id)} href="javascript:void(0)" className="remove"><img src="/client/assets/template/images/close.png" alt="" /></a>
                                </span>
                            </div>
                        </div>
                    </li>
                    );
            });
        }        
    }

    changeInputState(e) {
        e.preventDefault();

        if(e.target.value.length === 0) {
        this.setState({ stockData : [] });
        }
        this.setState({ inputVal : e.target.value });
        
    }

    onEnter(e) {
        if(this.state.inputVal) {
            if (e.which == 13 || e.keyCode == 13) {
                //code to execute here //return false;                
                this.apiCallAddQuote();
            }
        }
    }

    onClickEnterIcon(e) {
        if(this.state.inputVal) {
            this.apiCallAddQuote();
        }        
    }

    apiCallAddQuote() {
        this.props.getStockExchangeQuote(this.state.inputVal);
        
        if(this.state.quoteData.length >= 15) {
            this.props.notEligibleForQuote();
        } else {
            this.props.addQuote(this.state.inputVal);
               
            let This = this;
            setTimeout(function() {
                This.setState( { stockData : [], inputVal: null } );  
            }, 3000);
        }
    }

    render() {
        return (
          <div>
          <div className="col-sm-12">

            <span className="time text-right pull-right">                
                { this.state.currentTime } EST                
            </span>
            <span className="loaderimg text-right pull-right"> 
            <i style= {{'display' : this.props.isFetching ? 'inline-block' : 'none', height:'auto' }} className="fa fa-spinner" aria-hidden="true"></i>                         
            </span>
            <div className="inner-scroll">
            <ul className="">
                <Scrollbars style={{ height: 200 }}>
                { this.renderLists() } 
                </Scrollbars>
                
            </ul>
            </div>            
            </div>
            <div className="col-sm-12 fixed-input">
                <div className="col-md-2 textCenter">
                   <input
                                required
                                type="text"
                                className="form-control"
                                id="inputQuote"
                                placeholder="Symbol"
                                maxLength="30"                                
                                value={ this.state.inputVal === null ? '' : this.state.inputVal }
                                onKeyPress={(e)=>this.onEnter(e)}
                                onChange={(e)=>this.changeInputState(e)} />
                        <span onClick={(e)=>this.onClickEnterIcon(e)}><img src="/client/assets/template/images/enter.png" alt="Enter"/></span>
                </div>
                    <div className="col-md-6 textCenter">
                    <div className="row">
                        <div className="col-xs-4">
                            <h5>LAST <span>{ this.state.stockData ? this.state.stockData.last : 'N/A' }</span></h5>
                        </div>
                        <div className="col-xs-4">
                            <h5>High <span>{ this.state.stockData ? this.state.stockData.high : 'N/A' }</span></h5>
                        </div>
                        <div className="col-xs-4">
                            <h5>Low <span>{ this.state.stockData ? this.state.stockData.low : 'N/A' }</span></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 textCenter">
                    <h5>Vol <span>{ this.state.stockData ? this.state.stockData.volume : 'N/A' }</span></h5>                    
                </div>
            </div>            
            </div>
        );
    }
}

function mapStateToProps(state) {
     return {
         isFetching : state.quoteData.isFetching,
         quoteData : state.quoteData.data,
         stockData : state.quoteData.stockData,
         isAuthenticating : state.quoteData.isAuthenticating,
         statusText : state.quoteData.statusText,
         isSubmitting : state.quoteData.isSubmitting,
         statusColor : state.quoteData.statusColor
     }
}

export default connect(mapStateToProps, { getStockExchangeQuote, 
                                          getQuoteData, 
                                          deleteQuote, 
                                          addQuote, 
                                          notEligibleForQuote })(ListQuote);
