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

  goToRecord({commit, getters}, recordIndex) {
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