import { useState, useRef, useCallback } from 'react';
import './app.css';

const isLocal = () => location.hostname === 'localhost' || location.hostname === '127.0.0.1';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'disabled';
type ButtonSize    = 'sm' | 'md' | 'lg';
type TagColor      = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

const DEFAULT_TOKENS: Record<string, string> = {
  '--bizz-primary':   '#0f62fe',
  '--bizz-secondary': '#525252',
  '--bizz-success':   '#24a148',
  '--bizz-warning':   '#f59e0b',
  '--bizz-error':     '#da1e28',
};

const TOKEN_LABELS: Record<string, string> = {
  '--bizz-primary':   'Primary',
  '--bizz-secondary': 'Secondary',
  '--bizz-success':   'Success',
  '--bizz-warning':   'Warning',
  '--bizz-error':     'Error',
};

function TokenSwatch({ prop, label }: { prop: string; label: string }) {
  const [color, setColor] = useState(DEFAULT_TOKENS[prop]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColor(val);
    document.documentElement.style.setProperty(prop, val);
  };

  return (
    <div className="swatch">
      <div className="swatch-box" style={{ background: color }}>
        <input type="color" value={color} onChange={handleChange} title={`Edit ${prop}`} />
      </div>
      <span className="swatch-label">{label}</span>
    </div>
  );
}

