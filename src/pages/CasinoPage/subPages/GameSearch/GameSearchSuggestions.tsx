import * as React from "react";
import Text from "@casumo/cmp-text";
import TrackProvider from "Components/TrackProvider";
import { EVENT_LOCATIONS, EVENT_PROPS } from "Src/constants";
import { GameList } from "./GameList";
import type { TGameSearchSuggestions as TProps } from "./GameSearch.types";

export const GameSearchSuggestions: React.FC<TProps> = ({
  games,
  title,
}: TProps) => (
  <>
    <Text
      size="md"
      className="u-font-weight-black t-color-grey-50 u-padding-left u-padding-top--xlg u-padding-bottom--md"
    >
      {title}
    </Text>
    <TrackProvider
      data={{
        [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.SUGGESTED_GAMES,
      }}
    >
      <GameList games={games} />
    </TrackProvider>
  </>
);
