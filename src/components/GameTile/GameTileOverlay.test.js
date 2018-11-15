import React from "react";
import { shallow } from "enzyme";

import GameTileOverlay, {
  IN_MAINTENANCE_CLASS_NAME,
} from "Components/GameTile/GameTileOverlay";
import gameInfo from "./__mocks__/Game.json";

describe("GameTileOverlay", () => {
  test("should render PlayAction if not in maintenance mode", () => {
    const spy = jest.fn();
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} onLaunchGame={spy} />
    );
    expect(rendered.find("PlayAction").length).toBe(1);
    expect(rendered.find("PlayAction").prop("onLaunchGame")).toEqual(spy);
  });

  test("should not set maintence class when inMaintenanceMode is false", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={false} />
    );
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(false);
  });

  test("should set maintence class when inMaintenanceMode is true", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={true} />
    );
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(true);
  });

  test("should render TemporaryUnavailable if in maintenance mode", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={true} />
    );
    expect(rendered.find("TemporaryUnavailable").length).toBe(1);
  });
});