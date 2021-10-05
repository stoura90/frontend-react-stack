export type SportsHomeTranslations = {
  live: string;
  draw: string;
  title: string;
};

export type SportsHomeTranslationsDictionary = {
  dictionary: TranslationDictionaryItem[];
};

export type TranslationDictionaryItem = {
  key: string;
  value: string;
};

export type SportsHomeOutcome = {
  id: number;
  type: string;
  label: string;
  odds: number;
  fractional: string;
  isDisabled: boolean;
};

export type SportsHomeEvent = {
  id: number;
  betOfferId: number;
  betOfferType: number;
  name: string;
  sport: string;
  group: string;
  startTime: string;
  live: boolean;
  score: string;
  show: boolean;
  outcomes: SportsHomeOutcome[];
};

export type SportsHomeType = {
  translations: SportsHomeTranslations;
  events: SportsHomeEvent[];
  fractional: boolean;
  locale: string;
};

// Kambi Offering Api Types
export interface KambiBetOffer {
  id: number;
  betOfferType: KambiBetOfferType;
  eventId: number;
  outcomes: KambiBetOfferOutcome[];
}

export interface KambiBetOfferType {
  id: number;
  name: string;
  englishName: string;
}

export interface KambiBetOfferOutcome {
  id: number;
  label: string;
  participant: string;
  odds: number;
  status: string;
  oddsAmerican: string;
  oddsFractional: string;
}

export interface KambiEvent {
  id: number;
  name: string;
  englishName: string;
  homeName: string;
  awayName: string;
  start: string;
  group: string;
  groupId: number;
  sport: string;
}

export interface KambiOfferingResponse {
  betOffers: KambiBetOffer[];
  events: KambiEvent[];
}

export interface KambiOfferingServerResponse {
  data: KambiOfferingResponse;
}

export interface SportsHomeConfigurationTranslations {
  status: string;
  available_sports: string;
  order_no: string;
  mobile: SportsHomeTranslationsMobile;
  desktop: SportsHomeTranslationsDesktop;
  tablet: SportsHomeTranslationsTablet;
  status_live: string;
  available_sports_live: string;
  order_no_live: string;
  mobile_live: SportsHomeTranslationsMobile;
  desktop_live: SportsHomeTranslationsDesktop;
  tablet_live: SportsHomeTranslationsTablet;
}

export interface SportsHomeTranslationsMobile {
  number_of_events_mobile: string;
}

export interface SportsHomeTranslationsDesktop {
  number_of_events_desktop: string;
}

export interface SportsHomeTranslationsTablet {
  number_of_events_tablet: string;
}

export interface SportsHomePopularBetsConfigurations {
  isEnabled: boolean;
  availableSports: string;
  orderNo: number;
  numberOfEventsMobile: number;
  numberOfEventsTablet: number;
  numberOfEventsDesktop: number;
}
