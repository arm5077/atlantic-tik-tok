import stories from '../../data/stories.json';
import './AppCard.scss';
import '../StoryCard/StoryCard';
import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';

class AppCard extends HTMLElement {
  constructor() {
    super();
    this.stories = stories;
  }

  connectedCallback() {
    const story = this.stories[Math.round(Math.random() * this.stories.length)];
    this.innerHTML = `
      <story-card
        title = "${story.title}"
        summary = "${story.dek}"
        image = "${story.image}"
      ></story-card>
    `;
  }
}

window.customElements.define('app-card', AppCard);
