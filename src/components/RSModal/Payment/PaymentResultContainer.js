// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector } from "react-redux";
import { useTranslations, useTranslationsGql } from "Utils/hooks";
import { localeSelector } from "Models/handshake";
import { playerCurrencySelector } from "Models/player";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";
import { PaymentResult } from "./PaymentResult";

const cmsKeyPrefix = "root:shared.payment-result:fields.";

const getErrorByCode = R.curry((errorCode, errors) =>
  R.pipe(R.find(R.propEq("error_code", errorCode)))(errors)
);

type Props = {
  closeModal: () => void,
  config: any,
};

export const PaymentResultContainer = ({ closeModal, config }: Props) => {
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);

  const {
    error_responses,
    error_title: payment_result_error_title,
    unexpected_error_message: payment_result_error_message,
  } = useTranslations("shared.paymentiq-error-messages");

  const { t, tLoading } = useTranslationsGql({
    payment_result_success_title: `${cmsKeyPrefix}success_title`,
    payment_result_success_message: `${cmsKeyPrefix}success_message`,
  });

  const { status, amount, errorCode = null } = config;

  const isSuccess = status === PAYMENT_RESULT_STATUS.success;
  const isFailure = status === PAYMENT_RESULT_STATUS.fail;

  if ((isSuccess && tLoading) || (isFailure && !error_responses)) {
    return null;
  }

  const error = getErrorByCode(errorCode, error_responses);

  const errorTitle = error?.error_title || payment_result_error_title;
  const errorMessage = error?.error_message || payment_result_error_message;

  return (
    <PaymentResult
      t={t}
      locale={locale}
      currency={currency}
      amount={amount}
      status={status}
      errorTitle={errorTitle}
      errorMessage={errorMessage}
    />
  );
};
