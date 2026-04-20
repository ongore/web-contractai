'use client';

import { useState, useEffect } from 'react';

const PROOF_ITEMS = [
  'Freelancers', 'Design Studios', 'Solo Founders', 'Consultants',
  'Agencies', 'Content Creators', 'Operators', 'Contractors', 'Small Businesses',
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 6l7-3 7 3v8l-7 3-7-3V6z" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 3v14M3 6l7 3 7-3" stroke="var(--accent)" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Any input format',
    desc: 'Screenshots, PDFs, pasted text, invoices, email threads. Clerra reads them all and extracts what matters.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.39 5.26L18 8.27l-4 3.9.94 5.49L10 15l-4.94 2.66.94-5.49-4-3.9 5.61-.01L10 2z" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI-drafted in seconds',
    desc: 'Scope, payment, IP, termination — every clause drafted automatically. No legal background needed.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15 7H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M7 7V5a3 3 0 016 0v2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'In-app e-signing',
    desc: 'Sign with a tap. Your signature is cryptographically timestamped and legally binding.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12v10H4z" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 14l2 2h12l2-2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 10h4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Web link for clients',
    desc: "Your client gets a clean link — they review and sign in their browser. No account, no app download.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Real-time tracking',
    desc: 'Know the moment your contract is opened, viewed, and signed. Automated reminders handle follow-ups.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="5" width="14" height="12" rx="2" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M7 5V4a3 3 0 016 0v1" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 11v2M9 11h2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Contract history',
    desc: 'Every agreement archived and searchable. Export as PDF any time. Built-in audit trail.',
  },
];

const TESTIMONIALS = [
  {
    quote: "I sent a screenshot of a DM thread and had a signed contract in under two minutes. This is exactly what I've been waiting for.",
    name: 'Jamie L.',
    role: 'Freelance Brand Designer',
    initials: 'JL',
    color: 'oklch(55% 0.15 280)',
  },
  {
    quote: "As a solo founder closing service deals constantly, Clerra replaced a whole workflow. It just works — no lawyer needed for the small stuff.",
    name: 'Marcus R.',
    role: 'Founder, Coastal Growth',
    initials: 'MR',
    color: 'oklch(58% 0.14 30)',
  },
  {
    quote: "I do 20+ client agreements a month. Clerra makes me look like I have a whole legal team behind me. The speed is unreal.",
    name: 'Tara S.',
    role: 'Video Producer & Creator',
    initials: 'TS',
    color: 'oklch(58% 0.14 150)',
  },
];

const WHO = [
  { emoji: '🎨', title: 'Freelancers', sub: 'Designers, writers, devs' },
  { emoji: '📹', title: 'Creators', sub: 'Sponsorships & collabs' },
  { emoji: '🚀', title: 'Founders', sub: 'Service & vendor deals' },
  { emoji: '🏢', title: 'Small businesses', sub: 'Client & supplier agreements' },
  { emoji: '💼', title: 'Consultants', sub: 'Retainers & project scopes' },
  { emoji: '⚡', title: 'Operators', sub: 'Fast-moving deals' },
];

const STATS = [
  { num: '8', suffix: 's', label: 'Average contract generation time' },
  { num: '0', suffix: '', label: 'Blank templates to fill out' },
  { num: '100', suffix: '%', label: 'Mobile-native from day one' },
];

