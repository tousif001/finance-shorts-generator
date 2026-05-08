import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const STORAGE_KEY = "finance_meta_ai_generator_v8";
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

function makeMetaVideoPrompt(action, emotion, camera, background, motionDetail) {
  return [
    "5 second vertical video.",
    "Same black stick figure guy in every frame.",
    "Round black head, thin black body, black arms and legs, simple white eyes, simple white mouth.",
    action,
    emotion,
    background,
    camera,
    motionDetail,
    "2D cartoon finance style.",
    "Dark cinematic atmosphere.",
    "No text.",
    "No watermark.",
  ].join(" ");
}

function getMetaVideoScene(nicheName, sceneNumber, object, location) {
  const scenes = {
    "Crypto Finance": [
      {
        action: "The guy holds a phone close to his face while a green crypto chart glows on the screen.",
        background: "Dark bedroom background with faint blue screen light.",
        camera: "Slow zoom toward the phone and his shocked eyes.",
        motion: "The chart line moves upward, then the guy leans forward nervously.",
      },
      {
        action: "The guy sits at a desk and taps a laptop as if entering a risky crypto trade.",
        background: "Messy desk with laptop glow and small coin shapes around it.",
        camera: "Side angle with a gentle push-in.",
        motion: "His hand moves to the laptop, then his eyes widen.",
      },
      {
        action: "The guy watches the crypto chart suddenly turn red on his phone.",
        background: "Dark room with red light reflecting on the wall.",
        camera: "Small handheld shake to show panic.",
        motion: "The red chart drops, his shoulders sink, and the phone tilts down.",
      },
      {
        action: "The guy stares at his phone while chat bubble shapes fade away silently.",
        background: "Night city window behind him with soft neon glow.",
        camera: "Slow pan from the phone to his worried face.",
        motion: "The chat bubbles disappear one by one while he freezes.",
      },
      {
        action: "The guy writes three simple risk rules in a notebook beside the laptop.",
        background: "Desk with laptop, notebook, and dim yellow lamp.",
        camera: "Top-down camera angle slowly moving closer.",
        motion: "His hand writes, then he points at the notebook confidently.",
      },
      {
        action: "The guy closes the laptop and takes a deep breath instead of chasing the chart.",
        background: "Calm dark room with soft blue light.",
        camera: "Slow zoom out for a calmer mood.",
        motion: "He closes the laptop, sits back, and relaxes his shoulders.",
      },
      {
        action: "The guy walks away from floating crypto coin symbols fading behind him.",
        background: "Dark street with digital coin shapes disappearing in the air.",
        camera: "Back view following shot.",
        motion: "Coins fade as he walks forward steadily.",
      },
      {
        action: "The guy stands still while a simple red chart falls behind him and then stops.",
        background: "Dark finance background with subtle red glow.",
        camera: "Slow dramatic push-in.",
        motion: "The falling chart slows down, and the guy stands calm at the end.",
      },
    ],
    "Business Stories": [
      {
        action: "The guy stands inside a small busy shop and looks at the counter.",
        background: "Small shop with shelves, boxes, and warm lights.",
        camera: "Wide shot slowly moving closer.",
        motion: "Customer shadow shapes pass by while he watches the counter.",
      },
      {
        action: "The guy opens a cash drawer and finds very little money inside.",
        background: "Shop counter with bills, receipt paper, and delivery boxes.",
        camera: "Close-up on the drawer, then tilt to his worried face.",
        motion: "The drawer slides open, his eyes widen, and he freezes.",
      },
      {
        action: "The guy counts bills while delivery boxes pile up beside him.",
        background: "Small business shop with packages and dim evening light.",
        camera: "Slow side pan across bills and boxes.",
        motion: "Bills move through his hand while the boxes wobble slightly.",
      },
      {
        action: "The guy looks stressed at a notebook showing simple expense marks.",
        background: "Desk with calculator, notebook, and shop lights behind.",
        camera: "Over-the-shoulder view.",
        motion: "He taps the calculator and lowers his head in stress.",
      },
      {
        action: "The guy crosses out a loss-making offer on a paper sheet.",
        background: "Shop wall with simple sale board shapes and papers.",
        camera: "Medium shot with slight zoom.",
        motion: "He draws one strong cross mark and stands straighter.",
      },
      {
        action: "The guy checks cashflow on a laptop with a simple rising line.",
        background: "Clean shop counter with organized bills and notebook.",
        camera: "Slow push-in on laptop and calm face.",
        motion: "The line rises gently while he nods.",
      },
      {
        action: "The guy arranges money, notebook, and stock boxes neatly on the counter.",
        background: "More organized shop with warm lights.",
        camera: "Smooth left-to-right pan.",
        motion: "He moves items into order and looks relieved.",
      },
      {
        action: "The guy locks the cash drawer and stands confidently behind the counter.",
        background: "Small shop at closing time with soft golden light.",
        camera: "Slow zoom out.",
        motion: "He closes the drawer, turns around, and smiles slightly.",
      },
    ],
    "Stock Market": [
      {
        action: "The guy watches a stock chart rising on his laptop and leans closer.",
        background: "Dark desk setup with laptop glow and market graph shapes.",
        camera: "Slow zoom toward laptop screen.",
        motion: "The green line rises while he gets excited.",
      },
      {
        action: "The guy reacts as one red candle appears on the chart.",
        background: "Laptop desk with red light spreading across the room.",
        camera: "Quick small zoom to his nervous face.",
        motion: "The red candle drops and his eyes open wide.",
      },
      {
        action: "The guy holds his head while the stock graph falls on the laptop.",
        background: "Dark office desk with phone alerts glowing.",
        camera: "Slight camera shake.",
        motion: "Graph falls slowly, and he leans back in regret.",
      },
      {
        action: "The guy writes an investing plan in a notebook beside the laptop.",
        background: "Clean desk with notebook, laptop, and calm blue light.",
        camera: "Top-down slow push-in.",
        motion: "His hand writes, then he closes the notebook calmly.",
      },
      {
        action: "The guy ignores flashing hype alerts on his phone.",
        background: "Dark room with phone notifications floating as simple shapes.",
        camera: "Medium shot with slight pan.",
        motion: "Notifications fade while he looks back at his plan.",
      },
      {
        action: "The guy studies the chart calmly instead of reacting emotionally.",
        background: "Desk with laptop chart and quiet night window.",
        camera: "Still camera with slow zoom.",
        motion: "His eyes move from chart to notebook, then he nods.",
      },
      {
        action: "The guy sits steady while green and red chart lines move behind him.",
        background: "Minimal dark market background with simple graph lines.",
        camera: "Slow circular move around the character.",
        motion: "Graphs move behind him but he stays calm.",
      },
      {
        action: "The guy stands beside a simple rising graph with a calm smile.",
        background: "Dark finance background with soft green glow.",
        camera: "Slow zoom out.",
        motion: "The graph rises slightly and the guy stands confidently.",
      },
    ],
    "Debt & Credit": [
      {
        action: "The guy holds a credit card in a dark room and looks unsure.",
        background: "Dark bedroom with phone payment screen glowing.",
        camera: "Slow push-in on the card and his eyes.",
        motion: "His hand shakes slightly while holding the card.",
      },
      {
        action: "The guy looks worried at a payment bill on his phone.",
        background: "Small apartment desk with bills spread around.",
        camera: "Close-up on phone, then tilt to face.",
        motion: "Bill shapes pile up while he looks stressed.",
      },
      {
        action: "The guy watches interest numbers grow as simple shapes around him.",
        background: "Dark room with red warning glow and paper bills.",
        camera: "Slow spinning camera effect.",
        motion: "Number shapes grow larger while he steps back.",
      },
      {
        action: "The guy places the credit card down and pushes it away.",
        background: "Desk with wallet, bill paper, and phone.",
        camera: "Side view with slow push-in.",
        motion: "He slides the card away and exhales.",
      },
      {
        action: "The guy lists his debts in a notebook one by one.",
        background: "Desk with calculator and small lamp.",
        camera: "Top-down view.",
        motion: "His hand writes lines while bills sit nearby.",
      },
      {
        action: "The guy pays one bill on his phone and looks relieved.",
        background: "Small apartment with soft warm light.",
        camera: "Slow zoom toward his phone.",
        motion: "One bill paper fades away after payment.",
      },
      {
        action: "The guy closes his wallet calmly after organizing his money.",
        background: "Clean desk with fewer bills and a notebook.",
        camera: "Medium shot with gentle push-in.",
        motion: "He closes the wallet and sits upright.",
      },
      {
        action: "The guy walks away from floating debt papers fading behind him.",
        background: "Dark hallway with bills disappearing into shadows.",
        camera: "Back view tracking shot.",
        motion: "Debt papers fade as he walks forward.",
      },
    ],
    "Rich Mindset": [
      {
        action: "The guy looks at an expensive item on his phone and hesitates.",
        background: "Dark room with luxury product glow on phone.",
        camera: "Close-up on phone, then his thinking face.",
        motion: "His finger pauses before tapping buy.",
      },
      {
        action: "The guy walks past flashy shopping signs without stopping.",
        background: "Night mall corridor with glowing shop shapes.",
        camera: "Side tracking shot.",
        motion: "Signs glow behind him while he keeps walking.",
      },
      {
        action: "The guy places coins into a savings jar on the desk.",
        background: "Simple room with desk, jar, and soft lamp.",
        camera: "Close-up on jar.",
        motion: "Coins drop into the jar one by one.",
      },
      {
        action: "The guy chooses a growing asset graph over a shopping bag.",
        background: "Split desk scene with laptop graph and shopping bag.",
        camera: "Slow pan from shopping bag to graph.",
        motion: "He pushes the bag away and points at the graph.",
      },
      {
        action: "The guy writes a simple wealth plan in a notebook.",
        background: "Clean desk with notebook and dark blue light.",
        camera: "Top-down slow zoom.",
        motion: "His hand writes, then taps the notebook.",
      },
      {
        action: "The guy stands beside a growing asset chart on laptop.",
        background: "Minimal dark room with laptop glow.",
        camera: "Medium shot with slow push-in.",
        motion: "The chart rises slowly while he stands calmly.",
      },
      {
        action: "The guy sits in a simple room looking peaceful, not flashy.",
        background: "Simple clean room with soft morning light.",
        camera: "Still camera with gentle zoom out.",
        motion: "He breathes calmly and looks at his notebook.",
      },
      {
        action: "The guy watches sunrise from a rooftop with confidence.",
        background: "City rooftop at sunrise with warm sky.",
        camera: "Slow crane-up movement.",
        motion: "He stands still as sunlight grows brighter.",
      },
    ],
  };

  const fallback = [
    {
      action: "Black stick figure interacts with " + object + " in " + location + ".",
      background: "Dark finance background.",
      camera: "Slow zoom in.",
      motion: "The character moves slightly and looks focused.",
    },
  ];

  const list = scenes[nicheName] || fallback;
  return list[(sceneNumber - 1) % list.length];
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

    const videoScene = getMetaVideoScene(niche.name, index + 1, visuals.object, visuals.location);
    const videoPrompt = makeMetaVideoPrompt(
      videoScene.action,
      "Character looks " + visuals.emotion + ".",
      videoScene.camera,
      videoScene.background,
      videoScene.motion
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
