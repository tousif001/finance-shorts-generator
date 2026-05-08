import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const STORAGE_KEY = "finance_meta_ai_generator_safe_v1";
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
    hashtags: "#Crypto #CryptoEducation #Finance #MoneyTips #RiskManagement #Shorts",
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
    hashtags: "#Business #Startup #Entrepreneurship #MoneyLessons #Cashflow #Shorts",
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
  {
    name: "Stock Market",
    accent: "#34d399",
    hashtags: "#StockMarket #Investing #Stocks #TradingPsychology #Finance #Shorts",
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
  },
  {
    name: "Debt & Credit",
    accent: "#fb7185",
    hashtags: "#DebtFree #CreditCard #EMI #MoneyTips #PersonalFinance #Shorts",
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
  },
  {
    name: "Rich Mindset",
    accent: "#a78bfa",
    hashtags: "#RichMindset #Wealth #MoneyHabits #FinancialFreedom #Success #Shorts",
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

const VIDEO_SCENE_LIBRARY = {
  "Crypto Finance": [
    ["The guy holds a phone close to his face while a green crypto chart glows on the screen.", "Dark bedroom background with faint blue screen light.", "Slow zoom toward the phone and his shocked eyes.", "The chart line moves upward, then the guy leans forward nervously."],
    ["The guy sits at a desk and taps a laptop as if entering a risky crypto trade.", "Messy desk with laptop glow and small coin shapes around it.", "Side angle with a gentle push-in.", "His hand moves to the laptop, then his eyes widen."],
    ["The guy watches the crypto chart suddenly turn red on his phone.", "Dark room with red light reflecting on the wall.", "Small handheld shake to show panic.", "The red chart drops, his shoulders sink, and the phone tilts down."],
    ["The guy stares at his phone while chat bubble shapes fade away silently.", "Night city window behind him with soft neon glow.", "Slow pan from the phone to his worried face.", "The chat bubbles disappear one by one while he freezes."],
    ["The guy writes three simple risk rules in a notebook beside the laptop.", "Desk with laptop, notebook, and dim yellow lamp.", "Top-down camera angle slowly moving closer.", "His hand writes, then he points at the notebook confidently."],
    ["The guy closes the laptop and takes a deep breath instead of chasing the chart.", "Calm dark room with soft blue light.", "Slow zoom out for a calmer mood.", "He closes the laptop, sits back, and relaxes his shoulders."],
    ["The guy walks away from floating crypto coin symbols fading behind him.", "Dark street with digital coin shapes disappearing in the air.", "Back view following shot.", "Coins fade as he walks forward steadily."],
    ["The guy stands still while a simple red chart falls behind him and then stops.", "Dark finance background with subtle red glow.", "Slow dramatic push-in.", "The falling chart slows down, and the guy stands calm at the end."],
  ],
  "Business Stories": [
    ["The guy stands inside a small busy shop and looks at the counter.", "Small shop with shelves, boxes, and warm lights.", "Wide shot slowly moving closer.", "Customer shadow shapes pass by while he watches the counter."],
    ["The guy opens a cash drawer and finds very little money inside.", "Shop counter with bills, receipt paper, and delivery boxes.", "Close-up on the drawer, then tilt to his worried face.", "The drawer slides open, his eyes widen, and he freezes."],
    ["The guy counts bills while delivery boxes pile up beside him.", "Small business shop with packages and dim evening light.", "Slow side pan across bills and boxes.", "Bills move through his hand while the boxes wobble slightly."],
    ["The guy looks stressed at a notebook showing simple expense marks.", "Desk with calculator, notebook, and shop lights behind.", "Over-the-shoulder view.", "He taps the calculator and lowers his head in stress."],
    ["The guy crosses out a loss-making offer on a paper sheet.", "Shop wall with simple sale board shapes and papers.", "Medium shot with slight zoom.", "He draws one strong cross mark and stands straighter."],
    ["The guy checks cashflow on a laptop with a simple rising line.", "Clean shop counter with organized bills and notebook.", "Slow push-in on laptop and calm face.", "The line rises gently while he nods."],
    ["The guy arranges money, notebook, and stock boxes neatly on the counter.", "More organized shop with warm lights.", "Smooth left-to-right pan.", "He moves items into order and looks relieved."],
    ["The guy locks the cash drawer and stands confidently behind the counter.", "Small shop at closing time with soft golden light.", "Slow zoom out.", "He closes the drawer, turns around, and smiles slightly."],
  ],
  "Stock Market": [
    ["The guy watches a stock chart rising on his laptop and leans closer.", "Dark desk setup with laptop glow and market graph shapes.", "Slow zoom toward laptop screen.", "The green line rises while he gets excited."],
    ["The guy reacts as one red candle appears on the chart.", "Laptop desk with red light spreading across the room.", "Quick small zoom to his nervous face.", "The red candle drops and his eyes open wide."],
    ["The guy holds his head while the stock graph falls on the laptop.", "Dark office desk with phone alerts glowing.", "Slight camera shake.", "Graph falls slowly, and he leans back in regret."],
    ["The guy writes an investing plan in a notebook beside the laptop.", "Clean desk with notebook, laptop, and calm blue light.", "Top-down slow push-in.", "His hand writes, then he closes the notebook calmly."],
    ["The guy ignores flashing hype alerts on his phone.", "Dark room with phone notifications floating as simple shapes.", "Medium shot with slight pan.", "Notifications fade while he looks back at his plan."],
    ["The guy studies the chart calmly instead of reacting emotionally.", "Desk with laptop chart and quiet night window.", "Still camera with slow zoom.", "His eyes move from chart to notebook, then he nods."],
    ["The guy sits steady while green and red chart lines move behind him.", "Minimal dark market background with simple graph lines.", "Slow circular move around the character.", "Graphs move behind him but he stays calm."],
    ["The guy stands beside a simple rising graph with a calm smile.", "Dark finance background with soft green glow.", "Slow zoom out.", "The graph rises slightly and the guy stands confidently."],
  ],
  "Debt & Credit": [
    ["The guy holds a credit card in a dark room and looks unsure.", "Dark bedroom with phone payment screen glowing.", "Slow push-in on the card and his eyes.", "His hand shakes slightly while holding the card."],
    ["The guy looks worried at a payment bill on his phone.", "Small apartment desk with bills spread around.", "Close-up on phone, then tilt to face.", "Bill shapes pile up while he looks stressed."],
    ["The guy watches interest numbers grow as simple shapes around him.", "Dark room with red warning glow and paper bills.", "Slow spinning camera effect.", "Number shapes grow larger while he steps back."],
    ["The guy places the credit card down and pushes it away.", "Desk with wallet, bill paper, and phone.", "Side view with slow push-in.", "He slides the card away and exhales."],
    ["The guy lists his debts in a notebook one by one.", "Desk with calculator and small lamp.", "Top-down view.", "His hand writes lines while bills sit nearby."],
    ["The guy pays one bill on his phone and looks relieved.", "Small apartment with soft warm light.", "Slow zoom toward his phone.", "One bill paper fades away after payment."],
    ["The guy closes his wallet calmly after organizing his money.", "Clean desk with fewer bills and a notebook.", "Medium shot with gentle push-in.", "He closes the wallet and sits upright."],
    ["The guy walks away from floating debt papers fading behind him.", "Dark hallway with bills disappearing into shadows.", "Back view tracking shot.", "Debt papers fade as he walks forward."],
  ],
  "Rich Mindset": [
    ["The guy looks at an expensive item on his phone and hesitates.", "Dark room with luxury product glow on phone.", "Close-up on phone, then his thinking face.", "His finger pauses before tapping buy."],
    ["The guy walks past flashy shopping signs without stopping.", "Night mall corridor with glowing shop shapes.", "Side tracking shot.", "Signs glow behind him while he keeps walking."],
    ["The guy places coins into a savings jar on the desk.", "Simple room with desk, jar, and soft lamp.", "Close-up on jar.", "Coins drop into the jar one by one."],
    ["The guy chooses a growing asset graph over a shopping bag.", "Split desk scene with laptop graph and shopping bag.", "Slow pan from shopping bag to graph.", "He pushes the bag away and points at the graph."],
    ["The guy writes a simple wealth plan in a notebook.", "Clean desk with notebook and dark blue light.", "Top-down slow zoom.", "His hand writes, then taps the notebook."],
    ["The guy stands beside a growing asset chart on laptop.", "Minimal dark room with laptop glow.", "Medium shot with slow push-in.", "The chart rises slowly while he stands calmly."],
    ["The guy sits in a simple room looking peaceful, not flashy.", "Simple clean room with soft morning light.", "Still camera with gentle zoom out.", "He breathes calmly and looks at his notebook."],
    ["The guy watches sunrise from a rooftop with confidence.", "City rooftop at sunrise with warm sky.", "Slow crane-up movement.", "He stands still as sunlight grows brighter."],
  ],
};

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateUniqueId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

function makeMetaVideoPrompt(sceneData, emotion) {
  return [
    "5 second vertical video.",
    "Same black stick figure guy in every frame.",
    "Round black head, thin black body, black arms and legs, simple white eyes, simple white mouth.",
    sceneData[0],
    "Character looks " + emotion + ".",
    sceneData[1],
    sceneData[2],
    sceneData[3],
    "2D cartoon finance style.",
    "Dark cinematic atmosphere.",
    "No text.",
    "No watermark.",
  ].join(" ");
}

function generateScript(niche, language) {
  const hook = randomItem(niche.hooks);
  const twist = randomItem(niche.twists);

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

  if (language === "hi") return hindi;
  if (language === "hinglish") return hinglish;
  return english;
}

function createVideoPack(nicheName, language) {
  const niche = NICHES.find((item) => item.name === nicheName) || NICHES[0];
  const lines = generateScript(niche, language);
  const location = randomItem(LOCATIONS);
  const emotion = randomItem(EMOTIONS);
  const object = randomItem(OBJECTS);
  const videoScenes = VIDEO_SCENE_LIBRARY[niche.name] || VIDEO_SCENE_LIBRARY["Crypto Finance"];

  const scenes = lines.map((line, index) => {
    const start = index * SCENE_SECONDS;
    const end = start + SCENE_SECONDS;
    const time = "0:" + String(start).padStart(2, "0") + " - 0:" + String(end).padStart(2, "0");

    const imagePrompt = [
      "Vertical 9:16 image.",
      "Black stick figure character.",
      "Same character in every scene.",
      location + ".",
      object + ".",
      emotion + " emotion.",
      "2D cartoon finance style.",
      "Dark cinematic background.",
      "Clean composition.",
      "No text.",
    ].join(" ");

    const sceneData = videoScenes[index % videoScenes.length];
    const videoPrompt = makeMetaVideoPrompt(sceneData, emotion);

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
      object + ".",
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
    { name: "Every scene has detailed Meta AI video prompt", pass: pack.scenes.every((scene) => scene.videoPrompt.includes("Same black stick figure guy")) },
    { name: "Every video prompt avoids text", pass: pack.scenes.every((scene) => scene.videoPrompt.includes("No text")) },
    { name: "Video duration equals 40 seconds", pass: TOTAL_SCENES * SCENE_SECONDS === VIDEO_SECONDS },
  ];
}

const UI = {
  page: { minHeight: "100vh", background: "radial-gradient(circle at top left, #1e293b 0, #020617 38%, #000 100%)", color: "white", padding: "22px", fontFamily: "Inter, Arial, sans-serif" },
  wrap: { maxWidth: "1320px", margin: "0 auto" },
  hero: { background: "linear-gradient(135deg, rgba(250,204,21,0.22), rgba(15,23,42,0.98), rgba(34,211,238,0.14))", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "34px", padding: "34px", boxShadow: "0 28px 80px rgba(0,0,0,0.55)", marginBottom: "22px" },
  badge: { display: "inline-block", padding: "8px 12px", borderRadius: "999px", background: "rgba(250,204,21,0.15)", border: "1px solid rgba(250,204,21,0.35)", color: "#fde68a", fontSize: "12px", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase" },
  title: { fontSize: "clamp(34px, 6vw, 72px)", lineHeight: 1, margin: "18px 0 12px", fontWeight: 950, letterSpacing: "-2px" },
  sub: { color: "#cbd5e1", fontSize: "18px", lineHeight: 1.65, maxWidth: "850px" },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "12px", marginTop: "26px" },
  stat: { background: "rgba(2,6,23,0.72)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "16px" },
  controls: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "22px" },
  glass: { background: "rgba(15,23,42,0.86)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "20px", boxShadow: "0 18px 50px rgba(0,0,0,0.35)" },
  label: { display: "block", color: "#94a3b8", fontSize: "13px", marginBottom: "9px", fontWeight: 800 },
  select: { width: "100%", background: "#020617", border: "1px solid #334155", color: "white", borderRadius: "16px", padding: "14px", fontSiz
  e: "15px", outline: "none" },
  generate: { width: "100%", height: "100%", minHeight: "82px", border: "none", borderRadius: "24px", background: "linear-grad
    

function getInitialPack() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createVideoPack(NICHES[0].name, "en");
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.scenes) || parsed.scenes.length !== TOTAL_SCENES) return createVideoPack(NICHES[0].name, "en");
    return parsed;
  } catch {
    return createVideoPack(NICHES[0].name, "en");
  }
}

exportselect: {
  width: "100%",
  background: "#020617",
  border: "1px solid #334155",
  color: "white",
  borderRadius: "16px",
  padding: "14px",
  fontSize: "15px",
  outline: "none",
}, default function App() {
  const [pack, setPack] = useState(() => getInitialPack());
  const [language, setLanguage] = useState(pack.language || "en");
  const [niche, setNiche] = useState(pack.niche || NICHES[0].name);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pack));
  }, [pack]);

  function regenerate() {
    setPack(createVideoPack(niche, language));
  }

  async function copyText(label, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      alert("Copy failed. Select the text and copy manually.");
    }
  }

  const scriptText = useMemo(() => pack.scenes.map((s) => s.time + " | Scene " + s.number + NL + s.voice).join(DOUBLE_NL), [pack]);
  const allVoiceovers = useMemo(() => pack.scenes.map((s) => s.voice).join(DOUBLE_NL), [pack]);
  const allImages = useMemo(() => pack.scenes.map((s) => s.imagePrompt).join(DOUBLE_NL), [pack]);
  const allVideos = useMemo(() => pack.scenes.map((s) => s.videoPrompt).join(DOUBLE_NL), [pack]);
  const tests = useMemo(() => runSelfTests(pack), [pack]);

  return (
    <div style={UI.page}>
      <div style={UI.wrap}>
        <header style={UI.hero}>
          <span style={UI.badge}>Meta AI Prompt Studio</span>
          <h1 style={UI.title}>Creative Finance Shorts Generator</h1>
          <p style={UI.sub}>Generate 40-second shorts with separate script, image prompts, detailed Meta AI video prompts, thumbnail, disclaimer, and upload pack.</p>
          <div style={UI.stats}>
            <Stat label="Video Length" value={VIDEO_SECONDS + " sec"} color="#facc15" />
            <Stat label="Scenes" value={TOTAL_SCENES} color="#22d3ee" />
            <Stat label="Each Scene" value={SCENE_SECONDS + " sec"} color="#34d399" />
            <Stat label="Saved After Reload" value="Yes" color="#a78bfa" />
          </div>
        </header>

        <section style={UI.controls}>
          <Control label="Choose Language" value={language} onChange={setLanguage} options={LANGUAGES.map((item) => ({ value: item.code, label: item.label }))} />
          <Control label="Choose Niche" value={niche} onChange={setNiche} options={NICHES.map((item) => ({ value: item.name, label: item.name }))} />
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

        <Section title="Built-in Tests" copyLabel="Tests" copied={copied} onCopy={() => copyText("Tests", tests.map((t) => (t.pass ? "PASS: " : "FAIL: ") + t.name).join(NL))}>
          <div style={UI.grid}>{tests.map((test) => <div key={test.name} style={UI.promptCard}><h3 style={{ margin: 0, color: test.pass ? "#34d399" : "#fb7185" }}>{test.pass ? "PASS" : "FAIL"}</h3><p style={UI.small}>{test.name}</p></div>)}</div>
        </Section>

        <Section title="Full 40-Second Script" copyLabel="Script" copied={copied} onCopy={() => copyText("Script", scriptText)}>
          <div style={UI.promptCard}><p style={UI.text}>{scriptText}</p></div>
        </Section>

        <Section title="Scene Voiceover Lines" copyLabel="All Voiceovers" copied={copied} onCopy={() => copyText("All Voiceovers", allVoiceovers)}>
          <div style={UI.grid}>{pack.scenes.map((scene) => <PromptCard key={scene.id} title={"Scene " + scene.number + " Voiceover"} subtitle={scene.time} text={scene.voice} copied={copied} copyLabel={"Voice " + scene.number} onCopy={() => copyText("Voice " + scene.number, scene.voice)} />)}</div>
        </Section>

        <Section title="Image Prompts" copyLabel="All Images" copied={copied} onCopy={() => copyText("All Images", allImages)}>
          <div style={UI.grid}>{pack.scenes.map((scene) => <PromptCard key={scene.id + "image"} title={"Image Prompt " + scene.number} subtitle={scene.time + " | Text-to-Image"} text={scene.imagePrompt} copied={copied} copyLabel={"Image " + scene.number} onCopy={() => copyText("Image " + scene.number, scene.imagePrompt)} />)}</div>
        </Section>

        <Section title="Meta AI Video Prompts" copyLabel="All Videos" copied={copied} onCopy={() => copyText("All Videos", allVideos)}>
          <div style={UI.grid}>{pack.scenes.map((scene) => <PromptCard key={scene.id + "video"} title={"Video Prompt " + scene.number} subtitle={scene.time + " | Meta AI Friendly"} text={scene.videoPrompt} copied={copied} copyLabel={"Video " + scene.number} onCopy={() => copyText("Video " + scene.number, scene.videoPrompt)} />)}</div>
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

function Control({ label, value, onChange, options }) {
  return <div style={UI.glass}><label style={UI.label}>{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} style={UI.select}>{options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>;
}

function Stat({ label, value, color }) {
  return <div style={UI.stat}><p style={{ color: "#94a3b8", margin: 0, fontSize: 13 }}>{label}</p><p style={{ color, margin: "8px 0 0", fontSize: 28, fontWeight: 950 }}>{value}</p></div>;
}

function Section({ title, copyLabel, copied, onCopy, children }) {
  return <section style={UI.section}><div style={UI.sectionTop}><h2 style={UI.h2}>{title}</h2><CopyButton copied={copied} label={copyLabel} onClick={onCopy} /></div>{children}</section>;
}

function PromptCard({ title, subtitle, text, copied, copyLabel, onCopy }) {
  return <div style={UI.promptCard}><div style={UI.sectionTop}><div><h3 style={{ margin: 0, color: "#67e8f9", fontSize: 18 }}>{title}</h3><p style={UI.small}>{subtitle}</p></div><CopyButton copied={copied} label={copyLabel} onClick={onCopy} /></div><p style={UI.text}>{text}</p></div>;
}

function MiniSection({ title, text, label, copied, onCopy }) {
  return <div style={UI.section}><div style={UI.sectionTop}><h2 style={UI.h2}>{title}</h2><CopyButton copied={copied} label={label} onClick={onCopy} /></div><p style={UI.text}>{text}</p></div>;
}

function CopyButton({ label, copied, onClick }) {
  return <button style={UI.copyBtn} onClick={onClick} type="button">{copied === label ? "Copied" : "Copy"}</button>;
}
