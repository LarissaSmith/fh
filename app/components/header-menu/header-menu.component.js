import Vue from 'vue';
import { mapGetters } from 'vuex';
import { OverlayService } from 'vue-modal-dialog';
import { QualityCheckComponent } from '../quality-check/quality-check';

export const HeaderMenuComponent = Vue.component('headerMenu', {
  template:
`<div class="menu" style="padding: 14px;">
    <button class="btn" @click="previousImage()"><icon name="chevron-left"></icon></button>
    Image {{currentImageIndex+1}} of {{images.length}}
    <button class="btn" @click="nextImage()"><icon name="chevron-right"></icon></button>
    
    <button class="btn" @click="openQualityCheck()">Quality Check</button>
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
        this.$store.dispatch('goToImage', this.currentImageIndex-1);
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.images.length-1) {
        this.$store.dispatch('goToImage', this.currentImageIndex+1);
      }
    },

    openQualityCheck() {
      OverlayService.open(QualityCheckComponent, 'qualityCheck');
    }
  }
});