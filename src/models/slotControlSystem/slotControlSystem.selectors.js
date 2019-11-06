// @flow
import { createSelector } from "reselect";
import { propOr, pipe, pick, path, identity } from "ramda";
import { getPage } from "Models/cms";
import { getFetch } from "Models/fetch";
import { CMS_SLUGS, ACTION_TYPES } from "Models/slotControlSystem";
import type {
  ActiveSessionType,
  EndedSessionType,
  ExclusionType,
} from "./slotControlSystem.types";

export const configurationFormContentSelector = createSelector(
  getPage(CMS_SLUGS.CONFIGURATION_SCREEN),
  getPage(CMS_SLUGS.UNITS),
  (configurationFormContent, unitsContent) => ({
    ...propOr({}, "fields", configurationFormContent),
    ...pipe(
      propOr({}, "fields"),
      pick(["minutes_abbreviated", "hours_abbreviated", "days_abbreviated"])
    )(unitsContent),
  })
);

export const isFetchingActiveSessionSelector: (
  s: Object
) => boolean = createSelector(
  getFetch(ACTION_TYPES.FETCH_SESSION_INIT),
  fetchData => fetchData?.isFetching
);

export const isCreatingSessionSelector: (s: Object) => boolean = createSelector(
  getFetch(ACTION_TYPES.CREATE_SESSION_INIT),
  fetchData => fetchData?.isFetching
);

export const activeSessionSelector: (
  s: Object
) => ?ActiveSessionType = createSelector(
  isFetchingActiveSessionSelector,
  path(["slotControlSystem", "activeSession"]),
  (isFetching, activeSession) => {
    if (isFetching) {
      return null;
    }
    return activeSession;
  }
);

export const endedSessionSelector: (
  s: Object
) => ?EndedSessionType = createSelector(
  path(["slotControlSystem", "endedSession"]),
  identity
);

export const activeExclusionSelector: (
  s: Object
) => ?ExclusionType = createSelector(
  path(["slotControlSystem", "activeExclusion"]),
  identity
);
