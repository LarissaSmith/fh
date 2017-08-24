export const getters = {
  currentField(state, getters) {
    return getters.currentImage.records[getters.currentImage.currentRecord].fields[getters.currentRecord.currentField];
  },

  currentRecord(state, getters) {
    return getters.currentImage.records[getters.currentImage.currentRecord];
  },

  currentImage(state) {
    return state.batch.images[state.batch.currentImage];
  },

  currentFieldIndex(state, getters) {
    return getters.currentRecord.currentField;
  },

  currentRecordIndex(state, getters) {
    return getters.currentImage.currentRecord;
  },

  currentImageIndex(state) {
    return state.batch.currentImage;
  }
};