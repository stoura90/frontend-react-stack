// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { QuickDepositSlip } from "./QuickDepositSlip";
import { translations as t } from "./__mocks__/cms";

const props = {
  t: t,
  currencySymbol: "$",
  minAmount: 20,
  maxAmount: 100,
  onDeposit: () => {},
};

const DATA_TEST_ID = "deposit-amount-selector";

describe("<QuickDepositSlip />", () => {
  describe("validation", () => {
    let rendered;
    let depositAmountSelector;
    let input;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(init => [init, setState]);

    beforeEach(() => {
      rendered = mount(<QuickDepositSlip {...props} />);
      depositAmountSelector = rendered.find(`[data-test-id='${DATA_TEST_ID}']`);
      input = depositAmountSelector.find("input").at(0);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should show validation error messages for minimum amount", () => {
      act(() => {
        input.instance().value = 5;
        input.simulate("change");
        rendered.update();
      });

      const helperTextSelector = depositAmountSelector.find("span").last();

      expect(helperTextSelector.text()).toBe(
        `Minimum deposit amount is ${props.minAmount}`
      );
    });

    test("should show error for maximum amount", () => {
      act(() => {
        input.instance().value = 101;
        input.simulate("change");
        rendered.update();
      });

      const helperTextSelector = depositAmountSelector.find("span").last();

      expect(helperTextSelector.text()).toBe(
        `Maximum deposit amount is ${props.maxAmount}`
      );
    });
  });
});
