import DbService from './services/db-service.js';
import Table from './components/table.js';
import Search from './components/search.js';
import Pagination from './components/paginagion.js';

const PHONES_LINK = 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json';

export default class Page {
  constructor({ element }) {
    this._element = element;

    this.promise = new DbService();

    this.promise.getData(PHONES_LINK)
      .then((phones) => {
        this._pagination = new Pagination({
          element: this._element.querySelector('[data-component="pagination"]'),
          total: 20,
          perPage: 5,
          page: 1,
          withInfo: false,
        });


        const phonesBase = this._pagination.setPages([...phones]);
        this._pagination.subscribe(
          'page-changed',
          (target) => {
            this._table.changePage(target.textContent);
          });

        this._pagination.subscribe(
          'items-on-page-ganged',
          () => {
            const phonesChenged = this._pagination.setPages([...phones]);
            this._table.changeItemsCount(phonesChenged);
          });

        this._table = new Table({
          element: this._element.querySelector('[data-component="table"]'),
          phones: phonesBase,
          activePage: this._pagination.page,
        });

        this._table.subscribe(
          'sort',
          (value) => {
            let sortedArr = this._table.sort(value, [...phones]);
            sortedArr = this._pagination.setPages(sortedArr);
            this._table.changeItemsCount(sortedArr);
          },
        );

        this._table.subscribe(
          'selected-all',
          (topCheckbox) => {
            this._table.setAllSelected(topCheckbox);
          },
        );

        this._table.subscribe(
          'show-selected',
          (status) => {
            if (status === 'Show selected') {
              this._table.selectedStatus = 'Show all';
              let filtredArr = this._table.getSelected([...phones]);
              filtredArr = this._pagination.setPages(filtredArr);
              this._table.changeItemsCount(filtredArr);
            } else {
              this._table.selectedStatus = 'Show selected';
              const filtredArr = this._pagination.setPages([...phones]);
              this._table.changeItemsCount(filtredArr);
            }
          },
        );

        this._search = new Search({ element: document.querySelector('[data-component="search"]') });

        this._search.subscribe('search-clicked', (value) => {
          let filtredArr = this._table.search(value, [...phones]);
          filtredArr = this._pagination.setPages(filtredArr);
          this._table.changeItemsCount(filtredArr);
        });
      });
  }
}
