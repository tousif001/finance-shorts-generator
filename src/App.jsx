import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const STORAGE_KEY = "finance_meta_ai_generator_final_v1";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hindi + English" },
];

const NICHES = [
  {
    name: "Crypto Finance",
    accent: "#22d3ee",
    hashtags:
      "#Crypto #CryptoEducation #Finance #MoneyTips #RiskManagement #Shorts",
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
  },
  {
    name: "Business Stories",
    accent: "#f59e0b",
    hashtags:
      "#Business #Startup #Entrepreneurship #MoneyLessons #Cashflow #Shorts",
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
  },
];

const VIDEO_PROMPTS = {
  "Crypto Finance": [
    "Black stick figure checking glowing crypto chart on phone in dark bedroom. Slow camera zoom. Red and green chart lights flicker.",
    "Black stick figure trading on laptop at messy desk. Camera slowly moves left. Laptop graph flashes green.",
    "Black stick figure shocked while crypto chart crashes red. Slight camera shake. Dark cinematic lighting.",
    "Black stick figure staring at disappearing chat notifications on phone. Night city background.",
    "Black stick figure writing risk management rules in notebook beside laptop.",
    "Black stick figure calmly closing laptop after avoiding bad trade.",
    "Black stick figure walking away from floating crypto coin symbols in dark street.",
    "Black stick figure standing calmly while red market chart stops falling behind him.",
  ],

  "Business Stories": [
    "Black stick figure standing inside small busy shop. Warm cinematic lights.",
    "Black stick figure opening cash drawer and finding very little money.",
    "Black stick figure counting bills beside delivery boxes.",
    "Black stick figure stressed while checking business expenses notebook.",
    "Black stick figure crossing out bad business offer on paper.",
    "Black stick figure checking positive cashflow on laptop.",
    "Black stick figure organizing money and inventory neatly.",
    "Black stick figure confidently locking shop cash drawer at closing time.",
  ],
};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateScript(niche, language) {
  const hook = randomItem(niche.hooks);
  const twist = randomItem(niche.twists);

  const english = [
    hook,
    "At first, everything felt safe and exciting.",
    "Then the pressure started slowly without him noticing.",
    "Every small mistake looked harmless alone.",
    "But together, the mistakes became dangerous.",
    "He finally stopped guessing and studied the problem properly.",
    "One simple rule changed everything for him.",
    twist + " Save this before your next money decision.",
  ];

  const hinglish = [
    hook,
    "Starting me sab safe aur exciting lag raha tha.",
    "Phir pressure quietly start hone laga.",
    "Har chhoti mistake alone harmless lag rahi thi.",
    "But together, sab dangerous ban gaya.",
    "Usne finally guessing band ki aur properly problem samjhi.",
    "Ek simple rule ne sab change kar diya.",
    twist + " Save karo before next money decision.",
  ];

  const hindi = [
    hook,
    "शुरुआत में सब कुछ safe और exciting लग रहा था।",
    "फिर धीरे-धीरे pressure बढ़ने लगा।",
    "हर छोटी गलती अकेले harmless लग रही थी।",
    "लेकिन साथ में वही dangerous बन गई।",
    "उसने finally अंदाज़ा लगाना बंद किया और problem समझी।",
    "एक simple rule ने सब बदल दिया।",
    twist + " अगले money decision से पहले इसे save कर लो।",
  ];

  if (language === "hi") return hindi;
  if (language === "hinglish") return hinglish;

  return english;
}

