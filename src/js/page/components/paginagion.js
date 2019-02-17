import Component from '../../component.js';

export default class Pagination extends Component {
  constructor(
    { element, props },
  ) {
    super({ element });

    this._props = props;

    this._render();

    this.addEventListeners();
  }

  get pages() {
    const pages = [];
    const { pagesCount } = this._props;

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  _setPage(page) {
    const { pagesCount } = this._props;
    const correctPage = Math.min(
      Math.max(1, page), pagesCount,
    );

    this.emit('page-changed', correctPage);
  }

  _setPerPage(perPage) {
    this.emit('per-page-changed', perPage);
  }

  addEventListeners() {
    this.on('click', 'pagination-item', ({ target }) => {
      this._setPage(target.dataset.page);
    });

    this.on('change', 'items-on-page', ({ target }) => {
      const perPage = target.value;
      this._setPerPage(perPage);
    });

    this.on('click', 'next-button', () => {
      const { currentPage } = this._props;
      this._setPage(currentPage + 1);
    });

    this.on('click', 'prev-button', () => {
      const { currentPage } = this._props;
      this._setPage(currentPage - 1);
    });
  }

  _updateView() {
    this._render();
  }

  _render() {
    const { perPage } = this._props;

    this._element.innerHTML = `
      <select class="pagination__selsect" value="${perPage}" data-element="items-on-page">
        <option value="${perPage}" hidden>${perPage}</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select> 
      <button class='pagination__item' data-element="prev-button"> < </button> 
      ${this.pages.map(page => `
      <button class='pagination__item' data-element="pagination-item" data-page="${page}">${page}</button>
      `).join('')}
      <button class='pagination__item' data-element="next-button"> > </button>
    `;
  }
}
