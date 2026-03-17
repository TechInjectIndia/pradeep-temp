import { Request, Response } from 'firebase-functions/v2/https';
import * as WATIAdapter from '../infrastructure/wati/WATIAdapter';
import * as ResendAdapter from '../infrastructure/resend/ResendAdapter';
import * as CommunicationRepository from '../repositories/CommunicationRepository';

// ---------------------------------------------------------------------------
// POST /webhooks/wati
// ---------------------------------------------------------------------------

export async function handleWATIWebhook(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Verify webhook signature
    const signature = req.headers['x-wati-signature'] as string || '';
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    if (!signature) {
      res.status(400).json({ error: 'Missing webhook signature' });
      return;
    }

    const isValid = WATIAdapter.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid webhook signature' });
      return;
    }

    // Extract message ID and delivery status from the WATI webhook payload
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const externalMessageId: string = payload.id || payload.messageId || payload.waId || '';
    const deliveryStatus: string = payload.statusString || payload.status || payload.eventType || '';

    if (!externalMessageId) {
      res.status(400).json({ error: 'Missing messageId in webhook payload' });
      return;
    }

    // Find and update the teacher_communication record
    const communication = await CommunicationRepository.findByExternalMessageId(externalMessageId);

    if (!communication) {
      // Not an error -- may be a message we didn't send through this system
      console.warn(`No communication found for external message ID: ${externalMessageId}`);
      res.status(200).json({ received: true, matched: false });
      return;
    }

    // Map WATI status strings to our internal statuses
    const normalizedStatus = normalizeWATIStatus(deliveryStatus);
    const errorMessage = payload.error || payload.failureReason || undefined;

    await CommunicationRepository.updateDeliveryStatus(
      communication.id,
      normalizedStatus,
      errorMessage,
    );

    res.status(200).json({ received: true, matched: true, status: normalizedStatus });
  } catch (err) {
    console.error('handleWATIWebhook error:', err);
    res.status(500).json({
      error: 'Failed to process WATI webhook',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /webhooks/resend
// ---------------------------------------------------------------------------

export async function handleResendWebhook(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Verify webhook signature
    const signature = req.headers['resend-signature'] as string ||
      req.headers['x-resend-signature'] as string || '';
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    if (!signature) {
      res.status(400).json({ error: 'Missing webhook signature' });
      return;
    }

    const isValid = ResendAdapter.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid webhook signature' });
      return;
    }

    // Extract message ID and delivery status from the Resend webhook payload
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const eventData = payload.data || payload;
    const externalMessageId: string = eventData.email_id || eventData.id || '';
    const eventType: string = payload.type || payload.event || '';

    if (!externalMessageId) {
      res.status(400).json({ error: 'Missing email_id in webhook payload' });
      return;
    }

    // Find and update the teacher_communication record
    const communication = await CommunicationRepository.findByExternalMessageId(externalMessageId);

    if (!communication) {
      console.warn(`No communication found for external message ID: ${externalMessageId}`);
      res.status(200).json({ received: true, matched: false });
      return;
    }

    // Map Resend event types to our internal statuses
    const normalizedStatus = normalizeResendStatus(eventType);
    const errorMessage = eventData.bounce_type || eventData.reason || undefined;

    await CommunicationRepository.updateDeliveryStatus(
      communication.id,
      normalizedStatus,
      errorMessage,
    );

    res.status(200).json({ received: true, matched: true, status: normalizedStatus });
  } catch (err) {
    console.error('handleResendWebhook error:', err);
    res.status(500).json({
      error: 'Failed to process Resend webhook',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeWATIStatus(watiStatus: string): string {
  const lower = (watiStatus || '').toLowerCase();
  if (lower === 'delivered' || lower === 'read') return 'delivered';
  if (lower === 'sent') return 'sent';
  if (lower === 'failed' || lower === 'undeliverable') return 'failed';
  return lower || 'unknown';
}

function normalizeResendStatus(eventType: string): string {
  const lower = (eventType || '').toLowerCase();
  if (lower === 'email.delivered') return 'delivered';
  if (lower === 'email.sent') return 'sent';
  if (lower === 'email.opened') return 'opened';
  if (lower === 'email.clicked') return 'clicked';
  if (lower === 'email.bounced') return 'bounced';
  if (lower === 'email.complained') return 'complained';
  if (lower === 'email.delivery_delayed') return 'delayed';
  return lower || 'unknown';
}
