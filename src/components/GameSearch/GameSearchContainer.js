// @flow
import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { GameSearch } from "Components/GameSearch/GameSearch";
import {
  cmsPageSlug,
  gameSearchResults,
  gameSearchResultsCountSelector,
  initFetchGameSearchCount,
  isLoadingSelector,
  clearSearch,
  gameSearchQuerySelector,
} from "Models/gameSearch";
import { preloadFetchPlayerGames } from "Models/playerGames";
import { getField, fetchPageBySlug } from "Models/cms";

const GameSearchConnected = connect(
  createStructuredSelector({
    searchResults: gameSearchResults,
    searchResultsCount: gameSearchResultsCountSelector,
    loading: isLoadingSelector,
    inputPromptPlaceholder: getField({
      slug: cmsPageSlug,
      field: "input_prompt",
    }),
    query: gameSearchQuerySelector,
  }),
  {
    initFetchGameSearchCount,
    clearSearch,
    preloadFetchPlayerGames,
    fetchPageBySlug: () => fetchPageBySlug(cmsPageSlug),
  }
)(GameSearch);

type Props = {};

export const GameSearchContainer = (props: Props) => (
  <GameSearchConnected {...props} />
);
