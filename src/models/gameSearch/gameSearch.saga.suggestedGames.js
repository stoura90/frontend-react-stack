import { select, put, take, call } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  country as countrySelector,
  fetchGamesHandshake,
  isGamesHandshakeLoaded,
  gamesHandshakeSelector,
  types as handshakeTypes,
} from "Models/handshake";
import { waitForSelector } from "Utils";
import { isFetchingStarted } from "Models/fetch";
import { types, fetchSuggestedGamesAction } from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

export function* fetchSuggestedGamesSaga(gameLookingForSuggestions) {
  const platform = "mobile";
  const variant = "default";
  const country = yield select(countrySelector);
  const id = GAME_LIST_IDS.SUGGESTED_GAMES;
  const areGamesFetched = yield select(
    isFetchingStarted(handshakeTypes.FETCH_GAMES_HANDSHAKE)
  );

  // We need the Games Lists for fetchSuggestedGamesAction to work
  if (!areGamesFetched) {
    yield put(fetchGamesHandshake({ country }));
  }

  // Wait for the Games Lists handshake to be loaded before running the rest
  yield call(waitForSelector, isGamesHandshakeLoaded);

  const handshake = yield select(gamesHandshakeSelector);

  yield put(
    fetchSuggestedGamesAction({
      handshake,
      platform,
      country,
      gameLookingForSuggestions,
      variant,
    })
  );

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE
  );
  const gameList = { id, games: response.games };
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}
