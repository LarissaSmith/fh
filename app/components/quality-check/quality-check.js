import Vue from 'vue';

export const QualityCheckComponent = Vue.component('qualityCheck', {
  template:
`<div>
    <slot name="movable"></slot>
    <div class="overlay__header">Quality Checker</div>
    <div class="overlay__body">These are the things</div>
    <div class="overlay__footer">
        <button class="btn">Close</button>
        <button class="btn btn--primary">Next</button>
    </div>
</div>`,
});