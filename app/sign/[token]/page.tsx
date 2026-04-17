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

    ctx.strokeStyle = '#818cf8';
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
    border: '1.5px solid rgba(79,110,247,0.3)',
    borderRadius: '14px',
    background: 'rgba(79,110,247,0.04)',
    overflow: 'hidden',
  },
  canvas: {
    display: 'block',
    width: '100%',
    height: '180px',
    cursor: 'crosshair',
    touchAction: 'none',
  },
  hint: {
    position: 'absolute',
    bottom: '38px',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '12px',
    color: 'rgba(148,163,184,0.5)',
    pointerEvents: 'none',
    userSelect: 'none',
    letterSpacing: '0.02em',
  },
  clearBtn: {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '4px 12px',
    fontSize: '12px',
    color: '#64748b',
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
          <p style={{ color: '#475569', fontSize: '14px', margin: 0, letterSpacing: '0.02em' }}>
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
          <div style={styles.badge('rgba(239,68,68,0.12)', 'rgba(239,68,68,0.3)', '#fca5a5')}>
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
                stroke="#4ade80"
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
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
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
      {/* Glow blobs */}
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.card}>
        {/* Wordmark */}
        <div style={styles.wordmark}>
          <div style={styles.logoMark}>✦</div>
          <span style={styles.logoText}>ContractAI</span>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge('rgba(124,58,237,0.12)', 'rgba(124,58,237,0.35)', '#a78bfa')}>
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
                  background: '#7c3aed',
                  boxShadow: '0 0 6px #7c3aed',
                  display: 'inline-block',
                }} />
                {contract.status}
              </span>
            </div>
          )}
        </div>

        {/* PDF Preview */}
        {contract?.pdfUrl && (
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Contract Document</div>
            <div style={styles.pdfContainer}>
              <iframe
                src={contract.pdfUrl}
                style={styles.pdfFrame}
                title="Contract Document"
              />
            </div>
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
                filter: 'brightness(2) hue-rotate(240deg)',
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
    background: '#060b18',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px 80px',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,

  glowTop: {
    position: 'fixed',
    top: '-15%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '900px',
    height: '600px',
    background:
      'radial-gradient(ellipse at center, rgba(79,110,247,0.13) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  } as React.CSSProperties,

  glowBottom: {
    position: 'fixed',
    bottom: '-20%',
    right: '10%',
    width: '500px',
    height: '500px',
    background:
      'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  } as React.CSSProperties,

  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '680px',
    background: 'rgba(255,255,255,0.035)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow:
      '0 0 0 1px rgba(79,110,247,0.05), 0 28px 72px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4)',
    padding: '40px 36px',
    animation: 'fadeUp 0.5s ease both',
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
    background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    boxShadow: '0 2px 12px rgba(79,110,247,0.45)',
  } as React.CSSProperties,

  logoText: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#e2e8f0',
    letterSpacing: '-0.01em',
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
    color: '#f1f5f9',
    margin: '0 0 10px',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  } as React.CSSProperties,

  text: {
    color: '#475569',
    fontSize: '14px',
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,

  divider: {
    border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.06)',
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
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  } as React.CSSProperties,

  metaValue: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#cbd5e1',
  } as React.CSSProperties,

  section: {
    marginBottom: '24px',
  } as React.CSSProperties,

  sectionLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: '10px',
    letterSpacing: '0.01em',
  } as React.CSSProperties,

  pdfContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.3)',
  } as React.CSSProperties,

  pdfFrame: {
    display: 'block',
    width: '100%',
    height: '480px',
    border: 'none',
  } as React.CSSProperties,

  fieldsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.07)',
  } as React.CSSProperties,

  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#475569',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    flexShrink: 0,
    paddingTop: '1px',
  } as React.CSSProperties,

  fieldValue: {
    fontSize: '14px',
    color: '#cbd5e1',
    textAlign: 'right' as const,
    lineHeight: 1.5,
    wordBreak: 'break-word' as const,
  } as React.CSSProperties,

  input: {
    width: '100%',
    padding: '13px 16px',
    fontSize: '15px',
    borderRadius: '12px',
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    outline: 'none',
    color: '#f1f5f9',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  } as React.CSSProperties,

  hint: {
    fontSize: '12px',
    color: '#334155',
    marginTop: '6px',
    lineHeight: 1.5,
  } as React.CSSProperties,

  sigPreview: {
    marginBottom: '20px',
    padding: '14px 16px',
    background: 'rgba(79,110,247,0.06)',
    borderRadius: '12px',
    border: '1px solid rgba(79,110,247,0.18)',
  } as React.CSSProperties,

  errorBanner: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    color: '#fca5a5',
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
    background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 700,
    padding: '15px 20px',
    display: 'block',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(79,110,247,0.42)',
    marginBottom: '16px',
    letterSpacing: '0.01em',
    transition: 'opacity 0.15s, box-shadow 0.15s',
  } as React.CSSProperties,

  legalNote: {
    fontSize: '11px',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,

  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid rgba(79,110,247,0.15)',
    borderTopColor: '#4f6ef7',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
    margin: '0 auto 20px',
  } as React.CSSProperties,

  btnSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.25)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.65s linear infinite',
    display: 'inline-block',
    flexShrink: 0,
  } as React.CSSProperties,

  successIcon: {
    width: '72px',
    height: '72px',
    background: 'rgba(74,222,128,0.1)',
    border: '1px solid rgba(74,222,128,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    boxShadow: '0 0 32px rgba(74,222,128,0.12)',
  } as React.CSSProperties,
};
