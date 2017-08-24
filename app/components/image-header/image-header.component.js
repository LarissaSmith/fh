import Vue from 'vue';
import { mapGetters } from 'vuex';
import { FocusService } from '../../core/services/focus.service';

export const ImageHeaderComponent = Vue.component('imageHeader', {
  template:
`<div class="image-header">
    <button class="btn" @click="previousImage()"><icon name="chevron-left"></icon></button>
    Image {{currentImageIndex+1}}
    <button class="btn" @click="nextImage()"><icon name="chevron-right"></icon></button>
</div>`,

  computed: {
    ...mapGetters([
      'currentImage',
      'currentRecord',
      'currentField',
      'currentImageIndex',
      'currentRecordIndex',
      'currentFieldIndex'
    ]),
    images() {
      return this.$store.state.batch.images;
    }
  },

  methods: {
    previousImage() {
      if (this.currentImageIndex > 0) {
        FocusService.goToImage(this.currentImageIndex-1);
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.images.length-1)
      FocusService.goToImage(this.currentImageIndex+1);
    }
  }
});