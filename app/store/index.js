import { mockBatchData } from '../mock-batch-data';
import _findIndex from 'lodash/findIndex';
import { constructEmptyRecord } from '../core/utils/record';

export const store = {
  strict: true,
  state: {
    batch: mockBatchData,
    errorList: [],
    focus: {
      currentImage: 0,
      currentRecord: 0,
      currentField: 0
    }
  },
  mutations: {
    fieldSetAll(state, term) {
      state.batch.images.forEach(image => {
        if (image.indexable) {
          image.records.forEach(record => {
            record.fields.forEach(field => {
              field.content = term;
            });
          });
        }
      });
    },
    fieldSetFocus(state, index) {
      state.focus.currentField = index;
    },
    fieldSetPropertyComputed(state, {image, record, field, property, value}) {
      state.batch.images[image].records[record].fields[field][property] = value;
    },
    recordSet(state, index) {
      state.focus.currentRecord = index;
    },
    recordAddComputed(state, image) {
      state.batch.images[image].records.push(constructEmptyRecord('Death'))
    },
    imageSet(state, index) {
      state.focus.currentImage = index;
    }
  },
  actions: {
    fieldSetProperty({commit, state, getters}, {image, record, field, property, value}) {
      let computedImage = _findIndex(state.batch.images, {id: getters.images[image].id});
      commit('fieldSetPropertyComputed', {
        image: computedImage,
        record,
        field,
        property,
        value
      });
    },
    recordAdd({commit, state, getters}) {
      let computedImage = _findIndex(state.batch.images, {id: getters.images[state.focus.currentImage].id});
      commit('recordAddComputed', computedImage)
    }
  },
  getters: {
    images(state) {
      return state.batch.images.filter(image => image.indexable);
    },
    currentRecord(state, getters) {
      return getters.images[state.focus.currentImage].records[state.focus.currentRecord];
    }

  // modules: {
  //   batch: batchModule,
  //   focus: focusModule
  }
};