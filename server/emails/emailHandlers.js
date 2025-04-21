import { mailtrapClient, sender } from "../lib/mailtrap.js";

import {
  getTransactionEmailTemplate,
  verificationEmailTemplate,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verifikasi Akun",
      html: verificationEmailTemplate(verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendGetTransactionEmail = async (email, judul, nama) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Kamu Mendapatkan Transaksi Baru",
      html: getTransactionEmailTemplate(judul, nama),
      category: "New Transaction",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
