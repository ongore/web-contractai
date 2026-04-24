'use client';

import { useEffect, useRef, useState, use } from 'react';

type ExtractedField = {
  label: string;
  key: string;
  value: string;
};

type ContractData = {
  id: string;
  title?: string;
  type?: string;
  status?: string;
  extractedFields?: ExtractedField[];
  pdfUrl?: string | null;
  otherPartyName?: string | null;
  otherPartyEmail?: string | null;
  signingLinkExpiry?: string | null;
  parties?: { sender?: string | null; recipient?: string | null };
  senderSigned?: boolean;
};

type ContractResponse = {
  success?: boolean;
  data?: ContractData;
  contract?: ContractData;
} & Partial<ContractData>;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// ─── Signature Canvas ────────────────────────────────────────────────────────

function SignatureCanvas({
  onSigned,
  onCleared,
}: {
  onSigned: (dataUrl: string) => void;
  onCleared: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasStrokes = useRef(false);

  const getPos = (e: PointerEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.offsetWidth;
    const displayH = canvas.offsetHeight;
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      drawing.current = true;
      const { x, y } = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const onMove = (e: PointerEvent) => {
      if (!drawing.current) return;
      e.preventDefault();
      const { x, y } = getPos(e, canvas);
      ctx.lineTo(x, y);
      ctx.stroke();
      hasStrokes.current = true;
    };

    const onUp = (e: PointerEvent) => {
      if (!drawing.current) return;
      drawing.current = false;
      if (hasStrokes.current) {
        onSigned(canvas.toDataURL('image/png'));
      }
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
    };
  }, [onSigned]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasStrokes.current = false;
    onCleared();
  };

  return (
    <div style={sigStyles.wrapper}>
      <canvas
        ref={canvasRef}
        style={sigStyles.canvas}
        aria-label="Signature pad"
      />
      <div style={sigStyles.hint}>Draw your signature above</div>
      <button type="button" onClick={clear} style={sigStyles.clearBtn}>
        Clear
      </button>
    </div>
  );
}

const sigStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    border: '1.5px solid rgba(255,92,40,0.35)',
    borderRadius: '14px',
    background: '#ffffff',
    overflow: 'hidden',
  },
  canvas: {
    display: 'block',
    width: '100%',
    height: '180px',
    cursor: 'crosshair',
    touchAction: 'none',
    background: '#ffffff',
  },
  hint: {
    position: 'absolute',
    bottom: '38px',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '12px',
    color: 'rgba(140,140,140,0.6)',
    pointerEvents: 'none',
    userSelect: 'none',
    letterSpacing: '0.02em',
  },
  clearBtn: {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: '#F7F5F2',
    border: '1px solid #E2DED8',
    borderRadius: '8px',
    padding: '4px 12px',
    fontSize: '12px',
    color: '#8C8C8C',
    cursor: 'pointer',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
};

// ─── Sign Page ────────────────────────────────────────────────────────────────

