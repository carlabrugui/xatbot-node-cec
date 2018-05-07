"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();
var Helper = require('../util/Helper').Helper;
var UIBuilder = require('../util/UI/Builder');

module.exports =
    {
        metadata: () => ({
            "name": "wedo.MultiOutput",
            "properties": {
                "prompts": {"type": "list", "required": true},
                "lastPromptList": {"type": "boolean", "required": false},
                "buttons": {"type": "string", "required": false},
                "skipIfVariableExists": {"type": "string", "required": false}
            },
            "supportedActions": ['skipUserInput', 'captureUserInput']
        }),
        invoke: (conversation, done) => {

            var prompts = conversation.properties().prompts;
            var lastPromptList = conversation.properties().lastPromptList;
            var buttons = conversation.properties().buttons;
            var skipIfVariableExists = conversation.properties().skipIfVariableExists;
            var transition = "skipUserInput";


            if (Helper.isEmpty(skipIfVariableExists) || Helper.isEmpty(conversation.variable(skipIfVariableExists))) {
                transition = "captureUserInput";
                if (!Helper.isEmpty(prompts)) {
                    var prs = prompts;//prompts.split('&&');
                    if (lastPromptList) {
                        var listPrompt = prs[prs.length - 1];
                        prs = prs.splice(0, prs.length - 1);
                    }

                    prs.forEach(function (output, index) {
                        conversation.reply({text: Helper.resolveDynamicPromptIfExists(conversation, output)});
                    });

                    if (lastPromptList) {

                        buttons = buttons.split(',');
                        var finalBUttons = [];
                        buttons.forEach(function (button) {
                            finalBUttons.push({title: button, payload: button});
                        });

                        var text = Helper.resolveDynamicPromptIfExists(conversation, listPrompt);
                        var uiBuilder = new UIBuilder(conversation.channelType());
                        var payload = uiBuilder.buildButtons(text, finalBUttons);
                        conversation.reply(payload);

                    }

                }
            }
            conversation.transition(transition);
            done();


        }
    };
