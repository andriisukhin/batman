<template>
  <div class="home">
    <img alt="Batman logo" src="../assets/logo.png" />
    <HelloWorld :msg="message"/>
    <div class="tags">
      <div>Filters</div>
      <button
        v-for="tag in moviesTypes"
        :key="tag"
        type="button"
        class="tag"
        :class="{tag_active: filters.indexOf(tag) > -1}"
        @click="addToFilters(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <MovieList :list="filteredMovies(filters)" />
    <transition name="fade">
      <button
        v-if="!moviesFullList"
        type="button"
        class="btn"
        :disabled="!moviesRequestSuccess"
        :class="{disabled: !moviesRequestSuccess}"
        @click="loadMore()"
      >
        {{ moviesRequestSuccess ? 'Load more' : 'Loading...' }}
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';
import { Movie } from '../services/types';

@Component({ components: { HelloWorld, MovieList } })
export default class Home extends Vue {
  @Getter userName!: string;

  @Getter moviesRequestSuccess!: boolean;

  @Getter moviesFullList!: boolean;

  @Getter movies!: Movie[];

  @Getter filteredMovies!: Movie[];

  @Getter moviesCurrentPage!: number;

  @Getter moviesTypes!: string[];

  @Action fetchMovies!: Function;

  @Mutation setMoviesCurrentPage!: Function;

  get message(): string {
    return `Hello ${this.userName}, which batman movie do you want to see?`;
  }

  filters: string[] = [];

  test = 0;

  loadMore() {
    this.test = 10;
    this.setMoviesCurrentPage();
    this.fetchMovies(this.moviesCurrentPage);
  }

  private addToFilters(f: string) {
    const index = this.filters.indexOf(f);
    if (index > -1) {
      this.filters.splice(index, 1);
    } else {
      this.filters.push(f);
    }
  }

  created() {
    if (!this.movies.length) this.fetchMovies(this.moviesCurrentPage);
  }
}
</script>

<style scoped lang="scss">
  .home {
    padding-bottom: 50px;
    img {
      max-width: 400px;
    }
  }
  .btn {
    background-color: #bbe3ff;
    padding: 10px 40px;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
    color: #202c32;
    border: 2px solid #bbe3ff;
    transition: background-color .3s ease, color .3s ease;
    margin-top: 50px;
    &:hover {
      background-color: #202c32;
      color: #bbe3ff;
    }
  }
  .disabled {
    pointer-events: none;
    opacity: .5;
  }
  .tags {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
  .tag {
    border: none;
    padding: 2px 0;
    width: 100px;
    background-color: #bfbdbd;
    margin: 10px 0;
    border-radius: 10px;
    display: block;
    cursor: pointer;
    transition: background-color .3s ease;
    outline: none;
    font-weight: bold;
    &_active {
      background-color: #bbe3ff;
    }
  }
</style>
