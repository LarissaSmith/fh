import { batchModule } from './modules/batch-module';
import { focusModule } from './modules/focus-module';

export const store = {
  modules: {
    batch: batchModule,
    focus: focusModule
  }
};