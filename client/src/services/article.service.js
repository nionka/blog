import httpService from "./http.service";

const articlesEndPoint = 'articles/';

const articlesService = {
  getAll: async () => {
    const { data } = await httpService.get(articlesEndPoint);
    return data;
  },
  createArticle: async (payload) => {
    const { data } = await httpService.post(articlesEndPoint, payload);
    return data;
  },
  deleteArticle: async (articleId) => {
    const { data } = await httpService.delete(articlesEndPoint + articleId);
    return data;
  }
}

export default articlesService;