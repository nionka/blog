import httpService from "./http.service";

const articlesEndPoint = 'articles/';

const articlesService = {
  getAll: async () => {
    const { data } = await httpService.get(articlesEndPoint);
    return data;
  }
}

export default articlesService;