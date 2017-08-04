import { mockBatchData } from '../mock-batch-data';

export const store = {
  // strict: true,
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
    fieldForward(state) {
      state.focus.currentField++;
    },
    fieldBack(state) {
      state.focus.currentField--;
    },
    fieldSetFocusIndex(state, index) {
      state.focus.currentField = index;
    },
    fieldSet() {

    },
    recordSet(state, index) {
      state.focus.currentRecord = index;
    }
  },
  actions: {},
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