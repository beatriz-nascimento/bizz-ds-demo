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

type WebComponentProps<T extends HTMLElement> = Partial<T> &
  React.HTMLAttributes<T> & {
    class?: string;
    style?: React.CSSProperties;
  };

declare global {
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
