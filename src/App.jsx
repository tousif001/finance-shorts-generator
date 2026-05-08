import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const STORAGE_KEY = "finance_meta_ai_generator_v6";
const NL = String.fromCharCode(10);
const DOUBLE_NL = NL + NL;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hindi + English" },
];

const NICHES = [
  {
    name: "Crypto Finance",
    accent: "#22d3ee",
    hooks: [
      "He thought crypto would make him rich in one week.",
      "One green candle changed his whole mood.",
      "He entered the trade five minutes too late.",
      "Everyone in the group chat said buy.",
      "He saw a coin pumping and forgot every rule.",
    ],
    twists: [
      "FOMO destroyed more wallets than bad coins.",
      "The chart was never the real enemy. Emotion was.",
      "He lost money chasing speed instead of strategy.",
      "Crypto rewards patience, not panic.",
    ],
    hashtags: "#Crypto #CryptoEducation #Finance #MoneyTips #RiskManagement #Shorts",
  },
  {
    name: "Business Stories",
    accent: "#f59e0b",
    hooks: [
      "His business looked successful from outside.",
      "Customers were coming daily, but profit was disappearing.",
      "Revenue was growing. Cashflow was dying.",
      "He sold more every month but saved less.",
      "The shop looked busy, but the drawer stayed empty.",
    ],
    twists: [
      "Revenue is loud. Profit is silent.",
      "A business dies slowly through invisible losses.",
      "Sales alone never build wealth.",
      "Cashflow is the heartbeat of every business.",
    ],
    hashtags: "#Business #Startup #Entrepreneurship #MoneyLessons #Cashflow #Shorts",
  },
  {
    name: "Stock Market",
    accent: "#34d399",
    hooks: [
      "He bought the stock because everyone online was excited.",
      "The chart looked perfect until one red candle appeared.",
      "He confused luck with skill.",
      "One stock changed his confidence overnight.",
      "He thought the market owed him profit.",
    ],
    twists: [
      "Patience beats hype in every market.",
      "The market rewards discipline, not excitement.",
      "He stopped gambling and started investing.",
      "A plan protects you when emotions get loud.",
    ],
    hashtags: "#StockMarket #Investing #Stocks #TradingPsychology #Finance #Shorts",
  },
  {
    name: "Debt & Credit",
    accent: "#fb7185",
    hooks: [
      "He used the credit card just one more time.",
      "Minimum payments slowly became his lifestyle.",
      "Debt looked small until interest woke up.",
      "He was buying time using borrowed money.",
      "The EMI looked tiny, but the trap was huge.",
    ],
    twists: [
      "Interest grows faster than excuses.",
      "Debt steals peace before money.",
      "Credit is useful only when controlled.",
      "The real cost is hidden behind monthly payments.",
    ],
    hashtags: "#DebtFree #CreditCard #EMI #MoneyTips #PersonalFinance #Shorts",
  },
  {
    name: "Rich Mindset",
    accent: "#a78bfa",
    hooks: [
      "He wanted to look rich before becoming stable.",
      "He bought attention instead of assets.",
      "Everyone saw his lifestyle, nobody saw his empty savings.",
      "He thought rich people spend first.",
      "The flex looked expensive, but the lesson cost more.",
    ],
    twists: [
      "Real wealth is quiet before it becomes visible.",
      "The rich buy freedom before status.",
      "Looking rich is easy. Staying rich is a system.",
      "Assets first. Lifestyle later.",
    ],
    hashtags: "#RichMindset #Wealth #MoneyHabits #FinancialFreedom #Success #Shorts",
  },
];

const LOCATIONS = [
  "dark bedroom",
  "small apartment",
  "office desk",
  "night city",
  "small business shop",
  "metro station",
  "coffee shop",
  "bank lobby",
  "rooftop at sunrise",
  "messy study table",
];

const EMOTIONS = ["shocked", "stressed", "nervous", "focused", "hopeful", "confused", "regretful", "determined"];
const OBJECTS = ["crypto chart", "bank balance", "wallet", "credit card", "cash drawer", "laptop graph", "phone alert", "falling red graph", "empty savings jar"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUniqueId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

function copySafeText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.reject(new Error("Clipboard unavailable"));
}

