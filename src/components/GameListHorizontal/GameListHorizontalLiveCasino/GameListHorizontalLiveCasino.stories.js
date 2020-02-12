// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
import { GameListLiveCasinoQuery } from "./GameListHorizontalLiveCasino.graphql";

const stories = storiesOf("GameListHorizontalLiveCasino", module);
const mocks = [
  {
    request: {
      query: GameListLiveCasinoQuery,
      variables: {
        name: "liveCasinoGames",
      },
    },
    result: {
      data: {
        gamesList: {
          id: "liveCasinoGames",
          name: "Live Casino",
          games: [
            {
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2018/04/lightning-bg.png",
              id: "474df1b0-8b5d-11e8-85b2-0242ac110002",
              isInMaintenance: false,
              isInMyList: false,
              liveCasinoLobby: {
                id: "LightningTable01",
                tableId: "LightningTable01",
                symbol: null,
                numberOfPlayers: null,
                provider: "evolution",
                results: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
                image: "https://lob.egcvi.com/thumbnail/lightr1_imr_med_L.jpg",
                type: "Roulette",
                betBehind: null,
                bets: null,
              },
              logo:
                "https://cms.casumo.com/wp-content/uploads/2018/04/lightningroulette-logo.png",
              name: "Lightning Roulette",
              slug: "evolution-lightning-roulette",
            },
            {
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2020/01/Lightning_baccarat_Thumbnail_BG.png",
              id: "932c1650-32de-11ea-8112-0242ac110003",
              isInMaintenance: false,
              isInMyList: false,
              liveCasinoLobby: {
                id: "LightningBac0001",
                tableId: "LightningBac0001",
                symbol: null,
                numberOfPlayers: null,
                provider: "evolution",
                results: ["T", "T", "T", "B", "T", "P", "P", "P", "B"],
                image:
                  "https://lob.egcvi.com/thumbnail/lbmigration_bs_med_L.jpg",
                type: "Baccarat",
                betBehind: null,
                bets: null,
              },
              logo:
                "https://cms.casumo.com/wp-content/uploads/2020/01/Lightning_baccarat_Thumbnail_Logo.png",
              name: "Lightning Baccarat",
              slug: "lightning-baccarat",
            },
            {
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2019/03/monopoly-live_bg.jpg",
              id: "70b81d90-39e1-11e9-a1d2-0242ac110002",
              isInMaintenance: false,
              isInMyList: false,
              liveCasinoLobby: {
                id: "Monopoly00000001",
                tableId: "Monopoly00000001",
                symbol: null,
                numberOfPlayers: 1,
                provider: "evolution",
                results: ["2", "5", "5", "5", "2", "4r", "10", "5", "2r", "2r"],
                image: "https://lob.egcvi.com/thumbnail/mdc2_mw_en_med_L.jpg",
                type: "Monopoly",
                betBehind: null,
                bets: null,
              },
              logo:
                "https://cms.casumo.com/wp-content/uploads/2019/03/monopoly-live_logo.png",
              name: "MONOPOLY Live",
              slug: "monopoly-live",
            },
            {
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2019/04/deal-or-no-deal-gameplate.png",
              id: "c666e380-39e0-11e9-a1d2-0242ac110002",
              isInMaintenance: false,
              isInMyList: false,
              liveCasinoLobby: {
                id: "dealnodeal000001",
                tableId: "dealnodeal000001",
                symbol: null,
                numberOfPlayers: null,
                provider: "evolution",
                results: [],
                image: "https://lob.egcvi.com/thumbnail/gen_dond1_med_L.jpg",
                type: "DealNoDeal",
                betBehind: null,
                bets: null,
              },
              logo:
                "https://cms.casumo.com/wp-content/uploads/2019/04/deal-or-no-deal-logo.png",
              name: "Deal or No Deal",
              slug: "deal-or-no-deal-2",
            },
            {
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2017/09/three_card_poker_Thumbnail_BG.png",
              id: "26e917c0-40fa-11e5-a453-005056a03af2",
              isInMaintenance: false,
              isInMyList: false,
              liveCasinoLobby: {
                id: "n5emwq5c5dwepwam",
                tableId: "n5emwq5c5dwepwam",
                symbol: null,
                numberOfPlayers: null,
                provider: "evolution",
                results: [],
                image: "https://lob.egcvi.com/thumbnail/pk_3card_med_L.jpg",
                type: "TCP",
                betBehind: null,
                bets: null,
              },
              logo:
                "https://cms.casumo.com/wp-content/uploads/2017/09/three_card_poker_Thumbnail_Logo.png",
              name: "Three Card Poker",
              slug: "evolution-live-three-card-poker",
            },
          ],
        },
      },
    },
  },
];

stories.add("Default", () => (
  <MockedProvider mocks={mocks}>
    <GameListHorizontalLiveCasino
      list={mocks[0].result.data.gamesList}
      seeMoreText="See more"
    />
  </MockedProvider>
));
