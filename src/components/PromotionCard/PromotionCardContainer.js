// @flow
import React from "react";
import { connect } from "react-redux";
import PromotionCard from "./PromotionCard";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Reducers/cms";
import type { Props } from "./PromotionCard";

const promotionImageField = "image";
const promotionBadgeField = "campaign_badge";

const PromotionCardConnected = connect(
  (state, { slug }) => ({
    isFetched: isPageLoadedFactory(slug)(state),
    image: fieldSelectorFactory({
      slug,
      field: promotionImageField,
    })(state),
    badge: fieldSelectorFactory({
      slug,
      field: promotionBadgeField,
    })(state),
  }),
  (dispatch, { promotionSlug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(promotionSlug)),
  })
)(PromotionCard);

const PromotionCardContainer = (props: Props) => (
  <PromotionCardConnected {...props} />
);

export default PromotionCardContainer;