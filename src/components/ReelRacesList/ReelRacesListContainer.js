// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import * as A from "Types/apollo";
import { tournamentChannelsSelector } from "Models/handshake";
import cometd from "Models/cometd/cometd.service";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

export const ReelRacesListContainer = () => {
  const { data, refetch } = useQuery<
    A.ReelRaceListQuery,
    A.ReelRaceListQueryVariables
  >(ReelRaceListQuery, {
    variables: {
      limit: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
    },
  });

  const tournamentChannels = useSelector(tournamentChannelsSelector);

  React.useEffect(() => {
    console.warn("Subscribing to Tournament Channels", tournamentChannels);
    tournamentChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/tournamentEvents/finished`,
        () => {
          refetch();
        }
      )
    );

    return function cleanup() {
      console.warn("Unsubscribing to Tournament Channels", tournamentChannels);
      tournamentChannels.forEach(channel =>
        cometd.unsubscribe(`${channel}/tournaments/tournamentEvents/finished`)
      );
    };
  }, [refetch, tournamentChannels]);

  const { t } = useTranslationsGql({
    title: "root:reel-races.reel-race-templates:fields.title",
    seeMore: "root:built-pages.top-lists-translations:fields.more_link",
  });

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return (
      <ReelRacesList
        reelRaces={reelRaces}
        title={t.title}
        seeMore={t.seeMore}
      />
    );
  }

  return null;
};
