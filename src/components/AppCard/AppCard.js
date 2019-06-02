import shuffle from 'shuffle-array';
import stories from '../../data/stories.json';
import './AppCard.scss';
import '../StoryCard/StoryCard';
import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';

class AppCard extends HTMLElement {
  constructor() {
    super();
    this.stories = stories;
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio === 1) {
        setTimeout(() => {
          this.createStoryCard(this.getNewStory());
        }, 0);
      }
    }, {
      threshold: 1,
    });
  }

  createStoryCard(story) {
    console.log(story);
    const storyCard = document.createElement('story-card');
    this.querySelector('.all-content').appendChild(storyCard);
    storyCard.setAttribute('class', story.title.length > 60 ? 'full-headline' : '');
    storyCard.setAttribute('title', story.title);
    storyCard.setAttribute('summary', story.dek);
    storyCard.setAttribute('authors', `By ${story.authors.join(', ')}`);
    storyCard.setAttribute('image', story.image);
    storyCard.setAttribute('minutes', story.minutes);
    storyCard.setAttribute('likes', Math.round(story.weight / 1000) / 10);
    storyCard.text = story.content;
    this.observer.observe(storyCard);
  }

  getNewStory() {
    shuffle(this.stories);
    return this.stories[0];
  }

  connectedCallback() {
    shuffle(this.stories);
    this.innerHTML = `
      <div class="all-content">
      </div>
    `;

    for (let i = 0; i <= 5; i += 1) {
      this.createStoryCard(this.getNewStory());
    }
  }
}

window.customElements.define('app-card', AppCard);
