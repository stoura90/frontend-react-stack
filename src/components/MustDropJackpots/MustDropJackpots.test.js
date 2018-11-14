import React from "react";
import { shallow } from "enzyme";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";

describe("<MustDropJackpots />", () => {
  test("renders a <GameRow /> for each id", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<MustDropJackpots ids={ids} />);

    expect(rendered.find("Connect(GameRow)").length).toBe(ids.length);
  });
});
