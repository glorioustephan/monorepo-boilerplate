'use client';

import { Spinner, Text, VisuallyHidden } from '../components';
import { cn } from '../lib/cn';

/** All available loader animation variants. */
export type LoaderVariant =
  | 'circular'
  | 'classic'
  | 'dots'
  | 'typing'
  | 'wave'
  | 'bars'
  | 'terminal'
  | 'text-blink'
  | 'text-shimmer'
  | 'loading-dots';

/**
 * Props for the Loader component.
 */
export interface LoaderProps {
  /**
   * Animation variant. `circular` and `classic` compose the `Spinner` atom;
   * the rest are CSS-only animations keyed on `.mb-loader-*` classes.
   * Defaults to `'circular'`.
   */
  readonly variant?: LoaderVariant;
  /** Size scale mapped to the Radix Spinner size prop. Defaults to `'2'`. */
  readonly size?: '1' | '2' | '3';
  /**
   * Label text for text-based variants (`text-blink`, `text-shimmer`, `loading-dots`).
   * Defaults to `'Thinking'`.
   */
  readonly text?: string;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// Internal sub-renderers
// ---------------------------------------------------------------------------

function DotsLoader({ size, className }: { size: '1' | '2' | '3'; className?: string }) {
  const dotClass = size === '1' ? 'h-1.5 w-1.5' : size === '3' ? 'h-2.5 w-2.5' : 'h-2 w-2';
  return (
    <span className={cn('mb-loader-dots flex items-center gap-1', className)}>
      <span
        className={cn('rounded-full', dotClass)}
        style={{ background: 'var(--accent-9)', animationDelay: '0ms' }}
      />
      <span
        className={cn('rounded-full', dotClass)}
        style={{ background: 'var(--accent-9)', animationDelay: '160ms' }}
      />
      <span
        className={cn('rounded-full', dotClass)}
        style={{ background: 'var(--accent-9)', animationDelay: '320ms' }}
      />
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function TypingLoader({ size, className }: { size: '1' | '2' | '3'; className?: string }) {
  const dotClass = size === '1' ? 'h-1 w-1' : size === '3' ? 'h-2 w-2' : 'h-1.5 w-1.5';
  return (
    <span className={cn('mb-loader-typing flex items-center gap-1', className)}>
      <span
        className={cn('rounded-full', dotClass)}
        style={{ background: 'var(--accent-9)', animationDelay: '0ms' }}
      />
      <span
        className={cn('rounded-full', dotClass)}
        style={{ background: 'var(--accent-9)', animationDelay: '250ms' }}
      />
      <span
        className={cn('rounded-full', dotClass)}
        style={{ background: 'var(--accent-9)', animationDelay: '500ms' }}
      />
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function WaveLoader({ size, className }: { size: '1' | '2' | '3'; className?: string }) {
  const heights =
    size === '1'
      ? ['6px', '9px', '12px', '9px', '6px']
      : size === '3'
        ? ['10px', '15px', '20px', '15px', '10px']
        : ['8px', '12px', '16px', '12px', '8px'];
  return (
    <span className={cn('mb-loader-wave flex items-center gap-0.5', className)}>
      {heights.map((h, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: stable fixed-length list
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: 'var(--accent-9)', height: h, animationDelay: `${i * 100}ms` }}
        />
      ))}
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function BarsLoader({ size, className }: { size: '1' | '2' | '3'; className?: string }) {
  const barClass = size === '1' ? 'w-1' : size === '3' ? 'w-2' : 'w-1.5';
  const hClass = size === '1' ? 'h-4' : size === '3' ? 'h-6' : 'h-5';
  return (
    <span className={cn('mb-loader-bars flex gap-1', hClass, className)}>
      {[0, 200, 400].map((delay) => (
        <span
          key={delay}
          className={cn('h-full rounded-sm', barClass)}
          style={{ background: 'var(--accent-9)', animationDelay: `${delay}ms` }}
        />
      ))}
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function TerminalLoader({ size, className }: { size: '1' | '2' | '3'; className?: string }) {
  const textSize = size === '1' ? '1' : size === '3' ? '3' : '2';
  const cursorClass = size === '1' ? 'h-3 w-1.5' : size === '3' ? 'h-5 w-2.5' : 'h-4 w-2';
  return (
    <span className={cn('mb-loader-terminal flex items-center gap-1', className)}>
      <Text
        size={textSize as '1' | '2' | '3'}
        style={{ fontFamily: 'monospace', color: 'var(--accent-9)' }}
      >
        {'>'}
      </Text>
      <span className={cn('rounded-sm', cursorClass)} style={{ background: 'var(--accent-9)' }} />
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function TextBlinkLoader({
  text,
  size,
  className,
}: {
  text: string;
  size: '1' | '2' | '3';
  className?: string;
}) {
  const textSize = size === '1' ? '1' : size === '3' ? '3' : '2';
  return (
    <span className={cn('mb-loader-text-blink inline-flex items-center font-medium', className)}>
      <Text size={textSize as '1' | '2' | '3'}>{text}</Text>
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function TextShimmerLoader({
  text,
  size,
  className,
}: {
  text: string;
  size: '1' | '2' | '3';
  className?: string;
}) {
  const textSize = size === '1' ? 'text-xs' : size === '3' ? 'text-base' : 'text-sm';
  return (
    <span className={cn('mb-shimmer inline-block font-medium', textSize, className)}>
      {text}
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

function LoadingDotsLoader({
  text,
  size,
  className,
}: {
  text: string;
  size: '1' | '2' | '3';
  className?: string;
}) {
  const textSize = size === '1' ? '1' : size === '3' ? '3' : '2';
  return (
    <span className={cn('mb-loader-loading-dots inline-flex items-center', className)}>
      <Text size={textSize as '1' | '2' | '3'} weight="medium">
        {text}
      </Text>
      <span className="inline-flex" aria-hidden="true">
        <span style={{ animationDelay: '200ms' }}>.</span>
        <span style={{ animationDelay: '400ms' }}>.</span>
        <span style={{ animationDelay: '600ms' }}>.</span>
      </span>
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

/**
 * Loader — animated loading indicator with ten visual variants.
 * `circular` and `classic` variants compose the `Spinner` atom; all others are CSS-only.
 * Every variant includes a visually-hidden "Loading" label for screen readers.
 * Use inside chat interfaces to signal a pending assistant response.
 * Keywords: loader, spinner, loading, animation, dots, wave, bars, terminal, shimmer, chat.
 */
export function Loader({
  variant = 'circular',
  size = '2',
  text = 'Thinking',
  className,
}: LoaderProps) {
  switch (variant) {
    case 'circular':
      return (
        <span className={cn('inline-flex items-center', className)}>
          <Spinner size={size} />
          <VisuallyHidden>Loading</VisuallyHidden>
        </span>
      );
    case 'classic':
      return (
        <span className={cn('inline-flex items-center', className)}>
          <Spinner size={size} />
          <VisuallyHidden>Loading</VisuallyHidden>
        </span>
      );
    case 'dots':
      return <DotsLoader size={size} className={className} />;
    case 'typing':
      return <TypingLoader size={size} className={className} />;
    case 'wave':
      return <WaveLoader size={size} className={className} />;
    case 'bars':
      return <BarsLoader size={size} className={className} />;
    case 'terminal':
      return <TerminalLoader size={size} className={className} />;
    case 'text-blink':
      return <TextBlinkLoader text={text} size={size} className={className} />;
    case 'text-shimmer':
      return <TextShimmerLoader text={text} size={size} className={className} />;
    case 'loading-dots':
      return <LoadingDotsLoader text={text} size={size} className={className} />;
    default:
      variant satisfies never;
      return (
        <span className={cn('inline-flex items-center', className)}>
          <Spinner size={size} />
          <VisuallyHidden>Loading</VisuallyHidden>
        </span>
      );
  }
}
