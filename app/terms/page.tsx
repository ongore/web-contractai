import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use — Clerra',
  description:
    'The Terms of Use and End User License Agreement governing your use of Clerra on iOS, Android, and the web.',
};

const EFFECTIVE = 'April 23, 2026';
const COMPANY = 'Clerra';
const CONTACT_EMAIL = 'support@clerra.app';

export default function TermsPage() {
  return (
    <main className="legal">
      <div className="legal-inner">
        <nav className="legal-top">
          <Link href="/" className="legal-back">← Clerra</Link>
        </nav>

        <header className="legal-header">
          <p className="legal-kicker">Legal</p>
          <h1>Terms of Use</h1>
          <p className="legal-effective">Effective {EFFECTIVE}</p>
        </header>

        <Section title="1. Agreement">
          <p>
            These Terms of Use (“<b>Terms</b>”) form a binding agreement between you and {COMPANY}
            (“{COMPANY},” “we,” “us,” or “our”) and govern your access to and use of the Clerra
            mobile and web applications, websites, APIs, and related services (collectively, the
            “<b>Service</b>”). By creating an account, installing the app, or using the Service, you
            agree to these Terms and to our <Link href="/privacy">Privacy Policy</Link>. If you do
            not agree, do not use the Service.
          </p>
        </Section>

        <Section title="2. Eligibility and accounts">
          <p>
            You must be at least 13 years old (or the age of digital consent in your jurisdiction)
            to use the Service, and at least 18 to purchase a subscription. You are responsible for
            the accuracy of the information you provide, for safeguarding your credentials, and for
            all activity under your account.
          </p>
        </Section>

        <Section title="3. Your content">
          <p>
            The Service allows you to upload, draft, extract, sign, and store documents and data
            (your “<b>Content</b>”). You retain all rights in your Content. You grant {COMPANY} a
            worldwide, non-exclusive, royalty-free license to host, store, reproduce, process,
            transmit, and display your Content solely to operate, secure, and improve the Service
            for you. You represent that you have all rights necessary to upload your Content and
            that it does not infringe or violate any third-party rights or applicable law.
          </p>
        </Section>

        <Section title="4. AI features">
          <p>
            Clerra uses machine-learning models to extract fields, draft clauses, and summarize
            documents. AI output may be inaccurate, incomplete, or unsuitable for your situation.
            You are responsible for reviewing and verifying any AI-generated output before relying
            on it or signing any document. Clerra is not a law firm, does not provide legal advice,
            and use of the Service does not create an attorney-client relationship.
          </p>
        </Section>

        <Section title="5. E-signatures">
          <p>
            Electronic signatures collected through the Service are intended to be valid under the
            U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN), the Uniform
            Electronic Transactions Act (UETA), and (where applicable) the EU eIDAS Regulation. You
            consent to transact and sign electronically. Certain transactions (e.g., wills, certain
            family-law documents, court orders) cannot lawfully be signed electronically — do not
            use the Service for those.
          </p>
        </Section>

        <Section title="6. Subscriptions and billing">
          <p>
            Clerra Pro is offered as an auto-renewing subscription on a monthly or yearly basis.
            Pricing is shown in the app at the point of purchase in your local currency. Unless you
            cancel at least 24 hours before the end of the current period, your subscription will
            automatically renew at the then-current price, and your payment method will be charged.
            You can manage or cancel your subscription at any time:
          </p>
          <ul>
            <li>
              <b>iOS:</b> payment is charged to your Apple Account; manage or cancel in{' '}
              <i>Settings → [your name] → Subscriptions</i>.
            </li>
            <li>
              <b>Android:</b> payment is charged to your Google Play account; manage or cancel in
              the Play Store under <i>Subscriptions</i>.
            </li>
          </ul>
          <p>
            Except where required by law, subscription fees are non-refundable. Refund requests for
            App Store purchases must be submitted to Apple; for Google Play purchases, to Google.
          </p>
        </Section>

        <Section title="7. Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>use the Service to upload unlawful, infringing, or harmful content;</li>
            <li>attempt to reverse engineer, decompile, or probe the Service for vulnerabilities;</li>
            <li>interfere with the Service, bypass rate limits, or scrape data at scale;</li>
            <li>use the Service to build a competing product or train competing models;</li>
            <li>use the Service in violation of export controls or sanctions laws.</li>
          </ul>
        </Section>

        <Section title="8. Intellectual property">
          <p>
            The Service, including software, designs, trademarks, and all associated intellectual
            property, is owned by {COMPANY} or its licensors. We grant you a limited,
            non-exclusive, non-transferable, revocable license to use the Service for its intended
            purpose, subject to these Terms.
          </p>
        </Section>

        <Section title="9. Disclaimers">
          <p className="legal-caps">
            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE FULLEST EXTENT PERMITTED BY
            LAW, {COMPANY.toUpperCase()} DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
            WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT AI OUTPUT WILL BE
            ACCURATE.
          </p>
        </Section>

        <Section title="10. Limitation of liability">
          <p className="legal-caps">
            TO THE FULLEST EXTENT PERMITTED BY LAW, {COMPANY.toUpperCase()} AND ITS OFFICERS,
            DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA, OR
            GOODWILL. OUR TOTAL LIABILITY ARISING OUT OF OR RELATING TO THE SERVICE WILL NOT EXCEED
            THE GREATER OF (A) THE AMOUNTS YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM OR
            (B) USD $100.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>
            You may stop using the Service and delete your account at any time from within the app.
            We may suspend or terminate your access if you violate these Terms or if required by
            law. Sections that by their nature should survive (e.g., Content license for backups,
            disclaimers, limitation of liability, dispute resolution) will survive termination.
          </p>
        </Section>

        <Section title="12. Governing law and disputes">
          <p>
            These Terms are governed by the laws of the State of Delaware, excluding its
            conflict-of-laws rules. Any dispute will be resolved exclusively in the state or
            federal courts located in Delaware, and you consent to personal jurisdiction there,
            except where applicable consumer-protection law grants you non-waivable rights in your
            country of residence.
          </p>
        </Section>

        <Section title="13. Changes">
          <p>
            We may update these Terms from time to time. If changes are material, we will notify
            you in the app or by email. Continued use of the Service after the effective date of
            the updated Terms constitutes acceptance.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            Questions about these Terms? Email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <hr className="legal-rule" />

        <Section title="15. Apple App Store — Licensed Application End User License Agreement">
          <p>
            The following terms apply to you if you download the Clerra app from the Apple App
            Store. They are in addition to, and form part of, these Terms (the “<b>Apple EULA</b>”),
            and are required by Apple Inc. (“Apple”).
          </p>

          <h3>A. Acknowledgement</h3>
          <p>
            You and {COMPANY} acknowledge that these Terms are concluded between you and {COMPANY}
            only, and not with Apple. {COMPANY}, not Apple, is solely responsible for the Clerra app
            and its content. These Terms may not provide for usage rules for the Clerra app that
            are in conflict with the Apple Media Services Terms and Conditions as of the effective
            date hereof.
          </p>

          <h3>B. Scope of license</h3>
          <p>
            The license granted to you for the Clerra app is a limited, non-transferable license to
            use the Clerra app on any Apple-branded products that you own or control, and as
            permitted by the Usage Rules in the Apple Media Services Terms and Conditions, except
            that the Clerra app may also be accessed and used by other accounts associated with the
            purchaser via Family Sharing or volume purchasing.
          </p>

          <h3>C. Maintenance and support</h3>
          <p>
            {COMPANY} is solely responsible for providing any maintenance and support services with
            respect to the Clerra app, as specified in these Terms or as required under applicable
            law. You and {COMPANY} acknowledge that Apple has no obligation whatsoever to furnish
            any maintenance and support services with respect to the Clerra app.
          </p>

          <h3>D. Warranty</h3>
          <p>
            {COMPANY} is solely responsible for any product warranties, whether express or implied
            by law, to the extent not effectively disclaimed. In the event of any failure of the
            Clerra app to conform to any applicable warranty, you may notify Apple, and Apple will
            refund the purchase price (if any) for the Clerra app; and, to the maximum extent
            permitted by applicable law, Apple will have no other warranty obligation whatsoever
            with respect to the Clerra app. Any other claims, losses, liabilities, damages, costs,
            or expenses attributable to any failure to conform to any warranty will be {COMPANY}’s
            sole responsibility.
          </p>

          <h3>E. Product claims</h3>
          <p>
            You and {COMPANY} acknowledge that {COMPANY}, not Apple, is responsible for addressing
            any claims relating to the Clerra app or your possession and/or use of it, including,
            but not limited to: (i) product liability claims; (ii) any claim that the Clerra app
            fails to conform to any applicable legal or regulatory requirement; and (iii) claims
            arising under consumer-protection, privacy, or similar legislation, including in
            connection with any HealthKit- and HomeKit-equivalent functionality.
          </p>

          <h3>F. Intellectual property rights</h3>
          <p>
            You and {COMPANY} acknowledge that, in the event of any third-party claim that the
            Clerra app or your possession and use of the Clerra app infringes that third party’s
            intellectual property rights, {COMPANY}, not Apple, will be solely responsible for the
            investigation, defense, settlement, and discharge of any such intellectual property
            infringement claim.
          </p>

          <h3>G. Legal compliance</h3>
          <p>
            You represent and warrant that (i) you are not located in a country that is subject to
            a U.S. Government embargo, or that has been designated by the U.S. Government as a
            “terrorist supporting” country; and (ii) you are not listed on any U.S. Government list
            of prohibited or restricted parties.
          </p>

          <h3>H. Developer name and address</h3>
          <p>
            For any questions, complaints, or claims with respect to the Clerra app, contact{' '}
            {COMPANY} at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h3>I. Third-party terms of agreement</h3>
          <p>
            You must comply with applicable third-party terms of agreement when using the Clerra
            app (for example, your wireless data services agreement).
          </p>

          <h3>J. Third-party beneficiary</h3>
          <p>
            You and {COMPANY} acknowledge and agree that Apple, and Apple’s subsidiaries, are
            third-party beneficiaries of these Terms, and that, upon your acceptance of these
            Terms, Apple will have the right (and will be deemed to have accepted the right) to
            enforce these Terms against you as a third-party beneficiary thereof.
          </p>
        </Section>

        <footer className="legal-footer">
          <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          <p>
            <Link href="/">Home</Link> · <Link href="/privacy">Privacy</Link>
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
      .legal-caps {
        text-transform: uppercase;
        font-size: 12.5px !important;
        letter-spacing: 0.02em;
        line-height: 1.7;
      }
      .legal-rule {
        border: none;
        height: 1px;
        background: var(--border);
        margin: 56px 0 40px;
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
