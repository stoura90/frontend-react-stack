// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import JackpotsListTile from "Components/JackpotsListTile";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export type Props = {
  ids: Array<string>,
  className?: string,
  title: string,
  seeMore: string,
};

const mustDropWidgetId = "must-drop-jackpots-widget";

// we are bond to use "id" because of the cellRenderer method inside ScrollableListPaginated.js
const mustDropJackpotRenderer = ({ id: idsInColumn, i }) => {
  const isIdMustDropWidgetId = idsInColumn.indexOf(mustDropWidgetId) !== -1;

  return isIdMustDropWidgetId ? (
    <MustDropJackpotsWidget key={mustDropWidgetId} />
  ) : (
    <JackpotsListTile ids={idsInColumn} key={`must-drop-jackpots-tile-${i}`} />
  );
};

export default class MustDropJackpotsList extends PureComponent<Props> {
  render() {
    const { ids, title, seeMore } = this.props;
    const idsByColumns = generateColumns(ids);
    const seeMoreUrl = "/games/must-drop-jackpots";
    const scrollableChildren = [
      <div
        className="u-padding-y--sm u-height--full"
        key="must-drop-jackpots-widget"
      >
        <MustDropJackpotsWidget />
      </div>,
      ...idsByColumns.map((id, i) => mustDropJackpotRenderer({ id, i })),
    ];

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
            <div className="u-padding-top--xlg">
              <ScrollableListTitleRow
                paddingLeft
                seeMore={{ text: seeMore, url: seeMoreUrl }}
                title={title}
              />
              <Scrollable
                itemClassName="c-jackpots-list-tile"
                padding={PADDING_PER_DEVICE}
              >
                {scrollableChildren}
              </Scrollable>
            </div>
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: [[mustDropWidgetId], ...idsByColumns],
              }}
              Component={mustDropJackpotRenderer}
              className="c-jackpots-list-tile u-height--full"
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={315}
              seeMore={{
                text: seeMore,
                url: seeMoreUrl,
              }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
