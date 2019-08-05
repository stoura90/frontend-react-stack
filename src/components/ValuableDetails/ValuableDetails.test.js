import React from "react";
import { shallow } from "enzyme";
import { pipe, prop } from "ramda";
import { interpolate } from "Utils";
import {
  ValuableDetails,
  expirationBadgeClasses,
  getDurationTranslation,
} from "./ValuableDetails";
import mockValuables from "./__mocks__/Valuables.json";
import mockTranslations from "./__mocks__/Translations.json";

describe("ValuableDetails", () => {
  let rendered;
  const mockValuable = mockValuables[0];
  const Foo = () => <div>baz</div>;

  beforeEach(() => {
    rendered = shallow(
      <ValuableDetails {...mockValuable} translations={mockTranslations}>
        <Foo />
      </ValuableDetails>
    );
  });

  test("should render a given component with it's props in the header", () => {
    const foo = rendered.find(Foo);

    expect(foo).toHaveLength(1);
  });

  test("should render red expiration badge if expirationInHours is >= 24", () => {
    expect(
      rendered
        .find("[data-test='valuable-expiration-badge']")
        .hasClass(expirationBadgeClasses.grey)
    ).toBe(true);
  });

  test("should display the expiration in hours if expiration is <= 24 hours", () => {
    const expirationHours = 5;
    const expectedExpirationText = `${mockTranslations.expirationTimeLabel} ${expirationHours} Hours`;
    rendered = shallow(
      <ValuableDetails
        {...mockValuable}
        expirationTimeInHours={expirationHours}
        translations={mockTranslations}
      >
        <Foo />
      </ValuableDetails>
    );

    expect(
      rendered
        .find("[data-test='valuable-expiration-badge']")
        .dive()
        .find("span")
        .text()
    ).toEqual(expectedExpirationText);
  });

  test("should display the expiration in days if expiration is >= 24 hours", () => {
    const expirationHours = 300;
    const days = Math.floor(expirationHours / 24);
    const expectedExpirationText = `${mockTranslations.expirationTimeLabel} ${days} Days`;

    rendered = shallow(
      <ValuableDetails
        {...mockValuable}
        expirationTimeInHours={expirationHours}
        translations={mockTranslations}
      >
        <Foo />
      </ValuableDetails>
    );

    expect(
      rendered
        .find("[data-test='valuable-expiration-badge']")
        .dive()
        .find("span")
        .text()
    ).toEqual(expectedExpirationText);
  });

  test("should return the singular translation of the correct duration", () => {
    const expiration = 1;
    const key = "hours";
    const expectedTranslation = pipe(
      prop(key),
      prop("singular")
    )(mockTranslations);
    const expectedValue = interpolate(expectedTranslation);

    const actualValue = getDurationTranslation(
      { key, value: expiration },
      mockTranslations
    );

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return the plural translation of the correct duration", () => {
    const expiration = 5;
    const key = "hours";
    const expectedTranslation = pipe(
      prop(key),
      prop("plural")
    )(mockTranslations);
    const expectedValue = interpolate(expectedTranslation);

    const actualValue = getDurationTranslation(
      { key, value: expiration },
      mockTranslations
    );

    expect(actualValue).toEqual(expectedValue);
  });
});
