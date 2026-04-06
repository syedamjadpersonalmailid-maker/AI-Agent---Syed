// ========== INTERVIEW PRO HR - PROFESSIONAL AI INTERVIEW PLATFORM ==========

// ========== LOCALIZATION STRINGS ==========
const translations = {
  'en-US': {
    candidateName: 'Candidate Name',
    position: 'Position Applied For',
    interviewMode: 'Interview Mode',
    structured: 'Structured (5 Questions)',
    freeform: 'Free-form Conversation',
    startInterview: 'Start Interview',
    support: 'Support',
    supportText: 'Need help? Your answers are kept confidential and secure.',
    interviewSession: 'Interview Session',
    welcome: 'Welcome to InterviewPro HR',
    welcomeText: 'This is an AI-powered interview platform designed for professional candidate assessment.',
    feature1: '✓ Multi-language support (English, Arabic, Hindi)',
    feature2: '✓ Real-time voice recognition and AI-powered responses',
    feature3: '✓ Complete interview history and transcripts',
    feature4: '✓ Enterprise-grade security & confidentiality',
    welcomeHint: 'Please configure the interview settings on the left to begin.',
    holdToTalk: 'Hold to talk',
    ready: 'Ready',
    send: 'Send',
    endInterview: 'End Interview',
    saveTranscript: 'Save Transcript',
    listeningState: 'Listening...',
    processingState: 'Processing...',
    speakingState: 'Speaking...',
    errorState: 'Error',
    noMicSupport: '✖ Microphone not supported on this browser',
  },
  'ar-AE': {
    candidateName: 'اسم المرشح',
    position: 'الوظيفة المتقدم إليها',
    interviewMode: 'وضع المقابلة',
    structured: 'مقابلة منظمة (5 أسئلة)',
    freeform: 'محادثة حرة',
    startInterview: 'بدء المقابلة',
    support: 'الدعم',
    supportText: 'هل تحتاج إلى مساعدة؟ إجاباتك محمية وسرية.',
    interviewSession: 'جلسة المقابلة',
    welcome: 'مرحبا بك في InterviewPro HR',
    welcomeText: 'منصة مقابلات مدعومة بالذكاء الاصطناعي مصممة لتقييم المرشحين بشكل احترافي.',
    feature1: '✓ دعم متعدد اللغات (الإنجليزية والعربية والهندية)',
    feature2: '✓ التعرف على الكلام في الوقت الفعلي والردود المدعومة بالذكاء الاصطناعي',
    feature3: '✓ سجل كامل للمقابلات والنسخ المكتوبة',
    feature4: '✓ أمان وسرية على مستوى المؤسسات',
    welcomeHint: 'يرجى تكوين إعدادات المقابلة على اليسار للبدء.',
    holdToTalk: 'اضغط للتحدث',
    ready: 'جاهز',
    send: 'إرسال',
    endInterview: 'إنهاء المقابلة',
    saveTranscript: 'حفظ النسخة المكتوبة',
    listeningState: 'استماع...',
    processingState: 'معالجة...',
    speakingState: 'يتحدث...',
    errorState: 'خطأ',
    noMicSupport: '✖ الميكروفون غير مدعوم في المتصفح الحالي',
  },
  'hi-IN': {
    candidateName: 'उम्मीदवार का नाम',
    position: 'आवेदन किए गए पद',
    interviewMode: 'साक्षात्कार मोड',
    structured: 'संरचित साक्षात्कार (5 प्रश्न)',
    freeform: 'मुक्त संवाद',
    startInterview: 'साक्षात्कार शुरू करें',
    support: 'समर्थन',
    supportText: 'सहायता चाहिए? आपके उत्तर सुरक्षित और गोपनीय हैं।',
    interviewSession: 'साक्षात्कार सेशन',
    welcome: 'InterviewPro HR में आपका स्वागत है',
    welcomeText: 'एक AI-संचालित साक्षात्कार मंच जो पेशेवर उम्मीदवार मूल्यांकन के लिए डिज़ाइन किया गया है।',
    feature1: '✓ बहु-भाषा समर्थन (अंग्रेजी, अरबी, हिंदी)',
    feature2: '✓ वास्तविक समय में बोली जाने वाली पहचान और AI-संचालित प्रतिक्रियाएं',
    feature3: '✓ पूर्ण साक्षात्कार इतिहास और प्रतिलेख',
    feature4: '✓ एंटरप्राइज-ग्रेड सुरक्षा और गोपनीयता',
    welcomeHint: 'शुरू करने के लिए बाईं ओर साक्षात्कार सेटिंग्स कॉन्फ़िगर करें।',
    holdToTalk: 'बोलने के लिए दबाएं',
    ready: 'तैयार',
    send: 'भेजें',
    endInterview: 'साक्षात्कार समाप्त करें',
    saveTranscript: 'प्रतिलेख सहेजें',
    listeningState: 'सुनना जारी है...',
    processingState: 'प्रोसेसिंग...',
    speakingState: 'बोल रहे हैं...',
    errorState: 'त्रुटि',
    noMicSupport: '✖ इस ब्राउज़र में माइक्रोफोन समर्थित नहीं है',
  }
};

