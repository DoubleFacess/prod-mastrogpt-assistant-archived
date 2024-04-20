import * as dom from './dom-utils'
export const Constants = {
    TITLE: 'Nuvolaris OpenChat Assistant',
    WC_TAG_NAME: 'my-widget',
    TOKEN_LIMIT: 1000, // Adjust this value as needed
    SPECIAL_TOKEN_BUFFER: 10,
    YOUR_TOKEN: '89773db3-7863-460c-ad3c-6abd0db43f1c',
    API_URL: 'https://vnavarra.nuvolaris.dev/api/my/openai/chat',
    //const profileId = _getEl('profile-id')
    profileClass: dom.getSelector('.profile-class'),
    widgetElement: dom.getSelector('.widget'),
	btnClose: dom.getEl('close'),
	btnChat: dom.getEl('chat-button'),
	btnSend: dom.getEl('sendButton')	,
	userInpuId: dom.getEl('userInput')	,
	userInpuclass: dom.getSelector('.usrInput'),
	getChatClass: dom.getSelector('.chats'),
	getChatId: dom.getEl('chats'),
	botImg: '<svg stroke="none" fill="black" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg>',
	userImg: '<svg stroke="none" fill="black" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path></svg>',
	/*
    botImgDiv: '<div class="botAvatar">' + botImg +  '</div>',
	userImgDiv: '<div class="userAvatar">' + userImg +  '</div>',
	botMsgPrefix: botImgDiv + '<p class="botMsg">',
	userMsgPrefix: userImgDiv + '<p class="userMsg">',
	responseSuffix: '</p><div class="clearfix"></div>',
	botTyping: botImgDiv + '<div class="botTyping">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div>'
    */    
}





export const Icons = {
    chatIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
            <path d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2z"/>
            <path  d="M6 7h12a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2zm0 4h8a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z"/>
        </svg>
    `,
    closeIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto; transform: scale(1.5, 1.5);" viewBox="0 0 24 24" class="icon">
             <path transform="translate(0.5,0)" fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/>
        </svg>
    `
}

export const NewIcons = {
    chatIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
            <path d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2z"/>
            <path  d="M6 7h12a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2zm0 4h8a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z"/>
        </svg>
    `,
    closeIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto; transform: scale(1.5, 1.5);" viewBox="0 0 24 24" class="icon">
            <path transform="translate(0.5,0)" fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/>
        </svg>
    `
}

