import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SectionList from "./";
import GameRowSearch from "Components/GameRowSearch";
import MockStore from "Components/MockStore";

const stories = storiesOf("SectionList", module);

const sections = [
  { title: "D", data: ["dancing-in-rio", "divine-fortune"] },
  { title: "H", data: ["hall-of-gods"] },
  { title: "I", data: ["irish-riches"] },
  { title: "J", data: ["jackpot-diamonds"] },
  { title: "K", data: ["keystone-kops"] },
  {
    title: "M",
    data: [
      "mega-fortune",
      "mega-fortune-dreams",
      "mega-moolah",
      "monkeys-millions",
    ],
  },
  { title: "P", data: ["power-force-heroes"] },
  { title: "T", data: ["top-cat"] },
];

const renderSectionHeader = title => (
  <p className="u-font-weight-bold u-font-md u-padding-vert--md">{title}</p>
);

stories.add(
  "Alphabetical",
  () => (
    <MockStore>
      <SectionList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={id => <GameRowSearch slug={id} />}
      />
    </MockStore>
  ),
  info({ text: "alphabetical" })
);

stories.add(
  "Section with no games",
  () => (
    <MockStore>
      <SectionList
        sections={[
          {
            title: "I'm a section with results",
            data: ["mega-fortune-dreams", "mega-fortune"],
          },
          { title: "I'm an empty section" },
          {
            title: "I'm a section with other results",
            data: ["hall-of-gods", "divine-fortune"],
          },
        ]}
        renderSectionHeader={renderSectionHeader}
        renderItem={id => <GameRowSearch slug={id} />}
      />
    </MockStore>
  ),
  info({ text: "Section with no games" })
);