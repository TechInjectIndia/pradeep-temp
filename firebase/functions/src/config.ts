export const config = {
  wati: {
    apiUrl: process.env.WATI_API_URL || '',
    apiKey: process.env.WATI_API_KEY || '',
    webhookSecret: process.env.WATI_WEBHOOK_SECRET || '',
    channelNumber: process.env.WATI_CHANNEL_NUMBER || '', // WhatsApp business number for sending
    /** Template name must exist in your WATI dashboard (create under Message Templates) */
    templateName: process.env.WATI_TEMPLATE_NAME || 'specimen_links',
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'specimens@example.com',
    webhookSecret: process.env.RESEND_WEBHOOK_SECRET || '',
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID || '',
    apiKey: process.env.ALGOLIA_API_KEY || '',
    teacherIndex: process.env.ALGOLIA_TEACHER_INDEX || 'teachers',
  },
  cloudTasks: {
    project: process.env.GCP_PROJECT || '',
    location: process.env.GCP_LOCATION || 'us-central1',
    serviceUrl: process.env.CLOUD_FUNCTIONS_URL || '',
  },
  app: {
    maxFileSizeMB: 10,
    linkExpiryDays: 90,
    rawTeacherTTLDays: 90,
    aggregationTTLDays: 7,
    /** Max messages per teacher per hour (0 = no limit) */
    maxMessagesPerTeacherPerHour: parseInt(process.env.MAX_MESSAGES_PER_TEACHER_PER_HOUR || '0', 10) || 0,
    /** Website URL to include in messages */
    websiteUrl: process.env.APP_WEBSITE_URL || 'https://www.pradeeppublications.com',
    /** Base URL for specimen links (view, generate-links) */
    specimenBaseUrl: process.env.SPECIMEN_BASE_URL || process.env.APP_WEBSITE_URL || 'https://specimens.example.com',
    /**
     * External Order API endpoint (POST).
     * Payload:  { batchId, teachers: Record<teacherId, Record<productId, count>> }
     * Response: { batchId, teachers: Record<teacherId, Record<productId, link[]>> }
     *
     * Leave unset to use the local URL-generation fallback (emulator / dev).
     */
    orderApiUrl: process.env.ORDER_API_URL || '',
  },
};

/**
 * Validate that all required environment variables are set.
 * Call this at startup to fail fast rather than at request time.
 */
export function validateConfig(): void {
  const required: [string, string][] = [
    ['WATI_API_URL', config.wati.apiUrl],
    ['WATI_API_KEY', config.wati.apiKey],
    ['RESEND_API_KEY', config.resend.apiKey],
    ['GCP_PROJECT', config.cloudTasks.project],
    ['CLOUD_FUNCTIONS_URL', config.cloudTasks.serviceUrl],
  ];

  const missing = required.filter(([, val]) => !val).map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
