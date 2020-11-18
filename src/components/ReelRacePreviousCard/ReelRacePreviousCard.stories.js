// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRacePreviousCard } from "./ReelRacePreviousCard";
import reelRaceMock from "./__mocks__/reelRace.json";
import tMock from "./__mocks__/t.json";

const stories = storiesOf("ReelRacePreviousCard", module);

stories.add("Default", () => {
  return (
    <div className="c-reel-race-card">
      <ReelRacePreviousCard reelRace={reelRaceMock} t={tMock} />
    </div>
  );
});

stories.add("Expanded", () => {
  return (
    <div className="c-reel-race-card">
      <ReelRacePreviousCard reelRace={reelRaceMock} t={tMock} expanded={true} />
    </div>
  );
});