function ButtonDemo() {
  const [variant, setVariant]     = useState<ButtonVariant>('primary');
  const [size, setSize]           = useState<ButtonSize>('md');
  const [label, setLabel]         = useState('Click me');
  const [disabled, setDisabled]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  // Web component custom events need a ref + addEventListener
  // (React's synthetic events don't cover custom event names like bizz-click)
  const btnRef = useRef<HTMLElement>(null);

  const handleBizzClick = useCallback(() => {
    setLastEvent(`bizz-click fired at ${new Date().toLocaleTimeString()}`);
  }, []);

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      (btnRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (el) {
        el.addEventListener('bizz-click', handleBizzClick);
      }
    },
    [handleBizzClick]
  );

  return (
    <section className="demo-section" id="button">
      <div className="demo-header">
        <h2 className="demo-title">Button <code>&lt;bizz-button&gt;</code></h2>
        <p className="demo-desc">
          Custom events like <code>bizz-click</code> need a <strong>ref + addEventListener</strong>.
          React's synthetic event system doesn't cover non-standard event names
        </p>
      </div>

      <div className="demo-card">
        <div className="demo-preview">

          <bizz-button
            ref={setRef}
            variant={variant}
            size={size}
            disabled={disabled || undefined}
            loading={loading || undefined}
            full-width={fullWidth || undefined}
          >
            {label}
          </bizz-button>
          {lastEvent && <span className="event-badge">{lastEvent}</span>}
        </div>

        <div className="demo-controls">
          <label className="ctrl-group">
            <span>Variant</span>
            <select value={variant} onChange={e => setVariant(e.target.value as ButtonVariant)}>
              {(['primary','secondary','danger','disabled'] as ButtonVariant[]).map(v => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>

          <label className="ctrl-group">
            <span>Size</span>
            <select value={size} onChange={e => setSize(e.target.value as ButtonSize)}>
              {(['sm','md','lg'] as ButtonSize[]).map(s => <option key={s}>{s}</option>)}
            </select>
          </label>

          <label className="ctrl-group">
            <span>Label</span>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
          </label>

          <div className="ctrl-group ctrl-toggles">
            <label><input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled</label>
            <label><input type="checkbox" checked={loading} onChange={e => setLoading(e.target.checked)} /> Loading</label>
            <label><input type="checkbox" checked={fullWidth} onChange={e => setFullWidth(e.target.checked)} /> Full width</label>
          </div>
        </div>
      </div>
    </section>
  );
}

function TagDemo() {
  const [color, setColor]           = useState<TagColor>('primary');
  const [label, setLabel]           = useState('TypeScript');
  const [dismissible, setDismissible] = useState(false);
  const [dismissed, setDismissed]   = useState(false);

  const setRef = useCallback((el: HTMLElement | null) => {
    if (el) {
      el.addEventListener('bizz-dismissed', () => setDismissed(true));
    }
  }, []);

  return (
    <section className="demo-section" id="tag">
      <div className="demo-header">
        <h2 className="demo-title">Tag <code>bizz-tag</code></h2>
      </div>

      <div className="demo-card">
        <div className="demo-preview">
          {dismissed ? (
            <div className="dismissed-msg">
              Tag dismissed! <button onClick={() => setDismissed(false)}>Restore</button>
            </div>
          ) : (
            <bizz-tag ref={setRef} color={color} dismissible={dismissible || undefined}>
              {label}
            </bizz-tag>
          )}
        </div>

        <div className="demo-controls">
          <label className="ctrl-group">
            <span>Color</span>
            <select value={color} onChange={e => setColor(e.target.value as TagColor)}>
              {(['primary','secondary','success','warning','error'] as TagColor[]).map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="ctrl-group">
            <span>Label</span>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
          </label>
          <div className="ctrl-group ctrl-toggles">
            <label><input type="checkbox" checked={dismissible} onChange={e => setDismissible(e.target.checked)} /> Dismissible</label>
          </div>
        </div>

        <div className="demo-all-variants">
          <p className="variants-label">All colors</p>
          <div className="variants-row">
            {(['primary','secondary','success','warning','error'] as TagColor[]).map(c => (
              <bizz-tag key={c} color={c}>{c}</bizz-tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Input demo ───────────────────────────────────────────────────────────────
function InputDemo() {
  const [value, setValue]       = useState('');
  const [error, setError]       = useState('');
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);

  const setRef = useCallback((el: HTMLElement | null) => {
    if (el) {
      el.addEventListener('bizz-input', (e: Event) => {
        setValue((e as CustomEvent<string>).detail);
        setError('');
      });
      el.addEventListener('bizz-blur', () => {
        if (required && !value) setError('This field is required');
      });
    }
  }, [required, value]);

  return (
    <section className="demo-section" id="input">
      <div className="demo-header">
        <h2 className="demo-title">Input <code>&lt;bizz-input&gt;</code></h2>
        <p className="demo-desc">
          <code>bizz-input</code> fires a <code>CustomEvent string</code> cast the event
          to access <code>e.detail</code>. Connect via ref for full TypeScript safety.
        </p>
      </div>

      <div className="demo-card">
        <div className="demo-preview">
          <bizz-input
            ref={setRef}
            label="Email address"
            placeholder="you@example.com"
            type="email"
            helper-text="We'll never share your email."
            error-text={error}
            disabled={disabled || undefined}
            required={required || undefined}
            style={{ width: '320px', maxWidth: '100%' }}
          />
          {value && <p className="event-badge">Current value: {value}</p>}
        </div>

        <div className="demo-controls">
          <div className="ctrl-group ctrl-toggles">
            <label><input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled</label>
            <label><input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} /> Required</label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle('bizz-theme-dark');
    document.body.classList.toggle('dark-page');
  };

  const resetTokens = () => {
    Object.entries(DEFAULT_TOKENS).forEach(([prop, val]) => {
      document.documentElement.style.setProperty(prop, val);
    });
    window.dispatchEvent(new Event('tokens-reset'));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <span className="logo">bizz-components</span>
          <span className="badge">React demo</span>
          <span className="badge secondary">v0.2.0</span>
        </div>
        <div className="header-actions">
          <a href={isLocal() ? 'http://localhost:4200' : '../'} className="stack-link" target="_blank">Vanilla ↗</a>
          <a href={isLocal() ? 'http://localhost:4202' : '../angular/'} className="stack-link" target="_blank">Angular ↗</a>
          <button className="theme-btn" onClick={toggleTheme}>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Token bar */}
      <div className="token-bar">
        <span className="token-bar-label">Theme tokens</span>
        <div className="swatches">
          {Object.entries(DEFAULT_TOKENS).map(([prop]) => (
            <TokenSwatch key={prop} prop={prop} label={TOKEN_LABELS[prop]} />
          ))}
        </div>
        <button className="reset-btn" onClick={resetTokens}>Reset</button>
      </div>

      {/* Content */}
      <main className="main">
        <div className="intro">
          <h1 className="page-title">React integration</h1>
          <p className="page-desc">
            bizz-components are native Custom Elements: they work in React like any HTML element.
            Key patterns: register once at entry, use <strong>refs for custom events</strong>,
            pass <strong>undefined (not false) for absent boolean attributes</strong>.
          </p>
        </div>

        <ButtonDemo />
        <TagDemo />
        <InputDemo />
      </main>
    </div>
  );
}
