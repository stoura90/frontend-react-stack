// @flow
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import KambiSearchResults from "./KambiSearchResults";
import mocks from "./__mocks__/kambiSearchResultsMocks";

const stories = storiesOf("Sports/KambiSearchResults", module);

const baseProps = {
  onResultClick: action("search result clicked"),
  hideSearchResults: false,
};

const props = {
  hasResults: { ...baseProps, query: "arse" },
  noResults: { ...baseProps, query: "nothingtofind" },
  notSearching: { ...baseProps, query: "" },
};

stories.add("Search Results", () => (
  <MockedProvider mocks={mocks.hasResults} addTypename={false}>
    {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ query: strin... Remove this comment to see the full error message */}
    <KambiSearchResults {...props.hasResults} />
  </MockedProvider>
));

stories.add("No Search Results", () => (
  <MockedProvider mocks={mocks.noResults} addTypename={false}>
    {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ query: strin... Remove this comment to see the full error message */}
    <KambiSearchResults {...props.noResults} />
  </MockedProvider>
));

stories.add("Not Searching", () => (
  <MockedProvider mocks={mocks.notSearching} addTypename={false}>
    {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ query: strin... Remove this comment to see the full error message */}
    <KambiSearchResults {...props.notSearching} />
  </MockedProvider>
));
