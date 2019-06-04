import shuffle from 'shuffle-array';
import './AppCard.scss';
import '../StoryCard/StoryCard';
import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';

class AppCard extends HTMLElement {
  addIdToStorage(id) {
    if (!localStorage.getItem('read_stories')) {
      localStorage.setItem('read_stories', '[]');
    }
    const readStories = JSON.parse(localStorage.getItem('read_stories'));
    if (readStories.indexOf(parseInt(id, 10)) === -1) {
      readStories.push(parseInt(id, 10));
    }
    localStorage.setItem('read_stories', JSON.stringify(readStories));
    this.ids = readStories;
  }

  constructor() {
    super();
    this.ids = JSON.parse(localStorage.getItem('read_stories'));
    this.stories = [];
    this.wormhole = false;
    this.newArticlesAlert = true;
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio === 1) {
        setTimeout(async () => {
          this.addIdToStorage(entries[0].target.getAttribute('id'));
          const story = await this.getNewStory();
          this.createStoryCard(story);
        }, 0);
      }
    }, {
      threshold: 1,
    });
  }

  async createStoryCard(story) {
    const storyCard = document.createElement('story-card');
    this.querySelector('.all-content').appendChild(storyCard);
    storyCard.setAttribute('class', story.title.length > 60 ? 'full-headline' : '');
    storyCard.setAttribute('title', story.title);
    storyCard.setAttribute('id', story.id);
    storyCard.setAttribute('summary', story.summary);
    storyCard.setAttribute('authors', `By ${story.authors.join(', ')}`);
    storyCard.setAttribute('image', story.image);
    storyCard.setAttribute('minutes', story.minutes);
    storyCard.setAttribute('likes', Math.round((story.weight || 0) / 1000) / 10);
    storyCard.text = story.content;

    if (this.newArticlesAlert && !this.wormhole) {
      storyCard.setAttribute('newarticles', this.stories.length + 1);
      this.newArticlesAlert = false;
    }
    this.observer.observe(storyCard);
  }

  async pullNewStoriesFromServer() {
    console.log(this.ids);
    // First, if wormhole isn't triggered, fetch new stories form latest
    if (!this.wormhole) {
      const stories = await fetch('/api/latest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: this.ids,
        }),
      });
      this.stories = await stories.json();
    }
    console.log(this.stories.length);
    if (this.stories.length === 0) {
      this.wormhole = true;
      const stories = await fetch('/api/wormhole/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: this.ids,
        }),
      });
      this.stories = await stories.json();
    }
  }

  async getNewStory() {
    if (this.stories.length === 0) {
      await this.pullNewStoriesFromServer();
    }
    return this.stories.pop();
  }

  async connectedCallback() {
    this.innerHTML = `
      <div class="all-content">
      </div>
    `;
    const story = await this.getNewStory();
    await this.createStoryCard(story);
  }
}

window.customElements.define('app-card', AppCard);