// ========== PORTFOLIO CONTEXT FOR AI ==========
const portfolioContext = `
"You are a professional HR Interview Assistant conducting structured interviews for candidates.
Your role is to evaluate candidates fairly, ask clarifying follow-up questions, and assess their fit for the role.
Maintain a professional, respectful tone at all times.

About Our Company Process:
- We conduct professional, confidential interviews
- We value honesty, enthusiasm, and problem-solving mindset
- Questions should be challenging but fair
- Always provide constructive feedback

Candidate Context:
This interview is conducted by InterviewPro HR - a professional assessment platform.
Keep responses concise (max 3 sentences per turn) and focus on evaluation rather than selling.
If you don't understand a response, ask clarifying questions.
Maintain professional neutrality.";
`;

// ========== STATE MANAGEMENT ==========
let state = {
  currentLanguage: 'en-US',
  isInterviewActive: false,
  isListening: false,
  candidateName: '',
  selectedRole: '',
  interviewMode: 'structured',
  questionCount: 0,
  awaitingAnswer: false,   // true after a question is asked, waiting for user reply
  transcript: [],
  recognition: null,
  recordingTime: 0,
  timerInterval: null,
};

// ========== DOM ELEMENTS ==========
const els = {
  languageToggle: document.querySelectorAll('.lang-btn'),
  startBtn: document.getElementById('startInterviewBtn'),
  exitBtn: document.getElementById('exitInterviewBtn'),
  saveBtn: document.getElementById('saveTranscriptBtn'),
  micBtn: document.getElementById('micButton'),
  submitTextBtn: document.getElementById('submitTextBtn'),
  candidateInput: document.getElementById('candidateName'),
  roleSelect: document.getElementById('roleSelect'),
  chatArea: document.getElementById('chatArea'),
  textInput: document.getElementById('textInput'),
  welcomeState: document.getElementById('welcomeState'),
  chatState: document.getElementById('chatState'),
  status: document.getElementById('status'),
  statusText: document.querySelector('.status-text'),
  statusDot: document.querySelector('.status-dot'),
  voiceTimer: document.getElementById('voiceTimer'),
  setupPanel: document.querySelector('.setup-panel'),
  candidateDisplay: document.getElementById('candidateDisplay'),
  questionCounter: document.getElementById('questionCounter'),
  progressFill: document.getElementById('progressFill'),
  micLabel: document.getElementById('micLabel'),
};

// ========== LOCALIZATION SYSTEM ==========
function t(key) {
  return translations[state.currentLanguage]?.[key] || translations['en-US'][key] || key;
}

function updateAllText() {
  document.querySelectorAll('[data-text]').forEach(el => {
    const key = el.getAttribute('data-text');
    el.textContent = t(key);
  });
}

function setLanguage(lang) {
  state.currentLanguage = lang;
  
  // Update HTML lang & dir attributes
  const htmlDir = lang === 'ar-AE' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  document.documentElement.dir = htmlDir;
  
  // Update language toggle UI
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Update all localized text
  updateAllText();
  
  // Update speech recognition language
  if (state.recognition) {
    state.recognition.lang = lang;
  }
}

