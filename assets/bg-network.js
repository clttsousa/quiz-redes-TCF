
(() => {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('netBg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let w=0,h=0, dpr=1;

  const cfg = {
    nodes: 62,
    linkDist: 160,
    speed: 0.22,
    jitter: 0.015,
    glow: 0.9,
    nodeR: 2.0,
  };

  const nodes = [];
  const rand = (a,b)=>a+Math.random()*(b-a);

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    nodes.length = 0;
    for(let i=0;i<cfg.nodes;i++){
      nodes.push({
        x: rand(0,w), y: rand(0,h),
        vx: rand(-cfg.speed,cfg.speed),
        vy: rand(-cfg.speed,cfg.speed),
        p: rand(0,Math.PI*2)
      });
    }
  }

  function draw(mouse){
    ctx.clearRect(0,0,w,h);

    // Soft gradient wash
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(70,176,255,0.08)');
    g.addColorStop(1,'rgba(11,74,139,0.06)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // Links
    ctx.lineWidth = 1;
    for(let i=0;i<nodes.length;i++){
      const a = nodes[i];
      for(let j=i+1;j<nodes.length;j++){
        const b = nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist = Math.hypot(dx,dy);
        if(dist < cfg.linkDist){
          const t = 1 - dist/cfg.linkDist;
          ctx.strokeStyle = `rgba(70,176,255,${0.10*t})`;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    for(const n of nodes){
      const t = 0.65;
      ctx.fillStyle = `rgba(255,255,255,${0.10})`;
      ctx.beginPath();
      ctx.arc(n.x,n.y,cfg.nodeR+1.2,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle = `rgba(70,176,255,${0.35*t})`;
      ctx.beginPath();
      ctx.arc(n.x,n.y,cfg.nodeR,0,Math.PI*2);
      ctx.fill();
    }

    // Mouse halo
    if(mouse && mouse.active){
      const r = 220;
      const radial = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r);
      radial.addColorStop(0, 'rgba(70,176,255,0.12)');
      radial.addColorStop(1, 'rgba(70,176,255,0)');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, r, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function step(mouse){
    for(const n of nodes){
      n.p += cfg.jitter;
      n.vx += Math.sin(n.p)*0.002;
      n.vy += Math.cos(n.p)*0.002;

      n.x += n.vx;
      n.y += n.vy;

      if(n.x < -20) n.x = w+20;
      if(n.x > w+20) n.x = -20;
      if(n.y < -20) n.y = h+20;
      if(n.y > h+20) n.y = -20;
    }
    draw(mouse);
  }

  let raf = null;
  const mouse = {x:0,y:0,active:false};
  const onMove = (ev)=>{
    const rect = canvas.getBoundingClientRect();
    mouse.x = ev.clientX - rect.left;
    mouse.y = ev.clientY - rect.top;
    mouse.active = true;
  };

  function loop(){
    step(mouse);
    raf = requestAnimationFrame(loop);
  }

  function start(){
    resize();
    init();
    if(prefersReduced){
      draw(null);
      return;
    }
    window.addEventListener('mousemove', onMove, {passive:true});
    loop();
  }

  const ro = new ResizeObserver(()=>{ resize(); });
  ro.observe(canvas);
  start();
})();
