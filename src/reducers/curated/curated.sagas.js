import { take, select, call, put } from "redux-saga/effects";
import {
  CURATED_SLUG,
  curatedSelector,
  getGamesBySlug,
} from "Reducers/curated";
import { getFetchStoredTypeBySlug } from "Reducers/cms";
import { country as countrySelector } from "Reducers/handshake/selectors";
import { actions as schemaActions } from "Reducers/schema";
import { normalizeData } from "Reducers/schema/schema";
import { gameSelector } from "Reducers/schema/selector";

export function* fetchCuratedSaga() {
  yield take(getFetchStoredTypeBySlug(CURATED_SLUG));
  const response = yield select(curatedSelector(CURATED_SLUG));
  const { game } = response;

  if (game.length) {
    const slug = game[0];
    const gameData = yield select(gameSelector(slug));

    if (!gameData) {
      const platform = "mobile";
      const country = yield select(countrySelector);
      const slugs = [game[0]];
      const variant = "default";
      const response = yield call(getGamesBySlug, {
        platform,
        country,
        slugs,
        variant,
      });
      const { entities } = yield call(normalizeData, response);
      yield put(schemaActions.updateEntity(entities));
    }
  }
}
