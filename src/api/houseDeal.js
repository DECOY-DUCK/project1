export default class HouseDealAPI {
  constructor(http) {
    this.http = http;
  }

  async sidoList() {
    return this.http.axios("/housedeal/sido", {
      method: "GET",
    });
  }
}
