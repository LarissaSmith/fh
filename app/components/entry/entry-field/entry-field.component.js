import Vue from 'vue';
import { EntryFieldTemplate } from './entry-field.template';
import { TemplateService } from 'services/template.service';
import { blankUnreadableMixin } from 'utils/blank-unreadable';

const ESCAPE = 27,
    ENTER = 13;

export const EntryFieldComponent = Vue.component('entryField', {
  props: ['fieldobj', 'properties', 'fieldIndex'],
  mixins: [blankUnreadableMixin],
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
    },
    '$store.state.focus.currentField': function(newFieldIndex) {
      if (newFieldIndex === this.fieldIndex) {
        this.focus();
      }
    }
  },

  data() {
    return {
      inputHasFocus: false,
      displayName: TemplateService.getFieldName(this.fieldIndex),
      storeBlankUnreadable: null,
      dropdown: {
        active: false,
        activeIndex: 0,
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
    },
    onFocus() {
      this.selectText();
      this.inputHasFocus = true;
      this.$store.commit('fieldSet', this.fieldIndex);
      if (this.fieldobj.content == '<BLANK>') {
        this.storeBlankUnreadable = this.fieldobj.content;
        this.fieldobj.content = '';
      }
    },
    blur() {
      this.$refs.input.blur();
    },
    onBlur() {
      this.inputHasFocus = false;
      this.closeDropdown();
      if (this.storeBlankUnreadable) {
        this.fieldobj.content = this.storeBlankUnreadable;
      }
    },
    onKeyPress(e) {
      if (e.keyCode === ENTER && this.dropdown.active) {
        e.preventDefault();
        this.closeDropdown();
      } else if (e.keyCode === ESCAPE && this.dropdown.active) {
        this.closeDropdown();
      }
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
    setActiveDropdownItem(listIndex) {
      this.dropdown.activeIndex = listIndex;
    }
  }
});