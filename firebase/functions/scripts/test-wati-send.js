#!/usr/bin/env node
/**
 * Test WATI send - helps diagnose template/API issues.
 * Usage: node scripts/test-wati-send.js [phone]
 * Phone defaults to WATI_CHANNEL_NUMBER or 919855592100
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', 'config.env') });

const apiUrl = process.env.WATI_API_URL?.replace(/\/$/, '');
const apiKey = process.env.WATI_API_KEY;
const channelNumber = process.env.WATI_CHANNEL_NUMBER || '919855592100';
const templateName = process.env.WATI_TEMPLATE_NAME || 'specimen_books_msg';
const phone = process.argv[2] || channelNumber;

if (!apiUrl || !apiKey) {
  console.error('Missing WATI_API_URL or WATI_API_KEY');
  process.exit(1);
}

const whatsappNumber = phone.replace(/\D/g, '');
const parameters = [
  { name: '1', value: 'Test Teacher' },
  { name: '2', value: 'Math Grade 5' },
  { name: '3', value: 'https://www.pradeeppublications.com' },
];

async function test() {
  console.log('WATI Send Test');
  console.log('  URL:', apiUrl);
  console.log('  Template:', templateName);
  console.log('  Phone:', whatsappNumber);
  console.log('  Channel:', channelNumber);
  console.log('  Params:', JSON.stringify(parameters, null, 2));
  console.log('');

  const body = {
    template_name: templateName,
    broadcast_name: `test_${Date.now()}`,
    parameters,
    channel_number: channelNumber,
  };

  const res = await fetch(
    `${apiUrl}/api/v2/sendTemplateMessage?whatsappNumber=${encodeURIComponent(whatsappNumber)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    }
  );

  const text = await res.text();
  console.log('Response:', res.status, res.statusText);
  console.log('Body:', text);

  if (!res.ok) {
    process.exit(1);
  }
}

test().catch((e) => {
  console.error(e);
  process.exit(1);
});
