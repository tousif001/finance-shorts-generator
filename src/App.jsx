import { useEffect, useMemo, useState } from "react";

const VIDEO_SECONDS = 40;
const SCENE_SECONDS = 5;
const TOTAL_SCENES = 8;
const SAVED_PACK_KEY = "saved_current_video_pack_v2";
const SAVED_SETTINGS_KEY = "saved_video_settings_v2";
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

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "hinglish", label: "Hindi + English" },
];

const NICHES = [
  {
    name: "Kids 3D Stories",
    focus: "viral 3D animated kids stories, emotional lessons, funny moments, colorful worlds, friendship, adventure, magical storytelling",
    hashtags: "#KidsAnimation #3DStory #Cartoon #AnimatedShorts #KidsVideo #Shorts",
  },
  {
    name: "AI Horror Stories",
    focus: "dark suspense, horror twists, creepy storytelling, survival tension, cinematic fear moments",
    hashtags: "#HorrorStory #ScaryShorts #AIHorror #Suspense #DarkStory #Shorts",
  },
  {
    name: "Brainrot Comedy",
    focus: "chaotic humor, absurd storytelling, meme edits, internet humor, fast comedy pacing",
    hashtags: "#Brainrot #ComedyShorts #FunnyVideos #MemeContent #ViralShorts #Shorts",
  },
  {
    name: "Motivation Stories",
    focus: "self-improvement, discipline, hard work, emotional comeback stories, success mindset",
    hashtags: "#Motivation #SuccessMindset #Discipline #SelfImprovement #Inspiration #Shorts",
  },
  {
    name: "Animal Stories",
    focus: "cute animals, emotional pet moments, survival stories, funny animal adventures",
    hashtags: "#AnimalStory #CuteAnimals #PetVideos #Wildlife #AnimalShorts #Shorts",
  },
  {
    name: "Luxury Lifestyle",
    focus: "rich lifestyle, expensive cars, luxury houses, billionaire mindset, high-end visuals",
    hashtags: "#LuxuryLifestyle #MillionaireMindset #RichLife #LuxuryCars #Success #Shorts",
  },
  {
    name: "Gaming Stories",
    focus: "gaming suspense, survival gameplay stories, funny gamer moments, intense challenges",
    hashtags: "#Gaming #GamingShorts #FunnyGaming #SurvivalGame #Streamer #Shorts",
  },
  {
    name: "Mythical Stories",
    focus: "dragons, gods, powers, fantasy worlds, magical battles, emotional fantasy storytelling",
    hashtags: "#FantasyStory #Mythical #Dragons #MagicWorld #EpicStory #Shorts",
  },
  {
    name: "Personal Finance",
    focus: "salary, savings, spending habits, budgeting, and money discipline",
    hashtags: "#PersonalFinance #MoneyTips #Savings #Budgeting #MoneyMindset #Shorts",
  },
  {
    name: "Stock Market",
    focus: "stocks, market fear, beginner investing mistakes, charts, and long-term thinking",
    hashtags: "#StockMarket #Investing #Stocks #TradingPsychology #MoneyTips #Shorts",
  },
  {
    name: "Crypto Finance",
    focus: "crypto hype, risk, FOMO, market crashes, and smart caution",
    hashtags: "#Crypto #CryptoEducation #MoneyTips #RiskManagement #FinanceShorts #Shorts",
  },
  {
    name: "Business Stories",
    focus: "founders, failed businesses, profit traps, business lessons, and money decisions",
    hashtags: "#Business #BusinessStories #Entrepreneurship #MoneyLessons #Startup #Shorts",
  },
  {
    name: "Debt & Credit",
    focus: "credit cards, loans, EMI traps, interest, debt psychology, and repayment habits",
    hashtags: "#DebtFree #CreditCard #EMI #MoneyTips #PersonalFinance #Shorts",
  },
  {
    name: "Rich Mindset",
    focus: "wealth habits, asset mindset, delayed gratification, and financial discipline",
    hashtags: "#RichMindset #Wealth #FinancialFreedom #MoneyHabits #Investing #Shorts",
  },
];

