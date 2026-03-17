export const config = {
  wati: {
    apiUrl: process.env.WATI_API_URL || '',
    apiKey: process.env.WATI_API_KEY || '',
    webhookSecret: process.env.WATI_WEBHOOK_SECRET || '',
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
  },
};
