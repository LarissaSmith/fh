import * as constants from '../core/constants';
import { constructEmptyRecord } from '../core/utils/record';

export const mutations = {

  /**
   * Set All Field Property
   * @param state
   * @param property
   * @param value
   */
  setAllFieldProperty(state, {property, value}) {
    state.batch.images.forEach(image => {
      if (image.indexable) {
        image.records.forEach(record => {
          record.fields.forEach(field => {
            if (property === 'blank') {
              field.blank = value;
              if (field.blank) {
                field.unreadable = false;
                field.content = '';
              }
            } else if (property === 'unreadable') {
              field.unreadable = value;
              if (field.blank) {
                field.unreadable = false;
                field.content = '';
              }
            } else if (property === 'content') {
              field.content = value;
              field.blank = false;
              field.unreadable = false;
            } else {
              field[property] = value;
            }
          });
        });
      }
    });
  },

  /**
   * Set Current Field Property
   * @param state
   * @param currentImageIndex
   * @param currentRecordIndex
   * @param currentFieldIndex
   * @param property
   * @param value
   */
  setCurrentFieldProperty(state, {currentImageIndex, currentRecordIndex, currentFieldIndex, property, value}) {
    let field = state.batch.images[currentImageIndex].records[currentRecordIndex].fields[currentFieldIndex];
    console.log('field', field);
    if (property === 'blank') {
      field.blank = value;
      if (field.blank) {
        field.unreadable = false;
        field.content = '';
      }
    } else if (property === 'unreadable') {
      field.unreadable = value;
      if (field.blank) {
        field.unreadable = false;
        field.content = '';
      }
    } else if (property === 'content') {
      field.content = value;
      field.blank = false;
      field.unreadable = false;
    } else {
      field[property] = value;
    }
  },

  /**
   * Set Current Field
   * @param state
   * @param index
   */
  setCurrentField(state, {currentImageIndex, currentRecordIndex, fieldIndex}) {
    console.log(currentImageIndex, currentRecordIndex, fieldIndex)
    state.batch.images[currentImageIndex].records[currentRecordIndex].currentField = fieldIndex;
  },

  /**
   * Set Record
   * @param state
   * @param {object}
   */
  setCurrentRecord(state, {imageIndex, recordIndex}) {
    state.batch.images[imageIndex].currentRecord = recordIndex;
  },

  /**
   * Set Current Image
   * @param state
   * @param index
   */
  setCurrentImage(state, index) {
    state.batch.images[state.batch.currentImage] = index;
  },

  recordAddComputed(state, image) {
    state.batch.images[image].records.push(constructEmptyRecord('Death'))
  }
};