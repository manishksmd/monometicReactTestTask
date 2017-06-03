/**
 * @class         :	Mometic
 * @description   : 
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ANOTHERFORM from './AnotherForm';
import LISTQUOTE from './ListQuotes';
import moment from 'moment';
import Alert from 'react-s-alert';

class Mometic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime : null
        };
    }

    componentDidMount(){        
        document.title = "React Test Project";
    }

    render() {
        return (
        <div>
        <div className="container-fluid">
        <div className="row">
        <div>
        <header>
            <div className="logo-brand">
                <a href="javascript:void(0)"><img src="/client/assets/template/images/logo.png" alt="Logo" /></a>
            </div>
        </header>
        <main>
        <Alert stack={{limit: 3}} />
            <div className="top-panel">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                        <div className="tab_container">
                            <h3 className="d_active tab_drawer_heading" rel="tab1">Tab 1</h3>
                            <div id="tab1" className="tab_content">
                                      <div className="table-wrapper">
                                        <div className="width-50">
                                            <table width="100%" cellSpacing="0" cellPadding="0" className="red-content table table-hover">
                                             <tbody>
                                              <tr>
                                                <td>CADC</td>
                                                <td>2</td>
                                                <td>2.25</td>
                                              </tr>
                                              <tr>
                                                <td>APR</td>
                                                <td>46</td>
                                                <td>24.89</td>
                                              </tr>
                                              <tr>
                                                <td>LKSD</td>
                                                <td>49</td>
                                                <td>21.95</td>
                                              </tr>
                                              <tr>
                                                <td>LSI</td>
                                                <td>6</td>
                                                <td>73.75</td>
                                              </tr>
                                              <tr>
                                                <td>CHI</td>
                                                <td>12</td>
                                                <td>11.11</td>
                                              </tr>
                                              <tr>
                                                <td>PFBX</td>
                                                <td>3</td>
                                                <td>13.75</td>
                                              </tr>
                                              <tr>
                                                <td>PEO</td>
                                                <td>11</td>
                                                <td>19.14</td>
                                              </tr>
                                              <tr>
                                                <td>CUBE</td>
                                                <td>31</td>
                                                <td>24.62</td>
                                              </tr>
                                              <tr>
                                                <td>HPP</td>
                                                <td>19</td>
                                                <td>33.36</td>
                                              </tr>
                                              <tr>
                                                <td>KCAP</td>
                                                <td>13</td>
                                                <td>3.58</td>
                                              </tr>
                                              <tr>
                                                <td>IRDM</td>
                                                <td>14</td>
                                                <td>10.25</td>
                                              </tr>
                                              <tr>
                                                <td>LSI</td>
                                                <td>5</td>
                                                <td>73.77</td>
                                              </tr>
                                              <tr>
                                                <td>ZBIO</td>
                                                <td>7</td>
                                                <td>16.65</td>
                                              </tr>
                                              <tr>
                                                <td>GEO</td>
                                                <td>47</td>
                                                <td>31.94</td>
                                              </tr>
                                              <tr>
                                                <td>GEO</td>
                                                <td>46</td>
                                                <td>31.95</td>
                                              </tr>
                                              </tbody>
                                            </table>
        
                                        </div>
                                        <div className="width-50">
                                            <table width="100%"  cellSpacing="0" cellPadding="0" className="green-content table table-hover">
                                              <tbody>
                                              <tr>
                                                <td>PHM</td>
                                                <td>65</td>
                                                <td>22.71</td>
                                              </tr>
                                              <tr>
                                                <td>FEM</td>
                                                <td>6</td>
                                                <td>22.53</td>
                                              </tr>
                                              <tr>
                                                <td>WCC</td>
                                                <td>5</td>
                                                <td>63.25</td>
                                              </tr>
                                              <tr>
                                                <td>SHOP</td>
                                                <td>120 <img src="/client/assets/template/images/st-img.png" alt="" /></td>
                                                <td>89.74</td>
                                              </tr>
                                              <tr>
                                                <td>LVS</td>
                                                <td>39</td>
                                                <td>57.90</td>
                                              </tr>
                                              <tr>
                                                <td>LVS</td>
                                                <td>38</td>
                                                <td>57.89</td>
                                              </tr>
                                              <tr>
                                                <td>LVS</td>
                                                <td>37</td>
                                                <td>57.88</td>
                                              </tr>
                                              <tr>
                                                <td>PHM</td>
                                                <td>64</td>
                                                <td>22.71</td>
                                              </tr>
                                              <tr>
                                                <td>PHM</td>
                                                <td>63</td>
                                                <td>22.70</td>
                                              </tr>
                                              <tr>
                                                <td>DGLT</td>
                                                <td>4</td>
                                                <td>3.45</td>
                                              </tr>
                                              <tr>
                                                <td>CHN</td>
                                                <td>8</td>
                                                <td>17.67</td>
                                              </tr>
                                              <tr>
                                                <td>AAOI</td>
                                                <td>96</td>
                                                <td>59.39</td>
                                              </tr>
                                              <tr>
                                                <td>NVDA</td>
                                                <td>140</td>
                                                <td>104.49</td>
                                              </tr>
                                              <tr>
                                                <td>BZH</td>
                                                <td>67</td>
                                                <td>14.34</td>
                                              </tr>
                                              <tr>
                                                <td>AQXP</td>
                                                <td>14</td>
                                                <td>14.06</td>
                                              </tr>
                                              </tbody>
                                            </table>
        
                                        </div>
                                      </div>
                            </div>
                            {/*<!-- #tab1 -->*/}
                            <h3 className="tab_drawer_heading" rel="tab2">Tab 2</h3>
                                  <div id="tab2" className="tab_content">
                                   <h2>Coming Soon...</h2>
                                    {/*<div className="">
                                      <div className="col-sm-6 col-sm-offset-3">
        
                                        <form>
                                          <div className="form-group">
                                              <label>First Name</label>
                                              <input type="text" id="fname" className="form-control" placeholder="First Name"/>
                                          </div>
                                          <div className="form-group">
                                              <label >Last Name</label>
                                              <input type="text" id="lname" className="form-control" placeholder="Last Name"/>
                                          </div>
                                          <div className="form-group">
                                              <label>Email Address</label>
                                              <input type="email" id="addMore" className="form-control" placeholder="Email Address"/>
                                          </div>
                                          <div className="form-group">
                                              <label>Phone Number</label>
                                              <input type="text" id="phone" className="form-control" placeholder="Phone Number"/>
                                          </div>
                                          <div className="form-group">
                                              <button className="btn btn-primary">Submit</button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>*/}
                                  </div>
                                  {/*<!-- #tab2 -->*/}
                                  <h3 className="tab_drawer_heading" rel="tab3">Tab 3</h3>
                                  <div id="tab3" className="tab_content">
                                      <h2>Coming Soon...</h2>
                                      
                                  </div>
                                 {/*<!-- #tab3 -->*/}
                                 <h3 className="tab_drawer_heading" rel="tab4">Tab 4</h3>
                                    <div id="tab4" className="tab_content">
                                       <h2>Coming Soon...</h2>
                                    </div>
                                  {/*<!-- #tab4 -->*/}

                        </div>
                        {/*<!-- .tab_container -->*/}
                        </div>
                        </div>
                    </div>
                </div>
            
            <div className="bottom-panel">
                {/*<span id="slider-anchor"><a href="javascript:void(0)">
                  <i className="fa fa-arrow-circle-down" aria-hidden="true"></i></a>
                </span>*/}
                <div className="container-fluid">
                    <div className="row">
                        <LISTQUOTE />
                        <div className="col-sm-12">
                        <ul className="rows tabs">
                            <li className="col-sm-3 active" rel="tab1">Quote</li>
                            <li rel="tab2" className="col-sm-3">Popular</li>
                            <li rel="tab3" className="col-sm-3">Filter</li>
                            <li rel="tab4" className="col-sm-3">Alert</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
    </main>
    </div>
    </div>
    </div>
    </div>
        );
    }
}

export default connect(null, null)(Mometic);