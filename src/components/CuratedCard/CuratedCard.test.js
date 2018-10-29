import React from "react";
import { mount } from "enzyme";

import CuratedCard from "Components/CuratedCard/CuratedCard";
import curatedCardData from "./__mocks__/curatedCard.json";

describe("CuratedCard", () => {
  test("should render component", () => {
    const component = mount(<CuratedCard data={curatedCardData} />);
    expect(component.find("CuratedCard").exists()).toBe(true);
  });

  test("should render ImageLazy background", () => {
    const component = mount(<CuratedCard data={curatedCardData} />);
    expect(component.find("ImageLazy").exists()).toBe(true);
  });

  test("should render Card", () => {
    const component = mount(<CuratedCard data={curatedCardData} />);
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render CuratedCardFooter", () => {
    const component = mount(<CuratedCard data={curatedCardData} />);
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render header html", () => {
    const component = mount(<CuratedCard data={curatedCardData} />);
    const html = component
      .find("Card")
      .find("Text")
      .at(0)
      .render()
      .html();
    expect(html).toBe("TRY OUR<br> NEW<br> GAME");
  });
});