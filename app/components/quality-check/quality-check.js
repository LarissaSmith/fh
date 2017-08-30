import Vue from 'vue';
import { OverlayService } from 'vue-modal-dialog';

export const QualityCheckComponent = Vue.component('qualityCheck', {
  template:
`<div>
    <slot name="movable"></slot>
    <div class="overlay__header">Quality Checker</div>
    <div class="overlay__body">These are the things</div>
    <div class="overlay__footer">
        <button class="btn" @click="submit()">Close</button>
        <button class="btn btn--primary">Next</button>
    </div>
</div>`,

  methods: {
    submit() {
      OverlayService.submit('qualityCheck');
    }
  }
});