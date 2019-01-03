// @flow
import React from "react";
import { connect } from "react-redux";
import {
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema";
import { market as marketSelector } from "Models/handshake";
import { getField } from "Models/cms";
import { GAME_LIST_IDS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import MustDropJackpotsList from "./MustDropJackpotsList";

type Props = {
  id: string,
  title: string,
};

const MustDropJackpotListConnected = connect(state => ({
  ids: mustDropJackpotsIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
  seeMore: getField({
    slug: `built-pages.top-lists-${marketSelector(state)}`,
    field: "more_link",
  })(state),
}))(MustDropJackpotsList);

const MustDropJackpotListContainer = ({ id, title }: Props) => {
  return (
    <TrackProvider data={{ gameCategory: "Must Drop Jackpots - Top Lists" }}>
      <MustDropJackpotListConnected id={id} title={title} />
    </TrackProvider>
  );
};

export default MustDropJackpotListContainer;
