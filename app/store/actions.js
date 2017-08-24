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
    commit('setCurrentImage', {
      imageIndex
    });
  },

  goToRecord({commit, getters}, recordIndex) {
    commit('setCurrentRecord', {
      recordIndex,
      imageIndex: getters.currentImageIndex
    });
  },

  goToField({commit, getters}, fieldIndex) {
    console.log({
      fieldIndex,
      currentRecordIndex: getters.currentRecordIndex,
      currentImageIndex: getters.currentImageIndex
    })
    commit('setCurrentField', {
      fieldIndex,
      currentRecordIndex: getters.currentRecordIndex,
      currentImageIndex: getters.currentImageIndex
    })
  }

};