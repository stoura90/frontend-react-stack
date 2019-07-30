import React from "react";
import { mount } from "enzyme";
import * as R from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import ScrollableListTitle from "Components/ScrollableListTitle";
import TileListHorizontal from "Components/TileListHorizontal/TileListHorizontal";
import TileListHorizontalSkeleton from "Components/TileListHorizontalSkeleton/TileListHorizontalSkeleton";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import Tile from "./Tile";

const items = R.map(R.toString, R.range(0, 4));

describe("<TileListHorizontal /> - Mobile", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal isLoaded={true} items={items} />
      </MockStore>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });

  test("should render skeleton while loading", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal isLoaded={false} />
      </MockStore>
    );

    expect(rendered.find(TileListHorizontalSkeleton)).toHaveLength(1);
  });

  test("shouldn't render unless there are items", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal isLoaded={true} items={[]} />
      </MockStore>
    );
    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("should call the fetch function after mounting", () => {
    const fetch = jest.fn();
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal fetch={fetch} />
      </MockStore>
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should render title and items", () => {
    const title = "Foo";
    const item = {
      url: "url1",
      logo: "logo1",
      background: "background1",
    };
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal items={[item]} isLoaded={true} title={title} />
      </MockStore>
    );

    expect(rendered.find(ScrollableListTitle)).toHaveLength(1);
    expect(rendered.find(ScrollableListTitle).prop("title")).toBe(title);
    expect(rendered.find(Scrollable).find(Tile)).toHaveLength(1);

    const tile = rendered
      .find(Scrollable)
      .find(Tile)
      .first();

    expect(tile.prop("url")).toBe(item.url);
    expect(tile.prop("logo")).toBe(item.logo);
    expect(tile.prop("background")).toBe(item.background);
  });
});

describe("<TileListHorizontal /> - Desktop", () => {
  let rendered;

  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal isLoaded={true} items={items} />
      </MockStore>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
  });

  //eslint-disable-next-line sonarjs/no-identical-functions
  test("should render skeleton while loading", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal isLoaded={false} />
      </MockStore>
    );

    expect(rendered.find(TileListHorizontalSkeleton)).toHaveLength(1);
  });

  //eslint-disable-next-line sonarjs/no-identical-functions
  test("shouldn't render unless there are items", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <TileListHorizontal isLoaded={true} items={[]} />
      </MockStore>
    );
    expect(rendered.isEmptyRender()).toBe(true);
  });
});
