import axios from "axios";
import { config } from "@/config";

// houseDeal.js에 설명 적었습니다@@

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async axios(url, options) {
    const { data, method, headers, params } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
      },
      data,
      params,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        const message =
          data && data.message ? data.message : "Something went wrong!";
        throw new Error(message);
      }
      throw new Error("connection error");
    }
  }
}

export const httpClient = new HttpClient(config.api.baseUrl);
export const houseApiClient = new HttpClient(config.api.houseDealUrl);
