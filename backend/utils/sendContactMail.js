import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: "The Style Parlour <onboarding@resend.dev>",
    to: process.env.CONTACT_INBOX_EMAIL, 
    replyTo: options.email,            
    subject: options.subject,
    text: options.message,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default sendContactEmail;