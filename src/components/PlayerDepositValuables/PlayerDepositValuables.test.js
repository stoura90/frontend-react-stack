import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";
import { waitAndUpdateWrapper, getCacheWithIntrospections } from "Utils";
import { PlayerDepositValuables } from "./PlayerDepositValuables";

describe("PlayerDepositValuables", () => {
  test("should render valuables vertical list", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedDepositValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerDepositValuables />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(ValuablesVerticalList).exists()).toBe(true);
  });

  test("should render valuables row shell after the deposit valuables list", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedDepositValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerDepositValuables />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(ValuableRowShell).exists()).toBe(true);
  });
});