function makeMetaVideoPrompt(action, emotion) {
  return [
    "5 second vertical video.",
    action,
    emotion,
    "Simple smooth motion.",
    "2D cartoon style.",
    "Black stick figure character.",
    "Same character design.",
    "Dark finance atmosphere.",
    "No text.",
  ].join(" ");
}

function generateHumanScript(niche, language) {
  const hook = randomItem(niche.hooks);
  const twist = randomItem(niche.twists);
  const location = randomItem(LOCATIONS);
  const emotion = randomItem(EMOTIONS);
  const object = randomItem(OBJECTS);

  const english = [
    hook,
    "At first, it felt like a smart move. But the pressure started quietly.",
    "Every small decision looked harmless until the numbers came together.",
    "The scary part was not the mistake. It was how normal the mistake felt.",
    "Then he finally stopped guessing and looked at what was actually happening.",
    "One simple rule changed everything: no decision without a reason.",
    "He did not win overnight, but he stopped losing blindly.",
    twist + " Save this before your next money decision.",
  ];

  const hinglish = [
    hook,
    "Pehle ye smart move lag raha tha. But pressure quietly start ho gaya.",
    "Har chhota decision harmless lagta tha, jab tak numbers ek saath nahi aaye.",
    "Scary part mistake nahi thi. Scary part ye tha ki mistake normal lag rahi thi.",
    "Phir usne guessing band ki aur honestly dekha ki actual me ho kya raha hai.",
    "Ek simple rule ne sab change kar diya: bina reason ke koi decision nahi.",
    "Woh overnight win nahi hua, but blindly lose karna band ho gaya.",
    twist + " Save karo before next money decision.",
  ];

  const hindi = [
    hook,
    "शुरू में ये फैसला समझदारी वाला लगा, लेकिन दबाव धीरे-धीरे शुरू हो गया।",
    "हर छोटा फैसला harmless लग रहा था, जब तक सारे नंबर एक साथ सामने नहीं आए।",
    "डराने वाली बात गलती नहीं थी। डराने वाली बात ये थी कि गलती normal लग रही थी।",
    "फिर उसने अंदाज़ा लगाना बंद किया और सच में देखा कि हो क्या रहा है।",
    "एक simple rule ने सब बदल दिया: बिना वजह कोई money decision नहीं।",
    "वह रातों-रात जीता नहीं, लेकिन blindly हारना बंद कर दिया।",
    twist + " अगले money decision से पहले इसे save कर लो।",
  ];

  let lines = english;
  if (language === "hi") lines = hindi;
  if (language === "hinglish") lines = hinglish;

  return { lines, visuals: { location, emotion, object } };
}

function createVideoPack(nicheName, language) {
  const niche = NICHES.find((n) => n.name === nicheName) || NICHES[0];
  const { lines, visuals } = generateHumanScript(niche, language);

  const scenes = lines.map((line, index) => {
    const start = index * SCENE_SECONDS;
    const end = start + SCENE_SECONDS;
    const time = "0:" + String(start).padStart(2, "0") + " - 0:" + String(end).padStart(2, "0");

    const imagePrompt = [
      "Vertical 9:16 image.",
      "Black stick figure character.",
      "Same character in every scene.",
      visuals.location + ".",
      visuals.object + ".",
      visuals.emotion + " emotion.",
      "2D cartoon finance style.",
      "Dark cinematic background.",
      "Clean composition.",
      "No text.",
    ].join(" ");

    const videoPrompt = makeMetaVideoPrompt(
      "Black stick figure interacts with " + visuals.object + " in " + visuals.location + ".",
      "Character looks " + visuals.emotion + "."
    );

    return {
      id: "scene-" + (index + 1),
      number: index + 1,
      time,
      voice: line,
      imagePrompt,
      videoPrompt,
    };
  });

  return {
    id: generateUniqueId(),
    niche: niche.name,
    accent: niche.accent,
    language,
    scenes,
    thumbnailPrompt: [
      "Viral finance thumbnail.",
      "Black stick figure shocked.",
      visuals.object + ".",
      "Dark background.",
      "Huge red falling graph.",
      "High contrast.",
      "2D finance cartoon style.",
      "No text.",
    ].join(" "),
    disclaimer: "Disclaimer: This video is for education and entertainment purposes only. This is not financial advice.",
    hashtags: niche.hashtags,
    title: niche.name + " Story | Realistic Money Lesson",
    generatedAt: new Date().toLocaleTimeString(),
  };
}

