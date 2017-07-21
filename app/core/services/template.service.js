import { mockTemplateData } from '../../mock-template-data';
import _find from 'lodash/find';

class _TemplateService {
  constructor() {
    this.template = mockTemplateData;
  }

  getFieldName(fieldIndex) {
    return _find(this.template[0].data[fieldIndex].displayNames['ns5:localText'], {
      locale: 'en'
    }).content;
  }
}

export const TemplateService = new _TemplateService();