import type { Player } from "../types";

interface EndScreenProps {
  winner: Player | "draw";
  playerCardCount: number;
  computerCardCount: number;
  onReplay: () => void;
  onBackToHub: () => void;
}

export function EndScreen({
  winner,
  playerCardCount,
  computerCardCount,
  onReplay,
  onBackToHub,
}: EndScreenProps) {
  const title =
    winner === "player" ? "You Win!" : winner === "computer" ? "Computer Wins" : "It's a Draw!";

  return (
    <div className="screen end-screen">
      <h1>{title}</h1>
      <p className="subtitle">
        You: {playerCardCount} cards &nbsp;|&nbsp; Computer: {computerCardCount} cards
      </p>
      <div className="button-row">
        <button type="button" className="secondary" onClick={onBackToHub}>
          Back to games
        </button>
        <button type="button" className="primary" onClick={onReplay}>
          Play Again
        </button>
      </div>
    </div>
  );
}
