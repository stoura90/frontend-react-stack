// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import LoaderGlobal from "@casumo/cmp-loader-global";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
  useGameCategory,
} from "Utils/hooks";
import { PlayOkayBar } from "Components/Compliance/PlayOkayBar";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { isNativeByUserAgent } from "GameProviders";
import "./GamePage.scss";

type Props = {
  slug: string,
  playForFun: boolean,
};

export const GamePage = ({ slug, playForFun }: Props) => {
  const { isDGOJ } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const { loading, gameCategory } = useGameCategory(slug);
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategory);
  const { gameProviderModel, error, pauseGame, resumeGame } = useGameLaunchData(
    {
      playForFun,
      slug,
    }
  );
  useRealityCheckModal({ pauseGame, resumeGame });

  useBeforePlayingModal({
    canLaunch: Boolean(
      !playForFun &&
        !error &&
        !loading &&
        gameProviderModel &&
        shouldShowSlotControlSystem
    ),
  });

  if (error) {
    return (
      <Flex className="t-background-chrome-light-2 u-height--screen">
        <ErrorMessage
          errorMessage={errorMessages?.general_error_title || ""}
          retry={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
        />
      </Flex>
    );
  }

  if (!gameProviderModel || loading) {
    return <LoaderGlobal />;
  }

  const isNative = isNativeByUserAgent();

  return (
    <Flex
      className={classNames(
        isNative ? "u-height--screen" : "u-height--full",
        "u-width--screen t-background-chrome-dark-3 t-color-white"
      )}
      direction="vertical"
      spacing="none"
    >
      <Flex.Item>
        <PlayOkayBar />
      </Flex.Item>
      <Flex.Block className="u-position-relative">
        <div
          className={classNames(
            "c-game-page__game-wrapper",
            gameProviderModel.gameWrapperClasses || []
          )}
        >
          <GameLauncher
            gameProviderModel={gameProviderModel}
            className="c-game-page__game-launcher"
          />
        </div>
      </Flex.Block>
      {shouldShowSlotControlSystem && (
        <Flex.Item>
          <InfoBar />
        </Flex.Item>
      )}
    </Flex>
  );
};
