// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import PromotionCards from "./PromotionCards";
import {
  promotionsSlugSelectorFactory,
  isPageLoadedFactory,
  fetchPageBySlug,
} from "Reducers/cms";
import type { Props } from "./PromotionCards";

type PublicProps = {
  slug: string,
};

const connector: Connector<PublicProps, Props> = connect(
  (state, { slug }) => ({
    promotionsSlugs: promotionsSlugSelectorFactory(slug)(state),
    isFetched: isPageLoadedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
);

export default connector(PromotionCards);
