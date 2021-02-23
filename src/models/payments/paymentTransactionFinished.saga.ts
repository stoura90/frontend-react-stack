import { put } from "redux-saga/effects";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { PAYMENT_RESULT_STATUS } from "Components/RSModal/Payments/PaymentResult.types";
import { actionTypes } from "./payments.constants";

export function* paymentTransactionFinishedSaga(action) {
  const { amount, errorKeys = [] } = action.payload;

  if (action.type === actionTypes.PAYMENT_USE_ERROR) {
    yield put(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      showModal(REACT_APP_MODAL.ID.PAYMENT_RESULT, {
        amount,
        errorKeys,
        status: PAYMENT_RESULT_STATUS.fail,
      })
    );
  }

  if (action.type === actionTypes.PAYMENT_USE_SUCCESS) {
    yield put(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      showModal(REACT_APP_MODAL.ID.PAYMENT_RESULT, {
        amount,
        status: PAYMENT_RESULT_STATUS.success,
      })
    );
  }
  return yield 1;
}
