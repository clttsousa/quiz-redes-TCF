(async function(){
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  const els = {
    screenHome: $("#screenHome"),
    screenQuiz: $("#screenQuiz"),
    screenResult: $("#screenResult"),

    selMode: $("#selMode"),
    wrapCategory: $("#wrapCategory"),
    selCategory: $("#selCategory"),
    selCount: $("#selCount"),
    selDifficulty: $("#selDifficulty"),
    chkTimer: $("#chkTimer"),
    wrapTimer: $("#wrapTimer"),
    selTimer: $("#selTimer"),

    btnStart: $("#btnStart"),
    btnPractice: $("#btnPractice"),
    btnQuit: $("#btnQuit"),
    btnSkip: $("#btnSkip"),
    btnClear: $("#btnClear"),
    btnConfirm: $("#btnConfirm"),
    btnNext: $("#btnNext"),

    selHint: $("#selHint"),

    hudLatency: $("#hudLatency"),
    hudLoss: $("#hudLoss"),
    hudThrough: $("#hudThrough"),
    btnTrainErrors: $("#btnTrainErrors"),
    btnRetryWrong: $("#btnRetryWrong"),
    errorModal: $("#errorModal"),
    btnModalClose: $("#btnModalClose"),
    btnModalHome: $("#btnModalHome"),
    btnPrevErr: $("#btnPrevErr"),
    btnNextErr: $("#btnNextErr"),
    btnMarkUnderstood: $("#btnMarkUnderstood"),
    modalCount: $("#modalCount"),
    modalSub: $("#modalSub"),
    mQ: $("#mQ"),
    mMeta: $("#mMeta"),
    mProgress: $("#mProgress"),
    mYour: $("#mYour"),
    mCorrect: $("#mCorrect"),
    mExplain: $("#mExplain"),
    mConcept: $("#mConcept"),
    mTip: $("#mTip"),
    mExample: $("#mExample"),
    mQuiz: $("#mQuiz"),
    mQuizFeedback: $("#mQuizFeedback"),
    modalTop: $("#modalTop"),

    finalRate: $("#finalRate"),
    finalVerdict: $("#finalVerdict"),
    finalLevel: $("#finalLevel"),
    topCats: $("#topCats"),
    weakCats: $("#weakCats"),
    achievements: $("#achievements"),
    catStats: $("#catStats"),
    tabSummary: $("#tabSummary"),
    tabQuestions: $("#tabQuestions"),
    tabCategories: $("#tabCategories"),
    btnAgain: $("#btnAgain"),
    btnHome: $("#btnHome"),

    qIndex: $("#qIndex"),
    qTotal: $("#qTotal"),
    qCategory: $("#qCategory"),
    qDifficulty: $("#qDifficulty"),
    qText: $("#qText"),
    answers: $("#answers"),
    feedback: $("#feedback"),
    progressBar: $("#progressBar"),

    score: $("#score"),
    timerWrap: $("#timerWrap"),
    timer: $("#timer"),

    finalScore: $("#finalScore"),
    finalHits: $("#finalHits"),
    avgTime: $("#avgTime"),
    hitRate: $("#hitRate"),
    review: $("#review"),
    studyGuide: $("#studyGuide"),

    badgeMode: $("#badgeMode"),
    badgeDiff: $("#badgeDiff"),

    bestScore: $("#bestScore"),
    bestStreak: $("#bestStreak"),
    bankCount: $("#bankCount"),

    btnHow: $("#btnHow"),
    btnHow2: $("#btnHow2"),
    modal: $("#modal"),
    modalTitle: $("#modalTitle"),
    modalBody: $("#modalBody"),
    btnCloseModal: $("#btnCloseModal"),

    btnReset: $("#btnReset"),
    btnReset2: $("#btnReset2"),

    btnSound: $("#btnSound"),
    btnMemes: $("#btnMemes"),
    soundState: $("#soundState"),
    memeState: $("#memeState"),
    memeHint: $("#memeHint"),
    memeCard: $("#memeCard"),
    memeImg: $("#memeImg"),
    memeLabel: $("#memeLabel"),
    memeTitle: $("#memeTitle"),
    memeText: $("#memeText"),
    soundHint: $("#soundHint"),

    toast: $("#toast"),
    toastInner: $("#toastInner"),

    fxCanvas: $("#fxCanvas"),
  };

  const KEY_BEST = "redeQuiz:v5:best";
  const KEY_PREF = "redeQuiz:v5:prefs";

  const state = {
    mode: "mixed",
    category: null,
    count: 15,
    difficulty: "all",
    timerEnabled: false,
    timerSeconds: 15,
    practice: false,
    errDeck: [],
    errIndex: 0,
    understood: {},

    deck: [],
    index: 0,
    score: 0,
    hits: 0,
    answered: false,
    selectedIdx: null,
    focusIdx: 0,
    streak: 0,

    best: { score: 0, streak: 0 },
    history: [],
    t0: 0,
    times: [],
    timerId: null,
    remaining: 0,

    soundOn: true,
    studyMode: false,
    memesOn: true,

    confetti: [],
    confettiId: null,
  };

  const memeGood = ["É isso! ⚡","Brabo demais 😎","Aí sim, lenda 🏆","Tá voando 🚀","GG ✅"];
  const memeBad = ["Quase 😅","Sem tilt: revisa e volta 🤝","Aprendeu! ✅","Boa tentativa 🧠","Respira e segue 😄"];
  const memeTimeout = ["Tempo! ⏱️","Cronômetro cruel 😭","Vai na próxima 🧩"];

  function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  const _rngBuf = new Uint32Array(1);
  function randInt(max){
    // Random uniforme (sem viés de módulo) quando crypto está disponível
    if(!Number.isFinite(max) || max <= 0) return 0;
    try{
      if(window.crypto && window.crypto.getRandomValues){
        const range = 0x100000000; // 2^32
        const limit = Math.floor(range / max) * max;
        let x;
        do{
          window.crypto.getRandomValues(_rngBuf);
          x = _rngBuf[0];
        }while(x >= limit);
        return x % max;
      }
    }catch(_){/* fallback */}
    return Math.floor(Math.random()*max);
  }

  function toast(msg){
    els.toastInner.textContent = msg;
    els.toast.classList.remove("opacity-0");
    els.toast.classList.add("opacity-100");
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>{
      els.toast.classList.add("opacity-0");
      els.toast.classList.remove("opacity-100");
    }, 1500);
  }

  function escapeHtml(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  
  function applyRipple(el){
    if(!el) return;
    el.classList.add("ripple");
    el.addEventListener("pointerdown", (ev)=>{
      const rect = el.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--rx", x+"%");
      el.style.setProperty("--ry", y+"%");
      el.classList.remove("rippling");
      // force reflow
      void el.offsetWidth;
      el.classList.add("rippling");
    }, {passive:true});
  }
function catLucide(cat){
    const c = (cat||"").toLowerCase();
    if(c.includes("dns")) return "globe";
    if(c.includes("nat") || c.includes("cgnat") || c.includes("dnat")) return "repeat";
    if(c.includes("dhcp")) return "cpu";
    if(c.includes("tcp") || c.includes("osi")) return "layers";
    if(c.includes("udp")) return "package";
    if(c.includes("sub") || c.includes("máscara") || c.includes("mascara")) return "calculator";
    if(c.includes("wire") || c.includes("wifi") || c.includes("wireless")) return "wifi";
    if(c.includes("fibra") || c.includes("conector")) return "plug";
    if(c.includes("rota") || c.includes("gateway")) return "route";
    if(c.includes("vpn") || c.includes("proxy") || c.includes("ssh")) return "shield";
    if(c.includes("switch")) return "git-branch";
    if(c.includes("rote")) return "router";
    return "network";
  }

  function catIcon(cat){
    const c = (cat||"").toLowerCase();
    if(c.includes("dns")) return "🌐";
    if(c.includes("nat") || c.includes("cgnat") || c.includes("dnat")) return "🔁";
    if(c.includes("dhcp")) return "🧠";
    if(c.includes("tcp") || c.includes("osi")) return "🧩";
    if(c.includes("udp")) return "📦";
    if(c.includes("sub") || c.includes("máscara") || c.includes("mascara")) return "🧮";
    if(c.includes("wire") || c.includes("wifi") || c.includes("wireless")) return "📡";
    if(c.includes("fibra") || c.includes("conector")) return "🧵";
    if(c.includes("rota") || c.includes("gateway")) return "🧭";
    if(c.includes("vpn") || c.includes("proxy") || c.includes("ssh")) return "🛡️";
    return "🛰️";
  }

  function diffLabel(d){
    return d==="very_easy" ? "Muito fácil"
      : d==="easy" ? "Fácil"
      : d==="medium" ? "Médio"
      : d==="hard" ? "Difícil"
      : "Todas";
  }

  function diffBasePoints(d){
    return d==="very_easy" ? 5 : d==="easy" ? 10 : d==="medium" ? 15 : 20;
  }

  function diffThroughput(d){
    // só um detalhe visual no HUD
    return d==="hard" ? "620 Mbps"
      : d==="medium" ? "860 Mbps"
      : d==="very_easy" ? "980 Mbps"
      : "940 Mbps";
  }


  function updateHud(){
    if(!els.hudLatency || !els.hudLoss || !els.hudThrough) return;
    // pseudo realistic values (deterministic-ish by question index)
    const base = 8 + (state.index*3)%22;
    const jitter = Math.floor((Math.sin((Date.now()/1000)+(state.index*1.7))*4)+4);
    const latency = base + jitter;
    const loss = state.timerEnabled ? (Math.random()<0.08 ? "1%" : "0%") : "0%";
    const thr = diffThroughput(state.difficulty);
    els.hudLatency.textContent = `${latency}ms`;
    els.hudLoss.textContent = loss;
    els.hudThrough.textContent = thr;
  }


  
  function applyModeUI(cat){
    const hint = document.getElementById("studyHint");
    if(!hint) return;
    if(!state.studyMode){ hint.classList.add("hidden"); hint.textContent = ""; return; }
    const c = (cat||"").toLowerCase();
    let msg = "Dica: leia com calma e elimine alternativas.";
    if(c.includes("dns")) msg = "Dica (DNS): pense em recursivo vs autoritativo e no fluxo nome → IP.";
    else if(c.includes("nat") || c.includes("cgnat") || c.includes("dnat")) msg = "Dica (NAT/CGNAT): lembre tradução de endereços/portas e diferença entrada (DNAT) vs saída (SNAT).";
    else if(c.includes("sub") || c.includes("máscara") || c.includes("mascara")) msg = "Dica (Sub-rede): foque em rede/host e quantos hosts cabem. Gateway precisa estar na mesma rede.";
    else if(c.includes("wifi") || c.includes("wire")) msg = "Dica (Wi‑Fi): segurança (WPA2/WPA3), canal/interferência e boas práticas de instalação.";
    else if(c.includes("tcp") || c.includes("osi")) msg = "Dica (Camadas): memorize função de cada camada e exemplos de protocolos.";
    else if(c.includes("fibra") || c.includes("conector")) msg = "Dica (Fibra): SC/LC/ST/FC — tamanho, fixação e uso (FTTx vs datacenter vs laboratório).";
    hint.textContent = msg;
    hint.classList.remove("hidden");
  }

function updateMiniMap(cat){
    const mini = document.getElementById("netMini");
    if(!mini) return;
    const steps = Array.from(mini.querySelectorAll(".mini-step"));
    steps.forEach(s=>s.classList.remove("active"));
    const c = (cat||"").toLowerCase();
    // mapping: DNS -> internet, NAT -> router, Wi-Fi -> client, Fibra -> onu/olt, Subrede -> router, TCP/IP -> router/internet
    let active = ["router"];
    if(c.includes("dns")) active = ["internet"];
    else if(c.includes("nat") || c.includes("cgnat") || c.includes("dnat")) active = ["router"];
    else if(c.includes("wire") || c.includes("wifi") || c.includes("wireless")) active = ["client"];
    else if(c.includes("fibra") || c.includes("conector")) active = ["onu","olt"];
    else if(c.includes("dhcp")) active = ["router"];
    else if(c.includes("sub") || c.includes("máscara") || c.includes("mascara")) active = ["router"];
    else if(c.includes("tcp") || c.includes("osi") || c.includes("udp")) active = ["router","internet"];
    active.forEach(a=>{
      mini.querySelector(`.mini-step[data-step="${a}"]`)?.classList.add("active");
    });
  }

  function miniQuizTemplate(cat){
    const c=(cat||"").toLowerCase();
    // returns {q, options:[..], correctIdx}
    if(c.includes("dns")){
      return { q:"DNS recursivo faz o quê?", options:["Consulta outros servidores até achar a resposta","Apenas responde pela zona do domínio"], correctIdx:0 };
    }
    if(c.includes("nat") || c.includes("cgnat") || c.includes("dnat")){
      return { q:"DNAT é usado principalmente para…", options:["Redirecionar conexões de entrada para um host interno","Traduzir IP de origem na saída (internet)"], correctIdx:0 };
    }
    if(c.includes("dhcp")){
      return { q:"No DHCP, 'Offer' é…", options:["A oferta de configuração/IP do servidor","A confirmação final do cliente"], correctIdx:0 };
    }
    if(c.includes("udp")){
      return { q:"UDP é melhor quando…", options:["Baixa latência importa mais que confiabilidade","Precisa garantir entrega e ordem"], correctIdx:0 };
    }
    if(c.includes("sub") || c.includes("máscara") || c.includes("mascara")){
      return { q:"Hosts em uma sub-rede geralmente é…", options:["2^(bits host) − 2","2^(bits rede) − 2"], correctIdx:0 };
    }
    if(c.includes("wire") || c.includes("wifi") || c.includes("wireless")){
      return { q:"WPA3 melhora principalmente…", options:["Segurança e proteção contra ataques de senha","Velocidade máxima do Wi‑Fi"], correctIdx:0 };
    }
    if(c.includes("fibra") || c.includes("conector")){
      return { q:"LC é escolhido quando…", options:["Precisa de alta densidade em racks/data center","Quer o mais barato e robusto para FTTx"], correctIdx:0 };
    }
    if(c.includes("rota") || c.includes("gateway")){
      return { q:"Gateway padrão é…", options:["O roteador para sair da rede local","O servidor DNS principal"], correctIdx:0 };
    }
    if(c.includes("tcp") || c.includes("osi")){
      return { q:"TCP/IP 'Internet' equivale mais à camada…", options:["Rede (OSI)","Transporte (OSI)"], correctIdx:0 };
    }
    return { q:"Qual alternativa descreve melhor 'camada' em redes?", options:["Responsabilidade/função no caminho do dado","Apenas um tipo de cabo físico"], correctIdx:0 };
  }

  // ---------- Animations (AAA) ----------
  function hasGsap(){ return typeof window.gsap !== "undefined"; }
  function waPop(el){
    if(!el || !el.animate) return;
    el.animate([
      { transform:'translateY(10px) scale(.98)', opacity:0 },
      { transform:'translateY(0px) scale(1)', opacity:1 }
    ], { duration:260, easing:'cubic-bezier(.2,.9,.2,1)', fill:'both' });
  }
  function waPulse(el){
    if(!el || !el.animate) return;
    el.animate([
      { transform:'scale(1)' },
      { transform:'scale(1.02)' },
      { transform:'scale(1)' }
    ], { duration:220, easing:'cubic-bezier(.2,.9,.2,1)' });
  }
  function waShake(el){
    if(!el || !el.animate) return;
    el.animate([
      { transform:'translateX(0)' },
      { transform:'translateX(-6px)' },
      { transform:'translateX(6px)' },
      { transform:'translateX(-4px)' },
      { transform:'translateX(0)' }
    ], { duration:320, easing:'cubic-bezier(.2,.9,.2,1)' });
  }

  function anim(target, vars){
    if(!target) return;
    try{
      if(hasGsap()) window.gsap.to(target, vars);
      else{
        // very small fallback
        if(vars.opacity !== undefined) target.style.opacity = String(vars.opacity);
        if(vars.scale !== undefined) target.style.transform = `scale(${vars.scale})`;
      }
    }catch(_){}
  }
  function animFrom(target, vars){
    if(!target) return;
    try{
      if(hasGsap()) window.gsap.from(target, vars);
    }catch(_){}
  }
  function pulse(el){
    if(!el) return;
    if(hasGsap()){
      window.gsap.fromTo(el, {scale:1}, {scale:1.02, duration:0.10, yoyo:true, repeat:1, ease:"power2.out"});
    }else{
      waPulse(el);
    }
  }


  function triggerDataStream(){
    const svg = document.getElementById("dataStream");
    const dot = document.getElementById("dsDot");
    if(!svg || !dot) return;
    svg.style.opacity = "1";
    // restart dot animation
    dot.style.animation = "none";
    void dot.offsetWidth;
    dot.style.animation = "";
    // hide after
    setTimeout(()=>{ svg.style.opacity = "0"; }, 260);
  }
  function staggerInAnswers(){
    const btns = Array.from(document.querySelectorAll('#answers button'));
    if(!btns.length) return;
    if(hasGsap()){
      window.gsap.fromTo(btns, {y:10, opacity:0}, {y:0, opacity:1, duration:0.25, stagger:0.05, ease:'power2.out'});
    }else{
      btns.forEach((b,i)=>{
        if(b.animate){
          b.animate([{transform:'translateY(10px)',opacity:0},{transform:'translateY(0px)',opacity:1}],{duration:260,delay:i*45,easing:'cubic-bezier(.2,.9,.2,1)',fill:'both'});
        }
      });
    }
  }

  function popIn(el){
    if(!el) return;
    if(hasGsap()){
      window.gsap.fromTo(el, {y:10, opacity:0}, {y:0, opacity:1, duration:0.25, ease:"power2.out"});
    }else{
      waPop(el);
    }
  }
  function swipeOutIn(outEl, inEl, cb){
    if(!hasGsap() || !outEl || !inEl){ cb && cb(); return; }
    const tl = window.gsap.timeline({defaults:{ease:"power2.out"}});
    tl.to(outEl, {x:-18, opacity:0, duration:0.18})
      .set(outEl, {x:0})
      .call(()=>cb && cb())
      .fromTo(inEl, {x:18, opacity:0}, {x:0, opacity:1, duration:0.20});
  }

  function show(which){
    const screens = [els.screenHome, els.screenQuiz, els.screenResult];
    const current = screens.find(s=>!s.classList.contains("hidden"));
    const doSwap = ()=>{
      screens.forEach(s=>s.classList.add("hidden"));
      which.classList.remove("hidden");
      window.scrollTo({top:0, behavior:"smooth"});
    };

    // animação AAA entre telas (slide + blur curto)
    if(hasGsap() && current && current !== which){
      const outEl = current;
      const inEl = which;

      // prepara inEl invisível sem "piscar"
      screens.forEach(s=>s.classList.add("hidden"));
      inEl.classList.remove("hidden");
      window.gsap.set(inEl, {opacity:0, x:16, filter:"blur(8px)"});
      window.gsap.set(outEl, {opacity:1, x:0, filter:"blur(0px)"});

      const tl = window.gsap.timeline({defaults:{ease:"power2.out"}});
      tl.to(outEl, {opacity:0, x:-16, filter:"blur(8px)", duration:0.18})
        .call(()=>{ outEl.classList.add("hidden"); })
        .to(inEl, {opacity:1, x:0, filter:"blur(0px)", duration:0.22}, "<0.02");
      window.scrollTo({top:0, behavior:"smooth"});
      return;
    }

    doSwap();
  }

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=randInt(i+1);
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  function distinct(arr){ return Array.from(new Set(arr)); }

  function categories(){
    return distinct(window.QUESTION_BANK.map(q=>q.category))
      .sort((a,b)=>a.localeCompare(b,'pt-BR'));
  }


// ---------- Question bank loader (JSON) ----------
if(!Array.isArray(window.QUESTION_BANK)) window.QUESTION_BANK = [];

async function loadQuestionBank(){
  try{
    const res = await fetch("/questions/bank.json", { cache: "no-store" });
    if(!res.ok) throw new Error("HTTP "+res.status);
    const data = await res.json();
    if(!Array.isArray(data)) throw new Error("Formato inválido: esperado array");
    window.QUESTION_BANK = data;
    return true;
  }catch(err){
    console.error("Falha ao carregar banco de questões:", err);
    window.QUESTION_BANK = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];
    return false;
  }
}

  // ---------- Clean soundpack (WebAudio) ----------
  let audioCtx = null;
  function ensureAudio(){
    if(!audioCtx){
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if(audioCtx.state === "suspended") audioCtx.resume().catch(()=>{});
  }
  function tone(freq, start, dur, type="sine", gain=0.06, pan=0){
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    const biquad = audioCtx.createBiquadFilter();
    const comp = audioCtx.createDynamicsCompressor();

    // optional panner
    const p = (audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null);

    o.type = type;
    o.frequency.setValueAtTime(freq, start);

    // soft low-pass to keep it clean but present
    biquad.type = "lowpass";
    biquad.frequency.setValueAtTime(1800, start);

    // ADSR envelope
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gain, start + 0.018);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    // gentle compression for consistency
    comp.threshold.setValueAtTime(-18, start);
    comp.knee.setValueAtTime(22, start);
    comp.ratio.setValueAtTime(3, start);
    comp.attack.setValueAtTime(0.01, start);
    comp.release.setValueAtTime(0.12, start);

    o.connect(biquad);
    biquad.connect(g);
    if(p){ p.pan.setValueAtTime(pan, start); g.connect(p); p.connect(comp); }
    else { g.connect(comp); }
    comp.connect(audioCtx.destination);

    o.start(start);
    o.stop(start + dur + 0.03);
  }

  function noiseBurst(start, dur, gain=0.03){
    const bufferSize = Math.floor(audioCtx.sampleRate * dur);
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++){
      data[i] = (Math.random()*2-1) * (1 - i/bufferSize);
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    const g = audioCtx.createGain();
    const hp = audioCtx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(600, start);

    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gain, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    src.connect(hp);
    hp.connect(g);
    g.connect(audioCtx.destination);
    src.start(start);
    src.stop(start + dur + 0.02);
  }

  function soundSelect(){ if(!state.soundOn) return; }

function click(){
    if(!state.soundOn) return;
    ensureAudio();
    const t = audioCtx.currentTime;
    tone(420, t, 0.045, "triangle", 0.020, -0.15);
    tone(820, t+0.01, 0.030, "sine", 0.012, 0.15);
  }

  // Som neutro ao confirmar (não revela acerto/erro)
  function soundConfirm(){
    if(!state.soundOn) return;
    ensureAudio();
    const t = audioCtx.currentTime;
    tone(523.25, t, 0.09, "sine", 0.040, 0.0);
    tone(659.25, t+0.05, 0.11, "sine", 0.030, 0.05);
    noiseBurst(t, 0.06, 0.010);
  }

  function soundTimeout(){
    if(!state.soundOn) return;
    ensureAudio();
    const t = audioCtx.currentTime;
    tone(440, t, 0.08, "square", 0.020, -0.1);
    tone(440, t+0.12, 0.08, "square", 0.020, 0.1);
    tone(330, t+0.25, 0.14, "square", 0.020, 0.0);
    noiseBurst(t+0.05, 0.08, 0.012);
  }

  function soundEndGood(){
    if(!state.soundOn) return;
    ensureAudio();
    const t = audioCtx.currentTime;
    // pequeno "jingle" tecnológico (major)
    tone(392.00, t, 0.18, "sine", 0.050, -0.08);      // G4
    tone(523.25, t+0.10, 0.18, "sine", 0.050, 0.02);  // C5
    tone(659.25, t+0.20, 0.20, "sine", 0.050, 0.08);  // E5
    tone(783.99, t+0.30, 0.22, "triangle", 0.040, 0.00); // G5
    noiseBurst(t+0.28, 0.10, 0.012);
  }
  function soundEndMeh(){
    if(!state.soundOn) return;
    ensureAudio();
    const t = audioCtx.currentTime;
    tone(440.00, t, 0.16, "triangle", 0.040, -0.05);
    tone(392.00, t+0.18, 0.20, "triangle", 0.040, 0.05);
    noiseBurst(t+0.08, 0.08, 0.010);
  }
  function soundEndBad(){
    if(!state.soundOn) return;
    ensureAudio();
    const t = audioCtx.currentTime;
    tone(220.00, t, 0.22, "triangle", 0.055, -0.04);
    tone(174.61, t+0.14, 0.26, "triangle", 0.050, 0.04);
    noiseBurst(t+0.02, 0.10, 0.012);
  }

  // ---------- Meme API (opcional) ----------
  // Observação: funciona melhor quando o browser permite requests HTTPS a partir de arquivo local.
  // Se falhar (CORS/offline), cai no fallback de texto.
  function memeSvg({title, subtitle, vibe}){
    const bg = vibe==="good" ? "linear-gradient(135deg, rgba(70,176,255,.22), rgba(11,74,139,.18))"
             : vibe==="bad" ? "linear-gradient(135deg, rgba(251,113,133,.18), rgba(11,74,139,.16))"
             : "linear-gradient(135deg, rgba(250,204,21,.14), rgba(11,74,139,.16))";
    const emoji = vibe==="good" ? "😎" : vibe==="bad" ? "😂" : "🫡";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <style>
          .t{font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;}
        </style>
      </defs>
      <rect width="1200" height="630" fill="#0b1020"/>
      <rect x="0" y="0" width="1200" height="630" fill="${bg}"/>
      <g opacity="0.25" stroke="rgba(255,255,255,.55)">
        <path d="M120 140 L320 90 L520 160 L740 110 L980 170" fill="none"/>
        <path d="M160 300 L360 250 L560 330 L780 280 L1020 340" fill="none"/>
        <path d="M140 470 L340 520 L520 460 L720 540 L980 500" fill="none"/>
        <circle cx="120" cy="140" r="6"/><circle cx="320" cy="90" r="6"/><circle cx="520" cy="160" r="6"/><circle cx="740" cy="110" r="6"/><circle cx="980" cy="170" r="6"/>
        <circle cx="160" cy="300" r="6"/><circle cx="360" cy="250" r="6"/><circle cx="560" cy="330" r="6"/><circle cx="780" cy="280" r="6"/><circle cx="1020" cy="340" r="6"/>
        <circle cx="140" cy="470" r="6"/><circle cx="340" cy="520" r="6"/><circle cx="520" cy="460" r="6"/><circle cx="720" cy="540" r="6"/><circle cx="980" cy="500" r="6"/>
      </g>
      <g class="t">
        <text x="80" y="170" font-size="86" fill="rgba(255,255,255,.95)" font-weight="900">${emoji} ${escapeXml(title)}</text>
        <text x="80" y="250" font-size="42" fill="rgba(255,255,255,.82)" font-weight="700">${escapeXml(subtitle)}</text>
        <text x="80" y="560" font-size="28" fill="rgba(255,255,255,.62)">TCF Telecom • Quiz de Redes</text>
      </g>
    </svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function escapeXml(s){
    return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;");
  }

  
  // ---------- memes (offline + funny) ----------
  const MEME_LOCAL = {
    good: [
      { img: "assets/memes/meme_good_1.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_2.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_3.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_4.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_5.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_6.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_7.svg", title: "", sub: "" },
      { img: "assets/memes/meme_good_8.svg", title: "", sub: "" },
    ],
    meh: [
      { img: "assets/memes/meme_meh_1.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_2.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_3.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_4.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_5.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_6.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_7.svg", title: "", sub: "" },
      { img: "assets/memes/meme_meh_8.svg", title: "", sub: "" },
    ],
    bad: [
      { img: "assets/memes/meme_bad_1.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_2.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_3.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_4.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_5.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_6.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_7.svg", title: "", sub: "" },
      { img: "assets/memes/meme_bad_8.svg", title: "", sub: "" },
    ],
  };

  const CAPTIONS = {
    good: [
      ["Você tá roteando como um ISP", "THR no talo. LOSS 0%. Brabo."],
      ["TCP handshake perfeito", "SYN ✅  SYN-ACK ✅  ACK ✅"],
      ["Sub-rede na veia", "2^h − 2? automático."],
      ["CGNAT? você já sabe a treta", "IPv6 é o caminho 🙏"],
    ],
    meh: [
      ["Tá quase ‘NOC ready’", "Só falta afinar DNS/NAT e Wi‑Fi."],
      ["Ping ok, jitter meio doido", "Dá pra melhorar com prática."],
      ["Boa… mas cuidado com pegadinhas", "UDP vs TCP é clássico."],
      ["Sua OLT piscou e você pensou…", "‘era DHCP ou DNS?’ 😅"],
    ],
    bad: [
      ["Quando o VoIP começa a robotizar", "Jitter + perda = sofrimento."],
      ["Você mandou /24 onde era /30", "Aí explode a rede toda 🧨"],
      ["DNS caiu e você reiniciou o roteador", "Clássico! 😂"],
      ["NAT em loop…", "Bem-vindo ao inferno do troubleshooting."],
    ],
  };

  function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function memeSvg(perf){
    const [t, s] = randomFrom(CAPTIONS[perf] || CAPTIONS.meh);
    const accent = perf==="good" ? "#22c55e" : perf==="bad" ? "#ff4081" : "#46b0ff";
    const badge = perf==="good" ? "GG" : perf==="bad" ? "RIP" : "OK";
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0b1022"/>
          <stop offset="1" stop-color="#050713"/>
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="1280" height="720" fill="url(#g)"/>
      <g opacity="0.55">
        <path d="M0 430 C 220 400, 380 520, 640 470 S 1080 370, 1280 430" stroke="${accent}" stroke-width="4" fill="none" opacity="0.45"/>
        <path d="M0 500 C 220 470, 420 560, 640 520 S 1080 440, 1280 500" stroke="#46b0ff" stroke-width="2" fill="none" opacity="0.20"/>
        <path d="M0 360 C 220 330, 420 420, 640 390 S 1080 290, 1280 360" stroke="#ff4081" stroke-width="2" fill="none" opacity="0.18"/>
      </g>
      <g filter="url(#glow)">
        <rect x="70" y="70" rx="28" ry="28" width="1140" height="580" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)"/>
        <rect x="100" y="110" rx="18" ry="18" width="240" height="56" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
        <text x="220" y="148" text-anchor="middle" font-family="Inter, Arial" font-size="26" fill="rgba(255,255,255,0.80)" font-weight="800">${badge}</text>
        <text x="110" y="250" font-family="Inter, Arial" font-size="56" fill="rgba(255,255,255,0.92)" font-weight="900">${escapeXml(t)}</text>
        <text x="110" y="320" font-family="Inter, Arial" font-size="30" fill="rgba(255,255,255,0.62)" font-weight="800">${escapeXml(s)}</text>

        <g opacity="0.85">
          <circle cx="1020" cy="365" r="7" fill="${accent}"/>
          <circle cx="1052" cy="395" r="5" fill="#46b0ff" opacity="0.8"/>
          <circle cx="990" cy="420" r="6" fill="#ff4081" opacity="0.7"/>
          <path d="M760 470 L1160 470" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
          <text x="760" y="512" font-family="JetBrains Mono, monospace" font-size="18" fill="rgba(255,255,255,0.55)">LOG: packet_loss=${perf==="bad"?"high":"0.0"}% • latency=${perf==="good"?"12":"38"}ms • cgnat=${perf==="good"?"ok":"sus"}</text>
        </g>
      </g>
    </svg>`;
    return svgToDataUri(svg);
  }

  function pickMeme(pct){
    // pct = "score" proxy; choose bucket and then decide local vs generated meme
    let perf = pct >= 80 ? "good" : pct >= 55 ? "meh" : "bad";
    const pool = MEME_LOCAL[perf] || MEME_LOCAL.meh;
    // 50% use local image, 50% generate fresh caption meme for variety
    if(Math.random() < 0.85){
      const m = randomFrom(pool);
      // local svg already contains the big joke; keep small text short here
      const pair = randomFrom(CAPTIONS[perf] || CAPTIONS.meh);
      return { img: m.img, title: pair[0], sub: pair[1] };
    }
    const gen = memeSvg(perf);
    const [t, s] = randomFrom(CAPTIONS[perf]);
    return { img: gen, title: t, sub: s };
  }


async function fetchMemeByTag(perf){
    // Offline: memes locais (mais rápidos e confiáveis)
    const pct = perf === "good" ? 90 : perf === "meh" ? 65 : 35;
    const m = pickMeme(pct);
    return Promise.resolve({ title: m.title || "🛰️", url: m.img || "" , sub: m.sub || "" });
  }


  function showMemeCard({label, title, url, sub}){
    if(!els.memeCard) return;
    if(!url){ els.memeCard.classList.add("hidden"); return; }

    els.memeCard.classList.remove("hidden");
    if(els.memeLabel) els.memeLabel.textContent = label || "Resultado";
    if(els.memeTitle) els.memeTitle.textContent = title || label || "Reação";
    if(els.memeText) els.memeText.textContent = sub || "";
    if(els.memeImg){
      els.memeImg.src = url;
      els.memeImg.loading = "eager";
    }
  }


  // ---------- confetti ----------
  function resizeFx(){
    const c = els.fxCanvas;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = Math.floor(window.innerWidth*dpr);
    c.height = Math.floor(window.innerHeight*dpr);
    c._dpr = dpr;
  }
  function confettiBurst(n=140){
    resizeFx();
  try{ window.RFWave && window.RFWave.init(); }catch(_){}
    const w = window.innerWidth, h = window.innerHeight;
    const cx = w*0.5, cy = Math.min(h*0.18, 170);

    for(let i=0;i<n;i++){
      const a = Math.random()*Math.PI*2;
      const sp = 4 + Math.random()*10;
      state.confetti.push({
        x: cx, y: cy,
        vx: Math.cos(a)*sp,
        vy: Math.sin(a)*sp - (6 + Math.random()*4),
        g: 0.18 + Math.random()*0.14,
        r: 3 + Math.random()*4,
        rot: Math.random()*Math.PI*2,
        vr: (Math.random()-.5)*0.25,
        life: 80 + Math.random()*45,
        hue: 200 + Math.random()*130,
        a: 1
      });
    }
    if(!state.confettiId) state.confettiId = requestAnimationFrame(tickConfetti);
  }
  function tickConfetti(){
    const c=els.fxCanvas, ctx=c.getContext("2d");
    const dpr=c._dpr||1;
    ctx.clearRect(0,0,c.width,c.height);

    for(let i=state.confetti.length-1;i>=0;i--){
      const p=state.confetti[i];
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 1;
      p.a = Math.max(0, Math.min(1, p.life/90));

      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.translate(p.x*dpr, p.y*dpr);
      ctx.rotate(p.rot);
      ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${p.a})`;
      ctx.fillRect((-p.r)*dpr, (-p.r)*dpr, (p.r*2.2)*dpr, (p.r*1.6)*dpr);
      ctx.restore();

      if(p.y>window.innerHeight+60 || p.life<=0) state.confetti.splice(i,1);
    }
    if(state.confetti.length){
      state.confettiId=requestAnimationFrame(tickConfetti);
    }else{
      state.confettiId=null;
      ctx.clearRect(0,0,c.width,c.height);
    }
  }

  // ---------- persistence ----------
  function loadBest(){
    try{
      const raw = localStorage.getItem(KEY_BEST);
      if(!raw) return;
      const d = JSON.parse(raw);
      if(typeof d?.score==="number") state.best.score = d.score;
      if(typeof d?.streak==="number") state.best.streak = d.streak;
    }catch(_){}
  }
  function saveBest(){
    try{ localStorage.setItem(KEY_BEST, JSON.stringify(state.best)); }catch(_){}
  }
  function loadPrefs(){
    try{
      const raw = localStorage.getItem(KEY_PREF);
      if(!raw) return;
      const p = JSON.parse(raw);
      if(typeof p?.soundOn==="boolean") state.soundOn = p.soundOn;
      if(typeof p?.memesOn==="boolean") state.memesOn = p.memesOn;
    }catch(_){}
  }
  function savePrefs(){
    try{ localStorage.setItem(KEY_PREF, JSON.stringify({soundOn: state.soundOn, memesOn: state.memesOn})); }catch(_){}
  }

  function updateToggleUI(){
    els.soundState.textContent = state.soundOn ? "ON" : "OFF";
    els.memeState.textContent = state.memesOn ? "ON" : "OFF";
    if(els.memeHint) els.memeHint.textContent = state.memesOn ? "ON" : "OFF";
    if(els.soundHint) els.soundHint.textContent = state.soundOn ? "ON" : "OFF";
  }

  function updateHomeUI(){
    els.wrapCategory.hidden = (els.selMode.value !== "category");
    els.wrapTimer.hidden = !els.chkTimer.checked;

    const cats = categories();
    els.selCategory.innerHTML = cats.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");

    els.bestScore.textContent = state.best.score ? String(state.best.score) : "—";
    els.bestStreak.textContent = state.best.streak ? String(state.best.streak) : "—";
    els.bankCount.textContent = String(window.QUESTION_BANK.length);
  }

  
