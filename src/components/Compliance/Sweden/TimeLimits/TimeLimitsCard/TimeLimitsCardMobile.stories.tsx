// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import dailyLimitMock from "Models/playOkay/timeLimits/__mocks__/dailyLimit";
import weeklyLimitMock from "Models/playOkay/timeLimits/__mocks__/weeklyLimit";
import monthlyLimitMock from "Models/playOkay/timeLimits/__mocks__/monthlyLimit";
import stateMock from "Components/Duration/__mocks__/state";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsCardMobile",
  module
);

stories.add("Default", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardMobile
        t={cmsMock}
        onClick={action("card clicked")}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ comingLimit: { activationTime: number; aut... Remove this comment to see the full error message
        dailyLimit={dailyLimitMock}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ comingLimit: any; comingRevocation: any; c... Remove this comment to see the full error message
        weeklyLimit={weeklyLimitMock}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ comingLimit: any; comingRevocation: any; c... Remove this comment to see the full error message
        monthlyLimit={monthlyLimitMock}
      />
    </MockStore>
  );
});
