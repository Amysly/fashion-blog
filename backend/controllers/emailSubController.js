import asyncHandler from 'express-async-handler';
import EmailSub from '../models/EmailModel.js';
//import ContactMsg from '../models/contactMessageModel.js'
import sendWelcomeEmail from '../utils/sendEmail.js'
import sendContactEmail from '../utils/sendContactMail.js';


const createEmailSub = asyncHandler(async (req, res) => {
    const { email } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400);
        throw new Error('Invalid email');
    }

    const emailExists = await EmailSub.findOne({ email });
    if (emailExists) {
        res.status(400);
        throw new Error('email already exists');
    }

    const emailValid = await EmailSub.create({ email });

    try {
        await sendWelcomeEmail({
            email:emailValid.email,
            subject: 'Welcome to The Style Parlour',
            message: `Hi there,\n\nThanks for subscribing to The Style Parlour!
             You're on the list and we'll keep you posted.\n\n— The Style Parlour Team`,
            unsubscribeToken: emailValid.unsubscribeToken,

        });
    } catch (err) {
        console.error('Welcome email failed to send:', err.message);
    }

    res.status(201).json(emailValid);
});

const getEmailSubByAdmin = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
         res.status(403);
        throw new Error("You dont have access to the subscribers");
    
    }
     const count = await EmailSub.countDocuments();
  const subscribers = await EmailSub.find().sort({ createdAt: -1 });

  res.status(200).json({ count, subscribers });
});


const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message, subject } = req.body || {};

  if (!name || !email || !message || !subject) {
    res.status(400);
    throw new Error('All fields are required');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400);
    throw new Error('Invalid email');
  }

  try {
    await sendContactEmail({ 
        name, 
        email,
        message, 
        subject
     });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    res.status(500);
    throw new Error('Failed to send message, please try again');
  }

  res.status(200).json({ success: true, message: 'Message sent successfully' });
});

const unsubscribeEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(400);
    throw new Error('Missing unsubscribe token');
  }

  const subscriber = await EmailSub.findOneAndDelete({ unsubscribeToken: token });

  if (!subscriber) {
    res.status(404);
    throw new Error('Invalid or expired unsubscribe link');
  }

  res.redirect(`${process.env.FRONTEND_URL}/unsubscribed`);
});


export default{
    createEmailSub,
    getEmailSubByAdmin,
    submitContactForm,
    unsubscribeEmail
}