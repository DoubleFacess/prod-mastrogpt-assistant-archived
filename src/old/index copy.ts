import { createTemplate } from '../template'
import {test} from '../main'
import * as starter from '../main'

test('hello world!')

/* @@ costants @@ */

const WC_TAG_NAME = 'my-widget'

declare const GreeterTest: any

/* @@ init function @@ */

function init() {
    const widget = GreeterTest('Enzonav is Great Programmer!!')

    setTimeout(() => {
        widget.greeting = 'This is another message!'
    }, 3000)
}

/* @@ start on load @@ */

window.onload = init

/* @@ core library @@ */

export default function createComponent(greeting: string) {
  const template = createTemplate(greeting)

  class GreeterWidgetElement extends HTMLElement {
    constructor() {
      super()
  
      const shadowDOM = this.attachShadow({ mode: 'open' })
      // Render the template in the shadow dom
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
        greetingEl.textContent = val;  
      }
    }
  }

  if (!customElements.get(WC_TAG_NAME)) {
    customElements.define(WC_TAG_NAME, GreeterWidgetElement);
  }

  // create an instance of the component
  const componentInstance = document.createElement(WC_TAG_NAME, {
    is: WC_TAG_NAME,
  });

  // mount the component instance in the body element
  const container = document.body;
  container.appendChild(componentInstance);

  return componentInstance;
}


