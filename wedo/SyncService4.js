"use strict"

const Math = require('mathjs');

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;

module.exports = {
  metadata: () => ({
    "name": "wedo.SyncService",
    "properties": {
      "url": {"type": "string", "required": true },
      "body": {"type": "string", "required": false },
      "authUser": {"type": "string", "required": false },
      "authPass": {"type": "string", "required": false },
      "variable": { "type": "string", "required": false }
    },
    "supportedActions": [ "success", "error" ]
  }),
  invoke: (conversation, done) => {
    var url = conversation.properties().url;
    var body = conversation.properties().body;
    var variable = conversation.properties().variable;
    var authUser = conversation.properties().authUser;
    var authPass = conversation.properties().authPass;
    var auth = "";
    var output = null;

    if( !Helper.isEmpty(authUser) && !Helper.isEmpty(authUser) ) {
      auth = { user: authUser, password: authPass };
    }

    var Client = require('node-rest-client').Client;
		var client = new Client(auth);

    logger.info("wedo.SyncService..URL="+url);

    if( Helper.isEmpty(body) ) {

      var args = {
  			headers: { "Content-Type": "application/json", "Accept": "application/json"}
  		}


  		var req=client.get(url, args, function (data, response) {
        if( !Helper.isEmpty(variable) ) {
          conversation.variable(variable, data);
        }

  			conversation.action('success');
  			conversation.keepTurn(true);
        conversation.transition();
        done();
  		});


  		req.on('requestTimeout', function (req) {
  			console.log('request has expired');
  			req.abort();
  			conversation.action('error');
        conversation.keepTurn(true);
        conversation.transition();
        done();
  		});

  		req.on('responseTimeout', function (res) {
  			console.log('response has expired');
  			conversation.action('error');
        conversation.keepTurn(true);
        conversation.transition();
        done();
  		});

  		req.on('error', function (err) {
  			console.log('request error', err);
  			conversation.action('error');
        conversation.keepTurn(true);
        conversation.transition();
        done();
  		});

    } else {

      //CLEAN body
      if (typeof body == 'string' || body instanceof String) {
        logger.info("wedo.SyncService..bodyString="+body);
      } else {
        logger.info("wedo.SyncService..body1="+JSON.stringify(body));
        body = JSON.stringify(body[0]);
        logger.info("wedo.SyncService..body1="+JSON.stringify(body));
      }
      body = JSON.parse(parseBody(body, conversation));
      logger.info("wedo.SyncService..body="+JSON.stringify(body));

      var args = {
        body: body,
  			headers: { "Content-Type": "application/json", "Accept": "application/json"}
  		}
      logger.info("wedo.SyncService..args="+JSON.stringify(args));

      var req=client.post(url, args, function (data, response) {
        if( !Helper.isEmpty(variable) ) {
          conversation.variable(variable, data);
        }
        logger.info("wedo.SyncService..localtext="+JSON.stringify(data));

  			conversation.action('success');
  			conversation.keepTurn(true);
        conversation.transition();
        done();
  		});


  		req.on('requestTimeout', function (req) {
  			console.log('request has expired');
  			req.abort();
  			conversation.action('error');
        conversation.keepTurn(true);
        conversation.transition();
        done();
  		});

  		req.on('responseTimeout', function (res) {
  			console.log('response has expired');
  			conversation.action('error');
        conversation.keepTurn(true);
        conversation.transition();
        done();
  		});

  		req.on('error', function (err) {
  			console.log('request error', err);
  			conversation.action('error');
        conversation.keepTurn(true);
        conversation.transition();
        done();
  		});

    }
  }
};

function parseBody(body, conversation) {
  logger.info("parseBody.len="+body.length);
  if((typeof body) == 'object') {
    body = JSON.stringify(body);
  }
  logger.info("parseBody.sb="+(typeof sb));
  var idx = 0;
  var idxS = body.indexOf("${");
  while ( idxS != -1 ) {
    var idxE = body.indexOf("}", idxS);
    if( idxE==-1 ) { break; }
    var varKey = body.substring(idxS+2, idxE);
    var varVal = conversation.variable(varKey);
    logger.info("wedo.SyncService..varVal...="+varVal);
    body = body.replace("${"+varKey+"}", varVal);
    idxS = body.indexOf("${", idxS+varVal.length);
    logger.info("wedo.SyncService..parseBody...="+body);
  }
  logger.info("wedo.SyncService..parseBody="+body);
  return body;
};
