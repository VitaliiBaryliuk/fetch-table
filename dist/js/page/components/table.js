import Component from '../../component.js';

export default class Table extends Component {
  constructor({ element }) {
    super({ element });

    this._phones = [];

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

    this._sortCounterAge = 1;
    this._sortCounterName = 0;

    this._render();

    this.AddEventListeners();
  }

  show(phones) {
    this._phones = phones;

    super.show();

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

  AddEventListeners() {
    this.on('click', 'sort', ({ target }) => {
      this.emit('order-changed', target.dataset.value);
    });

    this.on('click', 'checkbox', ({ target }) => {
      const phone = target.dataset.id;

      this.emit('phone-selected', phone);
    });
  }

  _render() {
    this._element.innerHTML = `
    <div class='phones'>
      <table class="phones__table">
        <tr>
          <th class="phones__td">
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
          ${this._phones.map(phone => `
            <tr>
              <td class="phones__td">
                <input 
                  data-element="checkbox"
                  type="checkbox" 
                  data-id="${phone.id}" 
                  data-status="${phone['selected-status'] ? phone['selected-status'] : false}" 
                  ${phone['selected-status'] ? 'checked' : ''}
              />
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
