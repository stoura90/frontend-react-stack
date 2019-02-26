

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserNavigation
// ====================================================

export type UserNavigation_userNavigation_groups = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,
  /**
   * Normalized name of the group
   */
  termKey: string,
  /**
   * Emoji flag representing the country this event takes place in, if available
   */
  flagEmoji: ?string,
};

export type UserNavigation_userNavigation = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,
  /**
   * Normalized name of the group
   */
  termKey: string,
  /**
   * Emoji flag representing the country this event takes place in, if available
   */
  flagEmoji: ?string,
  /**
   * The icon for the sport group
   */
  icon: ?string,
  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items, instead of just popular ones
   */
  canSelectSubgroups: boolean,
  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<UserNavigation_userNavigation_groups>,
};

export type UserNavigation = {
  userNavigation: Array<UserNavigation_userNavigation>
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