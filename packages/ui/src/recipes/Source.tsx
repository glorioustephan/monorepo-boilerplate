'use client';

import { createContext, useContext, type ReactNode } from 'react';

import { HoverCard, Link, Text } from '../components';
import { cn } from '../lib/cn';

interface SourceContextValue {
  readonly href: string;
  readonly domain: string;
}

const SourceContext = createContext<SourceContextValue | null>(null);

function useSourceContext(): SourceContextValue {
  const ctx = useContext(SourceContext);
  if (!ctx) throw new Error('Source.* must be used inside <Source>');
  return ctx;
}

/** Props for the `Source` compound root. */
export interface SourceProps {
  /** The URL this source links to. Used to derive the domain label and hover card link. */
  readonly href: string;
  /** Compound children — compose `Source.Trigger` and `Source.Content`. */
  readonly children: ReactNode;
}

/** Props for `Source.Trigger` — the inline citation chip. */
export interface SourceTriggerProps {
  /** Override the chip label. Defaults to the hostname (www. stripped). */
  readonly label?: string | number;
  /** Show a Google favicon beside the label. Default `false`. */
  readonly showFavicon?: boolean;
  readonly className?: string;
}

/** Props for `Source.Content` — the hover card body. */
export interface SourceContentProps {
  /** Card heading. */
  readonly title: string;
  /** Card supporting text. */
  readonly description: string;
  readonly className?: string;
}

function SourceRoot({ href, children }: SourceProps) {
  let domain = '';
  try {
    domain = new URL(href).hostname;
  } catch {
    domain = href.split('/').pop() ?? href;
  }

  return (
    <SourceContext.Provider value={{ href, domain }}>
      <HoverCard.Root openDelay={150} closeDelay={0}>
        {children}
      </HoverCard.Root>
    </SourceContext.Provider>
  );
}

function SourceTrigger({ label, showFavicon = false, className }: SourceTriggerProps) {
  const { href, domain } = useSourceContext();
  const labelToShow = label ?? domain.replace('www.', '');

  // HoverCard.Trigger from Radix Themes already renders its child with asChild=true internally.
  // We pass Link directly — no explicit asChild prop needed on the Radix wrapper.
  return (
    <HoverCard.Trigger>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('mb-source-trigger', showFavicon ? 'pr-2 pl-1' : 'px-1', className)}
      >
        {showFavicon && (
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(href)}`}
            alt=""
            width={14}
            height={14}
            className="size-3.5 rounded-full"
          />
        )}
        <span className="truncate tabular-nums text-center font-normal">{labelToShow}</span>
      </Link>
    </HoverCard.Trigger>
  );
}

function SourceContent({ title, description, className }: SourceContentProps) {
  const { href, domain } = useSourceContext();

  return (
    <HoverCard.Content className={cn('w-80 p-0', className)}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-1.5">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(href)}`}
            alt=""
            className="size-4 rounded-full"
            width={16}
            height={16}
          />
          <Text size="2" className="truncate">
            {domain.replace('www.', '')}
          </Text>
        </div>
        <Text size="2" weight="medium" className="line-clamp-2">
          {title}
        </Text>
        <Text size="2" color="gray" className="line-clamp-2">
          {description}
        </Text>
      </a>
    </HoverCard.Content>
  );
}

/**
 * Source — inline citation chip with a hover card preview. Compound: `Source.Trigger` renders the
 * inline pill (keyboard-focusable link); `Source.Content` renders the hover card with favicon,
 * domain, title, and description. Use for AI-generated responses that cite external sources.
 * Keywords: citation, source, hover card, reference, link preview, chat.
 */
export const Source = Object.assign(SourceRoot, {
  Trigger: SourceTrigger,
  Content: SourceContent,
});

export { SourceTrigger, SourceContent };
