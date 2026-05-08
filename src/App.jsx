import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const NL = String.fromCharCode(10);
const DOUBLE_NL = NL + NL;

const COLORS = {
  bg: "#050505",
  panel: "#111827",
  card: "#0b1220",
  border: "#263244",
  text: "#f8fafc",
  muted: "#aab6c5",
  yellow: "#facc15",
  green: "#34d399",
  red: "#ef4444",
  black: "#000000",
};

const STYLES = {
  page: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    padding: "24px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  wrap: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },
  hero: {
    background: "linear-gradient(135deg, rgba(250,204,21,0.18), #111827 45%, rgba(52,211,153,0.12))",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
  },
  eyebrow: {
    color: COLORS.yellow,
    textTransform: "uppercase",
    letterSpacing: "4px",
    fontSize: "13px",
    fontWeight: 700,
    margin: "0 0 12px",
  },
  h1: {
    fontSize: "clamp(34px, 6vw, 76px)",
    lineHeight: 1.05,
    margin: 0,
    fontWeight: 900,
  },
  p: {
    color: COLORS.muted,
    fontSize: "18px",
    lineHeight: 1.6,
    margin: "16px 0 0",
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginTop: "26px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "16px",
  },
  stat: {
    background: "rgba(0,0,0,0.35)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "18px",
    padding: "18px",
  },
  panel: {
    background: COLORS.panel,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "26px",
    padding: "22px",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
  },
  card: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "18px",
    padding: "18px",
  },
  panelTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  h2: {
    fontSize: "26px",
    fontWeight: 900,
    margin: 0,
  },
  label: {
    color: COLORS.muted,
    fontSize: "14px",
    marginBottom: "8px",
    display: "block",
  },
  value: {
    color: COLORS.text,
    fontSize: "20px",
    fontWeight: 900,
    margin: "8px 0 0",
  },
  input: {
    width: "100%",
    background: "#020617",
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "14px",
    padding: "14px",
    fontSize: "16px",
    outline: "none",
  },
  buttonYellow: {
    background: COLORS.yellow,
    color: COLORS.black,
    border: "none",
    borderRadius: "18px",
    padding: "18px",
    fontSize: "16px",
    fontWeight: 900,
    cursor: "pointer",
  },
  buttonGreen: {
    background: COLORS.green,
    color: COLORS.black,
    border: "none",
    borderRadius: "18px",
    padding: "18px",
    fontSize: "16px",
    fontWeight: 900,
    cursor: "pointer",
  },
  buttonRed: {
    background: COLORS.red,
    color: COLORS.text,
    border: "none",
    borderRadius: "18px",
    padding: "18px",
    fontSize: "16px",
    fontWeight: 900,
    cursor: "pointer",
  },
  copy: {
    background: COLORS.text,
    color: COLORS.black,
    border: "none",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 900,
    cursor: "pointer",
  },
  pre: {
    whiteSpace: "pre-wrap",
    color: "#dbeafe",
    fontSize: "15px",
    lineHeight: 1.7,
    fontFamily: "Arial, Helvetica, sans-serif",
    margin: 0,
  },
  promptText: {
    whiteSpace: "pre-wrap",
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: 0,
  },
};

const CHANNEL_STYLES = [
  "dark cinematic finance thriller",
  "viral money mystery story",
  "Indian middle-class finance story",
  "clean 2D cartoon finance explainer",
  "dramatic black stick-figure money story",
];

const STORY_STRUCTURES = [
  "money trap revelation",
  "hidden spending psychology",
  "wealth vs broke mindset",
  "finance mystery story",
  "silent financial mistake",
  "bad habit transformation",
  "future regret scenario",
  "financial wake-up call",
  "money survival lesson",
  "fake rich lifestyle exposure",
  "debt spiral story",
  "income illusion breakdown",
  "subscription trap story",
  "investment awakening",
  "money discipline challenge",
];

const LOCATIONS = [
  "small apartment",
  "metro train",
  "office cabin",
  "college classroom",
  "city rooftop",
  "coffee shop",
  "street market",
  "bank building",
  "dark bedroom",
  "shared hostel room",
  "mall food court",
  "night city road",
];

const EMOTIONS = ["shocked", "stressed", "confused", "hopeful", "focused", "fearful", "motivated", "regretful", "determined", "emotionless"];

