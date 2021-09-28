import { useQuery } from "@apollo/client";
import * as React from "react";
import * as sportsHome from "@casumo/sports-home";
import { SPORTS_POPULAR_BETS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import {
  getKambiSupportedLanguage,
  getKambiWidgetAPI,
} from "Features/sports/kambi";
import { getOffering } from "Features/sports/kambi/getKambiOffering";
import SportsHomeService from "./SportsHome.service";
import SportsHomeAdapters from "./SportsHome.adapters";
import { SportsHomeTranslationsDictionary, SportsHomeType } from "./types";

const eventClick = async (eventId: number) => {
  const wapi = await getKambiWidgetAPI();

  wapi.navigateClient(`event/${eventId}`);
};

const outcomeClick = async (outcomeId: number) => {
  const wapi = await getKambiWidgetAPI();

  wapi.set(wapi.BETSLIP_OUTCOMES, {
    updateMode: wapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
    outcomes: [outcomeId],
    couponType: wapi.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION,
  });
};

const renderSportsHome = (data: SportsHomeType) => {
  if (!data) {
    return null;
  } else {
    return (
      <div>
        <sportsHome.SportsHome
          events={data.events}
          fractional={false}
          translations={data.translations}
          locale={data.locale}
          eventClick={eventClick}
          outcomeClick={outcomeClick}
        />
        <div className="hover:bg-grey-20 display-none" />
      </div>
    );
  }
};

export const SportsHome = ({
  numberOfEvents,
  market,
  sports,
  language,
  locale,
  t,
}: {
  numberOfEvents: number;
  market?: TMarket;
  sports: string;
  language: string;
  locale: string;
  t: SportsHomeTranslationsDictionary;
}) => {
  const variables = {
    numberOfEvents: numberOfEvents,
    sports: sports,
    market: "ES",
    language: language,
    locale: locale,
    t: t,
  };
  const { error, data } = useQuery(SPORTS_POPULAR_BETS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [kambiLocale, setKambiLocale] = React.useState("en_GB");
  React.useEffect(() => {
    if (locale) {
      setKambiLocale(getKambiSupportedLanguage(locale.replace("-", "_")));
    }
  }, [locale]);

  const [kambiOffering, setKambiOffering] = React.useState("ca");
  React.useEffect(() => {
    if (language) {
      setKambiOffering(getOffering(language));
    }
  }, [language]);

  const [
    sportsPopularBetsData,
    setSportsPopularBetsData,
  ] = React.useState<SportsHomeType>();

  React.useEffect(() => {
    const fetchData = async () => {
      if (data?.sportsPopularBets?.popularEvents.length && market) {
        // use data to fetch event details from Kambi Offerrings REST API Data
        const eventIds = data.sportsPopularBets.popularEvents[0].events.map(
          popularEvent => popularEvent.eventId
        );

        const eventIdsArgs = eventIds.join();

        const kambiOfferings = await SportsHomeService.getOfferings(
          kambiOffering,
          eventIdsArgs,
          kambiLocale
        );

        const offerringData = SportsHomeAdapters.convertToSportsHomeOfferings(
          kambiOfferings.data.events,
          kambiOfferings.data.betOffers
        );

        const sportsHomeType = {
          events: offerringData,
          fractional: true,
          locale: locale,
          translations: SportsHomeAdapters.convertToSportsHomeTranslations(t),
        } as SportsHomeType;

        // organise sports data include Kambi Offerrings REST API Data
        setSportsPopularBetsData(sportsHomeType);
      }
    };
    fetchData();
  }, [data, kambiLocale, kambiOffering, locale, market, t]);

  if (error) {
    return <ErrorMessage direction="horizontal" />;
  }

  if (data && !data.sportsPopularBets.popularEvents.length) {
    return <ErrorMessage direction="horizontal" />;
  }

  return renderSportsHome(sportsPopularBetsData);
};
