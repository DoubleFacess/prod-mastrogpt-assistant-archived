import { createTemplate } from './template'
import styles from './assets/css/style.css';
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

      fetch('/assets/css/style.css') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load CSS file');
        } console.log(response.text())
        return response.text()
      })      
      /*
      .then(css => {        
        this.styles = css        
        this.render()
        console.log('css loaded')
        this.addEventListeners()
        console.log('event listener loaded')
      })
      .catch(e => console.log('error fetching style.css'))
      */

      console.log('web components runs!')
      
    }    

    connectedCallback() {
      console.log('connected callback')
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

