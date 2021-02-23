import React from "react";
import { useQuery } from "@apollo/client";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/Settings/SettingsSe... Remove this comment to see the full error message
import PLAYER_LOGIN_HISTORY_QUERY from "Components/Settings/SettingsSections/PlayerLoginHistoryQuery.graphql";
import Timer from "Components/Timer";

export const CurrentSessionTimer = () => {
  const { data, loading } = useQuery(PLAYER_LOGIN_HISTORY_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading || !data) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  const [lastLogin, ...otherLogins] = data.player.loginHistory;

  return (
    <Timer
      render={state => `${state.hours}:${state.minutes}:${state.seconds}`}
      startTime={lastLogin.loginTime}
    />
  );
};
