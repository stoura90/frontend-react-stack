import { activeIndicator } from "Features/sports/components/SportsNav/sportsNavUtils";

const sports = [
  {
    __typename: "EventGroup",
    id: 1000093190,
    userFavourite: true,
    canSelectSubgroups: true,
    name: "Football",
    popular: true,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
    activeIndicator,
    favouriteCompetitions: [
      {
        userFavourite: true,
        id: 1000093381,
        name: "Champions League",
        regionCode: "EU",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000094985,
        name: "Premier League",
        regionCode: "GB-ENG",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000094981,
        name: "The Championship",
        regionCode: "GB-ENG",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095001,
        name: "Serie A",
        regionCode: "IT",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 2000115276,
        name: "PFL 1 Play-offs",
        regionCode: "BG",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000449742,
        name: "Liga Águila",
        regionCode: "CO",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000094989,
        name: "Veikkausliiga",
        regionCode: "FI",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000385219,
        name: "Ekstraklasa",
        regionCode: "PL",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095042,
        name: "Primeira Liga",
        regionCode: "PT",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095590,
        name: "Premier League",
        regionCode: "RU",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095047,
        name: "Scottish Premiership",
        regionCode: "GB-SCT",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 2000051878,
        name: "1st Division",
        regionCode: "ZA",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095057,
        name: "Allsvenskan",
        regionCode: "SE",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095062,
        name: "Süper Lig",
        regionCode: "TR",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000450453,
        name: "Primera Division",
        regionCode: "UY",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 1000095063,
        name: "MLS",
        regionCode: "US",
        __typename: "EventGroup",
      },
      {
        userFavourite: true,
        id: 2000050125,
        name: "Premier League",
        regionCode: "GB-WLS",
        __typename: "EventGroup",
      },
    ],
  },
  {
    __typename: "EventGroup",
    id: 1000093193,
    userFavourite: true,
    canSelectSubgroups: false,
    name: "Tennis",
    popular: true,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/tennis.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093187,
    userFavourite: true,
    canSelectSubgroups: false,
    name: "Golf",
    popular: true,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/golf.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093199,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "American Football",
    popular: false,
    icon:
      "https://cms.casumo.com/wp-content/uploads/2019/02/american-football.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093200,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Athletics",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/athletics.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000449347,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Australian Rules",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/rugby.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093216,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Badminton",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093192,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Bandy",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/bandy.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093211,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Baseball",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/baseball.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093204,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Basketball",
    popular: true,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/basketball1.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093201,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Boxing",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/boxing.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000190837,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Chess",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/chess.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093178,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Cricket",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/cricket.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093232,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Curling",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093233,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Cycling",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/cycling.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093225,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Darts",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/darts.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000077768,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Esports",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/e-sports.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093206,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Floorball",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/floorball.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093184,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Futsal",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/volleyball.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000087309,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Gaelic Sports",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/gaelic.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093205,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Handball",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/handball.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093191,
    userFavourite: true,
    canSelectSubgroups: false,
    name: "Ice Hockey",
    popular: true,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/ice_hockey.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000050136,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Motorsports",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/motorsports.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000054941,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Netball",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/netball.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093179,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Olympic Games",
    popular: false,
    icon:
      "https://cms.casumo.com/wp-content/uploads/2019/02/games-olympics.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000061894,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Politics",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/politics.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000154363,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Rugby League",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/rugby.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093230,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Rugby Union",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/rugby.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093176,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Snooker",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/snooker.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000061311,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Surfing",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/surfing.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093195,
    userFavourite: true,
    canSelectSubgroups: false,
    name: "Trotting",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/trotting.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000053071,
    userFavourite: true,
    canSelectSubgroups: false,
    name: "TV & Novelty",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/tv_novelty.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093238,
    userFavourite: true,
    canSelectSubgroups: false,
    name: "UFC/MMA",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/mma.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093214,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Volleyball",
    popular: true,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/volleyball.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093263,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Water Polo",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000093180,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Winter Olympic Games",
    popular: false,
    icon:
      "https://cms.casumo.com/wp-content/uploads/2019/02/games-olympics.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 1000217859,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "Winter Sports",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/wintersports.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
  {
    __typename: "EventGroup",
    id: 2000089034,
    userFavourite: false,
    canSelectSubgroups: false,
    name: "WWE/Pro Wrestling",
    popular: false,
    icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
    activeIndicator,
    favouriteCompetitions: [],
  },
];

const sportsWithNoFavourites = sports.map(sport => ({
  ...sport,
  userFavourite: false,
  favouriteCompetitions: [],
}));

export const withFavouritesResult = {
  groups: sports,
};

export const noFavouritesResult = {
  groups: sportsWithNoFavourites,
};