const MONEY_OBJECTS = ["coins", "credit cards", "falling money", "salary notification", "investment graph", "shopping bags", "EMI papers", "subscription icons", "bank alerts", "wallet"];

const CHARACTER_LOCK = [
  "MANDATORY CHARACTER LOCK: same whole black stick-figure character in every scene",
  "full body visible when possible",
  "round black head",
  "thin black stick body",
  "black stick arms and legs",
  "simple white expressive eyes",
  "simple white mouth",
  "no hair",
  "no clothes",
  "no skin tone",
  "no outfit",
  "no realistic human face",
  "no character changes",
  "clean flat 2D cartoon style",
].join(", ");

const TOPICS = [
  {
    title: "Your Salary Is Disappearing",
    hook: "Your salary is not small. Your money is leaking.",
    lesson: "Track your silent spending leaks before blaming your income.",
    twist: "The biggest expense was not rent. It was repeated tiny spending.",
  },
  {
    title: "The EMI Trap",
    hook: "This one payment trick makes expensive things look cheap.",
    lesson: "Never judge a purchase only by its monthly payment.",
    twist: "The EMI looked small, but it stole his future salary first.",
  },
  {
    title: "The Credit Card Loop",
    hook: "Banks do not want one payment. They want a habit.",
    lesson: "Minimum payments can keep you stuck for months or years.",
    twist: "He was not buying things. He was buying debt.",
  },
  {
    title: "The Rich Habit Nobody Sees",
    hook: "Rich people do one boring thing before they spend.",
    lesson: "Pay your future first, then spend what is left.",
    twist: "He became stable not by earning more, but by spending last.",
  },
  {
    title: "The Rs 100 Test",
    hook: "This tiny Rs 100 habit can expose your real money mindset.",
    lesson: "Consistency matters more than starting big.",
    twist: "The Rs 100 was not an investment. It was identity training.",
  },
];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function makePrompt(parts) {
  return parts.filter(Boolean).join(", ");
}

function makeSceneVideo(text) {
  return [
    "EXACTLY 5 seconds.",
    text,
    "Vertical 9:16.",
    "No text overlays.",
    "No logos.",
    "Keep the same whole black stick-figure character in every frame.",
  ].join(" ");
}

