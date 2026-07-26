export type StatKey = "combatSkill" | "strength" | "strategy" | "courageSpirit";

export interface StatInfo {
  label: string;
  icon: string;
}

export const STAT_INFO: Record<StatKey, StatInfo> = {
  combatSkill: { label: "Combat Skill", icon: "⚔️" },
  strength: { label: "Strength", icon: "💪" },
  strategy: { label: "Strategy", icon: "🧠" },
  courageSpirit: { label: "Courage & Spirit", icon: "🦁" },
};

export const STAT_KEYS: StatKey[] = [
  "combatSkill",
  "strength",
  "strategy",
  "courageSpirit",
];

export interface Card {
  id: number;
  name: string;
  image: string;
  group: string;
  stats: Record<StatKey, number>;
  specialAdvantage: string;
}

/**
 * Source of truth for stat values: stats.md at the project root.
 * Images are placeholders (public/images/cards/<id>.png) until real art is provided.
 */
export const CARDS: Card[] = [
  { id: 1, name: "Krishna", group: "Leaders & Divinities", stats: { combatSkill: 98, strength: 92, strategy: 100, courageSpirit: 100 }, specialAdvantage: "Ultimate all-rounder & top strategy" },
  { id: 2, name: "Yudhishthira", group: "Leaders & Divinities", stats: { combatSkill: 84, strength: 80, strategy: 92, courageSpirit: 98 }, specialAdvantage: "High moral power & righteousness" },
  { id: 3, name: "Duryodhana", group: "Leaders & Divinities", stats: { combatSkill: 90, strength: 96, strategy: 84, courageSpirit: 92 }, specialAdvantage: "Powerful mace warrior & fierce leader" },
  { id: 4, name: "Draupadi", group: "Leaders & Divinities", stats: { combatSkill: 20, strength: 40, strategy: 95, courageSpirit: 100 }, specialAdvantage: "Unmatched courage, spirit & resilience" },
  { id: 5, name: "Kunti", group: "Leaders & Divinities", stats: { combatSkill: 15, strength: 35, strategy: 94, courageSpirit: 96 }, specialAdvantage: "Matriarch wisdom & high spirit" },
  { id: 6, name: "Gandhari", group: "Leaders & Divinities", stats: { combatSkill: 15, strength: 40, strategy: 90, courageSpirit: 98 }, specialAdvantage: "Devotional sacrifice & strong conviction" },
  { id: 7, name: "Dhritarashtra", group: "Leaders & Divinities", stats: { combatSkill: 65, strength: 90, strategy: 78, courageSpirit: 60 }, specialAdvantage: "Massive raw grip strength" },
  { id: 8, name: "Balarama", group: "Leaders & Divinities", stats: { combatSkill: 96, strength: 99, strategy: 82, courageSpirit: 94 }, specialAdvantage: "Titan of mace and plow combat" },
  { id: 9, name: "Vidura", group: "Leaders & Divinities", stats: { combatSkill: 70, strength: 60, strategy: 98, courageSpirit: 95 }, specialAdvantage: "Master statesman & moral counselor" },

  { id: 10, name: "Arjuna", group: "Supreme Warriors", stats: { combatSkill: 100, strength: 90, strategy: 92, courageSpirit: 96 }, specialAdvantage: "World's greatest bow master" },
  { id: 11, name: "Karna", group: "Supreme Warriors", stats: { combatSkill: 99, strength: 94, strategy: 85, courageSpirit: 98 }, specialAdvantage: "Divine golden armor & intense spirit" },
  { id: 12, name: "Bhishma", group: "Supreme Warriors", stats: { combatSkill: 98, strength: 98, strategy: 96, courageSpirit: 98 }, specialAdvantage: "Invincible veteran warrior" },
  { id: 13, name: "Drona", group: "Supreme Warriors", stats: { combatSkill: 97, strength: 88, strategy: 95, courageSpirit: 88 }, specialAdvantage: "Royal guru of all arms & astras" },
  { id: 14, name: "Ashwatthama", group: "Supreme Warriors", stats: { combatSkill: 95, strength: 92, strategy: 86, courageSpirit: 90 }, specialAdvantage: "Immortal warrior with divine gem" },
  { id: 15, name: "Abhimanyu", group: "Supreme Warriors", stats: { combatSkill: 95, strength: 88, strategy: 82, courageSpirit: 100 }, specialAdvantage: "Courage hero of the Chakravyuha" },
  { id: 16, name: "Dhrishtadyumna", group: "Supreme Warriors", stats: { combatSkill: 90, strength: 88, strategy: 90, courageSpirit: 92 }, specialAdvantage: "Pandava army general born of fire" },
  { id: 17, name: "Ekalavya", group: "Supreme Warriors", stats: { combatSkill: 96, strength: 86, strategy: 80, courageSpirit: 95 }, specialAdvantage: "Self-taught archer genius" },
  { id: 18, name: "Kripacharya", group: "Supreme Warriors", stats: { combatSkill: 92, strength: 84, strategy: 92, courageSpirit: 88 }, specialAdvantage: "Immortal guru & tactical preceptor" },
  { id: 19, name: "Barbarika", group: "Supreme Warriors", stats: { combatSkill: 100, strength: 90, strategy: 80, courageSpirit: 95 }, specialAdvantage: "Wielder of the 3 invincible arrows" },
  { id: 20, name: "Satyaki", group: "Supreme Warriors", stats: { combatSkill: 93, strength: 88, strategy: 86, courageSpirit: 94 }, specialAdvantage: "Invincible Yadava chieftain" },
  { id: 21, name: "Parashurama", group: "Supreme Warriors", stats: { combatSkill: 100, strength: 96, strategy: 95, courageSpirit: 98 }, specialAdvantage: "Legendary avatar master guru" },

  { id: 22, name: "Bhima", group: "Powerhouses & Strategists", stats: { combatSkill: 92, strength: 100, strategy: 78, courageSpirit: 96 }, specialAdvantage: "Unbeatable raw muscle & mace power" },
  { id: 23, name: "Nakula", group: "Powerhouses & Strategists", stats: { combatSkill: 90, strength: 84, strategy: 85, courageSpirit: 90 }, specialAdvantage: "Peerless swordsman & horse master" },
  { id: 24, name: "Sahadeva", group: "Powerhouses & Strategists", stats: { combatSkill: 88, strength: 82, strategy: 98, courageSpirit: 92 }, specialAdvantage: "Expert astronomer & visionary" },
  { id: 25, name: "Shakuni", group: "Powerhouses & Strategists", stats: { combatSkill: 45, strength: 50, strategy: 100, courageSpirit: 75 }, specialAdvantage: "Ultimate mastermind of dice & tactics" },
  { id: 26, name: "Shalya", group: "Powerhouses & Strategists", stats: { combatSkill: 88, strength: 90, strategy: 82, courageSpirit: 85 }, specialAdvantage: "King of Madra & skilled charioteer" },
  { id: 27, name: "Jayadratha", group: "Powerhouses & Strategists", stats: { combatSkill: 84, strength: 86, strategy: 80, courageSpirit: 78 }, specialAdvantage: "Formidable defensive warlord" },
  { id: 28, name: "Drupada", group: "Powerhouses & Strategists", stats: { combatSkill: 86, strength: 84, strategy: 88, courageSpirit: 88 }, specialAdvantage: "Monarch of Panchala" },
  { id: 29, name: "Dushasana", group: "Powerhouses & Strategists", stats: { combatSkill: 80, strength: 88, strategy: 65, courageSpirit: 70 }, specialAdvantage: "Aggressive Kaurava enforcer" },
  { id: 30, name: "Ghatotkacha", group: "Powerhouses & Strategists", stats: { combatSkill: 91, strength: 99, strategy: 84, courageSpirit: 95 }, specialAdvantage: "Giant illusionist (Maya) warrior" },
  { id: 31, name: "Jarasandha", group: "Powerhouses & Strategists", stats: { combatSkill: 90, strength: 99, strategy: 82, courageSpirit: 88 }, specialAdvantage: "Colossal arena wrestler king" },
  { id: 32, name: "Shishupala", group: "Powerhouses & Strategists", stats: { combatSkill: 85, strength: 86, strategy: 75, courageSpirit: 80 }, specialAdvantage: "Defiant ruler of Chedi" },
  { id: 33, name: "Sanjaya", group: "Powerhouses & Strategists", stats: { combatSkill: 30, strength: 40, strategy: 96, courageSpirit: 90 }, specialAdvantage: "Royal narrator with Divine Vision" },
  { id: 34, name: "Kansa", group: "Powerhouses & Strategists", stats: { combatSkill: 88, strength: 95, strategy: 80, courageSpirit: 70 }, specialAdvantage: "Ruthless fortress tyrant" },
  { id: 35, name: "Vikarna", group: "Powerhouses & Strategists", stats: { combatSkill: 84, strength: 82, strategy: 86, courageSpirit: 96 }, specialAdvantage: "The righteous & courageous Kaurava" },

  { id: 36, name: "Sikhandi", group: "Heroines, Mentors & Allies", stats: { combatSkill: 88, strength: 82, strategy: 88, courageSpirit: 98 }, specialAdvantage: "Courageous destiny warrior" },
  { id: 37, name: "Hidimbi", group: "Heroines, Mentors & Allies", stats: { combatSkill: 75, strength: 92, strategy: 85, courageSpirit: 92 }, specialAdvantage: "Forest guardian & magic protector" },
  { id: 38, name: "Subhadra", group: "Heroines, Mentors & Allies", stats: { combatSkill: 30, strength: 45, strategy: 88, courageSpirit: 94 }, specialAdvantage: "Beloved princess & brave mother" },
  { id: 39, name: "Iravan", group: "Heroines, Mentors & Allies", stats: { combatSkill: 91, strength: 86, strategy: 82, courageSpirit: 98 }, specialAdvantage: "Heroic Naga prince of sacrifice" },
  { id: 40, name: "Virata", group: "Heroines, Mentors & Allies", stats: { combatSkill: 82, strength: 82, strategy: 84, courageSpirit: 86 }, specialAdvantage: "Veteran king of Matsya" },
].map((c) => ({ ...c, image: `/images/cards/${c.id}.jpg` }));
