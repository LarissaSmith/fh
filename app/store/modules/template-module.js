import { mockTemplateData } from '../../mock-template-data';

// $store.state.template
export const templateModule = {
  state: mockTemplateData,
  mutations: {},
  actions: {},
  getters: {
    template: (state) => (index) => {
      return state[0].data[index];
    }
  }

};