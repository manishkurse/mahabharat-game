import { useState } from "react";
import { MahabharataChallenge } from "./games/mahabharataChallenge/MahabharataChallenge";
import { Hub } from "./pages/Hub";

type View = "hub" | "mahabharataChallenge";

function App() {
  const [view, setView] = useState<View>("hub");

  if (view === "mahabharataChallenge") {
    return <MahabharataChallenge onBackToHub={() => setView("hub")} />;
  }

  return <Hub onPlayChallenge={() => setView("mahabharataChallenge")} />;
}

export default App;
