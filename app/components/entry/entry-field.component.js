import Vue from 'vue';
import { EntryFieldTemplate } from './entry-field.template';
import { TemplateService } from '../../services/template.service';

export const EntryFieldComponent = Vue.component('entryField', {
  props: ['fieldobj', 'properties', 'fieldIndex'],
  template: EntryFieldTemplate,

  mounted() {
    this.updateInput = this.updateInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.$refs.input.addEventListener('input', this.updateInput);
    this.$refs.input.addEventListener('focus', this.onFocus);
    this.$refs.input.addEventListener('blur', this.onBlur);
    this.$refs.input.addEventListener('keydown', this.onKeyPress);
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
      inputHasFocus: false,
      displayName: TemplateService.getFieldName(this.fieldIndex),
      dropdown: {
        active: false,
        list: [
          {label: 'item 1', type: 'history'},
          {label: 'item 2', type: 'history'},
          {label: 'item 3', type: 'history'},
          {label: 'item 4', type: 'history'},

        ]
      }
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus();
      this.onFocus();
    },
    onFocus() {
      this.selectText();
      this.inputHasFocus = true;
    },
    blur() {
      this.$refs.input.blur();
      this.onBlur();
    },
    onBlur() {
      this.inputHasFocus = false;
      this.closeDropdown();
    },
    onKeyPress() {
      console.log('here')
    },
    blank() {
      this.fieldobj.content = '<BLANK>';
    },
    selectText() {
      if (this.$refs.input.textContent.length && !this.inputHasFocus) {
        let range = document.createRange();
        range.selectNodeContents(this.$refs.input);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    },
    updateInput(e) {
      this.openDropdown();
      this.fieldobj.content = this.$refs.input.textContent;
    },
    toggleDropdown() {
      if (this.dropdown.active) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    },
    openDropdown() {
      this.dropdown.active = true;
    },
    closeDropdown() {
      this.dropdown.active = false;
    },
    selectDropdownItem() {

    },
    addDropdownItem() {

    }
  }
});