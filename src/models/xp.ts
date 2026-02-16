export function getIncubationCompleteXp() {
  return 120;
}

export function getXpToNextLevel(currentLevel: number): number {
  const baseXP = 120;
  const growthFactor = 35;
  const exponent = 2.3;

  return Math.floor(baseXP + growthFactor * currentLevel ** exponent);
}

export function getTotalXpForLevel(targetLevel: number): number {
  let totalXP = 0;

  for (let level = 1; level < targetLevel; level++) {
    totalXP += getXpToNextLevel(level);
  }

  return totalXP;
}

export function calculateDailyCompletionXP(streakDays: number): number {
  const baseDailyXp = 10;
  const streakMultiplier = 1 + Math.log10(streakDays);
  return Math.floor(baseDailyXp * streakMultiplier);
}

export function calculateLevel(totalXP: number): number {
  let level = 1;
  let xpForNextLevel = getTotalXpForLevel(level + 1);

  while (totalXP >= xpForNextLevel) {
    level += 1;
    xpForNextLevel = getTotalXpForLevel(level + 1);
  }

  return level;
}
