import axios from "axios";

export const httpClient = new HttpClient("");
export const houseApiClient = new HttpClient("");

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async axios(url, options) {
    const { data, method, headers } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
      },
      data,
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
