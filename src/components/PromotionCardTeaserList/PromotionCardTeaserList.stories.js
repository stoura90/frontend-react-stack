// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionCardTeaserList", module);

stories.add(
  "Default",
  () => (
    <MockStore state={state}>
      <PromotionCardTeaserList slug="promotions" />
    </MockStore>
  ),
  {
    backgrounds: [{ name: "colorful", value: "#0085c1", default: true }],
    ...info({ text: "Default" }),
  }
);
