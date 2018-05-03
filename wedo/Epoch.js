/*"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;


module.exports = {
  metadata: () => ({
    "name": "wedo.Epoch",
    "properties": {
      "variable": { "type": "string", "required": true }
    },
    "supportedActions": []
  }),
  invoke: (conversation, done) => {
    var variable = conversation.properties().variable;
    var millis = new Date().getTime();
    var epoch = millis.toString();
    epoch = epoch.substring(0, epoch.length-3);

    conversation.variable(variable, epoch);

    conversation.keepTurn(true);
    conversation.transition();
    done();
  }
};
*/