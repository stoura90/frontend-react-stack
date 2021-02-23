import React from "react";
import BezierEasing from "bezier-easing";
import { formatCurrency } from "Utils";

export const MoneyAmountCounter = ({
  amount,
  animationTime = 2000,
  locale,
  currency,
}) => {
  const [value, setValue] = React.useState(0);
  const [startTime, setStartTime] = React.useState();
  const [passedTime, setPassedTime] = React.useState(0);

  React.useEffect(() => {
    if (!startTime) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      setStartTime(Date.now());
    }
  }, [startTime]);

  React.useEffect(() => {
    const bezier = new BezierEasing(0.28, 1.0, 0.59, 1.0);

    if (passedTime <= animationTime) {
      const interval = setInterval(() => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        setPassedTime(Date.now() - startTime);

        if (passedTime >= animationTime) {
          clearInterval(interval);
        }
      }, 20);

      if (animationTime > 0) {
        setValue(bezier(passedTime / animationTime) * amount);
      }

      return () => {
        clearInterval(interval);
      };
    } else {
      setValue(amount);
    }
  }, [amount, animationTime, passedTime, startTime]);

  const formattedValue = formatCurrency({
    value,
    currency,
    locale,
    minimumFractionDigits: 2,
  });

  return <span>{formattedValue}</span>;
};
