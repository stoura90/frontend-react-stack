// @flow
import * as React from "react";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";
import TrackClick from "Components/TrackClick";
import { EVENTS } from "Src/constants";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../models/payments"' has no exported m... Remove this comment to see the full error message
import { type QuickDepositMethod } from "Models/payments";

type PaymentMethodDetailsProps = {
  method: QuickDepositMethod,
};

const TRIM_METHOD_START_POINT = -8;

export const PaymentMethodDetails = ({ method }: PaymentMethodDetailsProps) => {
  const identifier = (method?.identifier || "").substr(TRIM_METHOD_START_POINT);

  return (
    <Media
      renderImage={() => (
        <img
          className="u-display--block"
          width={64}
          alt={method.displayName}
          src={method.image}
        />
      )}
      renderText={() => (
        <TrackClick
          eventName={EVENTS.MIXPANEL_QUICK_DEPOSIT_CARD_NUMBER_CLICKED}
        >
          <Text
            size="sm"
            className="u-margin-bottom--sm u-font-weight-bold t-color-black"
          >
            {identifier}
          </Text>
        </TrackClick>
      )}
    />
  );
};
