export const ROUTE_IDS = {
  TOP_LISTS: "TOP_LISTS",
  GAMES_SEARCH: "GAMES_SEARCH",
  MUST_DROP_JACKPOTS: "MUST_DROP_JACKPOTS",
  GAME_PROVIDER_GAMES: "GAME_PROVIDER_GAMES",
  LIVE_CASINO_DETAILS: "LIVE_CASINO_DETAILS",
  PROMOTIONS: "PROMOTIONS",
  PROMOTION_DETAILS: "PROMOTION_DETAILS",
  PLAYER_DASHBOARD: "PLAYER_DASHBOARD",
  PLAYER_VALUABLES: "PLAYER_VALUABLES",
  PLAYER_SETTINGS: "PLAYER_SETTINGS",
  PLAYER_SETTINGS_NOTIFICATIONS: "PLAYER_SETTINGS_NOTIFICATIONS",
  PLAYER_SETTINGS_ACCOUNT_DETAILS: "PLAYER_SETTINGS_ACCOUNT_DETAILS",
  PLAYER_SETTINGS_REALITY_CHECK: "PLAYER_SETTINGS_REALITY_CHECK",
  SPORTS: "SPORTS",
  TRANSACTION_HISTORY: "TRANSACTION_HISTORY",
  TRANSACTION_ANNUAL_OVERVIEW: "TRANSACTION_ANNUAL_OVERVIEW",
};
export const ROUTES = {
  [ROUTE_IDS.TOP_LISTS]: "{{games}}/top",
  [ROUTE_IDS.GAMES_SEARCH]: "{{games}}/search",
  [ROUTE_IDS.MUST_DROP_JACKPOTS]: "{{games}}/must-drop-jackpots",
  [ROUTE_IDS.GAME_PROVIDER_GAMES]: "{{games}}/provider/:provider",
  [ROUTE_IDS.LIVE_CASINO_DETAILS]: "{{games}}/live-casino-details",
  [ROUTE_IDS.PROMOTIONS]: "promotions",
  [ROUTE_IDS.PROMOTION_DETAILS]: "promotions/:slug",
  [ROUTE_IDS.PLAYER_DASHBOARD]: "player",
  [ROUTE_IDS.PLAYER_VALUABLES]: "player/valuables",
  [ROUTE_IDS.PLAYER_SETTINGS]: "player/settings",
  [ROUTE_IDS.PLAYER_SETTINGS_NOTIFICATIONS]: "player/settings/notifications",
  [ROUTE_IDS.PLAYER_SETTINGS_ACCOUNT_DETAILS]:
    "player/settings/account-details",
  [ROUTE_IDS.PLAYER_SETTINGS_REALITY_CHECK]: "player/settings/reality-check",
  [ROUTE_IDS.SPORTS]: "sports",
  [ROUTE_IDS.TRANSACTION_HISTORY]: "cash/history",
  [ROUTE_IDS.TRANSACTION_ANNUAL_OVERVIEW]:
    "cash/history/transactions-annual-overview/:selectedYear",
};
export const TRANSLATED_ROUTES = {
  GAMES: {
    sv: "spel",
    fi: "pelit",
    no: "spillvelger",
    de: "spiele",
    DEFAULT: "games",
  },
  PLAY: {
    sv: "spela",
    fi: "pelaa",
    no: "spill",
    de: "spielen",
    DEFAULT: "play",
  },
};