"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = {

    metadata: () => ({
		"name": "wedo.Buttons",
		"properties": {
      "prompt": { "type": "string", "required": true },
      "options": { "type": "list", "required": true },
      "variable": { "type": "string", "required": false },
      "keepTurn": { "type": "string", "required": false },
      "imgBase": { "type": "string", "required": false }
		},
		"supportedActions": []
    }),

    invoke: (conversation, done) => {
      var variable = conversation.properties().variable;
      var prompt = conversation.properties().prompt;
      var options = conversation.properties().options;
      var imgBase = conversation.properties().imgBase;
      var keepTurn = conversation.properties().keepTurn;
      if(keepTurn==null||keepTurn=="false") {
        keepTurn = false;
      } else {
        keepTurn = true;
      }
      var promptForVar = false;
      if(variable!=null && variable.length>0) {
        promptForVar = true;
      }

      if (!conversation.variable('stepCount')) {
        logger.info("List:firstTime.  Keepturn="+keepTurn);

        var channelType = conversation.channelType();
        if (channelType === 'facebook') {
          var response = formatFB(prompt, options, imgBase);
          conversation.reply(response);
        } else {
          var response = formatText(options, imgBase);
          conversation.reply({text: prompt, choices: response, type: "choice"});
        }

        if(promptForVar) {
          conversation.variable('stepCount', 1);
        } else {
          conversation.transition();
          conversation.keepTurn(keepTurn);
        }

      } else {
        logger.info("List:secondTime");
        // this is the second time the component gets invoked, user now answered the question
        conversation.variable('stepCount', null);
        conversation.variable(variable, conversation.text());
        conversation.transition();
      }

      done();
    }
};


function formatText(options, imgBase) {
  var list = [];
  for( var optIdx in options ) {
    var opt = parseOption(options[optIdx],imgBase);
    list.push(opt.title);
  }
  return list;
};

function formatFB(prompt, options, imgBase) {
  var card;
  card = {
    "text": prompt,
    "quick_replies":[]
  };
  for( var optIdx in options ) {
    var opt = parseOption(options[optIdx],imgBase);
    var element = {};
    if( opt.title == "location" ) {
      element.content_type = "location";
    } else {
      element.content_type ="text";
      element.title = opt.title;
      element.payload = opt.title;
      if (opt.img!=null&&opt.img.length>0) {
        element.image_url = opt.img;
      }
    }
    card.quick_replies.push(element);
  }
  return card;
};


//
// OPTION FORMAT:
//
//  TITLE|URL
//
function parseOption(optionString, imgBase) {
  var opt = {};
  var optArr = optionString.split("|");
  opt.title = optArr[0];

  if( optArr.length > 1 ) {
    if( optArr[1].length>0 && imgBase!=null ) {
      optArr[1] = imgBase + optArr[1];
    }
  } else {
    optArr[1] = "";
  }
  if( optArr[1]!=null && optArr[1].length>0 ) {
    opt.img = optArr[1];
  }

  return opt;
};