function createFinanceShort(style) {
  const topic = randomItem(TOPICS);
  const structure = randomItem(STORY_STRUCTURES);
  const location = randomItem(LOCATIONS);
  const emotion = randomItem(EMOTIONS);
  const moneyObject = randomItem(MONEY_OBJECTS);
  const uniqueVideoId = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);

  const baseVisuals = [style, structure, location, emotion + " emotion", moneyObject + " visual theme", CHARACTER_LOCK];

  const scriptLines = [
    {
      time: "0:00 - 0:05",
      beat: "Hook",
      voice: topic.hook + " Most people notice it only when the account is almost empty.",
      image: makePrompt(["Vertical 9:16 opening finance scene", ...baseVisuals, "black stick-figure character staring at phone showing low bank balance", "dramatic shadows", "no text", "no logos"]),
      video: makeSceneVideo("Slow push-in on the black stick character. Phone glow increases. Character freezes in shock. Add subtle money smoke in background."),
    },
    {
      time: "0:05 - 0:10",
      beat: "Salary Moment",
      voice: "Salary comes in. For one day, everything feels safe. Then the spending starts quietly.",
      image: makePrompt(["Vertical 9:16 finance scene", ...baseVisuals, "same black stick-figure character holding phone with salary credited notification glow", "hopeful mood", "no text", "no logos"]),
      video: makeSceneVideo("Notification glow pulses on phone. Character posture changes from happy to unsure. Background slightly zooms."),
    },
    {
      time: "0:10 - 0:15",
      beat: "Money Leak",
      voice: "Food orders, subscriptions, shopping, small EMIs... none look dangerous alone.",
      image: makePrompt(["Vertical 9:16 finance scene", ...baseVisuals, "same black stick-figure character surrounded by food boxes, shopping bags, subscription icons", "coins leaking from wallet", "no brand logos", "no text"]),
      video: makeSceneVideo("Objects slowly orbit around character. Coins fall from wallet one by one. Character looks confused."),
    },
    {
      time: "0:15 - 0:20",
      beat: "Trap Reveal",
      voice: "But together, they become a hole in your pocket that never stops growing.",
      image: makePrompt(["Vertical 9:16 dramatic finance scene", ...baseVisuals, "same black stick-figure character standing over a black hole shaped like a wallet", "money falling into it", "dark cinematic background", "no text"]),
      video: makeSceneVideo("Camera tilts down toward wallet hole. Money falls into darkness. Character steps back in fear."),
    },
    {
      time: "0:20 - 0:25",
      beat: "Realization",
      voice: "He thought he needed more income. The truth was, he needed a money system.",
      image: makePrompt(["Vertical 9:16 emotional finance scene", ...baseVisuals, "same black stick-figure character sitting at table with notebook, calculator, phone, expense list symbols", "warm lamp light", "no text"]),
      video: makeSceneVideo("Character writes in notebook. Calculator buttons tap. Warm light flickers softly. Focus pull from phone to notebook."),
    },
    {
      time: "0:25 - 0:30",
      beat: "Simple Fix",
      voice: "So he tracked seven days of spending and found three silent leaks instantly.",
      image: makePrompt(["Vertical 9:16 finance improvement scene", ...baseVisuals, "same black stick-figure character pointing at notebook with three circled expense leaks", "clean desk", "focused mood", "no readable text", "no logos"]),
      video: makeSceneVideo("Three circles appear as simple shapes on notebook. Character points at them. Camera pushes in. No readable text."),
    },
    {
      time: "0:30 - 0:35",
      beat: "Transformation",
      voice: "He did not become rich overnight. But for the first time, his money stopped disappearing.",
      image: makePrompt(["Vertical 9:16 transformation finance scene", ...baseVisuals, "same black stick-figure character calmly looking at rising simple graph on laptop", "clean room", "hopeful lighting", "no text"]),
      video: makeSceneVideo("Simple graph rises slowly on laptop. Character smiles with simple white mouth. Lighting becomes brighter."),
    },
    {
      time: "0:35 - 0:40",
      beat: "Twist + CTA",
      voice: topic.twist + " Follow for more simple money stories.",
      image: makePrompt(["Vertical 9:16 powerful ending scene", ...baseVisuals, "same black stick-figure character standing on rooftop at sunrise", "city skyline", "money discipline theme", "cinematic hopeful ending", "no text"]),
      video: makeSceneVideo("Slow crane-up from character to sunrise skyline. Character stands confidently. End with clean still frame."),
    },
  ];

  const script = scriptLines.map((scene, index) => scene.time + " - Scene " + (index + 1) + ": " + scene.beat + NL + scene.voice).join(DOUBLE_NL);
  const imagePrompts = scriptLines.map((scene) => scene.image);
  const videoPrompts = scriptLines.map((scene, index) => ["Scene " + (index + 1) + " | " + scene.time + " | " + scene.beat, scene.video, "Character rule: " + CHARACTER_LOCK].join(NL));

  const thumbnailPrompt = makePrompt(["Viral finance YouTube Shorts thumbnail", style, CHARACTER_LOCK, "same black stick-figure character shocked while holding phone", "huge falling red graph behind character", "money flying away", "dark background", "high contrast", "dramatic emotion", "curiosity gap", "clean composition", "no watermark", "no logos", "vertical 9:16"]);
  const disclaimerPrompt = makePrompt(["Finance disclaimer screen prompt", "vertical 9:16", "black background", "subtle money icons", "clean yellow warning symbol", "professional finance documentary style", "space for disclaimer caption", "no logos", "no brand names", "simple cinematic look"]);
  const disclaimerText = "Disclaimer: This video is for education and entertainment only. It is not financial advice. Always do your own research before making money decisions.";

  const uploadPack = {
    title: topic.title + " | 40 Second Money Story",
    description: topic.lesson + DOUBLE_NL + disclaimerText,
    hashtags: "#Finance #MoneyTips #PersonalFinance #MoneyStory #MoneyMindset #Shorts #FinancialEducation",
    videoLength: VIDEO_SECONDS + " seconds",
    sceneFormat: TOTAL_SCENES + " scenes x " + SCENE_SECONDS + " seconds each",
  };

  return {
    generatedAt: new Date().toLocaleTimeString(),
    uniqueVideoId,
    topic,
    scriptLines,
    script,
    imagePrompts,
    videoPrompts,
    thumbnailPrompt,
    disclaimerPrompt,
    disclaimerText,
    uploadPack,
    editPlan: [
      "Total video length must be exactly 40 seconds.",
      "Use 8 image scenes only. Convert each image into exactly 5 seconds of video.",
      "Voiceover should fit each 5-second scene line.",
      "Keep subtitles fast and short.",
      "Add disclaimer in description, not inside the 40-second video unless required.",
      "Use thumbnail separately. Do not include thumbnail inside video timeline.",
    ],
  };
}

