import { STAT_INFO } from "../../../data/cards";
import type { RoundResult } from "../types";

interface RoundBannerProps {
  result: RoundResult;
}

export function RoundBanner({ result }: RoundBannerProps) {
  const statLabel = STAT_INFO[result.stat].label;
  const chooser = result.chosenBy === "player" ? "You" : "Computer";

  let message: string;
  if (result.outcome === "tie") {
    message = `Tie! Both cards go to the pot.`;
  } else if (result.outcome === "player") {
    message = `You win the round!`;
  } else {
    message = `Computer wins the round.`;
  }

  return (
    <div className={`round-banner round-banner-${result.outcome}`}>
      <p className="round-banner-picker">
        {chooser} picked {STAT_INFO[result.stat].icon} {statLabel}
      </p>
      <p className="round-banner-message">{message}</p>
    </div>
  );
}
