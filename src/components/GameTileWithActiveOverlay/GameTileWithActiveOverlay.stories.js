import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import GameTileWithActiveOverlayConnected from "Components/GameTileWithActiveOverlay";
import GameTileWithActiveOverlay from "Components/GameTileWithActiveOverlay/GameTileWithActiveOverlay";
import MockStore from "Components/MockStore";
import game from "Components/GameTile/__mocks__/Game.json";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameTileWithActiveOverlay", module);

if (isNotChromatic) {
  stories.add("Default tile with active overlay (Connected)", () => {
    return (
      <div style={{ maxWidth: "170px" }}>
        <MockStore>
          <GameTileWithActiveOverlayConnected id={game.slug} />
        </MockStore>
      </div>
    );
  });
}

stories.add("Default tile with active overlay", () => {
  return (
    <div style={{ maxWidth: "170px" }}>
      <MockStore>
        <GameTileWithActiveOverlay
          game={game}
          onLaunchGame={action(game.name)}
        />
      </MockStore>
    </div>
  );
});
