
class _FocusService {
  constructor() {
  }

  init(store) {
    this.store = store;
  }

  nextField() {
    if (this.store.state.focus.currentField < (this.store.getters.currentRecord.fields.length-1)) {
      this.store.commit('fieldForward');
    }
  }

  previousField() {
    if (this.store.state.focus.currentField > 0) {
      this.store.commit('fieldBack');
    }
  }

}

export const FocusService = new _FocusService();