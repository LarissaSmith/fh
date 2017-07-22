import Vue from 'vue';
import { EntryFieldTemplate } from './entry-field.template';
import { TemplateService } from 'services/template.service';
import { KeyService } from 'services/key.service';
import { FocusService } from 'services/focus.service';
import { ValidationService } from 'services/validation.service';
import { blankUnreadableMixin } from 'utils/blank-unreadable';
import { BLANK, UNREADABLE } from 'utils/constants';

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
    this.$refs.input.removeEventListener('focus', this.onFocus);
    this.$refs.input.removeEventListener('blur', this.onBlur);
    this.$refs.input.removeEventListener('keydown', this.onKeyPress);
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
      lastKey: null,
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

    /**
     * Focus and focus handler
     */
    focus() {
      this.$refs.input.focus();
    },
    onFocus() {
      this.selectText();
      this.inputHasFocus = true;
      if (this.$store.state.focus.currentField !== this.fieldIndex) {
        this.$store.commit('fieldSet', this.fieldIndex);
      }
      if (this.fieldobj.content === BLANK || this.fieldobj.content === UNREADABLE) {
        this.storeBlankUnreadable = this.fieldobj.content;
        this.fieldobj.content = '';
      }
    },

    /**
     * Blur & blur handler
     */
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

    /**
     * OnKeyPress
     * handle custom actions beyond keyboard manager stuff
     * @param e
     */
    onKeyPress(e) {
      // set previous field content
      this.fieldobj.previousContent = e.target.textContent;

      if (e.keyCode === ENTER && this.dropdown.active) {
        e.preventDefault();
        this.closeDropdown();
      } if (e.keyCode === ESCAPE && this.dropdown.active) {
        this.closeDropdown();
      }

      if (KeyService.isB(e)) {
        e.preventDefault();
        this.fieldobj.content = BLANK;
        this.storeBlankUnreadable = null;
        FocusService.nextField();
      }

      if (KeyService.isU(e)) {
        e.preventDefault();
        this.fieldobj.content = UNREADABLE;
        this.storeBlankUnreadable = null;
        FocusService.nextField();
      }

      if (KeyService.isBackspace(e) && !this.fieldobj.content && !this.fieldobj.previousContent) {
        this.storeBlankUnreadable = '';
      }
    },

    /**
     * Select Text
     */
    selectText() {
      if (this.$refs.input.textContent.length && !this.inputHasFocus) {
        let range = document.createRange();
        range.selectNodeContents(this.$refs.input);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    },

    /**
     * Manually update the content (cuz contentEditable)
     * @param e
     */
    updateInput(e) {
      if (!this.dropdown.active) {
        this.openDropdown();
      }
      this.fieldobj.content = this.$refs.input.textContent;
      if (this.fieldobj.content !== '' && this.storeBlankUnreadable) {
        this.storeBlankUnreadable = '';
      }
      // console.log(this.fieldobj, this.properties)
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



