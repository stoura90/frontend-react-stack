// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import MockStore from "Components/MockStore";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";
import { GameListExclusiveQuery } from "./GameListHorizontalExclusive.graphql";

const stories = storiesOf("GameListHorizontalExclusive", module);
const mocks = [
  {
    request: {
      query: GameListExclusiveQuery,
      variables: {
        name: "exclusiveGames",
      },
    },
    result: {
      data: {
        gamesList: {
          id: "exclusiveGames",
          name: "Only At Casumo",
          games: [
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2020/01/wild_cauldron_Thumbnail_BG.png",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2020/01/wild_cauldron_Thumbnail_Logo.png",
              name: "Wild Cauldron",
              slug: "wild-cauldron",
              id: "37cf2833-cfeb-4e18-90fd-6a43002f1d68",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2020/01/beat_the_beast_kraken_s_lair_Thumbnail_BG.png",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2020/01/beat_the_beast_kraken_s_lair_Thumbnail_Logo.png",
              name: "Beat the Beast: Kraken’s Lair",
              slug: "beat-the-beast-krakens-lair",
              id: "badd838d-4c9b-405b-93ce-d9d9a202d7a2",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2019/11/Diamond_Mine_Thumbnail_BG.png",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2019/11/Diamond_Mine_Thumbnail_Logo.png",
              name: "Diamond Mine Megaways: Extra Gold",
              slug: "diamond-mine-extra-gold",
              id: "b9802f00-0c3f-11ea-8451-0242ac110002",
              isInMyList: false,
            },
          ],
        },
      },
    },
  },
];

stories.add("Default", () => (
  <MockedProvider mocks={mocks}>
    <MockStore>
      <GameListHorizontalExclusive list={mocks[0].result.data.gamesList} />
    </MockStore>
  </MockedProvider>
));
