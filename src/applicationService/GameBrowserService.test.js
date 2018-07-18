import gameBrowserClientMock from "../serviceClients/GameBrowserClient";
import sessionServiceMock from "../applicationService/SessionService";
import { GameBrowserServiceFactory } from "./GameBrowserService";
jest.mock("../serviceClients/GameBrowserClient");
jest.mock("../applicationService/SessionService");

describe("Game Browser Service", () => {
  let service;

  beforeEach(() => {
    service = GameBrowserServiceFactory({
      gameBrowserClient: gameBrowserClientMock,
      sessionService: sessionServiceMock,
    });

    jest.resetAllMocks();

    gameBrowserClientMock.handshake.mockResolvedValue({
      gamesLists: {
        "top-list-1": {
          id: "top-list-1",
          title: "Top List 1",
          variants: {
            default: {
              totalGames: 10,
              hash: "top-list-hash-default-variant",
            },
            guests: { totalGames: 5, hash: "top-list-hash-guests-variant" },
          },
        },
      },
      topListIds: ["top-list-1", "top-list-2"],
    });

    gameBrowserClientMock.gamesLists.mockImplementation(x =>
      Promise.resolve({ games: ["game-1"] })
    );

    service.config.set({ country: "mt", device: "mobile" });
  });

  // afterEach(() => {
  //   console.log(gameBrowserClientMock.handshake.mock.calls);
  // });

  test("should call handshake on client", async () => {
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalled();
  });

  test("should call handshake once", async () => {
    await service.allTopLists();
    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(1);
  });

  test("should re call handshake if it is invalidated", async () => {
    await service.allTopLists();
    await service.invalidateHandshake();
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(2);
  });

  test("should pull the country from the config", async () => {
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "mt",
      })
    );
  });

  test("should call handshake with different country if config is changed", async () => {
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "mt",
      })
    );

    service.config.set({ country: "gb" });

    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "gb",
      })
    );
  });

  describe("allTopLists()", () => {
    test("should call gamesList API with the relevant parameters", async () => {
      service.config.set({ country: "mt", device: "mobile" });
      await service.allTopLists();
      expect(gameBrowserClientMock.gamesLists).toHaveBeenCalled();
      expect(gameBrowserClientMock.gamesLists).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: "mobile",
          country: "mt",
          id: "top-list-1",
          hash: "top-list-hash-default-variant",
          variant: "default",
          pageSize: 20,
        })
      );
    });

    test("should return all top lists", async () => {
      const response = await service.allTopLists();
      expect(response).toEqual([
        { id: "top-list-1", title: "Top List 1", games: ["game-1"] },
      ]);
    });

    test("should ignore topListId if it does not exists in gamesLists", async () => {
      const response = await service.allTopLists();
      expect(response).not.toBeUndefined();
    });

    test("should not return lists with no games", async () => {
      gameBrowserClientMock.gamesLists.mockResolvedValue({ games: [] });

      const response = await service.allTopLists();
      expect(response).toEqual([]);
    });

    test("should not blow up if games is not an array", async () => {
      gameBrowserClientMock.gamesLists.mockResolvedValue({});
      await service.allTopLists();
    });
  });

  describe("latestPlayedGames", () => {
    test("should call the API with the playerId", async () => {
      sessionServiceMock.playerId.mockResolvedValue("player-id-123");

      await service.latestPlayedGames();

      expect(gameBrowserClientMock.latestPlayedGames).toHaveBeenCalledWith(
        expect.objectContaining({ playerId: "player-id-123" })
      );
    });
  });
});
