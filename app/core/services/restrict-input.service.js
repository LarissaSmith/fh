
class _RestrictInput {

  max(value, maxLength) {
    if (value && value.length && maxLength && !isNaN(maxLength) && value.length > parseInt(maxLength)) {
      return value.substring(0, maxLength);
    } else return value;
  }

  numeric(value) {
    if (value && typeof value === 'string') {
      return value.replace(/\D/g, '');
    } else {
      return value;
    }
  }

  charRestriction(value, characterRestriction) {
    if (value && typeof value === 'string') {
      let charRestrict = new RegExp(characterRestriction, "g");
      let transformedInput = value.replace(charRestrict, '');
      return transformedInput;
    }
    else return value;
  }

  authoritiesValidation(value, authoritiesValidation, fieldobj) {
    if (!value) {
      return '';
    }
    if (fieldobj && recordid >= 0) {
      if (authoritiesValidation) {
        let authorizationList = JSON.parse(authoritiesValidation);
        if (authorizationList.length > 0) {
          if (_.findWhere(authorizationList, {content: text}) || fieldobj.accepted) {
            fieldobj.errorMsg = "";
            fieldobj.accepted = true;
          } else {
            fieldobj.accepted = false;
          }
        }
      }
    }
  }


}

export const RestrictInput = new _RestrictInput();