function runSelfTests(pack) {
  return [
    { name: "Creates exactly 8 scenes", pass: pack.scenes.length === TOTAL_SCENES },
    { name: "Every scene has a voiceover", pass: pack.scenes.every((scene) => scene.voice.length > 10) },
    { name: "Every scene has an image prompt", pass: pack.scenes.every((scene) => scene.imagePrompt.includes("Vertical 9:16 image")) },
    { name: "Every scene has a Meta AI video prompt", pass: pack.scenes.every((scene) => scene.videoPrompt.includes("5 second vertical video")) },
    { name: "Every video prompt avoids text", pass: pack.scenes.every((scene) => scene.videoPrompt.includes("No text")) },
    { name: "Every video prompt uses black stick character", pass: pack.scenes.every((scene) => scene.videoPrompt.includes("Black stick figure")) },
    { name: "Video duration equals 40 seconds", pass: TOTAL_SCENES * SCENE_SECONDS === VIDEO_SECONDS },
  ];
}

const UI = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, #1e293b 0, #020617 38%, #000 100%)",
    color: "white",
    padding: "22px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  wrap: {
    maxWidth: "1320px",
    margin: "0 auto",
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, rgba(250,204,21,0.22), rgba(15,23,42,0.98), rgba(34,211,238,0.14))",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "34px",
    padding: "34px",
    boxShadow: "0 28px 80px rgba(0,0,0,0.55)",
    marginBottom: "22px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(250,204,21,0.15)",
    border: "1px solid rgba(250,204,21,0.35)",
    color: "#fde68a",
    fontSize: "12px",
    fontWeight: 900,
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "clamp(34px, 6vw, 72px)",
    lineHeight: 1,
    margin: "18px 0 12px",
    fontWeight: 950,
    letterSpacing: "-2px",
  },
  sub: {
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: 1.65,
    maxWidth: "850px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px",
    marginTop: "26px",
  },
  stat: {
    background: "rgba(2,6,23,0.72)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "16px",
  },
  controls: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "22px",
  },
  glass: {
    background: "rgba(15,23,42,0.86)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  },
  label: {
    display: "block",
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "9px",
    fontWeight: 800,
  },
  select: {
    width: "100%",
    background: "#020617",
    border: "1px solid #334155",
    color: "white",
    borderRadius: "16px",
    padding: "14px",
    fontSize: "15px",
    outline: "none",
  },
  generate: {
    width: "100%",
    height: "100%",
    minHeight: "82px",
    border: "none",
    borderRadius: "24px",
    background: "linear-gradient(135deg, #facc15, #fb923c)",
    color: "#111827",
    fontSize: "18px",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 18px 40px rgba(250,204,21,0.28)",
  },
  section: {
    background: "rgba(15,23,42,0.82)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "28px",
    padding: "22px",
    marginBottom: "22px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  sectionTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  h2: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 950,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
    gap: "16px",
  },
  promptCard: {
    background: "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "18px",
  },
  copyBtn: {
    background: "white",
    color: "#020617",
    border: "none",
    borderRadius: "12px",
    padding: "10px 13px",
    fontSize: "13px",
    fontWeight: 900,
    cursor: "pointer",
  },
  small: {
    color: "#94a3b8",
    fontSize: "13px",
    margin: "4px 0 12px",
  },
  text: {
    color: "#dbeafe",
    whiteSpace: "pre-wrap",
    lineHeight: 1.65,
    fontSize: "15px",
  },
};

function getInitialPack() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createVideoPack(NICHES[0].name, "en");
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.scenes) || parsed.scenes.length !== TOTAL_SCENES) {
      return createVideoPack(NICHES[0].name, "en");
    }
    return parsed;
  } catch {
    return createVideoPack(NICHES[0].name, "en");
  }
}

