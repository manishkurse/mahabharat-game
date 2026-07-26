interface HubProps {
  onPlayChallenge: () => void;
}

export function Hub({ onPlayChallenge }: HubProps) {
  return (
    <div className="screen hub-screen">
      <h1>Mahabharata Games</h1>
      <p className="subtitle">Choose a game to play</p>

      <div className="game-tiles">
        <button type="button" className="game-tile" onClick={onPlayChallenge}>
          <span className="game-tile-icon">⚔️</span>
          <span className="game-tile-title">Mahabharata Challenge</span>
          <span className="game-tile-desc">Battle with legendary characters and their stats!</span>
        </button>

        <div className="game-tile game-tile-disabled">
          <span className="game-tile-icon">🧠</span>
          <span className="game-tile-title">Memory Match</span>
          <span className="game-tile-desc">Coming soon!</span>
        </div>
      </div>
    </div>
  );
}
