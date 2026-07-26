import type { Card, StatKey } from "../../data/cards";

export type Player = "player" | "computer";

export type MatchLength = { type: "untilAllCards" } | { type: "fixedRounds"; rounds: number };

export type ComputerDifficulty = "easy" | "hero";

export interface RoundResult {
  roundNumber: number;
  stat: StatKey;
  chosenBy: Player;
  playerCard: Card;
  computerCard: Card;
  outcome: Player | "tie";
}

export interface GameState {
  playerDeck: Card[];
  computerDeck: Card[];
  pot: Card[];
  turn: Player;
  roundNumber: number;
  matchLength: MatchLength;
  difficulty: ComputerDifficulty;
  lastResult: RoundResult | null;
  status: "playing" | "finished";
  winner: Player | "draw" | null;
}
