

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FavouriteSportsSelectorContextCompetitionSuggestions
// ====================================================

export type FavouriteSportsSelectorContextCompetitionSuggestions_topCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};

export type FavouriteSportsSelectorContextCompetitionSuggestions = {
  /**
   * TopCompetitions returns the most popular subgroups of a group, currently based on number of events
   */
  topCompetitions: Array<FavouriteSportsSelectorContextCompetitionSuggestions_topCompetitions>
};

export type FavouriteSportsSelectorContextCompetitionSuggestionsVariables = {
  id: number
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type SearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";

/**
 * 
 */
export type Modal = "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

//==============================================================
// END Enums and Input Objects
//==============================================================