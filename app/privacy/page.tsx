import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy notice — Zuzanna Sobecka',
  description: 'How personal data submitted through this portfolio contact form is handled.',
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page section-shell">
      <header>
        <p className="eyebrow-label">Privacy // contact form</p>
        <h1>Privacy notice</h1>
        <p>Last updated: 4 September 2026</p>
      </header>

      <div className="privacy-content">
        <section>
          <h2>Who is responsible</h2>
          <p>Zuzanna Sobecka, Warsaw, Poland, is the controller of personal data submitted through this portfolio. For a privacy request, use the <Link href="/#contact">contact form</Link> and begin your message with “Privacy request”.</p>
        </section>

        <section>
          <h2>What I collect and why</h2>
          <p>The form collects your name, email address, message and submission time. I use this information only to receive, assess and respond to your enquiry. Processing is necessary to take steps at your request before a possible contract, where applicable, or is based on my legitimate interest in responding to professional enquiries.</p>
        </section>

        <section>
          <h2>Services and recipients</h2>
          <p>Cloudflare hosts the site and stores form submissions in a private D1 database. Resend delivers each submission to my private inbox. My email provider then processes the delivered message. These providers may process data outside the European Economic Area under the safeguards described in their applicable data-processing terms.</p>
        </section>

        <section>
          <h2>How long I keep it</h2>
          <p>Submissions are deleted automatically from D1 after 90 days. A copy delivered to my inbox is kept only as long as needed to handle the enquiry or establish, exercise or defend legal claims.</p>
        </section>

        <section>
          <h2>Your choices and rights</h2>
          <p>Providing the information is voluntary, but without your contact details I cannot reply. Depending on the circumstances, you may request access, correction, deletion, restriction or portability of your data, or object to processing based on legitimate interests. You may also lodge a complaint with the Polish Personal Data Protection Office (UODO). No automated decision-making or profiling is used.</p>
        </section>
      </div>

      <Link className="button button-primary" href="/#contact">Return to the contact form</Link>
    </main>
  );
}
