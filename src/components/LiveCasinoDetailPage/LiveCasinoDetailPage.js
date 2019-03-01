// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import GameRow from "Components/GameRow";
import SectionTitle from "./SectionTitle";
import type { GroupedGamesList, EvolutionLobbyType } from "Models/liveCasino";

type Props = {
  /** grouped list of games to render */
  groupedLiveGames: GroupedGamesList,
  /** used to decide if data needs to be fetched */
  areTranslationsFetched: boolean,
  /** used to fetch page if areTranslationsFetched === false */
  translations: { [EvolutionLobbyType]: string },
  fetchTranslations: () => void,
  initFetchAllLiveGames: () => void,
};

export default class LiveCasinoDetailPage extends PureComponent<Props> {
  componentDidMount() {
    this.props.initFetchAllLiveGames();

    if (!this.props.areTranslationsFetched) {
      this.props.fetchTranslations();
    }
  }

  render() {
    return (
      <div className="u-padding-horiz--md u-padding-bottom--md">
        {this.props.groupedLiveGames.map(([id, gamesInSection]) => (
          <React.Fragment key={id}>
            <SectionTitle title={this.props.translations[id] || id} />
            <List
              items={gamesInSection}
              render={slug => <GameRow id={slug} />}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
}
