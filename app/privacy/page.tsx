import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Clerra',
  description:
    'How Clerra collects, uses, stores, and protects your personal data across iOS, Android, and the web.',
};

const EFFECTIVE = 'April 23, 2026';
const COMPANY = 'Clerra';
const CONTACT_EMAIL = 'privacy@clerra.app';

export default function PrivacyPage() {
  return (
    <main className="legal">
      <div className="legal-inner">
        <nav className="legal-top">
          <Link href="/" className="legal-back">← Clerra</Link>
        </nav>

        <header className="legal-header">
          <p className="legal-kicker">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="legal-effective">Effective {EFFECTIVE}</p>
        </header>

        <Section title="Summary">
          <p>
            {COMPANY} is built around a simple idea: your contracts are yours. We only collect what
            we need to run the Service, we never sell your data, and we don’t use the content of
            your documents to train public AI models. This page explains the specifics.
          </p>
        </Section>

        <Section title="1. Who we are">
          <p>
            {COMPANY} (“{COMPANY},” “we,” “us,” or “our”) is the data controller for personal data
            processed through the Clerra mobile and web applications and related services (the
            “<b>Service</b>”). You can reach us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="2. Data we collect">
          <h3>Account data</h3>
          <p>
            Name, email address, password hash, and (if you sign in with Apple or Google) the
            identifier provided by that platform.
          </p>

          <h3>Content you upload</h3>
          <p>
            Documents, screenshots, pasted text, extracted contract fields, signatures, and any
            annotations you create (“<b>Content</b>”).
          </p>

          <h3>Subscription and purchase data</h3>
          <p>
            Subscription status, product identifier, renewal date, and anonymized receipt data. We
            do not receive or store your full payment card number. Payments are processed by Apple
            (App Store) or Google (Google Play), and we receive only the subscription status from
            them via our billing partner, RevenueCat.
          </p>

          <h3>Device and usage data</h3>
          <p>
            Device model, OS version, app version, language, coarse country (derived from IP),
            crash logs, performance metrics, and feature-usage events. IP addresses are truncated
            or hashed where feasible.
          </p>

          <h3>Support correspondence</h3>
          <p>
            Messages, screenshots, and contact details you share when you email us or use in-app
            support.
          </p>

          <p className="legal-note">
            We do not knowingly collect data from children under 13 (or the age of digital consent
            in your jurisdiction). If you believe a child has provided us data, contact us and we
            will delete it.
          </p>
        </Section>

        <Section title="3. How we use data">
          <ul>
            <li>to provide, secure, and operate the Service;</li>
            <li>to process subscriptions and honor refund and restore requests;</li>
            <li>to run AI extraction, drafting, and summarization on Content you submit;</li>
            <li>to diagnose crashes and improve performance;</li>
            <li>to prevent fraud, abuse, and violations of our Terms;</li>
            <li>to send service messages (e.g., receipts, security alerts); and</li>
            <li>to comply with legal obligations.</li>
          </ul>
          <p>
            <b>We do not sell your personal data.</b> We do not use the content of your contracts
            to train public, third-party, or cross-customer AI models.
          </p>
        </Section>

        <Section title="4. Legal bases (EEA / UK)">
          <ul>
            <li>
              <b>Contract:</b> to deliver the Service you signed up for.
            </li>
            <li>
              <b>Legitimate interests:</b> securing the Service, preventing abuse, measuring
              reliability.
            </li>
            <li>
              <b>Consent:</b> where required (e.g., certain analytics or marketing). You may
              withdraw consent at any time.
            </li>
            <li>
              <b>Legal obligation:</b> tax, accounting, and lawful-request compliance.
            </li>
          </ul>
        </Section>

        <Section title="5. AI processing">
          <p>
            Content you submit is sent to model providers (including OpenAI and Anthropic) strictly
            to generate your result. We use enterprise endpoints that contractually prohibit using
            your data to train their general-purpose models. Inference logs may be retained by
            providers for a short abuse-monitoring window in accordance with their agreements with
            us.
          </p>
        </Section>

        <Section title="6. Sharing and sub-processors">
          <p>We share data only with vetted service providers that process it on our behalf:</p>
          <ul>
            <li><b>Hosting & infrastructure:</b> Amazon Web Services, Cloudflare.</li>
            <li><b>Database & storage:</b> Supabase / Postgres, encrypted object storage.</li>
            <li><b>AI inference:</b> OpenAI, Anthropic (enterprise endpoints).</li>
            <li><b>Subscription management:</b> RevenueCat, Apple, Google.</li>
            <li><b>Crash & analytics:</b> Sentry, PostHog (privacy-preserving configuration).</li>
            <li><b>Email:</b> Resend / Postmark.</li>
          </ul>
          <p>
            We may also disclose data if required by law, to enforce our Terms, or to protect the
            rights, property, or safety of {COMPANY}, our users, or the public.
          </p>
        </Section>

        <Section title="7. International transfers">
          <p>
            Our infrastructure is primarily hosted in the United States. Where we transfer personal
            data from the EEA, UK, or Switzerland to jurisdictions without an adequacy decision, we
            rely on the European Commission’s Standard Contractual Clauses and equivalent
            safeguards.
          </p>
        </Section>

        <Section title="8. Retention">
          <p>
            We retain your account and Content while your account is active. When you delete your
            account, we delete or irreversibly anonymize your Content within 30 days, except data
            we must retain for legal, tax, fraud-prevention, or backup-rotation purposes (typically
            up to 12 months).
          </p>
        </Section>

        <Section title="9. Your rights">
          <p>Depending on where you live, you may have the right to:</p>
          <ul>
            <li>access, correct, or delete your personal data;</li>
            <li>object to or restrict certain processing;</li>
            <li>port your data to another provider;</li>
            <li>withdraw consent where processing is based on consent;</li>
            <li>lodge a complaint with your local data-protection authority.</li>
          </ul>
          <p>
            To exercise these rights, use the in-app controls (<i>Settings → Account</i>) or email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We respond within 30 days.
          </p>

          <h3>California residents (CCPA/CPRA)</h3>
          <p>
            California residents have the rights to know, delete, correct, and limit the use of
            sensitive personal information, and to opt out of the “sale” or “sharing” of personal
            information. We do not sell or share personal information as those terms are defined
            under the CCPA/CPRA.
          </p>
        </Section>

        <Section title="10. Security">
          <p>
            Data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access to production
            systems is limited, logged, and protected by multi-factor authentication. No system is
            perfectly secure — if you believe your account has been compromised, contact us
            immediately.
          </p>
        </Section>

        <Section title="11. Tracking and advertising">
          <p>
            Clerra does not use third-party advertising SDKs and does not track you across
            unrelated apps or websites for advertising purposes. On iOS, we do not request App
            Tracking Transparency permission because we do not engage in cross-app tracking.
          </p>
        </Section>

        <Section title="12. Children">
          <p>
            The Service is not directed to children under 13 (or the age of digital consent in your
            jurisdiction), and we do not knowingly collect personal information from them.
          </p>
        </Section>

        <Section title="13. Changes to this policy">
          <p>
            We may update this policy. If changes are material, we will notify you in the app or by
            email. The “Effective” date at the top always reflects the current version.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            Questions or privacy requests:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <footer className="legal-footer">
          <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          <p>
            <Link href="/">Home</Link> · <Link href="/terms">Terms</Link>
          </p>
        </footer>
      </div>

      <LegalStyles />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function LegalStyles() {
  return (
    <style>{`
      .legal {
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        padding: 48px 20px 96px;
      }
      .legal-inner {
        max-width: 760px;
        margin: 0 auto;
      }
      .legal-top { margin-bottom: 40px; }
      .legal-back {
        display: inline-flex; align-items: center;
        color: var(--text2);
        font-size: 14px; font-weight: 500;
        text-decoration: none;
        transition: color .15s ease;
      }
      .legal-back:hover { color: var(--accent); }

      .legal-header { margin-bottom: 48px; }
      .legal-kicker {
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 12px;
        font-weight: 600;
        color: var(--accent);
        margin-bottom: 10px;
      }
      .legal-header h1 {
        font-family: var(--serif);
        font-size: clamp(40px, 6vw, 64px);
        line-height: 1.02;
        letter-spacing: -0.02em;
        margin-bottom: 12px;
      }
      .legal-effective {
        color: var(--text2);
        font-size: 14px;
      }

      .legal-section { margin-bottom: 36px; }
      .legal-section h2 {
        font-family: var(--serif);
        font-size: 24px;
        letter-spacing: -0.01em;
        margin-bottom: 12px;
        color: var(--text);
      }
      .legal-section h3 {
        font-size: 15px;
        font-weight: 700;
        margin: 20px 0 8px;
        color: var(--text);
      }
      .legal-section p, .legal-section li {
        color: var(--text2);
        font-size: 15.5px;
        line-height: 1.7;
      }
      .legal-section p + p { margin-top: 12px; }
      .legal-section ul {
        margin: 10px 0 10px 22px;
      }
      .legal-section ul li { margin-bottom: 6px; }
      .legal-section a {
        color: var(--accent);
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
      }
      .legal-note {
        margin-top: 12px;
        padding: 12px 14px;
        background: var(--bg2);
        border: 1px solid var(--border);
        border-radius: var(--r);
        font-size: 14px !important;
      }
      .legal-footer {
        margin-top: 64px;
        padding-top: 24px;
        border-top: 1px solid var(--border);
        color: var(--text3);
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .legal-footer a {
        color: var(--text2);
        text-decoration: none;
      }
      .legal-footer a:hover { color: var(--accent); }
    `}</style>
  );
}
