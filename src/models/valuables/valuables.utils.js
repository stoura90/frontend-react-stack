/* @flow */
import { equals, anyPass, filter } from "ramda";
import {
  type ValuableDetailsTranslations,
  type ValuableRequirementType,
  type ValuableType,
  type ValuableState,
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
  type DurationTranslations,
  VALUABLE_SPIN_TYPES,
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
  valuableState === VALUABLE_STATES.LOCKED || isAboutToExpire(hours);

export const getValuablesByState = (state: ValuableState) =>
  filter(({ valuableState }) => valuableState === state);

export const getValuableDetailsAction = ({
  valuableType,
  valuableState,
  requirementType,
  translations,
}: {
  valuableType: ValuableType,
  valuableState: ValuableState,
  requirementType?: ?ValuableRequirementType,
  translations: ValuableDetailsTranslations,
}): {
  text: string,
  url: string,
} => {
  const isCash = equals(valuableType, VALUABLE_TYPES.CASH);
  const isSpins = equals(valuableType, VALUABLE_TYPES.SPINS);

  const setActionProps = (text = "", url = "") => ({
    text,
    url,
  });

  if (equals(valuableType, VALUABLE_TYPES.DEPOSIT)) {
    // The redirection is being taken care of by the KO code
    return setActionProps(translations.depositNowLabel);
  }

  if (anyPass(isSpins, isCash)) {
    if (equals(valuableState, VALUABLE_STATES.LOCKED)) {
      if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.DEPOSIT)) {
        // The redirection is being taken care of by the KO code
        return setActionProps(translations.depositToUnlockLabel);
      }

      return setActionProps(translations.playToUnlockLabel, gameBrowserRouteId);
    }

    return isSpins
      ? setActionProps(translations.spinsUnlockedActionLabel)
      : setActionProps(
          translations.cashUnlockedActionLabel,
          gameBrowserRouteId
        );
  }

  return setActionProps();
};

// TODO: either move this to somewhere more localised
// or refactor to use ISO8601Duration component
// Issue: https://jira.casumocave.com/browse/PRR-65
export function durationToTranslationKey(
  durationKey: $Values<DurationTranslations>,
  value: number
): $Keys<DurationTranslations> {
  return {
    days: value > 1 ? "day_plural" : "day_singular",
    hours: value > 1 ? "hour_plural" : "hour_singular",
    minutes: value > 1 ? "minute_plural" : "minute_sungular",
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
