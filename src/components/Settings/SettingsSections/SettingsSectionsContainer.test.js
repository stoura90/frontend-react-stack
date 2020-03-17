import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { withContainer } from "./SettingsSectionsContainer";
import {
  playerSectionsQueryMock,
  playerSectionsLabelsQueryMock,
  playerSectionsQueryErrorMock,
  playerSectionsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

let Component, SettingsSectionsContainer;
// TODO PCC-469 REMOVE REACT-ADOPT AND REWRITE COMPONENTS/TESTS
describe.skip("SettingsSections", () => {
  beforeEach(() => {
    Component = props => <div />;
    SettingsSectionsContainer = () => withContainer(Component);
  });

  describe("Player Settings", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryErrorMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("playerLoginHistory")
      ).toStrictEqual(playerSectionsQueryMock.result.data);
    });
  });

  describe("Labels", () => {
    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryErrorMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    });
  });
});
