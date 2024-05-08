import styles from './assets/css/style.css';
import { NewIcons} from './constants'
import {marked} from 'marked'

export default function createComponent() {

  class ChatBot extends HTMLElement {

    private isOpen: boolean = false
    private shadow: any | null

    constructor() {

      super()            
      this.isOpen = false

      this.shadow = this.attachShadow({mode: 'open'})
      
    }    
    
    /* uhm chat-log or msger-chat */
    render(): any {
      if(this.shadow) {        
        this.shadow.innerHTML = `
          <style>${styles}</style>
          <button class="toggle-chat-btn">${this.isOpen ? NewIcons.closeIcon : NewIcons.chatIcon}</button>
          <div class="chat-window" style="display: ${this.isOpen ? 'flex' : 'none'};">
            <div class="msger-chat" id="chats">
              <p id="test">Im a paragraph</p>
            </di>
          <div>
        `
        this.bot('hello from bot')
             
      } else {
        console.log('there was an error!')
      }
    }
    
    connectedCallback(): void {
      console.log('connected callback')
      this.render()
      const chatWindow = this.shadow.querySelector('.msger-chat')
      alert(chatWindow)
      //this.appendMessage('BOT', null, 'right', 'hello')
      this.addEventListeners()
    }    
     
    /* methods */

    appendMessage(name: string, img: any, side: string, text: string): any {
      console.log('append message')
      const msgerChat: any =  this.shadow.querySelector('.chat-window')
      let html = marked.parse(text)
      const msgHTML = `
        <div class="msg ${side}-msg">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">
                <div class="msg-img" style="background-image: url(${img})"></div>
                <span>${name}</span>
              </div>
              <div class="msg-info-time"> ${this.formatDate(new Date())}</div>
            </div>
          <div class="msg-text">${html}</div>
        </div>
      `
      msgerChat.insertAdjacentHTML('beforeend', msgHTML)
    }

    bot(msg: string): any {
      //appendMessage(BOT_NAME, BOT_IMG, "left", msg)
      this.appendMessage('Assistant', null, 'left', msg)
    }

    formatDate(date: any) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();
      return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    handleToggleChatClick(event: any): void {
      event.stopPropagation()
      this.toggleChat()
    }
    toggleChat(): void {
      this.isOpen = !this.isOpen
      this.render()
      this.addEventListeners() // Re-attach event listeners after rendering
    }

    /* listeners */
    
    addEventListeners(): void {      
      if(this.shadowRoot) {        
        this._shadowRoot
          .querySelector(".toggle-chat-btn")
          .addEventListener("click", this.handleToggleChatClick.bind(this))        
      }
    }

    /* other code */
    
    private get _shadowRoot(): any {
      return this.shadowRoot
    }

  }

  if (!customElements.get("chat-bot")) {
    console.log('customElement defined')
    customElements.define("chat-bot", ChatBot)
  }

  
}
createComponent()
  
console.log(document.querySelector('chat-bot'))
