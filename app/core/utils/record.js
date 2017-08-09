import { TemplateService } from '../services/template.service';
import _find from 'lodash/find';

export function constructEmptyRecord(templateName) {
  let template = _find(TemplateService.template, {name: templateName});
  return {
    fields: template.data.map((t, i) => {
      return {
        accepted: false,
        content: '',
        contentURI: '',
        errorMsg: '',
        id: i,
        innerForm: {},
        label: t.label,
        previousContent: '',
        reviewedA: false,
        reviewedB: false,
        temp: {},
        valid: false,
        viewed: false
      }
    })
  }
}