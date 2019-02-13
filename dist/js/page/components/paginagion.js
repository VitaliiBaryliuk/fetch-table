import Component from '../../component.js';

export default class Pagination extends Component {
  constructor(
    {
      element,
      total,
      perPage,
      page,
      withInfo,
    },
  ) {
    super(element);
    this._element = element;
    this._total = total;
    this._perPage = perPage;
    this.page = page;
    this.withInfo = withInfo;
    this.pagesArr = [];

    this.on('click', 'pagination-item', (event) => {
      this.emit('page-changed', event.target);
    });

    this.on('change', 'items-on-page', (event) => {
      this.itemsPerPage(event.target.value);
      this.emit('items-on-page-ganged', event.target);
    });
  }

  setPages(arr) {
    this.pagesArr = [];
    arr.forEach(() => {
      this.pagesArr.push(arr.splice(0, this._perPage));
    });
    this._render();

    return this.pagesArr;
  }

  itemsPerPage(numPerPage) {
    this._perPage = Number(numPerPage);
  }

  _render() {
    let pageCount = 1;
    this._element.innerHTML = `
      <select class="pagination__selsect" value="${this._perPage}" data-element="items-on-page">
        <option value="${this._perPage}" hidden>${this._perPage}</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>  
      ${this.pagesArr.map(page => `
      <li class='pagination__item' data-element="pagination-item">${pageCount++}</li>
      `).join('')}
    `;
  }
}
