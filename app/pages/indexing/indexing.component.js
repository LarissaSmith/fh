import Vue from 'vue';

export const IndexingComponent = Vue.component('homeComponent', {
  template:
`<div>
    <window-snap>
        <entry-form slot="entry"></entry-form>
        <image-view slot="image"></image-view>
    </window-snap>
</div>`,
});