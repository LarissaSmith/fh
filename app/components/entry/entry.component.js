import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TemplateService } from 'services/template.service';

export const EntryComponent = Vue.component('entry', {
  template:
`<div class="entry">
    <entry-field
        v-for="(fieldobj, index) in images[0].records[0].fields"
        :key="index"
        :fieldobj="fieldobj"
        :properties="template[index]"
        :fieldIndex="index">
    </entry-field>
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