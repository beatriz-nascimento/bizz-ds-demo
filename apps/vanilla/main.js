const DEFAULT_TOKENS = {
  '--bizz-primary':   '#0f62fe',
  '--bizz-secondary': '#525252',
  '--bizz-success':   '#24a148',
  '--bizz-warning':   '#f59e0b',
  '--bizz-error':     '#da1e28',
};

const TOKEN_LABELS = {
  '--bizz-primary':   'Primary',
  '--bizz-secondary': 'Secondary',
  '--bizz-success':   'Success',
  '--bizz-warning':   'Warning',
  '--bizz-error':     'Error',
};

const swatchContainer = document.getElementById('swatches');

Object.entries(DEFAULT_TOKENS).forEach(([prop, defaultColor]) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'token-swatch';

  const swatchBox = document.createElement('div');
  swatchBox.className = 'swatch-input';
  swatchBox.title = `Edit ${prop}`;

  const preview = document.createElement('div');
  preview.className = 'swatch-preview';
  preview.style.background = defaultColor;

  const input = document.createElement('input');
  input.type = 'color';
  input.value = defaultColor;
  input.addEventListener('input', (e) => {
    const val = e.target.value;
    document.documentElement.style.setProperty(prop, val);
    preview.style.background = val;
  });

  swatchBox.appendChild(preview);
  swatchBox.appendChild(input);
  swatchBox.addEventListener('click', () => input.click());

  const label = document.createElement('span');
  label.className = 'swatch-label';
  label.textContent = TOKEN_LABELS[prop];

  wrapper.appendChild(swatchBox);
  wrapper.appendChild(label);
  swatchContainer.appendChild(wrapper);
});

// token swatch grid (tokens section)
const tokenGrid = document.getElementById('tokenSwatchGrid');
const semanticGroups = [
  { label: 'Text',       tokens: ['--bizz-text-primary','--bizz-text-secondary','--bizz-text-error','--bizz-link-primary','--bizz-support-success','--bizz-support-warning'] },
  { label: 'Button',     tokens: ['--bizz-button-primary','--bizz-button-secondary','--bizz-button-danger','--bizz-button-disabled'] },
  { label: 'Background', tokens: ['--bizz-background','--bizz-layer-02','--bizz-background-hover','--bizz-background-active'] },
  { label: 'Border',     tokens: ['--bizz-border-subtle-00','--bizz-border-subtle-01','--bizz-border-strong-01','--bizz-border-interactive'] },
];

semanticGroups.forEach(group => {
  const groupEl = document.createElement('div');
  groupEl.innerHTML = `<p style="font-size:0.7rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--page-text-muted);margin-bottom:0.5rem">${group.label}</p>`;
  const chips = document.createElement('div');
  chips.style.cssText = 'display:flex;flex-direction:column;gap:0.35rem';
  group.tokens.forEach(tok => {
    const chip = document.createElement('div');
    chip.style.cssText = 'display:flex;align-items:center;gap:0.5rem;font-size:0.72rem;color:var(--page-text-muted);font-family:var(--font-mono)';
    chip.innerHTML = `<span id="dot-${tok.replace(/--/g,'').replace(/-/g,'_')}" style="width:12px;height:12px;border-radius:3px;background:var(${tok});border:1px solid var(--page-border);flex-shrink:0"></span>${tok}`;
    chips.appendChild(chip);
  });
  groupEl.appendChild(chips);
  tokenGrid.appendChild(groupEl);
});

// theme toggle
document.getElementById('theme').addEventListener('change', function () {
  const isDark = this.checked;
  document.body.classList.toggle('dark-mode', isDark);
  document.querySelectorAll('.demo-preview').forEach(el => {
    el.classList.toggle('bizz-theme-dark', isDark);
  });
});

// reset tokens 
function resetTokens() {
  Object.entries(DEFAULT_TOKENS).forEach(([prop, val]) => {
    document.documentElement.style.setProperty(prop, val);
  });
  swatchContainer.querySelectorAll('.swatch-preview').forEach((preview, i) => {
    const val = Object.values(DEFAULT_TOKENS)[i];
    preview.style.background = val;
    swatchContainer.querySelectorAll('input[type="color"]')[i].value = val;
  });
}

// component helpers 
function setAttr(id, attr, val) {
  document.getElementById(id).setAttribute(attr, val);
}

function setBool(id, attr, val) {
  const el = document.getElementById(id);
  if (val) el.setAttribute(attr, '');
  else el.removeAttribute(attr);
}

// sidebar active link on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));
