import http from "../http-common";

class GameScreenshotDataService {
  getRandom() {
    return http.get("game-screenshots/random");
  }
}
export default new GameScreenshotDataService();
