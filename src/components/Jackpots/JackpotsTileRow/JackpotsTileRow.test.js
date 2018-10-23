import React from "react";
import { shallow } from "enzyme";
import JackpotsTileRow from "./JackpotsTileRow";

describe("<JackpotsTileRow />", () => {
  let rendered;
  let launchGame;
  let game;

  beforeEach(() => {
    launchGame = jest.fn();
    game = {
      slug: "foo-bar",
      name: "Foo Bar",
      logo: "http://foo.com/logo.jpg",
      logoBackground: "http://foo.com/logo-background.jpg",
      jackpotInfo: {
        formattedJackpotAmount: "€ 1,000,000",
      },
    };
    rendered = shallow(<JackpotsTileRow game={game} launchGame={launchGame} />);
  });

  test("renders a thumbnail for the component", () => {
    const thumbnail = rendered.find("ImageLazy");
    const thumbnailProps = thumbnail.length ? thumbnail.first().props() : {};

    expect(thumbnail.length).toBe(1);
    expect(thumbnailProps.src).toBe(game.logoBackground);
    expect(thumbnailProps.mark).toBe(game.logo);
    expect(thumbnailProps.alt).toBe(game.name);
  });

  test("renders the formatted jackpot amount", () => {
    expect(rendered.html()).toMatch(game.jackpotInfo.formattedJackpotAmount);
  });

  test("renders a play icon", () => {
    const playIcon = rendered.find("PlayIcon");

    expect(playIcon.length).toBe(1);
  });

  test("clicking on the play icon launches the game", () => {
    const playIcon = rendered.find("PlayIcon");

    playIcon.simulate("click");
    expect(launchGame.mock.calls.length).toBe(1);
    expect(launchGame).lastCalledWith({ slug: game.slug });
  });
});
