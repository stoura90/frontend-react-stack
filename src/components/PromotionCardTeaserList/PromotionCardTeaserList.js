// @flow
import React, { PureComponent } from "react";
import PromotionCardTeaser from "Components/PromotionCardTeaser";
import "./PromotionCardTeaserList.scss";

type Props = {
  isFetched: boolean,
  startFetch: () => void,
  promotionsSlugs: Array<string>,
  slug: string,
};

export class PromotionCardTeaserList extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { promotionsSlugs, slug } = this.props;

    if (!promotionsSlugs.length) {
      return null;
    }

    return (
      <div className="c-promotion-card-teaser-list u-padding-top--xlg u-padding-horiz--md">
        {promotionsSlugs.map(promotionSlug => (
          <div className="u-margin-bottom--md" key={promotionSlug}>
            <PromotionCardTeaser
              slug={`${slug}.${promotionSlug}`}
              key={promotionSlug}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default PromotionCardTeaserList;
