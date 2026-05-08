import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const STORAGE_KEY = "finance_generator_ultra_v2";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hindi + English" },
];

const NICHES = [
  {
    name: "Crypto Finance",
    hashtags:
      "#Crypto #Bitcoin #Finance #Money #Investing #Trading #Shorts",
    hooks: [
      "He thought crypto would make him rich in one week.",
      "One green candle changed his entire mood.",
      "Everyone online said this coin was the future.",
      "He ignored every warning because the chart looked perfect.",
      "One trade slowly became an obsession.",
    ],
    twists: [
      "FOMO destroys more wallets than bad coins.",
      "The market was never the real enemy. Emotion was.",
      "He stopped gambling and finally started thinking.",
      "Patience beats panic in every market.",
    ],
  },

  {
    name: "Business Stories",
    hashtags:
      "#Business #Entrepreneur #Startup #Money #Success #Finance #Shorts",
    hooks: [
      "His business looked successful from outside.",
      "Customers kept coming, but profit kept disappearing.",
      "Revenue was rising while his bank balance was dying.",
      "The shop looked busy, but the cash drawer stayed empty.",
      "He worked every day but still felt broke.",
    ],
    twists: [
      "Revenue is loud. Profit is silent.",
      "Cashflow is the heartbeat of every business.",
      "A business dies slowly through invisible mistakes.",
      "Small leaks destroy big businesses.",
    ],
  },
];

const IMAGE_PROMPTS = {
  "Crypto Finance": [
    "Vertical 9:16 cinematic finance illustration. Same black stick figure guy with round black head, thin black body, glowing white eyes, and simple cartoon facial expression standing inside a dark messy bedroom at night. He is holding a smartphone extremely close to his face while a bright green crypto chart glows intensely on the screen. Blue light from the phone reflects across his face and body. Background contains blurry laptop setup, dark walls, faint red LED lights, floating digital coin symbols, and subtle market graph shapes. Emotional shocked expression, tense atmosphere, dramatic shadows, high contrast lighting, cinematic composition, detailed environment, finance thriller mood, 2D cartoon style mixed with modern digital illustration, ultra clean composition, dark aesthetic, no text, no watermark.",

    "Vertical 9:16 cinematic finance artwork. Same black stick figure guy sitting at a messy trading desk filled with energy drink cans, notebook papers, glowing laptop, and crypto charts. The laptop screen displays large green and red candlestick patterns illuminating the room with neon colors. Small floating digital coin icons and graph particles appear around the desk. The character has nervous glowing white eyes and tense body posture while staring at the market. Dark room environment with cinematic blue and red lighting, soft shadows, ultra detailed finance atmosphere, modern cartoon illustration, emotional storytelling composition, high contrast, dramatic perspective, no text, no watermark.",

    "Vertical 9:16 dramatic finance scene. Same black stick figure guy staring at a smartphone while a giant red crypto market crash reflects across the dark room. Red graph candles dominate the screen and create a strong red glow around the environment. The character looks panicked with wide glowing eyes and tense posture. Floating broken graph symbols, falling digital coin icons, and blurred market numbers fill the background. Dark cinematic finance thriller atmosphere, ultra detailed shadows, emotional tension, modern 2D cartoon illustration style, highly cinematic composition, high contrast lighting, no text, no watermark.",

    "Vertical 9:16 emotional finance illustration. Same black stick figure guy sitting silently beside a rainy apartment window at night while holding a phone with disappearing group chat notifications. Neon city lights glow outside the glass window in blue and purple tones. Floating transparent chat bubbles fade into darkness around him. Lonely emotional atmosphere, cinematic lighting, detailed reflections on the floor, subtle market chart shapes in background, modern digital cartoon illustration, dramatic storytelling mood, ultra clean composition, no text, no watermark.",

    "Vertical 9:16 cinematic productivity finance artwork. Same black stick figure guy sitting calmly at a clean desk while writing risk management rules inside a notebook beside a glowing laptop displaying crypto charts. Warm yellow desk lamp creates soft shadows across the room. Organized environment, focused emotion, digital graph particles floating around the scene, ultra detailed modern finance atmosphere, dark cinematic color palette, high contrast lighting, emotional storytelling composition, 2D cartoon illustration mixed with digital art style, no text, no watermark.",

    "Vertical 9:16 cinematic finance recovery illustration. Same black stick figure guy peacefully closing his laptop after avoiding emotional trading decisions. Calm blue ambient lighting fills the dark room while crypto chart reflections slowly fade away in the background. Relaxed posture, relieved expression with glowing white eyes, clean desk environment, cinematic shadows, ultra detailed digital finance atmosphere, emotional storytelling, modern cartoon illustration style, dramatic lighting, no text, no watermark.",

    "Vertical 9:16 dramatic finance transformation artwork. Same black stick figure guy walking alone through a dark neon street while floating crypto coin symbols disappear behind him into digital particles. Strong confident body posture, emotional redemption atmosphere, cinematic blue and red city lights, rain reflections on road surface, blurred finance graph shapes in background, ultra detailed environment, high contrast lighting, modern digital cartoon illustration, emotional cinematic storytelling, no text, no watermark.",

    "Vertical 9:16 cinematic ending finance illustration. Same black stick figure guy standing still and calm while a giant red market chart slowly crashes behind him. Dark finance environment with dramatic red glow and subtle smoke effects. The character remains emotionally calm and confident despite the chaos behind him. Floating market symbols, ultra detailed shadows, high contrast cinematic lighting, emotional finance thriller mood, modern digital cartoon illustration, dramatic storytelling composition, no text, no watermark.",
  ],

  "Business Stories": [
    "Vertical 9:16 cinematic business illustration. Same black stick figure guy standing inside a small crowded business shop with shelves, boxes, products, and warm hanging lights. Customers appear as blurry silhouettes moving in the background. The character looks thoughtful while staring at the cash counter. Warm orange and dark blue cinematic lighting, ultra detailed small business atmosphere, emotional storytelling composition, 2D cartoon illustration mixed with modern digital painting style, no text, no watermark.",

    "Vertical 9:16 dramatic business finance artwork. Same black stick figure guy opening a nearly empty cash drawer behind a small shop counter. Receipt papers, scattered bills, delivery boxes, and calculator visible around him. Shocked glowing white eyes, emotional stress atmosphere, warm shop lighting mixed with dark shadows, cinematic composition, ultra detailed small business environment, emotional storytelling mood, modern digital cartoon illustration, no text, no watermark.",

    "Vertical 9:16 emotional business illustration. Same black stick figure guy counting small stacks of bills beside huge delivery boxes piled around the shop. The environment looks busy but financially stressful. Warm evening lighting enters through shop window while dark shadows cover half the room. Floating finance graph particles subtly visible in background. Ultra detailed business atmosphere, emotional storytelling, modern cartoon finance art style, cinematic composition, no text, no watermark.",

    "Vertical 9:16 cinematic finance stress artwork. Same black stick figure guy sitting at a cluttered desk while checking an expense notebook beside a calculator and laptop. The room is dimly lit with dramatic yellow light and deep shadows. Financial pressure visible through tense posture and glowing worried eyes. Papers scattered everywhere. Ultra detailed cinematic business environment, emotional storytelling composition, modern digital cartoon illustration, no text, no watermark.",

    "Vertical 9:16 cinematic business decision illustration. Same black stick figure guy crossing out a bad discount offer written on paper while standing near the shop wall. Strong determined body posture, focused glowing eyes, warm lighting mixed with dark cinematic shadows. Product shelves and small sale banners visible in background. Ultra detailed business environment, emotional storytelling mood, modern digital cartoon art style, no text, no watermark.",

    "Vertical 9:16 hopeful finance business artwork. Same black stick figure guy smiling slightly while checking a positive rising cashflow graph on his laptop inside the shop. Organized counter with notebook, calculator, and bills neatly placed. Warm golden cinematic lighting creates dramatic atmosphere. Emotional success mood, ultra detailed business environment, modern digital finance illustration, high contrast shadows, no text, no watermark.",

    "Vertical 9:16 satisfying business organization illustration. Same black stick figure guy arranging stock boxes, notebooks, bills, and products neatly inside the shop. Clean organized environment with soft warm lights and subtle financial graph shapes in background. Relieved emotional mood, cinematic composition, ultra detailed business storytelling atmosphere, modern cartoon illustration style, no text, no watermark.",

    "Vertical 9:16 cinematic business ending artwork. Same black stick figure guy confidently locking the shop cash drawer at closing time while warm golden lights illuminate the environment. Dark city visible outside the shop window. Calm successful emotion, dramatic cinematic lighting, ultra detailed business atmosphere, emotional storytelling composition, modern digital cartoon illustration style, no text, no watermark.",
  ],
};

