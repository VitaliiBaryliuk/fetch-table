
export default class Pagination {
constructor({element, total, perPage, page, withInfo }) {
    this._element = element;
    this._total = total;
    this._perPage = perPage;
    this._page = page;
    this.withInfo = withInfo;
    this.pagesArr = [];
  }

  setPages(arr) {
    arr.forEach(() => {
      this.pagesArr.push(arr.splice(0, this._perPage));
    }); 
    this._render();
  }
  
  _render() {
    let pageCount = 1; 
    this._element.innerHTML = `
      ${this.pagesArr.map( page => `
      <li class='pagination__item'>${pageCount++}</li>
      `).join('')}
    `;
  }

}