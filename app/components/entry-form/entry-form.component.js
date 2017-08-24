import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TemplateService } from '../../core/services/template.service';
import * as constants from '../../core/constants';
import { FocusService } from "services/focus.service";
import { lang } from '../../core/utils/lang';

export const EntryFormComponent = Vue.component('entryForm', {
  template:
`<div class="entry-form">

    <record-navigation></record-navigation>

    <div class="entry-form__wrapper">
        <entry-field
            v-for="(fieldobj, index) in currentRecord.fields"
            :key="index"
            :fieldobj="fieldobj"
            :properties="template[index]"
            :fieldIndex="index">
        </entry-field>
        
        <div class="entry-question-block" id="${constants.FOCUS_ADD_RECORD}"
             :class="{'focus': currentFieldIndex=='${constants.FOCUS_ADD_RECORD}'}"
             @mousedown="selectQuestionBlock('${constants.FOCUS_ADD_RECORD}')">
            <div>See more people to index?</div>
            <button class="btn btn--icon-left"
                    ref="${constants.FOCUS_ADD_RECORD}"
                    @click="addRecord()">
                <icon name="plus-box"></icon>
                <span>
                    Add Another Entry
                </span>
            </button>
        </div>
        <div class="entry-question-block" id="${constants.FOCUS_NEXT_IMAGE}"
             :class="{'focus': currentFieldIndex=='${constants.FOCUS_NEXT_IMAGE}'}"
             v-show="images.length-1 > currentImageIndex &&
                     currentRecordIndex === currentImage.records.length-1"
             @mousedown="selectQuestionBlock('${constants.FOCUS_NEXT_IMAGE}')">
            <div>All done with this image?</div>
            <button class="btn btn--icon-right"
                    ref="${constants.FOCUS_NEXT_IMAGE}"
                    @click="nextImage()">
                <span>Continue to Image {{currentImageIndex+2}}</span>
                <icon name="arrow-right"></icon>
            </button>
        </div>    
        <div class="entry-question-block" id="${constants.FOCUS_SUBMIT_BATCH}"
             :class="{'focus': currentFieldIndex=='${constants.FOCUS_SUBMIT_BATCH}'}"
             v-show="images.length-1==currentImageIndex &&
                     currentRecordIndex === currentImage.records.length-1"
             @mousedown="selectQuestionBlock('${constants.FOCUS_SUBMIT_BATCH}')">
            <div>All done with this batch?</div>
            <button class="btn btn--icon-left" ref="${constants.FOCUS_SUBMIT_BATCH}">
                <icon name="check"></icon>
                <span>${lang.submit_batch}</span>
            </button>
        </div>    
    </div>    
</div>`,

  computed: {
      ...mapGetters([
          'currentImage',
          'currentRecord',
          'currentField',
          'currentImageIndex',
          'currentRecordIndex',
          'currentFieldIndex'
      ]),
    images() {
      return this.$store.state.batch.images;
    }
  },
  data() {
    return {
      template: TemplateService.template[0].data
    }
  },

  methods: {
    selectQuestionBlock(block) {
      setTimeout(() => this.$refs[block].focus(), 0);
      this.$store.commit('setCurrentField', constants[block]);
    },

    nextImage() {
      FocusService.goToImage(this.currentImageIndex+1);
    },

    addRecord() {
      this.$store.dispatch('recordAdd');
      FocusService.next();
    }
  }
});