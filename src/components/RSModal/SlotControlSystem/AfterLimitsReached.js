// @flow
import * as React from "react";
import { head } from "ramda";
import { useLocale } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import { useLatestPlayed } from "Models/gameSearch";
import { type ModalContentComponent } from "Components/RSModal";
import {
  SessionDetailsForLimitsReached,
  SessionDetailsForLimitsReachedExcluded,
} from "Components/Compliance/SlotControlSystem/SessionDetails";
import { ModalSkin } from "./ModalSkin";

type ContentType = {
  session_details_header: string,
  balance: string,
  money_wagered: string,
  money_won: string,
  money_left: string,
  play_started: string,
  play_ended: string,
  last_status_alert: string,
  limits_reached_button_label: string,
  limits_reached_exclusion_text: string,
  limits_reached_play_again_header: string,
  limits_reached_modal_title: string,
};

export function AfterLimitsReached(props: ModalContentComponent<ContentType>) {
  const { activeExclusion, lastEndedSession } = useSessionsState();
  const locale = useLocale();
  const { latestPlayedIds } = useLatestPlayed();
  const tForModalSkin = {
    modal_title: props.t?.limits_reached_modal_title || "",
  };
  const propsForModalSkin = {
    t: tForModalSkin,
    dismissModal: props.dismissModal,
    closeAction: props.acceptModal,
  };

  if (!lastEndedSession) {
    return null;
  }

  if (activeExclusion) {
    return (
      <ModalSkin {...propsForModalSkin}>
        <SessionDetailsForLimitsReachedExcluded
          t={props.t}
          locale={locale}
          lastEndedSession={lastEndedSession}
          secondsTillEndOfBreak={
            (activeExclusion.expiringTime - Date.now()) / 1000
          }
          onClickButton={props.acceptModal}
        />
      </ModalSkin>
    );
  }

  return (
    <ModalSkin {...propsForModalSkin}>
      <SessionDetailsForLimitsReached
        t={props.t}
        locale={locale}
        lastEndedSession={lastEndedSession}
        onClickButton={props.acceptModal}
        playAgainGameId={head(latestPlayedIds)}
      />
    </ModalSkin>
  );
}