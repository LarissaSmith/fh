import Vue from 'vue';

export const HomeComponent = Vue.component('homeComponent', {
  template: `<div>home page</div>`,
  mounted() {
    console.log('here')
  },
  data() {
    return {

    }
  },
  methods: {
  }
});