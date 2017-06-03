/**
 * @action        : index.js
 * @description   : Handles all actions and get data from apis
 * @Created by    : smartData
 */

import React from 'react';
import {
  checkHttpStatus,
  parseJSON
} from '../utils';
import {
  browserHistory
} from 'react-router';
import Alert from 'react-s-alert';

import {
  AXIOS_INSTANCE,
  GET_ROW_CONST,
  GET_QUOTE_DATA_API,
} from './Constants';

/**
 * [getRequest description]
 * @param  {[type]} REQUEST [description]
 * @return {[type]}         [description]
 */
export function getRequest(REQUEST) {
  return {
    type: REQUEST
  }
}

/**
 * [getSuccess description]
 * @param  {[type]} SUCCESS [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [JSON]
 */
export function getSuccess(SUCCESS, data) {
  return {
    type: SUCCESS,
    payload: data
  }
}

/**
 * [getFailure description]
 * @param  {[type]} FAILURE [description]
 * @return {[type]}         [description]
 */
export function getFailure(FAILURE, error) {
  return {
    type: FAILURE,
    payload: error
  }
}

/**
 * [getQuoteData Returns a list of quotes]
 * @param  {[query]}      [?symbol=AAPL&field=4+10+11]
 * @return {[type]}           [description]
 */
export function getQuoteData() {

  return function(dispatch) {

    dispatch(getRequest(GET_ROW_CONST.GET_ROW_REQUEST));

    AXIOS_INSTANCE.get(`${GET_QUOTE_DATA_API}`)
      .then(function(response) {
        try {
          dispatch(getSuccess(GET_ROW_CONST.GET_ROW_SUCCESS, response.data.data));
        } catch (e) {
          //console.log('here');
        }
      })
      .catch(function(error) {
        dispatch(getFailure(GET_ROW_CONST.GET_ROW_FAILURE, error.response.data));
      });
  }
}

export function getStockExchangeQuote(symbol) {

  return function(dispatch) {

    dispatch(getRequest(GET_ROW_CONST.GET_SEQ_REQUEST));

    AXIOS_INSTANCE.get(`${GET_QUOTE_DATA_API}/${symbol}`)
      .then(function(response) {
        try {
          dispatch(getSuccess(GET_ROW_CONST.GET_SEQ_SUCCESS, response.data.data));
        } catch (e) {
          //console.log('here');
        }
      })
      .catch(function(error) {
        dispatch(getFailure(GET_ROW_CONST.GET_SEQ_FAILURE, error.response.data));
      });
  }
}

/**
 * [addQuote add a new row for the quote data]
 * @param  {[type]} quoteData  [description]
 * @return {[type]}           [description]
 */
export function addQuote(quoteData) {

  return function(dispatch) {

    dispatch(getRequest(GET_ROW_CONST.POST_ROW_REQUEST));

    const postData = {
      symbol: quoteData
    };

    AXIOS_INSTANCE.post(`${GET_QUOTE_DATA_API}`, postData).then(checkHttpStatus)
      .then(parseJSON)
      .then(function(response) {
        try {
          dispatch(getSuccess(GET_ROW_CONST.POST_ROW_SUCCESS, response));
          
          let alertText = "Quote submitted successfully.";
          Alert.success(alertText, {
            timeout: 1000,
          });
          } catch (e) {
            //console.log("addQuote");
          }
          dispatch(getQuoteData());
      })
      .catch(function(error) {
        let alertText = error.response.data.message;
          Alert.error(alertText, {
            timeout: 1000,
          });
        dispatch(getFailure(GET_ROW_CONST.POST_ROW_FAILURE, error.response.data));
      });
  }
}

export function deleteQuote(quoteId) {

  return function(dispatch) {

    dispatch(getRequest(GET_ROW_CONST.REMOVE_ROW__REQUEST));

    AXIOS_INSTANCE.delete(`${GET_QUOTE_DATA_API}/${quoteId}`).then(checkHttpStatus)
      .then(parseJSON)
      .then(function(response) {
        try {
          dispatch(getSuccess(GET_ROW_CONST.REMOVE_ROW__SUCCESS, response));
          let alertText = "Quote deleted successfully.";
          Alert.success(alertText, {
            timeout: 1000,
          });
          dispatch(getQuoteData());
        } catch (e) {
          //console.log("addQuote");
        }
      })
      .catch(function(error) {
        dispatch(getFailure(GET_ROW_CONST.POST_ROW_FAILURE, error.response.data));
      });
  }
}

export function notEligibleForQuote() {

  return function(dispatch) {
    dispatch(getSuccess(GET_ROW_CONST.QUOTE_ELIGIBILITY_REQUEST));
    dispatch(getSuccess(GET_ROW_CONST.QUOTE_ELIGIBILITY_SUCCESS, null));
  }
}