const FAQS = [
  { q: 'Do I need a lawyer to use Clerra?', a: "No. Clerra is designed for everyday business agreements — freelance projects, service contracts, NDAs, retainers. For high-stakes deals, we always recommend legal counsel, but for the vast majority of small business agreements, Clerra handles it." },
  { q: 'What inputs does Clerra accept?', a: "Screenshots, PDFs, invoices, pasted text, email threads, and direct text input. If you can describe a deal, Clerra can draft a contract for it. We're adding voice input soon." },
  { q: 'Are the contracts legally binding?', a: 'Yes. E-signatures created through Clerra are legally binding under the ESIGN Act (US) and eIDAS (EU). Each signature includes a cryptographic timestamp and audit trail.' },
  { q: "Does my client need a Clerra account?", a: "No. You send them a link. They open it in any browser, review the contract, and sign. No account, no app download, no friction on their end." },
  { q: "Is it really mobile-first?", a: "Completely. Clerra is built for your phone — upload a screenshot directly from your camera roll, sign with your finger, and send a link, all without opening a laptop." },
  { q: "What does it cost?", a: "We're working with early access users on pricing. The first 500 people on the waitlist get free unlimited contracts at launch. Join now to lock that in." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [curStep, setCurStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurStep(s => s < 3 ? s + 1 : 1);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach((el, i) =>
        setTimeout(() => el.classList.add('visible'), i * 90)
      );
    }, 80);
    return () => obs.disconnect();
  }, []);

  function handleSignup() {
    if (!email || !email.includes('@')) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 800);
      return;
    }
    setSubmitted(true);
  }

  const doubled = [...PROOF_ITEMS, ...PROOF_ITEMS];

  return (
    <>
      {/* NAV */}
      <nav className="clerra-nav">
        <a href="#" className="nav-logo">
          <img src="/clerra-logo.png" alt="Clerra" style={{ height: 36, width: 'auto' }} />
        </a>
        <ul className="nav-links-list">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#who">For who</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div className="nav-right">
          <a href="#" className="nav-login">Log in</a>
          <a href="#cta" className="nav-cta">Join waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ paddingTop: 64 }} className="hero-outer">
        <div className="hero">
          <h1 className="reveal d1">
            From screenshot<br />to <em>signed contract.</em>
          </h1>
          <p className="hero-sub reveal d2">
            Paste a message thread, drop a screenshot, upload an invoice. Clerra turns your real-world inputs into polished, ready-to-sign contracts — in seconds.
          </p>
          <div className="hero-actions reveal d3">
            <a href="#cta" className="btn-dark">
              Join the waitlist
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#how" className="btn-outline">See how it works</a>
          </div>
          <p className="hero-fine reveal d4">No credit card. Free to start.</p>

          {/* Product mockup */}
          <div className="hero-visual reveal d4">
            <div className="hero-visual-card">
              <div className="window-bar">
                <div className="window-dots">
                  <div className="window-dot dot-red" />
                  <div className="window-dot dot-yellow" />
                  <div className="window-dot dot-green" />
                </div>
                <div className="window-title">Clerra — New Contract</div>
                <div style={{ width: 60 }} />
              </div>
              <div className="app-shell">
                <div className="app-sidebar">
                  <div className="sidebar-header">
                    <img src="/clerra-logo.png" alt="Clerra" style={{ height: 22, width: 'auto' }} />
                  </div>
                  <div className="sidebar-menu">
                    <div className="sidebar-item active">
                      <span className="sidebar-item-dot" />New contract
                    </div>
                    <div className="sidebar-item">
                      <span className="sidebar-item-dot" style={{ background: 'var(--border2)' }} />All contracts
                    </div>
                    <div className="sidebar-item">
                      <span className="sidebar-item-dot" style={{ background: 'var(--border2)' }} />Templates
                    </div>
                  </div>
                  <div className="sidebar-section">Recent</div>
                  <div className="sidebar-contract-item"><span className="sct-dot" /> Design SoW — Acme</div>
                  <div className="sidebar-contract-item"><span className="sct-dot sct-dot-pending" /> NDA — Pending</div>
                  <div className="sidebar-contract-item"><span className="sct-dot" /> Retainer — May</div>
                  <div className="sidebar-contract-item"><span className="sct-dot" /> Freelance Dev</div>
                </div>
                <div className="app-main">
                  <div className="app-main-header">
                    <div>
                      <div className="app-greeting">New contract</div>
                      <div className="app-sub">Drop in your inputs and we&apos;ll handle the rest</div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>✦ AI ready</div>
                  </div>
                  <div className="app-upload-zone">
                    <div className="upload-icon-wrap">📎</div>
                    <div className="upload-heading">Drop anything here</div>
                    <div className="upload-caption">Screenshots · Invoices · Emails · Pasted text</div>
                  </div>
                  <div className="input-items">
                    <div className="input-item">
                      <div className="ii-icon" style={{ background: 'oklch(93% 0.05 280)' }}>🖼</div>
                      <div className="ii-text">
                        <div className="ii-name">project_brief_screenshot.png</div>
                        <div className="ii-meta">Screenshot · 2.1 MB</div>
                      </div>
                      <div className="ii-check">✓</div>
                    </div>
                    <div className="input-item">
                      <div className="ii-icon" style={{ background: 'oklch(94% 0.04 40)' }}>📄</div>
                      <div className="ii-text">
                        <div className="ii-name">Pasted conversation · 320 chars</div>
                        <div className="ii-meta">Text input · detected $4,500 deal</div>
                      </div>
                      <div className="ii-check">✓</div>
                    </div>
                  </div>
                  <button className="app-generate-btn">
                    ✦ Generate contract
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="annotation ann-1">
              <span className="annotation-dot" />
              Contract drafted in 8 seconds
            </div>
            <div className="annotation ann-2" style={{ ['--accent' as string]: 'oklch(58% 0.14 70)' }}>
              <span className="annotation-dot" style={{ background: 'oklch(58% 0.14 70)' }} />
              Signed &amp; tracked instantly
            </div>
          </div>
        </div>
      </div>

      {/* PROOF STRIP */}
      <div className="proof-strip">
        <span className="proof-label">Built for</span>
        <div className="proof-track-wrap">
          <div className="proof-track">
            {doubled.map((item, i) => (
              <span key={i} className="proof-item">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section-wrap how-wrap" id="how">
        <div className="section-inner">
          <div className="how-grid">
            <div>
              <p className="section-eyebrow reveal">How it works</p>
              <h2 className="section-h reveal d1">No blank page.<br />No back-and-forth.</h2>
              <div className="how-steps">
                {[
                  { n: '01', title: 'Drop in your inputs', desc: 'Paste a message thread, drop a screenshot, or upload an invoice. Any format, any source — Clerra reads them all.' },
                  { n: '02', title: 'Clerra structures it', desc: 'Our AI extracts parties, payment terms, deliverables, and timelines — then drafts a complete, legally structured contract.' },
                  { n: '03', title: 'Sign and send', desc: 'Sign in-app with a tap. Send a web link. Track their signature in real time. No PDF loops, no fax machine.' },
                ].map((step, i) => (
                  <div
                    key={i}
                    className={`how-step reveal${i > 0 ? ` d${i}` : ''}${curStep === i + 1 ? ' active' : ''}`}
                    onClick={() => setCurStep(i + 1)}
                  >
                    <div className="step-n">{step.n}</div>
                    <div>
                      <div className="step-t">{step.title}</div>
                      <div className="step-d">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="how-visual-panel">
              {/* Vis 1 */}
              <div className={`how-vis${curStep !== 1 ? ' hidden' : ''}`}>
                <div className="v1-drop">
                  <div className="v1-drop-icon">📎</div>
                  <div className="v1-drop-t">Drop anything here</div>
                  <div className="v1-drop-s">Screenshots · Invoices · Emails · Text</div>
                </div>
                {[
                  { icon: '🖼', bg: 'oklch(93% 0.05 280)', name: 'project_brief.png', meta: 'Screenshot · 2.1 MB' },
                  { icon: '📄', bg: 'oklch(94% 0.04 40)', name: 'invoice_draft.pdf', meta: 'PDF · 456 KB' },
                  { icon: '💬', bg: 'oklch(92% 0.06 165)', name: 'Pasted conversation', meta: 'Text · 320 chars' },
                ].map((item, i) => (
                  <div key={i} className="v1-item">
                    <div className="v1-icon" style={{ background: item.bg }}>{item.icon}</div>
                    <div>
                      <div className="v1-name">{item.name}</div>
                      <div className="v1-meta">{item.meta}</div>
                    </div>
                    <div className="v1-check">✓</div>
                  </div>
                ))}
              </div>

              {/* Vis 2 */}
              <div className={`how-vis${curStep !== 2 ? ' hidden' : ''}`}>
                <div className="v2-card">
                  <div className="v2-head">
                    <div className="v2-ai-badge">✦</div>
                    <div>
                      <div className="v2-ai-label">Clerra AI</div>
                      <div className="v2-ai-sub">Extracting contract terms</div>
                    </div>
                  </div>
                  {[
                    { label: 'Party A', value: 'Jamie Lee', accent: true },
                    { label: 'Party B', value: 'Acme Corp', accent: true },
                    { label: 'Value', value: '$4,500.00', accent: false },
                    { label: 'Timeline', value: '6 weeks', accent: false },
                    { label: 'Payment', value: '50% / 50%', accent: false },
                  ].map((f, i) => (
                    <div key={i} className="v2-field">
                      <span className="v2-fl">{f.label}</span>
                      <span className={`v2-fv${f.accent ? ' v2-fv-accent' : ''}`}>{f.value}</span>
                    </div>
                  ))}
                </div>
                <div className="v2-prog-wrap">
                  <div className="v2-prog-head">
                    <span>Drafting clauses...</span>
                    <span className="v2-prog-pct">82%</span>
                  </div>
                  <div className="v2-bar"><div className="v2-fill" /></div>
                </div>
              </div>

              {/* Vis 3 */}
              <div className={`how-vis${curStep !== 3 ? ' hidden' : ''}`}>
                <div className="v3-doc">
                  <div className="cp-badge">✓ Ready to sign</div>
                  <div className="v3-doc-title">Freelance Services Agreement</div>
                  <div className="v3-line" /><div className="v3-line" />
                  <div className="v3-line" /><div className="v3-line" />
                  <div className="v3-sig">
                    <span className="v3-sig-name">Jamie Lee</span>
                    <span className="v3-signed-badge">Signed</span>
                  </div>
                </div>
                <div className="v3-send-row">
                  <div className="v3-send-input">clerra.app/c/8xF2k9mQ</div>
                  <div className="v3-send-btn">Send to client →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-wrap" id="features">
        <div className="section-inner">
          <div style={{ maxWidth: 640 }}>
            <p className="section-eyebrow reveal">Features</p>
            <h2 className="section-h reveal d1">Built for speed.<br /><em>Built for trust.</em></h2>
            <p className="section-p reveal d2">Everything you need to go from conversation to executed agreement — without the friction of templates, email loops, or PDF attachments.</p>
          </div>
          <div className="feats-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`feat reveal${i % 3 !== 0 ? ` d${i % 3}` : ''}`}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-t">{f.title}</div>
                <div className="feat-d">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRACT PREVIEW */}
      <section className="section-wrap preview-wrap">
        <div className="section-inner">
          <div className="preview-grid">
            <div>
              <p className="section-eyebrow reveal">The output</p>
              <h2 className="section-h reveal d1">A real contract.<br /><em>Not a rough draft.</em></h2>
              <p className="section-p reveal d2" style={{ marginBottom: 32 }}>
                Clerra generates complete, structured agreements — not just boilerplate. Every clause is tailored to what you actually input.
              </p>
              <div className="preview-bullets reveal d3">
                {[
                  ['Parties, scope, and payment terms', 'extracted and correctly placed'],
                  ['IP, confidentiality, and termination', 'clauses included automatically'],
                  ['Editable before signing', '— adjust any clause before you send'],
                  ['PDF export', 'any time, with full audit trail'],
                ].map(([strong, rest], i) => (
                  <div key={i} className="preview-bullet">
                    <div className="bullet-check">✓</div>
                    <div className="bullet-text"><strong>{strong}</strong> {rest}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contract-paper reveal d2">
              <div className="cp-header">
                <div className="cp-kicker">Clerra</div>
                <div className="cp-title">Freelance Services Agreement</div>
              </div>
              <div className="cp-parties">
                <div className="cp-party">
                  <div className="cp-party-label">Client</div>
                  <div className="cp-party-name">Acme Corp</div>
                </div>
                <div className="cp-party">
                  <div className="cp-party-label">Contractor</div>
                  <div className="cp-party-name">Jamie Lee</div>
                </div>
              </div>
              {['1. Scope of Work', '2. Payment Terms', '3. Intellectual Property'].map((label, i) => (
                <div key={i} className="cp-section">
                  <div className="cp-section-label">{label}</div>
                  <div className="cp-line" /><div className="cp-line" />
                  {i === 0 && <div className="cp-line" style={{ width: '60%' }} />}
                </div>
              ))}
              <div className="cp-sigs">
                <div>
                  <div className="cp-sig-label">Contractor</div>
                  <div className="cp-sig-name">Jamie Lee</div>
                  <div className="cp-sig-line" />
                  <div className="cp-sig-date">Signed Apr 19, 2026</div>
                </div>
                <div>
                  <div className="cp-sig-label">Client</div>
                  <div className="cp-sig-pending">
                    <span className="cp-sig-pending-text">Awaiting signature...</span>
                  </div>
                  <div className="cp-sig-line" />
                  <div className="cp-sig-date" style={{ color: 'var(--accent)' }}>Link sent · viewed 2 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-wrap" id="social">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <p className="section-eyebrow reveal">Early users</p>
            <h2 className="section-h reveal d1" style={{ maxWidth: 'none' }}>What they&apos;re saying</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testi reveal${i > 0 ? ` d${i}` : ''}`}>
                <div className="testi-stars">
                  {[...Array(5)].map((_, si) => <span key={si} className="star">★</span>)}
                </div>
                <div className="testi-q">&ldquo;{t.quote}&rdquo;</div>
                <div className="testi-author">
                  <div className="testi-av" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="section-wrap" id="who" style={{ background: 'var(--bg2)' }}>
        <div className="section-inner">
          <p className="section-eyebrow reveal">Made for</p>
          <h2 className="section-h reveal d1">Anyone who needs<br />agreements done <em>now.</em></h2>
          <div className="who-grid reveal d2">
            {WHO.map((w, i) => (
              <div key={i} className="who-pill">
                <span className="who-emoji">{w.emoji}</span>
                <div>
                  <div className="who-t">{w.title}</div>
                  <div className="who-s">{w.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="stat-grid">
            {STATS.map((s, i) => (
              <div key={i} className={`stat-card reveal${i > 0 ? ` d${i}` : ''}`}>
                <div className="stat-n"><span>{s.num}</span>{s.suffix}</div>
                <div className="stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-wrap faq-wrap" id="faq">
        <div className="section-inner">
          <div className="faq-grid">
            <div>
              <p className="section-eyebrow reveal">FAQ</p>
              <h2 className="section-h reveal d1">Questions,<br /><em>answered.</em></h2>
              <p className="section-p reveal d2">Still not sure? Reach out at hello@clerra.app and we&apos;ll get back to you same day.</p>
            </div>
            <div className="faq-list reveal d1">
              {FAQS.map((item, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {item.q}
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="clerra-footer">
        <a href="#" className="footer-logo">
          <img src="/clerra-logo.png" alt="Clerra" style={{ height: 32, width: 'auto' }} />
        </a>
        <ul className="footer-links-list">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <p className="footer-copy">© 2026 Clerra, Inc.</p>
      </footer>
    </>
  );
}
