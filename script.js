// ========== YOUR PORTFOLIO DATA (EDIT THIS!) ==========
const portfolioContext = `
"You are a helpful, professional voice assistant and career advocate for Syed Amjad. 
Your goal is to represent Syed to HR managers and Design Leads. 
Answer questions concisely based ONLY on the following information:

About Me: 
- Name: Syed Amjad
- Job Title: UI/UX Designer (with a background in Sales and Vibe coding development)
- Location: Bangalore, India (Ready for immediate relocation to the UAE)
- Bio: Syed is a business-minded designer with 3+ years of experience. He performed a strategic pivot from Sales to UI/UX, which allows him to design products that aren't just beautiful but also drive ROI and conversion. He focuses on a 'Holistic Approach' that balances Business Logic, Technical Feasibility, and User Empathy.

Technical Skills: 
- Design: Figma (100% proficiency), Wireframing (100%), Design Systems, Prototyping.
- No-Code Deployment: Expert in Framer and Wix Studio for rapid high-fidelity shipping.
- Code & Logic: Bachelor of Computer Applications (BCA) with a 40-hour Full-Stack Java certification. Proficient in React and Tailwind CSS.
- UX Methods: User Research, Usability Testing, Information Architecture, and Empathy Mapping.

Portfolio Projects (Core Focus):
- IOTSecure Monitor: A high-density Security & Infrastructure dashboard designed for 24/7 monitoring and data clarity.
- FlowOps AI: An enterprise-grade workflow management ecosystem. Optimized for scaling complex structural logic into seamless user flows.
- Finspring: A high-trust Fintech/Digital Banking site focusing on secure financial flows and scalable UI systems.

Professional Experience:
- Lead UI/UX Designer at AvadheshCo (Present): Driving business consulting and brand landing experiences for early-stage startups.
- Lead UI/UX Designer at TechEnhance (2024 - 2025): Spearheaded design for AI chatbots, Fintech apps, and IoT platforms.
- UI/UX Designer at Brain Quest (2023 - 2024): Collaborated with UAE-based teams on enterprise dashboard projects.
- Sales Executive & Manager (2020 - 2023): Gained deep insights into client psychology and business conversion goals.

Education & Certifications:
- Bachelor of Computer Application (BCA), SVR College (2017-2020).
- UI UX Design Certification, Designerrs Academy (2023).
- Full-Stack Java Certification: Specialized in OOP, JS, and data handling logic.

Key Career Metrics:
- 35+ Projects Shipped
- 28+ International Clients Partnered
- 3+ Years of experience in AI, Fintech, and SaaS.

Contact & Social:
- Email: syed.uiuxdesigner@gmail.com
- Phone: +91 8546875458
- Portfolio: https://syedamjadsh.netlify.app/
- LinkedIn: https://www.linkedin.com/in/syedamjad-designer/

Languages: English, Hindi, Professional awareness of Gulf Market design standards.

Interaction Style:
- Keep answers professional, enthusiastic, and under 3 sentences. 
- If someone asks why they should hire Syed, emphasize his 'Sales-to-Design' pivot and his ability to collaborate directly with developers because he understands code.";

// ========== NO NEED TO EDIT BELOW THIS LINE ==========
let recognition = null;
let isListening = false;
let selectedLanguage = 'en-US';

const micBtn = document.getElementById('micButton');
const statusDiv = document.getElementById('status');
const chatArea = document.getElementById('chatArea');
const languageSelect = document.getElementById('languageSelect');

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function speakResponse(text, lang) {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  // Choose a male voice if available
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    let male = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && v.name.toLowerCase().includes('male'));
    if (male) utterance.voice = male;
    window.speechSynthesis.speak(utterance);
  };
  if (window.speechSynthesis.getVoices().length) setVoice();
  else window.speechSynthesis.onvoiceschanged = setVoice;
}

async function callBackend(userMessage, lang) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, language: lang, context: portfolioContext })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Backend error');
  return data.reply;
}

async function processVoice(transcript) {
  addMessage(transcript, 'user');
  statusDiv.textContent = '● Thinking...';
  try {
    const aiReply = await callBackend(transcript, selectedLanguage);
    addMessage(aiReply, 'assistant');
    statusDiv.textContent = '● Speaking...';
    speakResponse(aiReply, selectedLanguage);
    setTimeout(() => { if (!window.speechSynthesis.speaking) statusDiv.textContent = '● Ready'; }, 500);
  } catch (err) {
    addMessage(`Error: ${err.message}`, 'assistant');
    statusDiv.textContent = '● Error';
    setTimeout(() => statusDiv.textContent = '● Ready', 2000);
  }
}

function initSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    statusDiv.textContent = '✖ Browser not supported';
    return null;
  }
  const recog = new SpeechRecognition();
  recog.continuous = false;
  recog.interimResults = false;
  recog.lang = selectedLanguage;
  recog.onstart = () => { isListening = true; statusDiv.textContent = '● Listening...'; micBtn.style.background = '#ef4444'; };
  recog.onerror = (e) => { statusDiv.textContent = `● Error: ${e.error}`; isListening = false; micBtn.style.background = '#1e293b'; };
  recog.onend = () => { isListening = false; micBtn.style.background = '#1e293b'; if (statusDiv.textContent === '● Listening...') statusDiv.textContent = '● Ready'; };
  recog.onresult = (e) => { const text = e.results[0][0].transcript; if (text.trim()) processVoice(text); };
  return recog;
}

// Push-to-talk
let pressTimer;
micBtn.addEventListener('mousedown', () => { pressTimer = setTimeout(() => { if (!recognition) recognition = initSpeech(); recognition.lang = selectedLanguage; recognition.start(); }, 50); });
micBtn.addEventListener('mouseup', () => { clearTimeout(pressTimer); if (isListening) recognition.stop(); });
micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); pressTimer = setTimeout(() => { if (!recognition) recognition = initSpeech(); recognition.lang = selectedLanguage; recognition.start(); }, 50); });
micBtn.addEventListener('touchend', (e) => { e.preventDefault(); clearTimeout(pressTimer); if (isListening) recognition.stop(); });

languageSelect.addEventListener('change', (e) => { selectedLanguage = e.target.value; if (recognition) recognition.lang = selectedLanguage; statusDiv.textContent = `● Language: ${e.target.options[e.target.selectedIndex].text}`; setTimeout(() => { if (statusDiv.textContent.includes('Language')) statusDiv.textContent = '● Ready'; }, 1500); });

window.addEventListener('load', () => { recognition = initSpeech(); });
