import {Constants} from './constants'
import {NewConstants} from './constants'
import styles from './assets/css/style.css';
import { NewIcons} from './constants'
import {marked} from 'marked'
/*
import * as utils from './dom-utils'
import { createTemplate } from './template'
import {test} from './main'
import * as starter from './main'
*/

//test('hello world!')



export default function createComponent() {

  /* uhhm */
  
  class Invoker {

    private name: string
    private url: string
    private state: any


    constructor(name: string, url: string) {
      this.name = name
      this.url = url
      this.state = null
    }
  }

  class ChatBot extends HTMLElement {

    private isOpen: boolean = false
    /*
    private messages: { role: string; content: string }[]
    private thinkingTimeout: NodeJS.Timeout | null 
    private apiPending: boolean
    private totalTokens: number
    private styles: string
    msgerForm: any | null = null
    private msgerInput: any =  null
    private msgerChat: any =  document.querySelector('chat-bot')
    private titleChat:any = null
    private areaChat: any = null
    */

    constructor() {

      super()

      this.attachShadow({ mode: 'open' })
      this.isOpen = false 
      /*
      this.messages = [] 
      this.thinkingTimeout = null 
      this.apiPending = false 
      this.totalTokens = 0
      this.styles = ''
      this.messages = [{ role: "assistant", content: "Benvenuto! Come posso aiutarti oggi?" }]; // Aggiungi il messaggio di benvenuto qui
      */
    }   
    
    render(): any {
      if(this.shadowRoot) {        
        this.shadowRoot.innerHTML = `
          <style>${styles}</style>
          <button class="toggle-chat-btn">${this.isOpen ? NewIcons.closeIcon : NewIcons.chatIcon}</button>
          <div class="chat-window" style="display: ${this.isOpen ? 'flex' : 'none'};"><div>
        `        
      } else {
        console.log('there was an error!')
      }
    }
    
    connectedCallback(): void {
      console.log('connected callback')      
      this.render()
      this.addEventListeners()
    }

    
     
    /* methods */

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
    private get _shadowRoot(): any {
      return this.shadowRoot
    }

    private _getElement(arg: string) {
      /*
      try {
        this.shadowRoot?.querySelector(arg)
        console.log('shadows rooot Worksss')
      } catch(e) {
        console.log(e)
      } 
      finally {
        console.log('get shadows rooot Worksss')
        this._shadowRoot?.querySelector(arg)
      } 
      */
    }

    private getElement(arg: string): any {      
      /*
      if(this.shadowRoot) { 
        return this._shadowRoot.querySelector(arg)
      } else {
        return document.querySelector(arg)
      }
      */
    }

  }

  if (!customElements.get("chat-bot")) {
    console.log('customElement defined')
    customElements.define("chat-bot", ChatBot)
  }

  /*
    formatDate(date: any): any {
      const h = '0' + date.getHours();
      const m = '0' + date.getMinutes();
      return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    botMessage = this.bot('Please select a chat, clicking on one button on the top area.')
    //<!--<div>${this.botMessage}</div>-->
    
    private appendMessage(name: string, img: any, side: any, text: string): any {
      if(this.shadowRoot) { 
        const msgerForm: any = this.shadowRoot.querySelector('.msger-inputarea')
        const msgerInput: any = this.shadowRoot.querySelector('.msger-input')
        const msgerChat: any =  this.getElement('.chat-window')
        const titleChat: any = this.shadowRoot.getElementById('chat-title')
        const areaChat: any = this.shadowRoot.getElementById('chat-area')
      }
      //   Simple solution for small apps
      console.log(text)
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
        </div>
      `;  
      this.msgerChat.insertAdjacentHTML('beforeend', msgHTML);
      this.msgerChat.scrollTop += 500;
    }
    private bot(msg: string): void{
      this.appendMessage(NewIcons.BOT_NAME, NewIcons.BOT_IMG, 'left', msg);
    }
    */
}
createComponent()
  
console.log(document.querySelector('chat-bot'))
