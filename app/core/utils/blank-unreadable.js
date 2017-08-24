import { lang } from './lang';

export const blankUnreadable = function(blank, unreadable) {
  if (blank) {
    return lang['blank'];
  } else if (unreadable) {
    return lang['unreadable'];
  } else {
    return '';
  }
};

export const blankUnreadableMixin = {
  methods: { blankUnreadable }
};