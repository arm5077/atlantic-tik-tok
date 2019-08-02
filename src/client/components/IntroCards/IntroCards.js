import '../StoryCard/HeadlineStyles.scss';
import './IntroCards.scss';
import IntroPoseidon from './assets/intro-poseidon.jpg';

class IntroCards extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="card first">
        <div class="title-wrapper">
          <h1>The Atlantic Discovery</h1>
          <div class="swipe-up">Swipe up to begin</div>
        </div>
        <img src="${IntroPoseidon}" />
      </div>
      <div class="card">
        <h1>New here, huh?</h1>
        <p>Looks like this is the first time you've been here, so here are a few pointers.</p>
        <ul>
          <li data-index="1"><strong>Swipe up</strong> to get a story.</li>
          <li data-index="2"><strong>Tap</strong> to read it — if you want!</li>
          <li data-index="3"><strong>Swipe up</strong> to get another one. Repeat as desired.</li>
          <li data-index="4">We’ll always show you our newest stories first, but when you’re done, <strong>Enter The Wormhole</strong> to read the best stuff we’ve ever written.</li>
        </ul>
        <div class="swipe-up" style="position:absolute">Swipe up to continue</div>
      </div>
    
    `;
  }
}

window.customElements.define('intro-cards', IntroCards);
