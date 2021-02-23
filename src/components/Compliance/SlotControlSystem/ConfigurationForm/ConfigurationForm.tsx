// @flow
import * as React from "react";
import { map } from "ramda";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import { PlayIcon } from "@casumo/cmp-icons";
import {
  interpolateTimeInterval,
  convertLuxonDurationObjectToSeconds,
} from "Utils";
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
const LIMIT_YOUR_TIME_OPTS = [
  { minutes: 15 },
  { minutes: 30 },
  { hours: 1 },
  { hours: 4 },
].map(convertLuxonDurationObjectToSeconds);
const STATUS_ALERTS_EVERY_OPTS = [
  { minutes: 5 },
  { minutes: 10 },
  { minutes: 15 },
].map(convertLuxonDurationObjectToSeconds);
const WANT_BREAK_AFTER_YES_OPTS = [
  { hours: 1 },
  { days: 1 },
  { days: 7 },
  { days: 30 },
].map(convertLuxonDurationObjectToSeconds);

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
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  budget: ?number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  time: ?number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  alertsEvery: ?number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  wantsBreak: ?boolean,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'number'.
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ value: unknown; label: string; }[]' is not... Remove this comment to see the full error message
        options={mapSecondsToPillOpts(LIMIT_YOUR_TIME_OPTS)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<(prevState: undefined) => undefined... Remove this comment to see the full error message
        onChange={setTime}
      />
      <StatusAlertsEveryRow
        t={t}
        value={alertsEvery}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ value: unknown; label: string; }[]' is not... Remove this comment to see the full error message
        options={mapSecondsToPillOpts(STATUS_ALERTS_EVERY_OPTS)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<(prevState: undefined) => undefined... Remove this comment to see the full error message
        onChange={setAlertsEvery}
      />
      <WantBreakAfterRow
        t={t}
        value={wantsBreak}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<(prevState: undefined) => undefined... Remove this comment to see the full error message
        onChange={setWantsBreak}
        breakValue={breakAfter}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ value: unknown; label: string; }[]' is not... Remove this comment to see the full error message
        breakOptions={mapSecondsToPillOpts(WANT_BREAK_AFTER_YES_OPTS)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<(prevState: undefined) => undefined... Remove this comment to see the full error message
        onChangeBreak={setBreakAfter}
      />
      <ButtonPrimary
        size="md"
        variant="primary"
        isDisabled={
          !isPlayActive({
            balance,
            budget,
            time,
            alertsEvery,
            wantsBreak,
            breakAfter,
          })
        }
        isLoading={isCreatingSession}
        onClick={() => createSession(formData)}
      >
        <span className="u-margin-right--sm">{t.play}</span>
        <PlayIcon />
      </ButtonPrimary>
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
