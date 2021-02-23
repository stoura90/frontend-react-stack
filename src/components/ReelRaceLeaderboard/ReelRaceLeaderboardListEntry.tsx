// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { LaurelPosition } from "./LaurelPosition";
import { Prize } from "./Prize";

import "./ReelRaceLeaderboardListEntry.scss";

type Props = {
  position: number,
  text: string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  prize?: ?string,
  points: number,
  highlighted?: boolean,
  className?: string,
  showLaurel?: boolean,
  inverted?: boolean,
};

export const ReelRaceLeaderboardListEntry = React.forwardRef<
  Props,
  HTMLDivElement
>(
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ position, text, prize, showLa... Remove this comment to see the full error message
  (
    {
      position,
      text,
      prize,
      showLaurel,
      points,
      highlighted,
      inverted,
      className,
    }: Props,
    ref: React.Ref<any>
  ) => (
    <Flex
      containerRef={ref}
      align="center"
      className={cx(
        "c-reel-race-leaderboard-list-entry",
        "u-width--full u-padding-y--sm u-padding-right--md u-padding-left",
        "t-opacity-background-100",
        {
          "t-background-yellow-30 t-border-yellow-30": highlighted,
          "t-background-white t-border-grey-5": !inverted && !highlighted,
          "t-color-black": !inverted || highlighted,
          "t-color-white t-background-grey-90 t-border-grey-90":
            inverted && !highlighted,
        },
        className
      )}
    >
      <Flex.Item>
        <LaurelPosition
          position={position}
          highlighted={highlighted}
          showLaurel={showLaurel}
          inverted={inverted}
        />
      </Flex.Item>
      <Flex.Block>
        <Text
          tag="div"
          className={cx({
            "u-font-weight-bold": highlighted,
          })}
        >
          {text}
        </Text>
      </Flex.Block>
      <Flex.Item>
        {prize && <Prize prize={prize} highlighted={highlighted} />}
      </Flex.Item>
      <Flex.Item>
        <Text
          tag="div"
          className="u-font-weight-bold u-margin-left u-width--2xlg u-text-align-right"
        >
          {points}
        </Text>
      </Flex.Item>
    </Flex>
  )
);
