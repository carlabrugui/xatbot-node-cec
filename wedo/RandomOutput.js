"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;

module.exports = {
  metadata: () => ({
      "name": "wedo.RandomOutput",
      "properties": {
        "text": {"type": "list", "required": true},
        "variable": {"type": "string", "required": false},
        "keepTurn": {"type": "boolean", "required": false}
      },
      "supportedActions": ['skipUserInput', 'captureUserInput']
  }),
  invoke: (conversation, done) => {

    logger.info("Test2:"+JSON.stringify(conversation.request()));

    var textArray = conversation.properties().text;
    var variable = conversation.properties().variable;
    var keepTurn = conversation.properties().keepTurn;
    if( Helper.isEmpty(keepTurn) ) { keepTurn = false; }

    var output = getResponseFromArray(textArray);
    var dynamicOutput = Helper.replaceVariables(conversation, output);

    if( Helper.isEmpty(variable) ) {
      conversation.reply(dynamicOutput);
    } else {
      conversation.variable(variable, dynamicOutput);
      keepTurn = true;
    }

    conversation.keepTurn(keepTurn);

    conversation.transition();
    done();
  }
};

function getRandomResponseFromArray(array) {
  var id = getRandomInt(array.length);
  //logger.info("rdm="+id);
  return array[id];
};

function getRandomInt(max) {
  var min = 0;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function getResponseFromArray(array) {
  var id = getModTime(array.length);
  //logger.info("now="+id);
  return array[id];
};

function getModTime(max) {
  var now = Date.now();
  max = Math.floor(max);
  return now % max;
}
