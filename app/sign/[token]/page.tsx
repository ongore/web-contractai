'use client';

import { useEffect, useRef, useState, use } from 'react';

type ContractResponse = {
  contract?: {
    id: string;
    title?: string;
    type?: string;
    status?: string;
    extractedFields?: any;
    otherPartyName?: string | null;
    otherPartyEmail?: string | null;
    signingLinkExpiry?: string | null;
  };
  id?: string;
  title?: string;
  extractedFields?: any;
  otherPartyName?: string | null;
  otherPartyEmail?: string | null;
};

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

    // Retina / device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.offsetWidth;
    const displayH = canvas.offsetHeight;
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#1e293b';
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
      <div style={sigStyles.hint}>Sign above with your mouse or finger</div>
      <button type="button" onClick={clear} style={sigStyles.clearBtn}>
        Clear
      </button>
    </div>
  );
}

const sigStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    border: '1.5px solid #d1d5db',
    borderRadius: '14px',
    background: '#fafafa',
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
    bottom: '36px',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '12px',
    color: '#9ca3af',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  clearBtn: {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: 'none',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '4px 12px',
    fontSize: '13px',
    color: '#6b7280',
    cursor: 'pointer',
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

  const contract = data?.contract ?? data;
  const extractedFields = contract?.extractedFields ?? {};

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
        <div style={{ ...styles.card, textAlign: 'center', color: '#6b7280' }}>
          <div style={styles.spinner} />
          Loading contract…
        </div>
      </main>
    );
  }

  // ── Error (no contract loaded) ───────────────────────────────────────────
  if (error && !contract) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={styles.badge('#fee2e2', '#991b1b')}>Error</div>
          <h1 style={styles.title}>Unable to load contract</h1>
          <p style={styles.errorText}>{error}</p>
        </div>
      </main>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.title}>Contract Signed</h1>
          <p style={styles.text}>
            Your signature has been recorded and the contract is now complete.
          </p>
        </div>
      </main>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <main style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge('#ede9fe', '#5b21b6')}>Signature Required</div>
          <h1 style={styles.title}>{contract?.title || 'Review & Sign Contract'}</h1>
          <p style={styles.text}>
            Review the details below, then add your typed name and drawn
            signature to complete this agreement.
          </p>
        </div>

        <hr style={styles.divider} />

        {/* Contract meta */}
        <div style={styles.metaGrid}>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Other Party</span>
            <span style={styles.metaValue}>
              {contract?.otherPartyName || contract?.otherPartyEmail || '—'}
            </span>
          </div>
          {contract?.type && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Contract Type</span>
              <span style={styles.metaValue}>{contract.type}</span>
            </div>
          )}
        </div>

        {/* Extracted fields */}
        {Object.keys(extractedFields).length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Contract Details</div>
            <pre style={styles.pre}>
              {JSON.stringify(extractedFields, null, 2)}
            </pre>
          </div>
        )}

        <hr style={styles.divider} />

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
              style={{ maxHeight: '60px', display: 'block', marginTop: '6px' }}
            />
          </div>
        )}

        {/* Error */}
        {error && <div style={styles.errorBanner}>{error}</div>}

        {/* Submit */}
        <button
          style={{
            ...styles.button,
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Sign Contract'}
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
    background: 'linear-gradient(135deg, #f0f4ff 0%, #f6f7fb 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
  } as React.CSSProperties,
  card: {
    width: '100%',
    maxWidth: '720px',
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
    padding: '36px 32px',
  } as React.CSSProperties,
  header: {
    marginBottom: '20px',
  } as React.CSSProperties,
  badge: (bg: string, color: string): React.CSSProperties => ({
    display: 'inline-block',
    background: bg,
    color,
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: '99px',
    padding: '4px 12px',
    marginBottom: '12px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  }),
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px',
  } as React.CSSProperties,
  text: {
    color: '#6b7280',
    fontSize: '15px',
    lineHeight: 1.6,
    margin: 0,
  } as React.CSSProperties,
  divider: {
    border: 'none',
    borderTop: '1px solid #f3f4f6',
    margin: '24px 0',
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
    fontSize: '11px',
    fontWeight: 600,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  } as React.CSSProperties,
  metaValue: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#111827',
  } as React.CSSProperties,
  section: {
    marginBottom: '24px',
  } as React.CSSProperties,
  sectionLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
  } as React.CSSProperties,
  pre: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '13px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: '#374151',
    lineHeight: 1.6,
    margin: 0,
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '13px 16px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '1.5px solid #d1d5db',
    outline: 'none',
    color: '#111827',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  } as React.CSSProperties,
  hint: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '6px',
  } as React.CSSProperties,
  sigPreview: {
    marginBottom: '20px',
    padding: '12px 16px',
    background: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  } as React.CSSProperties,
  errorBanner: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    marginBottom: '16px',
  } as React.CSSProperties,
  errorText: {
    color: '#dc2626',
    fontSize: '15px',
  } as React.CSSProperties,
  button: {
    width: '100%',
    border: 'none',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 700,
    padding: '15px 20px',
    display: 'block',
    textAlign: 'center',
    boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
    marginBottom: '14px',
  } as React.CSSProperties,
  legalNote: {
    fontSize: '11px',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 1.6,
    margin: 0,
  } as React.CSSProperties,
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 16px',
  } as React.CSSProperties,
  successIcon: {
    width: '64px',
    height: '64px',
    background: '#dcfce7',
    color: '#16a34a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 auto 20px',
  } as React.CSSProperties,
};
