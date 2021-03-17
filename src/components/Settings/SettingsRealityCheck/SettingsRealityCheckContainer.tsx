import { Query, Mutation } from "@apollo/client/react/components";
import { adopt } from "react-adopt";
import React from "react";
import { isNil } from "ramda";
import * as A from "Types/apollo";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SettingsRealityCheck } from "Components/Settings/SettingsRealityCheck/SettingsRealityCheck";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";
import { REALITY_CHECK_LABELS_QUERY } from "./SettingsRealityCheckLabelsQuery.graphql";
import { PLAYER_REALITY_CHECK_QUERY } from "./SettingsRealityCheckQuery";
import { UpdateRealityCheckInterval } from "./Mutations.graphql";
const Composed = adopt({
  query: ({ render }) => (
    <Query query={PLAYER_REALITY_CHECK_QUERY}>{render}</Query>
  ),
  labels: ({ render }) => (
    <Query query={REALITY_CHECK_LABELS_QUERY}>{render}</Query>
  ),
});
type State = {
  intervalMinutes: number | null;
};
type RealityCheckOptions = {
  canChangeInterval: boolean;
  isZeroIntervalAllowed: boolean;
};
export const withContainer = (Component: Function) =>
  class SettingsRealityCheckContainer extends React.Component<{}, State> {
    state = {
      intervalMinutes: null,
    };

    get intervalMinutes() {
      return this.state.intervalMinutes;
    }
    get intervalSeconds() {
      return Number(this.state.intervalMinutes) * 60;
    }
    refresh = async query => {
      const { data } = await query.refetch();
      this.setState({
        intervalMinutes: data.player.playOk.realityCheck.intervalInMinutes,
      });
    };
    save = async (
      mutate: (options?) => Promise<A.Player_Reality_Check_Query>,
      { canChangeInterval, isZeroIntervalAllowed }: RealityCheckOptions
    ) => {
      if (!canChangeInterval) {
        return;
      }
      if (this.state.intervalMinutes === 0 && !isZeroIntervalAllowed) {
        return;
      }
      return await mutate({
        variables: {
          input: {
            intervalSeconds: this.intervalSeconds,
          },
        },
      });
    };
    onChange = (interval: number) =>
      this.setState({
        intervalMinutes: interval,
      });
    render() {
      return (
        <Composed>
          {({ query, labels }) => {
            if (query.loading || labels.loading) {
              return <SettingsRowListSkeleton />;
            }
            if (query.error) {
              return <ErrorMessage retry={() => query.refetch()} />;
            }
            if (labels.error) {
              return <ErrorMessage retry={() => labels.refetch()} />;
            }
            const onError = () => {
              this.refresh(query);
              launchModal({ modal: MODALS.ERROR });
            };
            const onCompleted = () => this.refresh(query);
            const {
              data: {
                player: {
                  playOk: { realityCheck },
                },
              },
            } = query;
            const intervalMinutes = isNil(this.intervalMinutes)
              ? realityCheck.intervalInMinutes
              : this.intervalMinutes;
            return (
              <Mutation
                mutation={UpdateRealityCheckInterval}
                onError={onError}
                onCompleted={onCompleted}
              >
                {(mutate, { loading: isUpdateLoading }) => (
                  <Component
                    labels={labels.data}
                    onSave={() => this.save(mutate, realityCheck)}
                    interval={intervalMinutes}
                    onChange={this.onChange}
                    isLoading={isUpdateLoading}
                    canToggleInterval={realityCheck.isZeroIntervalAllowed}
                  />
                )}
              </Mutation>
            );
          }}
        </Composed>
      );
    }
  };
export const SettingsRealityCheckContainer = withContainer(
  SettingsRealityCheck
);
