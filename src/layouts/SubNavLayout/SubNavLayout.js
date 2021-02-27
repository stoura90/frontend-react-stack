// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import InputField from "@casumo/cmp-input-field";
import { SearchIcon } from "@casumo/cmp-icons";
import { TabletAndDesktop, Mobile } from "Components/ResponsiveLayout";
import { ContentWrapper } from "Components/ContentWrapper";
import { NavLink } from "Components/NavLink";

import "./SubNavLayout.scss";

type TLinkItem = {
  to: string,
  text: string,
};
type TProps = {
  children: React.Node,
  links: TLinkItem[],
};

export const SubNavLayout = ({ children, links }: TProps) => {
  if (!links) {
    return children;
  }

  return (
    <React.Fragment>
      <div className="t-background-white">
        <ContentWrapper>
          <Flex spacing="xlg" align="center" className="c-sub-nav-layout">
            <Mobile>
              <Flex.Block>Logo</Flex.Block>
            </Mobile>
            <Flex.Item>
              <Flex spacing="xlg" align="center">
                {links.map(link => (
                  <Flex.Item key={link.to} className="u-margin-x--md">
                    <NavLink
                      to={link.to}
                      className="u-font-weight-bold o-flex-align--center o-flex--vertical u-position-relative t-color-grey-70"
                      activeClassName="c-sub-nav-item--active t-color-purple-60"
                    >
                      {link.text}
                    </NavLink>
                  </Flex.Item>
                ))}
              </Flex>
            </Flex.Item>
            <TabletAndDesktop>
              <Flex.Block className="c-sub-nav-layout__search">
                <div>
                  <InputField
                    onChange={value => {}}
                    className="u-width--full"
                    inputClassName="u-width--full"
                    placeholder="Search"
                    type="text"
                    value=""
                    icon={SearchIcon}
                  />
                </div>
              </Flex.Block>
            </TabletAndDesktop>
            <Mobile>
              <Flex.Item>
                <SearchIcon />
              </Flex.Item>
            </Mobile>
            <TabletAndDesktop>
              <Flex.Block className="o-flex-justify--end">
                <div className="u-display--inline-block u-padding-x--lg t-color-white t-background-grey-5 u-padding-y--md">
                  Balance Component
                </div>
              </Flex.Block>
            </TabletAndDesktop>
          </Flex>
        </ContentWrapper>
      </div>
      {children}
    </React.Fragment>
  );
};
