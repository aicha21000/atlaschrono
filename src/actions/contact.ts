"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Tous les champs obligatoires doivent être remplis." };
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  if (!user || !pass) {
    return { success: false, error: "La configuration email n'est pas définie sur le serveur." };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      replyTo: email,
      to: user, // Envoyer à l'adresse Gmail elle-même
      subject: `[Contact Showroom] ${subject || "Nouveau message"}`,
      text: `Vous avez reçu un nouveau message de ${name} (${email}).\n\nSujet : ${subject}\n\nMessage :\n${message}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, error: "Erreur de messagerie : " + (error.message || "Impossible de contacter Gmail.") };
  }
}
