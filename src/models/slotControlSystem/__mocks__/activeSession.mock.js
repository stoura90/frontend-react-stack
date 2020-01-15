//@flow
import { type ActiveSessionType } from "Models/slotControlSystem";

const now = 1576065735032;

export default ({
  id: "123-456-789",
  expiringTime: now + 1000 * 60,
  startedTime: now - 1000 * 60 * 5,
  durationInSecs: 300,
  reminderFrequencyInSecs: 10 * 60,
  postSessionExclusionInMinutes: null,
  stats: {
    currency: "GBP",
    consumedBalance: 11,
    initialLimit: 111,
    lastUpdateTime: Date.now() - 1000 * 60,
    remainingBalance: 100,
    totalBets: 11,
    totalWins: 0,
  },
} : ActiveSessionType);