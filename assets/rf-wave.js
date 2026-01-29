// RF Wave background (telecom) - subtle layered sine waves + occasional data packets + reactive pulses
(() => {
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
  const rand = (a,b)=>a+Math.random()*(b-a);

  const state = {
    canvas: null,
    ctx: null,
    dpr: 1,
    w: 0, h: 0,
    t0: 0,
    running: false,
    waves: [],
    packets: [],
    pulses: [],
    // transient color flash (0..1)
    flashA: 0,
    flashColor: [70,176,255],
    // event boosts
    ampBoost: 0,
    nextPacketAt: 0,
  };

  function resize(){
    const c = state.canvas;
    if(!c) return;
    const rect = c.getBoundingClientRect();
    state.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    state.w = Math.max(1, Math.floor(rect.width * state.dpr));
    state.h = Math.max(1, Math.floor(rect.height * state.dpr));
    c.width = state.w;
    c.height = state.h;
  }

  function hexToRgb(hex){
    const m = String(hex||"").trim().match(/^#?([0-9a-f]{6})$/i);
    if(!m) return [70,176,255];
    const n = parseInt(m[1],16);
    return [(n>>16)&255, (n>>8)&255, n&255];
  }

  function setFlash(color="#46b0ff", alpha=0.25){
    state.flashColor = hexToRgb(color);
    state.flashA = clamp(alpha, 0, 0.55);
  }

  function pulseAt(x,y, intensity=1, color="#46b0ff"){
    const rgb = hexToRgb(color);
    state.pulses.push({
      x, y,
      r: 0,
      v: (520 + 200*Math.random()) * state.dpr,
      a: clamp(0.22*intensity, 0.08, 0.42),
      rgb,
    });
    state.ampBoost = Math.max(state.ampBoost, 0.6*intensity);
  }

  function pulseFromElement(el, intensity=1, color="#46b0ff"){
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const cRect = state.canvas.getBoundingClientRect();
    const cx = (rect.left + rect.width/2) - cRect.left;
    const cy = (rect.top + rect.height/2) - cRect.top;
    pulseAt(cx*state.dpr, cy*state.dpr, intensity, color);
  }

  function spawnPacket(){
    // pick one of 3 lanes (waves)
    const lane = Math.floor(Math.random()*3);
    const dir = Math.random() < 0.5 ? 1 : -1;
    state.packets.push({
      lane,
      p: dir>0 ? 0 : 1,
      dir,
      sp: rand(0.11, 0.18), // progress per second
      hue: Math.random() < 0.6 ? 0 : 1, // 0=blue,1=pink
      size: rand(1.4, 2.2) * state.dpr,
      a: rand(0.18, 0.32),
    });
  }

  function waveY(lane, x, t){
    const w = state.w, h = state.h;
    const lanes = [0.40, 0.48, 0.56].map(p=>h*p);
    const y0 = lanes[lane] || lanes[1];
    const nx = x / w;
    // gentle layers, slow periods 12-18s
    const aBoost = 1 + state.ampBoost*0.55;
    const amp1 = (10*state.dpr) * aBoost;
    const amp2 = (6*state.dpr) * aBoost;
    const amp3 = (3.5*state.dpr) * aBoost;

    const p1 = t*0.55 + lane*0.8;
    const p2 = t*0.38 - lane*0.6;
    const p3 = t*0.22;

    return y0
      + Math.sin(nx*12*Math.PI + p1)*amp1
      + Math.sin(nx*6*Math.PI  - p2)*amp2
      + Math.sin(nx*20*Math.PI + p3)*amp3;
  }

  function draw(t){
    const ctx = state.ctx;
    const w = state.w, h = state.h;
    if(!ctx || w<=2 || h<=2) return;

    ctx.clearRect(0,0,w,h);

    // overall opacity is controlled via CSS, keep drawing clean
    ctx.globalCompositeOperation = "source-over";

    // flash tint
    const [fr,fg,fb] = state.flashColor;
    if(state.flashA > 0.001){
      ctx.fillStyle = `rgba(${fr},${fg},${fb},${(state.flashA*0.08).toFixed(4)})`;
      ctx.fillRect(0,0,w,h);
      state.flashA *= 0.90;
    }

    // waves
    const baseAlpha = 0.09; // 5–12% target (CSS will multiply)
    for(let lane=0; lane<3; lane++){
      const yMid = (lane===1) ? 0.16 : 0.11;
      const grad = ctx.createLinearGradient(0,0,w,0);
      grad.addColorStop(0, `rgba(70,176,255,${baseAlpha*0.0})`);
      grad.addColorStop(0.35, `rgba(70,176,255,${baseAlpha*(0.85+yMid)})`);
      grad.addColorStop(0.60, `rgba(255,64,129,${baseAlpha*(0.60+yMid*0.6)})`);
      grad.addColorStop(1, `rgba(255,64,129,${baseAlpha*0.0})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = (lane===1 ? 2.2 : 1.6) * state.dpr;
      ctx.beginPath();
      const step = 12*state.dpr;
      for(let x=0; x<=w; x+=step){
        const y = waveY(lane, x, t);
        if(x===0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
      }
      ctx.stroke();
    }

    // packets
    ctx.globalCompositeOperation = "lighter";
    for(const pkt of state.packets){
      pkt.p += pkt.dir * pkt.sp * (1/60);
      if(pkt.p < -0.05 || pkt.p > 1.05) pkt.dead = true;
      const x = clamp(pkt.p,0,1) * w;
      const y = waveY(pkt.lane, x, t);
      const isPink = pkt.hue===1;
      const col = isPink ? [255,64,129] : [70,176,255];
      ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${pkt.a})`;
      ctx.beginPath();
      ctx.arc(x, y, pkt.size, 0, Math.PI*2);
      ctx.fill();
      // tiny tail
      ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${pkt.a*0.45})`;
      ctx.lineWidth = 1.0*state.dpr;
      ctx.beginPath();
      ctx.moveTo(x - pkt.dir*(10*state.dpr), y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    state.packets = state.packets.filter(p=>!p.dead);

    // pulses (from UI actions)
    ctx.globalCompositeOperation = "screen";
    for(const p of state.pulses){
      p.r += p.v*(1/60);
      p.a *= 0.94;
      if(p.a < 0.01) p.dead = true;
      const [r,g,b] = p.rgb;
      ctx.strokeStyle = `rgba(${r},${g},${b},${p.a})`;
      ctx.lineWidth = 2.2*state.dpr;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.stroke();
    }
    state.pulses = state.pulses.filter(p=>!p.dead);

    // decay boosts
    state.ampBoost *= 0.93;

    // packet spawner timing
    const now = performance.now();
    if(now > state.nextPacketAt){
      spawnPacket();
      state.nextPacketAt = now + rand(2000, 4200);
    }
  }

  function loop(){
    if(!state.running) return;
    const now = performance.now();
    const t = (now - state.t0)/1000;
    draw(t);
    requestAnimationFrame(loop);
  }

  function init(){
    if(state.running) return;
    const c = document.getElementById("rfWaveCanvas");
    if(!c) return;
    state.canvas = c;
    state.ctx = c.getContext("2d", {alpha:true});
    resize();
    window.addEventListener("resize", resize, {passive:true});
    state.t0 = performance.now();
    state.running = true;
    // initial packet schedule
    state.nextPacketAt = performance.now() + rand(800, 1600);
    requestAnimationFrame(loop);
  }

  window.RFWave = {
    init,
    resize,
    pulseAt,
    pulseFromElement,
    flash: setFlash,
  };
})();