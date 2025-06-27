import axios from "axios";

export class BaseHttp {
  constructor(baseURL) {
   
    this.apiClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async request(path, params = {}, payload = {}, method = "get", token = "") {
   
    
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };
    try {
      const response = await this.apiClient.request({
        url: path,
        method,
        params,
        data: payload,
        headers,
      });
      return response.data;
    } catch (error) {
      // Handle errors here or rethrow
      throw error;
    }
  }
}
