<template>
  <div v-if="list.length" class="list">
    <transition-group name="fade">
      <MovieListItem
        v-for="item in listOfUniqueIds"
        :key="item.imdbID"
        :movie="item"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Movie } from '@/services/types';
import MovieListItem from './MovieListItem.vue';


@Component({ components: { MovieListItem } })
export default class MovieList extends Vue {
  @Prop({ required: true }) list!: Movie[];

  get listOfUniqueIds() {
    const ids = Array.from(new Set(this.list.map((item) => item.imdbID)));
    return ids.map((id) => this.list.find((item) => item.imdbID === id));
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list {
    span {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
