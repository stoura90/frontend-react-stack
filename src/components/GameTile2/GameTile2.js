import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile";

export class GameTile2 extends PureComponent {
  render() {
    const { onLaunchGame, ...rest } = this.props;
    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        <GameTile {...rest} launchGame={onLaunchGame} />
      </Flex.Item>
    );
  }
}

export default GameTile2;
