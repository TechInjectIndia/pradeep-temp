import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as admin from 'firebase-admin';

// Cap the number of batches scanned for message stats.
// For an all-time total, maintain a system_stats document instead.
const MAX_BATCHES_TO_SCAN = 500;

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const db = admin.firestore();

    // Run all independent queries in parallel
    const [teachersSnap, activeBatchesSnap, recentBatchesSnap] = await Promise.all([
      db.collection('teachers_master').count().get(),
      db.collection('specimen_batches')
        .where('status', 'not-in', ['COMPLETE', 'CANCELLED', 'PARTIAL_FAILURE'])
        .count()
        .get(),
      // Scan only the most recent batches to keep this O(1) and fast
      db.collection('specimen_batches')
        .orderBy('createdAt', 'desc')
        .limit(MAX_BATCHES_TO_SCAN)
        .get(),
    ]);

    const totalTeachers = teachersSnap.data().count;
    const activeBatchesCount = activeBatchesSnap.data().count;

    let totalMessagesSent = 0;
    let messagesFailed = 0;
    let messagesQueued = 0;

    recentBatchesSnap.forEach((doc) => {
      const stats = doc.data().stats || {};
      // Support both field naming conventions during schema migration
      totalMessagesSent += stats.messagesSent || stats.sentMessages || 0;
      messagesFailed += stats.messagesFailed || stats.failedMessages || 0;
      messagesQueued += stats.messagesQueued || stats.queuedMessages || 0;
    });

    res.status(200).json({
      totalTeachers,
      activeBatches: activeBatchesCount,
      totalMessagesSent,
      dlqSize: messagesFailed,
      queueSize: messagesQueued,
    });
  } catch (err) {
    console.error('getDashboardStats error:', err);
    res.status(500).json({
      error: 'Failed to fetch dashboard stats',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
