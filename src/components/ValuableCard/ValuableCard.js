// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { compose, prop } from "ramda";
import { VALUABLE_TYPES } from "Models/valuables";
import { getSymbolForCurrency } from "Utils";
import ValuableHeaderBackground from "./ValuableHeaderBackground";
import { VALUABLE_ICON, CoinValueToSpinType } from "./ValuableCard.utils";
import ValuableReward from "./ValuableReward";
import "./ValuableCard.scss";

type ValuableType = $Values<VALUABLE_TYPES>;

type Game = {
  gameImageUrl: string,
  title: string,
};

type Props = {
  id: string,
  title: string,
  valuableType: ValuableType,
  currency: string,
  valuableType: ValuableType,
  coinValue: number,
  game: Game,
  market: string,
};

class ValuableCard extends PureComponent<Props> {
  get valuableSymbol() {
    const { valuableType } = this.props;

    if (valuableType === VALUABLE_TYPES.CASH) {
      return this.cashSymbol;
    }

    if (valuableType === VALUABLE_TYPES.SPINS) {
      return compose(
        prop(this.spinType),
        prop(valuableType)
      )(VALUABLE_ICON);
    }

    return VALUABLE_ICON[valuableType];
  }

  get headerClassModifier(): string {
    const { valuableType } = this.props;
    const isValuableTypeSpins = valuableType === VALUABLE_TYPES.SPINS;

    return classNames(
      `c-valuable-card--${valuableType}`,
      isValuableTypeSpins && this.spinType
    );
  }

  // To move this to graphql
  get spinType() {
    return CoinValueToSpinType(this.props.coinValue);
  }

  cashSymbol = () => {
    const { market: locale, currency } = this.props;
    const currencySymbol = getSymbolForCurrency({ currency, locale });

    return (
      <Text tag="div" size="lg">
        {currencySymbol}
      </Text>
    );
  };

  render() {
    const { id, title, valuableType, game } = this.props;
    const isValuableTypeSpins = valuableType === VALUABLE_TYPES.SPINS;
    const isValuableTypeCash = valuableType === VALUABLE_TYPES.CASH;

    return (
      <Flex
        className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding-top"
        direction="vertical"
        gap="none"
      >
        <Flex.Block>
          <ValuableHeaderBackground
            className={this.headerClassModifier}
            imageUrl={isValuableTypeSpins ? game.gameImageUrl : ""}
            id={id}
          >
            <ValuableReward
              ValuableSymbol={this.valuableSymbol}
              justifyCenter={isValuableTypeCash}
            />
          </ValuableHeaderBackground>
        </Flex.Block>
        <Flex.Item className="c-valuable-card__content u-text-align-center">
          <div className="t-color-grey-dark-2 u-font-weight-bold u-font">
            {title}
          </div>
          {isValuableTypeSpins && (
            <div className="c-valuable-card__content-description t-color-grey u-font-xs u-margin-top">
              {game.title}
            </div>
          )}
        </Flex.Item>
      </Flex>
    );
  }
}

export default ValuableCard;
