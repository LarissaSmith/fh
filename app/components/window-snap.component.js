import Vue from 'vue';

export const WindowSnapComponent = Vue.component('windowSnap', {
  template:
`<div class="window-snap window-snap--top">
    <div class="window-snap__area window-snap__area--top"></div>
    <div class="window-snap__area window-snap__area--right"></div>
    <div class="window-snap__area window-snap__area--left"></div>
    <div class="window-snap__area window-snap__area--bottom"></div>
    <div class="window-snap__entry">
        <div class="window-snap__move" draggable="true" v-on:dragStart="dragStart">move</div>
        <slot name="entry"></slot>
    </div>
    <div class="window-snap__image">
        <slot name="image"></slot>
    </div>
</div>`,
  methods: {
    dragStart() {
      console.log('do this')
    }
  }
});