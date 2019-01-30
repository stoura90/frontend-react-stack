// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { gameSearchQuery } from "Models/gameSearch";
import GameRowSearch from "Components/GameRowSearch/GameRowSearch";

const GameRowSearchConnected = connect(
  (state, { slug }) => ({
    game: gameSelector(slug)(state),
    query: gameSearchQuery(state),
  }),
  (dispatch, { slug }) => ({
    onLaunchGame: () => dispatch(launchGame(slug)),
  })
)(GameRowSearch);

type Props = {
  /** The slug of the game to render */
  slug: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
};

const GameRowSearchContainer = ({ slug, highlightSearchQuery }: Props) => (
  <GameRowSearchConnected
    slug={slug}
    highlightSearchQuery={highlightSearchQuery}
  />
);

export default GameRowSearchContainer;
