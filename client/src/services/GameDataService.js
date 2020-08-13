import http from "../http-common";

class GameDataService {
  getAll() {
    return http.get("games/all");
  }

  get(id) {
    return http.get(`games/${id}`);
  }

  search(searchParams) {
    return http.get(`games/search/${searchParams}`);
  }
}

export default new GameDataService();
