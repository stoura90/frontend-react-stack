// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { isEmpty } from "ramda";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import GameTile from "Components/GameTile";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";

export const DEFAULT_SPACING = "default";
export const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

type Props = {
  title: string,
  /** url to "see more" page, if null will not render "see more" button */
  seeMoreUrl: string,
  itemIds: Array<string>,
  Component: Function,
  spacing: spacerSizes | responsiveSpacerSizes,
  /** "see more" link translation */
  seeMoreText: string,
  itemClassName?: string,
};

export default class ScrollableList extends PureComponent<Props> {
  static defaultProps = {
    itemIds: [],
    spacing: DEFAULT_SPACING,
    Component: GameTile,
  };

  render() {
    const {
      Component,
      itemIds,
      seeMoreText,
      seeMoreUrl,
      spacing,
      title,
      itemClassName,
    } = this.props;

    if (isEmpty(itemIds)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitleRow
          paddingLeft
          seeMore={{ text: seeMoreText, url: seeMoreUrl }}
          title={title}
        />
        <Scrollable
          itemClassName={itemClassName}
          padding={PADDING_PER_DEVICE}
          itemSpacing={spacing}
        >
          {itemIds.map(itemId => (
            <Component key={itemId} id={itemId} />
          ))}
        </Scrollable>
      </div>
    );
  }
}
