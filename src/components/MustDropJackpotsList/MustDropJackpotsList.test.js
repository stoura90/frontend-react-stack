import React from "react";
import { shallow } from "enzyme";
import MustDropJackpotsList from "Components/MustDropJackpotsList/MustDropJackpotsList";

describe("<MustDropJackpotsList />", () => {
  let rendered;
  let ids;

  beforeEach(() => {
    ids = ["1", "2", "3", "4", "5", "6", "7"];
    rendered = shallow(<MustDropJackpotsList ids={ids} />);
  });

  test("renders a <ScrollableListTitle /> component", () => {
    expect(rendered.find("ScrollableListTitle").length).toBe(1);
  });

  test("renders tiles for every 3 game", () => {
    expect(rendered.find("MustDropJackpotsListTile").length).toBe(3);
  });

  test("passes down jackpot-ids to the tiles", () => {
    const firstTile = rendered.find("MustDropJackpotsListTile").first();

    expect(firstTile.props().ids).toEqual(["1", "2", "3"]);
  });
});
