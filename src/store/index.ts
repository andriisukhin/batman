import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/services/MovieService';
import { Movie } from '@/services/types';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: 'Perion',
      apiToken: '273b9080',
    },
    movies: {
      data: [] as Movie[],
      requestSucces: true,
      full: false,
      currentPage: 1,
    },
  },
  mutations: {
    setMovies: (state, payload) => {
      if (payload === true) {
        state.movies.full = payload;
      } else {
        state.movies.data = [...state.movies.data, ...payload];
      }
      state.movies.requestSucces = true;
    },
    setMoviesRequestStatus(state) {
      state.movies.requestSucces = false;
    },
    setMoviesCurrentPage(state) {
      state.movies.currentPage += 1;
    },
  },
  getters: {
    userName: (state) => state.user.name,
    moviesRequestSuccess: (state) => state.movies.requestSucces,
    moviesFullList: (state) => state.movies.full,
    moviesCurrentPage: (state) => state.movies.currentPage,
    movies: (state) => state.movies.data,
    moviesTypes: (state) => Array.from(new Set(state.movies.data.map((m) => m.Type))),
    filteredMovies: (state) => (args: string[]) => (
      !args.length ? state.movies.data
        : state.movies.data.filter((m) => args.indexOf(m.Type) > -1)
    ),
  },
  actions: {
    async fetchMovies({ state, commit }, p) {
      commit('setMoviesRequestStatus');
      const data = await service.movieService.getMovieList(state.user.apiToken, p);
      commit('setMovies', data);
    },
    async getMovie({ state }, id) {
      const data = await service.movieService.getSpecificMovie(state.user.apiToken, id);
      return data;
    },
  },
});
