import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (options) => {
  const unsubscribeUrl = `${process.env.BACKEND_URL}/api/subscribe/unsubscribe?token=${options.unsubscribeToken}`;

  const { data, error } = await resend.emails.send({
    from: "The Style Parlour <onboarding@resend.dev>",
    to: options.email,
    subject: options.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Thanks for subscribing!</h2>
        <p>You're now on our list and will hear from us soon.</p>
        <p style="color:#888; font-size:11px; margin-top:24px;">
          <a href="${unsubscribeUrl}" style="color:#888;">Unsubscribe</a>
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default sendWelcomeEmail;