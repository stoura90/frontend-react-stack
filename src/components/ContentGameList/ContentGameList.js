// @flow
import React, { PureComponent } from "react";
import GameListVertical from "Components/GameListVertical";
import TrackProvider from "Components/TrackProvider";

type Props = {
  /** The list of game ids. */
  ids: Array<string>,
};

class ContentGameList extends PureComponent<Props> {
  render() {
    const ids = this.props.ids || [];
    return (
      <div className="u-padding-horiz--lg u-margin-bottom--lg">
        <TrackProvider data={{ gameCategory: "Content Game List" }}>
          <GameListVertical ids={ids} />
        </TrackProvider>
      </div>
    );
  }
}

export default ContentGameList;
