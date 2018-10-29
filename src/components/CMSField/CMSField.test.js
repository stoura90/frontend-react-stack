import React from "react";
import { shallow } from "enzyme";
import CMSField from "Components/CMSField/CMSField";

const shouldContainText = (rendered, text) =>
  expect(rendered.text()).toMatch(text);

describe("CMSField", () => {
  test("renders the text that we have passed in", () => {
    const startFetch = jest.fn();
    const rendered = shallow(<CMSField text="foo" startFetch={startFetch} />);

    shouldContainText(rendered, "foo");
  });

  test('accepts a "view" prop to transform the text', () => {
    const startFetch = jest.fn();
    const view = text => `Name: ${text}`;
    const rendered = shallow(
      <CMSField text="foo" startFetch={startFetch} view={view} />
    );

    shouldContainText(rendered, "Name: foo");
  });

  test("initiates the fetching if text is not available", () => {
    const startFetch = jest.fn();

    shallow(<CMSField text="foo" startFetch={startFetch} isFetched={false} />);
    expect(startFetch).toHaveBeenCalledTimes(1);
  });

  test("does not initiate a fetch if text is available", () => {
    const startFetch = jest.fn();

    shallow(<CMSField text="foo" startFetch={startFetch} isFetched={true} />);
    expect(startFetch).not.toHaveBeenCalledTimes(1);
  });
});