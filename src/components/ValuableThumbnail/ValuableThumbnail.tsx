/* @flow */
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
import React, { type Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import { ValuableStateIndicator } from "Components/ValuableStateIndicator";
import { interpolate } from "Utils";
import {
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type ValuableState,
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
  showStateBadge,
  isAboutToExpire,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type DurationProps,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type ValuableThumbnailTranslations as Translations,
} from "Models/valuables";
import { ValuableSymbol } from "./ValuableSymbol";
import "./ValuableThumbnail.scss";
import Coin from "./Icons/coin.svg";
import Cashback from "./Icons/cashback.svg";

type Props = {
  /** Valuable type of the valuable */
  valuableType: A.ValuableType,
  /** award type - applies when valuableType === Wagering Lock */
  awardType?: A.WageringLockAwardType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** Market of the player */
  market: string,
  /** Background image to be displayed in the Card header */
  backgroundRenderer: Node,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** Time left in h, m for the valuable to expire */
  expiryTimeLeft: DurationProps,
  /* Translations of the component */
  translations: Translations,
  size?: "small" | "large",
};

export const ValuableThumbnail = ({
  awardType,
  backgroundRenderer,
  coinValue,
  currency,
  market,
  size = "large",
  expiryTimeLeft,
  valuableState,
  valuableType,
  translations,
}: Props) => {
  const spinType = coinValueToSpinType(coinValue);
  const stateBadgeVisible =
    size !== "small" && showStateBadge(valuableState, expiryTimeLeft.hours);
  const stateBadgeText = getStateBadgeText(
    expiryTimeLeft,
    translations,
    valuableState
  );

  return (
    <div className={`o-ratio o-ratio--valuable-card-thumbnail-${size}`}>
      <div className="o-ratio__content t-border-r">{backgroundRenderer}</div>
      <Flex
        align="center"
        className="o-ratio__content"
        data-test="valuable-card-thumbnail-coin"
        direction="vertical"
        justify={size === "small" ? "center" : "end"}
      >
        <div
          className={`c-valuable-card-thumbnail-coin--${size} u-margin-bottom--sm o-ratio o-ratio--valuable-card-thumbnail-coin`}
        >
          <div
            className={classNames(
              "o-ratio__content",
              getCoinClassModifier(valuableType, awardType)
            )}
          >
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'CASHBACK' does not exist on type '{}'. */}
            {[VALUABLE_TYPES.CASHBACK].includes(valuableType) ? (
              <Cashback className="u-width--full" />
            ) : (
              <Coin className="u-width--full" />
            )}
          </div>
          <Flex
            align="center"
            justify="center"
            className={classNames(
              "o-ratio__content",
              getCoinTextClassModifier(valuableType, awardType)
            )}
          >
            <ValuableSymbol
              awardType={awardType}
              currency={currency}
              spinType={spinType}
              valuableType={valuableType}
              size={size === "small" ? "sm" : "md"}
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ awardType: WageringLockAwardType; currency... Remove this comment to see the full error message
              className="u-width--full"
            />
          </Flex>
        </div>
      </Flex>
      {stateBadgeVisible && (
        <div className="o-ratio__content">
          <div className="c-valuable-card-thumbnail__state u-font-2xs t-border-r-bottom-right--md u-display--inline-block t-background-white u-padding-bottom u-padding-right">
            <ValuableStateIndicator
              state={valuableState}
              label={
                <Text size="2xs" tag="span" className="u-font-weight-bold">
                  {stateBadgeText}
                </Text>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

function getStateBadgeText(
  expiryTimeLeft: DurationProps,
  translations: Translations,
  valuableState: ValuableState
): ?string {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'LOCKED' does not exist on type '{}'.
  if (valuableState === VALUABLE_STATES.LOCKED) {
    return translations.lockedListTitleLabel;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'USED' does not exist on type '{}'.
  } else if (valuableState === VALUABLE_STATES.USED) {
    return translations.usedListTitleLabel;
  } else if (isAboutToExpire(expiryTimeLeft.hours)) {
    const { minutes, hours } = expiryTimeLeft;

    if (hours < 1) {
      return interpolate(translations.minutesLabel, { value: minutes });
    }

    return interpolate(translations.hoursLabel, { value: hours });
  }

  return null;
}

function getCoinClassModifier(
  valuableType: A.ValuableType,
  awardType?: A.WageringLockAwardType
) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    case VALUABLE_TYPES.CASH:
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASHBACK' does not exist on type '{}'.
    case VALUABLE_TYPES.CASHBACK:
      return "t-color-yellow-30";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'WAGERING_LOCK' does not exist on type '{... Remove this comment to see the full error message
    case VALUABLE_TYPES.WAGERING_LOCK:
      if (awardType === "spins") {
        return "t-color-grey-90";
      }

      if (["freeMoney", "bonusMoney"].includes(awardType)) {
        return "t-color-yellow-30";
      }

      return "t-color-yellow-30";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
    case VALUABLE_TYPES.DEPOSIT:
      return "t-color-blue-50";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPORT' does not exist on type '{}'.
    case VALUABLE_TYPES.SPORT:
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'FREE_BET' does not exist on type '{}'.
    case VALUABLE_TYPES.FREE_BET:
      return "t-color-green-30";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPINS' does not exist on type '{}'.
    case VALUABLE_TYPES.SPINS:
      return "t-color-grey-90";
    default:
      return "";
  }
}

function getCoinTextClassModifier(
  valuableType: A.ValuableType,
  awardType?: A.WageringLockAwardType
) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    case VALUABLE_TYPES.CASH:
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASHBACK' does not exist on type '{}'.
    case VALUABLE_TYPES.CASHBACK:
      return "t-color-grey-70";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'WAGERING_LOCK' does not exist on type '{... Remove this comment to see the full error message
    case VALUABLE_TYPES.WAGERING_LOCK:
      if (awardType === "spins") {
        return "t-color-yellow-30";
      }

      if (["freeMoney", "bonusMoney"].includes(awardType)) {
        return "t-color-grey-70";
      }

      return "t-color-grey-70";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
    case VALUABLE_TYPES.DEPOSIT:
      return "t-color-grey-70";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPORT' does not exist on type '{}'.
    case VALUABLE_TYPES.SPORT:
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'FREE_BET' does not exist on type '{}'.
    case VALUABLE_TYPES.FREE_BET:
      return "t-color-grey-70";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPINS' does not exist on type '{}'.
    case VALUABLE_TYPES.SPINS:
      return "t-color-yellow-30";
    default:
      return "t-color-grey-70";
  }
}
