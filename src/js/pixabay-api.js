import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = { key: '39112042-a8ee95fcff8586fd27b05fb5f' };

export class PixabayAPI {
  totalPage = 1;
  constructor(endpoint = '') {
    this.endpoint = endpoint;
    this.config = {
      params: {
        q: '',
        page: 1,
        per_page: 20,
      },
    };
  }
  async search() {
    return axios(`${this.endpoint}`, this.config).then(({ data }) => {
      this.totalPage = Math.ceil(data.totalHits / this.config.params.per_page);
      this.config.params.page += 1;
      return data;
    });
  }
  currentPage() {
    return this.config.params.page;
  }
  setSearchQuestion(q) {
    this.config.params.q = q;
    this.config.params.page = 1;
  }
  setParams(params) {
    for (const key in params) {
      this.config.params[key] = params[key];
    }
  }
  setConfig(config) {
    for (const key in config) {
      this.config[key] = config[key];
    }
  }
}
