// @flow
import React, { PureComponent } from "react";
import { isEmpty, isNil } from "ramda";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableList from "Components/ScrollableList";
import GameTileExclusiveContainer from "Components/GameTileExclusive";
import LiveCasinoCardContainer from "Components/LiveCasinoCard";
import GameTileContainer from "Components/GameTile";
import GameTileWithActiveOverlay from "Components/GameTileWithActiveOverlay";
import GameListHorizontalSkeleton from "Components/GameListHorizontal/GameListHorizontalSkeleton";

export type GameListObject = {
  id: string,
  title: string,
  games: Array<string>,
};

export type Props = {
  /** The game list object got from the store. */
  list: GameListObject,
  isLoading: boolean,
};

export const ITEM_RENDERERS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameTileExclusiveContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: GameTileWithActiveOverlay,
  default: GameTileContainer,
};

export const ITEM_SPACING = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "md",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: "md",
  default: "default",
};

export default class GameListHorizontal extends PureComponent<Props> {
  render() {
    const { list, isLoading } = this.props;
    const { id, title, games: gameIds } = list;
    const spacing = ITEM_SPACING[id] || ITEM_SPACING.default;
    const Component = ITEM_RENDERERS[id] || ITEM_RENDERERS.default;
    const hasNoGames = isEmpty(gameIds) || isNil(gameIds);

    if (isLoading) {
      return <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />;
    }

    if (hasNoGames) {
      return null;
    }

    return (
      <ScrollableList
        title={title}
        itemIds={gameIds}
        Component={Component}
        spacing={spacing}
      />
    );
  }
}
