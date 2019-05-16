// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import Coin from "./Icons/coin.svg";

type Props = {
  ValuableSymbol: () => Node,
  justifyCenter?: boolean,
  className?: string,
};

const ValuableReward = ({
  ValuableSymbol,
  justifyCenter,
  className,
}: Props) => {
  const contentClassModifier = justifyCenter
    ? "o-flex-justify--center o-flex-align--center"
    : "";

  return (
    <div
      className={classNames(
        className,
        "c-valuable-reward u-position-relative",
        contentClassModifier
      )}
    >
      <div className="c-valuable-reward__content u-position-absolute u-font-weight-bold">
        <ValuableSymbol />
      </div>
      <Coin />
    </div>
  );
};

export default ValuableReward;
