import { mockBatchData } from '../mock-batch-data';

export const store = {
  state: {
    batch: mockBatchData,
    focus: {
      currentImage: 0,
      currentRecord: 0,
      currentField: 0
    }
  },
  mutations: {
    blankAll(state) {
      state.batch.images.forEach(image => {
        if (image.indexable) {
          image.records.forEach(record => {
            record.fields.forEach(field => {
              field.content = '<BLANK>';
            });
          });
        }
      });
    },
    fieldForward(state) {
      state.focus.currentField++;
    },
    fieldBack(state) {
      state.focus.currentField--;
    },
    fieldSet(state, index) {
      state.focus.currentField = index;
    }
  },
  actions: {

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