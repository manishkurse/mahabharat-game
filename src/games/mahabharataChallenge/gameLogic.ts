import { STAT_KEYS, type Card, type StatKey } from "../../data/cards";
import type { ComputerDifficulty, GameState, MatchLength, Player, RoundResult } from "./types";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createGame(
  cards: Card[],
  matchLength: MatchLength,
  difficulty: ComputerDifficulty,
): GameState {
  const shuffled = shuffle(cards);
  const half = Math.floor(shuffled.length / 2);
  return {
    playerDeck: shuffled.slice(0, half),
    computerDeck: shuffled.slice(half),
    pot: [],
    turn: "player",
    roundNumber: 0,
    matchLength,
    difficulty,
    lastResult: null,
    status: "playing",
    winner: null,
  };
}

/** Computer's stat pick for its lead turn: "hero" plays the stat it's strongest in; "easy" picks at random. */
export function pickComputerStat(card: Card, difficulty: ComputerDifficulty): StatKey {
  if (difficulty === "easy") {
    return STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
  }
  return STAT_KEYS.reduce(
    (best, key) => (card.stats[key] > card.stats[best] ? key : best),
    STAT_KEYS[0],
  );
}

/** Resolves a round using the given stat. The caller decides the stat for both player and
 * computer leads (via pickComputerStat) so the announced stat and the resolved stat always match. */
export function playRound(state: GameState, stat: StatKey): GameState {
  if (state.status === "finished") return state;

  const leader = state.turn;
  const playerCard = state.playerDeck[0];
  const computerCard = state.computerDeck[0];

  const playerValue = playerCard.stats[stat];
  const computerValue = computerCard.stats[stat];
  const outcome: Player | "tie" =
    playerValue > computerValue ? "player" : playerValue < computerValue ? "computer" : "tie";

  const remainingPlayerDeck = state.playerDeck.slice(1);
  const remainingComputerDeck = state.computerDeck.slice(1);
  const contested = [playerCard, computerCard, ...state.pot];

  let playerDeck = remainingPlayerDeck;
  let computerDeck = remainingComputerDeck;
  let pot = state.pot;
  let nextTurn: Player = leader;

  if (outcome === "tie") {
    pot = contested;
  } else {
    pot = [];
    if (outcome === "player") {
      playerDeck = [...remainingPlayerDeck, ...contested];
      nextTurn = "player";
    } else {
      computerDeck = [...remainingComputerDeck, ...contested];
      nextTurn = "computer";
    }
  }

  const roundNumber = state.roundNumber + 1;
  const lastResult: RoundResult = {
    roundNumber,
    stat,
    chosenBy: leader,
    playerCard,
    computerCard,
    outcome,
  };

  let status: GameState["status"] = "playing";
  let winner: GameState["winner"] = null;

  const matchLengthReached =
    state.matchLength.type === "fixedRounds" && roundNumber >= state.matchLength.rounds;
  const deckExhausted = playerDeck.length === 0 || computerDeck.length === 0;

  if (matchLengthReached || deckExhausted) {
    status = "finished";
    if (playerDeck.length > computerDeck.length) winner = "player";
    else if (computerDeck.length > playerDeck.length) winner = "computer";
    else winner = "draw";
  }

  return {
    ...state,
    playerDeck,
    computerDeck,
    pot,
    turn: nextTurn,
    roundNumber,
    lastResult,
    status,
    winner,
  };
}
