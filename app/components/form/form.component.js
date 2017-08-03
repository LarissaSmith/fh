import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TemplateService } from '../../core/services/template.service';

export const EntryComponent = Vue.component('entry', {
  template:
`<div class="entry-form">
    
    <entry-field
        v-for="(fieldobj, index) in images[0].records[0].fields"
        :key="index"
        :fieldobj="fieldobj"
        :properties="template[index]"
        :fieldIndex="index">
    </entry-field>
    
    <div class="entry-question-block">
        <p>See more people to index?</p>
        <button class="btn">Add Entry 2</button>
    </div>
    <div class="entry-question-block">
        <p>Ready to Submit?</p>
        <button class="btn">Submit Batch</button>
    </div>
</div>`,

  computed: {
      ...mapGetters([
          'images'
      ])
  },
  data() {
    return {
      template: TemplateService.template[0].data
    }
  }
});