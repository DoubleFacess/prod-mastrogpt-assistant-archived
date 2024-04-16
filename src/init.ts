// Importa GreeterTest dal namespace globale
declare const GreeterTest: any

// Funzione per eseguire il codice al termine del caricamento della pagina
function runAfterPageLoad() {
    const widget = GreeterTest('Enzonav loves stinky feet')

    setTimeout(() => {
        widget.greeting = 'This is another message!'
    }, 3000)
}

// Esegui runAfterPageLoad al termine del caricamento della pagina
window.onload = runAfterPageLoad;
