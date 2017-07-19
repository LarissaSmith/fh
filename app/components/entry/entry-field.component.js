import Vue from 'vue';
import { EntryFieldTemplate } from './entry-field.template';

export const EntryFieldComponent = Vue.component('entryField', {
  props: ['fieldobj', 'properties'],
  template: EntryFieldTemplate,
  mounted() {
    this.updateInput = this.updateInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.$refs.input.addEventListener('input', this.updateInput);
    this.$refs.input.addEventListener('focus', this.onFocus);
    this.$refs.input.addEventListener('blur', this.onBlur);
    this.$refs.input.textContent = this.fieldobj.content;
  },
  updated() {
    console.log('updated')
    this.$refs.input.textContent = this.fieldobj.content;
  },
  destroyed() {
    this.$refs.input.removeEventListener('input', this.updateInput);
    this.$refs.input.removeEventListener('focus', this.focus);
    this.$refs.input.removeEventListener('blur', this.blur);

  },

  watch: {
    'fieldobj.content': function(newContent) {
      this.$refs.input.textContent = newContent;
    }
  },
  data() {
    return {
      hasFocus: false
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
      this.onFocus();
    },
    onFocus() {
      this.selectText();
      this.hasFocus = true;
    },
    blur() {
      this.$refs.input.blur();
      this.onBlur();
    },
    onBlur() {
      this.hasFocus = false;
    },
    blank() {
      this.fieldobj.content = '<BLANK>';
    },
    selectText() {
      if (this.$refs.input.textContent.length && !this.hasFocus) {
        let range = document.createRange();
        range.selectNodeContents(this.$refs.input);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    },
    updateInput() {

      this.fieldobj.content = this.$refs.input.textContent;
    }
  }
});