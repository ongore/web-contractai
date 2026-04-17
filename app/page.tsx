'use client';

import { useState } from 'react';

/* ─── Data ──────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const COMPANIES = [
  { name: 'Chromatools', icon: '⬛' },
  { name: 'Lightspeed', icon: '★' },
  { name: 'Boltshift', icon: '⚡' },
  { name: 'Convergence', icon: '✦' },
  { name: 'Globalink', icon: '◉' },
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI Contract Drafting',
    desc: 'Describe your contract in plain English. Our AI generates a professional, legally-sound draft in seconds — ready to review and send.',
    accent: '#3b82f6',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 013.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'E-Signatures',
    desc: 'Send contracts for signature with one click. Track status in real-time and get notified instantly when every party signs.',
    accent: '#8b5cf6',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Security & Compliance',
    desc: 'Bank-grade AES-256 encryption. SOC 2 Type II certified with complete audit trails for every action taken on every document.',
    accent: '#10b981',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Smart Templates',
    desc: 'Start from 50+ pre-built templates — NDAs, service agreements, employment contracts, SOWs, and more. Fully customisable.',
    accent: '#f59e0b',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Automated Reminders',
    desc: 'Never miss a deadline. Automatic reminders keep signers on track without manual follow-ups — configurable per contract.',
    accent: '#ec4899',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Analytics Dashboard',
    desc: 'Track contract velocity, signing rates, and time-to-close across your entire organisation with actionable insights.',
    accent: '#06b6d4',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Describe your contract',
    desc: 'Tell the AI what kind of contract you need — key terms, parties, special requirements. Plain language is all it takes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Review & customise',
    desc: 'The AI generates a complete draft instantly. Edit any clause, add custom fields, and tailor it exactly to your needs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Send & sign',
    desc: 'Send for signature with one click. All parties sign electronically from any device. Done in minutes, not days.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    quote: "ContractAI cut our contract review time by 70%. What used to take our legal team a full day now takes under an hour. It's become essential infrastructure.",
    name: 'Robert J.',
    role: 'UX / Motion Designer',
    company: 'Lattice',
    avatar: 'R',
    color: '#667eea',
  },
  {
    quote: 'The AI drafting is eerily accurate. It picked up nuances in our vendor agreements that even junior lawyers miss. We closed a $2M deal 3x faster than usual.',
    name: 'Sarah M.',
    role: 'VP of Operations',
    company: 'Boltshift',
    avatar: 'S',
    color: '#10b981',
  },
  {
    quote: "We manage 500+ contracts a month. ContractAI's automated reminders and analytics dashboard have given us visibility we never had before. Game-changer.",
    name: 'James K.',
    role: 'Chief Legal Officer',
    company: 'Globalink',
    avatar: 'J',
    color: '#f59e0b',
  },
];

const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for freelancers and individuals getting started with digital contracts.',
    features: [
      '5 contracts / month',
      '3 e-signature requests',
      'Basic AI drafting',
      '2 templates',
      'Email support',
    ],
    cta: 'Get started free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    desc: 'For growing teams that need full AI power and unlimited signatures.',
    features: [
      'Unlimited contracts',
      'Unlimited e-signatures',
      'Advanced AI drafting & review',
      '50+ templates',
      'Automated reminders',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per month',
    desc: 'For large organisations that need custom integrations, SLAs, and dedicated support.',
    features: [
      'Everything in Pro',
      'Custom integrations (Salesforce, HubSpot)',
      'SSO / SAML',
      'Custom contract templates',
      'Dedicated account manager',
      'SLA & uptime guarantee',
      'On-premise option',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

const FAQS = [
  {
    q: 'Is ContractAI legally binding?',
    a: 'Yes. ContractAI uses electronic signatures that comply with ESIGN Act (US), eIDAS (EU), and other major international e-signature laws. Every signed contract includes a full audit trail with timestamps, IP addresses, and identity verification.',
  },
  {
    q: 'How accurate is the AI contract drafting?',
    a: 'Our AI is trained on millions of legal documents and reviewed by legal professionals. It handles standard contract types (NDAs, service agreements, employment contracts, etc.) with high accuracy. We always recommend having critical high-value contracts reviewed by a licensed attorney.',
  },
  {
    q: 'Can I use my own templates?',
    a: 'Absolutely. You can upload your existing Word or PDF templates and the AI will fill them in intelligently. You can also build custom templates from scratch using our editor.',
  },
  {
    q: 'How does pricing work for the free plan?',
    a: 'The Starter plan is free forever — no credit card required. You get 5 contracts per month with basic AI drafting. Upgrade to Pro anytime to unlock unlimited contracts, advanced AI, and the full template library.',
  },
  {
    q: 'What integrations do you support?',
    a: 'ContractAI integrates with Salesforce, HubSpot, Slack, Google Drive, Dropbox, and Zapier on Pro and Enterprise plans. Enterprise customers can request custom integrations via our API.',
  },
  {
    q: 'How is my data secured?',
    a: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified and GDPR compliant. Your contracts are stored in isolated, redundant data centres. We never use your contract data to train our AI models.',
  },
];

const STATS = [
  { value: '10k+', label: 'Contracts signed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 30s', label: 'Avg. sign time' },
  { value: 'SOC 2', label: 'Type II certified' },
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ background: '#ffffff', fontFamily: 'var(--font-geist-sans), system-ui, sans-serif', color: '#111827' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-7px); }
        }
        .fade-up   { animation: fadeUp 0.55s ease both; }
        .fade-up-1 { animation: fadeUp 0.55s ease 0.10s both; }
        .fade-up-2 { animation: fadeUp 0.55s ease 0.20s both; }
        .fade-up-3 { animation: fadeUp 0.55s ease 0.30s both; }
        .card-a    { animation: floatCard 4s   ease-in-out 0.5s  infinite; }
        .card-b    { animation: floatCard 5s   ease-in-out 1.2s  infinite; }
        .card-c    { animation: floatCard 4.5s ease-in-out 2.0s  infinite; }
        .nav-a:hover { color: #111 !important; }
        .btn-dark:hover { background: #111 !important; }
        .btn-outline:hover { background: #f9fafb !important; }
        .feature-card:hover { border-color: #e5e7eb !important; box-shadow: 0 4px 24px rgba(0,0,0,0.06) !important; transform: translateY(-2px); }
        .feature-card { transition: border-color .2s, box-shadow .2s, transform .2s; }
        .faq-item { border-bottom: 1px solid #f3f4f6; }
        .faq-btn:hover { background: #f9fafb; }
        .testimonial-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.09) !important; transform: translateY(-2px); }
        .testimonial-card { transition: box-shadow .2s, transform .2s; }
        .plan-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.08) !important; }
        .plan-card { transition: box-shadow .2s; }
        .logo-item:hover { opacity: 1 !important; }
        a { cursor: pointer; }
      `}</style>

      {/* ━━━━ NAVBAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '30px', height: '30px', background: '#1a1a2e', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6M9 16h6M13 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-5-5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>ContractAI</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="nav-a" style={{
              fontSize: '13.5px', fontWeight: 500, color: '#6b7280',
              textDecoration: 'none', padding: '8px 14px', borderRadius: '8px',
              transition: 'color .15s',
            }}>{label}</a>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#" style={{ fontSize: '13.5px', fontWeight: 500, color: '#6b7280', textDecoration: 'none', padding: '8px 14px' }}>
            Log in
          </a>
          <a href="#pricing" className="btn-dark" style={{
            fontSize: '13.5px', fontWeight: 600, background: '#1a1a2e', color: '#fff',
            textDecoration: 'none', padding: '9px 20px', borderRadius: '99px',
            transition: 'background .15s',
          }}>Start Free Trial</a>
        </div>
      </nav>

      {/* ━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', minHeight: 'calc(100vh - 64px)' }}>

        {/* Left */}
        <div style={{
          padding: '72px 56px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderRight: '1px solid #f3f4f6',
        }}>
          <div>
            {/* Rating */}
            <div className="fade-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: '1px solid #e5e7eb', borderRadius: '99px', padding: '6px 16px 6px 8px',
              marginBottom: '36px',
            }}>
              <div style={{
                width: '28px', height: '28px', background: '#fef9c3', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
              }}>★</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', lineHeight: 1.2 }}>5.0 Rated</div>
                <div style={{ fontSize: '10.5px', color: '#9ca3af', lineHeight: 1.2 }}>Over 12.5K — Ratings on Hunt</div>
              </div>
            </div>

            {/* H1 */}
            <h1 className="fade-up-1" style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(48px, 5.5vw, 72px)', fontWeight: 800,
              lineHeight: 1.06, letterSpacing: '-0.025em', color: '#0a0a14',
              margin: '0 0 44px',
            }}>
              Contracts.<br />
              Simplified.<br />
              Secured. Signed.
            </h1>
          </div>

          {/* Testimonial */}
          <div className="fade-up-2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '22px', height: '22px', background: '#111', borderRadius: '5px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 10h16M4 14h8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>Lattice</span>
              </div>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>
                Read Story
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#374151', margin: '0 0 16px' }}>
              An AI-powered workspace that cut our contract review time by 70%. From first draft to final signature.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 700, color: '#fff',
              }}>R</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Robert J.</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>UX / Motion Designer</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="fade-up-3" style={{ display: 'flex', gap: '10px', marginTop: '44px' }}>
            <a href="#pricing" className="btn-dark" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#1a1a2e', color: '#fff', fontSize: '14px', fontWeight: 600,
              padding: '13px 28px', borderRadius: '99px', textDecoration: 'none',
              transition: 'background .15s',
            }}>Start Free Trial</a>
            <a href="#how-it-works" className="btn-outline" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: '1.5px solid #e5e7eb', color: '#374151',
              fontSize: '14px', fontWeight: 500, padding: '12px 24px', borderRadius: '99px',
              textDecoration: 'none', transition: 'background .15s',
            }}>See How It Works</a>
          </div>
        </div>

        {/* Right — Gradient visual */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(150deg, #7ecad8 0%, #5baed4 20%, #4a90d4 45%, #7a9fd4 65%, #b8a898 85%, #d4b896 100%)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.22) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(196,168,130,0.28) 0%, transparent 50%)', pointerEvents: 'none' }} />

          {/* NDA card */}
          <div className="card-a" style={{
            position: 'absolute', top: '40px', right: '36px',
            background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
            borderRadius: '16px', padding: '16px 20px', width: '265px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.13)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', background: '#f0fdf4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12h6M9 16h6M13 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-5-5z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>NDA Agreement</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>Signed 2m ago</div>
                </div>
              </div>
              <div style={{ width: '24px', height: '24px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div style={{ marginTop: '12px', height: '4px', background: '#dcfce7', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: '#22c55e', borderRadius: '99px' }} />
            </div>
          </div>

          {/* Contract card */}
          <div className="card-b" style={{
            position: 'absolute', top: '140px', left: '44px', right: '44px',
            background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
            borderRadius: '20px', padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.13)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '24px', background: '#1a1a2e', borderRadius: '6px' }} />
              <div style={{ display: 'flex', gap: '-4px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#f472b6' }} />
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#6366f1', marginLeft: '-8px' }} />
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>CONTRACT TYPE</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#111', letterSpacing: '-0.01em', marginBottom: '18px' }}>Service Level Agreement</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>VALUE</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>$142,500.00</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>DUE DATE</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>Oct 24, 2025</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9fafb', borderRadius: '12px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5"/><path d="M6 20v-2a6 6 0 0112 0v2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>Waiting for counterparty</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>Sent to legal@acme.inc</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>

          {/* Risk alert */}
          <div className="card-c" style={{
            position: 'absolute', bottom: '40px', left: '44px', right: '44px',
            background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
            borderRadius: '99px', padding: '14px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: '#fef9c3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 9v4M12 17h.01" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Indemnity Clause Risk</div>
                <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 500 }}>Review Suggested</div>
              </div>
            </div>
            <div style={{ width: '28px', height: '28px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ LOGOS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', marginRight: '24px' }}>
          Trusted by
        </span>
        {COMPANIES.map((c, i) => (
          <div key={i} className="logo-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, transition: 'opacity .15s', cursor: 'default' }}>
            <span style={{ fontSize: '16px' }}>{c.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#374151', letterSpacing: '-0.01em' }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* ━━━━ STATS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '80px 48px', background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '32px 16px', background: '#fff', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
              <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '40px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '8px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━ FEATURES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="features" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid #e5e7eb', borderRadius: '99px', padding: '4px 14px', marginBottom: '16px' }}>
              Features
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, color: '#0a0a14', margin: '0 0 16px', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              Everything you need to<br />close contracts faster
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
              From AI drafting to e-signatures, ContractAI handles the full contract lifecycle in one place.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{ border: '1px solid #f3f4f6', borderRadius: '18px', padding: '28px', background: '#fff', cursor: 'default' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${f.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.accent, marginBottom: '18px' }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '8px', letterSpacing: '-0.01em' }}>{f.title}</div>
                <div style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.75 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how-it-works" style={{ padding: '100px 48px', background: '#fafafa', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid #e5e7eb', borderRadius: '99px', padding: '4px 14px', marginBottom: '16px' }}>
              How it works
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, color: '#0a0a14', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
              Three steps to a signed contract
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '400px', margin: '0 auto', lineHeight: 1.75 }}>
              Go from idea to executed agreement in minutes — not days.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ position: 'relative', padding: '0 40px 0 0' }}>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: '28px', right: '0', width: '100%', height: '1px', background: 'linear-gradient(to right, #e5e7eb, transparent)', zIndex: 0 }} />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a2e', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      {step.icon}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#d1d5db', letterSpacing: '0.05em' }}>{step.num}</div>
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '10px', letterSpacing: '-0.01em' }}>{step.title}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.75 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ TESTIMONIALS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid #e5e7eb', borderRadius: '99px', padding: '4px 14px', marginBottom: '16px' }}>
              Customer stories
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, color: '#0a0a14', margin: 0, letterSpacing: '-0.025em' }}>
              Trusted by teams worldwide
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ border: '1px solid #f3f4f6', borderRadius: '20px', padding: '32px', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'default' }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, si) => <span key={si} style={{ fontSize: '14px', color: '#fbbf24' }}>★</span>)}
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: '#374151', margin: '0 0 24px', fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{t.name}</div>
                    <div style={{ fontSize: '11.5px', color: '#9ca3af' }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ PRICING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="pricing" style={{ padding: '100px 48px', background: '#fafafa', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid #e5e7eb', borderRadius: '99px', padding: '4px 14px', marginBottom: '16px' }}>
              Pricing
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, color: '#0a0a14', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 auto', maxWidth: '420px', lineHeight: 1.75 }}>
              Start free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
            {PLANS.map((plan, i) => (
              <div key={i} className="plan-card" style={{
                borderRadius: '22px', padding: '36px 32px',
                background: plan.highlight ? '#1a1a2e' : '#fff',
                border: plan.highlight ? 'none' : '1px solid #e5e7eb',
                boxShadow: plan.highlight ? '0 24px 64px rgba(26,26,46,0.25)' : '0 2px 12px rgba(0,0,0,0.04)',
                position: 'relative',
              }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 14px', borderRadius: '99px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: '13px', fontWeight: 700, color: plan.highlight ? 'rgba(255,255,255,0.5)' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '42px', fontWeight: 800, color: plan.highlight ? '#fff' : '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{plan.price}</span>
                  {plan.price !== 'Custom' && <span style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.45)' : '#9ca3af', fontWeight: 500 }}>/{plan.period}</span>}
                </div>
                <p style={{ fontSize: '13.5px', color: plan.highlight ? 'rgba(255,255,255,0.55)' : '#6b7280', lineHeight: 1.7, margin: '0 0 28px' }}>{plan.desc}</p>
                <a href="#" className={plan.highlight ? '' : 'btn-outline'} style={{
                  display: 'block', textAlign: 'center', padding: '12px 20px', borderRadius: '99px',
                  fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '28px',
                  background: plan.highlight ? '#fff' : 'transparent',
                  color: plan.highlight ? '#1a1a2e' : '#111',
                  border: plan.highlight ? 'none' : '1.5px solid #e5e7eb',
                  transition: 'background .15s',
                }}>{plan.cta}</a>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((feat, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: plan.highlight ? 'rgba(255,255,255,0.12)' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={plan.highlight ? '#fff' : '#22c55e'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#374151', lineHeight: 1.5 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="faq" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid #e5e7eb', borderRadius: '99px', padding: '4px 14px', marginBottom: '16px' }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#0a0a14', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
              Common questions
            </h2>
            <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>Everything you need to know about ContractAI.</p>
          </div>
          <div style={{ border: '1px solid #f3f4f6', borderRadius: '18px', overflow: 'hidden', background: '#fff' }}>
            {FAQS.map((item, i) => (
              <div key={i} className="faq-item" style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <button
                  className="faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '22px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    transition: 'background .15s', borderRadius: openFaq === i ? '0' : '0',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.5 }}>{item.q}</span>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', background: '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transition: 'transform .2s',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#374151" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 22px', fontSize: '14px', color: '#6b7280', lineHeight: 1.8 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: '#9ca3af' }}>
            Still have questions?{' '}
            <a href="mailto:sales@contractai.io" style={{ color: '#111', fontWeight: 600, textDecoration: 'none' }}>
              Contact our team →
            </a>
          </p>
        </div>
      </section>

      {/* ━━━━ CTA BANNER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '0 48px 100px' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{
            background: '#0a0a14',
            borderRadius: '28px', padding: '80px 60px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(91,174,212,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>
                Get started today
              </div>
              <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, color: '#fff', margin: '0 0 18px', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Start closing deals faster
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: '0 auto 40px', maxWidth: '420px', lineHeight: 1.75 }}>
                Join 10,000+ teams using ContractAI to draft, sign, and manage contracts in minutes. No credit card required.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <a href="#pricing" style={{
                  background: '#fff', color: '#111', fontSize: '14px', fontWeight: 700,
                  padding: '14px 32px', borderRadius: '99px', textDecoration: 'none',
                  transition: 'opacity .15s',
                }}>Start for free →</a>
                <a href="#features" style={{
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px', fontWeight: 500, padding: '14px 28px', borderRadius: '99px',
                  textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'background .15s',
                }}>View features</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer style={{ borderTop: '1px solid #f3f4f6', background: '#fafafa', padding: '64px 48px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Top row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '56px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '28px', background: '#1a1a2e', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 12h6M9 16h6M13 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-5-5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>ContractAI</span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.75, margin: '0 0 20px', maxWidth: '260px' }}>
                AI-powered contract management and e-signature platform. Draft, review, and sign in seconds.
              </p>
              <a href="mailto:sales@contractai.io" style={{ fontSize: '13px', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
                sales@contractai.io
              </a>
            </div>

            {/* Product */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Product</div>
              {['Features', 'Templates', 'Integrations', 'Security', 'Changelog'].map((l) => (
                <a key={l} href="#" style={{ display: 'block', fontSize: '13.5px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                >{l}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Company</div>
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map((l) => (
                <a key={l} href="#" style={{ display: 'block', fontSize: '13.5px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                >{l}</a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Legal</div>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map((l) => (
                <a key={l} href="#" style={{ display: 'block', fontSize: '13.5px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '12.5px', color: '#9ca3af' }}>
              © 2025 ContractAI, Inc. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
                <a key={s} href="#" style={{ fontSize: '12.5px', color: '#9ca3af', textDecoration: 'none', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
