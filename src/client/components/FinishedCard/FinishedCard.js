import '../StoryCard/HeadlineStyles.scss';
import './FinishedCard.scss';
import VacationPoseidon from './assets/poseidon-vacation.jpg';

class FinishedCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="card">
        <h1>That's all, folks</h1>
        <img src="${VacationPoseidon}" />
        <p>Want more Atlantic? Jump into <br /><strong>The Wormhole</strong> and begin an adventure with the best journalism from our archive.</p>
        <button>Enter the wormhole</button>
        <div class="checkbox-container">
          <input type="checkbox" id="wormhole-checkbox" />
          <label for="wormhole-checkbox">Always take me to The Wormhole when I'm done reading new stories</label>
        </div>
      </div>
    `;
    this.querySelector('button').addEventListener('click', () => {
      this.closest('app-card').enterWormhole();
    });

    this.querySelector('#wormhole-checkbox').addEventListener('input', (e) => {
      this.closest('app-card').alwaysEnterWormhole = e.target.checked;
      localStorage.setItem('always_enter_wormhole', e.target.checked);
    });
  }
}

window.customElements.define('finished-card', FinishedCard);
