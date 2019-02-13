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
        this._table = new Table({
          element: this._element.querySelector('[data-component="table"]'),
          phones,
        });

        this._table.subscribe(
          'sort',
          (value) => {
            this._table.sort(value);
          }
        );

        this._table.subscribe(
          'selected-all', 
          (topCheckbox) => {
            this._table.setAllSelected(topCheckbox);
          }
        );

        this._table.subscribe(
          'show-selected', 
          (status) => {
            if (status === 'Show selected')  {
              this._table.selectedStatus = 'Show all';
              this._table.getSelected();
            } else {
              this._table.selectedStatus = 'Show selected';
              this._table.getAll();
            } 
          }
        );

        this._search = new Search({ element: document.querySelector('[data-component="search"]') });
          
        this._search.subscribe('search-clicked', (value) => {
          this._table.search(value);
        });

        // this.pagination = new Pagination({
        //   element: this._element.querySelector('[data-component="pagination"]'),
        //   total: 20, 
        //   perPage: 5,
        //   page: 1,
        //   withInfo: false,
        // });

        // this.pagination.setPages(phones);

      });
  } 

}
