"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = {

    metadata: () => ({
		"name": "wedo.List",
		"properties": {
      "prompt": { "type": "string", "required": true },
      "options": { "type": "list", "required": true },
      "variable": { "type": "string", "required": false },
      "imgBase": { "type": "string", "required": false },
      "urlBase": { "type": "string", "required": false },
      "keepTurn": { "type": "string", "required": false },
      "format": { "type": "string", "required": false }
		},
		"supportedActions": []
    }),

    invoke: (conversation, done) => {
      var variable = conversation.properties().variable;
      var prompt = conversation.properties().prompt;
      var options = conversation.properties().options;
      var imgBase = conversation.properties().imgBase;
      var urlBase = conversation.properties().urlBase;
      var format = conversation.properties().format;
      if( format==null || format.length==0 ) { format = "list"; }
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

        var channelType = conversation.channelType();
        if (channelType === 'facebook') {
         var response = formatFB(options, imgBase, urlBase, format, promptForVar);
         conversation.reply(prompt);
         conversation.reply(response);
        } else {
         var response = formatText(options, imgBase, urlBase, promptForVar);
         if( promptForVar ) {
           conversation.reply({text: prompt, choices: response, type: "choice"});
         } else {
           conversation.reply(prompt);
           for( var idx in response ) {
             conversation.reply(response[idx]);
           }
         }
        }

        if(promptForVar) {
          logger.info("List:firstTime");
          conversation.variable('stepCount', 1);
        } else {
          logger.info("List:firstTime.  Keepturn="+keepTurn);
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


function formatText(options, imgBase, urlBase, promptForVar) {
  var list = [];
  for( var optIdx in options ) {
    var opt = parseOption(options[optIdx],imgBase,urlBase);
    if( promptForVar ) {
      list.push(opt.title);
    } else {
      var resp = opt.title;
      if( opt.subtitle!=null ) {
        resp += "\n" + opt.subtitle;
      }
      list.push(resp);
    }
  }
  return list;
};

function formatFB(options, imgBase, urlBase, format, promptForVar) {
  var card;
  switch(format) {
    case "list":
      card = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"list",
            "top_element_style": "compact",
            "elements": []
          }
        }
      };
      break;
    case "carousel":
      card = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements": []
          }
        }
      };
      break;
    default:
      card = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"list",
            "top_element_style": "compact",
            "elements": []
          }
        }
      };
      break;
  }

  var list = [];
  for( var optIdx in options ) {
    var opt = parseOption(options[optIdx],imgBase,urlBase);
    var element = {
      "title":opt.title,
    };
    if( opt.subtitle!=null ) {
      element.subtitle = opt.subtitle;
    }
    if( opt.img!=null ) {
      element.image_url = opt.img;
    }
    if(promptForVar) {
      var btn = null;
      if (opt.url!=null&&opt.url.length>0) {
        btn = [
          {
           "type":"web_url",
           "title":opt.title,
           "url":opt.url
          }
        ];
      } else {
        btn = [
          {
           "type":"postback",
           "title":opt.title,
           "payload":opt.title
          }
        ];
      }
      element.buttons = btn;
    }
    card.attachment.payload.elements.push(element);
  }
  return card;
};

//
// OPTION FORMAT:
//
//  TITLE|SUBTITLE|IMG|URL
//
function parseOption(optionString, imgBase, urlBase) {
  var opt = {};
  var optArr = optionString.split("|");
  opt.title = optArr[0];

  if( optArr[1]!=null && optArr[1].length>0 ) {
    opt.subtitle = optArr[1];
  }

  if( optArr.length > 2 ) {
    if( optArr[2].length>0 && imgBase!=null ) {
      optArr[2] = imgBase + optArr[2];
    }
  } else {
    optArr[2] = "";
  }
  if( optArr[2]!=null && optArr[2].length>0 ) {
    opt.img = optArr[2];
  }

  if( optArr.length > 3 ) {
    if( optArr[3].length>0 && urlBase!=null ) {
      optArr[3] = urlBase + optArr[3];
    }
  } else {
    optArr[3] = "";
  }
  if( optArr[3]!=null && optArr[3].length>0 ) {
    opt.url = optArr[3];
  }

  return opt;
};
