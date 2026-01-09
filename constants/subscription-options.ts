import { APP_ICONS, CATEGORY_ICONS } from "./icon-mappings";

// ============================================================================
// Selection Types
// ============================================================================

export const SELECTION_TYPES = {
  APP: "APP",
  AMOUNT: "AMOUNT",
  CATEGORY: "CATEGORY",
  DATE: "DATE",
  FREQUENCY: "FREQUENCY",
  REMIND_ME: "REMIND_ME",
} as const;

export type SelectionType =
  (typeof SELECTION_TYPES)[keyof typeof SELECTION_TYPES];

// ============================================================================
// Bottom Sheet Identifiers
// ============================================================================

export const BOTTOM_SHEETS = {
  SUBSCRIPTION_FIELD_SELECTION: "SUBSCRIPTION_FIELD_SELECTION",
} as const;

// ============================================================================
// Apps
// ============================================================================

export interface App {
  id: string;
  name: string;
  logo: string; // Kept for backward compatibility, but icon config is preferred
  color: string;
  iconConfig?: (typeof APP_ICONS)[string]; // Icon configuration from icon-mappings
}

export const APPS: App[] = [
  {
    id: "netflix",
    name: "Netflix",
    logo: "N",
    color: "#E50914",
    iconConfig: APP_ICONS.netflix,
  },
  {
    id: "spotify",
    name: "Spotify",
    logo: "♪",
    color: "#1DB954",
    iconConfig: APP_ICONS.spotify,
  },
  {
    id: "nytimes",
    name: "New York Times",
    logo: "T",
    color: "#000",
    iconConfig: APP_ICONS.nytimes,
  },
  {
    id: "wsj",
    name: "Wall Street Journal",
    logo: "WSJ",
    color: "#666",
    iconConfig: APP_ICONS.wsj,
  },
  {
    id: "hulu",
    name: "Hulu",
    logo: "hulu",
    color: "#1CE783",
    iconConfig: APP_ICONS.hulu,
  },
  {
    id: "apple",
    name: "Apple",
    logo: "🍎",
    color: "#000",
    iconConfig: APP_ICONS.apple,
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "a",
    color: "#FF9900",
    iconConfig: APP_ICONS.amazon,
  },
  {
    id: "chase",
    name: "Chase.com",
    logo: "🏦",
    color: "#117ACA",
    iconConfig: APP_ICONS.chase,
  },
  {
    id: "disney",
    name: "Disney+",
    logo: "D",
    color: "#113CCF",
    iconConfig: APP_ICONS.disney,
  },
  {
    id: "hbo",
    name: "HBO Max",
    logo: "HBO",
    color: "#000",
    iconConfig: APP_ICONS.hbo,
  },
];

// ============================================================================
// Categories
// ============================================================================

export interface Category {
  id: string;
  name: string;
  icon: string; // Kept for backward compatibility, but iconConfig is preferred
  iconConfig?: (typeof CATEGORY_ICONS)[string]; // Icon configuration from icon-mappings
}

export const CATEGORIES: Category[] = [
  {
    id: "subscription",
    name: "Subscription",
    icon: "🔄",
    iconConfig: CATEGORY_ICONS.subscription,
  },
  {
    id: "utility",
    name: "Utility",
    icon: "🔧",
    iconConfig: CATEGORY_ICONS.utility,
  },
  {
    id: "card_payment",
    name: "Card Payment",
    icon: "💳",
    iconConfig: CATEGORY_ICONS.card_payment,
  },
  { id: "loan", name: "Loan", icon: "💰", iconConfig: CATEGORY_ICONS.loan },
  { id: "rent", name: "Rent", icon: "🏠", iconConfig: CATEGORY_ICONS.rent },
];

// ============================================================================
// Frequencies
// ============================================================================

export interface Frequency {
  id: string;
  name: string;
}

export const FREQUENCIES: Frequency[] = [
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
  { id: "annually", name: "Annually" },
];

// ============================================================================
// Remind Me Options
// ============================================================================

export interface RemindMeOption {
  id: string;
  name: string;
}

export const REMIND_ME_OPTIONS: RemindMeOption[] = [
  { id: "1_day", name: "1 day before" },
  { id: "2_days", name: "2 days before" },
  { id: "3_days", name: "3 days before" },
  { id: "1_week", name: "1 week before" },
];
