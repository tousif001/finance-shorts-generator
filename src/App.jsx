import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = VIDEO_SECONDS / SCENE_SECONDS;
const NL = String.fromCharCode(10);
const DOUBLE_NL = NL + NL;

const CHANNEL_STYLES = [
  "dark cinematic finance thriller",
  "viral money mystery story",
  "Indian middle-class finance story",
  "clean 2D cartoon finance explainer",
  "dramatic black stick-figure money story",
];

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

const USED_VIDEO_IDS_KEY = "finance_used_video_ids";

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

const EMOTIONS = [
  "shocked",
  "stressed",
  "confused",
  "hopeful",
  "focused",
  "fearful",
  "motivated",
  "regretful",
  "determined",
  "emotionless",
];

const MONEY_OBJECTS = [
  "coins",
  "credit cards",
  "falling money",
  "salary notification",
  "investment graph",
  "shopping bags",
  "EMI papers",
  "subscription icons",
  "bank alerts",
  "wallet",
];

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

function generateUniqueId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getUsedVideoIds() {
  try {
    const stored = localStorage.getItem(USED_VIDEO_IDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsedVideoId(id) {
  try {
    const used = getUsedVideoIds();
    used.push(id);
    localStorage.setItem(USED_VIDEO_IDS_KEY, JSON.stringify(used.slice(-5000)));
  } catch {
    console.log("Storage unavailable");
  }
}

function uniquePick(list, usedSet) {
  const available = list.filter((item) => !usedSet.has(item));
  if (available.length === 0) {
    return list[Math.floor(Math.random() * list.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

function createFinanceShort(style) {
  const usedIds = new Set(getUsedVideoIds());

  const topic = randomItem(TOPICS);
  const structure = uniquePick(STORY_STRUCTURES, usedIds);
  const location = uniquePick(LOCATIONS, usedIds);
  const emotion = uniquePick(EMOTIONS, usedIds);
  const moneyObject = uniquePick(MONEY_OBJECTS, usedIds);

  const uniqueVideoId = [
    topic.title,
    structure,
    location,
    emotion,
    moneyObject,
    generateUniqueId(),
  ].join("-");

  saveUsedVideoId(uniqueVideoId);

  const scriptLines = [
    {
      time: "0:00 - 0:05",
      beat: "Hook",
      voice: topic.hook + " Most people notice it only when the account is almost empty.",
      image: makePrompt([
        "Vertical 9:16 finance short opening scene",
        style,
        CHARACTER_LOCK,
        "black stick-figure character staring at phone showing low bank balance",
        location,
        emotion + " emotion",
        moneyObject + " visual theme",
        "dark room",
        "glowing phone light",
        "shocked white eyes",
        "dramatic shadows",
        "no text",
        "no logos",
      ]),
      video: makeSceneVideo("Slow push-in on the black stick character. Phone glow increases. Character freezes in shock. Add subtle money smoke in background."),
    },
    {
      time: "0:05 - 0:10",
      beat: "Salary Moment",
      voice: "Salary comes in. For one day, everything feels safe. Then the spending starts quietly.",
      image: makePrompt([
        "Vertical 9:16 finance short scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character holding phone with salary credited notification glow",
        "simple apartment background",
        "hopeful mood",
        "no text",
        "no logos",
      ]),
      video: makeSceneVideo("Notification glow pulses on phone. Character posture changes from happy to unsure. Background slightly zooms."),
    },
    {
      time: "0:10 - 0:15",
      beat: "Money Leak",
      voice: "Food orders, subscriptions, shopping, small EMIs... none look dangerous alone.",
      image: makePrompt([
        "Vertical 9:16 finance short scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character surrounded by food boxes, shopping bags, subscription icons",
        "coins leaking from wallet",
        "no brand logos",
        "no text",
      ]),
      video: makeSceneVideo("Objects slowly orbit around character. Coins fall from wallet one by one. Character looks confused."),
    },
    {
      time: "0:15 - 0:20",
      beat: "Trap Reveal",
      voice: "But together, they become a hole in your pocket that never stops growing.",
      image: makePrompt([
        "Vertical 9:16 dramatic finance scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character standing over a black hole shaped like a wallet",
        "money falling into it",
        "dark cinematic background",
        "no text",
      ]),
      video: makeSceneVideo("Camera tilts down toward wallet hole. Money falls into darkness. Character steps back in fear."),
    },
    {
      time: "0:20 - 0:25",
      beat: "Realization",
      voice: "He thought he needed more income. The truth was, he needed a money system.",
      image: makePrompt([
        "Vertical 9:16 emotional finance scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character sitting at table with notebook, calculator, phone, expense list symbols",
        "warm lamp light",
        "no text",
      ]),
      video: makeSceneVideo("Character writes in notebook. Calculator buttons tap. Warm light flickers softly. Focus pull from phone to notebook."),
    },
    {
      time: "0:25 - 0:30",
      beat: "Simple Fix",
      voice: "So he tracked seven days of spending and found three silent leaks instantly.",
      image: makePrompt([
        "Vertical 9:16 finance improvement scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character pointing at notebook with three circled expense leaks",
        "clean desk",
        "focused mood",
        "no readable text",
        "no logos",
      ]),
      video: makeSceneVideo("Three circles appear as simple shapes on notebook. Character points at them. Camera pushes in. No readable text."),
    },
    {
      time: "0:30 - 0:35",
      beat: "Transformation",
      voice: "He did not become rich overnight. But for the first time, his money stopped disappearing.",
      image: makePrompt([
        "Vertical 9:16 transformation finance scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character calmly looking at rising simple graph on laptop",
        "clean room",
        "hopeful lighting",
        "no text",
      ]),
      video: makeSceneVideo("Simple graph rises slowly on laptop. Character smiles with simple white mouth. Lighting becomes brighter."),
    },
    {
      time: "0:35 - 0:40",
      beat: "Twist + CTA",
      voice: topic.twist + " Follow for more simple money stories.",
      image: makePrompt([
        "Vertical 9:16 powerful ending scene",
        style,
        CHARACTER_LOCK,
        "same black stick-figure character standing on rooftop at sunrise",
        "city skyline",
        "money discipline theme",
        "cinematic hopeful ending",
        "no text",
      ]),
      video: makeSceneVideo("Slow crane-up from character to sunrise skyline. Character stands confidently. End with clean still frame."),
    },
  ];

  const script = scriptLines
    .map((scene, index) => scene.time + " - Scene " + (index + 1) + ": " + scene.beat + NL + scene.voice)
    .join(DOUBLE_NL);

  const imagePrompts = scriptLines.map((scene) => scene.image);

  const videoPrompts = scriptLines.map((scene, index) => {
    return [
      "Scene " + (index + 1) + " | " + scene.time + " | " + scene.beat,
      scene.video,
      "Character rule: " + CHARACTER_LOCK,
    ].join(NL);
  });

  const thumbnailPrompt = makePrompt([
    "Viral finance YouTube Shorts thumbnail",
    style,
    CHARACTER_LOCK,
    "same black stick-figure character shocked while holding phone",
    "huge falling red graph behind character",
    "money flying away",
    "dark background",
    "high contrast",
    "dramatic emotion",
    "curiosity gap",
    "clean composition",
    "no watermark",
    "no logos",
    "no extra characters",
    "vertical 9:16",
  ]);

  const disclaimerPrompt = makePrompt([
    "Finance disclaimer screen prompt",
    "vertical 9:16",
    "black background",
    "subtle money icons",
    "clean yellow warning symbol",
    "professional finance documentary style",
    "space for disclaimer caption",
    "no logos",
    "no brand names",
    "simple cinematic look",
  ]);

  const disclaimerText = "Disclaimer: This video is for education and entertainment only. It is not financial advice. Always do your own research before making money decisions.";

  const uploadPack = {
    title: topic.title + " | 40 Second Money Story",
    description: topic.lesson + DOUBLE_NL + disclaimerText,
    hashtags: "#Finance #MoneyTips #PersonalFinance #MoneyStory #MoneyMindset #Shorts #FinancialEducation",
    videoLength: VIDEO_SECONDS + " seconds",
    sceneFormat: TOTAL_SCENES + " scenes x " + SCENE_SECONDS + " seconds each",
  };

  const editPlan = [
    "Total video length must be exactly 40 seconds.",
    "Use 8 image scenes only. Convert each image into exactly 5 seconds of video.",
    "Voiceover should fit each 5-second scene line.",
    "Keep subtitles fast and short. Do not add long paragraphs on screen.",
    "Add disclaimer in description, not inside the 40-second video unless required.",
    "Use thumbnail separately. Do not include thumbnail inside video timeline.",
  ];

  return {
    uniqueVideoId,
    generatedAt: new Date().toLocaleTimeString(),
    topic,
    scriptLines,
    script,
    imagePrompts,
    videoPrompts,
    thumbnailPrompt,
    disclaimerPrompt,
    disclaimerText,
    uploadPack,
    editPlan,
  };
}

function runSelfTests(pack) {
  return [
    {
      name: "Generates exactly 8 scenes",
      pass: pack.scriptLines.length === TOTAL_SCENES,
    },
    {
      name: "Generates exactly 8 image prompts",
      pass: pack.imagePrompts.length === TOTAL_SCENES,
    },
    {
      name: "Generates exactly 8 video prompts",
      pass: pack.videoPrompts.length === TOTAL_SCENES,
    },
    {
      name: "Each video prompt says EXACTLY 5 seconds",
      pass: pack.videoPrompts.every((prompt) => prompt.includes("EXACTLY 5 seconds")),
    },
    {
      name: "All image prompts include black stick-figure character lock",
      pass: pack.imagePrompts.every((prompt) => prompt.includes("black stick-figure")),
    },
    {
      name: "Upload pack says 40 seconds",
      pass: pack.uploadPack.videoLength === "40 seconds",
    },
  ];
}

export default function App() {
  const [style, setStyle] = useState(CHANNEL_STYLES[0]);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [pack, setPack] = useState(() => createFinanceShort(CHANNEL_STYLES[0]));
  const [copied, setCopied] = useState("");

  const statusText = useMemo(() => {
    return autoGenerate ? "Auto pipeline ON - new 40-second video pack every 5 minutes" : "Auto pipeline OFF";
  }, [autoGenerate]);

  const selfTests = useMemo(() => runSelfTests(pack), [pack]);
  const allTestsPassed = selfTests.every((test) => test.pass);

  useEffect(() => {
    if (!autoGenerate) return undefined;

    const interval = window.setInterval(() => {
      setPack(createFinanceShort(style));
    }, 5 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, [autoGenerate, style]);

  function regenerate() {
    setPack(createFinanceShort(style));
  }

  async function copyText(label, text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1500);
    } catch (error) {
      window.alert("Copy failed. Please select and copy manually.");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="rounded-3xl bg-gradient-to-br from-yellow-500/20 via-neutral-900 to-emerald-500/10 border border-white/10 p-6 md:p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">40 Second Finance Shorts Generator</p>
          <h1 className="text-3xl md:text-5xl font-black mt-2 leading-tight">8 Scenes x 5 Seconds = Exact 40-Second Video</h1>
          <p className="text-neutral-300 mt-3 max-w-3xl">
            This app generates a complete short finance video pack: 40-second script, 8 image prompts, 8 matching video prompts, thumbnail prompt, disclaimer prompt, upload title, description, and hashtags.
          </p>
          <div className="grid md:grid-cols-4 gap-3 mt-6">
            <Stat label="Video Limit" value="40 sec" />
            <Stat label="Scenes" value="8" />
            <Stat label="Each Scene" value="5 sec" />
            <Stat label="Character" value="Black Stick" />
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-neutral-900 border border-white/10 p-4">
            <label className="text-sm text-neutral-400">Visual Style</label>
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              className="w-full mt-2 bg-neutral-950 border border-white/10 rounded-xl px-3 py-3 outline-none"
            >
              {CHANNEL_STYLES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={regenerate} className="rounded-2xl bg-yellow-400 text-black font-black p-5 hover:bg-yellow-300 transition shadow-xl">
            Generate New 40-Sec Video
          </button>

          <button
            type="button"
            onClick={() => setAutoGenerate((value) => !value)}
            className={"rounded-2xl font-black p-5 transition shadow-xl " + (autoGenerate ? "bg-red-500 text-white hover:bg-red-400" : "bg-emerald-500 text-black hover:bg-emerald-400")}
          >
            {autoGenerate ? "Stop Auto Generate" : "Start 5-Min Auto Generate"}
          </button>
        </section>

        <div className="rounded-2xl bg-neutral-900 border border-white/10 p-4 text-neutral-300">
          <span className="text-emerald-300 font-bold">Status:</span> {statusText} - Last generated: {pack.generatedAt}
        </div>

        <section className="grid lg:grid-cols-3 gap-4">
          <InfoCard title="Topic" value={pack.topic.title} />
          <InfoCard title="Lesson" value={pack.topic.lesson} />
          <InfoCard title="Twist" value={pack.topic.twist} />
          <InfoCard title="Unique ID" value={pack.uniqueVideoId.slice(0, 18) + "..."} />
        </section>

        <Panel title="Built-in Tests" actions={<span className={allTestsPassed ? "text-emerald-300 font-black" : "text-red-300 font-black"}>{allTestsPassed ? "All Passed" : "Fix Needed"}</span>}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selfTests.map((test) => (
              <div key={test.name} className="rounded-xl bg-neutral-950 border border-white/10 p-3">
                <p className={test.pass ? "text-emerald-300 font-bold" : "text-red-300 font-bold"}>{test.pass ? "PASS" : "FAIL"}</p>
                <p className="text-neutral-300 text-sm mt-1">{test.name}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Exact 40-Second Script" actions={<CopyButton copied={copied} label="Script" onClick={() => copyText("Script", pack.script)} />}>
          <pre className="whitespace-pre-wrap text-neutral-200 leading-relaxed font-sans text-sm md:text-base">{pack.script}</pre>
        </Panel>

        <Panel
          title="Scene Timeline"
          actions={
            <CopyButton
              copied={copied}
              label="Timeline"
              onClick={() => copyText("Timeline", pack.scriptLines.map((scene, index) => "Scene " + (index + 1) + ": " + scene.time + " - " + scene.beat).join(NL))}
            />
          }
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pack.scriptLines.map((scene, index) => (
              <div key={scene.time + scene.beat} className="rounded-2xl bg-neutral-950 border border-white/10 p-4">
                <p className="text-yellow-300 font-black">Scene {index + 1}</p>
                <p className="text-emerald-300 text-sm font-bold mt-1">{scene.time}</p>
                <p className="text-white font-bold mt-2">{scene.beat}</p>
                <p className="text-neutral-400 text-sm mt-2">5 seconds only</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="8 Text-to-Image Prompts" actions={<CopyButton copied={copied} label="Images" onClick={() => copyText("Images", pack.imagePrompts.join(DOUBLE_NL))} />}>
          <div className="grid md:grid-cols-2 gap-4">
            {pack.imagePrompts.map((prompt, index) => (
              <PromptBox key={"image-" + index} title={"Image " + (index + 1) + " / Scene " + (index + 1)} text={prompt} />
            ))}
          </div>
        </Panel>

        <Panel title="8 Image-to-Video Prompts - 5 Seconds Each" actions={<CopyButton copied={copied} label="Videos" onClick={() => copyText("Videos", pack.videoPrompts.join(DOUBLE_NL))} />}>
          <div className="grid md:grid-cols-2 gap-4">
            {pack.videoPrompts.map((prompt, index) => (
              <PromptBox key={"video-" + index} title={"Video " + (index + 1) + " - Exactly 5 Sec"} text={prompt} />
            ))}
          </div>
        </Panel>

        <section className="grid lg:grid-cols-2 gap-4">
          <Panel title="Thumbnail Prompt" actions={<CopyButton copied={copied} label="Thumbnail" onClick={() => copyText("Thumbnail", pack.thumbnailPrompt)} />}>
            <PromptBox title="Viral Thumbnail" text={pack.thumbnailPrompt} />
          </Panel>

          <Panel title="Disclaimer Prompt" actions={<CopyButton copied={copied} label="Disclaimer Prompt" onClick={() => copyText("Disclaimer Prompt", pack.disclaimerPrompt)} />}>
            <PromptBox title="Disclaimer Screen" text={pack.disclaimerPrompt} />
            <div className="mt-4 rounded-2xl bg-neutral-950 border border-white/10 p-4">
              <p className="text-yellow-300 font-black mb-2">Disclaimer Text</p>
              <p className="text-neutral-200">{pack.disclaimerText}</p>
            </div>
          </Panel>
        </section>

        <section className="grid lg:grid-cols-2 gap-4">
          <Panel title="Edit Rules">
            <ul className="space-y-3 text-neutral-200">
              {pack.editPlan.map((step, index) => (
                <li key={"edit-" + index} className="bg-neutral-950 rounded-xl p-3 border border-white/10">
                  <span className="text-yellow-300 font-bold">{index + 1}. </span>
                  {step}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Upload Pack" actions={<CopyButton copied={copied} label="Upload Pack" onClick={() => copyText("Upload Pack", JSON.stringify(pack.uploadPack, null, 2))} />}>
            <UploadItem title="Title" text={pack.uploadPack.title} />
            <UploadItem title="Description" text={pack.uploadPack.description} />
            <UploadItem title="Hashtags" text={pack.uploadPack.hashtags} />
            <UploadItem title="Format" text={pack.uploadPack.sceneFormat} />
          </Panel>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-2xl font-black text-yellow-300">{value}</p>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-neutral-900 border border-white/10 p-5 shadow-xl">
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="text-xl font-black mt-2">{value}</p>
    </div>
  );
}

function Panel({ title, actions, children }) {
  return (
    <section className="rounded-3xl bg-neutral-900 border border-white/10 p-5 md:p-6 shadow-xl">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-2xl font-black">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

function PromptBox({ title, text }) {
  return (
    <div className="rounded-2xl bg-neutral-950 border border-white/10 p-4">
      <p className="text-emerald-300 font-black mb-2">{title}</p>
      <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function UploadItem({ title, text }) {
  return (
    <div className="rounded-2xl bg-neutral-950 border border-white/10 p-4 mb-3">
      <p className="text-yellow-300 font-black mb-2">{title}</p>
      <p className="text-neutral-200 leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function CopyButton({ label, copied, onClick }) {
  return (
    <button type="button" onClick={onClick} className="bg-white text-black rounded-xl px-4 py-2 text-sm font-black hover:bg-neutral-200 transition">
      {copied === label ? "Copied" : "Copy " + label}
    </button>
  );
}
