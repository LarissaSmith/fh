import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

import { mockBatchData } from '../mock-batch-data';
import * as constants from '../core/constants';

// todo:
// filter images to 'indexable'
// convert current image
let indexable = 0;
mockBatchData.images = mockBatchData.images.filter((image, i) => {
  if (i === mockBatchData.currentImage) {
    mockBatchData.currentImage = indexable;
  }
  if (image.indexable) indexable++;
  return image.indexable;
});

// add blank/unreadable variables into field data
// this should be a schema change so we don't have to manually change this every time we pull/push data
mockBatchData.images.map(image => {
  image.records.forEach(record => {
    record.fields.forEach(field => {
      if (field.content === constants.BLANK) {
        field.blank = true;
        field.content = '';
      } else if (field.content === constants.UNREADABLE) {
        field.unreadable = true;
        field.content = '';
      } else {
        field.blank = false;
        field.unreadable = false;
      }
    });
  });
});

export const store = {
  strict: true,
  state: {
    batch: mockBatchData,
    errorList: []
  },
  mutations,
  actions,
  getters

  // modules: {
  //   batch: batchModule,
  //   focus: focusModule
};