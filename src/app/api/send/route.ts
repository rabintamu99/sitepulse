import { EmailTemplate } from '@/components/email/email';
import { Resend } from 'resend';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(req, res) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['g.rabin@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}