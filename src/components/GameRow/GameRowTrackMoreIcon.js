// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";

export const GameRowTrackMoreIcon = ({
  name,
  slug,
  isInMaintenance,
}: {
  name: string,
  slug: string,
  isInMaintenance: boolean,
}) => (
  <Flex.Item className="o-flex__item--no-shrink">
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_DETAILS}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <a href={`/play/${slug}`}>
        <MoreIcon className="t-color-chrome-dark-2 t-border-r--circle u-padding" />
      </a>
    </TrackClick>
  </Flex.Item>
);
