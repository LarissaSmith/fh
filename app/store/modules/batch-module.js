import { mockBatchData } from '../../mock-batch-data';

// $store.state.batch
export const batchModule = {
  state: mockBatchData,
  mutations: {
    blankAll(state) {
      state.images.forEach(image => {
        if (image.indexable) {
          image.records.forEach(record => {
            record.fields.forEach(field => {
              field.content = '<BLANK>';
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