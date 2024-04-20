import {Constants} from './constants'
import styles from './assets/css/style.css';
import { NewIcons} from './constants'
import * as utils from './dom-utils'
import { createTemplate } from './template'
import {test} from './main'
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
    get _shadowRoot(): any {
      return this.shadowRoot
    }    

    render(): any {
      if(this.shadowRoot) {        
        this.shadowRoot.innerHTML = `
          <style>${styles}</style>
          <button class="toggle-chat-btn">${this.isOpen ? NewIcons.closeIcon : NewIcons.chatIcon}</button>
          <div class="chat-window" style="display: ${this.isOpen ? 'flex' : 'none'};">
            <div class="chat_header">
              <!--Add the name of the bot here -->
              <span class="chat_header_title">${Constants.TITLE}</span>
              <span id="close-btn">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </span>
            </div>
            <button class="close-btn">×</button>
            <div class="chat-log" id="chats">
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

    clearAndFocusInput(inputField: any): void {
      inputField.value = ""
      inputField.focus()
    }
    connectedCallback(): void {
      console.log('connected callback')      
      this.render()
      this.addEventListeners()
    }
    disconnectedCallback(): void {
      if (this.thinkingTimeout) {
        clearTimeout(this.thinkingTimeout)
      }
    }    
    estimateTokens(message: string): number {
      // Simple estimation: count words and add some buffer for special tokens
      return message.split(/\s+/).length + Constants.SPECIAL_TOKEN_BUFFER
    }
    
    handleCloseButtonClick(event: any): void {
      event.stopPropagation()
      this.toggleChat()
    }
    
    handleInputKeydown(e: any): void {
      const inputField = e.target
      if (e.key === "Enter" && inputField.value.trim()) {
        this.sendMessage(inputField.value.trim())
        this.clearAndFocusInput(inputField)
      }
    }
    handleSendButtonClick(): void {
      const inputField = this._shadowRoot.querySelector(".chat-input input")
      if (inputField.value.trim()) {
        this.sendMessage(inputField.value.trim())
        this.clearAndFocusInput(inputField)
      }
    }
    handleToggleChatClick(event: any): void {
      event.stopPropagation()
      this.toggleChat()
    }
    async sendMessage(message: string):  Promise<void>{
      //alert('hello user input')
      console.log("send function")
      /* @@ new code @@ */
      this.messages.push({ role: "user", content: message })
      this.render()
      this.addEventListeners()      
      const thinkingMessage = {
        role: "assistant-thinking",
        content: "thinking..."
      }
      this.messages.push(thinkingMessage)
      this.render()
      this.addEventListeners()
      this.apiPending = true
      this.updateSendButtonState()
      const chatLog = this._shadowRoot.querySelector(".chat-log")
      if (chatLog) {
        chatLog.scrollTop = chatLog.scrollHeight
      }
      this.thinkingTimeout = setTimeout(async () => {
        this.messages = this.messages.filter((msg) => msg !== thinkingMessage)
      }, 1000)
      const bearer = 'Bearer ' + Constants.YOUR_TOKEN
      if(!message) {
        message = ''
      }
      try {
        const response = await fetch(Constants.API_URL, {
          method: 'POST',
          headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "input": message
          })
          //body: JSON.stringify({ messages: this.messages.slice(-10})          
        })
        if (!response.ok) {
          throw new Error("Network response failed")
        }
        const botResponse = await response.json()
        this.totalTokens += this.estimateTokens(
          botResponse.output || "Sorry, I didn't understand that."
        )
        // Assuming the server returns a JSON object with a "content" key for the bot's reply
        this.messages.push({
          role: "assistant",
          content: botResponse.output || "Sorry, I didn't understand that.",
        })        
        console.log("Response from OpenAi: " +  botResponse.output)        
        this.setBotResponse(botResponse.output)        
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
        this.messages.push({
          role: "assistant",
          content: "Sorry, there was an error processing your message.",
        })  
      }
      // Check if the total number of tokens exceeds the limit
      while (this.totalTokens > Constants.TOKEN_LIMIT && this.messages.length > 0) {
        const removedMessage: any = this.messages.shift()
        this.totalTokens -= this.estimateTokens(removedMessage.content)
      }
      this.apiPending = false
      this.render()
      this.addEventListeners() 
      

    }
    setBotResponse(response: any): void {
      console.log(this.messages)
      setTimeout(function () {

      }, 500)
      //const chat_class = utils.getSelector('.chats')
      //chat_class && chat_class.insertAdjacentHTML('beforeend', botResponse.output)
              
      //this.render()
      //this.addEventListeners()

    }
    setBotResponseOld(response: any): void {
      setTimeout(function () {
        //_hideBotTyping()
        if (response.length < 1) {
          //let BotResponse = botMsgPrefix + FALLBACK_MSG + responseSuffix
          //getChatClass.insertAdjacentHTML('beforeend', BotResponse);
          //scrollToBottomOfResults()
        } else {
          //var BotResponse = botMsgPrefix + response + responseSuffix
          //getChatClass.insertAdjacentHTML('beforeend', BotResponse)
          //_scrollToBottomOfResults()
        }
      }, 500)
    }
    toggleChat(): void {
      this.isOpen = !this.isOpen
      this.render()
      this.addEventListeners() // Re-attach event listeners after rendering
    }
    updateSendButtonState(): void {
      const sendButton = this._shadowRoot.querySelector(".send-btn")
      if (this.apiPending) {
        sendButton.setAttribute("disabled", "disabled")
      } else {
        sendButton.removeAttribute("disabled")
      }
    }
    
    addEventListeners(): void {      
      if(this.shadowRoot) {        
        this._shadowRoot
          .querySelector(".toggle-chat-btn")
          .addEventListener("click", this.handleToggleChatClick.bind(this))        
        this._shadowRoot
          .querySelector(".close-btn")
          .addEventListener("click", this.handleCloseButtonClick.bind(this))
        this._shadowRoot        
          .querySelector(".send-btn")
          .addEventListener("click", this.handleSendButtonClick.bind(this))
        this._shadowRoot
          .querySelector(".chat-input input")
          .addEventListener("keydown", this.handleInputKeydown.bind(this))
      }
    }    
  }

  if (!customElements.get("chat-bot")) {
    console.log('customElement defined')
    customElements.define("chat-bot", ChatBot)
  }
}
createComponent()