function shuffleQuestionChoices(q){
  // Embaralha alternativas e ajusta o índice da resposta correta (varia mesmo quando a pergunta se repete)
  const idxs = q.choices.map((_,i)=>i);
  shuffle(idxs);
  const newChoices = idxs.map(i=>q.choices[i]);
  const newAnswer = idxs.indexOf(q.answer);
  return { ...q, choices: newChoices, answer: newAnswer };
}

function buildDeck(){
  // Pode ter prova com poucas questões — aqui a prioridade é variar mais entre provas
  let wantedCount = parseInt(els.selCount.value,10);
  if(!Number.isFinite(wantedCount) || wantedCount <= 0) wantedCount = 15;

  const diff = els.selDifficulty.value;
  const mode = els.selMode.value;

  const SIMULADO_CATS = new Set([
    "Conceitos",
    "Tipos de Rede",
    "Topologias",
    "Equipamentos",
    "TCP/IP",
    "OSI vs TCP/IP",
    "UDP",
    "UDP/TCP",
    "NAT",
    "CGNAT",
    "DHCP",
    "IP Público x Privado",
    "DNS",
    "Sub-rede",
    "Wireless",
    "Roteamento",
  ]);

  let pool = window.QUESTION_BANK.slice();

  // Dificuldade
  if(diff !== "all"){
    if(diff === "very_easy"){
      // Muito fácil: prioriza questões bem básicas, mas permite completar com "Fácil" se o pool for pequeno
      pool = pool.filter(q=>q.difficulty==="very_easy" || q.difficulty==="easy");
    }else{
      pool = pool.filter(q=>q.difficulty===diff);
    }
  }

  // Modo
  if(mode === "category"){
    const cat = els.selCategory.value;
    pool = pool.filter(q=>q.category===cat);
    state.category = cat;
  }else if(mode === "simulado"){
    pool = pool.filter(q=>SIMULADO_CATS.has(q.category));
    state.category = "Simulado";
  }else{
    state.category = null;
  }

  // Fallback (evita ficar sem questões)
  if(pool.length===0){
    if(mode === "simulado"){
      pool = window.QUESTION_BANK.filter(q=>SIMULADO_CATS.has(q.category));
    }else{
      pool = window.QUESTION_BANK.slice();
    }
  }
  if(pool.length===0) return [];

  // Chaves de anti-repetição por "perfil" (modo + dificuldade + categoria)
  const catKey = (mode === "category") ? (els.selCategory.value || "—") : (mode === "simulado" ? "SIMULADO" : "ALL");
  const deckKey = `${mode}|${diff}|${catKey}`;
  const RECENT_KEY = `recent_deck_ids::${deckKey}`;
  const LASTSIG_KEY = `last_deck_sig::${deckKey}`;

  // Janela de "recentes" adaptativa ao tamanho do pool (evita excluir tudo quando o pool é pequeno)
  let recent = [];
  try{ recent = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }catch(_){ recent = []; }
  const poolLen = pool.length;
  const maxFreshNeeded = Math.min(wantedCount, poolLen);
  let cap = poolLen - maxFreshNeeded; // garante espaço para frescas quando possível
  if(cap < 0) cap = 0;
  // dá um pouco de memória quando o pool é grande, mas sem exagerar
  cap = Math.min(cap, Math.min(120, Math.max(20, Math.floor(poolLen*0.6))));
  if(cap === 0) recent = [];
  const recentSet = new Set(recent.slice(0, cap));

  function pickFromPool(source, n, picked){
    const out = [];
    if(n <= 0) return out;

    // 1) frescas primeiro
    let fresh = source.filter(q=>!recentSet.has(q.id) && !picked.has(q.id));
    shuffle(fresh);
    const offset = fresh.length ? randInt(fresh.length) : 0;
    fresh = fresh.slice(offset).concat(fresh.slice(0, offset));
    for(const q of fresh){
      if(out.length >= n) break;
      out.push(q); picked.add(q.id);
    }

    // 2) completa com o restante
    if(out.length < n){
      let rest = source.filter(q=>!picked.has(q.id));
      shuffle(rest);
      const off2 = rest.length ? randInt(rest.length) : 0;
      rest = rest.slice(off2).concat(rest.slice(0, off2));
      for(const q of rest){
        if(out.length >= n) break;
        out.push(q); picked.add(q.id);
      }
    }
    return out;
  }

  const maxAttempts = 5;
  let deck = [];

  for(let attempt=0; attempt<maxAttempts; attempt++){
    deck = [];
    const picked = new Set();

    if(mode === "simulado"){
      // Simulado: tenta cobrir os assuntos (distribuição balanceada)
      const groups = [
        {name:"Bases", cats:["Conceitos","Tipos de Rede","Topologias","Equipamentos"]},
        {name:"TCP/IP & OSI", cats:["TCP/IP","OSI vs TCP/IP"]},
        {name:"UDP", cats:["UDP","UDP/TCP"]},
        {name:"NAT", cats:["NAT","CGNAT"]},
        {name:"DHCP", cats:["DHCP"]},
        {name:"IP Público/Privado", cats:["IP Público x Privado"]},
        {name:"DNS", cats:["DNS"]},
        {name:"Sub-rede", cats:["Sub-rede"]},
        {name:"Wireless", cats:["Wireless"]},
        {name:"Rotas/Gateway", cats:["Roteamento"]},
      ].map(g=>({ ...g, pool: pool.filter(q=>g.cats.includes(q.category)) }))
       .filter(g=>g.pool.length);

      shuffle(groups);
      const gCount = groups.length || 1;
      const baseEach = Math.floor(wantedCount / gCount);
      let rem = wantedCount % gCount;

      for(const g of groups){
        const target = baseEach + (rem>0 ? 1 : 0);
        if(rem>0) rem--;
        deck.push(...pickFromPool(g.pool, target, picked));
      }

      // Completa se faltou (quando algum grupo tem poucas questões)
      if(deck.length < wantedCount){
        deck.push(...pickFromPool(pool, wantedCount - deck.length, picked));
      }
    }else{
      // Normal (misto / por categoria)
      deck = pickFromPool(pool, wantedCount, picked);
    }

    // Se o pool todo é menor que wantedCount, devolve o que existir
    if(deck.length > pool.length) deck = deck.slice(0, pool.length);

    // Para "muito fácil", garante prioridade real de very_easy dentro do que foi selecionado
    if(diff === "very_easy"){
      const ve = deck.filter(q=>q.difficulty==="very_easy");
      const ez = deck.filter(q=>q.difficulty!=="very_easy");
      shuffle(ve); shuffle(ez);
      deck = ve.concat(ez).slice(0, deck.length);
    }

    // Embaralha ordem final das perguntas
    shuffle(deck);

    // Embaralha alternativas dentro de cada pergunta (isso reduz MUITO a sensação de repetição)
    deck = deck.map(shuffleQuestionChoices);

    // Evita gerar exatamente a mesma sequência da prova anterior (por perfil)
    const sig = deck.map(d=>d.id + ":" + d.answer).join('|');
    const lastSig = (localStorage.getItem(LASTSIG_KEY) || "");
    if(sig && sig === lastSig && attempt < maxAttempts-1){
      continue;
    }
    try{ localStorage.setItem(LASTSIG_KEY, sig); }catch(_){ }
    break;
  }

  // Salva recentes (por perfil)
  try{
    if(cap > 0){
      const merged = deck.map(d=>d.id).concat(recent).filter(Boolean);
      const unique = Array.from(new Set(merged));
      localStorage.setItem(RECENT_KEY, JSON.stringify(unique.slice(0, cap)));
    }
  }catch(_){ }

  return deck;
}

  function startGame({practice=false}={}){
    state.practice = practice;
    state.mode = els.selMode.value;
    state.count = parseInt(els.selCount.value,10) || 15;
    state.difficulty = els.selDifficulty.value;
    state.timerEnabled = els.chkTimer.checked;
    state.timerSeconds = parseInt(els.selTimer.value,10);

    state.deck = buildDeck();
    els.score.textContent = `0/${state.deck.length}`;
    state.index = 0;
    state.score = 0;
    state.hits = 0;
    state.answered = false;
    state.streak = 0;
    state.history = [];
    state.times = [];

    els.score.textContent = `0/${state.deck.length}`;
    els.btnNext.disabled = true;
    els.feedback.textContent = "Selecione uma alternativa (1–4) e aperte Próxima (Enter/N).";
    els.timerWrap.classList.toggle("hidden", !state.timerEnabled);

    show(els.screenQuiz);
    renderQuestion();

    if(state.soundOn) ensureAudio();
  }

  function startWrongOnly(){
    // build from history wrong items (based on original deck items)
    const wrongIds = new Set(state.history.filter(h=>{
      if(h.timedOut) return true;
      if(h.picked === null) return true;
      return h.picked !== h.correct;
    }).map(h=>h.id));
    const base = state.deckAll || QUESTIONS;
    const deck = base.filter(q=>wrongIds.has(q.id));
    if(deck.length === 0){
      // if no wrong, just restart normal
      startGame();
      return;
    }
    // keep same settings
    state.deck = shuffle(deck);
    state.index = 0;
    state.hits = 0;
    state.history = [];
    state.answered = false;
    state.selectedIdx = null;
    state.focusIdx = 0;
    show(els.screenQuiz);
    renderQuestion();
    updateHud();
    startTimer();
  }

  function stopTimer(){
    if(state.timerId){
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }
  function startTimer(){
    stopTimer();
    state.remaining = state.timerSeconds;
    els.timer.textContent = String(state.remaining);

    state.timerId = setInterval(()=>{
      if(state.answered) return;
      state.remaining -= 1;
      els.timer.textContent = String(state.remaining);
      if(state.remaining <= 0){
        stopTimer();
        state.selectedIdx = null;
    state.focusIdx = 0; updateSelectionUI(); lockAnswer(null, true);
      }
    }, 1000);
  }

  function pointsFor(q, secondsUsed){
    if(state.practice) return 0;
    const base = diffBasePoints(q.difficulty);
    if(!state.timerEnabled) return base;
    const ratio = Math.max(0, Math.min(1, (state.timerSeconds - secondsUsed)/state.timerSeconds));
    const bonus = Math.round(ratio*6);
    return base + bonus;
  }

  function renderQuestion(){
    stopTimer();
    state.answered = false;
    state.selectedIdx = null;
    state.focusIdx = 0;
    els.btnConfirm.disabled = true;
    els.btnClear.disabled = true;
    els.btnNext.disabled = true;
    els.answers.innerHTML = "";
    els.feedback.textContent = "Selecione uma alternativa e confirme (Enter).";
    els.btnSkip.disabled = false;

    const q = state.deck[state.index];
    const i = state.index + 1;

    els.qIndex.textContent = String(i);
    els.qTotal.textContent = String(state.deck.length);
    els.qCategory.textContent = q.category;
    els.qDifficulty.textContent = diffLabel(q.difficulty);
    els.qText.textContent = q.q;

    const labels = ["1","2","3","4"];
    q.choices.forEach((c, idx)=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-btn ripple group rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 min-h-[56px] text-left text-[15px] sm:text-sm font-semibold text-white/85 hover:bg-white/10 transition focus:ring-4 focus:ring-[rgba(70,176,255,.18)]";
      btn.setAttribute("data-idx", String(idx));
      btn.innerHTML = `<span class="stream"></span>` + `
        <div class="flex items-start gap-3">
          <div class="grid h-8 w-8 sm:h-7 sm:w-7 place-items-center rounded-xl border border-white/10 bg-white/5 text-xs font-black text-white/80">${labels[idx]||idx+1}</div>
          <div class="leading-relaxed">${escapeHtml(c)}</div>
        </div>
      `;
      btn.addEventListener("click", ()=>{ click(); selectOption(idx); });
      els.answers.appendChild(btn);
    });

    const pct = (state.index / Math.max(1, state.deck.length)) * 100;
    els.progressBar.classList.add('breathing');
    els.progressBar.style.width = `${pct}%`;

    state.t0 = performance.now();
    if(state.timerEnabled) startTimer();

    try{ updateSelectionUI(); }catch(_){ }
    updateHud();
    popIn(els.selHint);
    popIn(els.answers);
    staggerInAnswers();

    const first = els.answers.querySelector("button");
    if(first && window.matchMedia("(min-width: 640px)").matches) setTimeout(()=>first.focus(), 30);
  }

  function pulseFeedback(){
    els.feedback.classList.remove("animate-pulse");
    void els.feedback.offsetWidth;
    els.feedback.classList.add("animate-pulse");
  }

  function setFeedback(html){
    els.feedback.innerHTML = html;
    pulseFeedback();
  }

  
  function updateSelectionUI(){
    const buttons = $$("#answers button");
    buttons.forEach(b=>{
      const idx = parseInt(b.getAttribute("data-idx"),10);
      b.classList.remove("border-[rgba(70,176,255,.55)]","bg-white/10","answer-selected");
      if(state.selectedIdx !== null && idx === state.selectedIdx){
        b.classList.add("border-[rgba(70,176,255,.55)]","bg-white/10","answer-selected");
      }
    });

    if(els.selHint){
      if(state.selectedIdx === null){
        els.selHint.textContent = "Selecione uma alternativa (1–4). Você pode trocar antes de ir para Próxima.";
      }else{
        const q = state.deck[state.index];
        els.selHint.textContent = `Selecionado: ${q.choices[state.selectedIdx]} (você pode trocar ou confirmar)`;
      }
    }

    const dis = (state.selectedIdx === null);
        if(els.btnClear){ els.btnClear.disabled = dis; els.btnClear.toggleAttribute('disabled', dis); }
  }

  
  function focusOption(idx){
    const btns = Array.from(document.querySelectorAll("#answers .answer-btn"));
    if(!btns.length) return;
    idx = Math.max(0, Math.min(btns.length-1, idx));
    state.focusIdx = idx;
    btns.forEach((b,i)=> b.classList.toggle("focused", i===idx));
    // keep in view
    try{ btns[idx].scrollIntoView({block:"nearest", behavior:"smooth"}); }catch(_){}
  }

