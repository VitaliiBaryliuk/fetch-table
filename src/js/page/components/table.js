import Component from '../../component.js';

export default class Table extends Component {
  constructor({ element, phones = [], activePage }) {
    super(element);
    this._element = element;
    this._phones = phones;
    this._activePage = activePage;
    this._renderedArr = this._phones;
    this._allPhones = phones;
    this._sortCounterAge = 1;
    this._sortCounterName = 1;
    this.selectedStatus = 'Show selected';
    this.columnConfig = {
      name: {
        title: 'Название',
        isSortable: true,
        isSearchable: true,
      },
      age: {
        title: 'Возраст',
        isSortable: true,
      },
      snippet: {
        title: 'Описание',
        isSearchable: true,
      },
    };

    this._render();

    this.on('click', 'sort', (event) => {
      this.emit('sort', event.target.dataset.value);
    });

    this.on('click', 'select-all', (event) => {
      this.emit('selected-all', event.target);
    });

    this.on('click', 'show-selected', () => {
      if (this.selectedStatus === 'Show selected') {
        this.emit('show-selected', this.selectedStatus);
      } else {
        this.emit('show-selected', this.selectedStatus);
      }
    });
  }

  setAllSelected(topCheckbox) {
    const checkboxes = this._element.querySelectorAll('[type="checkbox"]');
    Array.from(checkboxes).map(checkbox => checkbox.checked === topCheckbox.checked);
  }

  getSelected(arr) {
    const tempArr = [];
    const checkboxes = Array.from(this._element.querySelectorAll('[type="checkbox"]'))
      .filter(item => item.checked);
    arr.map((phone) => {
      checkboxes.map((item) => {
        if (item.dataset.id === phone.id) {
          tempArr.push(phone);
        }
      });
    });
    return tempArr;
  }

  getAll(arr) {
    this._renderedArr = arr;
  }

  changePage(pageNumber) {
    this._activePage = Number(pageNumber);
    this._render();
  }

  changeItemsCount(newArr) {
    this._renderedArr = newArr;
    this._render();
  }

  sort(value, arr) {
    if (value === 'age') {
      arr.sort((a, b) => {
        if (this._sortCounterAge % 2 === 0) {
          return a[value] - b[value];
        }
        return b[value] - a[value];
      });
      this._sortCounterAge += 1;
    } else {
      arr.sort((a, b) => {
        if (this._sortCounterName % 2 === 0) {
          return a[value] > b[value] ? 1 : -1;
        }
        return a[value] < b[value] ? 1 : -1;
      });
      this._sortCounterName += 1;
    }
    return arr;
  }

  search(value, arr) {
    this._renderedArr = arr.filter(item => item.name.includes(value));

    return this._renderedArr;
  }

  _render() {
    console.log('this._renderedArr', this._renderedArr);
    this._element.innerHTML = `
      <div class='phones'>
        <table class="phones__table">
          <tr>
            <th class="phones__td">
              <input type="checkbox" data-element="select-all" />
              <button data-element="show-selected">${this.selectedStatus}</button>
            </th>
              ${Object.keys(this.columnConfig).map(option => `
            <th 
              class="phones__th" 
              data-element="${this.columnConfig[option].isSortable ? 'sort' : 'unsort'}"
              data-element="${this.columnConfig[option].isSearchable ? 'search' : 'unsearch'}"
              data-value="${option}">
                ${this.columnConfig[option].title}
            </th>
            `).join('')} 
          </tr>

        ${ !this._renderedArr.length ? '' : this._renderedArr[this._activePage - 1].map(phone => `
          <tr>
          <td class="phones__td">
            <input type="checkbox" data-id="${phone.id}" />
          </td>
            <td class="phones__td">
              ${phone.name}
            </td>
            <td class="phones__td">
              ${phone.age}
            </td>
            <td class="phones__td">
              ${phone.snippet}
            </td>
          </tr>
          `).join('')}
        </table>
      </div>
    `;
  }
}