function createPack(nicheName, language) {
  const niche =
    NICHES.find((item) => item.name === nicheName) || NICHES[0];

  const lines = generateScript(niche, language);

  const scenes = lines.map((line, index) => {
    const start = index * SCENE_SECONDS;
    const end = start + SCENE_SECONDS;

    return {
      number: index + 1,
      time:
        "0:" +
        String(start).padStart(2, "0") +
        " - 0:" +
        String(end).padStart(2, "0"),
      voice: line,
      imagePrompt:
        "Vertical 9:16 image. Black stick figure character. Same character in every scene. Dark cinematic finance environment. 2D cartoon style. No text.",
      videoPrompt:
        VIDEO_PROMPTS[niche.name][index] +
        " Same black stick figure in every scene. 5 second vertical video. No text. No watermark.",
    };
  });

  return {
    title: niche.name + " Story",
    language,
    niche: niche.name,
    scenes,
    hashtags: niche.hashtags,
    disclaimer:
      "Disclaimer: This video is for educational and entertainment purposes only. Not financial advice.",
    thumbnail:
      "Black stick figure shocked while huge red finance graph crashes behind him. Dark cinematic thumbnail. High contrast.",
  };
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #1e293b 0, #020617 40%, #000 100%)",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  hero: {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "30px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "56px",
    fontWeight: "900",
    marginBottom: "10px",
  },

  controls: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  box: {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "20px",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    color: "#94a3b8",
    fontWeight: "700",
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

  button: {
    width: "100%",
    border: "none",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#facc15,#fb923c)",
    color: "#111827",
    fontWeight: "900",
    fontSize: "18px",
    cursor: "pointer",
    minHeight: "70px",
  },

  section: {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "20px",
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "900",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "15px",
  },

  card: {
    background: "#020617",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    padding: "18px",
  },

  copy: {
    border: "none",
    background: "white",
    color: "black",
    padding: "10px 14px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "15px",
  },

  text: {
    lineHeight: "1.7",
    color: "#dbeafe",
    whiteSpace: "pre-wrap",
  },
};

export default function App() {
  const [language, setLanguage] = useState("en");
  const [niche, setNiche] = useState("Crypto Finance");

  const [pack, setPack] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return createPack("Crypto Finance", "en");
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pack));
  }, [pack]);

  function generate() {
    setPack(createPack(niche, language));
  }

  async function copy(text) {
    await navigator.clipboard.writeText(text);
  }

  const fullScript = useMemo(() => {
    return pack.scenes
      .map((scene) => `${scene.time}\n${scene.voice}`)
      .join("\n\n");
  }, [pack]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.title}>
            Finance Shorts Generator
          </div>

          <p>
            8 Scenes × 5 Seconds = Exact 40 Second Video
          </p>
        </div>

        <div style={styles.controls}>
          <div style={styles.box}>
            <label style={styles.label}>Language</label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.select}
            >
              {LANGUAGES.map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.box}>
            <label style={styles.label}>Niche</label>

            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              style={styles.select}
            >
              {NICHES.map((item) => (
                <option
                  key={item.name}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button
            style={styles.button}
            onClick={generate}
          >
            Generate Unique Video
          </button>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Full Script
          </div>

          <button
            style={styles.copy}
            onClick={() => copy(fullScript)}
          >
            Copy Script
          </button>

          <div style={styles.text}>
            {fullScript}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Image Prompts
          </div>

          <div style={styles.grid}>
            {pack.scenes.map((scene) => (
              <div
                key={scene.number}
                style={styles.card}
              >
                <button
                  style={styles.copy}
                  onClick={() =>
                    copy(scene.imagePrompt)
                  }
                >
                  Copy
                </button>

                <div style={styles.text}>
                  {scene.imagePrompt}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Meta AI Video Prompts
          </div>

          <div style={styles.grid}>
            {pack.scenes.map((scene) => (
              <div
                key={scene.number + "-video"}
                style={styles.card}
              >
                <button
                  style={styles.copy}
                  onClick={() =>
                    copy(scene.videoPrompt)
                  }
                >
                  Copy
                </button>

                <div style={styles.text}>
                  {scene.videoPrompt}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Thumbnail Prompt
          </div>

          <button
            style={styles.copy}
            onClick={() => copy(pack.thumbnail)}
          >
            Copy Thumbnail Prompt
          </button>

          <div style={styles.text}>
            {pack.thumbnail}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Disclaimer
          </div>

          <div style={styles.text}>
            {pack.disclaimer}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Hashtags
          </div>

          <div style={styles.text}>
            {pack.hashtags}
          </div>
        </div>
      </div>
    </div>
  );
}