const NICHE_VISUAL_STYLES = {
  "Kids 3D Stories": [
    "Pixar-style colorful 3D animation",
    "bright magical cartoon world",
    "cute Disney-inspired cinematic lighting",
    "vibrant toy-like 3D characters",
    "soft colorful fantasy animation",
  ],
  "AI Horror Stories": [
    "dark cinematic horror realism",
    "creepy found footage style",
    "analog horror atmosphere",
    "dark abandoned building aesthetic",
    "sinister red shadow lighting",
  ],
  "Brainrot Comedy": [
    "chaotic meme edit aesthetic",
    "low quality internet meme style",
    "absurd cartoon energy",
    "hyperactive Gen Z edit style",
    "random viral internet humor visuals",
  ],
  "Motivation Stories": [
    "cinematic inspirational lighting",
    "dark emotional success aesthetic",
    "dramatic comeback story visuals",
    "high contrast motivational cinematic style",
    "powerful success montage style",
  ],
  "Animal Stories": [
    "cute Disney animal animation",
    "realistic wildlife cinematic look",
    "soft emotional pet story visuals",
    "high-detail jungle adventure style",
    "adorable 3D animal world",
  ],
  "Luxury Lifestyle": [
    "ultra luxury cinematic visuals",
    "golden billionaire aesthetic",
    "expensive mansion cinematic look",
    "supercar luxury edit style",
    "high-end millionaire visuals",
  ],
  "Gaming Stories": [
    "AAA video game cinematic style",
    "competitive esports atmosphere",
    "dark survival game aesthetic",
    "high-energy streamer visuals",
    "futuristic cyber gaming style",
  ],
  "Mythical Stories": [
    "epic fantasy cinematic world",
    "dragon kingdom visuals",
    "magical god-like atmosphere",
    "ancient mythology aesthetic",
    "high fantasy adventure style",
  ],
  "Personal Finance": [
    "dark cinematic finance thriller",
    "viral money mystery story",
    "Indian middle-class finance story",
    "clean finance explainer visuals",
    "dramatic finance documentary style",
  ],
  "Stock Market": [
    "Wall Street cinematic aesthetic",
    "stock market chart visuals",
    "high tension trading atmosphere",
    "financial documentary style",
    "market crash cinematic look",
  ],
  "Crypto Finance": [
    "cyberpunk crypto visuals",
    "futuristic blockchain aesthetic",
    "dark neon trading atmosphere",
    "digital finance cinematic style",
    "crypto millionaire visual style",
  ],
  "Business Stories": [
    "startup documentary visuals",
    "founder journey cinematic style",
    "corporate storytelling aesthetic",
    "high-stakes business visuals",
    "office success cinematic look",
  ],
  "Debt & Credit": [
    "dark debt trap atmosphere",
    "stressful financial cinematic style",
    "credit card horror aesthetic",
    "emotional money struggle visuals",
    "financial survival cinematic look",
  ],
  "Rich Mindset": [
    "wealth mindset cinematic visuals",
    "luxury success atmosphere",
    "discipline and growth aesthetic",
    "high-value billionaire visuals",
    "clean millionaire lifestyle style",
  ],
};

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

const HUMAN_CHARACTERS = [
  "a fresher who just got his first salary",
  "a student trying to look rich online",
  "a delivery worker saving for a dream phone",
  "a young office employee hiding his money stress",
  "a small shop owner trying to survive the month",
  "a college student learning money the hard way",
  "a new trader who thinks profit is easy",
  "a quiet employee who never talks about his debt",
  "a creator earning money but spending faster",
  "a middle-class guy trying to impress everyone",
];

const MONEY_PROBLEMS = [
  "he checked his balance and felt his stomach drop",
  "his account looked fine in the morning and empty by night",
  "every small payment looked harmless until he added them together",
  "his lifestyle was growing faster than his income",
  "he was not broke because of one big mistake, but because of ten tiny ones",
  "he kept saying next month will be different, but nothing changed",
  "his money was leaving before he even understood where it went",
  "he confused looking rich with actually becoming stable",
  "he thought earning more would fix everything, but the leak stayed open",
  "his phone was full of payment alerts, but his savings stayed zero",
];

