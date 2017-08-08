import Vue from 'vue';
import { mapGetters } from 'vuex';
import { FocusService } from '../../core/services/focus.service';

export const ImageHeaderComponent = Vue.component('imageHeader', {
  template:
`<div class="image-header">
    <button class="btn" @click="previousImage()"><icon name="chevron-left"></icon></button>
    Image {{$store.state.focus.currentImage+1}}
    <button class="btn" @click="nextImage()"><icon name="chevron-right"></icon></button>
</div>`,

  computed: {
    ...mapGetters([
      'images'
    ])
  },

  methods: {
    previousImage() {
      if (this.$store.state.focus.currentImage > 0) {
        FocusService.goToImage(this.$store.state.focus.currentImage-1);
      }
    },
    nextImage() {
      if (this.$store.state.focus.currentImage < this.images.length-1)
      FocusService.goToImage(this.$store.state.focus.currentImage+1);
    }
  }
});