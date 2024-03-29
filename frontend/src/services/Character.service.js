import http from "../http-common";

class CharacterDataService {
  getAll() {
    return http.get("/Characters");
  }

  get(id) {
    return http.get(`/Characters/${id}`);
  }

  create(data) {
    return http.post("/Characters", data);
  }

  update(id, data) {
    return http.put(`/Characters/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Characters/${id}`);
  }

  deleteAll() {
    return http.delete(`/Characters`);
  }

  findByName(Name) {
    return http.get(`/Characters?title=${Name}`);
  }
}

export default new CharacterDataService();