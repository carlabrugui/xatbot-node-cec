"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;

module.exports = {
  metadata: () => ({
    "name": "wedo.If",
    "properties": {
      "value1": { "type": "string", "required": true },
      "value2": { "type": "string", "required": true },
      "operator": { "type": "string", "required": true }
    },
    "supportedActions": ['true', 'false']
  }),
  invoke: (conversation, done) => {
    var value1 = conversation.properties().value1;
    var value2 = conversation.properties().value2;
    var operator = conversation.properties().operator;

    var num1 = Number(value1);
    var num2 = Number(value2);
    logger.info("Num1="+num1);
    logger.info("Num2="+num2);

    var action = "false";
    if( num1 > num2 ) {
      action = "true";
    }

    conversation.keepTurn(true);
    conversation.transition(action);
    done();
  }
};
