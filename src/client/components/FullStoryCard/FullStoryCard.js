import './FullStoryCard.scss';
import '../StoryCard/StoryCard.scss';
import TimesSymbol from '../../assets/times-solid.svg';

class FullStoryCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'summary', 'authors', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
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

  set authors(value) {
    if (this.querySelector('.byline')) {
      this.querySelector('.byline').innerHTML = value;
    }
  }

  set text(value) {
    if (this.querySelector('.text')) {
      this.querySelector('.text').innerHTML = value;
    }
  }

  set image(value) {
    if (this.querySelector('.image img')) {
      this.querySelector('.image img').setAttribute('src', value);
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="nav">
        <img src="${TimesSymbol}" />
      </div>
      <div class="content">
        <div class="image">
          <img src="${this.image}"/>
        </div>
        <h1>${this.title}</h1>
        <h2>${this.summary}</h2>
        <div class="byline">${this.authors}</div>
        <div class="text"></div>
      </div>
    `;
    this.querySelector('.nav').addEventListener('click', (e) => {
      e.stopPropagation();
      this.classList.add('hidden');
    });
  }
}

window.customElements.define('full-story-card', FullStoryCard);
