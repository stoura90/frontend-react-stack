import {
  KambiBetOffer,
  KambiBetOfferOutcome,
  KambiEvent,
  SportsHomeEvent,
  SportsHomeOutcome,
  SportsHomeTranslations,
  SportsHomeTranslationsDictionary,
} from "./types";

class SportsHomeAdapters {
  convertToSportsHomeOfferings(
    events: KambiEvent[],
    betOffers: KambiBetOffer[]
  ): SportsHomeEvent[] {
    return events.map<SportsHomeEvent>(event => {
      const betOffer = betOffers.find(x => x.eventId === event.id);
      return {
        id: event.id,
        betOfferId: betOffer.id,
        betOfferType: betOffer.betOfferType.id,
        name: event.name,
        sport: event.sport,
        group: event.group,
        startTime: event.start,
        score: "",
        outcomes: this.convertToSportsHomeOutcomes(betOffer.outcomes),
      } as SportsHomeEvent;
    });
  }

  convertToSportsHomeOutcomes(
    kambiBetOfferOutcomes: KambiBetOfferOutcome[]
  ): SportsHomeOutcome[] {
    return kambiBetOfferOutcomes.map<SportsHomeOutcome>(outcome => {
      return {
        id: outcome.id,
        type: outcome.label,
        label: outcome.participant,
        odds: outcome.odds,
        fractional: outcome.oddsFractional,
      } as SportsHomeOutcome;
    });
  }

  convertToSportsHomeTranslations(
    data: SportsHomeTranslationsDictionary
  ): SportsHomeTranslations {
    return {
      live: data.dictionary.find(x => x.key === "sports_home_live")?.value,
      draw: data.dictionary.find(x => x.key === "sports_home_draw")?.value,
      title: data.dictionary.find(x => x.key === "sports_home_title")?.value,
    } as SportsHomeTranslations;
  }
}

export default new SportsHomeAdapters();
