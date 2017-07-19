import { batchModule } from './modules/batch-module';
import { focusModule } from './modules/focus-module';
import { templateModule } from './modules/template-module';

export const store = {
  modules: {
    batch: batchModule,
    focus: focusModule,
    template: templateModule
  }
};