function selectOption(idx){
    if(state.answered) return;
    state.selectedIdx = idx;
    triggerDataStream();
    soundSelect();
    // Novo fluxo: Próxima salva a resposta
    if(els.btnNext){ els.btnNext.disabled = false; els.btnNext.removeAttribute('disabled'); }

    if(els.btnConfirm){ els.btnConfirm.disabled = false; els.btnConfirm.removeAttribute('disabled'); }
    if(els.btnClear){ els.btnClear.disabled = false; els.btnClear.removeAttribute('disabled'); }
    updateSelectionUI();
    const btn = document.querySelector(`#answers button[data-idx="${idx}"]`);
    pulse(btn);
    try{ window.RFWave && window.RFWave.pulseFromElement(btn, 0.75, '#46b0ff'); }catch(_){ }
  }

  function clearSelection(){
    if(state.answered) return;
    state.selectedIdx = null;
    state.focusIdx = 0;
        if(els.btnNext){ els.btnNext.disabled = true; els.btnNext.setAttribute('disabled',''); }
    updateSelectionUI();
  }

  function confirmSelection(){
    if(state.answered) return;
    if(state.selectedIdx === null) return;
    soundConfirm();
    pulse(els.btnConfirm);
    pulse(els.answers);
    const selBtn = document.querySelector(`#answers button[data-idx="${state.selectedIdx}"]`);
    if(selBtn){ selBtn.classList.remove('scan-pulse'); void selBtn.offsetWidth; selBtn.classList.add('scan-pulse'); }
    if(els.answers){ els.answers.classList.remove('scan-pulse'); void els.answers.offsetWidth; els.answers.classList.add('scan-pulse'); }
    lockAnswer(state.selectedIdx, false);
  }
