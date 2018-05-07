/*
 * Copyright (C) 2017 Dolf Dijkstra
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

const request = require('request-promise-native')
var merge = require('merge-json')
var login = require('./Login')

let debugUtil = {
  /* dump response headers and body to the console */
  dump: response => {
    console.log(response.headers)
    return debugUtil.body(response)
  },

  /* dump response body to the console */
  body: response => {
    let data = response.data
    if (data instanceof Buffer) {
      console.log(data.toString('utf8'))
    } else {
      console.log(debugUtil.json(data))
    }
    return response
  },
  print: e => {
    console.log(e)
  },

  json: e => JSON.stringify(e, null, 2),
  printJson: e => {
    console.log(debugUtil.json(e))
    return e
  }
}

const RestClient = context =>
  login(context).then(jar => ({
    createContentItem: (data,res) => {
      let options = {
        method: 'POST',
        uri: context.host + '/content/management/api/v1/items',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        jar: jar,
        body: data,
        simple: false,
        json: true,
        transform: function(body, response, resolveWithFullResponse) {
          res.status(200).send(response);
          return {
            data: body,
            headers: response.headers,
            statusCode: response.statusCode
          }
        }
      }
      return request(options)
    },
    updateContentItem: (data, res) => {
      let options = {
        method: 'PUT',
        uri: context.host + '/content/management/api/v1/items/'+data.id,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type' : 'application/json'
        },
        jar: jar,
        body: data,
        simple: false,
        json: true,
        transform: function(body, response, resolveWithFullResponse) {
          res.status(200).send(response);
          console.log("return.content="+JSON.stringify(response));
          return {
            data: response,
            headers: response.headers,
            statusCode: response.statusCode
          }
        }
      }
      request(options)
        .then(function (response) {
            //console.log('searchUserContent. Response='+JSON.stringify(response));
            res.status(200).send(response);
            return response;
        })
        .catch(function (err) {
            // API call failed...
            console.log('updateContentItem. ERROR='+JSON.stringify(err));
            //res.status(200).send(response);
            return {};
        });
    },
    updateContentItemFields: (data, res) => {
      let options = {
        method: 'GET',
        uri: context.host + '/content/management/api/v1/items/'+data.id,
        jar: jar,
        simple: false,
        json: true,
        transform: function(body, response, resolveWithFullResponse) {
          return {
            data: response,
            headers: response.headers,
            statusCode: response.statusCode
          }
        }
      };
      request(options)
        .then(function (response) {
          //console.log('updateContentItemFields2. OK='+JSON.stringify(data));

          var requestUpdt = require('request-promise-native')
          let dataUpdt = merge.merge(response.data.body, data);
          console.log('updateContentItemFields.dataUpdt='+JSON.stringify(dataUpdt));

          let optionsUpdt = {
            method: 'PUT',
            uri: context.host + '/content/management/api/v1/items/'+dataUpdt.id,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-type' : 'application/json'
            },
            jar: jar,
            body: dataUpdt,
            simple: false,
            json: true,
            transform: function(body, response, resolveWithFullResponse) {
              res.status(200).send(response);
              console.log("updateContentItemFieldsUpdt.return.content="+JSON.stringify(response));
              return {
                data: response,
                headers: response.headers,
                statusCode: response.statusCode
              }
            }
          }
          requestUpdt(optionsUpdt)
            .then(function (response) {
                console.log('updateContentItemFieldsUpdt. Response='+JSON.stringify(response));
                res.status(200).send(response);
                return response;
            })
            .catch(function (err) {
                // API call failed...
                console.log('updateContentItemFieldsUpdt. ERROR='+JSON.stringify(err));
                res.status(200).send(response);
                return {};
            });
        })
        .catch(function (err) {
            // API call failed...
            console.log('updateContentItemFields. ERROR='+JSON.stringify(err));
            res.status(200).send(response);
            return {};
        });
    },
    getContentItem: (data, res) => {
      let options = {
        method: 'GET',
        uri: context.host + '/content/management/api/v1/items/'+data.id,
        jar: jar,
        simple: false,
        json: true,
        transform: function(body, response, resolveWithFullResponse) {
          console.log("return.content="+JSON.stringify(response));
          res.status(200).send(response);
          return {
            data: response,
            headers: response.headers,
            statusCode: response.statusCode
          }
        }
      }
      request(options)
        .then(function (response) {
            //console.log('getContentItem. Response='+JSON.stringify(response));
            res.status(200).send(response);
            return response;
        })
        .catch(function (err) {
            // API call failed...
            console.log('getContentItem. ERROR='+JSON.stringify(err));
            res.status(200).send(response);
            return {};
        });
    },
    searchByType: (data, res) => {
      var url = context.host + '/content/management/api/v1/items?field:type:equals='+data.type;
      if( data.name ) {
        url += "&field:name:equals="+data.name;
      }
      console.log("URL="+url);
      let options = {
        method: 'GET',
        uri: url,
        jar: jar,
        simple: false,
        json: true,
        transform: function(body, response, resolveWithFullResponse) {
          res.status(200).send(response);
          console.log("return.content="+JSON.stringify(response));
          return {
            data: response,
            headers: response.headers,
            statusCode: response.statusCode
          }
        }
      }
      request(options)
        .then(function (response) {
            //console.log('searchByType. Response='+JSON.stringify(response));
            res.status(200).send(response);
            return response;
        })
        .catch(function (err) {
            // API call failed...
            console.log('searchByType. ERROR='+JSON.stringify(err));
            res.status(200).send(response);
            return {};
        });
    },
    addToCollection: (fileId, collectionId) => {
      let options = {
        method: 'POST',
        auth: {
          user: context.user,
          pass: context.password,
          sendImmediately: true
        },
        json: true,
        uri:
          context.host +
          '/documents/api/1.2/collections/' +
          collectionId +
          '/files/' +
          fileId
      }
      return request(options)
    }
  }))

module.exports = context => RestClient(context)
