import { BLANK, UNREADABLE } from '../constants';
import { lang } from './lang';

export const blankUnreadable = function(term) {
  if (BLANK === term) {
    return lang['blank'];
  } else if (UNREADABLE === term) {
    return lang['unreadable'];
  } else {
    return term;
  }
};

export const blankUnreadableMixin = {
  methods: { blankUnreadable }
};