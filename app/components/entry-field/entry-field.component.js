import Vue from 'vue';
import { EntryFieldTemplate } from './entry-field.template';
import { TemplateService } from '../../core/services/template.service';
import { KeyService } from '../../core/services/key.service';
import { FocusService } from '../../core/services/focus.service';
import { ValidationService } from '../../core/services/validation.service';
import * as constants from '../../core/constants';

import {
  blankUnreadableMixin,
  SELECTED_LANG,
  normalizeInputData,
  selectTextContentEditable,
  cursorEndContentEditable
} from '../../core/utils';

import _isBoolean from 'lodash/isBoolean';
import _find from 'lodash/find';
import _remove from 'lodash/remove';

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
      if (this.dropdown.active && this.showDropdown) {
        this.updateDropdownList();
      }
    },
    '$store.state.focus.currentField': function(newFieldIndex) {
      if (newFieldIndex === this.fieldIndex) {
        this.focus();
      }
    }
  },

  computed: {
    propertyMap() {
      let map = {};
      this.properties.properties.property.forEach(item => {
        map[item.type] = item.value;
      });
      return map;
    },
    fieldType() {
      if (this.propertyMap.alphaSet === 'selectionList' &&
          !this.propertyMap.canAddValues) {
        return constants.FIELD_TYPE_SELECT;
      } else if (this.propertyMap.alphaSet === 'selectionList' &&
          this.propertyMap.canAddValues) {
        return constants.FIELD_TYPE_INPUT_SELECT;
      } else {
        return constants.FIELD_TYPE_INPUT;
      }
    },
    showDropdown() {
      return this.propertyMap.maintainHistory || this.fieldType !== constants.FIELD_TYPE_INPUT;
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
        list: [],
        typeahead: ['','']
      },
      BLANK: constants.BLANK,
      UNREADABLE: constants.UNREADABLE
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
      if (this.$refs.input.textContent.length && !this.inputHasFocus) {
        selectTextContentEditable(this.$refs.input);
      }
      if (this.$store.state.focus.currentField !== this.fieldIndex) {
        this.$store.commit('fieldSetFocusIndex', this.fieldIndex);
      }
      this.inputHasFocus = true;
      if (this.fieldobj.content === constants.BLANK || this.fieldobj.content === constants.UNREADABLE) {
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
      if (this.showDropdown) {
        this.closeDropdown();
      }
      if (this.storeBlankUnreadable) {
        this.fieldobj.content = this.storeBlankUnreadable;
      }
      if (this.propertyMap.maintainHistory) {
        this.addHistory();
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

      if (KeyService.isEnter(e)) {
        e.preventDefault();
        if (this.dropdown.active && this.dropdown.list.length) {
          if (this.showDropdown) {
            this.selectDropdownItem();
            this.closeDropdown();
          }
        } else {
          FocusService.nextField();
        }
      }

      if (KeyService.isEscape(e) && this.showDropdown) {
        if (this.dropdown.active) {
          this.closeDropdown();
        }
      }

      if (KeyService.isCommandB(e)) {
        e.preventDefault();
        this.fieldobj.content = constants.BLANK;
        this.validateContent(this.fieldobj.content);
        this.storeBlankUnreadable = null;
        FocusService.nextField();
      }

      if (KeyService.isCommandU(e)) {
        e.preventDefault();
        this.fieldobj.content = constants.UNREADABLE;
        this.validateContent(this.fieldobj.content);
        this.storeBlankUnreadable = null;
        FocusService.nextField();
      }

      if (KeyService.isBackspace(e) && !this.fieldobj.content && !this.fieldobj.previousContent) {
        this.validateContent(this.fieldobj.content);
        this.storeBlankUnreadable = '';
      }

      if (KeyService.isCommandShiftBackspace(e)) {
        if (this.dropdown.active &&
            this.dropdown.activeIndex > -1 &&
            this.dropdown.list.length &&
            this.dropdown.list[this.dropdown.activeIndex].type === 'history') {
          e.preventDefault();
          this.removeHistory();
        }
      }

      if (KeyService.isArrowUp(e) && this.dropdown.active && this.showDropdown) {
        this.setActiveDropdownItem(this.dropdown.activeIndex-1);
      }

      if (KeyService.isArrowDown(e) && this.showDropdown) {
        if (this.dropdown.active) {
          this.setActiveDropdownItem(this.dropdown.activeIndex+1);
        } else {
          this.updateDropdownList();
          this.dropdown.active = true;
        }
      }
    },

    /**
     * Manually update the content (cuz contentEditable)
     * @param e
     */
    updateInput(e) {
      if (!this.dropdown.active && this.showDropdown) {
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

    addHistory() {
      if (this.fieldobj.content &&
          this.fieldobj.content !== constants.BLANK &&
          this.fieldobj.content !== constants.UNREADABLE &&
          this.fieldobj.content.length > 1) {

        let words = this.fieldobj.content.split(' ');
        words.forEach(word => {
          if (word.length > 1) {
            let check = _find(this.propertyMap[`${SELECTED_LANG}.listValues`], {
              content: word
            });

            if (!(check && check.content)) {
              this.propertyMap[`${SELECTED_LANG}.listValues`].push({
                content: word
              });
            }
          }
        });
      }
    },

    removeHistory() {
      _remove(this.propertyMap[`${SELECTED_LANG}.listValues`], {
        content: this.dropdown.list[this.dropdown.activeIndex].label
      });
      this.updateDropdownList();
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
      this.dropdown.activeIndex = 0;
    },
    updateDropdownList() {
      let input = this.fieldobj.content;
      let history = [],
          options = [];
      if (this.propertyMap.maintainHistory) {
        history = this.propertyMap[`${SELECTED_LANG}.listValues`].map(item => item.content);
      }
      if (this.fieldType === constants.FIELD_TYPE_SELECT || this.fieldType === constants.FIELD_TYPE_INPUT_SELECT) {
        options = this.propertyMap[`${SELECTED_LANG}.listValues`].split(',');
      }

      options = options.map(item => {
        return {
          label: item,
          type: 'option'
        }
      });

      this.dropdown.list = history.map(item => {
        return {
          label: item,
          type: 'history'
        }
      }).concat(options).filter(item => {
        let isBlankUnreadable = item.label !== constants.BLANK && item.label !== constants.UNREADABLE;
        let test;

        if (true) {
          let lastWordIndex = input.lastIndexOf(' ');
          let testAgainst = false;
          if (lastWordIndex > -1) {
            testAgainst = input.substring(lastWordIndex).trim();
          }
          test = new RegExp(`^${normalizeInputData(!_isBoolean(testAgainst) ? testAgainst : input)}`, 'g');
        } else {
          test = new RegExp(`^${normalizeInputData(input)}`, 'g');
        }
        return !!item.label.match(test) && isBlankUnreadable;
      });
    },
    selectDropdownItem() {
      let lastSpace = this.fieldobj.content.lastIndexOf(' ');
      console.log(this.fieldobj.content.slice(0, lastSpace+1) + this.dropdown.list[this.dropdown.activeIndex].label);
      this.fieldobj.content = this.$refs.input.textContent = this.fieldobj.content.slice(0, lastSpace+1) + this.dropdown.list[this.dropdown.activeIndex].label;
      this.storeBlankUnreadable = '';
      cursorEndContentEditable(this.$refs.input);
    },
    setActiveDropdownItem(listIndex) {
      if (listIndex === -2) {
        listIndex = this.dropdown.list.length-1;
      } else if (listIndex === this.dropdown.list.length) {
        listIndex = -1;
      }
      this.dropdown.activeIndex = listIndex;
    }
  }
});