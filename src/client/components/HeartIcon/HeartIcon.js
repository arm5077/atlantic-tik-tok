import './HeartIcon.scss';
import HeartSolid from './assets/heart-solid.svg';
import HeartRegular from './assets/heart-regular.svg';

class HeartIcon extends HTMLElement {
  static get observedAttributes() {
    return ['activated'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  set activated(value) {
    const icon = this.querySelector('img');
    icon.setAttribute('src', value ? HeartSolid : HeartRegular);
  }

  connectedCallback() {
    this.innerHTML = `
      <img src />
    `;

    if (this.getAttribute('text')) {
      this.innerHTML = `${this.innerHTML}<span>${this.getAttribute('text')}</span>`;
    }

    this.activated = this.getAttribute('activated') || false;
    this.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.getAttribute('activated')) {
        this.removeAttribute('activated');
      } else {
        this.setAttribute('activated', 'true');
      }
    });
  }
}

window.customElements.define('heart-icon', HeartIcon);
