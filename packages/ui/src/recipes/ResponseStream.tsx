'use client';

import { type ElementType, useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Streaming render mode for ResponseStream. */
export type ResponseStreamMode = 'typewriter' | 'fade';

/** Options for the useTextStream hook. */
export interface UseTextStreamOptions {
  /** The text content to stream — either a static string or an async iterable of chunks. */
  readonly textStream: string | AsyncIterable<string>;
  /** Streaming speed on a 1–100 scale (1 = slowest, 100 = fastest). Defaults to `20`. */
  readonly speed?: number;
  /** Rendering mode: `'typewriter'` (character reveal) or `'fade'` (per-word fade-in). Defaults to `'typewriter'`. */
  readonly mode?: ResponseStreamMode;
  /** Called once streaming is complete. */
  readonly onComplete?: () => void;
  /** Override fade animation duration in ms (overrides speed). */
  readonly fadeDuration?: number;
  /** Override delay between word segments in ms (overrides speed). */
  readonly segmentDelay?: number;
  /** Override characters revealed per animation frame in typewriter mode (overrides speed). */
  readonly characterChunkSize?: number;
  /** Called when an error occurs during async streaming. */
  readonly onError?: (error: unknown) => void;
}

/** State and controls returned from useTextStream. */
export interface UseTextStreamResult {
  /** The text revealed so far. */
  readonly displayedText: string;
  /** Whether all text has been revealed. */
  readonly isComplete: boolean;
  /** Segmented words (populated in fade mode). */
  readonly segments: ReadonlyArray<{ readonly text: string; readonly index: number }>;
  /** Returns the computed fade duration in ms. */
  readonly getFadeDuration: () => number;
  /** Returns the computed per-segment delay in ms. */
  readonly getSegmentDelay: () => number;
  /** Resets the stream back to the start. */
  readonly reset: () => void;
  /** Restarts streaming from the beginning. */
  readonly startStreaming: () => void;
  /** Pauses the typewriter animation. */
  readonly pause: () => void;
  /** Resumes a paused typewriter animation. */
  readonly resume: () => void;
}

/** Props for the ResponseStream component. */
export interface ResponseStreamProps {
  /** The text content to stream — either a static string or an async iterable of chunks. */
  readonly textStream: string | AsyncIterable<string>;
  /** Rendering mode. Defaults to `'typewriter'`. */
  readonly mode?: ResponseStreamMode;
  /** Streaming speed on a 1–100 scale. Defaults to `20`. */
  readonly speed?: number;
  /** HTML element to render as the container. Defaults to `'div'`. */
  readonly as?: ElementType;
  /** Called once streaming is complete. */
  readonly onComplete?: () => void;
  /** Override fade animation duration in ms. */
  readonly fadeDuration?: number;
  /** Override delay between word segments in ms. */
  readonly segmentDelay?: number;
  /** Override characters per animation frame in typewriter mode. */
  readonly characterChunkSize?: number;
  /** Extra class names merged onto the container element. */
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// useTextStream hook — ported from prompt-kit, adapted to kit conventions.
// ---------------------------------------------------------------------------

/**
 * useTextStream — streams a string or AsyncIterable character-by-character (typewriter)
 * or word-by-word (fade). Uses requestAnimationFrame + Intl.Segmenter for smooth rendering.
 * Keywords: stream, typewriter, fade, AI, chat, response, animate.
 */
export function useTextStream({
  textStream,
  speed = 20,
  mode = 'typewriter',
  onComplete,
  fadeDuration,
  segmentDelay,
  characterChunkSize,
  onError,
}: UseTextStreamOptions): UseTextStreamResult {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [segments, setSegments] = useState<Array<{ text: string; index: number }>>([]);

  const speedRef = useRef(speed);
  const modeRef = useRef(mode);
  const currentIndexRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const fadeDurationRef = useRef(fadeDuration);
  const segmentDelayRef = useRef(segmentDelay);
  const characterChunkSizeRef = useRef(characterChunkSize);
  const streamRef = useRef<AbortController | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    speedRef.current = speed;
    modeRef.current = mode;
    fadeDurationRef.current = fadeDuration;
    segmentDelayRef.current = segmentDelay;
    characterChunkSizeRef.current = characterChunkSize;
  }, [speed, mode, fadeDuration, segmentDelay, characterChunkSize]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const getChunkSize = useCallback(() => {
    if (typeof characterChunkSizeRef.current === 'number') {
      return Math.max(1, characterChunkSizeRef.current);
    }
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    if (modeRef.current === 'typewriter') {
      if (normalizedSpeed < 25) return 1;
      return Math.max(1, Math.round((normalizedSpeed - 25) / 10));
    }
    return 1;
  }, []);

  const getProcessingDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === 'number') {
      return Math.max(0, segmentDelayRef.current);
    }
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    return Math.max(1, Math.round(100 / Math.sqrt(normalizedSpeed)));
  }, []);

  const getFadeDuration = useCallback(() => {
    if (typeof fadeDurationRef.current === 'number') return Math.max(10, fadeDurationRef.current);
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    return Math.round(1000 / Math.sqrt(normalizedSpeed));
  }, []);

  const getSegmentDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === 'number') return Math.max(0, segmentDelayRef.current);
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    return Math.max(1, Math.round(100 / Math.sqrt(normalizedSpeed)));
  }, []);

  const updateSegments = useCallback((text: string) => {
    if (modeRef.current === 'fade') {
      try {
        const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'word' });
        const segmentIterator = segmenter.segment(text);
        const newSegments = Array.from(segmentIterator).map((segment, index) => ({
          text: segment.segment,
          index,
        }));
        setSegments(newSegments);
      } catch (error) {
        const newSegments = text
          .split(/(\s+)/)
          .filter(Boolean)
          .map((word, index) => ({ text: word, index }));
        setSegments(newSegments);
        onError?.(error);
      }
    }
  }, []);

  const markComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      setIsComplete(true);
      onCompleteRef.current?.();
    }
  }, []);

  const reset = useCallback(() => {
    currentIndexRef.current = 0;
    setDisplayedText('');
    setSegments([]);
    setIsComplete(false);
    completedRef.current = false;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const processStringTypewriter = useCallback(
    (text: string) => {
      let lastFrameTime = 0;

      const streamContent = (timestamp: number) => {
        const delay = getProcessingDelay();
        if (delay > 0 && timestamp - lastFrameTime < delay) {
          animationRef.current = requestAnimationFrame(streamContent);
          return;
        }
        lastFrameTime = timestamp;

        if (currentIndexRef.current >= text.length) {
          markComplete();
          return;
        }

        const chunkSize = getChunkSize();
        const endIndex = Math.min(currentIndexRef.current + chunkSize, text.length);
        const newDisplayedText = text.slice(0, endIndex);

        setDisplayedText(newDisplayedText);
        if (modeRef.current === 'fade') {
          updateSegments(newDisplayedText);
        }

        currentIndexRef.current = endIndex;

        if (endIndex < text.length) {
          animationRef.current = requestAnimationFrame(streamContent);
        } else {
          markComplete();
        }
      };

      animationRef.current = requestAnimationFrame(streamContent);
    },
    [getProcessingDelay, getChunkSize, updateSegments, markComplete],
  );

  const processAsyncIterable = useCallback(
    async (stream: AsyncIterable<string>) => {
      const controller = new AbortController();
      streamRef.current = controller;

      let displayed = '';

      try {
        for await (const chunk of stream) {
          if (controller.signal.aborted) return;
          displayed += chunk;
          setDisplayedText(displayed);
          updateSegments(displayed);
        }
        markComplete();
      } catch (error) {
        markComplete();
        onError?.(error);
      }
    },
    [updateSegments, markComplete, onError],
  );

  const startStreaming = useCallback(() => {
    reset();

    if (typeof textStream === 'string') {
      processStringTypewriter(textStream);
    } else if (textStream) {
      void processAsyncIterable(textStream);
    }
  }, [textStream, reset, processStringTypewriter, processAsyncIterable]);

  const pause = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof textStream === 'string' && !isComplete) {
      processStringTypewriter(textStream);
    }
  }, [textStream, isComplete, processStringTypewriter]);

  useEffect(() => {
    startStreaming();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (streamRef.current) {
        streamRef.current.abort();
      }
    };
  }, [textStream, startStreaming]);

  return {
    displayedText,
    isComplete,
    segments,
    getFadeDuration,
    getSegmentDelay,
    reset,
    startStreaming,
    pause,
    resume,
  };
}

