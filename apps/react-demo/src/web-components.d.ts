/**
 * JSX type augmentation for bizz-components.
 *
 * Web components are unknown to React's JSX types by default.
 * This file teaches TypeScript what attributes/events each element accepts
 * so you get autocomplete and type safety when using them in JSX.
 */

import type {
  BizzButtonElement,
  BizzCardElement,
  BizzTagElement,
  BizzInputElement,
  BizzTextareaElement,
} from 'bizz-components/web';

type WebComponentProps<T> = Partial<T> &
  React.HTMLAttributes<Element> & {
    class?: string;
    style?: React.CSSProperties;
    // `ref` uses Element (not T) because bizz-components' type declarations
    // don't fully satisfy HTMLElement structurally, causing contravariance
    // errors when T is used directly as the ref callback parameter type.
    // Using Element as the base type avoids the mismatch while still
    // working correctly at runtime.
    ref?: React.Ref<Element> | ((el: Element | null) => void);
    key?: React.Key;
  };

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'bizz-button':   WebComponentProps<BizzButtonElement>;
        'bizz-card':     WebComponentProps<BizzCardElement>;
        'bizz-tag':      WebComponentProps<BizzTagElement>;
        'bizz-input':    WebComponentProps<BizzInputElement>;
        'bizz-textarea': WebComponentProps<BizzTextareaElement>;
      }
    }
  }
}
