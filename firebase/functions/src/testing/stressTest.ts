import * as admin from 'firebase-admin';
import { generate1000Teachers } from './generateTestData';

// Configure for emulator
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

async function runStressTest(): Promise<void> {
  // Initialize Firebase Admin for emulator
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: 'demo-vsds' });
  }
  const db = admin.firestore();

  console.log('=== VSDS Stress Test: 1000 Teachers ===\n');

  const teachers = generate1000Teachers();
  console.log(`Generated ${teachers.length} test teacher records`);
  console.log(`  - Approx duplicates: ${Math.floor(teachers.length * 0.05)}`);

  // Phase 1: Write to Firestore
  const writeStart = Date.now();
  const batchId = `stress-test-${Date.now()}`;

  // Create batch document
  await db.collection('batches').doc(batchId).set({
    status: 'UPLOADED',
    fileName: 'stress-test-1000.xlsx',
    uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
    stats: {
      totalTeachers: teachers.length,
      messagesQueued: 0,
      messagesDelivered: 0,
      dlqMessages: 0,
      ordersCreated: 0,
    },
    productIds: ['product-1', 'product-2'],
    channel: 'whatsapp',
  });

  // Write teachers in batches of 500
  const BATCH_SIZE = 500;
  let written = 0;
  for (let i = 0; i < teachers.length; i += BATCH_SIZE) {
    const chunk = teachers.slice(i, i + BATCH_SIZE);
    const writeBatch = db.batch();
    for (const teacher of chunk) {
      const ref = db.collection('teachers_raw').doc();
      writeBatch.set(ref, {
        ...teacher,
        batchId,
        resolutionStatus: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    await writeBatch.commit();
    written += chunk.length;
    console.log(`  Written ${written}/${teachers.length} teachers to Firestore`);
  }

  const writeDuration = Date.now() - writeStart;
  console.log(
    `\nPhase 1 - Write: ${writeDuration}ms (${(teachers.length / (writeDuration / 1000)).toFixed(0)} records/sec)\n`
  );

  // Phase 2: Read back and verify
  const readStart = Date.now();
  const snapshot = await db
    .collection('teachers_raw')
    .where('batchId', '==', batchId)
    .get();
  const readDuration = Date.now() - readStart;
  console.log(
    `Phase 2 - Read: ${readDuration}ms (${snapshot.size} records, ${(snapshot.size / (readDuration / 1000)).toFixed(0)} records/sec)\n`
  );

  // Phase 3: Simulate duplicate detection
  const dedupStart = Date.now();
  const phoneMap = new Map<string, string[]>();
  const emailMap = new Map<string, string[]>();
  let duplicatesFound = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    const phone = data.phone;
    const email = data.email;

    if (phone) {
      if (!phoneMap.has(phone)) phoneMap.set(phone, []);
      phoneMap.get(phone)!.push(doc.id);
      if (phoneMap.get(phone)!.length > 1) duplicatesFound++;
    }

    if (email) {
      if (!emailMap.has(email)) emailMap.set(email, []);
      emailMap.get(email)!.push(doc.id);
      if (emailMap.get(email)!.length > 1) duplicatesFound++;
    }
  });

  const dedupDuration = Date.now() - dedupStart;
  const phoneDupes = Array.from(phoneMap.values()).filter((v) => v.length > 1).length;
  const emailDupes = Array.from(emailMap.values()).filter((v) => v.length > 1).length;
  console.log(`Phase 3 - Duplicate Detection: ${dedupDuration}ms`);
  console.log(`  Phone duplicates: ${phoneDupes}`);
  console.log(`  Email duplicates: ${emailDupes}`);
  console.log(`  Total duplicate pairs: ${duplicatesFound}\n`);

  // Phase 4: Simulate batch message queuing (mock - just writes comm_log entries)
  const msgStart = Date.now();
  let messagesCreated = 0;
  const uniqueTeachers = new Map<string, any>();

  snapshot.forEach((doc) => {
    const data = doc.data();
    const key = data.phone || data.email;
    if (!uniqueTeachers.has(key)) {
      uniqueTeachers.set(key, { ...data, id: doc.id });
    }
  });

  // Write comm_log entries in batches
  const commLogBatches: FirebaseFirestore.WriteBatch[] = [];
  let currentBatch = db.batch();
  let batchCount = 0;

  for (const [, teacher] of uniqueTeachers) {
    const ref = db.collection('comm_log').doc();
    currentBatch.set(ref, {
      batchId,
      teacherPhone: teacher.phone,
      teacherEmail: teacher.email,
      channel: 'whatsapp',
      status: 'queued',
      attemptCount: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    messagesCreated++;
    batchCount++;

    if (batchCount >= 500) {
      commLogBatches.push(currentBatch);
      currentBatch = db.batch();
      batchCount = 0;
    }
  }

  if (batchCount > 0) {
    commLogBatches.push(currentBatch);
  }

  for (const b of commLogBatches) {
    await b.commit();
  }

  const msgDuration = Date.now() - msgStart;
  console.log(`Phase 4 - Message Queuing: ${msgDuration}ms`);
  console.log(`  Unique teachers: ${uniqueTeachers.size}`);
  console.log(`  Messages created: ${messagesCreated}`);
  console.log(`  Throughput: ${(messagesCreated / (msgDuration / 1000)).toFixed(0)} messages/sec\n`);

  // Summary
  const totalDuration = Date.now() - writeStart;
  console.log('=== Summary ===');
  console.log(`Total time: ${totalDuration}ms`);
  console.log(`Teachers processed: ${teachers.length}`);
  console.log(`Duplicates found: ${duplicatesFound}`);
  console.log(`Messages queued: ${messagesCreated}`);
  console.log(`Overall throughput: ${(teachers.length / (totalDuration / 1000)).toFixed(0)} teachers/sec`);
  console.log('===============\n');
}

runStressTest().catch((err) => {
  console.error('Stress test failed:', err);
  process.exit(1);
});