// ---------------------------------------------------------------------------
// ResponseStream component
// ---------------------------------------------------------------------------

/**
 * ResponseStream — renders a text stream progressively using typewriter or per-word fade animation.
 * Wraps an `aria-live="polite"` region so screen readers announce streamed content.
 * Use for AI assistant responses, code generation output, or any real-time text reveal.
 * Keywords: stream, typewriter, fade, AI, chat, response, animate, live region.
 */
export function ResponseStream({
  textStream,
  mode = 'typewriter',
  speed = 20,
  as: Container = 'div',
  onComplete,
  fadeDuration,
  segmentDelay,
  characterChunkSize,
  className,
}: ResponseStreamProps) {
  const { displayedText, isComplete, segments, getSegmentDelay } = useTextStream({
    textStream,
    speed,
    mode,
    onComplete,
    fadeDuration,
    segmentDelay,
    characterChunkSize,
  });

  const renderContent = () => {
    switch (mode) {
      case 'typewriter':
        return <span className={isComplete ? undefined : 'mb-stream-cursor'}>{displayedText}</span>;

      case 'fade':
        return (
          <div className="relative">
            {segments.map((segment, idx) => {
              const isWhitespace = /^\s+$/.test(segment.text);
              return (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable index within a fixed streaming snapshot
                  key={idx}
                  className={cn('mb-stream-fade-segment', isWhitespace && 'whitespace-pre')}
                  style={{ animationDelay: `${idx * getSegmentDelay()}ms` }}
                >
                  {segment.text}
                </span>
              );
            })}
          </div>
        );

      default:
        mode satisfies never;
        return <>{displayedText}</>;
    }
  };

  return (
    <Container aria-live="polite" aria-atomic="false" className={cn(className)}>
      {renderContent()}
    </Container>
  );
}