const HUMAN_TURNS = [
  "That is when he noticed the pattern.",
  "Then one tiny detail exposed the whole problem.",
  "The scary part was not the expense. It was how normal it felt.",
  "For the first time, he stopped guessing and started checking.",
  "The truth was uncomfortable, but it was useful.",
  "He did not need motivation. He needed a system.",
  "One notebook showed him what his bank app never explained.",
  "The moment he wrote it down, the trap became visible.",
];

const FIX_ACTIONS = [
  "he deleted one useless subscription",
  "he waited 24 hours before buying anything non-urgent",
  "he separated spending money from saving money",
  "he tracked every payment for seven days",
  "he stopped checking only monthly EMI and checked total cost",
  "he made one rule: save first, spend later",
  "he kept a small emergency amount untouched",
  "he stopped buying things only to impress people",
];

const HUMAN_CTA = [
  "Save this before your next salary disappears.",
  "Follow for money stories that actually feel real.",
  "Send this to someone who keeps saying, salary kahan gayi?",
  "If this felt personal, your money system needs fixing.",
  "Follow before the next money trap catches you.",
];

function buildHumanVoiceLines(topic, nicheName, language) {
  const character = randomItem(HUMAN_CHARACTERS);
  const problem = randomItem(MONEY_PROBLEMS);
  const turn = randomItem(HUMAN_TURNS);
  const fix = randomItem(FIX_ACTIONS);
  const cta = randomItem(HUMAN_CTA);

  const nicheScripts = {
    "Personal Finance": [
      ["Meet " + character + ". His salary came in at 9 AM, but by night he was already checking his balance twice.", "Socho " + character + ". Salary subah aayi, aur raat tak woh balance baar-baar check kar raha tha.", "एक कहानी सुनो: " + character + "। सुबह सैलरी आई, लेकिन रात तक वह बार-बार बैलेंस चेक कर रहा था।"],
      ["The scary part? He did not buy anything huge. Just tiny payments that felt normal.", "Scary part ye tha ki usne kuch bada nahi kharida. Bas chhote payments the jo normal lag rahe the.", "डराने वाली बात ये थी कि उसने कुछ बड़ा नहीं खरीदा। बस छोटे-छोटे खर्चे थे जो नॉर्मल लग रहे थे।"],
      ["One order, one subscription, one quick shopping deal... and the month started breaking.", "Ek order, ek subscription, ek quick shopping deal... aur month tootna start ho gaya.", "एक ऑर्डर, एक सब्सक्रिप्शन, एक छोटी शॉपिंग डील... और महीना बिगड़ना शुरू हो गया।"],
      [turn + " His income was not the real problem. His untracked habits were.", turn + " Problem income nahi thi. Problem untracked habits thi.", turn + " असली समस्या इनकम नहीं थी। समस्या थी बिना ट्रैक की हुई आदतें।"],
      ["He opened his notes app and wrote every spend for seven days.", "Usne notes app khola aur 7 din ka har spend likhna start kiya.", "उसने नोट्स ऐप खोला और सात दिन का हर खर्च लिखना शुरू किया।"],
      ["That one boring habit showed him where his money was silently disappearing.", "Us boring habit ne dikha diya ki paisa chupke se kahan ja raha tha.", "उस एक बोरिंग आदत ने दिखा दिया कि पैसा चुपचाप कहाँ जा रहा था।"],
      ["He did not become rich. But for the first time, the month stopped controlling him.", "Woh rich nahi bana. Lekin pehli baar month usko control nahi kar raha tha.", "वह अमीर नहीं बना। लेकिन पहली बार महीना उसे कंट्रोल नहीं कर रहा था।"],
      ["Your money does not need drama. It needs direction. " + cta, "Paisa drama nahi maangta. Direction maangta hai. " + cta, "पैसे को ड्रामा नहीं, दिशा चाहिए। " + cta],
    ],
    "Crypto Finance": [
      ["He saw one coin pumping and thought, this is my chance to become rich fast.", "Usne ek coin pump hota dekha aur socha, bas yahi chance hai rich banne ka.", "उसने एक कॉइन पंप होते देखा और सोचा, यही मौका है जल्दी अमीर बनने का।"],
      ["He did not check the project. He did not check the risk. He only checked the green candle.", "Na project check kiya, na risk. Sirf green candle dekhi.", "उसने प्रोजेक्ट नहीं देखा, रिस्क नहीं देखा। बस ग्रीन कैंडल देखी।"],
      ["Five minutes later, he entered. Ten minutes later, the chart stopped moving up.", "5 minute baad entry li. 10 minute baad chart upar jaana band ho gaya.", "पाँच मिनट बाद उसने एंट्री ली। दस मिनट बाद चार्ट ऊपर जाना बंद हो गया।"],
      ["Then the group chat went silent, and his profit turned into panic.", "Phir group chat silent ho gaya, aur profit panic me badal gaya.", "फिर ग्रुप चैट शांत हो गया, और प्रॉफिट पैनिक में बदल गया।"],
      ["That day he learned the most expensive crypto lesson: hype is not a strategy.", "Us din usne sabse expensive crypto lesson seekha: hype strategy nahi hoti.", "उस दिन उसने सबसे महंगा क्रिप्टो लेसन सीखा: हाइप कोई स्ट्रैटेजी नहीं होती।"],
      ["Next time, he wrote three rules before buying: risk, reason, and exit.", "Next time usne buy karne se pehle 3 rules likhe: risk, reason, exit.", "अगली बार खरीदने से पहले उसने तीन नियम लिखे: रिस्क, रीजन और एग्जिट।"],
      ["He still watched charts. But now he stopped chasing every candle like a lottery ticket.", "Woh charts abhi bhi dekhta tha. Lekin har candle ko lottery ticket samajhna band kar diya.", "वह चार्ट अब भी देखता था। लेकिन हर कैंडल को लॉटरी टिकट समझना बंद कर दिया।"],
      ["Crypto can build wealth, but FOMO can burn it faster. " + cta, "Crypto wealth bana sakta hai, but FOMO usse fast jala sakta hai. " + cta, "क्रिप्टो वेल्थ बना सकता है, लेकिन FOMO उसे बहुत तेज़ जला सकता है। " + cta],
    ],
    "Business Stories": [
      ["He opened a small business and thought sales meant success.", "Usne small business start kiya aur socha sales matlab success.", "उसने छोटा बिजनेस शुरू किया और सोचा कि सेल्स मतलब सक्सेस।"],
      ["Every day customers came in, but somehow his bank balance stayed weak.", "Customers roz aa rahe the, but bank balance weak hi tha.", "हर दिन कस्टमर आ रहे थे, लेकिन बैंक बैलेंस फिर भी कमजोर था।"],
      ["The problem was hidden in discounts, delivery cost, damaged stock, and unpaid credit.", "Problem discounts, delivery cost, damaged stock aur udhaar me chhupi thi.", "समस्या डिस्काउंट, डिलीवरी कॉस्ट, खराब स्टॉक और उधार में छिपी थी।"],
      ["One night he realized: revenue was loud, but profit was whispering.", "Ek raat usko samajh aaya: revenue loud tha, profit whisper kar raha tha.", "एक रात उसे समझ आया: रेवेन्यू शोर कर रहा था, लेकिन प्रॉफिट धीरे बोल रहा था।"],
      ["So he stopped asking, how much did I sell, and started asking, how much did I keep?", "Phir usne poochna band kiya kitna becha, aur poochna start kiya kitna bacha.", "फिर उसने ये पूछना बंद किया कि कितना बेचा, और पूछना शुरू किया कि कितना बचा।"],
      ["He cut one loss-making offer, tracked cashflow, and stopped giving blind credit.", "Usne ek loss-making offer band kiya, cashflow track kiya, aur blind udhaar rok diya.", "उसने एक घाटे वाला ऑफर बंद किया, कैशफ्लो ट्रैक किया और अंधा उधार रोक दिया।"],
      ["Sales dropped a little, but profit finally started breathing.", "Sales thodi kam hui, but profit finally breathe karne laga.", "सेल्स थोड़ी कम हुई, लेकिन प्रॉफिट आखिर सांस लेने लगा।"],
      ["A business does not die when sales are low. It dies when profit is invisible. " + cta, "Business low sales se nahi marta. Invisible profit se marta hai. " + cta, "बिजनेस कम सेल्स से नहीं मरता। वह तब मरता है जब प्रॉफिट दिखता ही नहीं। " + cta],
    ],
    "Stock Market": [
      ["He bought a stock because everyone online said it was going to explode.", "Usne stock buy kiya kyunki online sab bol rahe the explode karega.", "उसने स्टॉक खरीदा क्योंकि ऑनलाइन सब बोल रहे थे कि ये बहुत ऊपर जाएगा।"],
      ["For two days the chart went up, and he started feeling like a genius.", "2 din chart upar gaya, aur usko laga woh genius hai.", "दो दिन चार्ट ऊपर गया और उसे लगा कि वह जीनियस है।"],
      ["Then one red candle erased his confidence faster than his profit.", "Phir ek red candle ne profit se pehle confidence erase kar diya.", "फिर एक लाल कैंडल ने प्रॉफिट से भी तेज़ उसका कॉन्फिडेंस मिटा दिया।"],
      ["The mistake was not buying. The mistake was buying without a reason.", "Mistake buy karna nahi tha. Mistake bina reason ke buy karna tha.", "गलती खरीदना नहीं था। गलती बिना वजह खरीदना था।"],
      ["He stopped asking, will it go up, and started asking, why should it go up?", "Usne poochna band kiya upar jayega kya, aur poochna start kiya upar kyu jayega.", "उसने पूछना बंद किया कि ऊपर जाएगा क्या, और पूछना शुरू किया कि ऊपर क्यों जाएगा।"],
      ["That one question saved him from three bad trades in one week.", "Ek question ne usko ek week me 3 bad trades se bacha liya.", "उस एक सवाल ने उसे एक हफ्ते में तीन खराब ट्रेड से बचा लिया।"],
      ["He still invested, but now the chart was not controlling his emotions.", "Woh invest abhi bhi karta tha, but chart ab uske emotions control nahi karta tha.", "वह अब भी निवेश करता था, लेकिन चार्ट अब उसके इमोशन कंट्रोल नहीं करता था।"],
      ["The market rewards patience more than excitement. " + cta, "Market excitement se zyada patience ko reward karta hai. " + cta, "मार्केट एक्साइटमेंट से ज़्यादा धैर्य को रिवॉर्ड करता है। " + cta],
    ],
    "Debt & Credit": [
      ["He swiped the card once and told himself, I will pay it next month.", "Usne card swipe kiya aur bola next month pay kar dunga.", "उसने कार्ड स्वाइप किया और खुद से कहा, अगले महीने भर दूंगा।"],
      ["Next month came, but so did another bill, another offer, and another excuse.", "Next month aaya, saath me bill, offer aur excuse bhi aa gaya.", "अगला महीना आया, लेकिन साथ में एक और बिल, एक और ऑफर और एक और बहाना भी आ गया।"],
      ["The minimum payment looked helpful, but it quietly kept him inside the trap.", "Minimum payment helpful lag raha tha, but wahi trap ke andar rakh raha tha.", "मिनिमम पेमेंट मदद जैसा लग रहा था, लेकिन वही उसे ट्रैप में रख रहा था।"],
      ["Soon he was not buying products. He was buying time with interest.", "Phir woh products nahi kharid raha tha. Woh interest ke saath time kharid raha tha.", "फिर वह प्रोडक्ट नहीं खरीद रहा था। वह ब्याज के साथ समय खरीद रहा था।"],
      ["He finally listed every debt from smallest to most painful.", "Finally usne har debt list kiya, smallest se most painful tak.", "आखिर उसने हर कर्ज को लिखा, सबसे छोटे से सबसे दर्दनाक तक।"],
      ["Then he attacked one payment at a time instead of panicking about all of them.", "Phir usne ek-ek payment attack ki, sabko dekhkar panic nahi kiya.", "फिर उसने एक-एक पेमेंट पर काम किया, सबको देखकर पैनिक नहीं किया।"],
      ["The debt did not vanish in one day, but the fear started shrinking.", "Debt ek din me vanish nahi hua, but fear shrink hona start ho gaya.", "कर्ज एक दिन में गायब नहीं हुआ, लेकिन डर कम होना शुरू हो गया।"],
      ["Credit is useful only when you control it. Otherwise, it controls you. " + cta, "Credit tab useful hai jab tum control karo. Warna woh tumhe control karta hai. " + cta, "क्रेडिट तभी काम का है जब कंट्रोल आपके हाथ में हो। वरना वह आपको कंट्रोल करता है। " + cta],
    ],
  };

  const fallback = nicheScripts["Personal Finance"];
  const selected = nicheScripts[nicheName] || fallback;
  const langIndex = language === "hi" ? 2 : language === "hinglish" ? 1 : 0;
  return selected.map((scene) => scene[langIndex]);
}

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

