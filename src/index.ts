import { createTemplate } from './template'
import styles from './assets/css/style.css';
import { NewIcons} from './constants'
import {test} from './main'
import {Constants} from './constants'
import * as starter from './main'

//test('hello world!')



export default function createComponent() {

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
    }


    connectedCallback(): void {
      console.log('connected callback')      
      this.render()
      this.addEventListeners()
    }

    get _shadowRoot(): any {
      return this.shadowRoot
    }    

    render(): void {
      if(this.shadowRoot) {        
        this.shadowRoot.innerHTML = `
          <style>${styles}</style>
          <button class="toggle-chat-btn">${this.isOpen ? NewIcons.closeIcon : NewIcons.chatIcon}</button>
          <div class="chat-window" style="display: ${this.isOpen ? 'flex' : 'none'};">
            <button class="close-btn">×</button>
            <div class="chat-log">
              ${this.messages
                .map((msg) => `<div class="message ${msg.role}">${msg.content}</div>`)
                .join("")
              }
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type a message...">
                <button class="send-btn" ${this.apiPending ? "disabled" : ""}>Send</button>
              </div>
            </div>
        `
      }
    }    
    
    /* methods */

    handleCloseButtonClick(event: any): void {
      event.stopPropagation()
      this.toggleChat()
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
    
    addEventListeners(): void {
      
      if(this.shadowRoot) {        
        this._shadowRoot
          .querySelector(".toggle-chat-btn")
          .addEventListener("click", this.handleToggleChatClick.bind(this))
        
        this._shadowRoot
          .querySelector(".close-btn")
          .addEventListener("click", this.handleCloseButtonClick.bind(this))
        this.shadowRoot
        /*
          .querySelector(".send-btn")
          .addEventListener("click", this.handleSendButtonClick.bind(this))
        this.shadowRoot
          .querySelector(".chat-input input")
          .addEventListener("keydown", this.handleInputKeydown.bind(this))
        */
      }
    }

    
  }

  if (!customElements.get("chat-bot")) {
    console.log('customElement defined')
    customElements.define("chat-bot", ChatBot)
  }
  /*fetch('/assets/css/style.css') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load CSS file');
        } console.log(response.text())
        return response.text()
      })      
      
      .then(css => {        
        this.styles = css        
        this.render()
        console.log('css loaded')
        this.addEventListeners()
        console.log('event listener loaded')
      })
      .catch(e => console.log('error fetching style.css'))
      */

      /*
      fetch('/assets/css/style.css')  
        .then(response => response.text())
        .then(css => {        
          this.styles = css        
          this.render()
          console.log(this.styles)
          console.log('css loaded')
          this.addEventListeners()
          console.log('event listener loaded')
        })
        .catch(e => console.log('error fetching style.css'))
      console.log('web components runs!')
      */
}
createComponent()
