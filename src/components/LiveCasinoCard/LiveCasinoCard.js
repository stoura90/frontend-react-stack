import React from "react";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";

import { decodeString } from "Utils/index";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import ImageLazy from "Components/Image/ImageLazy";
import CMSField from "Components/CMSField";
import TrackClick from "Components/TrackClick";
import CardFooter from "Components/LiveCasinoCard/LiveCasinoCardFooter";
import CardData from "Components/LiveCasinoCard/LiveCasinoCardData";

import { renderBets } from "Utils/utils";

const CasinoHeader = ({ lobby }) => (
  <div className="o-ratio o-ratio--live-casino-card t-border-r--8">
    <ImageLazy className="o-ratio__content" src={lobby.image} dpr={3} />
    <Flex
      direction="vertical"
      align="center"
      justify="end"
      className="o-ratio__content u-font-weight-bold"
      style={{
        background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardData lobby={lobby} />
    </Flex>
  </div>
);

const CasinoContent = ({ name, lobby, slug, launchGame }) => (
  <Flex>
    <Flex.Block>
      <Text
        tag="h3"
        className="u-font-weight-black u-margin-bottom--sm u-text-clamp t-color-grey-dark-2"
      >
        {decodeString(name)}
      </Text>
      <Text tag="span">{renderBets(lobby.bets)}</Text>
    </Flex.Block>
    <Flex.Item>
      <TrackClick
        eventName={EVENTS.GAME_LAUNCH}
        data={{ [EVENT_PROPS.GAME_NAME]: name }}
      >
        <Button
          onClick={launchGame}
          className="u-text-nowrap u-text-transform-capitalize"
        >
          <CMSField slug="mobile.live-casino-cards-content" field="play_now" />
        </Button>
      </TrackClick>
    </Flex.Item>
  </Flex>
);

export default function LiveCasinoCard({ game, launchGame }) {
  if (!game.lobby) {
    console.warn(`No lobby present for ${game.name}`);
    return null;
  }

  return (
    <Flex.Item className="o-flex__item-fixed-size o-flex c-live-casino-card">
      <Card
        className="u-width--1/1"
        spacing="md"
        header={() => <CasinoHeader lobby={game.lobby} />}
        content={() => (
          <CasinoContent
            name={game.name}
            lobby={game.lobby}
            slug={game.slug}
            launchGame={launchGame}
          />
        )}
        footer={() => <CardFooter {...game.lobby} />}
      />
    </Flex.Item>
  );
}
