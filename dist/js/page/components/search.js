import Component from '../../component.js';

export default class Search extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', 'search-button', () => {
      this.emit('search-clicked', form.input.value);
    });

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <form name="form" class="search-form">
        <input type="text" name='input' placeholder="Search..." data-element="search-input" />
        <input type="button" value="Search" data-element="search-button">
      </form>
    `;
  }
}
