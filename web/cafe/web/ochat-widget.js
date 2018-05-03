var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var templates;
        (function (templates) {
            var chat;
            (function (chat) {
                chat.main = '' +
                    '<div class="ochat_chat">' +
                    '    <div class="ochat-chat-scroll-content" id="ochat_widget_messages">' +
                    '    </div>' +
                    '</div>' +
                    '';
            })(chat = templates.chat || (templates.chat = {}));
        })(templates = widget.templates || (widget.templates = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var templates;
        (function (templates) {
            var chat;
            (function (chat) {
                chat.choices = '' +
                    '<div class="ochat-card">' +
                    '    <div class="ochat-choices-list"></div>' +
                    '</div>' +
                    '';
            })(chat = templates.chat || (templates.chat = {}));
        })(templates = widget.templates || (widget.templates = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var templates;
        (function (templates) {
            var chat;
            (function (chat) {
                chat.messageWrapper = '' +
                    '<div>' +
                    '    <div class="ochat-message-wrapper">' +
                    '        {message}' +
                    '        <div class="ochat-cf"></div>' +
                    '    </div>' +
                    '    {choices}' +
                    '</div>' +
                    '';
            })(chat = templates.chat || (templates.chat = {}));
        })(templates = widget.templates || (widget.templates = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var templates;
        (function (templates) {
            var chat;
            (function (chat) {
                chat.message = '' +
                    '<div>' +
                    '    <img class="ochat-profile-pic ochat-right" src="{profile-pic}"/>' +
                    '    <div class="ochat-chat-bubble ochat-right">' +
                    '        <div class="ochat-message">{message}</div>' +
                    '        <div class="ochat-message-detail">' +
                    '            <!--<span ng-click="viewProfile(message)" class="bold">{{user.username}}</span>,-->' +
                    '            <span am-time-ago="item.date"></span>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>' +
                    '';
            })(chat = templates.chat || (templates.chat = {}));
        })(templates = widget.templates || (widget.templates = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var templates;
        (function (templates) {
            var chat;
            (function (chat) {
                chat.response = '' +
                    '<div>' +
                    '    <img class="ochat-profile-pic ochat-left" src="{profile-pic}"/>' +
                    '    <div class="ochat-chat-bubble ochat-left">' +
                    '        <div class="ochat-message">{message}</div>' +
                    '        <div class="ochat-message-detail">' +
                    '            <!--<span ng-click="viewProfile(message)" class="bold">{{users[item.userId].username}}</span>,-->' +
                    '            <span am-time-ago="item.date"></span>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>' +
                    '';
            })(chat = templates.chat || (templates.chat = {}));
        })(templates = widget.templates || (widget.templates = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var templates;
        (function (templates) {
            var loading;
            (function (loading) {
                loading.main = '' +
                    '<div id="ochat_loading">' +
                    '    <div class="ochat-backdrop"></div>' +
                    '    <div class="ochat-loading-wrapper">' +
                    '        <div class="ochat-loading-spinner">' +
                    '            <div class="ochat-spinner">' +
                    '                <svg viewBox="0 0 64 64"><circle transform="translate(32,32)" r="26"></circle></svg>' +
                    '            </div>' +
                    '        </div>' +
                    '        <div class="ochat-loading-content"></div>' +
                    '    </div>' +
                    '</div>' +
                    '';
            })(loading = templates.loading || (templates.loading = {}));
        })(templates = widget.templates || (widget.templates = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        class Settings {
            constructor(customSettings) {
                this.version = '1.0.0'; // replace by grunt with data from package.json
                this.name = 'ochat-widget'; // replace by grunt with data from package.json
                if (!customSettings) {
                    throw Error('OChat widget settings was not provided.');
                }
                if (!customSettings.uri ||
                    !customSettings.channel ||
                    !customSettings.userId) {
                    throw Error('OChat widget settings does not contains one of required properties: uri, channel, userId.');
                }
                this.uri = customSettings.uri || 'wss://7300fd68.ngrok.io/chat/ws';
                this.channel = customSettings.channel || 'B25B141A-3A22-4A42-8AE0-099B46BC556D';
				var ran = Math.floor(Math.random() * 100) + 1;
				//alert(ran);
                this.userId = 'cafeuser'+ran;
                this.lang = 'es';
                this.session = 'xxxxxx';
            //    this.userId = customSettings.userId || 'user1';
                //this.userId = customSettings.userId || 'user1';
			//	alert(this.userId);
                this.isDebugMode = customSettings.isDebugMode || false;
                this.robotIcon = customSettings.robotIcon || 'data:image/png;base64,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';
                this.personIcon = customSettings.personIcon || 'data:image/png;base64,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';
                this.closeIcon = customSettings.closeIcon || 'data:image/png;base64,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';
                this.sendIcon = customSettings.sendIcon || 'data:image/png;base64,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';
                this.openIcon = customSettings.openIcon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAMFBMVEUAAAAAff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff8Aff/tW8LgAAAAD3RSTlMAAQMJDA8QJCY8QFGR8fORc8lpAAAA20lEQVR42u3dMQ5BQRSG0UssxUYkCvsQVmEravEai1DSKlmGCk8/MnGbSaY43wL+exYwycQ13TnS7dKjlxjTPfOAU3r0BQAAAAAAAAAAAAAAAAAAAPAD+CxrLfKAeW1j9R/wjpbNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgQMRcemgGl57hCSJEmSJEmSJEmSJEmSJEnStmjT9NqkPLf2rhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKA/wHivdcvf2dc2Hr4PAAAAAAAAAAAAAAAAAAAA6A/wBQugQrZkseWEAAAAAElFTkSuQmCC';
                this.chatTitle = customSettings.chatTitle || 'Chat';
                this.chatInputPlaceholder = customSettings.chatInputPlaceholder || 'Message';
                this.miniTitle = customSettings.miniTitle || 'Chat';
                this.position = customSettings.position || {
                    bottom: '0px',
                    left: '20px'
                };
                this.useCustomStyle = customSettings.useCustomStyle || false;
            }
        }
        widget.Settings = Settings;
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        widget.style = '' +
            '<style>' +
            '    .ochat-widget{' +
            '        background-color: #fff;' +
            '        font-family: "Roboto", "Helvetica Neue", sans-serif;' +
            '        font-size: 14px;' +
            '        position: fixed;' +
            '        z-index: 10;' +
            '        display: block;' +
            '        width: 300px;' +
            '        height: 400px;' +
            '        border: 1px solid #ddd;' +
            '        border-radius: 4px;' +
            '        box-shadow(0 1px 1px rgba(0,0,0,.05));' +
            '        box-sizing: border-box;' +
            '        -webkit-tap-highlight-color: transparent;' +
            '        -webkit-touch-callout: none;' +
            '        -webkit-transition: height .5s linear;' +
            '        -moz-transition: height .5s linear;' +
            '        -ms-transition: height .5s linear;' +
            '        -o-transition: height .5s linear;' +
            '        transition: height .5s linear;' +
            '    }' +
            '    .ochat-widget.ochat-widget-mini{' +
            '        height: 50px;' +
            '    }' +
            '' +
            '    #ochat_loading{' +
            '        display: none;' +
            '        z-index: 10001;' +
            '        position: absolute;' +
            '        top: 0;' +
            '        right: 0;' +
            '        bottom: 0;' +
            '        left: 0;' +
            '        display: -webkit-flex;' +
            '        display: -ms-flexbox;' +
            '        display: flex;' +
            '        -webkit-align-items: center;' +
            '        -ms-flex-align: center;' +
            '        align-items: center;' +
            '        -webkit-justify-content: center;' +
            '        -ms-flex-pack: center;' +
            '        justify-content: center;' +
            '        contain: strict;' +
            '    }' +
            '    .ochat-backdrop{' +
            '        opacity: 0.5;' +
            '        position: absolute;' +
            '        top: 0;' +
            '        left: 0;' +
            '        z-index: 2;' +
            '        display: block;' +
            '        width: 100%;' +
            '        height: 100%;' +
            '        background-color: #000;' +
            '        -webkit-transform: translateZ(0);' +
            '        transform: translateZ(0);' +
            '    }' +
            '    .ochat-loading-wrapper{' +
            '        padding: 15px;' +
            '        max-width: 280px;' +
            '        max-height: 90%;' +
            '        border-radius: 2px;' +
            '        color: rgba(0, 0, 0, 0.5);' +
            '        background: #fafafa;' +
            '        box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4);' +
            '        z-index: 10;' +
            '        display: -webkit-flex;' +
            '        display: -ms-flexbox;' +
            '        display: flex;' +
            '        -webkit-align-items: center;' +
            '        -ms-flex-align: center;' +
            '        align-items: center;' +
            '    }' +
            '    #ochat_loading_content{' +
            '        margin-left: 16px;' +
            '    }' +
            '    .ochat-spinner{' +
            '        position: relative;' +
            '        display: inline-block;' +
            '        width: 28px;' +
            '        height: 28px;' +
            '    }' +
            '    .ochat-spinner svg{' +
            '        animation-duration: 750ms;' +
            '        -webkit-animation: spinner-rotate 1s linear infinite;' +
            '        animation: spinner-rotate 1s linear infinite;' +
            '        overflow: hidden;' +
            '        position: absolute;' +
            '        top: 0;' +
            '        left: 0;' +
            '        width: 100%;' +
            '        height: 100%;' +
            '        -webkit-transform: translateZ(0);' +
            '        transform: translateZ(0);' +
            '    }' +
            '    .ochat-spinner circle{' +
            '        stroke: #387ef5;' +
            '        fill: transparent;' +
            '        stroke-width: 4px;' +
            '        stroke-dasharray: 128px;' +
            '        stroke-dashoffset: 82px;' +
            '    }' +
            '' +
            '    @-webkit-keyframes spinner-rotate {' +
            '        0% {' +
            '            -webkit-transform: rotate(0deg);' +
            '            transform: rotate(0deg);' +
            '        }' +
            '        100% {' +
            '            -webkit-transform: rotate(360deg);' +
            '            transform: rotate(360deg);' +
            '        }' +
            '    }' +
            '    @keyframes spinner-rotate {' +
            '        0% {' +
            '            -webkit-transform: rotate(0deg);' +
            '            transform: rotate(0deg);' +
            '        }' +
            '        100% {' +
            '            -webkit-transform: rotate(360deg);' +
            '            transform: rotate(360deg);' +
            '        }' +
            '    }' +
            '' +
            '    .ochat-header{' +
            '        position: absolute;' +
            '        top: 0;' +
            '        left: 0;' +
            '        z-index: 10;' +
            '        display: block;' +
            '        width: 100%;' +
            '        background: #f8f8f8;' +
            '        height: 50px;' +
            '    }' +
            '    .ochat-header-title{' +
            '        padding: 0 12px;' +
            '        font-weight: 500;' +
            '        color: #424242;' +
            '        display: block;' +
            '        overflow: hidden;' +
            '        width: 100%;' +
            '        text-overflow: ellipsis;' +
            '        white-space: nowrap;' +
            '        text-align: center;' +
            '        line-height: 50px;' +
            '    }' +
            '    .ochat-header::after,' +
            '    .ochat-footer::before{' +
            '        position: absolute;' +
            '        bottom: -5px;' +
            '        left: 0;' +
            '        width: 100%;' +
            '        height: 5px;' +
            '        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);' +
            '        background-repeat: repeat-x;' +
            '        background-position: 0 -2px;' +
            '        content: "";' +
            '    }' +
            '    .ochat-footer::before{' +
            '        top: -2px;' +
            '        bottom: auto;' +
            '        height: 2px;' +
            '        background-position: 0 0;' +
            '    }' +
            '    .ochat_chat{' +
            '        position: absolute;' +
            '        color: #000;' +
            '        background-color: #fff;' +
            '        top: 0;' +
            '        left: 0;' +
            '        display: block;' +
            '        width: 100%;' +
            '        height: 100%;' +
            '        contain: layout size style;' +
            '    }' +
            '    .ochat-chat-scroll-content{' +
            '        margin-top: 50px;' +
            '        position: absolute;' +
            '        top: 0;' +
            '        right: 0;' +
            '        bottom: 0;' +
            '        left: 0;' +
            '        z-index: 1;' +
            '        display: block;' +
            '        contain: size style layout;' +
            '        height: 296px;' +
            '        overflow-x: hidden;' +
            '        overflow-y: scroll;' +
            '        -webkit-overflow-scrolling: auto;' +
            '        will-change: initial;' +
            '    }' +
            '    .ochat-footer {' +
            '        position: absolute;' +
            '        bottom: 0;' +
            '        left: 0;' +
            '        z-index: 10;' +
            '        display: block;' +
            '        width: 100%;' +
            '        background: #f8f8f8;' +
            '    }' +
            '    .ochat-toolbar{' +
            '        padding: 4px;' +
            '        min-height: 45px;' +
            '        display: -webkit-flex;' +
            '        display: -ms-flexbox;' +
            '        display: flex;' +
            '        overflow: hidden;' +
            '        -webkit-flex-direction: row;' +
            '        -ms-flex-direction: row;' +
            '        flex-direction: row;' +
            '        -webkit-align-items: center;' +
            '        -ms-flex-align: center;' +
            '        align-items: center;' +
            '        -webkit-justify-content: space-between;' +
            '        -ms-flex-pack: justify;' +
            '        justify-content: space-between;' +
            '        width: 100%;' +
            '        contain: content;' +
            '        position: relative;' +
            '        z-index: 10;' +
            '    }' +
            '' +
            '    .ochat-button{' +
            '        line-height: 13px;' +
            '        padding: 10px;' +
            '        margin-left: 0;' +
            '        border: none;' +
            '        background: transparent;' +
            '    }' +
            '    .ochat-button[disabled]{' +
            '        cursor: default;' +
            '        opacity: .4;' +
            '        pointer-events: none;' +
            '    }' +
            '    .ochat-header .ochat-button{' +
            '        top: 0;' +
            '        padding: 15px;' +
            '        position: absolute;' +
            '    }' +
            '    .ochat-header .ochat-button.ochat-right{' +
            '        right: 0;' +
            '    }' +
            '    .ochat-icon{' +
            '        padding: 0;' +
            '        pointer-events: none;' +
            '        display: inline-block;' +
            '        background-size: 20px 20px;' +
            '        width: 20px;' +
            '        height: 20px;' +
            '    }' +
            '' +
            '    .ochat-chat-message-input{' +
            '        -moz-appearance: none;' +
            '        -ms-appearance: none;' +
            '        -webkit-appearance: none;' +
            '        appearance: none;' +
            '        display: block;' +
            '        width: 100%;' +
            '        border: 0;' +
            '        font-family: inherit;' +
            '        padding: 6px;' +
            '        height: auto;' +
            '        border-radius: 2px;' +
            '        font-weight: 400;' +
            '        line-height: 3rem;' +
            '        color: #141414;' +
            '        background-position: 8px center;' +
            '        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);' +
            '        background-color: #f4f4f4;' +
            '    }' +
            '    .ochat-button:active,.ochat-button:focus,' +
            '    .ochat-chat-message-input:active,.ochat-chat-message-input:focus{' +
            '        outline: none;' +
            '    }' +
            '' +
            '    .ochat-message-wrapper {' +
            '        position: relative;' +
            '    }' +
            '' +
            '    .ochat-message-wrapper:last-child {' +
            '        margin-bottom: 10px;' +
            '    }' +
            '' +
            '    .ochat-chat-bubble {' +
            '        border-radius: 5px;' +
            '        display: inline-block;' +
            '        padding: 10px 18px;' +
            '        position: relative;' +
            '        margin: 10px;' +
            '        max-width: 80%;' +
            '    }' +
            '' +
            '    .ochat-chat-bubble:before {' +
            '        content: "";' +
            '        display: block;' +
            '        height: 16px;' +
            '        width: 9px;' +
            '        position: absolute;' +
            '        bottom: -7.5px;' +
            '    }' +
            '' +
            '    .ochat-chat-bubble.ochat-left {' +
            '        background-color: #e6e5eb;' +
            '        float: left;' +
            '        margin-left: 55px;' +
            '    }' +
            '' +
            '    .ochat-chat-bubble.ochat-left:before {' +
            '        background-color: #e6e5eb;' +
            '        left: 10px;' +
            '        -webkit-transform: rotate(70deg) skew(5deg);' +
            '    }' +
            '' +
            '    .ochat-chat-bubble.ochat-right {' +
            '        background-color: #158ffe;' +
            '        color: #fff;' +
            '        float: right;' +
            '        margin-right: 55px;' +
            '    }' +
            '' +
            '    .ochat-chat-bubble.ochat-right:before {' +
            '        background-color: #158ffe;' +
            '        right: 10px;' +
            '        -webkit-transform: rotate(118deg) skew(-5deg);' +
            '    }' +
            '    .ochat-cf {' +
            '        clear: both !important;' +
            '    }' +
            '    .ochat-profile-pic{' +
            '        display: inline-block;' +
            '        width: 45px;' +
            '        height: 45px;' +
            '        border-radius: 50%;' +
            '        position: absolute;' +
            '        bottom: 6px;' +
            '    }' +
            '    .ochat-profile-pic.ochat-left{' +
            '        left: 10px;' +
            '    }' +
            '    .ochat-profile-pic.ochat-right{' +
            '        right: 10px;' +
            '    }' +
            '    .ochat_blank_message{' +
            '        display: inline-block;' +
            '        height: 60px;' +
            '    }' +
            '' +
            '    .ochat-card{' +
            '        margin: 10px 10px 10px 10px;' +
            '        width: calc(100% - 20px);' +
            '        border-radius: 2px;' +
            '        background: #fff;' +
            '        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);' +
            '        display: block;' +
            '        overflow: hidden;' +
            '        padding: 13px 16px 13px 16px;' +
            '    }' +
            '    .ochat-choices-list a{' +
            '        border-bottom: 1px solid #e6e5eb;' +
            '        padding-bottom: 5px;' +
            '        display: block;' +
            '        margin: 5px;' +
            '        text-decoration: none;' +
            '        color: #000;' +
            '        cursor: pointer;' +
            '    }' +
            '    .ochat-choices-list a:hover{' +
            '        text-decoration: none;' +
            '    }' +
            '    .ochat-choices-list a:last-child{' +
            '        border-bottom: 0;' +
            '        margin-bottom: 0;' +
            '    }' +
            '</style>' +
            '';
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        class Component {
            constructor(...optionalParams) {
                this.element = this.createElement.apply(this, arguments);
            }
            addClass(className) {
                this.element.className += ' ' + className;
            }
            ;
            hide(hide = true) {
                if (hide) {
                    this.display = this.element.style.display;
                    this.element.style.display = 'none';
                }
                else {
                    this.element.style.display = this.display;
                }
            }
            remove() {
                this.element.remove();
            }
            appendToComponent(component) {
                component.element.appendChild(this.element);
            }
            prependToComponent(component) {
                var firstChild = component.element.firstChild;
                if (firstChild) {
                    component.element.insertBefore(firstChild, this.element);
                }
                else {
                    component.element.appendChild(this.element);
                }
            }
            appendToElement(element) {
                element.appendChild(this.element);
            }
            prependToElement(element) {
                var firstChild = element.firstChild;
                if (firstChild) {
                    element.insertBefore(this.element, firstChild);
                }
                else {
                    element.appendChild(this.element);
                }
            }
            appendContentChildElement(child) {
                this.getContentElement().appendChild(child);
            }
            appendContentChild(child) {
                this.getContentElement().appendChild(child.element);
            }
            prependContentChild(child) {
                var content = this.getContentElement();
                var firstChild = content.firstChild;
                if (firstChild) {
                    content.insertBefore(child.element, firstChild);
                }
                else {
                    content.appendChild(child.element);
                }
            }
            getContentElement() {
                return this.element;
            }
            static createButton() {
                return document.createElement('button');
            }
            static createAnchor() {
                return document.createElement('a');
            }
            static createDiv() {
                return document.createElement('div');
            }
            static createSpan() {
                return document.createElement('span');
            }
            static createInput() {
                return document.createElement('input');
            }
            static createHTML(html) {
                var div = Component.createDiv();
                div.innerHTML = html;
                return div;
            }
            static getElementByClassName(element, className) {
                var elements = element.getElementsByClassName(className);
                return elements && elements.length > 0 ? elements[0] : null;
            }
        }
        widget.Component = Component;
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var chat;
        (function (chat) {
            var chatFooter;
            (function (chatFooter) {
                class ChatFooterComponent extends widget.Component {
                    constructor(onSend, sendButtonImgSrc, inputPlaceholder) {
                        super(sendButtonImgSrc, inputPlaceholder);
                        this.onSend = onSend;
                        this.sendButtonImgSrc = sendButtonImgSrc;
                        this.inputPlaceholder = inputPlaceholder;
                    }
                    render(element) {
                        element.appendChild(this.element);
                    }
                    createElement(sendButtonImgSrc, inputPlaceholder) {
                        this.input = widget.Component.createInput();
                        this.input.className = 'ochat-chat-message-input';
                        this.input.onkeypress = this.onInputKeyPress.bind(this);
                        this.input.placeholder = inputPlaceholder;
                        var sendButton = new widget.shared.IconButton(this.onClick.bind(this), sendButtonImgSrc);
                        var footer = new widget.shared.Footer();
                        footer.appendContentChildElement(this.input);
                        footer.appendContentChild(sendButton);
                        return footer.element;
                    }
                    onInputKeyPress(event) {
                        if (event.key === 'Enter' && this.input.value !== '') {
                            this._onSend();
                        }
                    }
                    onClick() {
                        if (this.input.value !== '') {
                            this._onSend();
                        }
                    }
                    _onSend() {
                        this.onSend(this.input.value);
                        this.input.value = '';
                    }
                }
                chatFooter.ChatFooterComponent = ChatFooterComponent;
            })(chatFooter = chat.chatFooter || (chat.chatFooter = {}));
        })(chat = widget.chat || (widget.chat = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var chat;
        (function (chat) {
            class ChatComponent extends widget.Component {
                constructor(dataService, settings, utils, logger, loadingComponent, onClose) {
                    super(settings, onClose);
                    this.dataService = dataService;
                    this.settings = settings;
                    this.utils = utils;
                    this.logger = logger;
                    this.loadingComponent = loadingComponent;
                    this.onClose = onClose;
                    loadingComponent.present('Please wait ...');
                    var self = this;
                    dataService.loadChat().then(messages => {
                        self.messages = messages.slice();
                        setTimeout(() => {
                            self.renderMessages();
                            self.scrollToBottom();
                            loadingComponent.dismiss();
                            dataService.subscribe(self.onMessageReceived.bind(self));
                        }, 0);
                    });
                }
                createElement(settings, onClose) {
                    var div = widget.Component.createHTML(widget.templates.chat.main);
                    var footer = new chat.chatFooter.ChatFooterComponent(this.sendMessage.bind(this), settings.sendIcon, settings.chatInputPlaceholder);
                    footer.appendToElement(div);
                    var closeButton = new widget.shared.IconButton(onClose.bind(this), settings.closeIcon);
                    var header = new widget.shared.Header(settings.chatTitle, 'ochat-chat-title', closeButton);
                    header.prependToElement(div);
                    return div;
                }
                render(element) {
                }
                remove() {
                    super.remove();
                    this.dataService.unSubscribe();
                }
                renderMessages() {
                    // TODO: change to elements instead of strings
                    var messagesElement = document.getElementById(ChatComponent.MESSAGES_ID);
                    var messagesHtml = '';
                    var choices = {};
                    for (var idx in this.messages) {
                        if (this.messages.hasOwnProperty(idx)) {
                            var message = this.messages[idx];
                            var wrapper = this.utils.clone(widget.templates.chat.messageWrapper);
                            var messageHtml = this.utils.clone(message.from ? widget.templates.chat.response : widget.templates.chat.message);
                            var img = message.from ? this.settings.robotIcon : this.settings.personIcon;

							//fix JBRASERO
							if (message.hasOwnProperty("from"))
							{
									if (message.body.hasOwnProperty("choices"))
									{
										this.logger.verbose('msg choices:::: ', JSON.stringify(message.body.choices));
										var component = new chat.ChoicesComponent(message.body.choices, this.choicesSelected.bind(this));
										choices[idx] = component;
									}
							}
							//end fix

                            if (message.choices && +idx === this.messages.length - 1) {
                                var component = new chat.ChoicesComponent(message.choices, this.choicesSelected.bind(this));
                                choices[idx] = component;
                            }

							// fix JBRASERO
							//ADDED: || message.body.text
                            messagesHtml += wrapper
                                .replace('{message}', messageHtml.replace('{message}', message.text || message.body.text || message.error.message)
                                .replace('{profile-pic}', img)).replace('{choices}', '<div id="ochat_choices_' + idx + '"></div>');
							//end fix
                        }
                    }
                    messagesElement.innerHTML = messagesHtml;
                    for (var idx in choices) {
                        if (choices.hasOwnProperty(idx)) {
                            var elem = document.getElementById('ochat_choices_' + idx);
                            choices[idx].render(elem);
                        }
                    }
                }
                onMessageReceived(message) {
                    this.messages.push(message);
                    this.renderMessages();
                    this.scrollToBottom();
                }
                sendMessage(text) {
                    var message = {
                        to: {
                            type: 'bot',
                            id: this.settings.channel
                        },
                        text: text
                    };
                    this.messages.push(message);
                    this.renderMessages();
                    this.scrollToBottom();
                    this.dataService.send(message);
                }
                choicesSelected(component, choice) {
                    component.remove();
                    this.sendMessage(choice);
                }
                scrollToBottom() {
                    setTimeout(() => {
                        var element = document.getElementById(ChatComponent.MESSAGES_ID);
                        element.scrollTop = element.scrollHeight - 300;
                    }, 0);
                }
            }
            ChatComponent.MESSAGES_ID = 'ochat_widget_messages';
            chat.ChatComponent = ChatComponent;
        })(chat = widget.chat || (widget.chat = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var chat;
        (function (chat) {
            class ChoicesComponent extends widget.Component {
                constructor(choices, onClick) {
                    super();
                    this.onClick = onClick;
                    this.choicesElement = document.createElement('div');
                    this.choicesElement.innerHTML = widget.templates.chat.choices;
                    var listElement = this.choicesElement.getElementsByClassName('ochat-choices-list');
                    choices.forEach(choice => {
                        var btn = new widget.shared.Button(this.onClick.bind(this, this), choice);
                        btn.render(listElement[0]);
                    });
                }
                render(element) {
                    element.appendChild(this.choicesElement);
                }
                createElement() {
                    return undefined;
                }
                remove() {
                    this.choicesElement.parentNode.removeChild(this.choicesElement);
                }
            }
            chat.ChoicesComponent = ChoicesComponent;
        })(chat = widget.chat || (widget.chat = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        class DataService {
            constructor(settings, logger) {
                this.settings = settings;
                this.logger = logger;
                this.messages = [];
                this.openSocket();
            }
            openSocket() {
                //let uri = this.settings.uri + '?user=' + this.settings.userId + '&lang=' + this.settings.lang + '&sess=' + this.settings.session + '&xxxxx=xxxxx';
                let uri = this.settings.uri + '?user=' + this.settings.userId;
                this.ws = new WebSocket(uri);
                this.ws.addEventListener('open', () => this.logger.verbose('ws.Open'));
                this.ws.addEventListener('message', event => {
                    this.logger.verbose('msg received: ', event.data);
                    var msg = JSON.parse(event.data);
                    this.broadcast(msg);
                });
                this.ws.addEventListener('close', () => this.logger.verbose('ws.Close'));
                this.ws.addEventListener('error', event => this.logger.error("The socket had an error", event));
            }
            subscribe(fn) {
                this.logger.info('subscribe to channel', this.settings.channel);
                this.subscriber = fn;
            }
            unSubscribe() {
                this.logger.info('unsubscribe to channel', this.settings.channel);
                this.subscriber = null;
            }
            loadChat() {
                if (!this.messages) {
                    this.messages = [];
                }
                return Promise.resolve(this.messages);
            }
            broadcast(msg) {
                this.messages.push(msg);
                this.subscriber(msg);
            }
            send(message) {
                this.logger.verbose('send to channel', message);
                this.messages.push(message);
                this.ws.send(JSON.stringify(message));
            }
        }
        widget.DataService = DataService;
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var loading;
        (function (loading) {
            class LoadingComponent extends widget.Component {
                constructor() {
                    super();
                    this.hide();
                }
                render(element) {
                }
                createElement() {
                    var div = widget.Component.createHTML(widget.templates.loading.main);
                    this.content = div.getElementsByClassName(LoadingComponent.LOADING_CONTENT_ID)[0];
                    return div;
                }
                present(message) {
                    this.hide(false);
                    this.setContent(message);
                }
                dismiss() {
                    this.hide();
                    this.setContent('');
                }
                getContentElement() {
                    return this.element;
                }
                setContent(message) {
                    this.content.innerHTML = message;
                }
            }
            LoadingComponent.LOADING_ID = 'ochat_loading';
            LoadingComponent.LOADING_CONTENT_ID = 'ochat-loading-content';
            loading.LoadingComponent = LoadingComponent;
        })(loading = widget.loading || (widget.loading = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        class Logger {
            constructor(settings) {
                this.settings = settings;
                this.prefix = '[' + settings.name + ']';
                this.info('version:', settings.version);
            }
            info(message, ...optionalParams) {
                if (this.settings.isDebugMode) {
                    optionalParams.unshift(message);
                    console.info(this.prefix, optionalParams);
                }
            }
            error(message, ...optionalParams) {
                optionalParams.unshift(message);
                console.error(this.prefix, optionalParams);
            }
            verbose(message, ...optionalParams) {
                if (this.settings.isDebugMode) {
                    optionalParams.unshift(message);
                    console.debug(this.prefix, optionalParams);
                }
            }
        }
        widget.Logger = Logger;
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        class Main {
            onLoad() {
                var settings = new widget.Settings(ochatWidgetSettings);
                var logger = new widget.Logger(settings);
                var utils = new widget.Utils();
                var dataService = new widget.DataService(settings, logger);
                if (!settings.useCustomStyle) {
                    document.head.innerHTML += widget.style;
                }
                var widgetComponent = new widget.WidgetComponent(settings, utils, logger, dataService);
                widgetComponent.appendToElement(document.body);
            }
        }
        var main = new Main();
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', main.onLoad.bind(main), false);
        }
        else {
            window.addEventListener('load', main.onLoad.bind(main), false);
        }
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var mini;
        (function (mini) {
            class MiniComponent extends widget.Component {
                constructor(settings, onOpen) {
                    super(settings, onOpen);
                    this.settings = settings;
                    this.onOpen = onOpen;
                }
                render(element) {
                    element.appendChild(this.element);
                }
                createElement(settings, onOpen) {
                    var openButton = new widget.shared.IconButton(onOpen.bind(this), settings.openIcon);
                    var header = new widget.shared.Header(settings.miniTitle, 'ochat-mini', openButton);
                    return header.element;
                }
            }
            mini.MiniComponent = MiniComponent;
        })(mini = widget.mini || (widget.mini = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var shared;
        (function (shared) {
            class Button extends widget.Component {
                constructor(onClick, text, className = '') {
                    super(onClick, text, className);
                    this.onClick = onClick;
                    this.text = text;
                    this.className = className;
                }
                render(element) {
                    element.appendChild(this.element);
                }
                createElement(onClick, text, className) {
                    var button = widget.Component.createAnchor();
                    button.innerText = text;
                    button.onclick = () => onClick(button.innerText);
                    button.className = 'ochat-button ' + className;
                    return button;
                }
            }
            shared.Button = Button;
        })(shared = widget.shared || (widget.shared = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var shared;
        (function (shared) {
            /**
             *  <div class="ochat-footer">
             *      <div class="ochat-toolbar">
             *          {content}
             *      </div>
             *  </div>
             */
            class Footer extends widget.Component {
                constructor(className = '') {
                    super(className);
                    this.className = className;
                }
                render(element) {
                    element.appendChild(this.element);
                }
                createElement(className) {
                    var footer = widget.Component.createDiv();
                    footer.className = 'ochat-footer ' + this.className;
                    var toolbar = widget.Component.createDiv();
                    toolbar.className = 'ochat-toolbar';
                    footer.appendChild(toolbar);
                    this.content = toolbar;
                    return footer;
                }
                getContentElement() {
                    return this.content;
                }
            }
            shared.Footer = Footer;
        })(shared = widget.shared || (widget.shared = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var shared;
        (function (shared) {
            /**
             *  <div class="ochat-header">
             *      <span class="ochat-header-title">{title}</span>
             *  </div>
             */
            class Header extends widget.Component {
                constructor(title, className = '', rightButton = null, leftButton = null) {
                    super(title, className, rightButton, leftButton);
                    this.title = title;
                    this.className = className;
                    this.rightButton = rightButton;
                    this.leftButton = leftButton;
                }
                render(element) {
                    element.appendChild(this.element);
                }
                createElement(title, className, rightButton, leftButton) {
                    var header = widget.Component.createDiv();
                    header.className = 'ochat-header ' + className;
                    var titleElem = widget.Component.createSpan();
                    titleElem.className = 'ochat-header-title';
                    titleElem.innerText = title;
                    header.appendChild(titleElem);
                    if (rightButton) {
                        rightButton.addClass('ochat-right');
                        header.appendChild(rightButton.element);
                    }
                    if (leftButton) {
                        rightButton.addClass('ochat-left');
                        header.appendChild(leftButton.element);
                    }
                    return header;
                }
            }
            shared.Header = Header;
        })(shared = widget.shared || (widget.shared = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var shared;
        (function (shared) {
            /**
             *  <div>
             *      HTML
             *  </div>
             */
            class HTML extends widget.Component {
                constructor(html, className = null) {
                    super();
                    this.html = html;
                    this.className = className;
                }
                render(element) {
                    element.appendChild(this.element);
                }
                createElement() {
                    var div = widget.Component.createDiv();
                    if (this.className) {
                        div.className = this.className;
                    }
                    div.innerHTML = this.html;
                    return div;
                }
            }
            shared.HTML = HTML;
        })(shared = widget.shared || (widget.shared = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        var shared;
        (function (shared) {
            class IconButton extends widget.Component {
                constructor(onClick, imgSrc, className = '') {
                    super(onClick, imgSrc, className);
                    this.onClick = onClick;
                    this.imgSrc = imgSrc;
                    this.className = className;
                }
                render(element) {
                    element.appendChild(this.element);
                }
                createElement(onClick, imgSrc, className) {
                    var button = widget.Component.createButton();
                    button.onclick = () => onClick(button.innerText);
                    button.className = 'ochat-button ochat-icon-button' + className;
                    var i = document.createElement('i');
                    i.className = 'ochat-icon';
                    i.style.backgroundImage = 'url(\'' + imgSrc + '\')';
                    button.appendChild(i);
                    return button;
                }
            }
            shared.IconButton = IconButton;
        })(shared = widget.shared || (widget.shared = {}));
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        class Utils {
            clone(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }
        widget.Utils = Utils;
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochat;
(function (ochat) {
    var widget;
    (function (widget) {
        /**
         * <div class="ochat-widget ochat-widget-mini">
         *     {content}
         * </div>
         */
        class WidgetComponent extends widget.Component {
            constructor(settings, utils, logger, dataService) {
                super(settings, utils, logger, dataService);
                this.settings = settings;
                this.utils = utils;
                this.logger = logger;
                this.dataService = dataService;
            }
            render(element) {
            }
            createElement(settings, utils, logger, dataService) {
                var div = widget.Component.createDiv();
                div.className = 'ochat-widget ochat-widget-mini';
                if (settings.position.bottom) {
                    div.style.bottom = settings.position.bottom;
                }
                if (settings.position.left) {
                    div.style.left = settings.position.left;
                }
                if (settings.position.top) {
                    div.style.top = settings.position.top;
                }
                if (settings.position.right) {
                    div.style.right = settings.position.right;
                }
                this.loadingComponent = new widget.loading.LoadingComponent();
                div.appendChild(this.loadingComponent.element);
                this.miniComponent = new widget.mini.MiniComponent(settings, () => this.showChat(true));
                div.appendChild(this.miniComponent.element);
                return div;
            }
            showChat(show) {
                if (show) {
                    setTimeout(() => {
                        this.chatComponent = new widget.chat.ChatComponent(this.dataService, this.settings, this.utils, this.logger, this.loadingComponent, () => this.showChat(false));
                        this.element.appendChild(this.chatComponent.element);
                    }, 500);
                    this.element.className = this.element.className.replace(' ochat-widget-mini', '');
                }
                else {
                    this.chatComponent.remove();
                    this.element.className += ' ochat-widget-mini';
                }
            }
        }
        widget.WidgetComponent = WidgetComponent;
    })(widget = ochat.widget || (ochat.widget = {}));
})(ochat || (ochat = {}));
//# sourceMappingURL=ochat-widget.js.map
