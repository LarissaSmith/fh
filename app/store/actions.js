import _findIndex from 'lodash/findIndex';



export const actions = {

  setCurrentFieldProperty({commit, getters}, {property, value}) {
    commit('setCurrentFieldProperty', {
      property,
      value,
      currentImageIndex: getters.currentImageIndex,
      currentRecordIndex: getters.currentRecordIndex,
      currentFieldIndex: getters.currentFieldIndex
    })
  },

  recordAdd({commit, state}) {
    let computedImage = _findIndex(state.batch.images, {id: state.batch.images[state.focus.currentImage].id});
    commit('recordAddComputed', computedImage)
  },

  goToImage({commit}, imageIndex) {
    commit('setImageIndex', {
      imageIndex
    });
  },

  goToImageFirstRecordField({commit, getters}, imageIndex) {
    commit('setImageIndex', {
      imageIndex
    });
    commit('setRecordIndex', {
      recordIndex: 0,
      imageIndex: getters.currentImageIndex
    });
    commit('setFieldIndex', {
      fieldIndex: 0,
      currentRecordIndex: getters.currentRecordIndex,
      currentImageIndex: getters.currentImageIndex
    });
  },

  goToRecord({commit, getters}, recordIndex) {
    commit('setRecordIndex', {
      recordIndex,
      imageIndex: getters.currentImageIndex
    });
  },

  goToRecordFirstField({commit, getters}, recordIndex) {
    commit('setRecordIndex', {
      recordIndex,
      imageIndex: getters.currentImageIndex
    });
    commit('setFieldIndex', {
      fieldIndex: 0,
      currentRecordIndex: getters.currentRecordIndex,
      currentImageIndex: getters.currentImageIndex
    });
  },

  goToRecordSameField({commit, getters}, recordIndex) {
    let fieldIndex = getters.currentFieldIndex;
    commit('setRecordIndex', {
      recordIndex,
      imageIndex: getters.currentImageIndex
    });
    commit('setFieldIndex', {
      fieldIndex,
      currentRecordIndex: getters.currentRecordIndex,
      currentImageIndex: getters.currentImageIndex
    });
  },

  goToField({commit, getters}, fieldIndex) {
    commit('setFieldIndex', {
      fieldIndex,
      currentRecordIndex: getters.currentRecordIndex,
      currentImageIndex: getters.currentImageIndex
    })
  }

};