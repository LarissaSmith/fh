import { FocusService } from './focus.service';
import * as keyOn from '../utils/key-on';

class _KeyService {
  constructor() {
    this.keyDown = this.keyDown.bind(this);
  }
  /**
   * Set Store
   * pass in the required instantiated store and start watching keystrokes
   * @param store
   */
  setStore(store) {
    this.store = store;
    this.start();
  }

  /**
   * Start
   * watch key strokes
   */
  start() {
    document.documentElement.addEventListener('keydown', this.keyDown);
  }

  /**
   * Stop
   * don't watch key strokes
   */
  stop() {
    document.documentElement.removeEventListener('keydown', this.keyDown);
  }

  /**
   * Key Down
   * handle global key strokes
   * @private
   * @param e
   */
  keyDown(e) {
    // prevent italics
    if (keyOn.command_i(e)) {
      e.preventDefault();
    }

    // go to previous field
    if (keyOn.shift_tab(e)) {
      e.preventDefault();
      FocusService.previousField();
    }

    // go to next field
    if (keyOn.tab(e)) {
      e.preventDefault();
      FocusService.nextField();
    }

    if (keyOn.command_arrowUp(e)) {
      e.preventDefault();
      FocusService.previousField();
    }

    if (keyOn.command_arrowDown(e)) {
      e.preventDefault();
      FocusService.nextField();
    }

    if (keyOn.shift_b(e)) {
      e.preventDefault();
      this.store.commit('setAllFieldProperty', {property: 'blank', value: true});
    }

    if (keyOn.shift_u(e)) {
      e.preventDefault();
      this.store.commit('setAllFieldProperty', {property: 'unreadable', value: true});
    }

    if (keyOn.arrowDown(e) || keyOn.arrowUp(e)) {
      e.preventDefault();
    }

    if (keyOn.command_arrowRight(e)) {
      e.preventDefault();
      let recordLength = this.store.getters.currentImage.records.length;
      if (this.store.getters.currentRecordIndex < recordLength-1) {
        this.store.dispatch('goToRecordSameField', this.store.getters.currentRecordIndex+1);
      }
    }

    if (keyOn.command_arrowLeft(e)) {
      e.preventDefault();
      if (this.store.getters.currentRecordIndex > 0) {
        this.store.dispatch('goToRecordSameField', this.store.getters.currentRecordIndex-1);
      }
    }

    if (keyOn.command_shift_arrowRight(e)) {
      e.preventDefault();
      if (this.store.getters.currentImageIndex < this.store.state.batch  .images.length-1) {
        this.store.dispatch('goToImage', this.store.getters.currentImageIndex+1);
      }
    }

    if (keyOn.command_shift_arrowLeft(e)) {
      e.preventDefault();
      if (this.store.getters.currentImageIndex > 0) {
        this.store.dispatch('goToImage', this.store.getters.currentImageIndex-1);
      }
    }
  }
}

export const KeyService = new _KeyService();