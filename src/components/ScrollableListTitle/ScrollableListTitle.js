// @flow
import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";

type Props = {
  /** The text to show */
  title: string,
  /** Whether applying padding left or not */
  paddingLeft?: boolean,
};

export default function ScrollableListTitle({ title, paddingLeft }: Props) {
  const paddingLeftClasses =
    "u-padding-left--md u-padding-left--3xlg@tablet u-padding-left--3xlg@desktop";
  return (
    <Text
      className={classNames(
        "u-padding-bottom--md",
        "u-padding-bottom--lg@tablet",
        "u-padding-bottom--lg@desktop",
        "u-font-weight-bold",
        paddingLeft && paddingLeftClasses
      )}
      data-test="scrollable-list-title"
      tag="h3"
    >
      {title}
    </Text>
  );
}
