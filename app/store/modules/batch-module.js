import { mockBatchData } from '../../mock-batch-data';

// $store.state.batch
export const batchModule = {
  state: mockBatchData,
  mutations: {
    blankAll(state) {
      state.images.forEach((image, imageIndex) => {
        if (image.indexable) {
          image.records.forEach((record, recordIndex) => {
            record.fields.forEach((field, fieldIndex) => {
              state.images[imageIndex].records[recordIndex].fields[fieldIndex].content = '<BLANK>';
            });
          });
        }
      });
    }
  },
  actions: {},
  getters: {
    images(state) {
      return state.images.filter(image => image.indexable);
    }
  }
};