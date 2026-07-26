import { useState } from "react";
import { STAT_INFO, STAT_KEYS, type Card, type StatKey } from "../../../data/cards";

export type ResultFlash = "win" | "lose" | "tie";

interface CardViewProps {
  card: Card;
  faceDown?: boolean;
  highlightStat?: StatKey | null;
  highlightPulse?: boolean;
  onPickStat?: (stat: StatKey) => void;
  pickable?: boolean;
  resultFlash?: ResultFlash;
}

const FLASH_BADGE: Record<ResultFlash, string> = {
  win: "🏆 WIN",
  lose: "❌ LOSE",
  tie: "🤝 TIE",
};

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <span className="card-image-fallback">🛕</span>;
  }

  return <img key={src} src={src} alt={alt} onError={() => setErrored(true)} />;
}

export function CardView({
  card,
  faceDown,
  highlightStat,
  highlightPulse,
  onPickStat,
  pickable,
  resultFlash,
}: CardViewProps) {
  if (faceDown) {
    return (
      <div className="card card-back">
        <img src="/images/card-back.png" alt="Face-down card" />
      </div>
    );
  }

  return (
    <div className={`card${resultFlash ? ` card-flash-${resultFlash}` : ""}`}>
      {resultFlash && <span className={`card-flash-badge card-flash-badge-${resultFlash}`}>{FLASH_BADGE[resultFlash]}</span>}
      <div className="card-image">
        <CardImage key={card.id} src={card.image} alt={card.name} />
      </div>
      <h3 className="card-name">{card.name}</h3>
      <ul className="card-stats">
        {STAT_KEYS.map((key) => {
          const isHighlighted = highlightStat === key;
          const className = `stat-row${isHighlighted ? " stat-row-highlight" : ""}${isHighlighted && highlightPulse ? " stat-row-pulse" : ""}${pickable ? " stat-row-pickable" : ""}`;
          const content = (
            <>
              <span className="stat-icon">{STAT_INFO[key].icon}</span>
              <span className="stat-label">{STAT_INFO[key].label}</span>
              <span className="stat-value">{card.stats[key]}</span>
            </>
          );
          return (
            <li key={key}>
              {pickable ? (
                <button type="button" className={className} onClick={() => onPickStat?.(key)}>
                  {content}
                </button>
              ) : (
                <div className={className}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
