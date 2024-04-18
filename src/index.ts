import createComponent from './createWebConponent'
//import {Constants} from './constants'
//import {test} from './main'
//import * as starter from './main'
//test('hello world!')

<<<<<<< Updated upstream
test('hello world!')

/* @@ costants @@ */

const WC_TAG_NAME = 'my-widget'

declare const NuvolarisAssistant: any
=======
declare const MastroGptWidget: any
>>>>>>> Stashed changes

/* @@ init function @@ */

function init() {
<<<<<<< Updated upstream
    const widget = NuvolarisAssistant('Enzonav is Great Programmer!!')
=======
    const widget = MastroGptWidget('Need refactor all libraries')
>>>>>>> Stashed changes

    setTimeout(() => {
        widget.greeting = 'Hard life for programmers!'
    }, 3000)
}

/* @@ start on load @@ */

window.onload = init




