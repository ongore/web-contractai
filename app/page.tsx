const contracts = [
  { title: 'Service Agreement', party: 'Acme Corp', status: 'Pending', color: '#f59e0b' },
  { title: 'NDA — Q2 2025', party: 'TechStart Inc', status: 'Signed', color: '#10b981' },
  { title: 'Freelance Contract', party: 'Design Studio', status: 'Signed', color: '#10b981' },
];

const features = [
  {
    icon: '⚡',
    title: 'AI Contract Drafting',
    desc: 'Describe your contract in plain English. Our AI generates a professional, legally-sound draft in seconds.',
    color: '#4f6ef7',
  },
  {
    icon: '✍️',
    title: 'E-Signatures',
    desc: 'Send contracts for signature with one click. Track status in real-time and get notified instantly when signed.',
    color: '#7c3aed',
  },
  {
    icon: '🔒',
    title: 'Security & Compliance',
    desc: 'Bank-grade AES-256 encryption. SOC2 Type II compliant with full audit trails for every action.',
    color: '#10b981',
  },
  {
    icon: '📋',
    title: 'Smart Templates',
    desc: 'Start from 50+ pre-built templates — NDAs, service agreements, employment contracts, and more.',
    color: '#f59e0b',
  },
  {
    icon: '🔔',
    title: 'Automated Reminders',
    desc: 'Never miss a deadline. Automatic reminders keep signers on track without manual follow-ups.',
    color: '#ec4899',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Track contract velocity, signing rates, and time-to-close across your entire organisation.',
    color: '#06b6d4',
  },
];

