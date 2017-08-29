import Vue from 'vue';
import { mapGetters } from 'vuex';
import { EntryFieldTemplate } from './entry-field.template';
import { TemplateService } from '../../core/services/template.service';
import * as keyOn from '../../core/utils/key-on';
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
    'currentFieldIndex': function(newFieldIndex) {
      if (newFieldIndex === this.fieldIndex) {
        this.focus();
      }
    }
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
      lastKey: null,
      previousValue: null,
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
      if (this.currentFieldIndex !== this.fieldIndex) {
        this.$store.dispatch('goToField', this.fieldIndex);
      }
      this.inputHasFocus = true;
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
      this.previousValue = e.target.textContent;

      if (keyOn.enter(e)) {
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

      if (keyOn.escape(e) && this.showDropdown) {
        if (this.dropdown.active) {
          this.closeDropdown();
        }
      }

      if (keyOn.command_b(e)) {
        e.preventDefault();
        this.$store.dispatch('setCurrentFieldProperty', {property: 'blank', value: true});
        FocusService.nextField();
      }

      if (keyOn.command_u(e)) {
        e.preventDefault();
        this.$store.dispatch('setCurrentFieldProperty', {property: 'unreadable', value: true});
        FocusService.nextField();
      }

      if (keyOn.command_shift_backspace(e)) {
        if (this.dropdown.active &&
            this.dropdown.activeIndex > -1 &&
            this.dropdown.list.length &&
            this.dropdown.list[this.dropdown.activeIndex].type === 'history') {
          e.preventDefault();
          this.removeHistory();
        }
      }

      if (keyOn.arrowUp(e) && this.dropdown.active && this.showDropdown) {
        this.setActiveDropdownItem(this.dropdown.activeIndex-1);
      }

      if (keyOn.arrowDown(e) && this.showDropdown) {
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
      this.$store.dispatch('setCurrentFieldProperty', {
        property: 'content',
        value: this.$refs.input.textContent
      });
    },

    validateContent(newContent) {
      let {errorMsg, valid} = ValidationService.validateField(newContent, this.fieldobj, this.properties);
      // this.fieldobj.errorMsg = errorMsg;
      // this.fieldobj.valid = valid;
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
      if (this.dropdown.list.length && this.dropdown.activeIndex > -1) {
        _remove(this.propertyMap[`${SELECTED_LANG}.listValues`], {
          content: this.dropdown.list[this.dropdown.activeIndex].label
        });
        if (this.dropdown.activeIndex === this.dropdown.list.length-1) {
          this.dropdown.activeIndex--;
        }
        this.updateDropdownList();
      }
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
        let test;

        let lastWordIndex = input.lastIndexOf(' ');
        let testAgainst = false;
        if (lastWordIndex > -1) {
          testAgainst = input.substring(lastWordIndex).trim();
        }
        test = new RegExp(`^${normalizeInputData(!_isBoolean(testAgainst) ? testAgainst : input)}`, 'g');


        return !!item.label.match(test);
      });
    },
    selectDropdownItem() {
      let lastSpace = this.fieldobj.content.lastIndexOf(' ');
      this.$store.dispatch('setCurrentFieldProperty', {
        property: 'content',
        value: this.$refs.input.textContent = this.fieldobj.content.slice(0, lastSpace+1) + this.dropdown.list[this.dropdown.activeIndex].label
      });
      // todo: need to figure out a better way to do this
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