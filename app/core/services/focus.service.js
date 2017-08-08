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
    // go to next entry
    if (this.store.state.focus.currentField < (this.store.getters.currentRecord.fields.length-1)) {
      this.store.commit('fieldSetFocus', this.store.state.focus.currentField+1);
    }
    // go to 'add entry'
    else if (this.store.state.focus.currentField === (this.store.getters.currentRecord.fields.length-1)) {
      document.querySelector(`#${constants.FOCUS_ADD_RECORD} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_ADD_RECORD);
    }
    // go to 'next image'
    else if (this.store.state.focus.currentField === constants.FOCUS_ADD_RECORD &&
             this.store.state.focus.currentImage < this.store.getters.images.length-1) {
      document.querySelector(`#${constants.FOCUS_NEXT_IMAGE} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_NEXT_IMAGE);
    }
    // go to 'submit batch'
    else if (this.store.state.focus.currentField === constants.FOCUS_ADD_RECORD &&
             this.store.state.focus.currentImage === this.store.getters.images.length-1) {
      document.querySelector(`#${constants.FOCUS_SUBMIT_BATCH} > .btn`).focus();
      this.store.commit('fieldSetFocus', constants.FOCUS_SUBMIT_BATCH);
    }
  }

  /**
   * Global Previous
   * moves the focus to the previous available thing
   */
  previous() {
    // go to previous entry
    if (this.store.state.focus.currentField > 0) {
      this.store.commit('fieldSetFocus', this.store.state.focus.currentField-1);
    }
    // go to last entry
    else if (this.store.state.focus.currentField === constants.FOCUS_ADD_RECORD) {
      this.store.commit('fieldSetFocus', this.store.getters.currentRecord.fields.length-1);
    }
    // go to 'add entry'
    else if (this.store.state.focus.currentField === constants.FOCUS_NEXT_IMAGE ||
             this.store.state.focus.currentField === constants.FOCUS_SUBMIT_BATCH) {
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