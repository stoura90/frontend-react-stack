import { call, put, take } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { types, listTypes, fetchPlayerGames } from "Models/gameSearch";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;
  const page = Math.ceil(startIndex / pageSize);

  yield put(fetchPlayerGames({ page }));

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE
  );

  const gameList = { id: listTypes.PLAYER_GAMES, games: response };
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}
