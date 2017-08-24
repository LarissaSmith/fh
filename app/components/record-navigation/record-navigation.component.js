import Vue from 'vue';
import { mapGetters } from 'vuex';
import { KeyService } from '../../core/services/key.service';

export const RecordNavigationComponent = Vue.component('recordNavigation', {
  props: ['totalRecords'],
  template:
`<div class="record-navigation">
    <button class="btn" @click="previousRecord()">
        <icon name="chevron-left"></icon>
    </button
    ><input type="text" v-model="inputFocus ? displayRecordIndex : recordStatement" ref="input"
    ><button class="btn btn--disabled" @click="nextRecord()">
        <icon name="chevron-right"></icon>
    </button>
</div>`,

  mounted() {
    this.$refs.input.addEventListener('focus', this.onFocus);
    this.$refs.input.addEventListener('blur', this.onBlur);
    this.$refs.input.addEventListener('keydown', this.onKeyDown);
  },

  beforeDestroy() {
    this.$refs.input.removeEventListener('focus', this.onFocus);
    this.$refs.input.removeEventListener('blur', this.onBlur);
    this.$refs.input.removeEventListener('keydown', this.onKeyDown);
  },

  computed: {
    ...mapGetters([
      'currentImage',
      'currentRecord',
      'currentField',
      'currentImageIndex',
      'currentRecordIndex',
      'currentFieldIndex'
    ]),
    recordStatement() {
      return `Entry ${this.displayRecordIndex} of ${this.currentImage.records.length}`;
    },
    displayRecordIndex() {
      return this.currentRecordIndex+1
    }
  },

  data() {
    return {
      inputFocus: false
    }
  },

  methods: {
    setRecord(index) {
      this.$store.dispatch('goToRecord', index);
    },
    nextRecord() {
      if (this.currentRecordIndex < this.currentImage.records.length-1) {
        this.$store.dispatch('goToRecord', this.currentRecordIndex+1);
      }
    },
    previousRecord() {
      if (this.currentRecordIndex > 0) {
        this.$store.dispatch('goToRecord', this.currentRecordIndex-1);
      }
    },
    onKeyDown(e) {
      if (KeyService.isEnter(e)) {
        this.$refs.input.blur();
      }
    },
    onFocus() {
      this.inputFocus = true;
      setTimeout(() => {
        this.$refs.input.select();
      }, 0);
    },
    onBlur() {
      let val = parseInt(this.$refs.input.value);
      if (!isNaN(val) &&
          val > 0 &&
          val < this.currentImage.records.length+1) {
        this.setRecord(val-1);
      }
      this.inputFocus = false;
    }
  }
});