/*"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var Sentiment = require('sentiment');

module.exports = {
  metadata: () => ({
    "name": "wedo.Sentiment",
    "properties": {
      "text": { "type": "string", "required": true },
      "limit": { "type": "integer", "required": false }
    },
    "supportedActions": ['positive', 'negative']
  }),
  invoke: (conversation, done) => {
    var text = conversation.properties().text;
    var limit = conversation.properties().limit;
    var limitNum = Number(limit);
    if( Helper.isEmpty(limitNum) ) {
      limitNum = -3;
    }

    var textSentiment = Sentiment(text, {
    'lost': 0,
    'credit': 2
});
    var score = textSentiment.score;
    logger.info("wedo.Sentiment.sentiment="+score);
    var action = "positive";
    if( score <= limitNum ) {
      action = "negative";
    }

    conversation.variable("sentiment", score);

    conversation.keepTurn(true);
    conversation.transition(action);
    done();
  }
};*/
