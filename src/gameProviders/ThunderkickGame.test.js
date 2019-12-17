// @flow
import { ENVIRONMENTS } from "Src/constants";
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { ThunderkickGame } from "./ThunderkickGame";

describe("ThunderkickGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "THUNDERKICK_MOBILE",
    providerName: "THUNDERKICK",
  };
  const gameRef = { current: null };
  const model = new ThunderkickGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toEqual({ eventid: "pausegame" });
    expect(model.api.commands.resume).toEqual({ eventid: "resumegame" });
  });
});
