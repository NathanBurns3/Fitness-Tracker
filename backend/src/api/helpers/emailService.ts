import * as SibApiV3Sdk from '@sendinblue/client';
import crypto from 'crypto';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export const sendVerificationEmail = async (email: string, token: string) => {
  //Nathan: fix this to: ${process.env.FRONTEND_URL}
  const verificationUrl = `http://localhost:4200/verify-email?token=${token}`;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = 'Verify Your Email - ActiveLife Tracker';
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome to ActiveLife Tracker!</h2>
      <p>Please click the button below to verify your email address:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
      </div>
      <p>If you didn't create an account, please ignore this email.</p>
      <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
    </div>
  `;
  sendSmtpEmail.sender = {
    name: 'ActiveLife Tracker',
    email: process.env.BREVO_SENDER_EMAIL as string,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  //Nathan: fix this to: ${process.env.FRONTEND_URL}
  const resetUrl = `http://localhost:4200/reset-password?token=${token}`;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = 'Password Reset - ActiveLife Tracker';
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Password Reset Request</h2>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #f44336; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      <p>If you didn't request this, please ignore this email.</p>
      <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
    </div>
  `;
  sendSmtpEmail.sender = {
    name: 'ActiveLife Tracker',
    email: process.env.BREVO_SENDER_EMAIL as string,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
