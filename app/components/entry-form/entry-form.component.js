import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TemplateService } from '../../core/services/template.service';
import * as constants from '../../core/constants';

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
        
        <div class="entry-question-block" id="${constants.FOCUS_ADD_RECORD}"
             :class="{'focus': $store.state.focus.currentField=='${constants.FOCUS_ADD_RECORD}'}"
             @mousedown="selectQuestionBlock('${constants.FOCUS_ADD_RECORD}')">
            <div>See more people to index?</div>
            <button class="btn btn--icon-left" ref="${constants.FOCUS_ADD_RECORD}">
                <icon name="plus-box"></icon>
                <span>
                    Add Another Entry
                </span>
            </button>
        </div>
        <div class="entry-question-block" id="${constants.FOCUS_NEXT_IMAGE}"
             :class="{'focus': $store.state.focus.currentField=='${constants.FOCUS_NEXT_IMAGE}'}"
             v-show="images.length-1>$store.state.focus.currentImage"
             @mousedown="selectQuestionBlock('${constants.FOCUS_NEXT_IMAGE}')">
            <div>All done with this image?</div>
            <button class="btn btn--icon-right" ref="${constants.FOCUS_NEXT_IMAGE}">
                <span>Continue to Image 3</span>
                <icon name="arrow-right"></icon>
            </button>
        </div>    
        <div class="entry-question-block" id="${constants.FOCUS_SUBMIT_BATCH}"
             :class="{'focus': $store.state.focus.currentField=='${constants.FOCUS_SUBMIT_BATCH}'}"
             v-show="images.length-1==$store.state.focus.currentImage"
             @mousedown="selectQuestionBlock('${constants.FOCUS_SUBMIT_BATCH}')">
            <div>All done with this batch?</div>
            <button class="btn btn--icon-left" ref="${constants.FOCUS_SUBMIT_BATCH}">
                <icon name="check"></icon>
                <span>Submit Batch</span>
            </button>
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
  },

  methods: {
    selectQuestionBlock(block) {
      setTimeout(() => this.$refs[block].focus(), 0);
      this.$store.commit('fieldSetFocus', constants[block]);
    }
  }
});