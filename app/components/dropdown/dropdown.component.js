import Vue from 'vue';

/**
 * Dropdown
 * @type {Component}
 */
export const DropdownComponent = Vue.component('dropdown', {
  props: [
    'dropdownSize',
    'dropdownStopPropagation',
    'dropdownLean',
    'dropdownCover',
    'dropdownBlock'
  ],
  template: `
<div class="dropdown" :class="{active: isOpen,
    'dropdown--md': !dropdownSize || dropdownSize == 'md',
    'dropdown--lg': dropdownSize == 'lg',
    'dropdown--left': dropdownLean == 'left',
    'dropdown--right': !dropdownLean || dropdownLean == 'right',
    'dropdown--cover': dropdownCover,
    'dropdown--block': dropdownBlock }">
    <slot></slot>
</div>`,

  mounted() {
    this.$el.classList.add(`dropdown--${this.dropdownSize ? this.dropdownSize : 'md'}`);
  },

  beforeDestroy() {
    document.removeEventListener('mousedown', this.clickHandlerRef);
  },

  data() {
    return {
      isOpen: false
    }
  },

  methods: {
    clickHandlerRef(e) {
      if (!isDescendantOfParent(this.$el, e.target)) {
        this.close();
      }
    },
    toggle() {
      if (!this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    },
    open() {
      if (!this.isOpen) {
        this.isOpen = true;
        document.addEventListener('mousedown', this.clickHandlerRef);
      }
    },
    close() {
      if (this.isOpen) {
        this.isOpen = false;
        document.removeEventListener('mousedown', this.clickHandlerRef);
      }
    }
  }
});


/**
 * Dropdown Button
 * @type {Component}
 */
export const DropdownBtnComponent = Vue.component('dropdownBtn', {
  template: `
<button @click="toggle()" :class="{active: $parent.isOpen}">
    <slot></slot>
</button>`,

  methods: {
    toggle() {
      this.$parent.toggle();
    }
  }
});


/**
 * Dropdown Content
 * @type {Component}
 */
export const DropdownContentComponent = Vue.component('dropdownContent', {
  template: `
<div class="dropdown__content" @click="close()">
    <slot></slot>
</div>`,
  methods: {
    close() {
      if (!this.$parent.dropdownStopPropagation) {
        this.$parent.close();
      }
    }
  }
});

/**
 * Is Descendant of Parent
 * checks if the parent el is the parent of the child el
 * @param parent {Element}
 * @param child {Element}
 * @returns {boolean}
 */
function isDescendantOfParent(parent, child) {
  if (parent == child) {
    return true;
  } else {
    let node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}