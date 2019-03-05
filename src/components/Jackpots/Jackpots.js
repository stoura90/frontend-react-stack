// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils/utils";
import { launchGame } from "Services/LaunchGameService";
import ScrollableListTitle from "Components/ScrollableListTitle";
import GameRow from "Components/GameRow/GameRow";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

export type Props = {
  jackpots: Array<Object>,
  className?: string,
  title: string,
};

export default class Jackpots extends PureComponent<Props> {
  static defaultProps = {
    jackpots: [],
    title: "",
  };

  render() {
    const { jackpots, title } = this.props;
    const columns = generateColumns(jackpots);

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing="md">
          {columns.map((column, i) => (
            <JackpotsColumn key={`jackpots-column-${i}`} column={column} />
          ))}
        </Scrollable>
      </div>
    );
  }
}

function JackpotsColumn({ column }) {
  return (
    <div className="c-jackpots-list-tile o-flex__item o-flex__item-fixed-size">
      <List
        items={column}
        render={jackpot => (
          <GameRow
            game={jackpot}
            onLaunchGame={() => launchGame({ slug: jackpot.slug })}
          />
        )}
      />
    </div>
  );
}
