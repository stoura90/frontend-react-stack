// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SlotControlSystem } from "./SlotControlSystem";

const stories = storiesOf("RSModal/SlotControlSystem", module);
const actions = {
  acceptModal: action("acceptModal"),
  closeModal: action("closeModal"),
  dismissModal: action("dismissModal"),
};

stories.add("Default", () => (
  <SlotControlSystem {...actions} config={{}} t={{}} />
));