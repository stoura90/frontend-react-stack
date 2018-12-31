// @flow
import classNames from "classnames";
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";

import { EVENTS } from "Src/constants";
import { decodeString } from "Utils/index";
import PlayAction from "Components/GameTile/PlayAction";
import TemporaryUnavailable from "Components/GameTile/TemporaryUnavailable";
import TrackClick from "Components/TrackClick";

type Props = {
  name: string,
  slug: string,
  inMaintenanceMode: boolean,
  onLaunchGame: Function,
};

export const IN_MAINTENANCE_CLASS_NAME = "c-game-tile__overlay--maintenance";

const GameTileOverlay = ({
  name,
  slug,
  inMaintenanceMode,
  onLaunchGame,
}: Props) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      direction="vertical"
      className={classNames(
        "o-ratio__content c-game-tile__overlay",
        inMaintenanceMode && IN_MAINTENANCE_CLASS_NAME,
        "u-padding-vert--lg u-padding-horiz--md t-border-r--8"
      )}
    >
      <Text size="sm" className="t-color-white u-text-clamp u-font-weight-bold">
        {decodeString(name)}
      </Text>

      {inMaintenanceMode ? (
        <TemporaryUnavailable />
      ) : (
        <TrackClick eventName={EVENTS.GAME_LAUNCH} data={{ name }}>
          <PlayAction onLaunchGame={onLaunchGame} />
        </TrackClick>
      )}

      <TrackClick eventName={EVENTS.GAME_DETAILS} data={{ name }}>
        <a href={`/en/play/${slug}`} onMouseDown={e => e.preventDefault()}>
          <MoreIcon
            size="med"
            className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--sm"
          />
        </a>
      </TrackClick>
    </Flex>
  );
};

export default GameTileOverlay;
