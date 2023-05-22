export enum TerrainType {
  TallGrass = 1,
  Boulder,
  treasureBox
}

type TerrainConfig = {
  emoji: string;
};

export const terrainTypes: Record<TerrainType, TerrainConfig> = {
  [TerrainType.TallGrass]: {
    emoji: "🌳",
  },
  [TerrainType.Boulder]: {
    emoji: "🪨",
  },
  [TerrainType.treasureBox]: {
    emoji: "💰",
  }
};