const steps = [
  {
    step: '01',
    title: 'Describe your contract',
    desc: 'Tell the AI what kind of contract you need. Include key terms, parties, and any special requirements.',
  },
  {
    step: '02',
    title: 'Review & customise',
    desc: 'The AI generates a complete draft. Edit clauses, add fields, and tailor it to your exact needs.',
  },
  {
    step: '03',
    title: 'Send & sign',
    desc: 'Send for signature with one click. Both parties sign electronically. Done in minutes, not days.',
  },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060b18',
        color: '#f8fafc',
        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* Background ambient glows */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '600px',
            background:
              'radial-gradient(ellipse at center, rgba(79,110,247,0.14) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '-5%',
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(6,11,24,0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                boxShadow: '0 0 20px rgba(79,110,247,0.45)',
              }}
            >
              ✦
            </div>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#e2e8f0',
                letterSpacing: '-0.01em',
              }}
            >
              ContractAI
            </span>
          </div>

          {/* Nav links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            {['Features', 'Pricing', 'Security', 'Blog'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.15s',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="#"
              style={{
                fontSize: '13px',
                color: '#64748b',
                textDecoration: 'none',
                padding: '8px 14px',
                fontWeight: 500,
              }}
            >
              Sign in
            </a>
            <a
              href="#"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                background: '#4f6ef7',
                color: '#fff',
                textDecoration: 'none',
                padding: '9px 18px',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(79,110,247,0.38)',
                transition: 'background 0.15s',
              }}
            >
              Get started →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Left — Text */}
          <div style={{ animation: 'fadeUp 0.55s ease both' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(79,110,247,0.1)',
                border: '1px solid rgba(79,110,247,0.28)',
                color: '#818cf8',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '99px',
                padding: '5px 14px',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4f6ef7',
                  boxShadow: '0 0 8px #4f6ef7',
                  display: 'inline-block',
                }}
              />
              AI-Powered Contract Platform
            </div>

            <h1
              style={{
                fontSize: 'clamp(40px, 5vw, 62px)',
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                color: '#f8fafc',
                margin: '0 0 20px',
              }}
            >
              Keep contracts
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #4f6ef7, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                under control.
              </span>
            </h1>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.75,
                color: '#475569',
                margin: '0 0 36px',
                maxWidth: '440px',
              }}
            >
              Draft, review, and sign contracts in seconds with AI. Streamline your
              entire contract lifecycle — from creation to signature.
            </p>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}
            >
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#4f6ef7',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '13px 24px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 24px rgba(79,110,247,0.42)',
                }}
              >
                Start for free →
              </a>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '13px 24px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                }}
              >
                ▶ Watch demo
              </a>
            </div>

            {/* Social proof */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '40px',
              }}
            >
              <div style={{ display: 'flex' }}>
                {['#4f6ef7', '#10b981', '#f59e0b', '#ec4899'].map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #060b18',
                      marginLeft: i === 0 ? 0 : '-8px',
                      background: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {['A', 'M', 'J', 'K'][i]}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
                Trusted by{' '}
                <strong style={{ color: '#e2e8f0', fontWeight: 600 }}>10,000+</strong>{' '}
                professionals
              </p>
            </div>
          </div>

          {/* Right — Floating UI mockup */}
          <div
            style={{
              position: 'relative',
              height: '500px',
            }}
          >
            {/* Main contract list card */}
            <div
              style={{
                position: 'absolute',
                top: '30px',
                left: '0px',
                width: '296px',
                background: '#ffffff',
                borderRadius: '22px',
                boxShadow: '0 28px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3)',
                padding: '20px',
                zIndex: 10,
                animation: 'fadeUp 0.6s ease 0.1s both',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '7px',
                    background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#fff',
                  }}
                >
                  ✦
                </div>
                <span
                  style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}
                >
                  ContractAI
                </span>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '12px',
                }}
              >
                My Contracts
              </div>

              {contracts.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom:
                      i < contracts.length - 1
                        ? '1px solid #f1f5f9'
                        : 'none',
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}
                    >
                      {c.title}
                    </div>
                    <div
                      style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}
                    >
                      {c.party}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: c.color,
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: c.color,
                      }}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Signed notification card */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '0px',
                background: '#0d1526',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px',
                padding: '16px',
                width: '188px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                animation: 'fadeUp 0.6s ease 0.25s both',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div
                style={{ fontSize: '12px', fontWeight: 700, color: '#f1f5f9' }}
              >
                Contract Signed!
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#475569',
                  marginTop: '3px',
                }}
              >
                Jane Smith · just now
              </div>
            </div>

            {/* Stats card */}
            <div
              style={{
                position: 'absolute',
                bottom: '70px',
                right: '10px',
                background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                borderRadius: '20px',
                padding: '20px',
                width: '188px',
                boxShadow: '0 16px 48px rgba(79,110,247,0.45)',
                animation: 'fadeUp 0.6s ease 0.4s both',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.55)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '6px',
                }}
              >
                Contracts
              </div>
              <div
                style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '4px',
                  letterSpacing: '-0.03em',
                }}
              >
                248
              </div>
              <div
                style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}
              >
                signed this month
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#4ade80',
                  }}
                >
                  ↑ 24%
                </span>
                <span
                  style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}
                >
                  vs last month
                </span>
              </div>
            </div>

            {/* AI draft card */}
            <div
              style={{
                position: 'absolute',
                bottom: '200px',
                left: '12px',
                background: '#0d1526',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding: '12px 14px',
                width: '216px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'fadeUp 0.6s ease 0.55s both',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'rgba(79,110,247,0.15)',
                  border: '1px solid rgba(79,110,247,0.2)',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
              <div>
                <div
                  style={{ fontSize: '11px', fontWeight: 600, color: '#e2e8f0' }}
                >
                  AI Draft Ready
                </div>
                <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>
                  Generated in 3.2s
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '48px 24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}
        >
          {[
            { value: '10k+', label: 'Contracts signed' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '< 30s', label: 'Avg. sign time' },
            { value: 'SOC2', label: 'Compliant' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 800,
                  color: '#f1f5f9',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#334155',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: '6px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section
        id="features"
        style={{ position: 'relative', zIndex: 1, padding: '100px 24px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#64748b',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderRadius: '99px',
                padding: '5px 14px',
                marginBottom: '20px',
              }}
            >
              Features
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: '#f8fafc',
                margin: '0 0 16px',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Everything you need to
              <br />
              close contracts faster
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#475569',
                margin: '0 auto',
                maxWidth: '480px',
                lineHeight: 1.7,
              }}
            >
              From AI drafting to e-signatures, ContractAI handles the full
              contract lifecycle.
            </p>
          </div>

          {/* Feature cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '24px',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: `${f.color}18`,
                    border: `1px solid ${f.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    marginBottom: '16px',
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '8px',
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: '#f8fafc',
                margin: '0 0 12px',
                letterSpacing: '-0.025em',
              }}
            >
              How it works
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', margin: 0 }}>
              Three steps to a signed contract
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '48px',
              position: 'relative',
            }}
          >
            {steps.map((item, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div
                  style={{
                    fontSize: '52px',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    marginBottom: '16px',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(79,110,247,0.12)',
                    border: '1px solid rgba(79,110,247,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#818cf8',
                    marginBottom: '14px',
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.75,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px 100px',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #3b5bdb 0%, #4f6ef7 40%, #7c3aed 100%)',
              borderRadius: '28px',
              padding: '72px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(79,110,247,0.45)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at top, rgba(255,255,255,0.12) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '0 0 16px',
                  letterSpacing: '-0.025em',
                }}
              >
                Start closing deals faster
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.65)',
                  margin: '0 auto 32px',
                  maxWidth: '400px',
                  lineHeight: 1.7,
                }}
              >
                Join 10,000+ teams using ContractAI to draft, sign, and manage
                contracts in minutes.
              </p>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#fff',
                  color: '#4f6ef7',
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '15px 32px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                Get started for free →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                color: '#fff',
              }}
            >
              ✦
            </div>
            <span
              style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}
            >
              ContractAI
            </span>
          </div>

          <div
            style={{ fontSize: '12px', color: '#1e293b' }}
          >
            © 2025 ContractAI. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {['Privacy', 'Terms', 'Security'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: '12px',
                  color: '#1e293b',
                  textDecoration: 'none',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
