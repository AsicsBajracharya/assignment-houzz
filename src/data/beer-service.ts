import.meta.env.BASE_URL;
import { apiUrls } from "../constants/urls";
import api from "../helpers/axios";
export default {
  // takes optional url parameter
  // if not provided uses the default url

  async getBeers(params?: string) {
    const response = await api.get(`${apiUrls.GET_BEERS}?${params}`);
    return response;
  },
};
