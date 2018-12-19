// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { pick } from "ramda";
import info from "../../../.storybook/storybookInfo";
import PromotionGalleryCardConnected from "Components/PromotionGalleryCard";
import PromotionGalleryCard from "Components/PromotionGalleryCard/PromotionGalleryCard";
import promotions from "Components/PromotionGalleryCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionGalleryCard", module);

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
      <PromotionGalleryCardConnected slug="promotions.boosted-reelraces" />
    </MockStore>
  ),
  info({ text: "Displays the promotion card" })
);

stories.add(
  "Default (Presentational)",
  () => (
    <PromotionGalleryCard
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