const { Resend } = require('resend');
require('dotenv').config();

const key = process.env.RESEND_API_KEY;
console.log('Testing Resend API Key...');
console.log('Key starts with:', key?.substring(0, 15) + '...');

if (!key) {
  console.error('❌ No API key found in .env');
  process.exit(1);
}

if (!key.startsWith('re_')) {
  console.error('❌ Invalid API key format. Must start with re_');
  process.exit(1);
}

console.log('✅ API key format is valid');

const resend = new Resend(key);
console.log('✅ Resend client initialized');

(async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Test Email',
      html: '<p>This is a test email</p>',
    });

    if (error) {
      console.error('❌ Resend API Error:', error);
      console.log('\nPossible causes:');
      console.log('1. API key is invalid or expired');
      console.log('2. API key has been revoked');
      console.log('3. Network connectivity issue');
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', data.id);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
