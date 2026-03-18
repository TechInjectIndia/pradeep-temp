import { AdapterRegistry } from './AdapterRegistry';

import * as WATIAdapter from '../infrastructure/wati/WATIAdapter';
import { MockMessagingAdapter } from '../mocks/MockMessagingAdapter';
import * as ResendAdapter from '../infrastructure/resend/ResendAdapter';
import * as AlgoliaAdapter from '../infrastructure/algolia/AlgoliaAdapter';
import * as CloudTasksAdapter from '../infrastructure/cloudtasks/CloudTasksAdapter';
import * as LocalTaskQueueAdapter from '../infrastructure/cloudtasks/LocalTaskQueueAdapter';
import { config } from '../config';

/**
 * Wire all production (real) adapters into the AdapterRegistry.
 *
 * Call this once during application bootstrap, **before** any service code
 * attempts to access the registry.
 *
 * When CLOUD_FUNCTIONS_URL points to localhost, uses LocalTaskQueueAdapter
 * to invoke workers directly (bypasses Cloud Tasks for emulator).
 */
export function registerProductionAdapters(): void {
  const registry = AdapterRegistry.getInstance();

  const useMockWati =
    process.env.USE_MOCK_WATI === 'true' ||
    process.env.USE_MOCK_WATI === '1';

  const messagingAdapter = useMockWati
    ? new MockMessagingAdapter()
    : {
        sendTemplate: WATIAdapter.sendTemplate,
        verifyWebhookSignature: WATIAdapter.verifyWebhookSignature,
      };

  registry.registerMessaging(messagingAdapter);

  registry.registerEmail({
    sendEmail: ResendAdapter.sendEmail,
    verifyWebhookSignature: ResendAdapter.verifyWebhookSignature,
  });

  registry.registerSearch({
    indexTeacher: AlgoliaAdapter.indexTeacher,
    searchTeachers: AlgoliaAdapter.searchTeachers,
    deleteTeacher: AlgoliaAdapter.deleteTeacher,
  });

  const isLocal =
    config.cloudTasks.serviceUrl?.includes('localhost') ||
    config.cloudTasks.serviceUrl?.includes('127.0.0.1');

  registry.registerTaskQueue({
    enqueueTask: isLocal ? LocalTaskQueueAdapter.enqueueTask : CloudTasksAdapter.enqueueTask,
  });
}
