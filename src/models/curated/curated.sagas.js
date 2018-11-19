import { select, put } from "redux-saga/effects";
import { curatedSelector, fetchCuratedGame } from "Models/curated";
import { country as getCountry } from "Models/handshake/selectors";

export function* fetchCuratedGameSaga() {
  const response = yield select(curatedSelector());
  const { gameData, game } = response;

  if (gameData) {
    return;
  }

  const platform = "mobile";
  const slugs = game;
  const variant = "default";
  const country = yield select(getCountry);
  yield put(fetchCuratedGame({ platform, country, slugs, variant }));
}