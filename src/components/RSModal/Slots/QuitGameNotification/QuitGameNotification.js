// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import tracker from "Services/tracker";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { convertHTMLToString } from "Utils";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import type { CmsContent } from "./QuitGameNotification.types";

type QuitGameNotificationProps = {
  acceptModal?: () => void,
  t: ?CmsContent,
};

export const QuitGameNotification = ({
  acceptModal = () => null,
  t,
}: QuitGameNotificationProps) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const redirectToCashierPage = () => {
    tracker.track(EVENTS.MIXPANEL_IN_GAME_EXIT_GAME_CLICKED, {});
    navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
  };

  if (!t) {
    return null;
  }

  const modalProps = {
    bigTitle: t.quit_game_modal_title,
    primaryButton: {
      text: t.quit_game_cta_text,
      action: redirectToCashierPage,
    },
    closeIcon: {
      action: () => {
        tracker.track(EVENTS.MIXPANEL_IN_GAME_EXIT_GAME_CLICKED, {});
        acceptModal();
      },
    },
  };

  return (
    <Modal {...modalProps}>
      <Text tag="div" className="u-padding-top--md">
        {convertHTMLToString(t.quit_game_modal_text)}
      </Text>
    </Modal>
  );
};
