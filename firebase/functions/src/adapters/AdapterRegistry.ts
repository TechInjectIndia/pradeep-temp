import { IMessagingPort, IEmailPort, ISearchPort, ITaskQueuePort } from '../ports';

/**
 * Singleton registry that holds references to every infrastructure adapter.
 *
 * Production code calls `registerXxx()` at startup (see `registerProductionAdapters`).
 * Tests call `resetForTesting()` and then register fakes / stubs as needed.
 */
export class AdapterRegistry {
  private static instance: AdapterRegistry;

  private _messaging: IMessagingPort | null = null;
  private _email: IEmailPort | null = null;
  private _search: ISearchPort | null = null;
  private _taskQueue: ITaskQueuePort | null = null;

  // Prevent external instantiation.
  private constructor() {}

  /** Return the singleton instance, creating it on first access. */
  static getInstance(): AdapterRegistry {
    if (!AdapterRegistry.instance) {
      AdapterRegistry.instance = new AdapterRegistry();
    }
    return AdapterRegistry.instance;
  }

  /**
   * Reset all registered adapters to `null` and discard the singleton.
   * **Intended for test suites only.**
   */
  static resetForTesting(): void {
    if (AdapterRegistry.instance) {
      AdapterRegistry.instance._messaging = null;
      AdapterRegistry.instance._email = null;
      AdapterRegistry.instance._search = null;
      AdapterRegistry.instance._taskQueue = null;
    }
    // Drop the singleton so the next `getInstance()` creates a fresh one.
    AdapterRegistry.instance = undefined as unknown as AdapterRegistry;
  }

  // ---------------------------------------------------------------------------
  // Getters – throw when the caller forgot to register an adapter.
  // ---------------------------------------------------------------------------

  get messaging(): IMessagingPort {
    if (!this._messaging) {
      throw new Error(
        'MessagingPort has not been registered. Call registerMessaging() at startup.',
      );
    }
    return this._messaging;
  }

  get email(): IEmailPort {
    if (!this._email) {
      throw new Error('EmailPort has not been registered. Call registerEmail() at startup.');
    }
    return this._email;
  }

  get search(): ISearchPort {
    if (!this._search) {
      throw new Error('SearchPort has not been registered. Call registerSearch() at startup.');
    }
    return this._search;
  }

  get taskQueue(): ITaskQueuePort {
    if (!this._taskQueue) {
      throw new Error(
        'TaskQueuePort has not been registered. Call registerTaskQueue() at startup.',
      );
    }
    return this._taskQueue;
  }

  // ---------------------------------------------------------------------------
  // Registration methods
  // ---------------------------------------------------------------------------

  registerMessaging(adapter: IMessagingPort): void {
    this._messaging = adapter;
  }

  registerEmail(adapter: IEmailPort): void {
    this._email = adapter;
  }

  registerSearch(adapter: ISearchPort): void {
    this._search = adapter;
  }

  registerTaskQueue(adapter: ITaskQueuePort): void {
    this._taskQueue = adapter;
  }
}
