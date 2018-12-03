import { combineReducers } from "redux";
import { reducer as migrationComponents } from "Models/migrationComponents";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as schema } from "Models/schema";

export default combineReducers({
  migrationComponents,
  fetch,
  handshake,
  schema,
});
