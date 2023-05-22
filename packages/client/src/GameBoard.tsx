import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { GameMap } from "./GameMap";
import { useMUD } from "./MUDContext";
import { useKeyboardMovement } from "./useKeyboardMovement";
import { hexToArray } from "@latticexyz/utils";
import { TerrainType, terrainTypes } from "./terrainTypes";
import { EncounterScreen } from "./EncounterScreen";
import { ChallengeScreen } from "./ChallengeScreen";
import { Entity, Has, getComponentValueStrict } from "@latticexyz/recs";
import { MonsterType, monsterTypes } from "./monsterTypes";
import { ChallengeType, challengeTypes } from "./challengeTypes";

export const GameBoard = () => {
  useKeyboardMovement();

  const {
    components: { Encounter, Challenge, MapConfig, Monster, Treasure, Player, Position },
    network: { playerEntity, singletonEntity },
    systemCalls: { spawn },
  } = useMUD();

  const canSpawn = useComponentValue(Player, playerEntity)?.value !== true;

  const players = useEntityQuery([Has(Player), Has(Position)]).map((entity) => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      x: position.x,
      y: position.y,
      emoji: entity === playerEntity ? "🤠" : "🥸",
    };
  });

  const mapConfig = useComponentValue(MapConfig, singletonEntity);
  if (mapConfig == null) {
    throw new Error(
      "map config not set or not ready, only use this hook after loading state === LIVE"
    );
  }

  const { width, height, terrain: terrainData } = mapConfig;
  const terrain = Array.from(hexToArray(terrainData)).map((value, index) => {
    const { emoji } =
      value in TerrainType ? terrainTypes[value as TerrainType] : { emoji: "" };
    return {
      x: index % width,
      y: Math.floor(index / width),
      emoji,
    };
  });

  const encounter = useComponentValue(Encounter, playerEntity);
  const monsterType = useComponentValue(
    Monster,
    encounter ? (encounter.monster as Entity) : undefined
  )?.value;
  const monster =
    monsterType != null && monsterType in MonsterType
      ? monsterTypes[monsterType as MonsterType]
      : null;

  const challenge = useComponentValue(Challenge, playerEntity);

  const challengeType = useComponentValue(
    Treasure,
    challenge ? (challenge.treasureBox as Entity) : undefined
  )?.value;
  const treasure =
    challengeType != null && challengeType in ChallengeType
      ? challengeTypes[challengeType as ChallengeType]
      : null;
  console.log(treasure)

  return (
    <GameMap
      width={width}
      height={height}
      terrain={terrain}
      onTileClick={canSpawn ? spawn : undefined}
      players={players}
      encounter={
        encounter ? (
          <EncounterScreen
            monsterName={monster?.name ?? "MissingNo"}
            monsterEmoji={monster?.emoji ?? "💱"}
          />
        ) : undefined
      }
       challenge={
        challenge ? (
          <ChallengeScreen
          
          challengeName={treasure?.name ?? "MissingNo"}
          challengeEmoji={treasure?.emoji ?? "💱"}
          />
        ) : undefined
      } 
    />
  );
};
