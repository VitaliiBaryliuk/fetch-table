import Page from './page/page.js';

console.log('OK');

const currentPage = new Page({
  element: document.querySelector('[data-component="root"]'),
});
