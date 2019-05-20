import React from "react";
import { shallow } from "enzyme";
import Row from "./Row";

describe("Row", () => {
  test("should render a row with two flex items", () => {
    const rendered = shallow(<Row />);
    expect(rendered.find("Flex")).toHaveLength(1);
    expect(rendered.find("Flex").find("FlexItem")).toHaveLength(1);
  });

  test("should render correct props", () => {
    const rendered = shallow(<Row text="foo" action="bar" />);
    expect(rendered.find("Flex")).toHaveLength(1);
    expect(rendered.find("Flex").find("FlexItem")).toHaveLength(2);
    expect(
      rendered
        .find("Flex")
        .find("FlexItem")
        .first()
        .contains("foo")
    ).toBe(true);
    expect(
      rendered
        .find("Flex")
        .find("FlexItem")
        .at(1)
        .contains("bar")
    ).toBe(true);
  });
});
