import type { Pill } from "../../types";

export const getRemainsPills = (pill: Pill): number => {
  const { fullCount, dailyCount, startDate } = pill;

  const dayPassed =
    Math.floor(
      (new Date().getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1;

  const remains = fullCount - dayPassed * dailyCount;

  return remains;
};
