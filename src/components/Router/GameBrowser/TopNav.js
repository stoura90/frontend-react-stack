// @flow
import * as React from "react";
import classNames from "classnames";
import { Link, useMatch } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TopListsIcon, PlayIcon, SearchIcon } from "@casumo/cmp-icons";
import { isTablet } from "Components/ResponsiveLayout";
import { useTranslations } from "Utils/hooks";

const NavLinkDesktop = ({
  Icon,
  text,
  to,
  active,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: string,
  to: string,
  active?: boolean,
}) => (
  <Flex.Item>
    <Link to={to}>
      <Flex
        direction="vertical"
        align="center"
        justify="center"
        className={classNames("u-padding--sm", {
          "t-color-grey-90": active,
          "t-color-grey-70": !active,
        })}
      >
        <Icon size="md" />
        <Text className="u-font-weight-bold">{text}</Text>
      </Flex>
      <Flex
        style={{ height: 3 }}
        className={classNames("t-border-r", {
          "t-background-purple-60": active,
        })}
      />
    </Link>
  </Flex.Item>
);
export const TopNavDesktop = () => {
  const match = useMatch("search");
  const searchActive = Boolean(match);

  return (
    <Flex
      className="o-wrapper u-padding-top--xlg"
      align="center"
      justify="center"
    >
      <Flex spacing="lg" className="u-padding-y">
        <NavLinkDesktop
          Icon={PlayIcon}
          text="Casino"
          to="."
          active={!searchActive}
        />
        <NavLinkDesktop
          Icon={SearchIcon}
          text="Search"
          to="search"
          active={searchActive}
        />
      </Flex>
    </Flex>
  );
};

const NavLinkMobile = ({
  Icon,
  text,
  to,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: string,
  to: string,
}) => {
  const match = useMatch(to);
  const active = Boolean(match);
  const tablet = isTablet();

  return (
    <Flex.Item>
      <Link
        to={to}
        style={{
          /* kill styles from knockout side */
          borderBottom: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <Flex
          direction="vertical"
          align="center"
          justify="center"
          className={classNames(tablet ? "u-padding--md" : "u-padding", {
            "t-color-grey-90": active,
            "t-color-grey-70": !active,
          })}
        >
          <Icon size={tablet ? "md" : "default"} className="u-padding-y" />
          <Text size={tablet ? "sm" : "xs"} className="u-font-weight-bold">
            {text}
          </Text>
        </Flex>
        <Flex
          style={{
            height: 3,
            margin: tablet ? -2 : 0, // this is for compatibility with current ko menu
          }}
          className={classNames("t-border-r", {
            "t-background-purple-60": active,
          })}
        />
      </Link>
    </Flex.Item>
  );
};

export const TopNavMobile = () => {
  const t = useTranslations<{
    top_lists: string,
    search: string,
  }>("new-game-browser.top-nav");
  const tablet = isTablet();

  return (
    <Flex spacing={tablet ? "md" : "sm"}>
      <NavLinkMobile Icon={TopListsIcon} text={t?.top_lists || ""} to="top" />
      <NavLinkMobile Icon={SearchIcon} text={t?.search || ""} to="search" />
    </Flex>
  );
};