import Link from 'next/link';

export default function ContactErrorPage() {
  return (
    <main className="thanks-page">
      <p className="eyebrow-label">Delivery interrupted</p>
      <h1>Please try again.</h1>
      <p>Your message could not be delivered to my inbox. Please try again, or contact me through LinkedIn.</p>
      <Link className="button button-primary" href="/#contact">Return to the form</Link>
    </main>
  );
}
