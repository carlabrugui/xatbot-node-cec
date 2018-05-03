/*"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var uniqid = require('uniqid');


module.exports = {
  metadata: () => ({
    "name": "wedo.IDGenerator",
    "properties": {
      "variable": { "type": "string", "required": true },
      "prefix": { "type": "string", "required": false },
      "type": { "type": "string", "required": false }
    },
    "supportedActions": []
  }),
  invoke: (conversation, done) => {
    var variable = conversation.properties().variable;
    var prefix = conversation.properties().prefix;
    if( Helper.isEmpty(prefix) ) {
      prefix = "";
    }
    var type = conversation.properties().type;
    var id;

    switch ( type ) {
      case "18":
        id = uniqid(prefix);
        break;
      case "12":
        id = uniqid.process(prefix);
        break;
      case "6":
        id = uniqid.time(prefix);
        break;
      default:
        id = uniqid(prefix);
        break;
    }

    conversation.variable(variable, id);

    conversation.keepTurn(true);
    conversation.transition();
    done();
  }
};
*/