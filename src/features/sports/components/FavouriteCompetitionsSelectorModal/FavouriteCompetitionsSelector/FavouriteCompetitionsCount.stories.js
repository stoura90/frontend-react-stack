// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";

import { number } from "@storybook/addon-knobs/react";

import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector/FavouriteCompetitionsCount",
  module
);

stories.add(
  "Default",
  () => <FavouriteCompetitionsCount count={number("Count", 3)} />,
  info({ text: "Default" })
);