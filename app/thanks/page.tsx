import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <p className="eyebrow-label">Message received</p>
      <h1>Thank you. I’ll get back to you.</h1>
      <p>Your message was sent without exposing my private email address.</p>
      <Link className="button button-primary" href="/">Return to portfolio</Link>
    </main>
  );
}
