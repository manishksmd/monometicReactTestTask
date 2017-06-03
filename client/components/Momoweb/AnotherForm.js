/**
 * @class         :	404
 * @description   : Not Found
 * @Created by    : smartData
 */

import React, { Component } from 'react';

import { Link } from 'react-router';

export default class AddQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime : null
        };
    }

    render() {
        return (
          <div className="col-sm-12">
                <img src="/client/assets/images/comingsoon.gif" alt="" />
            </div>
        );
    }
}
