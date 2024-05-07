import {Constants} from './constants'
import {NewConstants} from './constants'
import styles from './assets/css/style.css';
import { NewIcons} from './constants'
import marked from 'marked'
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

  function formatDate(date: any): any {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  function appendMessage(name: string, img: any, side: any, text: string): any {
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
            <div class="msg-info-time"> ${formatDate(new Date())}</div>
          </div>
          <div class="msg-text">${html}</div>
        </div>
      </div>
    `;  
    NewConstants.msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    NewConstants.msgerChat.scrollTop += 500;
  }





  class ChatBot extends HTMLElement {

    private isOpen: boolean = false
    private messages: { role: string; content: string }[]
    private thinkingTimeout: NodeJS.Timeout | null 
    private apiPending: boolean
    private totalTokens: number
    private styles: string
    

    constructor() {

      super()

      this.attachShadow({ mode: "open" })
      this.isOpen = false 
      this.messages = [] 
      this.thinkingTimeout = null 
      this.apiPending = false 
      this.totalTokens = 0
      this.styles = ''
      this.messages = [{ role: "assistant", content: "Benvenuto! Come posso aiutarti oggi?" }]; // Aggiungi il messaggio di benvenuto qui
    }
    get _shadowRoot(): any {
      return this.shadowRoot
    }    

    render(): any {
      if(this.shadowRoot) {        
        this.shadowRoot.innerHTML = `
          <style>${styles}</style>
          <button class="toggle-chat-btn">${this.isOpen ? NewIcons.closeIcon : NewIcons.chatIcon}</button>
          <div class="chat-window" style="display: ${this.isOpen ? 'flex' : 'none'};"><div>
        `
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
  }

  if (!customElements.get("chat-bot")) {
    console.log('customElement defined')
    customElements.define("chat-bot", ChatBot)
  }
}
createComponent()
