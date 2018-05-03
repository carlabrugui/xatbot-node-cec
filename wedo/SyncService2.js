/*"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var Sync = require('sync-rest-client');
var axios = require("axios");
var fetch = require('node-fetch')

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

    logger.info("wedo.SyncService..setting "+variable);
    logger.info("wedo.SyncService..old value "+JSON.stringify(conversation.variable(variable)));

    if( Helper.isEmpty(body) ) {
      output = runPoll(url);
    } else {
      output = doPostService(url, body);
    }
    logger.info("wedo.SyncService. output="+output);

    if( !Helper.isEmpty(variable) ) {
      conversation.variable(variable, output);
      logger.info("wedo.SyncService..new value "+JSON.stringify(conversation.variable(variable)));
    }
    conversation.keepTurn(keepTurn);
    conversation.transition();
    done();
  }
};

function *poll(url){
  while(true){
    yield fetch(url,{
      method: 'get'
    }).then(function(d){
      var json = d.json();
      return json;
    });
  }
};

function runPoll(url, generator){
  if(!generator){
    generator = poll(url);
  }

  var p = generator.next();
  p.value.then(function(d){
    if(!d.temperature){
      runPoll(url, generator);
    } else {
      console.log(d);
    }
  });
}

function initREST(url) {
  // Setting URL and headers for request
  var options = {
      url: url,
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
  };
}


function doGetService2(url) {
  Sync.addGlobalHeader("Content-Type","application/json");
  Sync.addGlobalHeader("Accept","application/json");

  logger.info("wedo.SyncService. url="+url);
  var response = Sync.get(url);

  logger.info("wedo.SyncService. url="+url);
  logger.info("wedo.SyncService. response="+response.body);
  return response.body;
};

/
