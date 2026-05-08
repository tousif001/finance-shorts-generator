import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "finance_generator_creative_ui_v2";
const SCENE_SECONDS = 5;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hindi + English" },
];

const NICHES = ["Crypto Finance", "Business Stories", "Stock Market", "Debt & Credit", "Rich Mindset"];

const hooks = {
  "Crypto Finance": ["He thought crypto would make him rich in one week.", "Everyone online said this coin was the future.", "One trade slowly became an obsession.", "He ignored every warning because the chart looked perfect."],
  "Business Stories": ["Customers kept coming, but profit kept disappearing.", "Revenue was rising while his bank balance was dying.", "The shop looked busy, but the cash drawer stayed empty.", "He worked every day but still felt broke."],
  "Stock Market": ["The chart looked perfect until one red candle appeared.", "He confused luck with skill.", "He bought the stock because everyone online was excited.", "He thought the market owed him profit."],
  "Debt & Credit": ["He used the credit card just one more time.", "Debt looked small until interest woke up.", "Minimum payments slowly became his lifestyle.", "The EMI looked tiny, but the trap was huge."],
  "Rich Mindset": ["He bought attention instead of assets.", "Everyone saw his lifestyle, nobody saw his empty savings.", "The flex looked expensive, but the lesson cost more.", "He wanted to look rich before becoming stable."],
};

const twists = {
  "Crypto Finance": ["FOMO destroys more wallets than bad coins.", "The market was never the real enemy. Emotion was.", "Patience beats panic in every market."],
  "Business Stories": ["Revenue is loud. Profit is silent.", "Cashflow is the heartbeat of every business.", "Small leaks destroy big businesses."],
  "Stock Market": ["The market rewards discipline, not excitement.", "Patience beats hype in every market.", "A plan protects you when emotions get loud."],
  "Debt & Credit": ["Interest grows faster than excuses.", "Debt steals peace before money.", "Credit is useful only when controlled."],
  "Rich Mindset": ["Real wealth is quiet before it becomes visible.", "Looking rich is easy. Staying rich is a system.", "Assets first. Lifestyle later."],
};

const imageScenes = {
  "Crypto Finance": [
    "holding a smartphone close to his face while a bright green crypto chart glows on the screen, dark messy bedroom, blue screen light, floating digital coin symbols, shocked expression",
    "sitting at a messy trading desk with glowing laptop, green and red crypto candles, notebook papers, digital coin particles, nervous posture",
    "staring at phone while red crypto crash reflects across the room, falling coins, broken graph symbols, red lighting, panic mood",
    "sitting beside rainy window while group chat bubbles fade away on phone, neon city outside, lonely finance mood",
    "writing risk rules in notebook beside glowing laptop, warm desk lamp, organized setup, focused mood",
    "closing laptop calmly after avoiding emotional trading, soft blue light, relaxed body posture",
    "walking through dark neon street while crypto symbols disappear behind him, rain reflections, confident posture",
    "standing calmly while giant red market chart falls behind him, smoke, dramatic red glow, confident ending",
  ],
  "Business Stories": [
    "standing inside small crowded shop with shelves, boxes, warm lights, blurry customer silhouettes, thoughtful mood",
    "opening almost empty cash drawer behind shop counter, receipts, bills, delivery boxes, shocked white eyes",
    "counting bills beside stacked delivery boxes, busy shop background, evening light, stressful money mood",
    "checking expense notebook with calculator and laptop, cluttered business desk, financial pressure",
    "crossing out bad discount offer on paper, shop wall background, determined posture",
    "checking positive cashflow graph on laptop, organized counter, hopeful mood, warm golden lighting",
    "arranging money, stock boxes, and notebook neatly, clean counter, relieved business mood",
    "locking cash drawer confidently at closing time, golden shop light, dark city outside",
  ],
  "Stock Market": [
    "watching green stock chart rise on laptop, dark desk setup, excited white eyes, finance atmosphere",
    "shocked as red candle appears on laptop chart, red light on face, nervous mood",
    "holding head while stock graph falls, phone alerts glowing nearby, regret mood",
    "writing investing plan in notebook beside laptop, calm blue light, focused mood",
    "ignoring hype notifications on phone, floating alerts fading, disciplined mood",
    "studying chart calmly with notebook open, quiet night window, patient mood",
    "sitting steady while green and red chart lines move behind him, calm emotion",
    "standing beside simple rising graph, soft green glow, confident ending",
  ],
  "Debt & Credit": [
    "holding credit card in dark room, phone payment screen glowing, unsure emotion",
    "worried at payment bill on phone, small apartment desk with bills around, stress mood",
    "surrounded by growing interest number shapes, red warning glow, fear emotion",
    "pushing credit card away on desk, wallet and bills nearby, determined mood",
    "listing debts in notebook, calculator and lamp on desk, focused mood",
    "paying one bill on phone, one paper bill fading away, relief emotion",
    "closing wallet calmly after organizing money, clean desk, peaceful mood",
    "walking away from floating debt papers, dark hallway, freedom mood",
  ],
  "Rich Mindset": [
    "looking at expensive item on phone, dark room, finger paused before buying, thinking mood",
    "walking past flashy shopping signs, night mall corridor, discipline mood",
    "dropping coins into savings jar, simple desk, soft lamp, small wealth habit mood",
    "choosing laptop asset graph over shopping bag, split desk scene, smart decision mood",
    "writing wealth plan in notebook, clean desk, dark blue light, focused mindset mood",
    "standing beside growing asset chart on laptop, calm confident mood",
    "sitting peacefully in simple room, morning light, notebook nearby, quiet wealth mood",
    "watching sunrise from rooftop, city skyline, confident ending mood",
  ],
};

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function makeImagePrompt(scene) {
  return ["Vertical 9:16 cinematic finance illustration.", "Whole black stick figure character, same guy in every scene.", "Round black head, thin black body, black stick arms and legs, glowing white eyes, simple white mouth.", scene, "Ultra detailed finance atmosphere.", "Dark cinematic mood.", "High contrast lighting.", "Modern 2D cartoon digital illustration.", "Clean composition.", "No text.", "No watermark."].join(" ");
}

