const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';

const PhoneService = {
  async getAll() {
    const phonesFromServer = await this._sendRequest('/phones/phones');

    return phonesFromServer;
  },

  _sendRequest(url) {
    return fetch(`${BASE_URL}${url}.json`)
      .then(response => response.json())
      .catch((error) => {
        console.warn(error);

        return Promise.reject(error);
      });
  },
};

export default PhoneService;
