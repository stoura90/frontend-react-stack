// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import VirtualList from "Components/VirtualList";
import { PAGE_SIZE } from "Models/gameSearch";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

const ROW_HEIGHT = 80;

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: Array<any>,
  /** The function that triggers the action that fetches the next batch of games */
  fetchMoreRows: Function => Promise<any>,
  /** The total number of rows */
  rowCount: number,
  /** The element to render as a row  */
  renderItem: (game: string) => React.Node,
};

export class GamesVirtualList extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
  }

  scrollElement: HTMLElement | null;

  isRowLoaded = ({ index }: { index: number }) => {
    return Boolean(this.props.games[index]);
  };

  renderRow = ({
    key,
    index,
    style,
  }: {
    key: string,
    index: number,
    style: Object,
  }) => {
    if (!this.isRowLoaded({ index })) {
      return (
        <Flex
          className="u-padding-x--md"
          align="center"
          key={key}
          index={index}
          style={style}
        >
          <GameRowSkeleton />
        </Flex>
      );
    }

    return (
      <div
        className="u-padding-x--md u-padding-y t-border-bottom t-color-chrome-light-2 t-border--current-color"
        key={key}
        index={index}
        style={style}
      >
        {this.props.renderItem(this.props.games[index])}
      </div>
    );
  };

  render() {
    return (
      <VirtualList
        scrollElement={this.scrollElement}
        totalNumberOfRows={this.props.rowCount}
        rowHeight={ROW_HEIGHT}
        loadMoreRows={this.props.fetchMoreRows}
        isRowLoaded={this.isRowLoaded}
        rowRenderer={this.renderRow}
        pageSize={PAGE_SIZE}
      />
    );
  }
}