function runSelfTests(pack) {
  return [
    { name: "Generates exactly 8 scenes", pass: pack.scriptLines.length === TOTAL_SCENES },
    { name: "Generates exactly 8 image prompts", pass: pack.imagePrompts.length === TOTAL_SCENES },
    { name: "Generates exactly 8 video prompts", pass: pack.videoPrompts.length === TOTAL_SCENES },
    { name: "Each video prompt says EXACTLY 5 seconds", pass: pack.videoPrompts.every((prompt) => prompt.includes("EXACTLY 5 seconds")) },
    { name: "All image prompts include black stick-figure", pass: pack.imagePrompts.every((prompt) => prompt.includes("black stick-figure")) },
    { name: "Upload pack says 40 seconds", pass: pack.uploadPack.videoLength === "40 seconds" },
  ];
}

export default function App() {
  const [style, setStyle] = useState(CHANNEL_STYLES[0]);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [pack, setPack] = useState(() => createFinanceShort(CHANNEL_STYLES[0]));
  const [copied, setCopied] = useState("");

  const selfTests = useMemo(() => runSelfTests(pack), [pack]);
  const allTestsPassed = selfTests.every((test) => test.pass);
  const statusText = autoGenerate ? "Auto pipeline ON - new 40-second video pack every 5 minutes" : "Auto pipeline OFF";

  useEffect(() => {
    if (!autoGenerate) return undefined;
    const interval = window.setInterval(() => setPack(createFinanceShort(style)), 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [autoGenerate, style]);

  async function copyText(label, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1400);
    } catch {
      window.alert("Copy failed. Please select and copy manually.");
    }
  }

  return (
    <div style={STYLES.page}>
      <div style={STYLES.wrap}>
        <header style={STYLES.hero}>
          <p style={STYLES.eyebrow}>40 Second Finance Shorts Generator</p>
          <h1 style={STYLES.h1}>8 Scenes x 5 Seconds = Exact 40-Second Video</h1>
          <p style={STYLES.p}>This app generates a complete short finance video pack: 40-second script, 8 image prompts, 8 matching video prompts, thumbnail prompt, disclaimer prompt, upload title, description, and hashtags.</p>
          <div style={STYLES.grid4}>
            <Stat label="Video Limit" value="40 sec" />
            <Stat label="Scenes" value="8" />
            <Stat label="Each Scene" value="5 sec" />
            <Stat label="Character" value="Black Stick" />
          </div>
        </header>

        <section style={STYLES.grid3}>
          <div style={STYLES.panel}>
            <label style={STYLES.label}>Visual Style</label>
            <select value={style} onChange={(event) => setStyle(event.target.value)} style={STYLES.input}>
              {CHANNEL_STYLES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => setPack(createFinanceShort(style))} style={STYLES.buttonYellow}>Generate New 40-Sec Video</button>
          <button type="button" onClick={() => setAutoGenerate((value) => !value)} style={autoGenerate ? STYLES.buttonRed : STYLES.buttonGreen}>{autoGenerate ? "Stop Auto Generate" : "Start 5-Min Auto Generate"}</button>
        </section>

        <div style={STYLES.panel}><span style={{ color: COLORS.green, fontWeight: 900 }}>Status:</span> {statusText} - Last generated: {pack.generatedAt}</div>

        <section style={STYLES.grid3}>
          <InfoCard title="Topic" value={pack.topic.title} />
          <InfoCard title="Lesson" value={pack.topic.lesson} />
          <InfoCard title="Unique ID" value={pack.uniqueVideoId} />
        </section>

        <Panel title="Built-in Tests" action={<span style={{ color: allTestsPassed ? COLORS.green : COLORS.red, fontWeight: 900 }}>{allTestsPassed ? "All Passed" : "Fix Needed"}</span>}>
          <div style={STYLES.grid3}>{selfTests.map((test) => <div key={test.name} style={STYLES.card}><strong style={{ color: test.pass ? COLORS.green : COLORS.red }}>{test.pass ? "PASS" : "FAIL"}</strong><p style={STYLES.promptText}>{test.name}</p></div>)}</div>
        </Panel>

        <Panel title="Exact 40-Second Script" action={<CopyButton copied={copied} label="Script" onClick={() => copyText("Script", pack.script)} />}>
          <pre style={STYLES.pre}>{pack.script}</pre>
        </Panel>

        <Panel title="Scene Timeline" action={<CopyButton copied={copied} label="Timeline" onClick={() => copyText("Timeline", pack.scriptLines.map((scene, index) => "Scene " + (index + 1) + ": " + scene.time + " - " + scene.beat).join(NL))} />}>
          <div style={STYLES.grid4}>{pack.scriptLines.map((scene, index) => <div key={scene.time + scene.beat} style={STYLES.card}><h3 style={{ color: COLORS.yellow, margin: 0 }}>Scene {index + 1}</h3><p style={STYLES.promptText}>{scene.time}</p><strong>{scene.beat}</strong><p style={STYLES.promptText}>5 seconds only</p></div>)}</div>
        </Panel>

        <Panel title="8 Text-to-Image Prompts" action={<CopyButton copied={copied} label="Images" onClick={() => copyText("Images", pack.imagePrompts.join(DOUBLE_NL))} />}>
          <div style={STYLES.grid2}>{pack.imagePrompts.map((prompt, index) => <PromptBox key={"image-" + index} title={"Image " + (index + 1) + " / Scene " + (index + 1)} text={prompt} />)}</div>
        </Panel>

        <Panel title="8 Image-to-Video Prompts - 5 Seconds Each" action={<CopyButton copied={copied} label="Videos" onClick={() => copyText("Videos", pack.videoPrompts.join(DOUBLE_NL))} />}>
          <div style={STYLES.grid2}>{pack.videoPrompts.map((prompt, index) => <PromptBox key={"video-" + index} title={"Video " + (index + 1) + " - Exactly 5 Sec"} text={prompt} />)}</div>
        </Panel>

        <section style={STYLES.grid2}>
          <Panel title="Thumbnail Prompt" action={<CopyButton copied={copied} label="Thumbnail" onClick={() => copyText("Thumbnail", pack.thumbnailPrompt)} />}><PromptBox title="Viral Thumbnail" text={pack.thumbnailPrompt} /></Panel>
          <Panel title="Disclaimer Prompt" action={<CopyButton copied={copied} label="Disclaimer Prompt" onClick={() => copyText("Disclaimer Prompt", pack.disclaimerPrompt)} />}><PromptBox title="Disclaimer Screen" text={pack.disclaimerPrompt} /><PromptBox title="Disclaimer Text" text={pack.disclaimerText} /></Panel>
        </section>

        <section style={STYLES.grid2}>
          <Panel title="Edit Rules"><ul>{pack.editPlan.map((step, index) => <li key={"edit-" + index} style={{ marginBottom: "12px", color: "#dbeafe" }}>{index + 1}. {step}</li>)}</ul></Panel>
          <Panel title="Upload Pack" action={<CopyButton copied={copied} label="Upload Pack" onClick={() => copyText("Upload Pack", JSON.stringify(pack.uploadPack, null, 2))} />}><PromptBox title="Title" text={pack.uploadPack.title} /><PromptBox title="Description" text={pack.uploadPack.description} /><PromptBox title="Hashtags" text={pack.uploadPack.hashtags} /><PromptBox title="Format" text={pack.uploadPack.sceneFormat} /></Panel>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return <div style={STYLES.stat}><p style={STYLES.label}>{label}</p><p style={{ ...STYLES.value, color: COLORS.yellow }}>{value}</p></div>;
}

function InfoCard({ title, value }) {
  return <div style={STYLES.panel}><p style={STYLES.label}>{title}</p><p style={STYLES.value}>{value}</p></div>;
}

function Panel({ title, action, children }) {
  return <section style={STYLES.panel}><div style={STYLES.panelTop}><h2 style={STYLES.h2}>{title}</h2>{action}</div>{children}</section>;
}

function PromptBox({ title, text }) {
  return <div style={STYLES.card}><h3 style={{ color: COLORS.green, marginTop: 0 }}>{title}</h3><p style={STYLES.promptText}>{text}</p></div>;
}

function CopyButton({ label, copied, onClick }) {
  return <button type="button" onClick={onClick} style={STYLES.copy}>{copied === label ? "Copied" : "Copy " + label}</button>;
}
