// @flow
import React from "react";
import { calculateProgress } from "Models/reelRaces";
import { type CurrentReelRaceInfo } from "./useCurrentReelRaceInfo";
import { useTimeoutFn } from "./useTimeoutFn";

export const useReelRaceProgress = (
  currentRace?: ?CurrentReelRaceInfo,
  updateInterval?: number = 2500
) => {
  const [gameProgress, setGameProgress] = React.useState(0);
  const timer = useTimeoutFn();
  const refreshProgress = React.useCallback(() => {
    setGameProgress(
      calculateProgress(currentRace?.startTime, currentRace?.endTime) * 100 || 0
    );
    timer.scheduleIn(refreshProgress, updateInterval);
  }, [currentRace, timer, updateInterval]);
  React.useEffect(() => {
    refreshProgress();

    return () => {
      timer.clear();
    };
  }, [refreshProgress, timer]);

  return gameProgress;
};
