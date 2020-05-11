<template>
  <div>
    <router-link :to="`movies/${movie.imdbID}`" class="card">
      <div>
        <div class="card__img" :style="{'background-image': `url(${movie.Poster})`}">
        </div>
        <div class="card__title">{{ movie.Title }}</div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Movie } from '@/services/types';

@Component
export default class MovieListItem extends Vue {
  @Prop({ type: Object, required: true }) movie!: Movie;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .card {
    width: 160px;
    padding: 10px;
    text-decoration: none;
    display: block;
    margin: 0 10px;
    &:hover {
      .card__img {
        transform: scale(0.9) skewX(-4deg);
        box-shadow: 4px 4px 5px 0px rgba(#bbe3ff, 0.25)
      }
    }
    &__row {
      display: flex;
      justify-content: space-between;
    }
    &__img {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #bbe3ff;
      width: 160px;
      height: 240px;
      box-shadow: none;
      transition: transform .3s ease, box-shadow .3s ease;
    }
    &__title {
      text-decoration: none;
      color: #bbe3ff;
      max-width: 160px;
      margin-top: 10px;
    }
  }
</style>
