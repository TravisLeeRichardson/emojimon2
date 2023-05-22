export enum ChallengeType {
  Easy = 1,
  Medium,
  Hard,
}

type ChallengeConfig = {
  name: string;
  emoji: string;
};

export const challengeTypes: Record<ChallengeType, ChallengeConfig> = {
  [ChallengeType.Easy]: {
    name: "Easy",
    emoji: "🤔",
  },
  [ChallengeType.Medium]: {
    name: "Medium",
    emoji: "💡",
  },
  [ChallengeType.Hard]: {
    name: "Hard",
    emoji: "💭",
  },
};
