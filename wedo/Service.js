/*"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var Client = require('node-rest-client').Client;

module.exports = {
  metadata: () => ({
    "name": "wedo.Service",
    "properties": {
      "url": {"type": "string", "required": true },
      "body": {"type": "string", "required": false },
      "variable": { "type": "string", "required": false },
      "keepTurn": {"type": "boolean", "required": false}
    },
    "supportedActions": []
  }),
  invoke: (conversation, done) => {
    //logger.info("wedo.Service:"+JSON.stringify(conversation.request()));
    var url = conversation.properties().url;
    var body = conversation.properties().body;
    var variable = conversation.properties().variable;
    var keepTurn = conversation.properties().keepTurn;
    var output = "qqqqqqqqqqqqq";
    if( Helper.isEmpty(keepTurn) ) { keepTurn = true; }

    logger.info("wedo.Service..setting "+variable);
    logger.info("wedo.Service..old value "+JSON.stringify(conversation.variable(variable)));

    if( Helper.isEmpty(body) ) {
      output = doGetService(url);
    } else {
      output = doPostService(url, body);
    }

    if( !Helper.isEmpty(variable) ) {
      conversation.variable(variable, output);
      logger.info("wedo.Service..new value "+JSON.stringify(conversation.variable(variable)));
    }
    conversation.keepTurn(keepTurn);
    conversation.transition();
    done();
  }
};

function doGetService(url) {
  var client = new Client();

  client.get(url, function (data, response) {
      // parsed response body as js object
      logger.info("wedo.Service..data="+data);
      // raw response
      //console.log(response);
      return data;
  });
};*/
