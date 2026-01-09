import { IconFamily } from "@/components/icon";

export interface IconConfig {
  name: string;
  family: IconFamily;
  fallback?: string; // Fallback text/emoji if icon not found
}

/**
 * Icon mappings for apps
 * Can be easily extended with new apps
 */
export const APP_ICONS: Record<string, IconConfig> = {
  netflix: {
    name: "movie",
    family: "MaterialIcons",
    fallback: "N",
  },
  spotify: {
    name: "music-note",
    family: "MaterialIcons",
    fallback: "♪",
  },
  nytimes: {
    name: "article",
    family: "MaterialIcons",
    fallback: "T",
  },
  wsj: {
    name: "description",
    family: "MaterialIcons",
    fallback: "WSJ",
  },
  hulu: {
    name: "play-circle",
    family: "MaterialIcons",
    fallback: "hulu",
  },
  apple: {
    name: "apple",
    family: "MaterialCommunityIcons",
    fallback: "🍎",
  },
  amazon: {
    name: "shopping-bag",
    family: "MaterialIcons",
    fallback: "a",
  },
  chase: {
    name: "account-balance",
    family: "MaterialIcons",
    fallback: "🏦",
  },
  disney: {
    name: "castle",
    family: "MaterialCommunityIcons",
    fallback: "D",
  },
  hbo: {
    name: "tv",
    family: "MaterialIcons",
    fallback: "HBO",
  },
};

/**
 * Icon mappings for categories
 * Can be easily extended with new categories
 */
export const CATEGORY_ICONS: Record<string, IconConfig> = {
  subscription: {
    name: "autorenew",
    family: "MaterialIcons",
    fallback: "🔄",
  },
  utility: {
    name: "build",
    family: "MaterialIcons",
    fallback: "🔧",
  },
  card_payment: {
    name: "credit-card",
    family: "MaterialIcons",
    fallback: "💳",
  },
  loan: {
    name: "attach-money",
    family: "MaterialIcons",
    fallback: "💰",
  },
  rent: {
    name: "home",
    family: "MaterialIcons",
    fallback: "🏠",
  },
};

/**
 * Common UI icons
 */
export const UI_ICONS = {
  search: {
    name: "search",
    family: "MaterialIcons" as IconFamily,
  },
  checkmark: {
    name: "check",
    family: "MaterialIcons" as IconFamily,
  },
  close: {
    name: "close",
    family: "MaterialIcons" as IconFamily,
  },
  arrowBack: {
    name: "arrow-back",
    family: "MaterialIcons" as IconFamily,
  },
  arrowForward: {
    name: "arrow-forward",
    family: "MaterialIcons" as IconFamily,
  },
  done: {
    name: "done",
    family: "MaterialIcons" as IconFamily,
  },
};