export default function App() {
  const [pack, setPack] = useState(() => getInitialPack());
  const [language, setLanguage] = useState(pack.language || "en");
  const [niche, setNiche] = useState(pack.niche || NICHES[0].name);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pack));
  }, [pack]);

  function regenerate() {
    const newPack = createVideoPack(niche, language);
    setPack(newPack);
  }

  async function copyText(label, text) {
    try {
      await copySafeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      alert("Copy failed. Select the text and copy manually.");
    }
  }

  const scriptText = useMemo(() => {
    return pack.scenes.map((s) => s.time + " | Scene " + s.number + NL + s.voice).join(DOUBLE_NL);
  }, [pack]);

  const allVoiceovers = useMemo(() => pack.scenes.map((s) => s.voice).join(DOUBLE_NL), [pack]);
  const allImages = useMemo(() => pack.scenes.map((s) => s.imagePrompt).join(DOUBLE_NL), [pack]);
  const allVideos = useMemo(() => pack.scenes.map((s) => s.videoPrompt).join(DOUBLE_NL), [pack]);
  const tests = useMemo(() => runSelfTests(pack), [pack]);
  const allTestsPassed = tests.every((test) => test.pass);

  return (
    <div style={UI.page}>
      <div style={UI.wrap}>
        <header style={UI.hero}>
          <span style={UI.badge}>Meta AI Prompt Studio</span>
          <h1 style={UI.title}>Creative Finance Shorts Generator</h1>
          <p style={UI.sub}>
            Generate 40-second shorts with separate script, image prompts, Meta AI video prompts, thumbnail, disclaimer, and upload pack. Each scene is exactly 5 seconds.
          </p>

          <div style={UI.stats}>
            <Stat label="Video Length" value={VIDEO_SECONDS + " sec"} color="#facc15" />
            <Stat label="Scenes" value={TOTAL_SCENES} color="#22d3ee" />
            <Stat label="Each Scene" value={SCENE_SECONDS + " sec"} color="#34d399" />
            <Stat label="Saved After Reload" value="Yes" color="#a78bfa" />
          </div>
        </header>

        <section style={UI.controls}>
          <div style={UI.glass}>
            <label style={UI.label}>Choose Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} style={UI.select}>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          <div style={UI.glass}>
            <label style={UI.label}>Choose Niche</label>
            <select value={niche} onChange={(e) => setNiche(e.target.value)} style={UI.select}>
              {NICHES.map((n) => (
                <option key={n.name} value={n.name}>{n.name}</option>
              ))}
            </select>
          </div>

          <button style={UI.generate} onClick={regenerate} type="button">Generate Unique Video Pack</button>
        </section>

        <section style={UI.section}>
          <div style={UI.sectionTop}>
            <div>
              <h2 style={UI.h2}>{pack.title}</h2>
              <p style={UI.small}>Niche: {pack.niche} | Language: {pack.language} | Generated: {pack.generatedAt} | ID: {pack.id}</p>
            </div>
            <CopyButton copied={copied} label="Title" onClick={() => copyText("Title", pack.title)} />
          </div>
        </section>

        <Section title="Built-in Tests" copyLabel="Test Summary" copied={copied} onCopy={() => copyText("Test Summary", tests.map((t) => (t.pass ? "PASS: " : "FAIL: ") + t.name).join(NL))}>
          <div style={UI.grid}>
            {tests.map((test) => (
              <div key={test.name} style={UI.promptCard}>
                <h3 style={{ margin: 0, color: test.pass ? "#34d399" : "#fb7185", fontSize: 18 }}>{test.pass ? "PASS" : "FAIL"}</h3>
                <p style={UI.small}>{test.name}</p>
              </div>
            ))}
          </div>
          <p style={{ ...UI.small, color: allTestsPassed ? "#34d399" : "#fb7185", fontWeight: 900 }}>{allTestsPassed ? "All tests passed" : "Some tests failed"}</p>
        </Section>

        <Section title="Full 40-Second Script" copyLabel="Script" copied={copied} onCopy={() => copyText("Script", scriptText)}>
          <div style={UI.promptCard}>
            <p style={UI.text}>{scriptText}</p>
          </div>
        </Section>

        <Section title="Scene Voiceover Lines" copyLabel="All Voiceovers" copied={copied} onCopy={() => copyText("All Voiceovers", allVoiceovers)}>
          <div style={UI.grid}>
            {pack.scenes.map((scene) => (
              <PromptCard
                key={scene.id}
                title={"Scene " + scene.number + " Voiceover"}
                subtitle={scene.time}
                text={scene.voice}
                copied={copied}
                copyLabel={"Voice " + scene.number}
                onCopy={() => copyText("Voice " + scene.number, scene.voice)}
              />
            ))}
          </div>
        </Section>

        <Section title="Image Prompts" copyLabel="All Images" copied={copied} onCopy={() => copyText("All Images", allImages)}>
          <div style={UI.grid}>
            {pack.scenes.map((scene) => (
              <PromptCard
                key={scene.id + "image"}
                title={"Image Prompt " + scene.number}
                subtitle={scene.time + " | Text-to-Image"}
                text={scene.imagePrompt}
                copied={copied}
                copyLabel={"Image " + scene.number}
                onCopy={() => copyText("Image " + scene.number, scene.imagePrompt)}
              />
            ))}
          </div>
        </Section>

        <Section title="Meta AI Video Prompts" copyLabel="All Videos" copied={copied} onCopy={() => copyText("All Videos", allVideos)}>
          <div style={UI.grid}>
            {pack.scenes.map((scene) => (
              <PromptCard
                key={scene.id + "video"}
                title={"Video Prompt " + scene.number}
                subtitle={scene.time + " | Meta AI Friendly"}
                text={scene.videoPrompt}
                copied={copied}
                copyLabel={"Video " + scene.number}
                onCopy={() => copyText("Video " + scene.number, scene.videoPrompt)}
              />
            ))}
          </div>
        </Section>

        <section style={{ ...UI.grid, marginBottom: 22 }}>
          <MiniSection title="Thumbnail Prompt" text={pack.thumbnailPrompt} label="Thumbnail" copied={copied} onCopy={() => copyText("Thumbnail", pack.thumbnailPrompt)} />
          <MiniSection title="Disclaimer" text={pack.disclaimer} label="Disclaimer" copied={copied} onCopy={() => copyText("Disclaimer", pack.disclaimer)} />
          <MiniSection title="Hashtags" text={pack.hashtags} label="Hashtags" copied={copied} onCopy={() => copyText("Hashtags", pack.hashtags)} />
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={UI.stat}>
      <p style={{ color: "#94a3b8", margin: 0, fontSize: 13 }}>{label}</p>
      <p style={{ color, margin: "8px 0 0", fontSize: 28, fontWeight: 950 }}>{value}</p>
    </div>
  );
}