function makeVideoPrompt(scene) {
  return ["Vertical 9:16.", "5 second video.", "2D cartoon animation.", "Same whole black stick figure guy.", scene, "Simple movement only.", "One clear camera movement.", "Dark cinematic lighting.", "No text.", "No watermark."].join(" ");
}

function createStory(niche, language) {
  const hook = randomItem(hooks[niche]);
  const twist = randomItem(twists[niche]);
  const script = language === "hi" ? [hook, "शुरुआत में सब exciting लग रहा था।", "फिर धीरे-धीरे pressure बढ़ने लगा।", "हर छोटी गलती harmless लग रही थी।", "लेकिन साथ में वही dangerous बन गई।", "उसने finally रुककर problem समझी।", "एक simple rule ने सब बदल दिया।", twist + " अगले money decision से पहले save कर लो।"] : language === "hinglish" ? [hook, "Starting me sab exciting lag raha tha.", "Phir pressure slowly build hone laga.", "Har small decision harmless lag raha tha.", "But together, sab dangerous ban gaya.", "Usne finally stop kiya aur problem samjhi.", "Ek simple rule ne pura game change kar diya.", twist + " Save karo before next money decision."] : [hook, "At first, everything felt exciting.", "Then the pressure slowly started building.", "Every small decision looked harmless.", "But together, the mistakes became dangerous.", "He finally stopped and studied the problem.", "One simple rule changed everything.", twist + " Save this before your next money decision."];

  return {
    id: Date.now().toString(36), niche, language, title: niche + " Viral Finance Story",
    scenes: script.map((line, index) => ({
      number: index + 1,
      time: "0:" + String(index * SCENE_SECONDS).padStart(2, "0") + " - 0:" + String(index * SCENE_SECONDS + SCENE_SECONDS).padStart(2, "0"),
      voice: line,
      imagePrompt: makeImagePrompt(imageScenes[niche][index]),
      videoPrompt: makeVideoPrompt(imageScenes[niche][index]),
    })),
    thumbnail: "Vertical 9:16 viral finance thumbnail. Same black stick figure guy shocked while huge red finance graph crashes behind him. Dark cinematic background. High contrast. No text. No watermark.",
    disclaimer: "Disclaimer: This video is for education and entertainment only. Not financial advice.",
    hashtags: "#Finance #Money #Investing #Business #Crypto #Shorts",
  };
}

