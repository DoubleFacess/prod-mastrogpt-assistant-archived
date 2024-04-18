
<<<<<<< Updated upstream
import styles from './index.css'
=======
import styles from './assets/css/index.css';
>>>>>>> Stashed changes

export function createTemplate(greeting: string) {
  const template = document.createElement('template')

  template.innerHTML = `
    <style>${styles.toString()}</style>
    <div class="widget">
      <p class="greeting">${greeting}</p>
    </div>
  `;

  return template
}
