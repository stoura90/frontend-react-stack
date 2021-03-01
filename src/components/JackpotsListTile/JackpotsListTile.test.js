// @flow

import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow";
import { JackpotsListTile } from "./JackpotsListTile";

describe("<JackpotsListTile />", () => {
  test("renders a <GameRow /> for each game", () => {
    const games = [
      {
        id: "1",
        slug: "one",
        backgroundImage: "string",
        gameStudio: "Some studio",
        lobby: null,
        logo: "string",
        name: "string",
        isInMaintenance: false,
        category: "string",
        liveCasinoId: "string",
        playBackground: "string",
      },
      {
        id: "2",
        slug: "two",
        backgroundImage: "string",
        gameStudio: "Some studio",
        lobby: null,
        logo: "string",
        name: "string",
        isInMaintenance: false,
        category: "string",
        liveCasinoId: "string",
        playBackground: "string",
      },
      {
        id: "3",
        slug: "three",
        backgroundImage: "string",
        gameStudio: "Some studio",
        lobby: null,
        logo: "string",
        name: "string",
        isInMaintenance: false,
        category: "string",
        liveCasinoId: "string",
        playBackground: "string",
      },
    ];
    const rendered = shallow(<JackpotsListTile games={games} />);

    expect(rendered.find(GameRow)).toHaveLength(games.length);
  });
});
