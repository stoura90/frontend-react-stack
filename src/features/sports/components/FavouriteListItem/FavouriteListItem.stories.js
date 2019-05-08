// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PlanetIcon } from "@casumo/cmp-icons";
import FavouriteListItem from "./FavouriteListItem";

const stories = storiesOf("Sports/FavouriteListItem", module);

stories.add("Default", () => (
  <FavouriteListItem
    icon={<PlanetIcon size="lrg" />}
    label="Test label"
    onClick={action("onClick")}
  />
));

stories.add("Favourited", () => (
  <FavouriteListItem
    icon={<PlanetIcon size="lrg" />}
    label="Test label"
    onClick={action("onClick")}
    isFavourite={true}
  />
));

stories.add("Not favouritable", () => (
  <FavouriteListItem
    icon={<PlanetIcon size="lrg" />}
    label="Test label"
    onClick={action("onClick")}
    isFavouritable={false}
  />
));
