import type { Pill } from "../../types";
import { getRemainsPills } from "../getRemainsPills";

export const getRemainsDays = (pill: Pill): number => {
  return Math.floor(getRemainsPills(pill) / pill.dailyCount);
};
