import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders the visually-hidden "Loading" label for the default (circular) variant', () => {
    renderWithTheme(<Loader />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the visually-hidden "Loading" label for the dots variant', () => {
    renderWithTheme(<Loader variant="dots" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the visually-hidden "Loading" label for the wave variant', () => {
    renderWithTheme(<Loader variant="wave" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the visually-hidden "Loading" label for the bars variant', () => {
    renderWithTheme(<Loader variant="bars" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the visually-hidden "Loading" label for the terminal variant', () => {
    renderWithTheme(<Loader variant="terminal" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the text prop for text-blink variant', () => {
    renderWithTheme(<Loader variant="text-blink" text="Generating" />);
    expect(screen.getByText('Generating')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the text prop for text-shimmer variant', () => {
    renderWithTheme(<Loader variant="text-shimmer" text="Generating response…" />);
    expect(screen.getByText('Generating response…')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the text prop for loading-dots variant', () => {
    renderWithTheme(<Loader variant="loading-dots" text="Thinking" />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('defaults text to "Thinking" for text-based variants', () => {
    renderWithTheme(<Loader variant="text-blink" />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
  });
});
