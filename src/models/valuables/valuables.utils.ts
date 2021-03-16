import {
  equals,
  anyPass,
  filter,
  sort,
  prop,
  descend,
  pipe,
  head,
  includes,
} from "ramda";
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
  VALUABLE_SPIN_TYPES,
} from "Models/valuables";
import type {
  ValuableDetailsTranslations,
  ValuableRequirementType,
  ValuableType,
  ValuableState,
  ValuableActionProps,
  DurationTranslations,
} from "Models/valuables";
import {
  convertTimestampToLuxonDate,
  getDateTimeDifferenceFromNow,
} from "Utils";

export const depositRouteId = "deposit";
export const gameBrowserRouteId = "games-top";

export const isAboutToExpire = (hours: number): boolean =>
  hours >= 0 && hours <= 24;

export const showStateBadge = (valuableState: ValuableState, hours: number) =>
  valuableState === VALUABLE_STATES.LOCKED ||
  valuableState === VALUABLE_STATES.USED ||
  isAboutToExpire(hours);

export const getValuablesByState = (states: ValuableState[]) =>
  filter(({ valuableState }) => includes(valuableState, states));

export const getValuableDetailsAction = ({
  valuableType,
  valuableState,
  requirementType,
  translations,
}: {
  valuableType: ValuableType;
  valuableState: ValuableState;
  requirementType?: ValuableRequirementType | undefined;
  translations: ValuableDetailsTranslations;
}): ValuableActionProps => {
  const isCash = equals(valuableType, VALUABLE_TYPES.CASH);
  const isSpins = equals(valuableType, VALUABLE_TYPES.SPINS);
  const isCashback = equals(valuableType, VALUABLE_TYPES.CASHBACK);

  const setActionProps = (
    text = "",
    isDepositBonusSelected = false,
    url = ""
  ) => ({
    text,
    isDepositBonusSelected,
    url,
  });

  if (equals(valuableType, VALUABLE_TYPES.DEPOSIT)) {
    // The redirection is being taken care of by the KO code, so url is not required
    return setActionProps(translations.depositNowLabel, true);
  }

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 3.
  if (anyPass(isSpins, isCash, isCashback)) {
    if (equals(valuableState, VALUABLE_STATES.LOCKED)) {
      if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.DEPOSIT)) {
        // The redirection is being taken care of by the KO code, so url is not required
        return setActionProps(translations.depositToUnlockLabel, true);
      }

      return setActionProps(
        translations.playToUnlockLabel,
        false,
        gameBrowserRouteId
      );
    }

    if (isCashback) {
      return setActionProps(
        equals(valuableState, VALUABLE_STATES.FRESH)
          ? translations.activateCashbackActionLabel
          : translations.playNowLabel,
        false,
        gameBrowserRouteId
      );
    }

    return isSpins
      ? setActionProps(translations.spinsUnlockedActionLabel)
      : setActionProps(
          translations.cashUnlockedActionLabel,
          false,
          gameBrowserRouteId
        );
  }

  return setActionProps();
};

// TODO: either move this to somewhere more localised
// or refactor to use ISO8601Duration component
// Issue: https://jira.casumocave.com/browse/PRR-65
export function durationToTranslationKey(
  durationKey: DurationTranslations[keyof DurationTranslations],
  value: number
) {
  return {
    days: value > 1 ? "day_plural" : "day_singular",
    hours: value > 1 ? "hour_plural" : "hour_singular",
    minutes: value > 1 ? "minute_plural" : "minute_singular",
  }[durationKey];
}

export const coinValueToSpinType = (coinValue: number = 0) => {
  if (coinValue > 0.3 && coinValue <= 0.9) {
    return VALUABLE_SPIN_TYPES.BONUS;
  } else if (coinValue > 0.9 && coinValue <= 3) {
    return VALUABLE_SPIN_TYPES.SUPER;
  } else if (coinValue > 3) {
    return VALUABLE_SPIN_TYPES.MEGA;
  }

  return VALUABLE_SPIN_TYPES.BASIC_SPINS;
};

export const getExpiryTimeLeft = (timestamp: number) => {
  const luxonDate = convertTimestampToLuxonDate(timestamp);

  return getDateTimeDifferenceFromNow(luxonDate);
};

export const orderValuablesByCreationTime = sort(descend(prop("created")));

export const getLatestValuable = pipe(orderValuablesByCreationTime, head);