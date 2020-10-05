// @flow
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { KO_APP_EVENT_MODAL_HIDDEN } from "Src/constants";
import bridge from "Src/DurandalReactBridge";

export * from "./modal.selectors";

export const type = {
  hide: "MODAL/HIDE",
  show: "MODAL/SHOW",
};
type ModalIdWithInput = "GAME_PAGE_RR_LEADERBOARD";
type ModalIdWithoutInput =
  | "GAME_ROUND_DETAILS"
  | "TERMS_AND_CONDITIONS_SPAIN"
  | "SLOT_CONTROL_SYSTEM_CONFIGURATION"
  | "SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT"
  | "SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED"
  | "SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION"
  | "SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION"
  | "SLOT_CONTROL_SYSTEM_LIMIT_ALMOST_CONSUMED_NOTIFICATION"
  | "DANISH_ENTRY_OVERLAY"
  | "TIME_LIMITS_FORM"
  | "REALITY_CHECK"
  | "QUIT_GAME_NOTIFICATION"
  | "WAGERING_NOTIFICATION"
  | "GAME_PAGE_RR_LEADERBOARD";
// export type ModalId =
//   | "GAME_ROUND_DETAILS"
//   | "TERMS_AND_CONDITIONS_SPAIN"
//   | "SLOT_CONTROL_SYSTEM_CONFIGURATION"
//   | "SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT"
//   | "SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED"
//   | "SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION"
//   | "SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION"
//   | "SLOT_CONTROL_SYSTEM_LIMIT_ALMOST_CONSUMED_NOTIFICATION"
//   | "DANISH_ENTRY_OVERLAY"
//   | "TIME_LIMITS_FORM"
//   | "REALITY_CHECK"
//   | "QUIT_GAME_NOTIFICATION"
//   | "WAGERING_NOTIFICATION"
//   | "GAME_PAGE_RR_LEADERBOARD";
export type ModalId = ModalIdWithInput | ModalIdWithoutInput;
type ModalReturnCode =
  | "CLOSED" // click on "x"
  | "ACCEPTED" // click on accept button
  | "DISMISSED"; // click outside of the modal
/*::
// flow magic, with that I can safely use ModalId and ModalReturnCode type
const REACT_APP_MODAL = Object.freeze(require("Src/constants").REACT_APP_MODAL);
(REACT_APP_MODAL.ID: { [ModalId]: ModalId });
(REACT_APP_MODAL.RETURN_CODE: { [ModalReturnCode]: ModalReturnCode });
*/
export type GamePageRrLeaderboardInput = {|
  position: number,
  winnerName: string,
|};

export type ModalConfig = {
  mustAccept?: boolean,
  onCloseCallback?: () => void,
  input?: GamePageRrLeaderboardInput,
};

type ModalState = {
  modalId: ModalId | null,
  config: ModalConfig,
};

type ActionType = "MODAL/HIDE" | "MODAL/SHOW";

export function showModal(modalId: ModalId, config?: ModalConfig) {
  return {
    type: type.show,
    modalId,
    config,
  };
}

export function useSelectModal(): ModalState {
  return useSelector(R.prop("modal"), R.eqProps("modalId"));
}

export function hideModal() {
  return {
    type: type.hide,
  };
}

export function useHideModal(modalId: ?ModalId) {
  const dispatch = useDispatch();
  const fn = (returnCode: ModalReturnCode) => (result?: any) => {
    bridge.emit(KO_APP_EVENT_MODAL_HIDDEN, { modalId, returnCode, result });
    dispatch(hideModal());
  };

  return {
    closeModal: fn("CLOSED"),
    dismissModal: fn("DISMISSED"),
    acceptModal: fn("ACCEPTED"),
  };
}

type Actions = typeof showModal | typeof hideModal;

type Handler = {
  [ActionType]: (state: ModalState, action: Actions) => ModalState,
};

const handlers: Handler = {
  [type.show]: (state, { modalId, config }) => ({
    modalId,
    config,
  }),
  [type.hide]: state => ({
    modalId: null,
    config: {},
  }),
};
const DEFAULT_STATE = {
  modalId: null,
  config: {},
};
export function modalReducer(
  state: ModalState = DEFAULT_STATE,
  action: Actions
) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}