const styles = {
  page: { minHeight: "100vh", background: "radial-gradient(circle at top left,#1e293b 0,#020617 45%,#000 100%)", color: "white", padding: 22, fontFamily: "Arial, sans-serif" },
  wrap: { maxWidth: 1350, margin: "0 auto" },
  hero: { position: "relative", overflow: "hidden", borderRadius: 36, padding: 40, marginBottom: 24, background: "linear-gradient(135deg,rgba(250,204,21,0.18),rgba(15,23,42,0.96),rgba(34,211,238,0.12))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" },
  badge: { display: "inline-flex", padding: "10px 18px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20, fontWeight: 800, color: "#fde68a", letterSpacing: 1, fontSize: 12 },
  title: { fontSize: "clamp(52px,8vw,96px)", lineHeight: 0.95, margin: 0, marginBottom: 18, fontWeight: 900, letterSpacing: -4, background: "linear-gradient(135deg,#ffffff,#fde68a,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { maxWidth: 820, color: "#cbd5e1", fontSize: 18, lineHeight: 1.9, marginBottom: 30 },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 },
  stat: { background: "rgba(2,6,23,0.7)", borderRadius: 24, padding: 22, border: "1px solid rgba(255,255,255,0.08)" },
  statValue: { fontSize: 34, fontWeight: 900, color: "#facc15" },
  controls: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 24 },
  box: { background: "rgba(15,23,42,0.92)", padding: 20, borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)" },
  label: { display: "block", color: "#94a3b8", fontWeight: 800, marginBottom: 10 },
  select: { width: "100%", padding: 14, borderRadius: 16, background: "#020617", color: "white", border: "1px solid #334155" },
  button: { width: "100%", minHeight: 78, border: "none", borderRadius: 24, background: "linear-gradient(135deg,#facc15,#fb923c,#f43f5e)", color: "#111827", fontWeight: 900, fontSize: 20, cursor: "pointer", boxShadow: "0 20px 40px rgba(251,146,60,0.35)" },
  section: { background: "rgba(15,23,42,0.92)", borderRadius: 28, padding: 24, marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" },
  sectionTitle: { fontSize: 34, fontWeight: 900, marginBottom: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 },
  card: { background: "linear-gradient(180deg,rgba(2,6,23,0.95),rgba(15,23,42,0.95))", borderRadius: 26, padding: 24, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" },
  copy: { border: "none", background: "white", color: "black", padding: "10px 15px", borderRadius: 14, fontWeight: 800, cursor: "pointer", marginBottom: 15 },
  text: { lineHeight: 1.8, whiteSpace: "pre-wrap", color: "#dbeafe" },
};

export default function App() {
  const [language, setLanguage] = useState("en");
  const [niche, setNiche] = useState("Crypto Finance");
  const [story, setStory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : createStory("Crypto Finance", "en");
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(story)); }, [story]);
  function generate() { setStory(createStory(niche, language)); }
  async function copy(text) { await navigator.clipboard.writeText(text); }

  const fullScript = useMemo(() => story.scenes.map((s) => `${s.time}\n${s.voice}`).join("\n\n"), [story]);

  return <div style={styles.page}><div style={styles.wrap}>
    <div style={styles.hero}>
      <div style={styles.badge}>⚡ AI FINANCE CONTENT ENGINE</div>
      <h1 style={styles.title}>Finance<br />Shorts Generator</h1>
      <p style={styles.subtitle}>Generate cinematic finance shorts with viral hooks, AI-humanized scripts, detailed image prompts, Meta-safe video prompts, thumbnails, hashtags, and unique story combinations.</p>
      <div style={styles.stats}>{[["Scenes", "8"], ["Scene Length", "5s"], ["Video Length", "40s"], ["Prompt Style", "Cinematic"]].map(([label, value]) => <div key={label} style={styles.stat}><div>{label}</div><div style={styles.statValue}>{value}</div></div>)}</div>
    </div>
    <div style={styles.controls}>
      <div style={styles.box}><label style={styles.label}>Language</label><select style={styles.select} value={language} onChange={(e) => setLanguage(e.target.value)}>{LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}</select></div>
      <div style={styles.box}><label style={styles.label}>Niche</label><select style={styles.select} value={niche} onChange={(e) => setNiche(e.target.value)}>{NICHES.map((n) => <option key={n}>{n}</option>)}</select></div>
      <button style={styles.button} onClick={generate}>Generate Unique Video</button>
    </div>
    <Section title="Full Script"><button style={styles.copy} onClick={() => copy(fullScript)}>Copy Script</button><div style={styles.text}>{fullScript}</div></Section>
    <PromptSection title="Image Prompts" scenes={story.scenes} field="imagePrompt" copy={copy} />
    <PromptSection title="Meta-Safe Video Prompts" scenes={story.scenes} field="videoPrompt" copy={copy} />
    <Section title="Thumbnail Prompt"><button style={styles.copy} onClick={() => copy(story.thumbnail)}>Copy Thumbnail</button><div style={styles.text}>{story.thumbnail}</div></Section>
    <Section title="Disclaimer"><div style={styles.text}>{story.disclaimer}</div></Section>
    <Section title="Hashtags"><button style={styles.copy} onClick={() => copy(story.hashtags)}>Copy Hashtags</button><div style={styles.text}>{story.hashtags}</div></Section>
  </div></div>;
}

function Section({ title, children }) { return <div style={styles.section}><div style={styles.sectionTitle}>{title}</div>{children}</div>; }
function PromptSection({ title, scenes, field, copy }) { return <Section title={title}><div style={styles.grid}>{scenes.map((scene) => <div key={scene.number + field} style={styles.card}><h3>Scene {scene.number}</h3><button style={styles.copy} onClick={() => copy(scene[field])}>Copy</button><div style={styles.text}>{scene[field]}</div></div>)}</div></Section>; }
