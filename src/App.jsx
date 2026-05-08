import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "finance_generator_meta_safe_v10";
const TOTAL_SCENES = 8;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hindi + English" },
];

const NICHES = [
  "Crypto Finance",
  "Business Stories",
  "Stock Market",
  "Debt & Credit",
  "Rich Mindset",
];

const hooks = {
  "Crypto Finance": [
    "He thought crypto would make him rich in one week.",
    "Everyone online said this coin was the future.",
    "One trade slowly became an obsession.",
  ],

  "Business Stories": [
    "Customers kept coming, but profit kept disappearing.",
    "Revenue was rising while his bank balance was dying.",
    "The shop looked busy, but the cash drawer stayed empty.",
  ],

  "Stock Market": [
    "The chart looked perfect until one red candle appeared.",
    "He confused luck with skill.",
    "He thought the market owed him profit.",
  ],

  "Debt & Credit": [
    "He used the credit card just one more time.",
    "Debt looked small until interest woke up.",
    "Minimum payments slowly became his lifestyle.",
  ],

  "Rich Mindset": [
    "He bought attention instead of assets.",
    "Everyone saw his lifestyle, nobody saw his empty savings.",
    "The flex looked expensive, but the lesson cost more.",
  ],
};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeImagePrompt(niche, scene) {
  const environments = [
    "dark bedroom",
    "rainy apartment",
    "neon office",
    "messy desk setup",
    "small business shop",
    "rooftop at night",
    "luxury office",
    "dark trading room",
  ];

  const lights = [
    "blue cinematic lighting",
    "red neon lighting",
    "warm golden lighting",
    "high contrast shadows",
    "dark finance atmosphere",
  ];

  const cameras = [
    "wide cinematic shot",
    "close-up perspective",
    "dramatic angle",
    "top-down perspective",
    "side camera view",
  ];

  return `
Vertical 9:16 cinematic finance illustration.

Same black stick figure character in every scene.
Round black head.
Thin black body.
Glowing white eyes.
2D cartoon finance style.

Environment:
${randomItem(environments)}

Lighting:
${randomItem(lights)}

Camera:
${randomItem(cameras)}

Scene:
${scene}

Ultra detailed finance atmosphere.
Dark cinematic mood.
No text.
No watermark.
`;
}

function makeVideoPrompt(scene) {
  return `
Vertical 9:16.
5 second video.
2D cartoon animation.

Same black stick figure character.

${scene}

Simple movement only.
Dark cinematic lighting.
No text.
No watermark.
`;
}

function createStory(niche, language) {
  const hook = randomItem(hooks[niche]);

  let script = [];

  if (language === "hi") {
    script = [
      hook,
      "शुरुआत में सब exciting लग रहा था।",
      "फिर धीरे-धीरे pressure बढ़ने लगा।",
      "हर छोटी गलती harmless लग रही थी।",
      "लेकिन साथ में वही dangerous बन गई।",
      "उसने finally रुककर problem समझी।",
      "एक simple rule ने सब बदल दिया।",
      "Save करो before next money decision.",
    ];
  } else if (language === "hinglish") {
    script = [
      hook,
      "Starting me sab exciting lag raha tha.",
      "Phir pressure slowly build hone laga.",
      "Har small decision harmless lag raha tha.",
      "But together, sab dangerous ban gaya.",
      "Usne finally stop kiya aur problem samjhi.",
      "Ek simple rule ne pura game change kar diya.",
      "Save karo before next money decision.",
    ];
  } else {
    script = [
      hook,
      "At first, everything felt exciting.",
      "Then the pressure slowly started building.",
      "Every small decision looked harmless.",
      "But together, the mistakes became dangerous.",
      "He finally stopped and studied the problem.",
      "One simple rule changed everything.",
      "Save this before your next money decision.",
    ];
  }

  const scenes = script.map((line, index) => ({
    number: index + 1,
    voice: line,
    imagePrompt: makeImagePrompt(niche, line),
    videoPrompt: makeVideoPrompt(line),
  }));

  return {
    niche,
    language,
    scenes,
    hashtags:
      "#Finance #Money #Investing #Business #Crypto #Shorts",
    thumbnail:
      "Same black stick figure guy shocked while giant red finance graph crashes behind him. Dark cinematic atmosphere. No text.",
  };
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left,#1e293b 0,#020617 45%,#000 100%)",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
  },

  wrap: {
    maxWidth: "1300px",
    margin: "0 auto",
  },

  hero: {
    background:
      "linear-gradient(135deg,rgba(250,204,21,0.2),rgba(15,23,42,0.95),rgba(34,211,238,0.15))",
    padding: "35px",
    borderRadius: "30px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "70px",
    fontWeight: "900",
    marginBottom: "10px",
  },

  controls: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  box: {
    background: "rgba(15,23,42,0.9)",
    padding: "20px",
    borderRadius: "20px",
  },

  select: {
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    background: "#020617",
    color: "white",
    border: "1px solid #334155",
  },

  button: {
    border: "none",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg,#facc15,#fb923c)",
    color: "black",
    fontWeight: "900",
    fontSize: "18px",
    cursor: "pointer",
  },

  section: {
    background: "rgba(15,23,42,0.9)",
    borderRadius: "24px",
    padding: "20px",
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "34px",
    fontWeight: "900",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "18px",
  },

  card: {
    background: "#020617",
    borderRadius: "20px",
    padding: "20px",
  },

  copy: {
    border: "none",
    background: "white",
    color: "black",
    padding: "10px 15px",
    borderRadius: "14px",
    fontWeight: "800",
    cursor: "pointer",
    marginBottom: "15px",
  },

  text: {
    lineHeight: "1.8",
    whiteSpace: "pre-wrap",
    color: "#dbeafe",
  },
};

export default function App() {
  const [language, setLanguage] = useState("en");
  const [niche, setNiche] = useState("Crypto Finance");

  const [story, setStory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return createStory("Crypto Finance", "en");
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(story)
    );
  }, [story]);

  function generate() {
    setStory(createStory(niche, language));
  }

  async function copy(text) {
    await navigator.clipboard.writeText(text);
  }

  const scriptText = useMemo(() => {
    return story.scenes
      .map(
        (scene, i) =>
          `Scene ${i + 1}\n${scene.voice}`
      )
      .join("\n\n");
  }, [story]);

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.hero}>
          <div style={styles.title}>
            Finance Shorts Generator
          </div>

          <p>
            AI Finance Video Pipeline with
            cinematic prompts and Meta-safe
            videos.
          </p>
        </div>

        <div style={styles.controls}>
          <div style={styles.box}>
            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              style={styles.select}
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                >
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.box}>
            <select
              value={niche}
              onChange={(e) =>
                setNiche(e.target.value)
              }
              style={styles.select}
            >
              {NICHES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            style={styles.button}
            onClick={generate}
          >
            Generate Story
          </button>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Script
          </div>

          <button
            style={styles.copy}
            onClick={() => copy(scriptText)}
          >
            Copy Script
          </button>

          <div style={styles.text}>
            {scriptText}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Image Prompts
          </div>

          <div style={styles.grid}>
            {story.scenes.map((scene) => (
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
            Video Prompts
          </div>

          <div style={styles.grid}>
            {story.scenes.map((scene) => (
              <div
                key={scene.number + "video"}
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
      </div>
    </div>
  );
}
