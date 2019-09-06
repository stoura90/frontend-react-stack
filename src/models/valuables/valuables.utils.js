/* @flow */
import React from "react";
import { equals, anyPass } from "ramda";
import { LockIcon, ClockIcon } from "@casumo/cmp-icons";
import { interpolate } from "Utils";
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

export const depositUrl = "/en/cash/deposit";
export const gameBrowserUrl = "/en/games/top";

export const getStateBadgeProperties = (
  valuableState: ValuableState,
  hours: number,
  translatedHoursUnit: string
) => {
  const badgeProperties = {
    visible: false,
    text: "",
    classModifiers: "",
    icon: null,
  };
  const isAboutToExpire = hours > 0 && hours <= 24;

  if (valuableState === VALUABLE_STATES.LOCKED) {
    return {
      ...badgeProperties,
      icon: (
        <LockIcon
          size="sm"
          className="u-margin-right--sm"
          style={{ width: "10px", height: "11px" }}
        />
      ),
      classModifiers: "t-color-black",
      text: VALUABLE_STATES.LOCKED,
      visible: true,
    };
  } else if (isAboutToExpire) {
    return {
      ...badgeProperties,
      icon: (
        <ClockIcon
          size="sm"
          className="u-margin-right--sm"
          style={{ width: "10px", height: "11px" }}
        />
      ),
      classModifiers: "t-color-red",
      text: interpolate(translatedHoursUnit, { value: hours }),
      visible: true,
    };
  }

  return badgeProperties;
};

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
    return setActionProps(translations.depositNowLabel, depositUrl);
  }

  if (anyPass(isSpins, isCash)) {
    if (equals(valuableState, VALUABLE_STATES.LOCKED)) {
      if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.DEPOSIT)) {
        return setActionProps(translations.depositToUnlockLabel, depositUrl);
      }

      return setActionProps(translations.playToUnlockLabel, gameBrowserUrl);
    }

    return isSpins
      ? setActionProps(translations.playNowLabel)
      : setActionProps(translations.playNowLabel, gameBrowserUrl);
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

export const shouldUseValuable = (
  valuableType: ValuableType,
  valuableState: ValuableState
) => {
  return (
    equals(valuableType, VALUABLE_TYPES.SPINS) ||
    (equals(valuableType, VALUABLE_TYPES.CASH) &&
      !equals(valuableState, VALUABLE_STATES.LOCKED))
  );
};
