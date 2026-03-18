#!/usr/bin/env node
/**
 * List WATI message templates. Run from firebase/functions:
 *   node scripts/list-wati-templates.js
 *
 * Requires config.env with WATI_API_URL and WATI_API_KEY.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', 'config.env') });

const apiUrl = process.env.WATI_API_URL?.replace(/\/$/, '');
const apiKey = process.env.WATI_API_KEY;

if (!apiUrl || !apiKey) {
  console.error('Missing WATI_API_URL or WATI_API_KEY in config.env');
  process.exit(1);
}

async function listTemplates() {
  const res = await fetch(`${apiUrl}/api/v2/getMessageTemplates?pageSize=50`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    console.error('WATI API error:', res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  const templates = data.messageTemplates || [];

  console.log('\nWATI Templates (use elementName as WATI_TEMPLATE_NAME):\n');
  if (templates.length === 0) {
    console.log('  No templates found. Create one in WATI dashboard first.');
    return;
  }

  templates.forEach((t) => {
    const status = t.status || '?';
    const name = t.elementName || t.id || '?';
    const body = (t.body || '').substring(0, 60);
    console.log(`  ${name} (${status})`);
    console.log(`    body: ${body}...`);
    console.log('');
  });

  console.log('Add to config.env:');
  console.log(`  WATI_TEMPLATE_NAME=${templates[0]?.elementName || 'your_template_name'}`);
}

listTemplates().catch((err) => {
  console.error(err);
  process.exit(1);
});
