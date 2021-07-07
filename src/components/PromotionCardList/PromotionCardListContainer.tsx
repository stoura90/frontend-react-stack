import React from "react";
import { useTranslations } from "Utils/hooks";
import type {
  TPromotion,
  TFlattenedPromotion,
  TPromotionListContents,
} from "../../models/promotions/promotions.types";
import { PromotionCardList } from "./PromotionCardList";
import { PromotionCardListSkeleton } from "./PromotionCardListSkeleton";

type Props = {
  slug: string;
  hideViewMore?: boolean;
};

const flattenPromotions = (promotions: TPromotion[]): TFlattenedPromotion[] => {
  return promotions.map(promo => ({ slug: promo.slug, ...promo.fields }));
};

const PromotionCardListContainer = React.memo<Props>(
  ({ slug, hideViewMore }: Props) => {
    const t = useTranslations<{ more_link: string }>(
      "built-pages.top-lists-translations"
    );

    const promotionsList = useTranslations<TPromotionListContents>(slug);

    if (!promotionsList || !t) {
      return <PromotionCardListSkeleton />;
    }

    const flattenedPromotionsList = flattenPromotions(
      promotionsList.promotions
    );

    if (promotionsList?.promotions.length) {
      return (
        <PromotionCardList
          seeMoreText={!hideViewMore && t.more_link}
          name={promotionsList.list_title}
          promotions={flattenedPromotionsList}
        />
      );
    }

    return null;
  }
);

export default PromotionCardListContainer;