function lockAnswer(pickedIdx, timedOut){
    if(state.answered) return;
    state.answered = true;
    stopTimer();
    els.btnNext.disabled = false;
    els.btnSkip.disabled = true;
    els.btnConfirm.disabled = true;
    els.btnClear.disabled = true;
    els.btnConfirm.disabled = true;
    els.btnClear.disabled = true;

    const q = state.deck[state.index];
    const correctIdx = q.answer;

    const t1 = performance.now();
    const secondsUsed = Math.max(0, (t1 - state.t0)/1000);
    state.times.push(secondsUsed);

    // UI: apenas marca a opção escolhida, sem revelar se é certa ou errada
    const buttons = $$("#answers button");
    buttons.forEach(b=>{
      const idx = parseInt(b.getAttribute("data-idx"),10);
      if(pickedIdx!==null && idx===pickedIdx){
        b.classList.add("border-[rgba(70,176,255,.55)]","bg-white/10","answer-selected");
      }
      b.disabled = true;
      b.classList.remove("hover:bg-white/10");
      b.classList.add("cursor-not-allowed","opacity-95");
    });

    // Feedback neutro (o resultado aparece no final)
    if(timedOut){
      soundTimeout();
      setFeedback(`<div class="space-y-1">
        <div><span class="font-black text-amber-300">⏱️ Tempo esgotado.</span> <span class="text-white/60">Resposta registrada como não respondida.</span></div>
        <div class="text-white/70">O gabarito e a explicação aparecem no final.</div>
      </div>`);
      if(state.memesOn) toast(rand(memeTimeout));
      pickedIdx = null;
    }else{
      // som de confirmação já foi tocado
      setFeedback(`<div class="space-y-1">
        <div><span class="font-black text-white/85">✅ Resposta registrada.</span> <span class="text-white/60">A correção aparece no final.</span></div>
        <div class="text-white/70">Pressione <b class="text-white/90">Enter</b> para ir para a próxima.</div>
      </div>`);
    }

    if(els.selHint) els.selHint.textContent = 'Resposta registrada. Correção no final.';

    state.history.push({
      id:q.id, category:q.category, difficulty:q.difficulty, q:q.q, choices:q.choices,
      correct:correctIdx, picked:pickedIdx, timedOut: !!timedOut, secondsUsed, explain:q.explain
    });

    // Progresso (respondidas)
    els.score.textContent = `${state.index+1}/${state.deck.length}`;

    setTimeout(()=>els.btnNext.focus(), 40);
  }

  function skipQuestion(){
    if(state.answered) return;
    stopTimer();

    const q = state.deck[state.index];
    const t1 = performance.now();
    const secondsUsed = Math.max(0, (t1 - state.t0)/1000);
    state.times.push(secondsUsed);

    // desativa opções sem revelar gabarito
    const buttons = $$("#answers button");
    buttons.forEach(b=>{
      b.disabled = true;
      b.classList.add("cursor-not-allowed","opacity-95");
      b.classList.remove("hover:bg-white/10");
    });

    setFeedback(`<div class="space-y-1">
      <div><span class="font-black text-white/85">⏭️ Pergunta pulada.</span> <span class="text-white/60">Gabarito e explicação no final.</span></div>
      <div class="text-white/70">Pressione <b class="text-white/90">Enter</b> para avançar.</div>
    </div>`);
    if(state.memesOn) toast("Pulou ✅ (corrige no final)");

    state.answered = true;
    els.btnNext.disabled = false;
    els.btnSkip.disabled = true;
    els.btnConfirm.disabled = true;
    els.btnClear.disabled = true;
    els.btnConfirm.disabled = true;
    els.btnClear.disabled = true;

    if(els.selHint) els.selHint.textContent = 'Resposta registrada. Correção no final.';

    state.history.push({
      id:q.id, category:q.category, difficulty:q.difficulty, q:q.q, choices:q.choices,
      correct:q.answer, picked:null, timedOut:false, secondsUsed, skipped:true, explain:q.explain
    });

    els.score.textContent = `${state.index+1}/${state.deck.length}`;
    setTimeout(()=>els.btnNext.focus(), 40);
  }

  function nextQuestion(){
    if(!state.answered) return;
    state.index += 1;

    const pct = (state.index / Math.max(1, state.deck.length)) * 100;
    els.progressBar.classList.add('breathing');
    els.progressBar.style.width = `${pct}%`;

    if(state.index >= state.deck.length){ finishGame(); return; }

    els.answers.classList.add("opacity-0");
    setTimeout(()=>{
      els.answers.classList.remove("opacity-0");
      renderQuestion();
    }, 120);
  }

  // ---------- Study guide ----------
  const GUIDE = [
    {
      key: "Redes / Tipos / Topologias",
      match: (cat)=>/rede|lan|wan|man|topolog/i.test(cat),
      title: "Redes, tipos e topologias",
      body: [
        "LAN (local), MAN (metropolitana) e WAN (larga escala) definem alcance e gerenciamento.",
        "Topologias (estrela, barramento, anel, mesh) afetam custo, redundância e falhas.",
        "Em estrela, o switch central é ponto crítico; em mesh há mais redundância."
      ]
    },
    {
      key: "TCP/IP e OSI",
      match: (cat)=>/tcp\/ip|osi|camad/i.test(cat),
      title: "Modelo TCP/IP vs OSI",
      body: [
        "TCP/IP: Aplicação, Transporte, Internet e Acesso à Rede.",
        "OSI: 7 camadas (Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física).",
        "A ideia é separar responsabilidades (encapsulamento) para facilitar interoperabilidade e troubleshooting."
      ]
    },
    {
      key: "UDP e TCP",
      match: (cat)=>/udp|tcp/i.test(cat),
      title: "UDP x TCP",
      body: [
        "TCP é orientado à conexão (controle, confiabilidade, ordem).",
        "UDP é leve e sem conexão (menor latência, pode perder pacotes).",
        "UDP é comum em DNS, VoIP e streaming — quando a rapidez importa mais que retransmitir."
      ]
    },
    {
      key: "NAT / CGNAT / DNAT",
      match: (cat)=>/nat|cgnat|dnat|snat/i.test(cat),
      title: "NAT, DNAT e CGNAT",
      body: [
        "NAT traduz IPs privados para públicos para acessar a Internet com poucos IPv4.",
        "SNAT altera origem (saída). DNAT altera destino (entrada/port-forward).",
        "CGNAT é NAT no provedor (muitos clientes compartilhando 1 IP público via portas), o que complica abrir portas e hospedar serviços."
      ]
    },
    {
      key: "DHCP",
      match: (cat)=>/dhcp/i.test(cat),
      title: "DHCP na prática",
      body: [
        "DHCP Server distribui IP, máscara, gateway e DNS automaticamente.",
        "Processo típico (DORA): Discover → Offer → Request → Ack.",
        "Benefícios: gestão fácil e menos erro humano; risco: rogue DHCP e conflitos se mal configurado."
      ]
    },
    {
      key: "DNS",
      match: (cat)=>/dns/i.test(cat),
      title: "DNS (recursivo, autoritativo, primário/secundário)",
      body: [
        "DNS resolve nomes (ex.: exemplo.com) para IPs e mantém serviços acessíveis por nome.",
        "Recursivo consulta em cadeia; autoritativo responde pelos registros oficiais da zona.",
        "Primário (master) é onde edita a zona; secundário (slave) replica por transferência para redundância."
      ]
    },
    {
      key: "Sub-redes",
      match: (cat)=>/sub-?rede|máscara|hosts/i.test(cat),
      title: "Máscara de sub-rede e hosts",
      body: [
        "Máscara define qual parte do IP é rede e qual é host.",
        "Hosts por sub-rede (IPv4): 2^(bits de host) − 2 (rede e broadcast).",
        "Ex.: /24 → 254 hosts; /26 → 62 hosts; /30 → 2 hosts."
      ]
    },
    {
      key: "Wireless",
      match: (cat)=>/wireless|wi-?fi|wpa/i.test(cat),
      title: "Wi‑Fi (WPA2/WPA3) e boas práticas",
      body: [
        "WPA3 melhora proteção (ex.: SAE), mas WPA2 ainda é comum (preferir WPA2-AES).",
        "Sinal sofre com distância, paredes, interferência (2.4 GHz vs 5 GHz) e canais congestionados.",
        "Boas práticas: posicionamento central, canais adequados, potência equilibrada e senhas fortes."
      ]
    },
    {
      key: "Rotas e Gateways",
      match: (cat)=>/rota|gateway|roteamento/i.test(cat),
      title: "Rotas e gateway padrão",
      body: [
        "Gateway padrão é o próximo salto para redes fora da sua sub-rede.",
        "Rotas estáticas: fixas e previsíveis; dinâmicas: protocolos escolhem melhor caminho (ex.: OSPF, BGP).",
        "Roteamento correto evita loops, perda de acesso e caminhos ruins (latência)."
      ]
    },
    {
      key: "Equipamentos e Fibra",
      match: (cat)=>/switch|roteador|modem|onu|fibra|conector/i.test(cat),
      title: "Equipamentos e conectores de fibra",
      body: [
        "Switch comuta frames na LAN; roteador encaminha pacotes entre redes; modem faz modulação; ONU termina fibra no cliente.",
        "Conectores: SC (2,5mm, push‑pull, comum em FTTx), LC (1,25mm, alta densidade), ST (baioneta, legado), FC (rosca, alta estabilidade).",
        "Escolha depende de densidade, custo, robustez e ambiente (data center, telecom, laboratório)."
      ]
    },
    {
      key: "Aplicação (HTTP/FTP/SMTP/SSH)",
      match: (cat)=>/http|ftp|smtp|ssh|aplica/i.test(cat),
      title: "Protocolos de aplicação",
      body: [
        "HTTP/HTTPS: navegação web (porta 80/443).",
        "FTP: transferência de arquivos (muito usado historicamente em hospedagem).",
        "SMTP: envio de e‑mails (porta 25/465/587). SSH: acesso remoto seguro (porta 22) e tunelamento."
      ]
    },
    {
      key: "Proxy e VPN",
      match: (cat)=>/proxy|vpn/i.test(cat),
      title: "Proxy x VPN",
      body: [
        "Proxy atua como intermediário e pode mascarar IP, mas não necessariamente criptografa tudo.",
        "VPN cria túnel criptografado: protege tráfego em redes públicas e dá acesso seguro a redes privadas.",
        "Para privacidade e segurança real, VPN geralmente é melhor que proxy simples."
      ]
    }
  ];

  function renderStudyGuide(){
    if(!els.studyGuide) return;
    const cats = distinct(state.deck.map(q=>q.category));
    const used = [];

    for(const g of GUIDE){
      if(cats.some(c=>g.match(c))) used.push(g);
    }

    // fallback: show generic if none matched
    const guideItems = used.length ? used : [{
      title:"Resumo geral",
      body:["Redes conectam dispositivos e serviços. TCP/IP organiza comunicação em camadas e protocolos. Revise também endereçamento, DNS/DHCP, NAT e roteamento."]
    }];

    els.studyGuide.innerHTML = guideItems.map(g=>{
      const body = (g.body||[]).map(s=>`<li class="flex gap-2"><span class="text-white/40">•</span><span>${escapeHtml(s)}</span></li>`).join("");
      return `
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="text-sm font-extrabold">${escapeHtml(g.title)}</div>
          <ul class="mt-2 space-y-1 text-sm text-white/70">${body}</ul>
        </div>
      `;
    }).join("");
  }

  function computeResults(){
    // Recalcula acertos/pontuação a partir do histórico (sem revelar durante o quiz)
    let hits = 0;
    let score = 0;

    for(const h of state.history){
      if(h.picked !== null && h.picked === h.correct){
        hits += 1;
        // Pontos iguais ao sistema anterior
        const q = { difficulty: h.difficulty };
        const base = diffBasePoints(q.difficulty);
        if(!state.practice){
          if(state.timerEnabled){
            const ratio = Math.max(0, Math.min(1, (state.timerSeconds - h.secondsUsed)/state.timerSeconds));
            const bonus = Math.round(ratio*6);
            score += (base + bonus);
          }else{
            score += base;
          }
        }
      }
    }
    return {hits, score};
  }

  function finishGame(){
    stopTimer();
    const total = state.deck.length;
    const avg = state.times.length ? (state.times.reduce((a,b)=>a+b,0)/state.times.length) : NaN;

    const results = computeResults();
    state.hits = results.hits;
    state.score = results.score;

    els.finalScore.textContent = String(state.score);
    els.finalHits.textContent = `${state.hits}/${total}`;
    els.avgTime.textContent = isFinite(avg) ? `${avg.toFixed(1)}s` : "—";

    const ratio = total ? (state.hits/total) : 0;
    const perf = ratio >= 0.8 ? "good" : ratio >= 0.6 ? "meh" : "bad";
    const perfLabel = ratio >= 0.8 ? "Excelente" : ratio >= 0.6 ? "Bom" : ratio >= 0.4 ? "Regular" : "Precisa melhorar";

    // Visual: flash no fundo conforme desempenho (só no resultado)
    try{
      if(window.RFWave){
        if(perf === "good") window.RFWave.flash("#22c55e", 0.35);
        else if(perf === "meh") window.RFWave.flash("#46b0ff", 0.28);
        else window.RFWave.flash("#ff4081", 0.32);
      }
    }catch(_){}

    // Som final (não revela durante a prova, só no resultado)
    if(!state.practice){
      if(perf === "good") soundEndGood();
      else if(perf === "meh") soundEndMeh();
      else soundEndBad();
    }

    // Meme do resultado (opcional)
    if(state.memesOn){
      fetchMemeByTag(perf).then(m=>{
        showMemeCard({label: perfLabel, title: m.title, url: m.url, sub: m.sub});
      });
    }

    els.badgeMode.textContent = state.practice ? "Treino" : (state.mode==="category"?"Categoria":"Misto");
    els.badgeDiff.textContent = state.difficulty==="all" ? "Dificuldade: todas"
      : `Dificuldade: ${diffLabel(state.difficulty)}`;

    if(!state.practice){
      let newBest=false;
      if(state.score > state.best.score){ state.best.score = state.score; newBest=true; }
      if(state.hits > state.best.streak){ state.best.streak = state.hits; }
      saveBest();
      if(newBest){ confettiBurst(240); if(state.memesOn) toast("🏆 Novo recorde!"); }
    }

    const memeCard = document.getElementById("memeCard");
    if(memeCard) memeCard.classList.toggle("hidden", !(state.memesOn && !state.practice));

    const _errs = buildErrorDeck();
    if(els.btnTrainErrors) els.btnTrainErrors.style.display = _errs.length ? "inline-flex" : "none";
    if(els.btnRetryWrong) els.btnRetryWrong.style.display = _errs.length ? "inline-flex" : "none";

    try{
      const payload = {
        at: Date.now(),
        difficulty: state.difficulty,
        mode: state.mode,
        total: state.history.length,
        hits: state.hits,
        history: state.history
      };
      localStorage.setItem('redeQuizLastResult', JSON.stringify(payload));
    }catch(_){ }

    renderReview();
    renderSummaryAndCategories();
    // Tabs
    const tabBtns = Array.from(document.querySelectorAll('.tabBtn'));
    tabBtns.forEach(b=>b.addEventListener('click', ()=>setTab(b.getAttribute('data-tab'))));
    setTab('summary');

    renderStudyGuide();
    updateHomeUI();
    show(els.screenResult);
  }


  // ---------- Error training modal ----------
  function buildErrorDeck(){
    // include wrong + timed out + skipped (skipped treated as needs review)
    const errs = state.history.filter(h=>{
      if(h.timedOut) return true;
      if(h.picked === null) return true;
      return h.picked !== h.correct;
    });
    state.errDeck = errs;
    state.errIndex = 0;
    return errs;
  }

  function setModalOpen(open){
    // robust lookup
    if(!els.errorModal) els.errorModal = document.getElementById('errorModal');
    const modalEl = els.errorModal || document.getElementById('errorModal');
    if(!modalEl) return;
    modalEl.classList.toggle('open', open);
    document.body.style.overflow = open ? "hidden" : "";
    if(open){
      // soft focus: reduce background motion by hinting
      document.body.classList.add("modal-open");
    }else{
      document.body.classList.remove("modal-open");
    }
  }

  function renderMiniQuiz(h){
    if(!els.mQuiz || !els.mQuizFeedback) return;
    els.mQuiz.innerHTML = "";
    const t = miniQuizTemplate(h.category || "");
    els.mQuizFeedback.textContent = t.q;
    let locked = false;

    t.options.forEach((opt, i)=>{
      const b = document.createElement("button");
      b.textContent = opt;
      b.addEventListener("click", ()=>{
        if(locked) return;
        locked = true;
        if(i === t.correctIdx){
          b.classList.add("ok");
          els.mQuizFeedback.textContent = "✅ Boa! Isso fixa o conceito.";
          // subtle sfx
          if(typeof soundSelect === "function") soundSelect();
    // Novo fluxo: Próxima salva a resposta
    if(els.btnNext){ els.btnNext.disabled = false; els.btnNext.removeAttribute('disabled'); }

        }else{
          b.classList.add("bad");
          els.mQuizFeedback.textContent = "❌ Quase. Leia a dica e tente novamente na próxima.";
          // tiny timeout sfx for feedback
          soundTimeout();
        }
        // highlight correct
        const btns = Array.from(els.mQuiz.querySelectorAll("button"));
        btns[t.correctIdx]?.classList.add("ok");
      });
      els.mQuiz.appendChild(b);
    });
  }

  function renderErrorCard(){
    const deck = state.errDeck || [];
    if(!deck.length){
      els.modalSub.textContent = "Você não errou nada. Quer refazer no modo difícil? 😄";
      els.modalCount.textContent = "0 erros";
      return;
    }

    const h = deck[state.errIndex];
    const total = deck.length;

    // top mini dashboard
    if(els.modalTop){
      const done = Object.values(state.understood||{}).filter(Boolean).length;
      els.modalTop.innerHTML = `
        <div class="card"><div class="text-xs text-white/60">Erros totais</div><div class="mt-1 text-2xl font-black">${total}</div></div>
        <div class="card"><div class="text-xs text-white/60">Revisados</div><div class="mt-1 text-2xl font-black">${done}</div></div>
        <div class="card"><div class="text-xs text-white/60">Próximo</div><div class="mt-1 text-2xl font-black">${state.errIndex+1}/${total}</div></div>
      `;
    }

    els.modalCount.textContent = `${state.errIndex+1}/${total}`;
    els.mQ.textContent = h.q;
    els.mMeta.innerHTML = `
      <span class="chip">${catIcon(h.category)} ${escapeHtml(h.category)}</span>
      <span class="chip">🎚️ ${escapeHtml(diffLabel(h.difficulty))}</span>
      <span class="chip">${(h.picked === null) ? "⏭️ Não respondida" : (h.timedOut ? "⏱️ Timeout" : "❌ Errada")}</span>
    `;
    els.mProgress.textContent = state.understood[h.id] ? "✅ Marcado como 'Entendi'" : "Marque 'Entendi' quando fixar.";

    const pickedTxt = (h.picked === null ? "—" : h.choices[h.picked]);
    const correctTxt = h.choices[h.correct];
    els.mYour.textContent = pickedTxt;
    els.mCorrect.textContent = correctTxt;

    const extra = enrichExplanation(h);
    els.mExplain.textContent = extra.explain || "";
    els.mConcept.textContent = extra.concept || "";
    els.mTip.textContent = extra.tip || "";
    els.mExample.textContent = extra.example || "";

    // mini quiz
    renderMiniQuiz(h);

    // buttons enabled
    els.btnPrevErr.disabled = state.errIndex === 0;
    els.btnNextErr.disabled = state.errIndex === total-1;
  }

  function openErrorModal(){
    buildErrorDeck();
    setModalOpen(true);
    try{ renderErrorCard(); }catch(err){ console.error(err); }
    // entry animation
    const modal = els.errorModal?.querySelector(".modal");
    if(modal) popIn(modal);
  }

  function enrichExplanation(h){
    // Base: h.explain. Extra: pega 1–2 bullets da mini-aula que casa com a categoria.
    const explain = (h.explain || "").trim();
    const cat = h.category || "";
    let concept = "";
    for(const g of GUIDE){
      if(g.match(cat)){
        concept = (g.body || []).slice(0,2).join(" ");
        break;
      }
    }
    if(!concept){
      concept = "Pense em camadas/protocolos e no caminho do pacote: origem → rede → destino.";
    }

    let tip = "Dica: elimine alternativas que confundem função (ex.: switch vs roteador) ou camada (TCP/IP vs OSI).";
    if(/dns/i.test(cat)) tip = "Dica: DNS recursivo consulta outros servidores; autoritativo responde pela zona.";
    if(/nat|cgnat|dnat/i.test(cat)) tip = "Dica: SNAT costuma ser saída; DNAT é entrada/port-forward; CGNAT é NAT do provedor.";
    if(/sub-?rede|máscara|hosts/i.test(cat)) tip = "Dica: hosts = 2^(bits de host) − 2 (rede e broadcast).";

    let example = "";
    if(/udp/i.test(cat)) example = "Ex.: DNS usa UDP para consultas rápidas; se precisar, o cliente tenta de novo.";
    else if(/dhcp/i.test(cat)) example = "Ex.: DORA (Discover/Offer/Request/Ack) para concessão automática de IP.";
    else if(/gateway|rota/i.test(cat)) example = "Ex.: sem gateway padrão correto, você acessa só a sua sub-rede (não sai pra Internet).";
    else if(/fibra|conector/i.test(cat)) example = "Ex.: LC é pequeno e comum em data centers; SC é muito usado em FTTx por custo/robustez.";

    return { explain, concept, tip, example };
  }

  function setTab(tab){
    const map = { summary: els.tabSummary, questions: els.tabQuestions, categories: els.tabCategories };
    Object.values(map).forEach(x=>x && x.classList.add("hidden"));
    if(map[tab]) map[tab].classList.remove("hidden");
    popIn(map[tab]);

    const btns = Array.from(document.querySelectorAll(".tabBtn"));
    btns.forEach(b=>{
      const active = b.getAttribute("data-tab") === tab;
      b.classList.toggle("bg-white/10", active);
      b.classList.toggle("bg-white/5", !active);
    });
  }

  function renderSummaryAndCategories(){
    const total = state.deck.length;
    const ratio = total ? (state.hits/total) : 0;
    if(els.finalRate) els.finalRate.textContent = `${Math.round(ratio*100)}%`;

    let verdict = "Boa! Continue treinando.";
    if(ratio >= 0.85) verdict = "🔥 Excelente! Nível muito forte.";
    else if(ratio >= 0.70) verdict = "✅ Muito bom. Falta pouco pra ficar excelente.";
    else if(ratio >= 0.55) verdict = "🟡 Regular. Revise os tópicos abaixo e refaça.";
    else verdict = "🔴 Precisa melhorar. Use a mini-aula e repita o simulado.";

    if(els.finalVerdict) els.finalVerdict.textContent = verdict;
    const level = ratio >= 0.90 ? "Arquiteto de Redes" : ratio >= 0.80 ? "Sênior" : ratio >= 0.70 ? "Pleno" : ratio >= 0.55 ? "Júnior" : "Estagiário";
    if(els.finalLevel) els.finalLevel.textContent = `Nível: ${level}`;

    // Category stats
    const byCat = {};
    for(const h of state.history){
      const c = h.category || "Geral";
      if(!byCat[c]) byCat[c] = { total:0, hit:0, items:[] };
      byCat[c].total += 1;
      if(h.picked !== null && h.picked === h.correct) byCat[c].hit += 1;
      byCat[c].items.push(h);
    }

    const rows = Object.entries(byCat).map(([c,v])=>{
      const rate = v.total ? v.hit/v.total : 0;
      return { c, ...v, rate };
    }).sort((a,b)=>b.rate-a.rate);

    const top = rows.slice(0,3);
    const weak = rows.slice(-3).reverse();

    if(els.topCats){
      els.topCats.innerHTML = top.map(r=>`<div class="flex items-center justify-between gap-2"><span>${escapeHtml(r.c)}</span><span class="text-white/60">${r.hit}/${r.total}</span></div>`).join("") || "—";
    }
    if(els.weakCats){
      els.weakCats.innerHTML = weak.map(r=>`<div class="flex items-center justify-between gap-2"><span>${escapeHtml(r.c)}</span><span class="text-white/60">${r.hit}/${r.total}</span></div>`).join("") || "—";
    }

    const ach=[];
    if(ratio>=0.85) ach.push("🏆 Alta performance");
    if(state.timerEnabled && ratio>=0.75) ach.push("⏱️ Rápido e preciso");
    if(Object.keys(byCat).length>=6) ach.push("🧠 Cobertura ampla");
    // categoria top >=90%
    const topOne = rows[0];
    if(topOne && topOne.rate>=0.90) ach.push(`🥇 ${topOne.c} forte`);
    if(els.achievements){
      els.achievements.innerHTML = ach.length ? ach.map(a=>`<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-extrabold text-white/80">${escapeHtml(a)}</span>`).join("")
        : `<span class="text-xs text-white/55">Sem badges desta vez — refaça para desbloquear.</span>`;
    }

    if(els.catStats){
      els.catStats.innerHTML = rows.map(r=>{
        const pct = Math.round(r.rate*100);
        return `
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center justify-between gap-2">
              <div class="text-sm font-extrabold">${escapeHtml(r.c)}</div>
              <div class="text-xs text-white/60">${r.hit}/${r.total} • ${pct}%</div>
            </div>
            <div class="mt-3 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
              <div class="h-full bg-[linear-gradient(90deg,var(--brand-1),var(--brand-3))]" style="width:${pct}%"></div>
            </div>
            <div class="mt-3 text-xs text-white/65">
              ${pct>=80 ? "Muito bom nesta categoria." : pct>=60 ? "Ok, dá pra melhorar." : "Priorize revisão aqui."}
            </div>
          </div>
        `;
      }).join("");
    }
  }

  function renderReview(){
    els.review.innerHTML = "";
    state.history.forEach((h, idx)=>{
      const good = (h.picked === h.correct);
      const skipped = h.skipped === true;

      const badge = good
        ? `<span class="font-black text-teal-300">✅ Acerto</span>`
        : skipped ? `<span class="font-black text-rose-300">⏭️ Pulada</span>`
        : (h.timedOut ? `<span class="font-black text-amber-300">⏱️ Timeout</span>` : `<span class="font-black text-rose-300">❌ Erro</span>`);

      const pickedTxt = (h.picked === null ? "—" : escapeHtml(h.choices[h.picked]));
      const correctTxt = escapeHtml(h.choices[h.correct]);

      const extra = enrichExplanation(h);

      const wrap = document.createElement("div");
      wrap.className = "rounded-2xl border border-white/10 bg-white/5 overflow-hidden";
      wrap.innerHTML = `
        <details ${good ? "" : "open"} class="group">
          <summary class="cursor-pointer list-none px-4 py-3 hover:bg-white/5 transition">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="text-sm font-extrabold leading-snug">${idx+1}. ${escapeHtml(h.q)}</div>
                <div class="mt-1 text-xs text-white/60">${badge} • ${escapeHtml(h.category)} • ${escapeHtml(diffLabel(h.difficulty))}</div>
              </div>
              <div class="shrink-0 text-white/60 group-open:rotate-180 transition">⌄</div>
            </div>
          </summary>
          <div class="px-4 pb-4 text-sm text-white/70 space-y-3">
            <div class="mt-2 grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-white/10 bg-base-900/40 p-3">
                <b class="text-white/90">Sua resposta</b><div class="mt-1">${pickedTxt}</div>
              </div>
              <div class="rounded-xl border border-white/10 bg-base-900/40 p-3">
                <b class="text-white/90">Gabarito</b><div class="mt-1">${correctTxt}</div>
              </div>
            </div>

            <div class="rounded-xl border border-white/10 bg-base-900/40 p-3">
              <b class="text-white/90">Por que a correta é essa</b>
              <div class="mt-1">${escapeHtml(extra.explain || "")}</div>
            </div>

            <div class="rounded-xl border border-white/10 bg-base-900/40 p-3">
              <b class="text-white/90">Conceito rápido</b>
              <div class="mt-1">${escapeHtml(extra.concept)}</div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-white/10 bg-base-900/40 p-3">
                <b class="text-white/90">Dica</b>
                <div class="mt-1">${escapeHtml(extra.tip)}</div>
              </div>
              <div class="rounded-xl border border-white/10 bg-base-900/40 p-3">
                <b class="text-white/90">Exemplo</b>
                <div class="mt-1">${escapeHtml(extra.example || "Ex.: use esse conceito em troubleshooting (ping/traceroute/logs).")}</div>
              </div>
            </div>
          </div>
        </details>
      `;
      els.review.appendChild(wrap);
    });
  }

  function stopTimer(){
    if(state.timerId){
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function openHow(){
    els.modalTitle.textContent = "Ajuda rápida";
    els.modalBody.innerHTML = `
      <p><b>Fluxo recomendado:</b> responda com <b>1–4</b>, leia o “por que” e avance com <b>Enter</b>.</p>
      <ul class="mt-2 list-disc list-inside space-y-1">
        <li><b>Esc</b>: sair do quiz</li>
        <li><b>H</b>: abrir ajuda</li>
        <li><b>Sons</b> e <b>Memes</b>: botões do topo (ON/OFF)</li>
      </ul>
      <p class="mt-2">No resultado, você ganha uma <b>mini-aula final</b> baseada nas categorias que apareceram.</p>
    `;
    try{ els.modal.showModal(); }catch(_){}
  }
  function closeHow(){ try{ els.modal.close(); }catch(_){}
  }

  function resetRecords(){
    if(!confirm("Resetar recordes?")) return;
    state.best.score = 0;
    state.best.streak = 0;
    saveBest();
    updateHomeUI();
    toast("Recordes resetados.");
  }

  // events
  els.selMode.addEventListener("change", ()=>{ click(); updateHomeUI(); });
  els.chkTimer.addEventListener("change", ()=>{ click(); updateHomeUI(); });

  els.btnStart.addEventListener("click", ()=>startGame({practice:false}));
  els.btnPractice.addEventListener("click", ()=>startGame({practice:true}));

  els.btnQuit.addEventListener("click", ()=>{
    stopTimer();
    show(els.screenHome);
    toast("Voltou ao início.");
  });

  els.btnClear.addEventListener("click", ()=>{ click(); clearSelection(); });
  els.btnConfirm.addEventListener("click", ()=>{ click(); if(els.btnNext && !els.btnNext.disabled){ els.btnNext.click(); } });
  els.btnSkip.addEventListener("click", ()=>{ click(); skipQuestion(); });
  els.btnNext.addEventListener("click", ()=>{ click();
    try{ window.RFWave && window.RFWave.pulseFromElement(els.btnNext, 1.1, "#46b0ff"); }catch(_){}
    // Próxima: salva a opção selecionada e avança
    if(!state.answered){
      if(state.selectedIdx === null){ toast("Selecione uma alternativa antes de avançar."); return; }
      lockAnswer(state.selectedIdx, false);
    }
    nextQuestion();
  });
  els.btnAgain.addEventListener("click", ()=>{ click(); startGame({practice:state.practice}); });
  els.btnHome.addEventListener("click", ()=>{ click(); show(els.screenHome); });

  els.btnHow.addEventListener("click", ()=>{ click(); openHow(); });
  if(els.btnHow2) els.btnHow2.addEventListener("click", ()=>{ click(); openHow(); });
  els.btnCloseModal.addEventListener("click", ()=>{ click(); closeHow(); });

  els.btnReset.addEventListener("click", ()=>{ click(); resetRecords(); });
  els.btnReset2.addEventListener("click", ()=>{ click(); resetRecords(); });

  els.btnSound.addEventListener("click", ()=>{
    state.soundOn = !state.soundOn;
    updateToggleUI();
    savePrefs();
    toast(state.soundOn ? "Sons ON 🔊" : "Sons OFF 🔇");
    if(state.soundOn) ensureAudio();
    if(state.soundOn) click();
  });

  els.btnMemes.addEventListener("click", ()=>{
    state.memesOn = !state.memesOn;
    updateToggleUI();
    savePrefs();
    click();
    toast(state.memesOn ? "Memes ON 😄" : "Memes OFF 😶");
  });

  window.addEventListener("resize", resizeFx, {passive:true});

  document.addEventListener("keydown", (ev)=>{
    if(els.modal.open){
      if(ev.key === "Escape") closeHow();
      return;
    }
    const k = ev.key.toLowerCase();
    if(k === "h"){ ev.preventDefault(); openHow(); return; }

    if(!els.screenQuiz.classList.contains("hidden")){
      // Navegação por teclado "software": ↑↓ muda foco, espaço seleciona, Enter = Próxima
      if(ev.key === "ArrowDown"){ ev.preventDefault(); focusOption((state.focusIdx||0) + 1); return; }
      if(ev.key === "ArrowUp"){ ev.preventDefault(); focusOption((state.focusIdx||0) - 1); return; }
      if(ev.key === " " || ev.code === "Space"){ 
        ev.preventDefault(); 
        const btn = document.querySelector(`#answers button[data-idx="${state.focusIdx||0}"]`);
        if(btn && !state.answered) btn.click();
        return;
      }
      if(["1","2","3","4"].includes(ev.key) && !state.answered){
        const idx = parseInt(ev.key,10) - 1;
        const btn = document.querySelector(`#answers button[data-idx="${idx}"]`);
        if(btn) btn.click();
      }
      if(ev.key === "Enter"){
        ev.preventDefault();
        if(!state.answered) if(els.btnNext && !els.btnNext.disabled){ els.btnNext.click(); }
        else nextQuestion();
      }
      if(ev.key === "Escape"){ ev.preventDefault(); els.btnQuit.click(); }
    }
  });

  // init
  loadPrefs();
  loadBest();
  updateToggleUI();
  const bankOk = await loadQuestionBank();
  if(!bankOk){ toast("Não consegui carregar o banco de questões (bank.json). Rode via servidor (Vite) e tente de novo."); }
  updateHomeUI();
  resizeFx();
  try{ window.RFWave && window.RFWave.init(); }catch(_){ }

})()
