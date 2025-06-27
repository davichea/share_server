import { BaseHttp } from "./baseHttp";

export class CrudBaseService {
  constructor(baseURL, basePath, token = "") {
    this.baseHttp = new BaseHttp(baseURL);
    this.basePath = basePath;
    this.token = token;
  }


  getAll(params = {}) {
    return this.baseHttp.request(this.basePath, params, {}, "get", this.token);
  }
  getById(token, id, subResource) {
    let url = `${this.basePath}${id ? `/${id}` : ''}`;
    if (subResource) {
      url += `/${subResource}`;
    }
    return this.baseHttp.request(
      url,
      {},
      '',
      'get',
      token
    );
  }
  getSearch(token, { id, params = {} } = {}) {
    let url = this.basePath;
    if (id) {
      url += `/${id}`;
    }
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    return this.baseHttp.request(url, {}, '', 'get', token);
  }


  getOne(id) {
    return this.baseHttp.request(`${this.basePath}${id ? `/${id}` : ''}`, {}, {}, "get", this.token);
  }

  post(data) {
    return this.baseHttp.request(this.basePath, {}, data, "post", this.token);
  }

  put(id, data) {
    return this.baseHttp.request(`${this.basePath}/${id}`, {}, data, "put", this.token);
  }

  patch(id, data) {
    return this.baseHttp.request(`${this.basePath}/${id}`, {}, data, "patch", this.token);
  }

  delete(id) {
    return this.baseHttp.request(`${this.basePath}/${id}`, {}, {}, "delete", this.token);
  }
}
