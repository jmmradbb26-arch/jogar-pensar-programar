const LEVEL_ORDER = ["identify", "analyze", "create", "final"];

export function getAdvanceAction(challenges, currentChallenge) {
  const levelChallenges = challenges.filter(challenge => challenge.level === currentChallenge.level);
  const currentIndex = levelChallenges.findIndex(challenge => challenge.id === currentChallenge.id);
  const nextChallenge = currentIndex >= 0 ? levelChallenges[currentIndex + 1] : null;

  if (nextChallenge) return { type: "challenge", label: "Próximo desafio", challengeId: nextChallenge.id };

  const currentLevelIndex = LEVEL_ORDER.indexOf(currentChallenge.level);
  const nextLevel = LEVEL_ORDER.slice(currentLevelIndex + 1).find(level => challenges.some(challenge => challenge.level === level));
  if (nextLevel) return { type: "level", label: "Ir para o próximo nível", level: nextLevel };

  return { type: "complete", label: "Concluir nível" };
}

export function nextChallengeButtonMarkup(result, action) {
  if (result?.status !== "success" || !action) return "";
  return `<button type="button" id="next-challenge">${action.label}</button>`;
}
