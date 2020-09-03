// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

export type CmsContent = {
  quit_game_modal_title: string,
  quit_game_modal_text: string,
  quit_game_cta_text: string,
};

type QuitGameNotificationProps = {
  acceptModal?: () => null,
  t: ?CmsContent,
  config: {
    onCloseCallBack: () => null,
  },
};

export const QuitGameNotification = ({
  acceptModal = () => null,
  t,
  config: { onCloseCallBack },
}: QuitGameNotificationProps) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const redirectToCashierPage = () => navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
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
        if (onCloseCallBack) {
          onCloseCallBack();
        }
        acceptModal();
      },
    },
  };

  return (
    <Modal {...modalProps}>
      <Text tag="span">{t.quit_game_modal_text}</Text>
    </Modal>
  );
};
