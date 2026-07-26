# Mahabharata Game — Product Spec

## Overview
A web app hosting a collection of Mahabharata-themed games for kids/family, starting
with a stat-comparison card duel game called **Mahabharata Challenge**. Future games
(e.g. a memory-match game) will be added to the same hub.

- **Audience**: kids/family
- **Platform**: web app (browser)
- **Stack**: React + TypeScript + Vite

## Game 1: Mahabharata Challenge

A stat-duel card game (not to be called "Top Trumps" — that name is copyrighted).
Each of the 40 character cards has 4 stats. Players compare stats to win each other's
cards.

### Core rules
1. 40-card deck shuffled and split 20/20 between player and computer.
2. Player's top card shown face-up with its 4 stats; computer's top card stays face-down.
3. On the player's lead turn, they pick a stat category.
4. Reveal computer's card, compare that stat — higher value wins, winner takes both
   cards (added to bottom of their deck).
5. Tie → both cards go into a "pot" that carries into the next round, awarded to
   whoever wins that round.
6. On the computer's lead turn, it picks the stat where its own card has the
   highest value (not random) — a "wisely" chosen stat rather than naive.
7. Match ends when one side holds all 40 cards, or when the configured round
   limit is reached (see match length below) — whoever holds more cards wins;
   equal cards = draw.

### Match length
Chosen on a start screen before each match:
- Play until one player has all 40 cards, **or**
- Fixed number of rounds (e.g. 10 / 15 / 20)

### Data model
Each card: `id`, `name`, image path, and 4 stat key/value pairs, plus a short
"Special Advantage" flavor-text line. Stat values for all 40 characters are
finalized in [stats.md](stats.md) — 1–100 ratings across:

1. ⚔️ Combat Skill
2. 💪 Strength
3. 🧠 Strategy
4. 🦁 Courage & Spirit

Character images are still pending; game is built with placeholder images
first (`public/images/cards/<id>.png`) so real art can be dropped in without
code changes.

## Feature priorities

### P0 — Core game (must-have for first playable version)
- Hub/landing page listing games (Mahabharata Challenge active; Memory Match
  shown as "coming soon")
- Start screen for match-length selection
- Placeholder 40-card data model (id, name, image, 4 stats)
- Core game loop: deck shuffle/split, player stat picking, computer smart stat
  picking, round resolution, tie/pot handling, round counting for fixed-length
  matches
- Game UI: card display (front/back), stat picker, round result banner, deck
  counts
- Win/lose/draw end screen with replay and back-to-hub options

### P1 — Making it more fun for an 8-year-old (post-core)
- Big reveal reactions: confetti burst, sound effect ("whoosh"), screen-shake
  on a big win
- Character flavor text: one-line fun fact/quote shown when a card is revealed
- Announcer-style callouts ("CRUSHED IT!", "So close!") instead of plain text
- Win-streak badges (e.g. "3 wins in a row" trophy icon)
- Selectable computer difficulty: "Easy" (random stat picks) vs "Hero" (smart
  stat picks, the P0 default)
- Light story wrapper framing the match (e.g. "Help the Pandavas win at
  Kurukshetra") with a short intro line

## Future games (not scoped yet)
- Memory-match game using the same 40 character cards

## Open items (waiting on user input)
- 40 character images (stats finalized in [stats.md](stats.md))
