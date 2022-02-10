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
  getArticle: async (articleId) => {
    const { data } = await httpService.get(articlesEndPoint + articleId);
    return data;
  },
  updateArticle: async (articleId, payload) => {
    const { data } = await httpService.put(articlesEndPoint + articleId, payload);
    return data
  },
  deleteArticle: async (articleId) => {
    const { data } = await httpService.delete(articlesEndPoint + articleId);
    return data;
  }
}

export default articlesService;