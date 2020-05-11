<template>
  <div class="block" v-if="movie">
    <router-link to="/" class="back-link">Back to main</router-link>
    <h1 class="block__title">{{ movie.Title }}</h1>
    <div class="block__row">
      <div class="block__col_3">
        <div class="block__img" :style="{'background-image': `url(${movie.Poster})`}"></div>
      </div>
      <div class="block__col_9">
        <div
          v-for="(key, k) in Object.keys(movie)"
          :key="`${k}cm`"
          class="block__info"
        >
          <div
            v-if="key !== 'Title' && key !== 'Poster' && key !== 'imdbID'
            && key !== 'Website' && key !== 'Response'"
          >
            <strong v-if="movie[key] && movie[key] !== 'N/A'">{{ key }}: </strong>
            <span v-if="movie[key] && movie[key] !== 'N/A' && key !== 'Ratings'">
              {{ movie[key] }}
            </span>
            <ul v-if="key == 'Ratings'">
              <li v-for="(source, s) in movie[key]" :key="`${s}r`">
                <strong>{{ source.Source }}: </strong>
                <span>{{ source.Value }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { MovieDetail } from '@/services/types';

@Component
export default class MovieView extends Vue {
  @Action getMovie!: Function;

  movie: MovieDetail | null = null;

  created() {
    this.getMovie(this.$route.params.movieId)
      .then((res: MovieDetail) => { this.movie = res; });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .block {
    padding-bottom: 50px;
    position: relative;
    &__row {
      display: flex;
      justify-content: space-between;
    }
    &__col_3 {
      width: 300px;
    }
    &__col_9 {
      width: calc(100% - 350px);
    }
    &__img {
      width: 300px;
      height: 450px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #bbe3ff;
    }

    &__info {
      text-align: left;
      margin-top: 5px;
      strong {
        display: inline-block;
        width: 20%;
      }
      span {
        display: inline-block;
        width: 80%;
      }
      ul {
        strong {
          width: 50%;
        }
        span {
          width: 50%;
          text-align: right;
        }
      }
    }
  }
  .back-link {
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    color: #fff;
    position: absolute;
    top: -30px;
    left: 0;
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 100%;
      left: 0;
      height: 2px;
      background: #fff;
      transform: scaleX(0);
      transition: transform .3s ease;
    }
    &:after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 10px 5px 0;
      border-color: transparent #ffffff transparent transparent;
      position: absolute;
      top: 4px;
      left: -20px;
    }
    &:hover {
      &:before {
        transform: scaleX(1);
      }
    }
  }
</style>
