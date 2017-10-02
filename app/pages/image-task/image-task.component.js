import Vue from 'vue';
import { mapGetters } from 'vuex';
import template from './image-task.template';

export const ImageTaskComponent = Vue.component('imageTask', {
  template,

  data() {
    return {
      activeTask: 0,
      firstToggleOn: false,
      secondToggleOn: false
    }
  },

  computed: {
    ...mapGetters([
      'currentImage'
    ])
  },

  methods: {
    setActiveTask(which) {
      this.activeTask = which;
    },

    isActive(which) {
      if (this.activeTask === which) {
        return "active";
      }
      return "";
    }
  }
});