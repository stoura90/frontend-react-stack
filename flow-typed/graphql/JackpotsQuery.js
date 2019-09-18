/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: JackpotsQuery
// ====================================================

export type JackpotsQuery_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};

export type JackpotsQuery_gamesList_games_lobby = {
  bets: ?JackpotsQuery_gamesList_games_lobby_bets
};

export type JackpotsQuery_gamesList_games_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};

export type JackpotsQuery_gamesList_games = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?JackpotsQuery_gamesList_games_lobby,
  jackpotInfo: ?JackpotsQuery_gamesList_games_jackpotInfo,
};

export type JackpotsQuery_gamesList = {
  title: ?string,
  games: ?Array<?JackpotsQuery_gamesList_games>,
};

export type JackpotsQuery = {
  gamesList: ?JackpotsQuery_gamesList
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type PlayerValuableState = "Consumed" | "Expired" | "Fresh" | "Locked" | "Used";

/**
 * 
 */
export type ValuableType = "cash" | "deposit" | "spins" | "sport";

/**
 * 
 */
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";

/**
 * 
 */
export type RequirementType = "deposit" | "wager";

/**
 * 
 */
export type Vertical = "CASINO" | "SPORTS";

/**
 * 
 */
export type SearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";

/**
 * 
 */
export type Modal = "BETTING_GLOSSARY" | "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================