// ========== INTERVIEW FLOW ==========
function startInterview() {
  const candidateName = els.candidateInput.value.trim();
  const role = els.roleSelect.value;
  
  if (!candidateName) {
    alert(t('candidateName') + ' is required');
    return;
  }
  
  if (!role) {
    alert(t('position') + ' is required');
    return;
  }
  
  // Read interview mode from DOM (radio buttons)
  const modeRadio = document.querySelector('input[name="mode"]:checked');
  state.interviewMode = modeRadio ? modeRadio.value : 'structured';

  state.candidateName = candidateName;
  state.selectedRole = role;
  state.isInterviewActive = true;
  state.questionCount = 0;
  state.awaitingAnswer = false;
  state.transcript = [];
  
  // Update UI
  els.welcomeState.classList.remove('active');
  els.chatState.classList.add('active');
  els.chatArea.innerHTML = '';
  els.candidateDisplay.textContent = `${candidateName} • ${role}`;
  els.setupPanel.style.pointerEvents = 'none';
  els.setupPanel.style.opacity = '0.5';
  
  // Add welcome message
  addMessage(t('welcome') + ' - ' + candidateName, 'assistant');
  state.transcript.push({ sender: 'assistant', text: t('welcome') });
  
  // Get first question
  askNextQuestion();
}

function askNextQuestion() {
  const questions = [
    'Tell me about your most recent professional experience and what you learned from it.',
    'How do you approach problem-solving when faced with unfamiliar challenges?',
    'Describe a time when you had to collaborate with a difficult team member. How did you handle it?',
    'What motivates you to pursue this role, and how do your skills align with it?',
    'Where do you see yourself in 3-5 years, and how will this role help you get there?'
  ];

  if (state.questionCount >= questions.length) {
    // All questions answered — close out
    const closingMessage = 'Thank you for your time. The interview is now complete. You may save the transcript below.';
    addMessage(closingMessage, 'assistant');
    state.transcript.push({ sender: 'assistant', text: closingMessage });
    state.awaitingAnswer = false;
    speakText(closingMessage);
    return;
  }

  const question = questions[state.questionCount];
  state.questionCount++;
  state.awaitingAnswer = true;

  addMessage(question, 'assistant');
  state.transcript.push({ sender: 'assistant', text: question });
  updateProgressBar();

  // Speak the question
  speakText(question);
}

function updateProgressBar() {
  const progress = (state.questionCount / 5) * 100;
  els.progressFill.style.width = progress + '%';
  els.questionCounter.textContent = `Q ${state.questionCount}/5`;
}

function endInterview() {
  state.isInterviewActive = false;
  els.welcomeState.classList.add('active');
  els.chatState.classList.remove('active');
  els.setupPanel.style.pointerEvents = 'auto';
  els.setupPanel.style.opacity = '1';
  els.candidateDisplay.textContent = '';
  
  // Stop any ongoing speech
  window.speechSynthesis.cancel();
}

