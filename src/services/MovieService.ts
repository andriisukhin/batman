import axios, { AxiosInstance } from 'axios';

class MovieService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://www.omdbapi.com/',
    });
  }

  public async getMovieList(token: string, page: number) {
    const result = await this.axiosInstance.get('/', {
      params: {
        s: 'Batman',
        apikey: token,
        page,
      },
    });
    return result.data.Search || true;
  }

  public async getSpecificMovie(token: string, id: string) {
    const { data } = await this.axiosInstance.get('/', {
      params: {
        i: id,
        apikey: token,
      },
    });
    return data;
  }
}

const movieService = new MovieService();

export default {
  movieService,
};
