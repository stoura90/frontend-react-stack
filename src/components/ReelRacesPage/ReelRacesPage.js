// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import * as A from "Types/apollo";
import { ReelRaceScheduleCard } from "Components/ReelRaceScheduleCard/ReelRaceScheduleCard";
import type { ReelRacesContentPage } from "./ReelRacesPageContainer";

type ReelRacesPageProps = A.ReelRacesPageQuery & {
  t: ReelRacesContentPage,
};

type Tabs = "schedule" | "previous";

export function ReelRacesPage({ reelRaces, t }: ReelRacesPageProps) {
  const [activeTab, setActiveTab] = React.useState<Tabs>("schedule");
  const isNotMobile = useIsScreenMinimumTablet();

  const setTab = (tab: Tabs) => {
    setActiveTab(tab);
  };

  return (
    <div className="t-background-grey-0">
      <div className="u-content-width--tablet-landscape u-padding-y--md">
        {/* Tabs */}
        <Flex
          justify="center"
          spacing="none"
          className={cx(
            "t-background-white u-font-weight-bold",
            isNotMobile &&
              "t-border-r-top-left--md t-border-r-top-right--md u-margin-x--md"
          )}
        >
          <Flex.Block
            onClick={() => setTab("schedule")}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === "schedule"
                ? "t-border-purple-60 t-color-purple-60"
                : "t-border-grey-20 t-color-grey-20 u-cursor-pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.schedule_tab_title}
            </Text>
          </Flex.Block>
          <Flex.Block
            onClick={() => setTab("previous")}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === "previous"
                ? "t-border-purple-60 t-color-purple-60"
                : "t-border-grey-20 t-color-grey-20 u-cursor-pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.previous_winners_tab_title}
            </Text>
          </Flex.Block>
        </Flex>
        {/* Tabs */}

        {activeTab === "schedule" &&
          reelRaces.map((reelRace, i) => (
            <div key={reelRace.id}>
              {i === 1 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <div className="u-width u-height t-border-r--circle t-background-green-30"></div>
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    Right Now
                  </Text>
                </Flex>
              )}
              {i === 2 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <div className="u-width u-height t-border-r--circle t-background-yellow-30"></div>
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    Up Next
                  </Text>
                </Flex>
              )}
              <ReelRaceScheduleCard
                key={reelRace.id}
                reelRace={reelRace}
                t={t}
                isOpen={i === 0 || i === 1}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
