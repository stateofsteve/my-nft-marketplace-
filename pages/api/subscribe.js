import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  // Get the email from the request
  const { email } = req.body;
  
  // Basic email validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  
  try {
    // Send you an email notification
    const emailResult = await resend.emails.send({
      from: 'Appaloosa Dreams <onboarding@resend.dev>',
      to: ['m7372llc@gmail.com'], // Your email for notifications
      subject: '🐎 New Appaloosa Dreams Subscriber!',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #8B4513;">🐎 Someone Just Joined The Herd!</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>New Subscriber:</strong> ${email}</p>
            <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Website:</strong> appaloosadreams.com</p>
          </div>
          
          <p style="color: #666;">This notification was sent from your Appaloosa Dreams website when someone subscribed to your email list.</p>
        </div>
      `
    });

    console.log('📧 Email notification sent:', emailResult);
    console.log('🐎 New subscriber:', email);
    
    // Send success response
    res.status(200).json({ 
      message: 'Successfully subscribed to The Herd!',
      email: email
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}