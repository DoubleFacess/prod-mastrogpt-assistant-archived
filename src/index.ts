import { createTemplate } from './template'
import {test} from './main'
import {Constants} from './constants'
import * as starter from './main'

//test('hello world!')

/*
declare const NuvolarisAssistant: any

/* @@ init function @@ */

/*function init() {
    const widget = NuvolarisAssistant()

    setTimeout(() => {
      widget.greeting = 'This is another message!'
    }, 3000)
}

/* @@ start on load @@ */



/* @@ core library @@ */

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

      fetch('./style.css')  
      .then(response => response.text())
      .then(css => {        
        this.styles = css        
        this.render()
        console.log('css loaded')
        //this.addEventListeners()
      })
      .catch(e => console.log('error fetching style.css'))

      console.log('web components runs!')
      
    }    

    connectedCallback() {
      this.render()
      this.addEventListeners()
    }
    get test() {
      return this.shadowRoot
    }

    render(): void {
      
    }
    addEventListeners(): void {

    }
  }
  customElements.define('chat-bot', ChatBot)  
}
createComponent()

