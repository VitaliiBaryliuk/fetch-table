export default class dbService {

  async getData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(phones => resolve(phones));
    });
  }
}

new bdService();
