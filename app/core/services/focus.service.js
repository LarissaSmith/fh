import * as constants from '../constants';

class _FocusService {
  constructor() {
  }

  init(store) {
    this.store = store;
  }


  /**
   * Global Next
   * moves the focus to the next available thing
   */
  next() {
    let getters = this.store.getters;
    let images = this.store.state.batch.images;

    // go to next entry
    if (getters.currentFieldIndex < (getters.currentRecord.fields.length-1)) {
      this.store.dispatch('goToField', getters.currentFieldIndex+1);
    }
    // go to 'add entry'
    else if (getters.currentFieldIndex === (getters.currentRecord.fields.length-1)) {
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.dispatch('goToField', constants.FOCUS_ADD_RECORD);
    }
    // go to next record
    else if (getters.currentFieldIndex === constants.FOCUS_ADD_RECORD &&
             getters.currentRecordIndex < getters.currentImage.records.length-1) {
      this.store.dispatch('goToRecord', getters.currentRecordIndex+1);
      this.store.dispatch('goToField', getters.currentFieldIndex);
    }
    // go to 'next image'
    else if (getters.currentFieldIndex === constants.FOCUS_ADD_RECORD &&
             getters.currentRecordIndex === getters.currentImage.records.length-1 &&
             getters.currentImageIndex < images.length-1) {
      document.querySelector(`#${constants.FOCUS_NEXT_IMAGE} > .btn`).focus();
      this.store.dispatch('goToField', constants.FOCUS_NEXT_IMAGE);
    }
    // go to 'submit batch'
    else if (getters.currentFieldIndex === constants.FOCUS_ADD_RECORD &&
             getters.currentImageIndex === images.length-1) {
      document.querySelector(`#${constants.FOCUS_SUBMIT_BATCH} > .btn`).focus();
      this.store.dispatch('goToField', constants.FOCUS_SUBMIT_BATCH);
    }
  }

  /**
   * Global Previous
   * moves the focus to the previous available thing
   */
  previous() {
    let getters = this.store.getters;

    // go to previous field
    if (getters.currentFieldIndex > 0) {
      this.store.dispatch('goToField', getters.currentFieldIndex-1);
    }
    // go to last field
    else if (getters.currentFieldIndex === constants.FOCUS_ADD_RECORD) {
      this.store.dispatch('goToField', getters.currentRecord.fields.length-1);
    }
    // go to 'add record'
    else if (getters.currentFieldIndex === constants.FOCUS_NEXT_IMAGE ||
             getters.currentFieldIndex === constants.FOCUS_SUBMIT_BATCH) {
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.dispatch('goToField', constants.FOCUS_ADD_RECORD);
    }
    // go to previous record
    else if (getters.currentFieldIndex === 0 &&
             getters.currentRecordIndex > 0) {
      this.store.dispatch('goToRecord', getters.currentRecordIndex-1);
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.dispatch('goToField', constants.FOCUS_ADD_RECORD);
      }
  }

  goToImage(imageIndex) {
    this.store.dispatch('goToImage', imageIndex);
    this.store.commit('setCurrentField', 0);
    this.store.commit('setCurrentRecord', 0);
    this.store.commit('setCurrentImage', imageIndex);
  }

}

export const FocusService = new _FocusService();