import Vue from 'vue';

export const ImageViewComponent = Vue.component('imageView', {
  template:
`<div class="image-view"><button v-on:click="blankAll()">blank all</button></div>`,
  methods: {
    blankAll() {
      this.$store.commit('fieldSetAll', '<BLANK>');
    }
  }
});