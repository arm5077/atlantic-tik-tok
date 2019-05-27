import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';
import './StoryCard.scss';

class StoryCard extends HTMLElement {
  constructor() {
    super();
    this.gradients = [
      '0deg, #200122 0%, #6F0000 100%',
      '225deg, #2C5364, #203A43, #0F2027',
      '225deg, #fdeff9, #ec38bc, #7303c0, #03001e',
    ];
  }

  static get observedAttributes() {
    return ['title', 'summary', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  getGradient() {
    return this.gradients[Math.floor(Math.random() * this.gradients.length)];
  }

  set title(value) {
    if (this.querySelector('h1')) {
      this.querySelector('h1').innerHTML = value;
    }
  }

  set summary(value) {
    if (this.querySelector('h2')) {
      this.querySelector('h2').innerHTML = value;
    }
  }

  set image(value) {
    if (this.querySelector('.background-image')) {
      this.querySelector('.background-image').style.backgroundImage = `url('${value}'), linear-gradient(${this.getGradient()})`;
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="background-image" style="background-image: url('${this.image}'), linear-gradient(0deg, #200122 0%, #6F0000 100%)"></div>
      <div class="content">
        <h1>${this.title}</h1>
        <h2>${this.summary}</h2>
        <div class="icon-tray">
          <div class="icon" data-content="5K">
            <img src='${HeartIcon}' />
          </div>
          <div class="icon" data-content="5 min">
            <img src='${ClockIcon}' />
          </div>
        </div>
      </div>
    `;
    this.title = this.getAttribute('title');
    this.summary = this.getAttribute('summary');
    this.image = this.getAttribute('image');
  }
}

window.customElements.define('story-card', StoryCard);
