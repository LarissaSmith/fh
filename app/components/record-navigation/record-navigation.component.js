import Vue from 'vue';
import { KeyService } from '../../core/services/key.service';

export const RecordNavigationComponent = Vue.component('recordNavigation', {
  props: ['totalRecords'],
  template:
`<div class="record-navigation">
    <button class="btn" @click="previousRecord()">
        <icon name="chevron-left"></icon>
    </button
    ><input type="text" v-model="inputFocus ? currentRecord : recordStatement" ref="input"
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
    recordStatement() {
      return `Entry ${this.currentRecord} of ${this.totalRecords}`;
    },
    currentRecord() {
      return this.$store.state.focus.currentRecord+1
    }
  },

  data() {
    return {
      inputFocus: false
    }
  },

  methods: {
    setRecord(index) {
      this.$store.commit('recordSet', index-1);
    },
    nextRecord() {
      if (this.currentRecord < this.totalRecords) {
        this.$store.commit('recordSet', this.currentRecord);
      }
    },
    previousRecord() {
      if (this.currentRecord > 1) {
        this.$store.commit('recordSet', this.currentRecord-2);
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
      if (!isNaN(this.$refs.input.value) &&
          parseInt(this.$refs.input.value) > 0 &&
          parseInt(this.$refs.input.value) < this.totalRecords+1) {
        this.setRecord(this.$refs.input.value);
      }
      this.inputFocus = false;
    }
  }
});