import React from "react";
import { PlayerIcon } from "@casumo/cmp-icons";

export default function GameListPlayers({ number }) {
  return (
    <div className="o-flex-align--center">
      <PlayerIcon className="u-margin-vert t-color-grey" size="sml" />
      <span className="u-margin-left--micro u-margin-vert u-font-weight-bold t-color-grey-dark-2">
        {number}
      </span>
    </div>
  );
}
