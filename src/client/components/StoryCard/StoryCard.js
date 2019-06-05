import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';
import FullStoryCard from '../FullStoryCard/FullStoryCard';
import './StoryCard.scss';
import './HeadlineStyles.scss';

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

  set image(value) {
    if (this.querySelector('.background-image')) {
      this.querySelector('.background-image').style.backgroundImage = `url('${value}'), linear-gradient(${this.getGradient()})`;
    }
  }

  set minutes(value) {
    if (this.querySelector('#minutes')) {
      this.querySelector('#minutes').setAttribute('data-content', `${value} min`);
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
      <div class="background-image" style="background-image: url('${this.image}'), linear-gradient(0deg, #200122 0%, #6F0000 100%)"></div>
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
