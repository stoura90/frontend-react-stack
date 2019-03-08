

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GameRow_Game
// ====================================================

export type GameRow_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};

export type GameRow_Game_lobby = {
  bets: ?GameRow_Game_lobby_bets
};

export type GameRow_Game_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};

export type GameRow_Game = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?GameRow_Game_lobby,
  jackpotInfo: ?GameRow_Game_jackpotInfo,
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================