export default function SignPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [data, setData] = useState<ContractResponse | null>(null);
  const [typedName, setTypedName] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadContract = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE_URL}/api/sign/${token}`);
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(json?.message || 'Failed to load signing page');
        }
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    loadContract();
  }, [token]);

  const contract: ContractData | null = data?.data ?? data?.contract ?? (data?.id ? (data as ContractData) : null);
  const extractedFields: ExtractedField[] = Array.isArray(contract?.extractedFields) ? contract.extractedFields : [];

  const handleSubmit = async () => {
    if (!typedName.trim()) {
      setError('Please type your full name.');
      return;
    }
    if (!signatureDataUrl) {
      setError('Please draw your signature in the box above.');
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      const res = await fetch(`${API_BASE_URL}/api/sign/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signerName: typedName,
          signature: signatureDataUrl,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.message || 'Failed to sign contract');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to sign contract');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main style={styles.page}>
        <div style={{ ...styles.card, textAlign: 'center', padding: '60px 40px' }}>
          <div style={styles.spinner} />
          <p style={{ color: '#8C8C8C', fontSize: '14px', margin: 0, letterSpacing: '0.02em' }}>
            Loading contract…
          </p>
        </div>
      </main>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error && !contract) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={styles.badge('rgba(239,68,68,0.08)', 'rgba(239,68,68,0.25)', '#ef4444')}>
            Error
          </div>
          <h1 style={styles.title}>Unable to load contract</h1>
          <p style={{ color: '#ef4444', fontSize: '15px', margin: 0, lineHeight: 1.6 }}>{error}</p>
        </div>
      </main>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <main style={styles.page}>
        <div style={{ ...styles.card, textAlign: 'center', padding: '60px 40px' }}>
          <div style={styles.successIcon}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 style={{ ...styles.title, textAlign: 'center', marginBottom: '12px' }}>
            Contract Signed
          </h1>
          <p style={{ color: '#8C8C8C', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
            Your signature has been recorded and the contract is now legally
            complete.
          </p>
        </div>
      </main>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.wordmark}>
          <div style={styles.logoMark}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" />
            </svg>
          </div>
          <span style={styles.logoText}>Clerra</span>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge('rgba(255,92,40,0.08)', 'rgba(255,92,40,0.3)', '#FF5C28')}>
            Signature Required
          </div>
          <h1 style={styles.title}>{contract?.title || 'Review & Sign Contract'}</h1>
          <p style={styles.text}>
            Review the details below, then add your typed name and drawn
            signature to complete this agreement.
          </p>
        </div>

        <div style={styles.divider} />

        {/* Contract meta */}
        <div style={styles.metaGrid}>
          {contract?.parties?.sender && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Sender</span>
              <span style={styles.metaValue}>{contract.parties.sender}</span>
            </div>
          )}
          {(contract?.otherPartyName || contract?.otherPartyEmail) && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Recipient</span>
              <span style={styles.metaValue}>
                {contract?.otherPartyName || contract?.otherPartyEmail}
              </span>
            </div>
          )}
          {contract?.type && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Contract Type</span>
              <span style={styles.metaValue}>
                {contract.type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </div>
          )}
          {contract?.status && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Status</span>
              <span style={{
                ...styles.metaValue,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#FF5C28',
                  display: 'inline-block',
                }} />
                {contract.status}
              </span>
            </div>
          )}
        </div>

        {/* PDF Link */}
        {contract?.pdfUrl && (
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Contract Document</div>
            <a
              href={contract.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.pdfLink}
            >
              <div style={styles.pdfLinkIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM6 22C5.45 22 4.979 21.804 4.587 21.413C4.196 21.021 4 20.55 4 20V4C4 3.45 4.196 2.979 4.587 2.587C4.979 2.196 5.45 2 6 2H14L20 8V20C20 20.55 19.804 21.021 19.413 21.413C19.021 21.804 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z" fill="#FF5C28"/>
                </svg>
              </div>
              <div style={styles.pdfLinkText}>
                <span style={styles.pdfLinkTitle}>View Full Contract</span>
                <span style={styles.pdfLinkSub}>Tap to open PDF document</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z" fill="#8C8C8C"/>
                <path d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19Z" fill="#8C8C8C"/>
              </svg>
            </a>
          </div>
        )}

        {/* Extracted fields */}
        {!contract?.pdfUrl && extractedFields.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Contract Details</div>
            <div style={styles.fieldsList}>
              {extractedFields.map((field) => (
                <div key={field.key} style={styles.fieldRow}>
                  <span style={styles.fieldLabel}>{field.label}</span>
                  <span style={styles.fieldValue}>{field.value || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={styles.divider} />

        {/* Typed name */}
        <div style={styles.section}>
          <label style={styles.sectionLabel} htmlFor="signer-name">
            Full legal name
          </label>
          <input
            id="signer-name"
            style={styles.input}
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder="e.g. Jane Smith"
            autoComplete="name"
          />
          <p style={styles.hint}>
            Type your name exactly as it should appear on the contract.
          </p>
        </div>

        {/* Drawn signature */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>Draw your signature</div>
          <SignatureCanvas
            onSigned={setSignatureDataUrl}
            onCleared={() => setSignatureDataUrl(null)}
          />
        </div>

        {/* Signature preview */}
        {signatureDataUrl && (
          <div style={styles.sigPreview}>
            <span style={styles.metaLabel}>Preview</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signatureDataUrl}
              alt="Your signature"
              style={{
                maxHeight: '60px',
                display: 'block',
                marginTop: '8px',
              }}
            />
          </div>
        )}

        {/* Error */}
        {error && <div style={styles.errorBanner}>{error}</div>}

        {/* Submit */}
        <button
          style={{
            ...styles.button,
            opacity: submitting ? 0.65 : 1,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={styles.btnSpinner} />
              Submitting…
            </span>
          ) : (
            'Sign Contract'
          )}
        </button>

        <p style={styles.legalNote}>
          By clicking "Sign Contract" you agree that your typed name and drawn
          signature constitute your legal electronic signature.
        </p>
      </div>
    </main>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, any> = {
  page: {
    minHeight: '100vh',
    background: '#F7F5F2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px 80px',
    position: 'relative',
  } as React.CSSProperties,

  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '680px',
    background: '#FFFFFF',
    borderRadius: '24px',
    border: '1px solid #E2DED8',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
    padding: '40px 36px',
  } as React.CSSProperties,

  wordmark: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
  } as React.CSSProperties,

  logoMark: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: '#FF5C28',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(255,92,40,0.35)',
  } as React.CSSProperties,

  logoText: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111111',
    letterSpacing: '-0.02em',
  } as React.CSSProperties,

  header: {
    marginBottom: '24px',
  } as React.CSSProperties,

  badge: (bg: string, border: string, color: string): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    background: bg,
    border: `1px solid ${border}`,
    color,
    fontSize: '11px',
    fontWeight: 700,
    borderRadius: '99px',
    padding: '4px 12px',
    marginBottom: '14px',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
  }),

  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#111111',
    margin: '0 0 10px',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  } as React.CSSProperties,

  text: {
    color: '#8C8C8C',
    fontSize: '14px',
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,

  divider: {
    border: 'none',
    borderTop: '1px solid #E2DED8',
    margin: '28px 0',
  } as React.CSSProperties,

  metaGrid: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    marginBottom: '24px',
  } as React.CSSProperties,

  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  } as React.CSSProperties,

  metaLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#8C8C8C',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  } as React.CSSProperties,

  metaValue: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111111',
  } as React.CSSProperties,

  section: {
    marginBottom: '24px',
  } as React.CSSProperties,

  sectionLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#8C8C8C',
    marginBottom: '10px',
    letterSpacing: '0.01em',
  } as React.CSSProperties,

  pdfLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    borderRadius: '12px',
    border: '1px solid #E2DED8',
    background: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  } as React.CSSProperties,

  pdfLinkIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: '#FFF1EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as React.CSSProperties,

  pdfLinkText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  pdfLinkTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111111',
  } as React.CSSProperties,

  pdfLinkSub: {
    fontSize: '13px',
    color: '#8C8C8C',
  } as React.CSSProperties,

  fieldsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #E2DED8',
  } as React.CSSProperties,

  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '12px 16px',
    background: '#FFFFFF',
    borderBottom: '1px solid #F0EDE8',
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#8C8C8C',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    flexShrink: 0,
    paddingTop: '1px',
  } as React.CSSProperties,

  fieldValue: {
    fontSize: '14px',
    color: '#111111',
    textAlign: 'right' as const,
    lineHeight: 1.5,
    wordBreak: 'break-word' as const,
  } as React.CSSProperties,

  input: {
    width: '100%',
    padding: '13px 16px',
    fontSize: '15px',
    borderRadius: '12px',
    border: '1.5px solid #E2DED8',
    background: '#FFFFFF',
    outline: 'none',
    color: '#111111',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  } as React.CSSProperties,

  hint: {
    fontSize: '12px',
    color: '#8C8C8C',
    marginTop: '6px',
    lineHeight: 1.5,
  } as React.CSSProperties,

  sigPreview: {
    marginBottom: '20px',
    padding: '14px 16px',
    background: '#FFF0EB',
    borderRadius: '12px',
    border: '1px solid rgba(255,92,40,0.2)',
  } as React.CSSProperties,

  errorBanner: {
    background: 'rgba(239,68,68,0.06)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#ef4444',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '13px',
    marginBottom: '16px',
    lineHeight: 1.5,
  } as React.CSSProperties,

  button: {
    width: '100%',
    border: 'none',
    borderRadius: '14px',
    background: '#FF5C28',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 700,
    padding: '15px 20px',
    display: 'block',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(255,92,40,0.35)',
    marginBottom: '16px',
    letterSpacing: '0.01em',
    transition: 'opacity 0.15s, box-shadow 0.15s',
  } as React.CSSProperties,

  legalNote: {
    fontSize: '11px',
    color: '#8C8C8C',
    textAlign: 'center',
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,

  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid rgba(255,92,40,0.15)',
    borderTopColor: '#FF5C28',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
    margin: '0 auto 20px',
  } as React.CSSProperties,

  btnSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.35)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.65s linear infinite',
    display: 'inline-block',
    flexShrink: 0,
  } as React.CSSProperties,

  successIcon: {
    width: '72px',
    height: '72px',
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  } as React.CSSProperties,
};
