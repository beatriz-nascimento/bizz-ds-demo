import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from   '@angular/forms';

// Types (from bizz-components) 
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'disabled';
type ButtonSize    = 'sm' | 'md' | 'lg';
type TagColor      = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

/**
 * CUSTOM_ELEMENTS_SCHEMA tells Angular's compiler to allow unknown
 * element names (our web components) in templates without errors.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Cross-app navigation
  readonly isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  readonly vanillaUrl = this.isLocal ? 'http://localhost:4200' : '../';
  readonly reactUrl   = this.isLocal ? 'http://localhost:4201' : '../react/';

  isDark = signal(false);

  toggleTheme() {
    this.isDark.update(v => !v);
    document.body.classList.toggle('bizz-theme-dark');
    document.body.classList.toggle('dark-page');
  }

  readonly tokens = signal([
    { prop: '--bizz-primary',   label: 'Primary',   color: '#0f62fe' },
    { prop: '--bizz-secondary', label: 'Secondary', color: '#525252' },
    { prop: '--bizz-success',   label: 'Success',   color: '#24a148' },
    { prop: '--bizz-warning',   label: 'Warning',   color: '#f59e0b' },
    { prop: '--bizz-error',     label: 'Error',     color: '#da1e28' },
  ]);

  readonly defaultTokens = this.tokens().map(t => ({ ...t }));

  updateToken(prop: string, color: string) {
    document.documentElement.style.setProperty(prop, color);
    this.tokens.update(tokens =>
      tokens.map(t => (t.prop === prop ? { ...t, color } : t))
    );
  }

  resetTokens() {
    this.defaultTokens.forEach(({ prop, color }) => {
      document.documentElement.style.setProperty(prop, color);
    });
    this.tokens.set(this.defaultTokens.map(t => ({ ...t })));
  }

  // Button demo 
  buttonVariant = signal<ButtonVariant>('primary');
  buttonSize    = signal<ButtonSize>('md');
  buttonLabel   = signal('Click me');
  buttonDisabled = signal(false);
  buttonLoading  = signal(false);
  buttonFullWidth = signal(false);
  buttonLastEvent = signal<string | null>(null);

  readonly buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'danger', 'disabled'];
  readonly buttonSizes: ButtonSize[]       = ['sm', 'md', 'lg'];

  /**
   * Angular binds to custom events with standard (eventName)="handler()" syntax.
   * For bizz-click, it's (bizz-click)="onBizzClick($event)".
   *
   * The $event is a CustomEvent, cast it for typed access to .detail.
   */
  onBizzClick(event: Event) {
    const e = event as CustomEvent;
    this.buttonLastEvent.set(`bizz-click fired at ${new Date().toLocaleTimeString()}`);
    console.log('bizz-click detail:', e.detail);
  }

  // Tag demo
  tagColor       = signal<TagColor>('primary');
  tagLabel       = signal('TypeScript');
  tagDismissible = signal(false);
  tagDismissed   = signal(false);

  readonly tagColors: TagColor[] = ['primary', 'secondary', 'success', 'warning', 'error'];

  onTagDismissed() {
    this.tagDismissed.set(true);
  }

  restoreTag() {
    this.tagDismissed.set(false);
  }

  // Input demo 
  inputValue    = signal('');
  inputError    = signal('');
  inputDisabled = signal(false);
  inputRequired = signal(false);

  onBizzInput(event: Event) {
    this.inputValue.set((event as CustomEvent<string>).detail);
    this.inputError.set('');
  }

  onBizzBlur() {
    if (this.inputRequired() && !this.inputValue()) {
      this.inputError.set('This field is required');
    }
  }

  // Card demo
  cardElevation = signal<'flat' | 'raised'>('raised');
  cardPadding   = signal<'none' | 'sm' | 'md' | 'lg'>('md');
  cardClickable = signal(false);
}
