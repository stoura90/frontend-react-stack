import "./Deposit.scss";
import { AddIcon } from "@casumo/cmp-icons";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import { formatCurrency } from "Utils";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS, TCurrencyCode } from "Src/constants";
import { navigateToDeposit } from "../utils";

type Props = {
  balance: number;
  bonus: number;
  locale: string;
  currency: TCurrencyCode;
};

export const Deposit = ({ balance, bonus, locale, currency }: Props) => {
  const t = useTranslations("iframe-solution");

  const balanceFormatted = formatCurrency({
    locale,
    currency,
    value: balance,
  });

  const bonusFormatted = formatCurrency({
    locale,
    currency,
    value: bonus,
  });

  const goToDeposit = () => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_DEPOSIT_CLICKED, {
      [EVENT_PROPS.BALANCE]: balance,
    });
    navigateToDeposit();
  };

  return (
    <div className="t-background-white t-border-r t-elevation--10 u-padding-x--md u-padding-y u-margin-bottom u-display--flex">
      <div className="o-flex--vertical u-margin-right--lg">
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'balance_title' does not exist on type 'u... Remove this comment to see the full error message */}
        <div className="t-color-grey-50 u-font-sm">{t?.balance_title}</div>
        <div className="t-color-grey-90 u-font-md u-font-weight-bold">
          {balanceFormatted}
        </div>
      </div>
      {bonus > 0 && (
        <div className="o-flex--vertical t-color-grey-50 c-sport-deposit__bonus">
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'bonus_title' does not exist on type 'unk... Remove this comment to see the full error message */}
          <div className="u-font-sm">{t?.bonus_title}</div>
          <div className="u-font-md">{bonusFormatted}</div>
        </div>
      )}
      <div className="u-display--flex c-sport-deposit__separator" />
      <div className="o-flex-align--end">
        <ButtonPrimary size="sm" icon={<AddIcon />} onClick={goToDeposit} />
      </div>
    </div>
  );
};