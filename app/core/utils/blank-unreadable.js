import { unreadable, blank } from './constants';
import { lang } from './lang';

export const blankUnreadable = function(term) {
  if (blank === term) {
    return lang('blank');
  } else if (unreadable === term) {
    return lang('unreadable');
  } else {
    return term;
  }
};

export const blankUnreadableMixin = {
  methods: { blankUnreadable }
};