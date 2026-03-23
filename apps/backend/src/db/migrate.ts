import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { config } from '@/config';
import { sql } from 'drizzle-orm';
import * as schema from './schema';

async function main() {
  console.log('Syncing database schema...');

  const client = postgres(config.db.url, { max: 1 });
  const db = drizzle(client, { schema });

  // Try migrations first (if migration files exist)
  try {
    const fs = await import('fs');
    if (fs.existsSync('./drizzle/migrations/meta/_journal.json')) {
      await migrate(db, { migrationsFolder: './drizzle/migrations' });
      console.log('Migrations applied.');
    } else {
      console.log('No migration files found — skipping migrations.');
    }
  } catch (err) {
    console.log('Migration skipped:', (err as Error).message);
  }

  // Ensure all tables exist by running CREATE TABLE IF NOT EXISTS
  // This is safe — won't modify existing tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS batches (
      id TEXT PRIMARY KEY,
      seq_id SERIAL UNIQUE,
      status TEXT NOT NULL DEFAULT 'UPLOADED',
      file_name TEXT,
      stats JSONB DEFAULT '{}',
      status_history JSONB DEFAULT '[]',
      paused_from_stage TEXT,
      paused_at TIMESTAMPTZ,
      resumed_at TIMESTAMPTZ,
      cancelled_at TIMESTAMPTZ,
      cancel_reason TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      seq_id SERIAL UNIQUE,
      name TEXT NOT NULL,
      phones JSONB DEFAULT '[]' NOT NULL,
      emails JSONB DEFAULT '[]' NOT NULL,
      school TEXT,
      city TEXT,
      record_id TEXT,
      books_assigned TEXT,
      teacher_owner_id TEXT,
      teacher_owner TEXT,
      first_name TEXT,
      last_name TEXT,
      institution_id TEXT,
      institution_name TEXT,
      salutation TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS phone_lookup (
      phone TEXT PRIMARY KEY,
      teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS email_lookup (
      email TEXT PRIMARY KEY,
      teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS teachers_raw (
      id TEXT PRIMARY KEY,
      batch_id TEXT NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
      name TEXT,
      phone TEXT,
      email TEXT,
      school TEXT,
      city TEXT,
      books TEXT,
      resolution_status TEXT NOT NULL DEFAULT 'PENDING',
      teacher_master_id TEXT REFERENCES teachers(id),
      is_new_teacher BOOLEAN,
      resolution_confidence REAL,
      resolution_error TEXT,
      send_whatsapp BOOLEAN DEFAULT true,
      send_email BOOLEAN DEFAULT false,
      record_id TEXT,
      books_assigned TEXT,
      teacher_owner_id TEXT,
      teacher_owner TEXT,
      first_name TEXT,
      last_name TEXT,
      institution_id TEXT,
      institution_name TEXT,
      salutation TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      batch_id TEXT NOT NULL REFERENCES batches(id),
      teacher_record_id TEXT NOT NULL REFERENCES teachers_raw(id),
      teacher_master_id TEXT REFERENCES teachers(id),
      teacher_name TEXT NOT NULL,
      teacher_phone TEXT,
      teacher_email TEXT,
      school TEXT,
      city TEXT,
      books JSONB DEFAULT '[]',
      total_books INTEGER DEFAULT 0,
      send_whatsapp BOOLEAN DEFAULT true,
      send_email BOOLEAN DEFAULT false,
      status TEXT DEFAULT 'created',
      expires_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS aggregations (
      id TEXT PRIMARY KEY,
      teacher_master_id TEXT NOT NULL REFERENCES teachers(id),
      teacher_record_id TEXT REFERENCES teachers_raw(id),
      batch_id TEXT NOT NULL REFERENCES batches(id),
      teacher_name TEXT,
      teacher_phone TEXT,
      teacher_email TEXT,
      books TEXT,
      send_whatsapp BOOLEAN DEFAULT true,
      send_email BOOLEAN DEFAULT false,
      expected_link_count INTEGER NOT NULL DEFAULT 0,
      link_count INTEGER NOT NULL DEFAULT 0,
      links JSONB DEFAULT '[]',
      is_complete BOOLEAN NOT NULL DEFAULT false,
      completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS comm_log (
      id TEXT PRIMARY KEY,
      message_hash TEXT NOT NULL UNIQUE,
      batch_id TEXT NOT NULL REFERENCES batches(id),
      teacher_master_id TEXT,
      teacher_record_id TEXT,
      aggregation_key TEXT,
      channel TEXT NOT NULL,
      teacher_phone TEXT,
      teacher_email TEXT,
      teacher_name TEXT,
      books TEXT,
      status TEXT NOT NULL DEFAULT 'QUEUED',
      attempt_count INTEGER NOT NULL DEFAULT 0,
      external_message_id TEXT,
      delivered_at TIMESTAMPTZ,
      last_error TEXT,
      last_attempt_at TIMESTAMPTZ,
      skip_reason TEXT,
      error_type TEXT,
      retried_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS message_send_log (
      id TEXT PRIMARY KEY,
      comm_log_id TEXT REFERENCES comm_log(id),
      batch_id TEXT REFERENCES batches(id),
      teacher_master_id TEXT,
      teacher_phone TEXT,
      teacher_email TEXT,
      teacher_name TEXT,
      channel TEXT NOT NULL,
      attempt_number INTEGER NOT NULL DEFAULT 1,
      sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL,
      external_message_id TEXT,
      error TEXT,
      link_count INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS teacher_communications (
      id TEXT PRIMARY KEY,
      comm_log_id TEXT REFERENCES comm_log(id),
      teacher_id TEXT REFERENCES teachers(id),
      batch_id TEXT REFERENCES batches(id),
      channel TEXT NOT NULL,
      external_message_id TEXT,
      delivery_status TEXT NOT NULL,
      delivery_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS failed_messages (
      id TEXT PRIMARY KEY,
      comm_log_id TEXT REFERENCES comm_log(id),
      batch_id TEXT REFERENCES batches(id),
      teacher_master_id TEXT,
      teacher_record_id TEXT,
      channel TEXT NOT NULL,
      teacher_phone TEXT,
      teacher_email TEXT,
      error_type TEXT NOT NULL,
      error_message TEXT NOT NULL,
      attempt_count INTEGER NOT NULL DEFAULT 0,
      is_retryable BOOLEAN NOT NULL DEFAULT true,
      status TEXT NOT NULL DEFAULT 'FAILED',
      retried_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS possible_duplicates (
      id TEXT PRIMARY KEY,
      batch_id TEXT REFERENCES batches(id),
      raw_teacher_id TEXT REFERENCES teachers_raw(id),
      candidate_teacher_id TEXT REFERENCES teachers(id),
      confidence_score REAL NOT NULL,
      match_reasons JSONB DEFAULT '[]',
      resolution TEXT NOT NULL DEFAULT 'PENDING',
      reviewed_by TEXT,
      resolved_at TIMESTAMPTZ,
      incoming_record JSONB,
      existing_record JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS batch_errors (
      id TEXT PRIMARY KEY,
      batch_id TEXT NOT NULL REFERENCES batches(id),
      stage TEXT NOT NULL,
      comm_log_id TEXT,
      teacher_raw_id TEXT,
      error_type TEXT NOT NULL,
      error_message TEXT NOT NULL,
      is_retryable BOOLEAN NOT NULL DEFAULT true,
      teacher_name TEXT,
      teacher_phone TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS batch_logs (
      id TEXT PRIMARY KEY,
      batch_id TEXT NOT NULL REFERENCES batches(id),
      step TEXT NOT NULL,
      message TEXT NOT NULL,
      detail TEXT,
      teacher_name TEXT,
      teacher_phone TEXT,
      teacher_email TEXT,
      channel TEXT,
      metadata JSONB,
      logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS batch_links (
      id TEXT PRIMARY KEY,
      batch_id TEXT NOT NULL UNIQUE REFERENCES batches(id),
      links JSONB,
      expires_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS book_mappings (
      id TEXT PRIMARY KEY,
      book_code TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_title TEXT NOT NULL,
      notes TEXT,
      authors JSONB DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(book_code, product_id)
    );

    CREATE TABLE IF NOT EXISTS wati_templates (
      id TEXT PRIMARY KEY,
      template_name TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      body_preview TEXT,
      params JSONB DEFAULT '[]',
      is_active BOOLEAN NOT NULL DEFAULT false,
      book_count INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS algolia_products (
      object_id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      isbn TEXT,
      subject TEXT,
      grade TEXT,
      publisher TEXT,
      cover_url TEXT,
      raw_data JSONB,
      synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_comm_log_batch_status ON comm_log(batch_id, status);
    CREATE INDEX IF NOT EXISTS idx_orders_batch_status ON orders(batch_id, status);
    CREATE INDEX IF NOT EXISTS idx_teachers_raw_batch_res ON teachers_raw(batch_id, resolution_status);
  `);

  console.log('Schema sync complete.');

  // Remove old templates that are no longer used
  const oldTemplateNames = ['spmst1', 'spmst2', 'spmst3', 'spmst6', 'spmst9', 'spmst12', 'spemst_4'];
  for (const name of oldTemplateNames) {
    await db.execute(sql`DELETE FROM wati_templates WHERE template_name = ${name}`);
  }
  console.log('Removed old templates (spmst*/spemst_* series).');

  // Seed WATI templates (sbtemp_* series) — idempotent
  // Positional params: {{1}}=name, {{2}}=single order link,
  // then pairs per book: {{3}}={{4}}=title+author for book1, {{5}}{{6}} for book2, etc.
  const sbTemplates = [1, 2, 3, 4, 6, 9, 12];
  for (const n of sbTemplates) {
    const bookList = Array.from({ length: n }, (_, i) => {
      const titleParam = 3 + i * 2;
      const authorParam = 4 + i * 2;
      return `*${i + 1}. {{${titleParam}}}* by _{{${authorParam}}}_`;
    }).join('\n');

    const bodyPreview = `Dear *{{1}}*,

We highly value your trust in *Pradeep's Books* over the years.

In our endeavour to equip you with our resource material in a better and instant manner, we have now brought for you the digital versions of our following book${n > 1 ? 's' : ''} for your kind review and recommendation:

${bookList}

The access link for the digital copy is shared below for your convenience:

{{2}}

Appreciating your unwavering patronage and assuring you of our constant and consistent efforts to bring you standard academic books from time to time.

*Pradeep Jain*
*Chairman*
Please confirm books receipt by selecting an option below.`;

    const params = [
      { paramName: '1', dataPath: 'teacher.name', fallback: 'Teacher' },
      { paramName: '2', dataPath: 'order.link', fallback: '' },
      ...Array.from({ length: n }, (_, i) => ([
        { paramName: String(3 + i * 2), dataPath: `books.${i}.title`, fallback: '' },
        { paramName: String(4 + i * 2), dataPath: `books.${i}.author`, fallback: '' },
      ])).flat(),
    ];

    await db.execute(sql`
      INSERT INTO wati_templates (id, template_name, display_name, body_preview, params, is_active, book_count, created_at, updated_at)
      VALUES (
        gen_random_uuid()::text,
        ${`sbtemp_${n}`},
        ${`Specimen Book (${n} book${n > 1 ? 's' : ''})`},
        ${bodyPreview},
        ${JSON.stringify(params)}::jsonb,
        false,
        ${n},
        NOW(),
        NOW()
      )
      ON CONFLICT (template_name) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        body_preview = EXCLUDED.body_preview,
        params = EXCLUDED.params,
        book_count = EXCLUDED.book_count,
        updated_at = NOW()
    `);
  }
  console.log('Seeded sbtemp_1/2/3/4/6/9/12 templates.');

  await client.end();
}

main().catch((err) => {
  console.error('Schema sync failed:', err);
  process.exit(1);
});
