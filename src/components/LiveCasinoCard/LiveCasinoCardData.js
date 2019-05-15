// @flow
import React from "react";
import classNames from "classnames";
import { cond, contains, equals, flip, T } from "ramda";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import { CMSField } from "Components/CMSField";
import type { liveCasinoLobby } from "Types/liveCasinoLobby";
import { EVOLUTION_LOBBY_TYPES as TYPES } from "Src/constants";
import { getBadgeColor, getBadgeBorderColor, getResultsDisplay } from "./utils";
import "./LiveCasinoCardData.scss";

type Props = {|
  lobby: liveCasinoLobby,
|};

const renderResults = ({ results, type }) => {
  const getTextColor = color =>
    contains(color, ["yellow", "grey-light-1"]) ? "grey-dark-3" : "white";

  return (
    <React.Fragment>
      <div className="o-layout o-layout--gap u-margin-bottom">
        {results.slice(0, 5).map((n, i) => {
          const color = getBadgeColor(type, n);
          const borderColor = getBadgeBorderColor(type, n);
          return (
            <Badge
              key={i}
              tag="div"
              bgColor={color}
              txtColor={getTextColor(color)}
              circle={true}
              className={classNames(
                borderColor && `c-card-data-badge-shadow-${borderColor}`
              )}
            >
              {getResultsDisplay(type, n)}
            </Badge>
          );
        })}
      </div>
      <Text
        size="xs"
        className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
      >
        {type === TYPES.TOPCARD
          ? getText("recent_letters")
          : getText("recent_numbers")}
      </Text>
    </React.Fragment>
  );
};

const renderSeats = ({ seats }) => (
  <React.Fragment>
    <Badge
      className={classNames(!seats && "u-width--2/3", "u-margin-bottom")}
      tag="div"
      bgColor="green"
      txtColor="white"
      circle={Boolean(seats)}
    >
      {seats || (
        <CMSField
          slug="mobile.live-casino-cards-content"
          field="bet_behind"
          view={text => (
            <Text size="xs" tag="span">
              {text}
            </Text>
          )}
        />
      )}
    </Badge>
    <Text
      size="xs"
      className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
    >
      {seats ? getText("open_seats") : getText("table_full")}
    </Text>
  </React.Fragment>
);

const renderHistory = ({ history, type }) => {
  if (!history) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="o-layout o-layout--gap u-margin-bottom">
        {history.slice(0, 5).map((n, i) => {
          const color = getBadgeColor(type, n);
          return (
            <Badge
              key={i}
              tag="div"
              bgColor={color}
              txtColor={"white"}
              circle={true}
            >
              {n}
            </Badge>
          );
        })}
      </div>
      <Text
        size="xs"
        className="t-color-white u-margin-bottom--md u-font-weight-bold u-text-transform-uppercase"
      >
        {getText("recent_outcomes")}
      </Text>
    </React.Fragment>
  );
};

const getText = field => (
  <CMSField
    slug="mobile.live-casino-cards-content"
    field={field}
    view={text => (
      <Text size="xs" tag="span">
        {text}
      </Text>
    )}
  />
);

const isIn = flip(contains);
const LobbyType = ({ lobby }) => {
  const { type } = lobby;
  return cond([
    [equals(TYPES.BLACKJACK), () => renderSeats(lobby)],
    [equals(TYPES.BACCARAT), () => renderHistory(lobby)],
    [
      isIn([TYPES.MONEYWHEEL, TYPES.ROULETTE, TYPES.TOPCARD, TYPES.MONOPOLY]),
      () => renderResults(lobby),
    ],
    [T, () => null],
  ])(type);
};

const LiveCasinoCardData = ({ lobby }: Props) => {
  return (
    <div className="c-card-data o-flex--vertical o-flex-align--center o-flex-justify--end u-width--1/1 u-font-weight-bold">
      <LobbyType lobby={lobby} />
    </div>
  );
};

export default LiveCasinoCardData;
