// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import PromotionCardTeaser from "Components/PromotionCardTeaser";
import "./PromotionCardTeaserList.scss";

type Props = {
  promotionsSlugs: Array<string>,
  backgroundColor: string,
  maskImageBottom?: string,
  maskImageTop?: string,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
};

class PromotionCardTeaserList extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchCampaign();
    this.props.fetchPromotions();
  }

  render() {
    const {
      promotionsSlugs,
      backgroundColor,
      maskImageBottom = "",
      maskImageTop = "",
    } = this.props;

    if (!promotionsSlugs.length) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `t-background-${backgroundColor}`,
          "u-margin-bottom--lg",
          "u-padding-top--xlg",
          "c-promotion-card-teaser-list"
        )}
        style={{ backgroundImage: `url(${maskImageTop})` }}
      >
        <div
          className="u-padding-bottom--xlg c-promotion-card-teaser-list__wrap"
          style={{ backgroundImage: `url(${maskImageBottom})` }}
        >
          <div className="c-promotion-card-teaser-list__items u-padding-horiz--lg">
            {promotionsSlugs.map(promotionSlug => (
              <div className="u-margin-bottom--md" key={promotionSlug}>
                <PromotionCardTeaser
                  slug={`promotions.${promotionSlug}`}
                  link={`promotions/${promotionSlug}`}
                  key={promotionSlug}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PromotionCardTeaserList;