function Section({ title, copyLabel, copied, onCopy, children }) {
  return (
    <section style={UI.section}>
      <div style={UI.sectionTop}>
        <h2 style={UI.h2}>{title}</h2>
        <CopyButton copied={copied} label={copyLabel} onClick={onCopy} />
      </div>
      {children}
    </section>
  );
}

function PromptCard({ title, subtitle, text, copied, copyLabel, onCopy }) {
  return (
    <div style={UI.promptCard}>
      <div style={UI.sectionTop}>
        <div>
          <h3 style={{ margin: 0, color: "#67e8f9", fontSize: 18 }}>{title}</h3>
          <p style={UI.small}>{subtitle}</p>
        </div>
        <CopyButton copied={copied} label={copyLabel} onClick={onCopy} />
      </div>
      <p style={UI.text}>{text}</p>
    </div>
  );
}

function MiniSection({ title, text, label, copied, onCopy }) {
  return (
    <div style={UI.section}>
      <div style={UI.sectionTop}>
        <h2 style={UI.h2}>{title}</h2>
        <CopyButton copied={copied} label={label} onClick={onCopy} />
      </div>
      <p style={UI.text}>{text}</p>
    </div>
  );
}

function CopyButton({ label, copied, onClick }) {
  return (
    <button style={UI.copyBtn} onClick={onClick} type="button">
      {copied === label ? "Copied" : "Copy"}
    </button>
  );
}
