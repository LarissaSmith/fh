import { FocusService } from 'services/focus.service';
import { BLANK, UNREADABLE } from 'utils/constants';

const TAB = 9,
    ENTER = 13;

class _KeyService {
  constructor() {
    this.keyDown = this.keyDown.bind(this);
    document.documentElement.addEventListener('keydown', this.keyDown);
  }

  init(store) {
    this.store = store;
  }

  keyDown(e) {

    if (this.isTabShift(e)) {
      e.preventDefault();
      FocusService.previousField();
    }

    if (this.isTab(e)) {
      e.preventDefault();
      FocusService.nextField();
    }

    if (this.isEnter(e)) {
      e.preventDefault();
      FocusService.nextField();
    }

    if (this.isCommandUp(e)) {
      e.preventDefault();
      FocusService.previousField();
    }

    if (this.isCommandDown(e)) {
      e.preventDefault();
      FocusService.nextField();
    }

    if (this.isBShift(e)) {
      e.preventDefault();
      this.store.commit('fieldSetAll', BLANK);
    }

    if (this.isUShift(e)) {
      e.preventDefault();
      this.store.commit('fieldSetAll', UNREADABLE);
    }
  }

  isTab(e) {
    return e.key === 'Tab' && !e.shiftKey;
  }

  isTabShift(e) {
    return e.key === 'Tab' && e.shiftKey;
  }

  isEnter(e) {
    return e.key === 'Enter';
  }

  isB(e) {
    return e.key === 'b' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isBShift(e) {
    return e.key === 'B' && e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isU(e) {
    return e.key === 'u' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isUShift(e) {
    return e.key === 'U' && e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isBackspace(e) {
    return e.key === 'Backspace';
  }

  isCommandUp(e) {
    return e.key === 'ArrowUp' && (e.ctrlKey || e.metaKey)
  }

  isCommandDown(e) {
    return e.key === 'ArrowDown' && (e.ctrlKey || e.metaKey)
  }





  destroyAllEvents() {
    document.documentElement.removeEventListener('keydown', this.keyDown);
  }
}

export const KeyService = new _KeyService();