function getSavedSettings() {
  try {
    const saved = localStorage.getItem(SAVED_SETTINGS_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(SAVED_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    console.log("Settings storage unavailable");
  }
}

function getSavedPack() {
  try {
    const saved = localStorage.getItem(SAVED_PACK_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function savePack(pack) {
  try {
    localStorage.setItem(SAVED_PACK_KEY, JSON.stringify(pack));
  } catch {
    console.log("Pack storage unavailable");
  }
}

function humanizeLine(text, language) {
  if (language === "hi") {
    const map = {
      "Your salary is not small. Your money is leaking. Most people notice it only when the account is almost empty.": "आपकी सैलरी छोटी नहीं है। असली दिक्कत ये है कि पैसा धीरे-धीरे लीक हो रहा है। ज़्यादातर लोगों को ये तब समझ आता है जब अकाउंट लगभग खाली हो चुका होता है।",
      "Salary comes in. For one day, everything feels safe. Then the spending starts quietly.": "सैलरी आती है और एक दिन के लिए सब ठीक लगता है। फिर खर्चे चुपचाप शुरू हो जाते हैं।",
      "Food orders, subscriptions, shopping, small EMIs... none look dangerous alone.": "फूड ऑर्डर, सब्सक्रिप्शन, शॉपिंग, छोटी-छोटी EMI... अकेले में कुछ भी खतरनाक नहीं लगता।",
      "But together, they become a hole in your pocket that never stops growing.": "लेकिन ये सब मिलकर आपकी जेब में ऐसा छेद बना देते हैं जो बढ़ता ही जाता है।",
      "He thought he needed more income. The truth was, he needed a money system.": "उसे लगा कि उसे ज़्यादा कमाई चाहिए। असल में उसे एक सही मनी सिस्टम चाहिए था।",
      "So he tracked seven days of spending and found three silent leaks instantly.": "उसने सिर्फ सात दिन के खर्चे लिखे और तुरंत तीन ऐसे खर्चे पकड़ लिए जो चुपचाप पैसा खा रहे थे।",
      "He did not become rich overnight. But for the first time, his money stopped disappearing.": "वह रातों-रात अमीर नहीं बना। लेकिन पहली बार उसका पैसा गायब होना बंद हुआ।",
    };
    return map[text] || text;
  }

  if (language === "hinglish") {
    const map = {
      "Your salary is not small. Your money is leaking. Most people notice it only when the account is almost empty.": "Tumhari salary chhoti nahi hai. Problem ye hai ki paisa dheere-dheere leak ho raha hai. Aur zyada logon ko ye tab samajh aata hai jab account almost empty ho chuka hota hai.",
      "Salary comes in. For one day, everything feels safe. Then the spending starts quietly.": "Salary aati hai, aur ek din ke liye sab safe lagta hai. Phir spending quietly start ho jaati hai.",
      "Food orders, subscriptions, shopping, small EMIs... none look dangerous alone.": "Food orders, subscriptions, shopping, chhoti EMIs... akela dekho to kuch bhi dangerous nahi lagta.",
      "But together, they become a hole in your pocket that never stops growing.": "Lekin ye sab milke pocket me aisa hole bana dete hain jo rukta hi nahi.",
      "He thought he needed more income. The truth was, he needed a money system.": "Usko laga income badhani padegi. Reality ye thi ki usko ek money system chahiye tha.",
      "So he tracked seven days of spending and found three silent leaks instantly.": "Usne sirf 7 din ke expenses track kiye, aur turant 3 silent leaks mil gaye.",
      "He did not become rich overnight. But for the first time, his money stopped disappearing.": "Woh overnight rich nahi bana. Lekin pehli baar uska paisa disappear hona band hua.",
    };
    return map[text] || text;
  }

  return text;
}

function createFinanceShort(style, nicheName, language = "en") {
  const niche = NICHES.find((item) => item.name === nicheName) || NICHES[0];
  const topic = randomItem(TOPICS);
  const structure = randomItem(STORY_STRUCTURES);
  const location = randomItem(LOCATIONS);
  const emotion = randomItem(EMOTIONS);
  const moneyObject = randomItem(MONEY_OBJECTS);
  const uniqueVideoId = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
  const humanVoice = buildHumanVoiceLines(topic, niche.name, language);

  const baseVisuals = [style, niche.name + " niche", niche.focus, structure, location, emotion + " emotion", moneyObject + " visual theme", CHARACTER_LOCK];

  const scriptLines = [
    {
      time: "0:00 - 0:05",
      beat: "Hook",
      voice: humanVoice[0],
      image: makePrompt(["Vertical 9:16 opening finance scene", ...baseVisuals, "black stick-figure character staring at phone showing low bank balance", "dramatic shadows", "no text", "no logos"]),
      video: makeSceneVideo("Slow push-in on the black stick character. Phone glow increases. Character freezes in shock. Add subtle money smoke in background."),
    },
    {
      time: "0:05 - 0:10",
      beat: "Salary Moment",
      voice: humanVoice[1],
      image: makePrompt(["Vertical 9:16 finance scene", ...baseVisuals, "same black stick-figure character holding phone with salary credited notification glow", "hopeful mood", "no text", "no logos"]),
      video: makeSceneVideo("Notification glow pulses on phone. Character posture changes from happy to unsure. Background slightly zooms."),
    },
    {
      time: "0:10 - 0:15",
      beat: "Money Leak",
      voice: humanVoice[2],
      image: makePrompt(["Vertical 9:16 finance scene", ...baseVisuals, "same black stick-figure character surrounded by food boxes, shopping bags, subscription icons", "coins leaking from wallet", "no brand logos", "no text"]),
      video: makeSceneVideo("Objects slowly orbit around character. Coins fall from wallet one by one. Character looks confused."),
    },
    {
      time: "0:15 - 0:20",
      beat: "Trap Reveal",
      voice: humanVoice[3],
      image: makePrompt(["Vertical 9:16 dramatic finance scene", ...baseVisuals, "same black stick-figure character standing over a black hole shaped like a wallet", "money falling into it", "dark cinematic background", "no text"]),
      video: makeSceneVideo("Camera tilts down toward wallet hole. Money falls into darkness. Character steps back in fear."),
    },
    {
      time: "0:20 - 0:25",
      beat: "Realization",
      voice: humanVoice[4],
      image: makePrompt(["Vertical 9:16 emotional finance scene", ...baseVisuals, "same black stick-figure character sitting at table with notebook, calculator, phone, expense list symbols", "warm lamp light", "no text"]),
      video: makeSceneVideo("Character writes in notebook. Calculator buttons tap. Warm light flickers softly. Focus pull from phone to notebook."),
    },
    {
      time: "0:25 - 0:30",
      beat: "Simple Fix",
      voice: humanVoice[5],
      image: makePrompt(["Vertical 9:16 finance improvement scene", ...baseVisuals, "same black stick-figure character pointing at notebook with three circled expense leaks", "clean desk", "focused mood", "no readable text", "no logos"]),
      video: makeSceneVideo("Three circles appear as simple shapes on notebook. Character points at them. Camera pushes in. No readable text."),
    },
    {
      time: "0:30 - 0:35",
      beat: "Transformation",
      voice: humanVoice[6],
      image: makePrompt(["Vertical 9:16 transformation finance scene", ...baseVisuals, "same black stick-figure character calmly looking at rising simple graph on laptop", "clean room", "hopeful lighting", "no text"]),
      video: makeSceneVideo("Simple graph rises slowly on laptop. Character smiles with simple white mouth. Lighting becomes brighter."),
    },
    {
      time: "0:35 - 0:40",
      beat: "Twist + CTA",
      voice: humanVoice[7],
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
    hashtags: niche.hashtags,
    videoLength: VIDEO_SECONDS + " seconds",
    sceneFormat: TOTAL_SCENES + " scenes x " + SCENE_SECONDS + " seconds each",
  };

  return {
    generatedAt: new Date().toLocaleTimeString(),
    uniqueVideoId,
    niche,
    language,
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
  const savedSettings = getSavedSettings();
  const savedPack = getSavedPack();
  const [style, setStyle] = useState(savedSettings?.style || NICHE_VISUAL_STYLES[NICHES[0].name][0]);
  const [niche, setNiche] = useState(savedSettings?.niche || NICHES[0].name);
  const [language, setLanguage] = useState(savedSettings?.language || "en");
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [pack, setPack] = useState(() => savedPack || createFinanceShort(savedSettings?.style || NICHE_VISUAL_STYLES[NICHES[0].name][0], savedSettings?.niche || NICHES[0].name, savedSettings?.language || "en"));
  const [copied, setCopied] = useState("");

  const selfTests = useMemo(() => runSelfTests(pack), [pack]);
  const allTestsPassed = selfTests.every((test) => test.pass);
  const statusText = autoGenerate ? "Auto pipeline ON - new 40-second video pack every 5 minutes" : "Auto pipeline OFF";

  useEffect(() => {
    if (!autoGenerate) return undefined;
    const interval = window.setInterval(() => {
      const newPack = createFinanceShort(style, niche, language);
      setPack(newPack);
      savePack(newPack);
    }, 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [autoGenerate, style, niche, language]);

  useEffect(() => {
    saveSettings({ style, niche, language });
  }, [style, niche, language]);

  useEffect(() => {
    savePack(pack);
  }, [pack]);

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
            <label style={STYLES.label}>Choose Niche</label>
            <select value={niche} onChange={(event) => {
                const selectedNiche = event.target.value;
                setNiche(selectedNiche);
                setStyle(NICHE_VISUAL_STYLES[selectedNiche][0]);
              }} style={STYLES.input}>
              {NICHES.map((item) => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>

          <div style={STYLES.panel}>
            <label style={STYLES.label}>Language</label>
            <select value={language} onChange={(event) => setLanguage(event.target.value)} style={STYLES.input}>
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>{item.label}</option>
              ))}
            </select>
          </div>

          <div style={STYLES.panel}>
            <label style={STYLES.label}>Visual Style</label>
            <select value={style} onChange={(event) => setStyle(event.target.value)} style={STYLES.input}>
              {(NICHE_VISUAL_STYLES[niche] || []).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => {
            const newPack = createFinanceShort(style, niche, language);
            setPack(newPack);
            savePack(newPack);
          }} style={STYLES.buttonYellow}>Generate New 40-Sec Video</button>
          <button type="button" onClick={() => setAutoGenerate((value) => !value)} style={autoGenerate ? STYLES.buttonRed : STYLES.buttonGreen}>{autoGenerate ? "Stop Auto Generate" : "Start 5-Min Auto Generate"}</button>
        </section>

        <div style={STYLES.panel}><span style={{ color: COLORS.green, fontWeight: 900 }}>Status:</span> {statusText} - Last generated: {pack.generatedAt}</div>

        <section style={STYLES.grid3}>
          <InfoCard title="Niche" value={pack.niche.name} />
          <InfoCard title="Language" value={(LANGUAGES.find((item) => item.code === pack.language) || LANGUAGES[0]).label} />
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
