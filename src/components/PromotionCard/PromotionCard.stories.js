// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { pick } from "ramda";
import info from "../../../.storybook/storybookInfo";
import PromotionCardConnected from "Components/PromotionCard";
import PromotionCard from "Components/PromotionCard/PromotionCard";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionCard", module);

const state = {
  schema: {
    cms: promotions,
  },
};

const promotionFields = pick(
  ["image", "campaign_badge", "link", "dates", "title"],
  promotions["promotions.boosted-reelraces"].fields
);

stories.add(
  "Default (Connected)",
  () => (
    <MockStore state={state}>
      <PromotionCardConnected slug="promotions.boosted-reelraces" />
    </MockStore>
  ),
  info({ text: "Displays the promotion card" })
);

stories.add(
  "Default (Presentational)",
  () => (
    <PromotionCard
      badge={promotionFields.campaign_badge}
      dates={promotionFields.dates}
      image={promotionFields.image}
      link={promotionFields.link}
      title={promotionFields.title}
      isFetched={true}
    />
  ),
  info({ text: "Displays the promotion card" })
);
