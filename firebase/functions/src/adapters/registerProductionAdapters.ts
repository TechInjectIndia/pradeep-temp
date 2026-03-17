import { AdapterRegistry } from './AdapterRegistry';

import * as WATIAdapter from '../infrastructure/wati/WATIAdapter';
import * as ResendAdapter from '../infrastructure/resend/ResendAdapter';
import * as AlgoliaAdapter from '../infrastructure/algolia/AlgoliaAdapter';
import * as CloudTasksAdapter from '../infrastructure/cloudtasks/CloudTasksAdapter';

/**
 * Wire all production (real) adapters into the AdapterRegistry.
 *
 * Call this once during application bootstrap, **before** any service code
 * attempts to access the registry.
 */
export function registerProductionAdapters(): void {
  const registry = AdapterRegistry.getInstance();

  registry.registerMessaging({
    sendTemplate: WATIAdapter.sendTemplate,
    verifyWebhookSignature: WATIAdapter.verifyWebhookSignature,
  });

  registry.registerEmail({
    sendEmail: ResendAdapter.sendEmail,
    verifyWebhookSignature: ResendAdapter.verifyWebhookSignature,
  });

  registry.registerSearch({
    indexTeacher: AlgoliaAdapter.indexTeacher,
    searchTeachers: AlgoliaAdapter.searchTeachers,
    deleteTeacher: AlgoliaAdapter.deleteTeacher,
  });

  registry.registerTaskQueue({
    enqueueTask: CloudTasksAdapter.enqueueTask,
  });
}
