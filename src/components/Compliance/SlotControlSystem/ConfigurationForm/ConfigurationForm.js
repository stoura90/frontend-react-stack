// @flow
import * as React from "react";
import { map } from "ramda";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { PlayIcon } from "@casumo/cmp-icons";
import { interpolateTimeInterval } from "Utils";
import { LimitYourBudget } from "./LimitYourBudget/LimitYourBudget";
import { LimitYourBudgetRow } from "./LimitYourBudgetRow";
import { LimitYourTimeRow } from "./LimitYourTimeRow";
import { StatusAlertsEveryRow } from "./StatusAlertsEveryRow";
import { WantBreakAfterRow } from "./WantBreakAfterRow";
import { isBudgetInvalid } from "./Utils";
import "./ConfigurationForm.scss";

const { useState, useCallback, useEffect } = React;
const SCREEN_TYPES = {
  FORM: "FORM",
  LIMIT_YOUR_BUDGET: "LIMIT_YOUR_BUDGET",
};
// these are given in seconds
const HOUR = 60 * 60;
const LIMIT_YOUR_TIME_OPTS = [15 * 60, 30 * 60, HOUR, 240 * 60];
const STATUS_ALERTS_EVERY_OPTS = [5 * 60, 10 * 60, 15 * 60];
const WANT_BREAK_AFTER_YES_OPTS = [
  HOUR,
  24 * HOUR,
  7 * 24 * HOUR,
  30 * 24 * HOUR,
];

export type ConfigurationFormContent = {
  limit_your_budget: string,
  use_all_balance: string,
  error_budget_too_low: string,
  error_budget_too_high: string,
  limit_your_time: string,
  get_status_alerts: string,
  want_break_after: string,
  want_break_after_opts: Array<{ value: string, label: string }>,
  for_how_long: string,
  play: string,
  minutes_abbreviated: string,
  hours_abbreviated: string,
  days_abbreviated: string,
};

export type ConfigurationFormData = {
  budget: number,
  currency: string,
  /** in seconds */
  time: number,
  /** in seconds */
  alertsEvery: number,
  /** in seconds */
  breakAfter?: number,
};

type ConfigurationFormProps = {
  t: ConfigurationFormContent,
  balance: number,
  currency: string,
  locale: string,
  fetchContentIfNecessary: () => void,
  createSession: (formData: ConfigurationFormData) => void,
  isCreatingSession: boolean,
};

type IsPlayActiveType = {
  balance: number,
  budget: ?number,
  time: ?number,
  alertsEvery: ?number,
  wantsBreak: ?boolean,
  breakAfter: ?number,
};

export function ConfigurationForm(props: ConfigurationFormProps) {
  const {
    t,
    balance,
    currency,
    fetchContentIfNecessary,
    createSession,
    isCreatingSession,
  } = props;
  const [screen, setScreen] = useState(SCREEN_TYPES.LIMIT_YOUR_BUDGET);
  const [budget, setBudget] = useState();
  const [time, setTime] = useState();
  const [alertsEvery, setAlertsEvery] = useState();
  const [wantsBreak, setWantsBreak] = useState();
  const [breakAfter, setBreakAfter] = useState();
  const formData: ConfigurationFormData = {
    currency,
    budget: budget || 0,
    time: time || 0,
    alertsEvery: alertsEvery || 0,
    breakAfter,
  };
  const onClickEditBudget = useCallback(() => {
    setScreen(SCREEN_TYPES.LIMIT_YOUR_BUDGET);
  }, [setScreen]);
  const onSubmitBudget = useCallback(
    submittedBudget => {
      setBudget(submittedBudget);
      setScreen(SCREEN_TYPES.FORM);
    },
    [setBudget, setScreen]
  );
  const mapSecondsToPillOpts = map(seconds => ({
    value: seconds,
    label: interpolateTimeInterval({
      seconds,
      t: {
        seconds: "unused",
        minutes: t.minutes_abbreviated,
        hours: t.hours_abbreviated,
        days: t.days_abbreviated,
      },
    }),
  }));

  useEffect(() => {
    fetchContentIfNecessary();
  }, [fetchContentIfNecessary]);

  if (screen === SCREEN_TYPES.LIMIT_YOUR_BUDGET) {
    return (
      <LimitYourBudget {...props} budget={budget} onSubmit={onSubmitBudget} />
    );
  }

  return (
    <Flex direction="vertical" className="u-height--1/1 u-padding-x--md">
      <LimitYourBudgetRow
        {...props}
        budget={budget}
        onClickEdit={onClickEditBudget}
      />
      <LimitYourTimeRow
        t={t}
        value={time}
        options={mapSecondsToPillOpts(LIMIT_YOUR_TIME_OPTS)}
        onChange={setTime}
      />
      <StatusAlertsEveryRow
        t={t}
        value={alertsEvery}
        options={mapSecondsToPillOpts(STATUS_ALERTS_EVERY_OPTS)}
        onChange={setAlertsEvery}
      />
      <WantBreakAfterRow
        t={t}
        value={wantsBreak}
        onChange={setWantsBreak}
        breakValue={breakAfter}
        breakOptions={mapSecondsToPillOpts(WANT_BREAK_AFTER_YES_OPTS)}
        onChangeBreak={setBreakAfter}
      />
      <Button
        size="md"
        variant="primary"
        disabled={
          !isPlayActive({
            balance,
            budget,
            time,
            alertsEvery,
            wantsBreak,
            breakAfter,
          })
        }
        loading={isCreatingSession}
        onClick={() => createSession(formData)}
      >
        <span className="o-flex__block c-scs__form__play-btn__label">
          {t.play}
        </span>
        <PlayIcon />
      </Button>
    </Flex>
  );
}

export function isPlayActive(props: IsPlayActiveType): boolean {
  const { balance, budget, time, alertsEvery, wantsBreak, breakAfter } = props;

  return Boolean(
    typeof budget === "number" &&
      !isBudgetInvalid({
        budget,
        balance,
      }) &&
      time &&
      alertsEvery &&
      // check explicitly for false as unset is not accepted
      ((wantsBreak && breakAfter) || wantsBreak === false)
  );
}
