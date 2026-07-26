import { useState } from "react";
import type { ComputerDifficulty, MatchLength } from "../types";

interface StartScreenProps {
  onStart: (matchLength: MatchLength, difficulty: ComputerDifficulty) => void;
  onBack: () => void;
}

const ROUND_OPTIONS = [10, 15, 20];

export function StartScreen({ onStart, onBack }: StartScreenProps) {
  const [lengthMode, setLengthMode] = useState<"untilAllCards" | "fixedRounds">("fixedRounds");
  const [rounds, setRounds] = useState(15);
  const [difficulty, setDifficulty] = useState<ComputerDifficulty>("hero");

  const handleStart = () => {
    const matchLength: MatchLength =
      lengthMode === "untilAllCards" ? { type: "untilAllCards" } : { type: "fixedRounds", rounds };
    onStart(matchLength, difficulty);
  };

  return (
    <div className="screen start-screen">
      <h1>Mahabharata Challenge</h1>
      <p className="subtitle">Set up your match</p>

      <section className="option-group">
        <h2>Match length</h2>
        <div className="option-buttons">
          <button
            type="button"
            className={lengthMode === "untilAllCards" ? "selected" : ""}
            onClick={() => setLengthMode("untilAllCards")}
          >
            Play until someone wins all cards
          </button>
          <button
            type="button"
            className={lengthMode === "fixedRounds" ? "selected" : ""}
            onClick={() => setLengthMode("fixedRounds")}
          >
            Fixed number of rounds
          </button>
        </div>
        {lengthMode === "fixedRounds" && (
          <div className="option-buttons">
            {ROUND_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                className={rounds === n ? "selected" : ""}
                onClick={() => setRounds(n)}
              >
                {n} rounds
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="option-group">
        <h2>Computer opponent</h2>
        <div className="option-buttons">
          <button
            type="button"
            className={difficulty === "easy" ? "selected" : ""}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </button>
          <button
            type="button"
            className={difficulty === "hero" ? "selected" : ""}
            onClick={() => setDifficulty("hero")}
          >
            Hero
          </button>
        </div>
      </section>

      <div className="button-row">
        <button type="button" className="secondary" onClick={onBack}>
          Back to games
        </button>
        <button type="button" className="primary" onClick={handleStart}>
          Start Match
        </button>
      </div>
    </div>
  );
}
