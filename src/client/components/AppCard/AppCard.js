import shuffle from 'shuffle-array';
import './AppCard.scss';
import '../StoryCard/StoryCard';
import '../IntroCards/IntroCards';
import '../FinishedCard/FinishedCard';
import HeartIcon from '../../assets/heart-regular.svg';
import ClockIcon from '../../assets/clock-regular.svg';

class AppCard extends HTMLElement {
  addIdToStorage(id) {
    // If there isn't a local storage item initialized, make a new one.
    if (!localStorage.getItem('read_stories')) {
      localStorage.setItem('read_stories', '[]');
    }

    // Grab list of stories, turn into JSON, and add ID if it isn't there already
    const readStories = JSON.parse(localStorage.getItem('read_stories'));
    if (readStories.indexOf(parseInt(id, 10)) === -1) {
      readStories.push(parseInt(id, 10));
    }

    // Save it back to local storage (and save as class attribute too)
    localStorage.setItem('read_stories', JSON.stringify(readStories));
    this.ids = readStories;
    console.log(this.ids);
  }

  constructor() {
    super();
    this.stories = [];

    // Let's presume we're not in the wormhole
    this.wormhole = false;

    // Pull wormhole preference
    this.alwaysEnterWormhole = localStorage.getItem('always_enter_wormhole');
    console.log(localStorage.getItem('always_enter_wormhole'));

    // Grab list of read ids, and only show new alert IF we've
    // used the app before
    this.ids = JSON.parse(localStorage.getItem('read_stories'));
    this.newArticlesAlert = this.ids;
    if (!this.ids) {
      this.ids = [];
    }

    // Set up observer for every time someone looks at a story card
    this.observer = new IntersectionObserver((entries) => {
      const id = parseInt(entries[0].target.getAttribute('id'), 10);
      if (entries[0].intersectionRatio === 1 && this.ids.indexOf(id) === -1) {
        setTimeout(async () => {
          this.addIdToStorage(id);
          const story = await this.getNewStory();
          this.createStoryCard(story);
        }, 0);
      }
    }, {
      threshold: 1,
    });
  }

  async createStoryCard(story) {
    if (!story) {
      return;
    }
    const storyCard = document.createElement('story-card');
    this.querySelector('.all-content').appendChild(storyCard);
    if (story.title.length > 60) {
      storyCard.classList.add('full-headline');
    }
    storyCard.setAttribute('title', story.title);
    storyCard.setAttribute('id', story.id);
    storyCard.setAttribute('summary', story.summary);
    storyCard.setAttribute('authors', `By ${story.authors.join(', ')}`);
    storyCard.setAttribute('image', story.image);
    storyCard.setAttribute('minutes', story.minutes);
    storyCard.setAttribute('likes', Math.round((story.weight || 0) / 1000) / 10);
    storyCard.text = story.content;

    // If this is the first card AND we're not in the intro
    // AND we're not in the wormhole, we need to show the "new stories" alert
    if (this.newArticlesAlert && !this.wormhole) {
      storyCard.setAttribute('alertmessage', `${this.stories.length + 1} new articles published!`);
      this.newArticlesAlert = false;
    }

    // If we're done with articles and we've opted into wormhole,
    // let's still show a wormhole message.
    if (this.newArticlesAlert && this.wormhole) {
      storyCard.setAttribute('alertmessage', 'Wormhole time!');
      this.newArticlesAlert = false;
    }

    // Turn on intersection observer to log when this card is read
    this.observer.observe(storyCard);
  }

  createFinishedCard() {
    const finishedCard = document.createElement('finished-card');
    this.querySelector('.all-content').appendChild(finishedCard);
  }

  async pullNewStoriesFromServer() {
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

    // If there aren't any new stories to be had, trigger wormhole
    if (this.stories.length === 0) {
      if (this.wormhole || this.alwaysEnterWormhole) {
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
      } else {
        this.createFinishedCard();
      }
    }
  }

  async getNewStory() {
    console.log(this.stories);
    if (this.stories.length === 0) {
      await this.pullNewStoriesFromServer();
    }
    return this.stories.pop();
  }

  async enterWormhole() {
    this.wormhole = true;
    this.stories = [];
    const story = await this.getNewStory();
    await this.createStoryCard(story);
    this.querySelector('story-card:last-of-type').scrollIntoView({
      behavior: 'smooth',
    });
  }

  async connectedCallback() {
    this.innerHTML = `
      <div class="all-content">
        ${(!localStorage.getItem('read_stories')) ? '<intro-cards></intro-cards>' : ''}
      </div>
    `;
    const story = await this.getNewStory();
    await this.createStoryCard(story);
  }
}

window.customElements.define('app-card', AppCard);
