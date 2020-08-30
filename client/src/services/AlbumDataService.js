import http from "../http-common";

class AlbumDataService {
    get(id) {
        return http.get(`albums/${id}`);
    };
}

export default new AlbumDataService;