import Table from './components/table.js';
import Search from './components/search.js';
import Pagination from './components/paginagion.js';
import Component from '../component.js';
import PhoneService from './services/db-service.js';

export default class Page extends Component {
  constructor({ element }) {
    super({ element });

    this._state = {
      phones: [],

      currentPage: 1,
      perPage: 5,

      query: '',
      sortBy: 'age',

      selectedAll: false,
    };

    this._showPhones();
    this._initPhoneTable();
    this._initPagination();
    this._initSearch();
  }

  get pagesCount() {
    const { perPage, phones } = this._state;

    return Math.ceil(phones.length / perPage);
  }

  async _showPhones() {
    const phones = await PhoneService.getAll();

    this._setState({
      phones,
      currentPage: 1,
    });
  }

  _initPhoneTable() {
    this._table = new Table(
      { element: this._element.querySelector('[data-component="table"]') },
    );

    this._table.subscribe('order-changed', (value) => {
      let { phones } = this._state;
      phones = this._table.sort(value, phones);
      this._setState({ phones });
    });

    this._table.subscribe('phone-selected', (phoneId) => {
      const { phones } = this._state;
      const clickedPhone = phones.find(phone => phone.id === phoneId);
      clickedPhone['selected-status'] = !clickedPhone['selected-status'];

      this._setState({ phones });
    });
  }

  _initPagination() {
    this._pagination = new Pagination({
      element: this._element.querySelector('[data-component="pagination"]'),
      props: {
        perPage: this._state.perPage,
        currentPage: this._state.currentPage,
        pagesCount: this.pagesCount,
      },
    });

    this._pagination.subscribe('page-changed', (currentPage) => {
      this._setState({ currentPage });
    });

    this._pagination.subscribe('per-page-changed', (perPage) => {
      this._setState({ perPage, currentPage: 1 });
    });
  }

  _initSearch() {
    this._search = new Search({
      element: document.querySelector('[data-component="search"]'),
    });


    this._search.subscribe(
      'search-clicked',
      (query) => {
        this._setState({ query });
      },
    );
  }

  _updateView() {
    const {
      perPage,
      currentPage,
      query,
    } = this._state;

    let { phones } = this._state;

    if (query) {
      const regex = new RegExp(query, 'i');
      phones = phones.filter(listItem => regex.test(listItem.name));
    }

    const paginationProps = {
      pagesCount: Math.ceil(phones.length / perPage),
      currentPage,
      perPage,
    };

    const startIndex = (currentPage - 1) * perPage;
    const lastIndex = startIndex + Number(perPage);
    const visiblePhoenes = phones.slice(startIndex, lastIndex);
    this._table.show(visiblePhoenes);

    this._pagination.setProps(paginationProps);
  }
}
