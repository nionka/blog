import httpService from './http.service';

const tagsEndPoint = 'tags/';

const tagsService = {
  getAll: async () => {
    const { data } = await httpService.get(tagsEndPoint);
    return data;
  },
};

export default tagsService;
