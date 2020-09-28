// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ChatIcon, ExitIcon } from "@casumo/cmp-icons";
import { EVENTS } from "Src/constants";
import tracker from "Services/tracker";

import "./InGameDrawer.scss";

type Props = {
  t: {
    in_game_drawer_live_chat: ?string,
    in_game_drawer_exit_game: ?string,
  },
  isChatDisabled: boolean,
  onLiveChatClick: Function,
  onExitGameClick: Function,
};

export const InGameDrawer = ({
  t,
  isChatDisabled,
  onLiveChatClick,
  onExitGameClick,
}: Props) => {
  const liveChatClick = () => {
    tracker.track(EVENTS.MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED, {});
    onLiveChatClick();
  };
  const exitGameClick = () => {
    tracker.track(EVENTS.MIXPANEL_IN_GAME_CLOSE_DRAWER_CLICKED, {});
    onExitGameClick();
  };
  return (
    <Flex
      align="stretch"
      justify="space-around"
      className="c-in-game-drawer t-opacity-background--100 t-background-grey-90 t-border-r u-height--xlg u-margin-x--auto@tablet u-padding-y--md"
    >
      {!isChatDisabled && (
        <Flex.Block
          onClick={liveChatClick}
          className="o-layout__item t-color-white o-flex-justify--center o-flex-align--center t-border-grey-70 t-border-right u-padding-right u-cursor--pointer"
        >
          <ChatIcon className="u-margin-right" />
          <Text tag="span" size="sm">
            {t.in_game_drawer_live_chat}
          </Text>
        </Flex.Block>
      )}
      <Flex.Block
        onClick={exitGameClick}
        className="o-layout__item t-color-white o-flex-justify--center o-flex-align--center u-margin-left--none u-cursor--pointer"
      >
        <ExitIcon className="u-margin-right" />
        <Text tag="span" size="sm">
          {t.in_game_drawer_exit_game}
        </Text>
      </Flex.Block>
    </Flex>
  );
};
