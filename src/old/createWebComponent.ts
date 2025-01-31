import {Constants} from '../constants'
import { createTemplate } from '../template'
/* @@ core library @@ */

export default function createComponent(greeting: string) {
  const template = createTemplate(greeting)

  class GreeterWidgetElement extends HTMLElement {
    constructor() {
      super()
  
      const shadowDOM = this.attachShadow({ mode: 'open' })
      /* Render the template in the shadow dom */
      shadowDOM.appendChild(template.content.cloneNode(true))      
    }

    
    get greeting(): string {
      const greetingEl = this.shadowRoot?.querySelector(
        '.greeting'
      )

      return greetingEl?.textContent || '';
    }

    set greeting(val: string) {
      const greetingEl = this.shadowRoot?.querySelector(
        '.greeting'
      );

      if (greetingEl) {
        greetingEl.textContent = val
      }
    }
  }

  if (!customElements.get(Constants.WC_TAG_NAME)) {
    customElements.define(Constants.WC_TAG_NAME, GreeterWidgetElement);
  }

  /* create an instance of the component */
  const componentInstance = document.createElement(Constants.WC_TAG_NAME, {
    is: Constants.WC_TAG_NAME,
  });

  /* mount the component instance in the body element */
  const container = document.body
  container.appendChild(componentInstance)

  return componentInstance
}
