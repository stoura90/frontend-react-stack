// @flow
import React from "react";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import { NAVIGATE_CLIENT_MUTATION } from "Features/sports/state";
import { type SportsNavItemType } from "Features/sports/components/SportsNav";

const selectPath = (client: *, path: string) => {
  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "SportsNav",
    },
  });
};

const isNavItemSelected = (currentHash: string = "") => (
  navItem: SportsNavItemType
) => {
  const isSubNavItem = Boolean(navItem.parentPath);
  const isCurrentHash = isSubNavItem
    ? currentHash === `#${navItem.path}`
    : currentHash.startsWith(`#${navItem.path}`);
  const isDrillDown = currentHash.includes(
    navItem.path.replace(/racing|filter/, "drill-down")
  );

  return isCurrentHash || isDrillDown;
};

const onNavItemSelected = (
  currentHash: string,
  client: *,
  isLiveActive: boolean = false
) => (navItem: SportsNavItemType) => {
  const isPathUnchanged = `#${navItem.path}` === currentHash;
  const hasParentPath = currentHash.includes(`${navItem.path}/`);
  const path =
    isPathUnchanged && hasParentPath ? navItem.parentPath : navItem.path;

  tracker.track(EVENTS.MIXPANEL_SPORTS_NAV_SELECTED, {
    [EVENT_PROPS.SPORTS_SELECTED_NAV]: path,
    [EVENT_PROPS.SPORTS_IS_LIVE_ACTIVE]: isLiveActive,
  });

  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "SportsNav",
    },
  });
};

const toSubNavItem = (sport: UserNavigation_sportsNavigation_sport) => (
  subNav: UserNavigation_sportsNavigation_subNav
) => ({
  text: (
    <>
      {subNav.competition.regionCode && (
        <RegionFlag
          regionCode={subNav.competition.regionCode}
          className="u-margin-right"
        />
      )}
      {subNav.competition.name}
    </>
  ),
  path: subNav.competition.clientPath,
  parentPath: sport.clientPath,
  key: sport.termKey,
  canEdit: false,
});

const toNavItem = ({
  sport,
  subNav,
}: UserNavigation_sportsNavigation): SportsNavItemType => ({
  text: sport.name,
  path: sport.clientPath,
  key: sport.termKey,
  iconProps: {
    iconSrc: sport.icon,
    activeIndicator: sport.activeIndicator,
    alt: sport.name,
  },
  canEdit: sport.canSelectSubgroups,
  subNav: subNav.map(toSubNavItem(sport)),
});

export const navItemUtils = {
  selectPath,
  isNavItemSelected,
  onNavItemSelected,
  toSubNavItem,
  toNavItem,
};