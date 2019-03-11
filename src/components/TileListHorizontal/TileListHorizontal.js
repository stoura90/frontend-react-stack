// @flow
import React, { PureComponent } from "react";
import { isEmpty, map } from "ramda";
import ScrollableListTitle from "Components/ScrollableListTitle";
import Scrollable from "@casumo/cmp-scrollable";
import Tile from "./Tile";
import TileListHorizontalSkeleton from "Components/TileListHorizontalSkeleton/TileListHorizontalSkeleton";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

const DEFAULT_SPACING = "default";

type ItemObject = {
  id: string,
  url: string,
  logo: string,
  background: string,
};

type Props = {
  /** fetches data needed to populate the list */
  fetch: () => void,
  title: string,
  items: Array<ItemObject>,
  isLoaded: boolean,
};

class TileListHorizontal extends PureComponent<Props> {
  static defaultProps = {
    fetch: () => {},
    title: "",
    items: [],
    isLoaded: false,
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { title, items, isLoaded } = this.props;

    if (!isLoaded) {
      return <TileListHorizontalSkeleton />;
    }

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing={DEFAULT_SPACING}>
          {map(
            ({ id, ...rest }) => (
              <Tile key={id} {...rest} />
            ),
            items
          )}
        </Scrollable>
      </div>
    );
  }
}

export default TileListHorizontal;