// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { Player, Challenge, ChallengeData, TreasureBoxAttempt, OwnedBy } from "../codegen/Tables.sol";
import { ChallengeResult } from "../codegen/Types.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";

contract ChallengeSystem is System {
  function takeChallenge(uint64 answer) public {
    bytes32 player = addressToEntityKey(_msgSender());

    ChallengeData memory challenge = Challenge.get(player);
    require(challenge.exists, "not in Challenge");

    

    /* uint256 rand = uint256(keccak256(abi.encode(player, challenge.treasureBox, challenge.treasureAttempts, blockhash(block.number - 1), block.difficulty)));

    if (rand % 2 == 0) {
      // 50% chance to catch monster
      TreasureBoxAttempt.emitEphemeral(player, ChallengeResult.CorrectAnswer);
      OwnedBy.set(challenge.treasureBox, player);
      Challenge.deleteRecord(player);
    } else if (challenge.treasureAttempts >= 2) {
      // Missed 2 times, monster escapes
      TreasureBoxAttempt.emitEphemeral(player, ChallengeResult.IncorrectAnswer);
      Challenge.deleteRecord(player);
    } else {
      // Throw missed!
      TreasureBoxAttempt.emitEphemeral(player, ChallengeResult.IncorrectAnswer);
      // Assuming setCatchAttempts is a valid function in Challenge contract
      Challenge.setTreasureAttempts(player, challenge.treasureAttempts + 1);
    } */

    // Just default to true every time for now
    TreasureBoxAttempt.emitEphemeral(player, ChallengeResult.CorrectAnswer);
    OwnedBy.set(challenge.treasureBox, player);
    Challenge.deleteRecord(player);

  }
}
