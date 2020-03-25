//@flow
import { combineReducers } from "redux";
import { reducer as router } from "Models/router";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as player } from "Models/player";
import { reducer as promotions } from "Models/promotions";
import { reducer as schema } from "Models/schema";
import { reducer as playing } from "Models/playing";
import { reducer as sidebar } from "Models/sidebar";
import { modalReducer as modal } from "Models/modal";
import { slotControlSystemReducer as slotControlSystem } from "Models/slotControlSystem";
import { playOkayReducer } from "./playOkay/playOkay.reducer";

const rootReducer = combineReducers({
  router,
  fetch,
  handshake,
  player,
  promotions,
  schema,
  modal,
  playOkay: playOkayReducer,
  playing,
  slotControlSystem,
  sidebar,
});

export default rootReducer;
