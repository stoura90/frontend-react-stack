import gql from "graphql-tag";

export const REALITY_CHECK_LABELS_QUERY = gql`
  query REALITY_CHECK_LABELS_QUERY {
    inGameSessionUpdatesLabel: getText(
      id: "root:player-settings-component:fields.notifications_ingame_session_updates_label"
    )
    inGameSessionUpdatesFrequencyLabel: getText(
      id: "root:player-settings-component:fields.in_game_updates_title"
    )
    save: getText(
      id: "root:player-settings-component:fields.account_settings_save_label"
    )
    cancel: getText(
      id: "root:player-settings-component:fields.account_settings_cancel_label"
    )
  }
`;
