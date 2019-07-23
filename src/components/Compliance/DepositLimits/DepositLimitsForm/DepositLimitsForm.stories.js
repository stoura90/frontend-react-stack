// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsForm } from "./DepositLimitsForm";
import t from "./__mocks__/cms.json";

const stories = storiesOf("DepositLimitsForm", module);

stories.add("Default", () => (
  <DepositLimitsForm
    t={t}
    applyLimitsChanges={action("applyLimitsChanges click")}
    limits={{
      daily: 600,
      weekly: 1500,
      monthly: 3000,
      currency: "EUR",
      previouslyIncreased: false,
    }}
    locale="en-GB"
  />
));