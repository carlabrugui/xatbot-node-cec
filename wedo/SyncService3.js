/*"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var Sync = require('sync-rest-client');
var axios = require("axios");
var fetch = require('node-fetch')
var o_o = require('yield-yield');

module.exports = {
  metadata: () => ({
    "name": "wedo.SyncService",
    "properties": {
      "url": {"type": "string", "required": true },
      "body": {"type": "string", "required": false },
      "variable": { "type": "string", "required": false },
      "keepTurn": {"type": "boolean", "required": false}
    },
    "supportedActions": []
  }),
  invoke: (conversation, done) => {
    //logger.info("wedo.SyncService:"+JSON.stringify(conversation.request()));
    var url = conversation.properties().url;
    var body = conversation.properties().body;
    var variable = conversation.properties().variable;
    var keepTurn = conversation.properties().keepTurn;
    var output = null;
    if( Helper.isEmpty(keepTurn) ) { keepTurn = true; }

    console.log("wedo.SyncService..setting "+variable);
    console.log("wedo.SyncService..old value "+JSON.stringify(conversation.variable(variable)));

    if( Helper.isEmpty(body) ) {
      wrapper("http://www.google.com");
      var gen = callRestGen(url);
      output = gen.next();
    } else {
      output = doPostService(url, body);
    }
    console.log("wedo.SyncService. output="+output);

    if( !Helper.isEmpty(variable) ) {
      conversation.variable(variable, output);
      console.log("wedo.SyncService..new value "+JSON.stringify(conversation.variable(variable)));
    }
    conversation.keepTurn(keepTurn);
    conversation.transition();
    done();
  }
};


var wrapper = o_o(function *(url) {
  var content =   yield axios.get(url, {
        params: {
          ID: 12345
        }
      }, yield);
  // do somehting with result
});


function* callRestGen(url) {
  yield axios.get(url, {
      params: {
        ID: 12345
      }
    });
};




function callRest(url) {
  axios.get(url, {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log("GOOD");
    })
    .catch(function (error) {
      console.log("BAD");
    });
};
*/