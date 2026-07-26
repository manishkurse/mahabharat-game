import { useEffect, useState } from "react";
import { CARDS, STAT_INFO } from "../../data/cards";
import type { StatKey } from "../../data/cards";
import { CardView } from "./components/CardView";
import { EndScreen } from "./components/EndScreen";
import { RoundBanner } from "./components/RoundBanner";
import { StartScreen } from "./components/StartScreen";
import { createGame, pickComputerStat, playRound } from "./gameLogic";
import type { ComputerDifficulty, GameState, MatchLength } from "./types";

// Computer's turn: think, then announce its stat (card still face down) for at least
// this long before flipping the card and resolving the round — gives the player time
// to register the pick and check their own card before the result lands.
const COMPUTER_THINK_DELAY_MS = 900;
const COMPUTER_ANNOUNCE_DURATION_MS = 3000;

type Phase = "idle" | "announcing" | "revealing";

interface MahabharataChallengeProps {
  onBackToHub: () => void;
}

export function MahabharataChallenge({ onBackToHub }: MahabharataChallengeProps) {
  const [game, setGame] = useState<GameState | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [announcedStat, setAnnouncedStat] = useState<StatKey | null>(null);

  const handleStart = (matchLength: MatchLength, difficulty: ComputerDifficulty) => {
    setGame(createGame(CARDS, matchLength, difficulty));
    setPhase("idle");
    setAnnouncedStat(null);
  };

  const handlePickStat = (stat: StatKey) => {
    if (!game || phase !== "idle" || game.status === "finished" || game.turn !== "player") return;
    setGame(playRound(game, stat));
    setPhase("revealing");
  };

  // Computer leads automatically: think, then announce its stat with the card still face down.
  useEffect(() => {
    if (!game || phase !== "idle" || game.status === "finished" || game.turn !== "computer") return;
    const timer = setTimeout(() => {
      setAnnouncedStat(pickComputerStat(game.computerDeck[0], game.difficulty));
      setPhase("announcing");
    }, COMPUTER_THINK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [game, phase]);

  // After announcing, hold briefly, then flip the computer's card and resolve the round.
  useEffect(() => {
    if (phase !== "announcing" || !announcedStat) return;
    const timer = setTimeout(() => {
      setGame((current) => (current ? playRound(current, announcedStat) : current));
      setPhase("revealing");
    }, COMPUTER_ANNOUNCE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase, announcedStat]);

  const handleContinue = () => {
    if (phase !== "revealing") return;
    setAnnouncedStat(null);
    setPhase("idle");
  };

  if (!game) {
    return <StartScreen onStart={handleStart} onBack={onBackToHub} />;
  }

  if (phase !== "revealing" && game.status === "finished" && game.winner) {
    return (
      <EndScreen
        winner={game.winner}
        playerCardCount={game.playerDeck.length}
        computerCardCount={game.computerDeck.length}
        onReplay={() => setGame(null)}
        onBackToHub={onBackToHub}
      />
    );
  }

  const isPlayerTurn = game.turn === "player";
  const result = game.lastResult;
  const revealing = phase === "revealing";
  const announcing = phase === "announcing";

  // While revealing, show the just-played cards (both face up); otherwise show the upcoming round's top cards.
  const playerCard = revealing && result ? result.playerCard : game.playerDeck[0];
  const computerCard = revealing && result ? result.computerCard : game.computerDeck[0];
  // Computer's card stays face down for its entire turn (thinking + announcing) and only flips on reveal.
  const computerFaceDown = !revealing;
  const contestedStat = revealing ? result?.stat ?? null : announcing ? announcedStat : null;

  const playerFlash = !revealing || !result ? undefined : result.outcome === "player" ? "win" : result.outcome === "computer" ? "lose" : "tie";
  const computerFlash = !revealing || !result ? undefined : result.outcome === "computer" ? "win" : result.outcome === "player" ? "lose" : "tie";

  const roundLabel = revealing && result ? result.roundNumber : game.roundNumber + 1;
  const matchLengthLabel =
    game.matchLength.type === "fixedRounds"
      ? `Round ${roundLabel} of ${game.matchLength.rounds}`
      : `Round ${roundLabel}`;

  return (
    <div className="screen game-screen">
      <header className="game-header">
        <h1>Mahabharata Challenge</h1>
        <p className="subtitle">{matchLengthLabel}</p>
        <p className="deck-counts">
          You: {game.playerDeck.length} cards &nbsp;|&nbsp; Computer: {game.computerDeck.length} cards
          {game.pot.length > 0 && <> &nbsp;|&nbsp; Pot: {game.pot.length}</>}
        </p>
      </header>

      <div className="table">
        <div className="table-side">
          <h2>Computer</h2>
          <CardView card={computerCard} faceDown={computerFaceDown} highlightStat={contestedStat} resultFlash={computerFlash} />
          {announcing && announcedStat && (
            <p className="computer-pick-label">
              Computer picked {STAT_INFO[announcedStat].icon} {STAT_INFO[announcedStat].label}
            </p>
          )}
        </div>
        <div className="table-side">
          <h2>You</h2>
          <CardView
            card={playerCard}
            pickable={isPlayerTurn && phase === "idle"}
            onPickStat={handlePickStat}
            highlightStat={contestedStat}
            highlightPulse={announcing}
            resultFlash={playerFlash}
          />
        </div>
      </div>

      {phase === "idle" && !isPlayerTurn && <p className="turn-hint">Computer is choosing a stat…</p>}
      {phase === "idle" && isPlayerTurn && <p className="turn-hint">Pick a stat to challenge the computer!</p>}

      {revealing && result && (
        <>
          <RoundBanner result={result} />
          <button type="button" className="primary continue-button" onClick={handleContinue}>
            {game.status === "finished" ? "See Results" : "Next Round"}
          </button>
        </>
      )}
    </div>
  );
}
