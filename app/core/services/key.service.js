import { FocusService } from './focus.service';
import * as constants from '../constants';
import { EventBus } from '../event-bus';

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
    // prevent italics
    if (this.isCommandI(e)) {
      e.preventDefault();
    }

    if (this.isTabShift(e)) {
      e.preventDefault();
      FocusService.previous();
    }

    if (this.isTab(e)) {
      e.preventDefault();
      FocusService.next();
    }

    if (this.isCommandArrowUp(e)) {
      e.preventDefault();
      FocusService.previous();
    }

    if (this.isCommandArrowDown(e)) {
      e.preventDefault();
      FocusService.next();
    }

    if (this.isBShift(e)) {
      e.preventDefault();
      this.store.commit('fieldSetAll', constants.BLANK);
    }

    if (this.isUShift(e)) {
      e.preventDefault();
      this.store.commit('fieldSetAll', constants.UNREADABLE);
    }

    if (this.isArrowDown(e) || this.isArrowUp(e)) {
      e.preventDefault();
    }

    if (this.isCommandArrowRight(e)) {
      e.preventDefault();
      let recordLength = this.store.getters.images[this.store.state.focus.currentImage].records.length;
      if (this.store.state.focus.currentRecord < recordLength-1) {
        EventBus.$emit(constants.$$ENTRY_LEAVE);
        setTimeout(() => this.store.commit('recordSet', this.store.state.focus.currentRecord+1), 0);
        setTimeout(() => EventBus.$emit(constants.$$ENTRY_ENTER), 0);
      }
    }

    if (this.isCommandArrowLeft(e)) {
      e.preventDefault();
      if (this.store.state.focus.currentRecord > 0) {
        EventBus.$emit(constants.$$ENTRY_LEAVE);
        setTimeout(() => this.store.commit('recordSet', this.store.state.focus.currentRecord-1), 0);
        setTimeout(() => EventBus.$emit(constants.$$ENTRY_ENTER), 0);
      }
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

  isEscape(e) {
    return e.key === 'Escape';
  }

  isCommandI(e) {
    return e.key === 'i' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isCommandB(e) {
    return e.key === 'b' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isBShift(e) {
    return e.key === 'B' && e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isCommandU(e) {
    return e.key === 'u' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isUShift(e) {
    return e.key === 'U' && e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isBackspace(e) {
    return e.key === 'Backspace' && !e.shiftKey &&  !(e.ctrlKey || e.metaKey);
  }

  isCommandArrowUp(e) {
    return e.key === 'ArrowUp' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isCommandArrowDown(e) {
    return e.key === 'ArrowDown' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isCommandArrowLeft(e) {
    return e.key === 'ArrowLeft' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isCommandArrowRight(e) {
    return e.key === 'ArrowRight' && !e.shiftKey && (e.ctrlKey || e.metaKey);
  }

  isArrowDown(e) {
    return e.key === 'ArrowDown' && !e.shiftKey && !(e.ctrlKey || e.metaKey);
  }

  isArrowUp(e) {
    return e.key === 'ArrowUp' && !e.shiftKey && !(e.ctrlKey || e.metaKey);
  }

  isCommandShiftBackspace(e) {
    return e.key === 'Backspace' && e.shiftKey &&  (e.ctrlKey || e.metaKey);
  }





  destroyAllEvents() {
    document.documentElement.removeEventListener('keydown', this.keyDown);
  }
}

export const KeyService = new _KeyService();