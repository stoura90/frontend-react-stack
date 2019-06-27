// @flow
import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";

type Props = {
  title: string,
};
export default function ScrollableListTitle({ title }: Props) {
  return (
    <Text
      className={classNames(
        "u-padding-bottom--md",
        "u-padding-bottom--lg@tablet",
        "u-padding-bottom--lg@desktop",
        "u-font-weight-bold"
      )}
      data-test="scrollable-list-title"
      tag="h3"
    >
      {title}
    </Text>
  );
}
