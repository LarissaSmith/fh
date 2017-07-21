import * as locale from '../locale';
const SELECTED_LANG = 'en';

export const lang = function(term) {
  return locale[SELECTED_LANG][term] || term;
};

export const langMixin = {
  methods: { lang }
};

