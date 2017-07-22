import { lang } from 'utils/lang';

class _ValidationService {

  requiredField(value) {
    return !!(value && value.length);
  }

  min(value, minLength) {
    return value && value.length && minLength && !isNaN(minLength) && value.length >= parseInt(minLength);
  }

  maxValue(value, maxValue) {
    let valInt = parseInt(value);
    let maxInt = parseInt(maxValue);
    if (!_.isNumber(valInt) || !_.isNumber(maxInt)) return false;
    return valInt <= maxInt;
  }

  minValue(value, minValue) {
    let valInt = parseInt(value);
    let minInt = parseInt(minValue);
    if (!_.isNumber(valInt) || !_.isNumber(minInt)) return false;
    return valInt >= minInt;
  }

  listOnly(inputValue, selectOptions) {
    let valid = false;
    selectOptions.forEach(item => {
      if (item.content === inputValue) {
        valid = true;
      }
    });
    return valid;
  }

  isSelectField(props) {
    return props.alphaSet === "selectionList" && !props.canAddValues;
  }


  /**
   * Validate Field
   * @param inputValue {String}
   * @param fieldObj {Object}
   * @param template {Object}
   * @returns fieldObj {Object}
   */
  validateField(inputValue, fieldObj, template) {

    if (!fieldObj || !template || !template.properties || !template.properties.property) {
      throw new Error('Cannot validate non-existent field object and properties');
    }

    let props = {};
    if (_.isArray(template.properties.property)) {
      template.properties.property.forEach(item => {
        props[item.type] = item.value;
      });
    } else {
      props = template.properties.property;
    }

    let errorMsg = '';

    // Required Field
    if (fieldObj.isRequiredField) {
      let isValid = this.requiredField(inputValue);
      if (!isValid && !errorMsg) {
        errorMsg = lang['required_field_error'];
      }
    }

    // no need to go further if there's no input
    if (!inputValue) {

      // if there's an error
      if (errorMsg) {
        fieldObj.errorMsg = errorMsg;
        fieldObj.valid = !errorMsg;
        return fieldObj;

      } else {
        return fieldObj;
      }
    }

    // Min Length
    if (props.minlength) {
      let isValid = this.min(inputValue, props.minlength);
      if (!isValid && !errorMsg) {
        errorMsg = lang['min_length_error'].replace('%{0}', props.minlength);
      }
    }

    // min value
    if (props.minValue && props.alphaSet === 'numeric') {
      let isValid = this.minValue(inputValue, props.minValue);
      if (!isValid && !errorMsg) {
        errorMsg = lang['min_value_error'].replace('%{0}', props.minValue);
      }
    }

    // max value
    if (props.maxValue && props.maxValue !== '-1' && props.alphaSet === 'numeric') {
      let isValid = this.maxValue(inputValue, props.maxValue);
      if (!isValid && !errorMsg) {
        errorMsg = lang['max_value_error'].replace('%{0}', props.maxValue);
      }
    }

    // list only
    if (this.isSelectField(props)) {
      let isValid = this.listOnly(inputValue, template.selectOptions);
      if (!isValid && !errorMsg) {
        errorMsg = lang['list_only_error'];
      }
    }

    fieldObj.errorMsg = errorMsg;
    fieldObj.valid = !errorMsg;

    return fieldObj;
  };

}

export const ValidationService = new _ValidationService();