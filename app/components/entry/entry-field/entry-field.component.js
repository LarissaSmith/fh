import Vue from 'vue';
import { EntryFieldTemplate } from './entry-field.template';
import { TemplateService } from '../../../core/services/template.service';
import { KeyService } from '../../../core/services/key.service';
import { FocusService } from '../../../core/services/focus.service';
import { ValidationService } from '../../../core/services/validation.service';
import { blankUnreadableMixin } from '../../../core/utils/blank-unreadable';
import { BLANK, UNREADABLE } from '../../../core/utils/constants';

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
      this.validateContent(newContent);
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
        ],
        typeahead: ['','']
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
      if (this.$store.state.focus.currentField !== this.fieldIndex) {
        this.$store.commit('fieldSet', this.fieldIndex);
      }
      this.inputHasFocus = true;
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
     * handle custom actions beyond KeyService stuff
     * @param e
     */
    onKeyPress(e) {
      // set previous field content
      this.fieldobj.previousContent = e.target.textContent;

      if (KeyService.isEnter(e) && this.dropdown.active) {
        e.preventDefault();
        this.closeDropdown();
      }

      if (KeyService.isEscape(e) && this.dropdown.active) {
        this.closeDropdown();
      }

      if (KeyService.isCommandB(e)) {
        e.preventDefault();
        this.fieldobj.content = BLANK;
        this.validateContent(this.fieldobj.content);
        this.storeBlankUnreadable = null;
        FocusService.nextField();
      }

      if (KeyService.isCommandU(e)) {
        e.preventDefault();
        this.fieldobj.content = UNREADABLE;
        this.validateContent(this.fieldobj.content);
        this.storeBlankUnreadable = null;
        FocusService.nextField();
      }

      if (KeyService.isBackspace(e) && !this.fieldobj.content && !this.fieldobj.previousContent) {
        this.validateContent(this.fieldobj.content);
        this.storeBlankUnreadable = '';
      }

      if (KeyService.isArrowUp(e) && this.dropdown.active) {
        this.setActiveDropdownItem(this.dropdown.activeIndex-1);
      }

      if (KeyService.isArrowDown(e)) {
        if (this.dropdown.active) {
          this.setActiveDropdownItem(this.dropdown.activeIndex+1);
        } else {
          this.dropdown.active = true;
        }
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
    },

    validateContent(newContent) {
      let {errorMsg, valid} = ValidationService.validateField(newContent || this.storeBlankUnreadable, this.fieldobj, this.properties);
      this.fieldobj.errorMsg = errorMsg;
      this.fieldobj.valid = valid;
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



