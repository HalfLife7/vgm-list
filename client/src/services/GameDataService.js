import http from "../http-common";

class GameDataService {
  getAll() {
    return http.get("games/all");
  }

  get(id) {
    return http.get(`games/${id}`);
  }
}

export default new GameDataService();