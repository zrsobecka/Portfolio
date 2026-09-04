import Link from 'next/link';

export default function ContactErrorPage() {
  return (
    <main className="thanks-page">
      <p className="eyebrow-label">Message not saved</p>
      <h1>Please try again.</h1>
      <p>Something interrupted the form submission. Your message was not stored.</p>
      <Link className="button button-primary" href="/#contact">Return to the form</Link>
    </main>
  );
}
