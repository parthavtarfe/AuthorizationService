import { CONSTANTS } from "../constants";

export const getStateUrl = () => `http://localhost:${CONSTANTS.DAPR_PORT}/v1.0/state/${CONSTANTS.STATE_STORE_NAME}`;
