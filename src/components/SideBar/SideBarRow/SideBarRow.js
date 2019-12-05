// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import "./SideBarRow.scss";

type Props = {
  text: string,
  label?: string,
  Icon?: string,
  cssClasses: Array<string>,
  link?: string,
  action?: Function,
};

export class SideBarRow extends PureComponent<Props> {
  render() {
    const { text, label, Icon, cssClasses, link, action } = this.props;

    const stylesLi = classNames(
      `u-font-weight-bold`,
      `c-sidebar-nav-li`,
      `u-margin--none`,
      `u-padding--none`,
      `u-position-relative`,
      `u-overflow-hidden`,
      getLiClassNamesByParam(cssClasses)
    );

    const sylesA = classNames(getAClassNamesByParam(cssClasses));

    return (
      <li className={stylesLi} data-test-id="sidebar-li">
        <a
          data-test-id="sidebar-link"
          className={sylesA}
          onClick={action}
          href={link}
        >
          <Flex
            align="center"
            justify="center"
            direction="vertical"
            className="u-height--full"
          >
            {Icon && (
              <Icon
                className="u-height--3xlg u-width--3xlg"
                data-test-id="sidebar-icon"
              />
            )}
            <div data-test-id="sidebar-text">{text}</div>
            {label && (
              <div
                className="u-font-sm t-color-turquoise"
                data-test-id="sidebar-text-small"
              >
                {label}
              </div>
            )}
          </Flex>
        </a>
      </li>
    );
  }
}

const getLiClassNamesByParam = (cssClassArray: Array<string> = []) => {
  const mapArray = {
    default: "t-background-plum t-color-white",
    white: "t-background-white c-sidebar-nav__white t-color-grey-dark-1",
    selected: "t-background-turquoise t-color-white",
  };

  if (cssClassArray.length === 0) {
    return mapArray["default"];
  }

  return cssClassArray.map(css => mapArray[css]);
};

const getAClassNamesByParam = (cssClassArray: Array<string> = []) => {
  const mapArray = {
    default: "t-color-white",
    white: "t-color-grey-dark-1",
    selected: "t-color-white",
  };

  if (cssClassArray.length === 0) {
    return mapArray["default"];
  }

  return cssClassArray.map(css => mapArray[css]);
};
