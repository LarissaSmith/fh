import Vue from 'vue';

export const IndexingComponent = Vue.component('homeComponent', {
  template:
`<div class="indexing-wrapper">
    <image-header></image-header>
    <div class="record-wrapper">
        <entry-form></entry-form>
        <image-view></image-view>
    </div>
</div>`,
});