# EmailSender
a basic emailsender in ts


## Usage:
```typescript
// index.ts
import EmailSender from './emailSender';

// E-posta gönderme yapılandırması
const smtpConfig: smtp.SMTPConnectOptions = {
  host: 'your_smtp_host',
  port: 25, // SMTP port
  auth: {
    user: 'your_email@example.com',
    pass: 'your_email_password',
  },
};

const emailSender = new EmailSender(smtpConfig);

// Gönderilecek e-posta
const emailOptions = {
  to: 'recipient_email@example.com',
  subject: 'Test Email',
  text: 'Hello, this is a test email!',
  // veya html: '<p>Hello, this is a test email!</p>'
};

// E-postayı gönderme
emailSender.sendEmail(emailOptions)
  .then(() => console.log('E-posta başarıyla gönderildi.'))
  .catch((error) => console.error(`E-posta gönderme hatası: ${error.message}`));
```
