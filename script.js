// ========== YOUR PORTFOLIO DATA (EDIT THIS!) ==========
const portfolioContext = `
You are a helpful voice assistant for [Your Name]. Answer based ONLY on the info below.
Name: [Your Name]
Title: [Your Job Title, e.g. UI/UX Designer]
Skills: [List 3-5 skills, e.g. Figma, Adobe XD, HTML/CSS, User Research]
Projects:
- [Project 1]: [Short description]
- [Project 2]: [Short description]
Experience: [Your past roles, 2-3 lines]
Contact: [Your email or LinkedIn]
Keep answers short, friendly, and under 3 sentences.
`;

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