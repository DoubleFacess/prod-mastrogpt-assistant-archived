export function createEl(arg: string) {
    return document.createElement(arg)
}

export function getEl(div: string) {
    if(document.getElementById(div)) {
        return document.getElementById(div)
    } else return false
}

export function getSelector(div: string) {
    if(document.querySelector(div)) {
        return document.querySelector(div)
    } else return false
}