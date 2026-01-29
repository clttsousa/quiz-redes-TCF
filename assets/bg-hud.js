
(() => {
  const canvas = document.getElementById('hudParticles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', {alpha:true});
  let w=0,h=0,dpr=1;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand=(a,b)=>a+Math.random()*(b-a);
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

  const cfg = {
    count: 90,
    linkDist: 140,
    speed: 0.35,
    mouseForce: 0.012,
    repel: 0.08,
  };

  const pts=[];
  const mouse={x:0,y:0,active:false};

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    pts.length=0;
    for(let i=0;i<cfg.count;i++){
      pts.push({
        x: rand(0,w), y: rand(0,h),
        vx: rand(-cfg.speed,cfg.speed),
        vy: rand(-cfg.speed,cfg.speed),
        r: rand(0.8,2.1),
        c: Math.random() < 0.15 ? "pink" : "blue"
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);

    // links
    for(let i=0;i<pts.length;i++){
      const a=pts[i];
      for(let j=i+1;j<pts.length;j++){
        const b=pts[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const d=Math.hypot(dx,dy);
        if(d < cfg.linkDist){
          const t = 1 - d/cfg.linkDist;
          const col = `rgba(70,176,255,${0.10*t})`;
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    // particles
    for(const p of pts){
      const glow = p.c==="pink" ? "rgba(255,64,129,0.26)" : "rgba(70,176,255,0.22)";
      const core = p.c==="pink" ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.18)";
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3.0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }

    // mouse halo
    // mouse interaction disabled (fixed animation)
      // (kept for performance and consistency)


      // damping
      p.vx *= 0.985;
      p.vy *= 0.985;

      // wrap
      if(p.x < -30) p.x = w+30;
      if(p.x > w+30) p.x = -30;
      if(p.y < -30) p.y = h+30;
      if(p.y > h+30) p.y = -30;
    }

    draw();
    if(!prefersReduced) requestAnimationFrame(step);
  }

  function onMove(ev){
    const rect = canvas.getBoundingClientRect();
    mouse.x = ev.clientX - rect.left;
    mouse.y = ev.clientY - rect.top;
    mouse.active = true;
  }
  function onLeave(){ mouse.active = false; }

  const ro = new ResizeObserver(()=>{ resize(); init(); });
  ro.observe(canvas);

  resize(); init(); draw();
  if(!prefersReduced){
    requestAnimationFrame(step);
  }

})();
