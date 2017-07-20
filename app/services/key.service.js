const TAB = 9;

class _KeyService {
  constructor() {
    this.keyDown = this.keyDown.bind(this);
    document.documentElement.addEventListener('keydown', this.keyDown);
  }

  init(store) {
    this.store = store;
  }

  keyDown(e) {
    if (e.keyCode === TAB && e.shiftKey) {
      e.preventDefault();
      this.store.commit('fieldBack');
    } else if (e.keyCode === TAB) {
      e.preventDefault();
      this.store.commit('fieldForward');
    }
  }

  destroyAllEvents() {
    document.documentElement.removeEventListener('keydown', this.keyDown);
  }
}

export const KeyService = new _KeyService();