import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TemplateService } from '../../core/services/template.service';

export const EntryFormComponent = Vue.component('entryForm', {
  template:
`<div class="entry-form">

    <record-navigation :totalRecords="images[$store.state.focus.currentImage].records.length"></record-navigation>
    
    <div class="entry-form__wrapper">
        <entry-field
            v-for="(fieldobj, index) in images[$store.state.focus.currentImage].records[$store.state.focus.currentRecord].fields"
            :key="index"
            :fieldobj="fieldobj"
            :properties="template[index]"
            :fieldIndex="index">
        </entry-field>
        
        <div class="entry-question-block">
            <div>See more people to index?</div>
            <button class="btn">Add another entry for this image</button>
        </div>
        <div class="entry-question-block">
            <div>All done with this image?</div>
            <button class="btn">Go to the next image</button>
        </div>    
    </div>    
</div>`,

  mounted() {
  },

  computed: {
      ...mapGetters([
          'images'
      ])
  },
  data() {
    return {
      template: TemplateService.template[0].data,
    }
  }
});