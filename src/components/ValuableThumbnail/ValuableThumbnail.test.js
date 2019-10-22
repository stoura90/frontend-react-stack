import React from "react";
import { shallow } from "enzyme";
import mockTranslations from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { VALUABLE_TYPES } from "Models/valuables";
import * as utils from "Utils";
import { mockValuable as mockData } from "../ValuableCard/__mocks__/Valuable.mock";
import { ValuableThumbnail } from "./ValuableThumbnail";

jest.mock("Utils", () => ({
  ...jest.requireActual("../../utils/utils"),
  interpolate: jest.fn(),
}));

describe("ValuableThumbnail", () => {
  let mockValuable = mockData(VALUABLE_TYPES.CASH);
  let expiryTimeLeft = { hours: 10, minutes: 10 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render in hours when time left to expire is less than 24", () => {
    shallow(
      <ValuableThumbnail
        {...mockValuable}
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );
    const interpoloated = jest.spyOn(utils, "interpolate");

    expect(interpoloated).toHaveBeenCalledWith(mockTranslations.hoursLabel, {
      value: expiryTimeLeft.hours,
    });
  });

  test("should render in minutes when time left to expire is less than an hour", () => {
    expiryTimeLeft = { hours: 0, minutes: 30 };
    shallow(
      <ValuableThumbnail
        {...mockValuable}
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );

    const interpoloated = jest.spyOn(utils, "interpolate");

    expect(interpoloated).toHaveBeenCalledWith(mockTranslations.minutesLabel, {
      value: expiryTimeLeft.minutes,
    });
  });

  test("should not get text for expiry if expiry is not within 24 hours", () => {
    expiryTimeLeft = { hours: 30, minutes: 0 };
    shallow(
      <ValuableThumbnail
        {...mockValuable}
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );

    const interpoloated = jest.spyOn(utils, "interpolate");

    expect(interpoloated).toHaveBeenCalledTimes(0);
  });
});