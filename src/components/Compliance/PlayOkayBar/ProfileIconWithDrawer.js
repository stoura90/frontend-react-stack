//@flow
import * as React from "react";
import cx from "classnames";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { isNativeByUserAgent } from "GameProviders";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import { InGameDrawer } from "Components/InGameDrawer";
import { InGameAdventureWidget } from "Components/InGameAdventureWidget";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import tracker from "Services/tracker";
import { MobileAndTablet, isDesktop } from "Components/ResponsiveLayout";
//@lukKowalski: enable when payments are done import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { SumoIcon } from "Components/SumoIcon/SumoIcon";
import "./ProfileIconWithDrawer.scss";
import { PinnedDrawersContext } from "Components/GamePage/Contexts/drawerPinningContext";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import { playingSelector } from "Models/playing";
import { BlueRibbonJackpotsInGameWidgetContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas";
import { type PauseResumeProps } from "./PlayOkayBarContainer";

type Props = PauseResumeProps & IntercomPlayerDetailsProps;
const baseClassName = "c-profile-icon-with-drawer";

export const ProfileIconWithDrawer = ({
  pauseGame,
  resumeGame,
  playerId,
  email,
  casumoName,
  playerName,
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      tracker.track(EVENTS.MIXPANEL_SUMOTICON_CLICKED, {});
    }
    setDrawerOpen(isOpen => !isOpen);
  };

  const isChatDisabled = isNativeByUserAgent();

  React.useEffect(() => {
    if (isChatDisabled) {
      return;
    }

    injectIntercomScript({ playerId, email, casumoName, playerName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    registerPauseResumeGame(pauseGame, resumeGame);
  }, [pauseGame, resumeGame]);

  const { pinnedDrawers } = React.useContext(PinnedDrawersContext);
  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pinnedDrawers]);

  const shouldShowReelRace =
    (isDesktop() && !pinnedDrawers.includes(DRAWERS.REEL_RACES)) ||
    !isDesktop();

  return (
    <React.Fragment>
      <SumoIcon onClick={toggleDrawer} openedState={isDrawerOpen} />
      {isDrawerOpen && (
        <div
          className={cx(
            `u-position-absolute u-zindex--content-overlay`,
            "o-inset-left--none o-inset-right--none o-inset-right--auto@desktop",
            "u-padding-left u-padding-left--md@desktop u-padding-right u-padding-top--md",
            `${baseClassName}__bottom-wrapper-bg`
          )}
        >
          <div className={`${baseClassName}__item u-padding-bottom`}>
            <BlueRibbonJackpotsInGameWidgetContainer />
          </div>
          {shouldShowReelRace && (
            <ReelRacesDrawerWidget
              className={`${baseClassName}__item u-padding-bottom u-padding-top--md@mobile`}
            />
          )}
          <div className={`${baseClassName}__item u-padding-bottom`}>
            <InGameAdventureWidget />
          </div>
          <MobileAndTablet>
            <div className={`${baseClassName}__item u-padding-bottom`}>
              <InGameDrawer
                onLiveChatClick={() => {
                  tracker.track(EVENTS.MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED, {});
                  openChatWindow();
                  setDrawerOpen(false);
                }}
                onExitGameClick={() => {
                  navigateToKO(ROUTE_IDS.TOP_LISTS);
                  setDrawerOpen(false);
                }}
              />
            </div>
          </MobileAndTablet>
        </div>
      )}
    </React.Fragment>
  );
};
