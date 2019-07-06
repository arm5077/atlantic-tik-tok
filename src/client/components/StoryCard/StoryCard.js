import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';
import FullStoryCard from '../FullStoryCard/FullStoryCard';
import './StoryCard.scss';
import './HeadlineStyles.scss';

class StoryCard extends HTMLElement {
  constructor() {
    super();
    this.gradients = [
      'to bottom, #1565C0, #b92b27',
      'to top, #4286f4, #373B44',
      'to bottom, #4A00E0, #8E2DE2',
      'to top, #f5af19, #f12711',
      'to top, #2ebf91, #8360c3',
      'to top, #eaafc8, #654ea3',
      'to bottom, #FF4B2B, #FF416C',
      'to bottom, #F37335, #FDC830',
      'to bottom, #89216B, #DA4453',
      'to bottom, #3c1053, #ad5389',
    ];
  }

  static get observedAttributes() {
    return ['title', 'summary', 'authors', 'image', 'minutes', 'likes', 'alertmessage'];
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
      this.querySelector('full-story-card').setAttribute('title', value);
    }
  }

  set summary(value) {
    if (this.querySelector('h2')) {
      this.querySelector('h2').innerHTML = value;
      this.querySelector('full-story-card').setAttribute('summary', value);
    }
  }

  set authors(value) {
    if (this.querySelector('full-story-card')) {
      this.querySelector('full-story-card').setAttribute('authors', value);
    }
  }

  set minutes(value) {
    if (this.querySelector('#minutes')) {
      this.querySelector('#minutes').setAttribute('data-content', `${value} min`);
    }
  }

  set image(value) {
    if (this.querySelector('full-story-card')) {
      this.querySelector('full-story-card').setAttribute('image', `${value}`);
    }
  }

  set likes(value) {
    if (this.querySelector('#likes')) {
      this.querySelector('#likes').setAttribute('data-content', `${value}K`);
    }
  }

  set alertmessage(value) {
    if (this.querySelector('.new-article-alert') && value) {
      this.querySelector('.new-article-alert').setAttribute('data-content', value);
      this.querySelector('.new-article-alert').classList.remove('hidden');
    }
  }

  set text(value) {
    if (this.querySelector('full-story-card')) {
      this.querySelector('full-story-card').text = value;
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="background" style="background: linear-gradient(${this.getGradient()})"></div>
      <div class="new-article-alert hidden"></div>
      <div class="content">
        <h1>${this.title}</h1>
        <h2>${this.summary}</h2>
        <div class="icon-tray">
          <div class="icon" id="likes" data-content="${this.likes}">
            <img src='${HeartIcon}' />
          </div>
          <div class="icon" id="minutes" data-content="${this.minutes}">
            <img src='${ClockIcon}' />
          </div>
        </div>
      </div>
      <full-story-card
          class = "hidden"
          title = "${this.title}"
          summary = "${this.dek}"
          image = "${this.image}"
      ></full-story-card>
    `;

    this.title = this.getAttribute('title');
    this.summary = this.getAttribute('summary');
    this.image = this.getAttribute('image');
    this.minutes = this.getAttribute('minutes');
    this.likes = this.getAttribute('likes');
    this.alertmessage = this.getAttribute('alertmessage');
    this.text = this.text;
    this.authors = this.authors;

    this.addEventListener('click', () => {
      this.querySelector('full-story-card').classList.remove('hidden');
    });
  }
}

window.customElements.define('story-card', StoryCard);
