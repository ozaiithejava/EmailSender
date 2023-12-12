import * as smtp from 'smtp';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailSender {
  private smtpTransport: smtp.SMTP;

  constructor(private smtpConfig: smtp.SMTPConnectOptions) {
    this.smtpTransport = new smtp.SMTP(smtpConfig);
  }

  public async sendEmail(options: EmailOptions): Promise<void> {
    const message = `
      From: ${this.smtpConfig.auth.user}
      To: ${options.to}
      Subject: ${options.subject}
      Content-Type: text/html;charset=utf-8
      
      ${options.text || options.html}
    `;

    return new Promise<void>((resolve, reject) => {
      const connection = this.smtpTransport.connect(this.smtpConfig);

      connection.on('error', (error: Error) => {
        reject(error);
      });

      connection.on('connect', () => {
        connection.send(
          {
            from: this.smtpConfig.auth.user,
            to: options.to,
            subject: options.subject,
          },
          message,
          (error) => {
            connection.quit();
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    });
  }
}

export default EmailSender;
