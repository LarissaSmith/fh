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
    let currentRecord = this.store.getters.currentRecord;
    let currentField = this.store.state.focus.currentField;

    if (e.keyCode === TAB && e.shiftKey) {
      e.preventDefault();
      if (currentField > 0) {
        this.store.commit('fieldBack');
      }
    } else if (e.keyCode === TAB) {
      e.preventDefault();
      if (currentField < (currentRecord.fields.length-1)) {
        this.store.commit('fieldForward');
      }
    } else if (e.keyCode === ENTER) {
      e.preventDefault();
      this.store.commit('fieldForward');
    }
  }

  destroyAllEvents() {
    document.documentElement.removeEventListener('keydown', this.keyDown);
  }
}

export const KeyService = new _KeyService();