function saveTranscript() {
  const transcriptText = state.transcript
    .map(item => `${item.sender.toUpperCase()}: ${item.text}`)
    .join('\n\n');
  
  const fullTranscript = `
INTERVIEW TRANSCRIPT
====================
Candidate: ${state.candidateName}
Role: ${state.selectedRole}
Language: ${state.currentLanguage}
Date: ${new Date().toLocaleString()}

${transcriptText}
`;
  
  const blob = new Blob([fullTranscript], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `interview_${state.candidateName}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ========== UI MESSAGING ==========
function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  els.chatArea.appendChild(msgDiv);
  els.chatArea.scrollTop = els.chatArea.scrollHeight;
}

function updateStatus(statusName) {
  const statuses = {
    ready: { dot: 'ready', text: t('ready') },
    listening: { dot: 'listening', text: t('listeningState') },
    processing: { dot: 'processing', text: t('processingState') },
    speaking: { dot: 'processing', text: t('speakingState') },
    error: { dot: 'error', text: t('errorState') }
  };
  
  const status = statuses[statusName] || statuses.ready;
  els.statusText.textContent = status.text;
  els.statusDot.className = `status-dot ${status.dot}`;
  
  if (statusName === 'listening') {
    els.micBtn.classList.add('recording');
    startRecordingTimer();
  } else {
    els.micBtn.classList.remove('recording');
    stopRecordingTimer();
  }
}

function startRecordingTimer() {
  state.recordingTime = 0;
  state.timerInterval = setInterval(() => {
    state.recordingTime++;
    const mins = Math.floor(state.recordingTime / 60);
    const secs = state.recordingTime % 60;
    els.voiceTimer.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopRecordingTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    els.voiceTimer.textContent = '';
  }
}

// ========== SPEECH SYNTHESIS ==========
function speakText(text) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.currentLanguage;
  utterance.rate = 0.95;
  
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const lang = state.currentLanguage.split('-')[0];
    let voiceFound = voices.find(v => 
      v.lang.startsWith(lang) && 
      (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man'))
    );
    if (voiceFound) utterance.voice = voiceFound;
    window.speechSynthesis.speak(utterance);
  };
  
  updateStatus('speaking');
  
  utterance.onend = () => {
    if (state.isInterviewActive) {
      updateStatus('ready');
    }
  };
  
  if (window.speechSynthesis.getVoices().length) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }
}

// ========== SPEECH RECOGNITION ==========
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    updateStatus('error');
    els.statusText.textContent = t('noMicSupport');
    return null;
  }
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = state.currentLanguage;
  
  recognition.onstart = () => {
    state.isListening = true;
    updateStatus('listening');
  };
  
  recognition.onerror = (e) => {
    updateStatus('error');
    console.error('Speech recognition error:', e.error);
  };
  
  recognition.onend = () => {
    state.isListening = false;
    updateStatus('ready');
  };
  
  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    if (text.trim()) {
      processUserInput(text);
    }
  };
  
  return recognition;
}

async function processUserInput(userText) {
  updateStatus('processing');
  
  // Add user message
  addMessage(userText, 'user');
  state.transcript.push({ sender: 'user', text: userText });
  els.textInput.value = '';
  
  try {
    // Call backend for AI response
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        language: state.currentLanguage,
        context: portfolioContext,
        candidateName: state.candidateName,
        role: state.selectedRole
      })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Backend error');
    
    const aiReply = data.reply;
    addMessage(aiReply, 'assistant');
    state.transcript.push({ sender: 'assistant', text: aiReply });
    
    // Speak the AI acknowledgement, then ask the next question
    state.awaitingAnswer = false;
    speakText(aiReply);

    // Only advance to next question in structured mode after speaking the reply
    if (state.interviewMode === 'structured') {
      const utterance = new SpeechSynthesisUtterance(aiReply);
      utterance.onend = () => {
        setTimeout(() => {
          askNextQuestion();
        }, 800);
      };
    } else {
      updateStatus('ready');
    }
  } catch (err) {
    addMessage('Error: ' + err.message, 'system');
    updateStatus('error');
    console.error('[v0] processUserInput error:', err);
  }
}

// ========== EVENT LISTENERS ==========

// Language toggle
els.languageToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// Interview controls
els.startBtn.addEventListener('click', startInterview);
els.exitBtn.addEventListener('click', endInterview);
els.saveBtn.addEventListener('click', saveTranscript);

// Microphone button (push-to-talk)
let pressTimer;

function tryStartRecording() {
  if (!state.isInterviewActive) {
    // Show a clear message instead of silently failing
    els.statusText.textContent = 'Start the interview first';
    els.statusDot.className = 'status-dot error';
    setTimeout(() => updateStatus('ready'), 2500);
    return;
  }
  if (!state.recognition) state.recognition = initSpeechRecognition();
  if (state.recognition) {
    state.recognition.lang = state.currentLanguage;
    try {
      state.recognition.start();
    } catch (e) {
      // Recognition already started — ignore
    }
  }
}

function tryStopRecording() {
  clearTimeout(pressTimer);
  if (state.isListening && state.recognition) {
    state.recognition.stop();
  }
}

els.micBtn.addEventListener('mousedown', () => {
  pressTimer = setTimeout(tryStartRecording, 50);
});

els.micBtn.addEventListener('mouseup', tryStopRecording);

els.micBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  pressTimer = setTimeout(tryStartRecording, 50);
});

els.micBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  tryStopRecording();
});

// Text input fallback
els.submitTextBtn.addEventListener('click', () => {
  const text = els.textInput.value.trim();
  if (!text) return;
  if (!state.isInterviewActive) {
    els.statusText.textContent = 'Start the interview first';
    els.statusDot.className = 'status-dot error';
    setTimeout(() => updateStatus('ready'), 2500);
    return;
  }
  processUserInput(text);
});

els.textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    els.submitTextBtn.click();
  }
});

// ========== INITIALIZATION ==========
window.addEventListener('load', () => {
  setLanguage('en-US');
  updateStatus('ready');
  updateAllText();
  state.recognition = initSpeechRecognition();
});