const VIDEO_PROMPTS = {
  "Crypto Finance": [
    "5 second vertical video. Same black stick figure guy holding glowing crypto phone while camera slowly zooms in. Green crypto chart moving on screen. Dark cinematic bedroom. Blue neon lighting. Finance thriller mood. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy sitting at messy trading desk with glowing laptop charts. Camera slowly pans sideways. Floating digital coin particles. Dark cinematic finance atmosphere. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy reacting emotionally while red market chart crashes on phone. Slight camera shake. Red lighting fills room. Dramatic finance atmosphere. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy sitting silently beside rainy window checking disappearing notifications on phone. Neon city lights outside. Emotional cinematic movement. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy writing risk management rules in notebook beside glowing laptop. Warm desk lamp lighting. Slow cinematic top camera movement. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy closing laptop calmly and relaxing in chair. Crypto charts slowly fading in background. Dark blue cinematic lighting. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy walking confidently through neon street while floating crypto symbols disappear behind him. Slow tracking shot. Dramatic finance atmosphere. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy standing calmly while giant red market graph crashes behind him. Dramatic zoom shot. High contrast finance thriller mood. No text. No watermark.",
  ],

  "Business Stories": [
    "5 second vertical video. Same black stick figure guy standing inside crowded business shop. Customers moving behind him. Warm cinematic lights. Slow zoom in. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy opening nearly empty cash drawer. Dramatic reaction. Warm shop lights with dark shadows. Slow camera movement. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy counting bills beside stacked delivery boxes. Busy business atmosphere. Cinematic lighting. Slow side camera movement. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy stressed while checking expense notebook beside calculator. Dramatic yellow lighting. Emotional finance atmosphere. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy crossing out bad business offer on paper. Determined emotion. Warm cinematic lighting. Slow zoom shot. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy smiling while checking rising cashflow graph on laptop. Golden lighting. Positive business atmosphere. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy organizing products, bills, and stock neatly. Relaxed emotional atmosphere. Warm cinematic shop environment. No text. No watermark.",
    "5 second vertical video. Same black stick figure guy locking cash drawer confidently at closing time. Golden lighting. Cinematic ending shot. No text. No watermark.",
  ],
};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createStory(nicheName, language) {
  const niche =
    NICHES.find((n) => n.name === nicheName) || NICHES[0];

  const hook = randomItem(niche.hooks);
  const twist = randomItem(niche.twists);

  let script = [];

  if (language === "hinglish") {
    script = [
      hook,
      "Starting me sab exciting lag raha tha.",
      "Phir pressure slowly build hone laga.",
      "Har small decision harmless lag raha tha.",
      "But together, sab dangerous ban gaya.",
      "Usne finally stop kiya aur honestly problem samjhi.",
      "Ek simple rule ne pura game change kar diya.",
      twist + " Save karo before next money decision.",
    ];
  } else if (language === "hi") {
    script = [
      hook,
      "शुरुआत में सब exciting लग रहा था।",
      "फिर धीरे-धीरे pressure बढ़ने लगा।",
      "हर छोटी गलती harmless लग रही थी।",
      "लेकिन साथ में वही dangerous बन गई।",
      "उसने finally रुककर problem को समझा।",
      "एक simple rule ने सब बदल दिया।",
      twist + " अगले money decision से पहले save कर लो।",
    ];
  } else {
    script = [
      hook,
      "At first, everything felt exciting and safe.",
      "Then the pressure slowly started building.",
      "Every small decision looked harmless alone.",
      "But together, the mistakes became dangerous.",
      "He finally stopped and honestly studied the problem.",
      "One simple rule changed everything.",
      twist + " Save this before your next money decision.",
    ];
  }

  const scenes = script.map((line, index) => ({
    number: index + 1,
    time: `0:${String(index * 5).padStart(2, "0")} - 0:${String(
      index * 5 + 5
    ).padStart(2, "0")}`,
    voice: line,
    imagePrompt:
      IMAGE_PROMPTS[niche.name][index],
    videoPrompt:
      VIDEO_PROMPTS[niche.name][index],
  }));

  return {
    title: niche.name + " Viral Story",
    scenes,
    hashtags: niche.hashtags,
    disclaimer:
      "Disclaimer: This content is for educational and entertainment purposes only. Not financial advice.",
    thumbnail:
      "Same black stick figure guy shocked while giant red finance graph crashes behind him. Dark cinematic finance atmosphere. High contrast lighting. Ultra dramatic thumbnail composition. No text.",
  };
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left,#1e293b 0,#020617 40%,#000 100%)",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
  },

  wrap: {
    maxWidth: "1300px",
    margin: "0 auto",
  },

  hero: {
    background: "rgba(15,23,42,0.9)",
    padding: "30px",
    borderRadius: "24px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  title: {
    fontSize: "60px",
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
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
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
    minHeight: "70px",
    border: "none",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg,#facc15,#fb923c)",
    color: "#111827",
    fontWeight: "900",
    fontSize: "18px",
    cursor: "pointer",
  },

  section: {
    background: "rgba(15,23,42,0.9)",
    borderRadius: "24px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
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
    border: "1px solid rgba(255,255,255,0.08)",
  },

  copy: {
    border: "none",
    background: "white",
    color: "black",
    padding: "10px 15px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "20px",
  },

  text: {
    lineHeight: "1.8",
    color: "#dbeafe",
    whiteSpace: "pre-wrap",
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

  const fullScript = useMemo(() => {
    return story.scenes
      .map(
        (scene) =>
          `${scene.time}\n${scene.voice}`
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
            8 Scenes × 5 Seconds = Exact
            40-Second Video
          </p>
        </div>

        <div style={styles.controls}>
          <div style={styles.box}>
            <label style={styles.label}>
              Language
            </label>

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
            <label style={styles.label}>
              Niche
            </label>

            <select
              value={niche}
              onChange={(e) =>
                setNiche(e.target.value)
              }
              style={styles.select}
            >
              {NICHES.map((n) => (
                <option
                  key={n.name}
                  value={n.name}
                >
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          <button
            style={styles.button}
            onClick={generate}
          >
            Generate Viral Story
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
            onClick={() =>
              copy(story.thumbnail)
            }
          >
            Copy Thumbnail
          </button>

          <div style={styles.text}>
            {story.thumbnail}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Disclaimer
          </div>

          <div style={styles.text}>
            {story.disclaimer}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Hashtags
          </div>

          <div style={styles.text}>
            {story.hashtags}
          </div>
        </div>
      </div>
    </div>
  );
}
