import type { DepositLimitPreadjust } from "Models/playOkay/depositLimits";

const mock: DepositLimitPreadjust = {
  "schema": "MONETARY_AMOUNT_PERIODS_AND_INCREASED",
  "increaseProhibitedAfterwardsFor": "P3M",
  "responsibleGamblingTestCanBeTaken": true,
  "increasesOrRevocationsBlocked": true,
  "kind": "DGOJ_DEPOSIT_LIMIT",
  "playerId": "123",
  "rules": [
    "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
    "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
    "DECREASE_EFFECTIVE_IMMEDIATELY",
    "REVOCATION_ALLOWED"
  ]
};
export default mock;