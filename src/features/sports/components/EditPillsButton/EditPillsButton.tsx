// @flow
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../../../node_modules/@types/react"... Remove this comment to see the full error message
import type { Node } from "react";
import classNames from "classnames";
import { CloseIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  /** onClick handler for the edit button */
  onClick: () => void,
  /** className overrides to restyle the button */
  className?: string,
  /** optional label to show below the button */
  label?: Node,
};

export const defaultClasses =
  "t-background-white t-color-grey-50 t-elevation--10";

const EditPillsButton = ({
  onClick,
  label,
  className = defaultClasses,
}: Props) => (
  <Flex
    direction="vertical"
    align="center"
    className="u-cursor-pointer"
    onClick={onClick}
  >
    <Flex.Item
      className={classNames("t-border-r--circle o-flex u-padding", className)}
      data-test="edit-pills-button-container"
    >
      <CloseIcon size="sm" className="u-transform-rotate-z--45" />
    </Flex.Item>
    {label && (
      <Flex.Item>
        <Text
          style={{ marginTop: 1 }}
          size="sm"
          className="u-font-weight-black u-text-align-center u-text-nowrap t-color-grey-50 u-margin-bottom--none"
        >
          {label}
        </Text>
      </Flex.Item>
    )}
  </Flex>
);

export default EditPillsButton;
