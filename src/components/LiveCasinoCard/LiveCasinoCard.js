// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { prop } from "ramda";
import { launchGame } from "Services/LaunchGameService";
import { convertHTMLToString, renderBets } from "Utils";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import ImageLazy from "Components/Image/ImageLazy";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import { LiveCasinoCardFooter } from "Components/LiveCasinoCard/LiveCasinoCardFooter";
import { LiveCasinoCardData } from "Components/LiveCasinoCard/LiveCasinoCardData";
import * as A from "Types/apollo";

export type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
  t: {
    playNowText: string,
    betBehindText: string,
    openSeatsText: string,
  },
};

export class LiveCasinoCard extends PureComponent<Props> {
  static defaultProps = {
    isInMyList: false,
  };

  get liveCasinoTableId() {
    return prop("tableId", this.liveCasinoLobby);
  }

  get liveCasinoLobby() {
    return prop("liveCasinoLobby", this.props.game);
  }

  renderHeader = () => {
    return (
      <div
        className="o-ratio o-ratio--live-casino-card"
        onClick={this.onLaunchGame}
      >
        <ImageLazy
          className="o-ratio__content"
          src={this.liveCasinoLobby.image}
        />
        <Flex
          direction="vertical"
          align="end"
          justify="space-between"
          className="o-ratio__content u-font-weight-bold"
          style={{
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="t-color-white" onClick={e => e.stopPropagation()}>
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_FAVOURITE_CLICKED}
              data={{
                [EVENT_PROPS.GAME_NAME]: this.props.game.name,
                [EVENT_PROPS.IS_FAVOURITE]: !this.props.game.isInMyList,
              }}
            >
              <GameTileHeart
                className="u-width--4xlg u-height--4xlg u-padding--md"
                gameId={this.props.game.id}
              />
            </TrackClick>
          </div>
          <LiveCasinoCardData
            liveCasinoLobby={this.liveCasinoLobby}
            t={this.props.t}
          />
        </Flex>
      </div>
    );
  };

  onLaunchGame = () => launchGame({ slug: this.props.game.slug });

  renderContent = () => {
    const { game } = this.props;

    return (
      <Flex onClick={this.onLaunchGame} className="u-padding-x--md">
        <Flex.Block>
          <Text
            tag="h3"
            className="u-font-weight-black u-margin-bottom--sm u-text-clamp t-color-grey-70"
          >
            {convertHTMLToString(game.name)}
          </Text>
          <Text tag="span">{renderBets(this.liveCasinoLobby.bets)}</Text>
        </Flex.Block>
        <Flex.Item>
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: game.name }}
          >
            <ButtonPrimary size="sm" className="u-text-transform-capitalize">
              <span>{this.props.t.playNowText}</span>
            </ButtonPrimary>
          </TrackClick>
        </Flex.Item>
      </Flex>
    );
  };

  renderFooter = () => {
    return (
      <LiveCasinoCardFooter
        players={this.liveCasinoLobby.numberOfPlayers}
        provider={this.liveCasinoLobby.provider}
      />
    );
  };

  render() {
    if (!this.liveCasinoLobby) {
      return null;
    }

    return (
      <Card
        className="u-width--full u-height--full t-background-white t-border-r--md t-elevation--10 u-overflow-hidden"
        spacing="md"
        header={this.renderHeader}
        content={this.renderContent}
        footer={this.renderFooter}
      />
    );
  }
}
