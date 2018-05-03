/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
var ochatWidgetSettings = {
    uri: 'wss://c6b6d9bb.ngrok.io/chat/ws',// bot chat server uri
    channel: '99516589-F207-4273-9090-DFEEC7CA9F3E',// bot channel id
    userId: 'WEB-1004',// bot chat server user id
    isDebugMode: true,// enable / disable logging
    chatTitle: 'Cafebot',// chat title
    miniTitle: 'Pregunta al Cafebot',// chat title when it minimized
    chatInputPlaceholder: ' ',// chat input placeholder text by default this text is: "Message"
    robotIcon: 'https://wedoapp-gse00011350.apaas.us6.oraclecloud.com/web/imgs/cafe.jpg', // optional url or base64 format icon for bot profile picture
    personIcon: 'https://wedoapp-gse00011350.apaas.us6.oraclecloud.com/web/imgs/profile.jpg' // optional url or base64 format icon for user profile picture
    // closeIcon: '',// optional url or base64 format close button icon
    // sendIcon: '',// optional url or base64 format send button icon
    // openIcon: '',// optional url or base64 format open button icon
    // position: { // position of the widget by default this position is: bottom: 0, left 20px
    //  left: // can't be used in combination with "right".
    // right: 300px // can't be used in combination with "left".
    // top: 0px // can't be used in combination with "bottom".
    // bottom: 220px // can't be used in combination with "top".
    // },
    // useCustomStyle: false// enable / disable custom styling.
    // When this flag is true, widget does not load default style and relay on custom styles.
    //
};
