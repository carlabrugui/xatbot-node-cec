"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var uniqid = require('uniqid');

module.exports = {
  metadata: () => ({
    "name": "loyalty.Award",
    "properties": {
      "to": { "type": "string", "required": true },
      "from": { "type": "string", "required": true },
      "subject": { "type": "string", "required": true },
      "desc": { "type": "string", "required": true },
      "points": { "type": "string", "required": true }
    },
    "supportedActions": [ "success", "error" ]
  }),
  invoke: (conversation, done) => {
    var to = conversation.properties().to;
    var from = conversation.properties().from;
    var subject = conversation.properties().subject;
    var desc = conversation.properties().desc;
    var points = conversation.properties().points;

    var contractId = uniqid("BOT-");

    var millis = new Date().getTime();
    var epoch = millis.toString();
    epoch = epoch.substring(0, epoch.length-3);

    var args = [
      contractId,
      subject,
      desc,
      points,
      from,
      to,
      epoch
    ];


    //var auth = { user: "authUser", password: "authPass" };
    var auth = "";

    executeProductionLoyaltyContract(args, auth, conversation, done);

    //conversation.transition();
    //conversation.keepTurn("true");
    //done();

  }
};


function executeProductionLoyaltyContract(args, auth, conversation, done) {

  var Client = require('node-rest-client').Client;
  var client = new Client(auth);

  var body = {
     "channel": "wedomasterorderer",
     "chaincode": "wedo",
     "chaincodeVer": "v6",
     "method": "initContract",
     "args": args
  };

  var url = "http://helper.digitalpracticespain.com:3271/bcsgw/rest/v1/transaction/invocation";
  var args = {
    data: body,
		headers: { "Content-Type": "application/json", "Accept": "application/json"}
	}

  var req=client.post(url, args, function (data, response) {
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

};
