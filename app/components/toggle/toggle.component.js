import Vue from 'vue';

export const ToggleComponent = Vue.component('toggle', {
  template: `<label class="toggle" :class="toggleClass()"><input type="checkbox" :disabled="this.disabled" :checked="this.checked" @change="setToggled"></label>`,
  props: {
    disabled: Boolean,
    checked: Boolean,
    value: String
  },
  model: {
    prop: "checked",
    event: "change"
  },
  methods: {
    toggleClass() {
      let string = "";
      string = this.checked ? "toggle-on" : "toggle-off";
      if (this.disabled) {
        string += " disabled";
      }
      return string;
    },
    setToggled() {
      this.$emit("change", !this.checked);
    }
  }
});