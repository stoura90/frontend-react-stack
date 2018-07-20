import { SessionServiceFactory } from "./SessionService";
import commonServiceMock from "./CommonService";
import countryGuesserServiceMock from "./CountryGuesserService";
import {
  authenticatedResponse,
  unauthenticatedResponse,
} from "./__mocks__/handshake";

jest.mock("./CommonService");
jest.mock("./CountryGuesserService");

describe("SessionService", () => {
  let service;

  beforeEach(() => {
    jest.resetAllMocks();
    service = SessionServiceFactory({
      commonService: commonServiceMock,
      countryGuesserService: countryGuesserServiceMock,
    });
    commonServiceMock.handshake.mockResolvedValue(authenticatedResponse);
  });

  describe("isAuthenticated()", () => {
    test("should return false if there is no session", async () => {
      commonServiceMock.handshake.mockResolvedValue(unauthenticatedResponse);
      const result = await service.isAuthenticated();
      expect(result).toBe(false);
    });

    test("should return true if there is a session property", async () => {
      const result = await service.isAuthenticated();
      expect(result).toBe(true);
    });
  });

  describe("country()", () => {
    test("should return the players country", async () => {
      const country = await service.country();
      expect(country).toEqual("gb");
    });

    test("should return a country with best guess if a user is not authenticated", async () => {
      commonServiceMock.handshake.mockResolvedValue({});
      countryGuesserServiceMock.guess.mockReturnValue("FOO");

      const country = await service.country();

      expect(country).toEqual("FOO");
    });
  });
});