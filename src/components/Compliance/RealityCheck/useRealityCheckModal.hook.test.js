// @flow
import * as React from "react";
import { mount } from "enzyme";
import * as ReactReduxHooks from "react-redux";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import { waitAndUpdateWrapper } from "Utils";
import { type } from "Models/modal";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_MODAL_HIDDEN } from "Src/constants";
import { useRealityCheckModal } from "./useRealityCheckModal.hook";

const state = {
  player: {
    realityCheck: {
      intervalSeconds: 60,
      playerId: "5839ad10-695d-11e8-9bc7-0242ac110003",
      sessionStartedTime: 1576082415583,
      totalBetAmount: {
        amount: 0.64,
        iso4217CurrencyCode: "GBP",
      },
      totalWinAmount: {
        amount: 0.52,
        iso4217CurrencyCode: "GBP",
      },
    },
  },
};

describe("useRealityCheckModal", () => {
  const pauseGame = jest.fn(() => Promise.resolve());
  const resumeGame = jest.fn();
  let mockDispatch;
  jest
    .spyOn(ReactReduxHooks, "useDispatch")
    .mockImplementation(() => (mockDispatch = jest.fn()));
  const wrapper = mount(
    <MockStore state={state}>
      <HookWrapper
        hook={useRealityCheckModal}
        args={[{ pauseGame, resumeGame }]}
      />
    </MockStore>
  );

  describe("reality check modal should be dispached", () => {
    it(`calls dispatch action type ${type.show} with config`, async () => {
      await waitAndUpdateWrapper(wrapper);
      expect(mockDispatch).toBeCalledWith({
        config: {
          mustAccept: true,
        },
        modalId: "REALITY_CHECK_MODAL",
        type: type.show,
      });
    });

    it("calls pauseGame", () => {
      expect(pauseGame).toBeCalledTimes(1);
    });
  });

  describe("reality check modal is accepted and calls resumeGame", () => {
    const data = {
      modalId: "REALITY_CHECK_MODAL",
      result: class {},
      returnCode: "ACCEPTED",
      ev: "KO_APP_EVENT/modalHidden",
    };
    bridge.emit(KO_APP_EVENT_MODAL_HIDDEN, { data });

    it("calls resumeGame", () => {
      expect(resumeGame).toBeCalledTimes(1);
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});