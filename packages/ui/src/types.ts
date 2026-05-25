// Shared structural types for data-driven composite props (recipes/blocks/templates).
// Reused across composites so callers type their data arrays once. Re-exported from src/index.ts.

import type { ReactNode } from 'react';

/** A single crumb in a `Breadcrumb` trail. Omit `href` to mark the current page (rendered as text). */
export interface BreadcrumbItem {
  /** Visible crumb label. */
  readonly label: string;
  /** Destination; when omitted the crumb is the current page and renders without a link. */
  readonly href?: string;
}

/**
 * A primary navigation entry. Discriminated on `kind`: a `link` is a single destination;
 * a `menu` groups child links behind a trigger (rendered as a dropdown).
 */
export type NavItem =
  | {
      readonly kind: 'link';
      /** Visible label. */
      readonly label: string;
      /** Destination URL. */
      readonly href: string;
      /** Marks the link as the active route. */
      readonly active?: boolean;
    }
  | {
      readonly kind: 'menu';
      /** Trigger label. */
      readonly label: string;
      /** Child links revealed by the menu. */
      readonly items: readonly NavLink[];
    };

/** A plain label + href link, used inside `NavItem` menus and footer/sidebar groups. */
export interface NavLink {
  /** Visible label. */
  readonly label: string;
  /** Destination URL. */
  readonly href: string;
  /** Marks the link as the active route. */
  readonly active?: boolean;
}

/**
 * A `DataTable` column definition over a row type `TRow`. `cell` renders the cell for a row;
 * when omitted, `String(row[key])` is shown.
 */
export interface TableColumn<TRow> {
  /** Stable column key. */
  readonly key: string;
  /** Column header content. */
  readonly header: ReactNode;
  /** Renders the cell for a given row; defaults to stringifying `row[key]`. */
  readonly cell?: (row: TRow) => ReactNode;
  /** Optional explicit column width (any CSS width, e.g. `"12rem"`). */
  readonly width?: string;
  /** Aligns the column's text. Defaults to `"left"`. */
  readonly align?: 'left' | 'center' | 'right';
}

/** A single metric for `StatCard` / stat grids. */
export interface StatItem {
  /** Metric label, e.g. "Total subscribers". */
  readonly label: string;
  /** Metric value, e.g. "71,897". */
  readonly value: ReactNode;
  /** Optional unit/suffix rendered beside the value, e.g. "MRR". */
  readonly unit?: string;
  /** Optional change indicator rendered as a trend badge. */
  readonly delta?: {
    /** Display value, e.g. "12%". */
    readonly value: string;
    /** Trend direction; drives the badge color and arrow. */
    readonly trend: 'up' | 'down' | 'neutral';
  };
}
