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
    let focus = this.store.state.focus;
    let currentRecord = this.store.getters.currentRecord;
    let images = this.store.getters.images;

    // go to next entry
    if (focus.currentField < (currentRecord.fields.length-1)) {
      this.store.commit('fieldSetFocus', focus.currentField+1);
    }
    // go to 'add entry'
    else if (focus.currentField === (currentRecord.fields.length-1)) {
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_ADD_RECORD);
    }
    // go to next record
    else if (focus.currentField === constants.FOCUS_ADD_RECORD &&
             focus.currentRecord < images[focus.currentImage].records.length-1) {
      this.store.commit('recordSet', focus.currentRecord+1);
      this.store.commit('fieldSetFocus', 0);
    }
    // go to 'next image'
    else if (focus.currentField === constants.FOCUS_ADD_RECORD &&
             focus.currentRecord === images[focus.currentImage].records.length-1 &&
             focus.currentImage < images.length-1) {
      document.querySelector(`#${constants.FOCUS_NEXT_IMAGE} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_NEXT_IMAGE);
    }
    // go to 'submit batch'
    else if (focus.currentField === constants.FOCUS_ADD_RECORD &&
             focus.currentImage === images.length-1) {
      document.querySelector(`#${constants.FOCUS_SUBMIT_BATCH} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_SUBMIT_BATCH);
    }
  }

  /**
   * Global Previous
   * moves the focus to the previous available thing
   */
  previous() {
    let focus = this.store.state.focus;
    let currentRecord = this.store.getters.currentRecord;
    let images = this.store.getters.images;

    // go to previous field
    if (focus.currentField > 0) {
      this.store.commit('fieldSetFocus', focus.currentField-1);
    }
    // go to last field
    else if (focus.currentField === constants.FOCUS_ADD_RECORD) {
      this.store.commit('fieldSetFocus', currentRecord.fields.length-1);
    }
    // go to 'add record'
    else if (focus.currentField === constants.FOCUS_NEXT_IMAGE ||
             focus.currentField === constants.FOCUS_SUBMIT_BATCH) {
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_ADD_RECORD);
    }
    // go to previous record
    else if (focus.currentField === 0 &&
             focus.currentRecord > 0) {
      this.store.commit('recordSet', focus.currentRecord-1);
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_ADD_RECORD);
      }
  }

  goToImage(imageIndex) {
    this.store.commit('fieldSetFocus', 0);
    this.store.commit('recordSet', 0);
    this.store.commit('imageSet', imageIndex);
  }



}

export const FocusService = new _FocusService();