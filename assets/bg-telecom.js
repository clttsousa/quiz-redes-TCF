
(() => {
  const canvas = document.getElementById('telecomBg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', {alpha:true});
  let w=0,h=0,dpr=1;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rand=(a,b)=>a+Math.random()*(b-a);
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

  const nodes=[];
  const links=[];
  const packets=[];

  const cfg={
    nodes: 11,
    linkDist: 260,
    packetRate: 0.018,  // packets per frame approx
    packetSpeed: 0.0048,
  };

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    nodes.length=0; links.length=0; packets.length=0;
    // place nodes in a loose grid
    const cols=6, rows=3;
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        if(nodes.length>=cfg.nodes) break;
        nodes.push({
          x: (c+0.5)*(w/cols) + rand(-22,22),
          y: (r+0.55)*(h/rows) + rand(-22,22),
          phase: rand(0,Math.PI*2),
          kind: (Math.random()<0.18) ? "tower" : "node"
        });
      }
    }
    // build links by distance
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<cfg.linkDist && Math.random() < 0.55){
          links.push({i,j,d});
        }
      }
    }
    // ensure connectivity a bit (nearest neighbor)
    nodes.forEach((a,i)=>{
      let best=-1, bd=1e9;
      nodes.forEach((b,j)=>{
        if(i===j) return;
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<bd){bd=d; best=j;}
      });
      if(best>=0) links.push({i,best,d:bd});
    });
  }

  function spawnPacket(){
    if(!links.length) return;
    const L = links[Math.floor(Math.random()*links.length)];
    const dir = Math.random()<0.5 ? 0 : 1;
    packets.push({
      link: L,
      t: dir?1:0,
      dir: dir? -1 : 1,
      life: rand(0.9,1.6),
      hue: Math.random()<0.25 ? "pink" : "blue"
    });
  }

  function drawRFWaves(tNow){
    const t = tNow*0.001;
    const corners = [ [120,120,1], [w-120,120,-1], [120,h-120,1], [w-120,h-120,-1] ];
    for(const [cx,cy,dir] of corners){
      for(let i=1;i<=3;i++){
        const r = 28*i + (Math.sin(t*0.9 + i)*6);
        ctx.beginPath();
        ctx.arc(cx,cy,r, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(70,176,255,${0.02 + i*0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function drawFibers(tNow){
    // moving fiber-like arcs across the scene
    const t = tNow * 0.001;
    const bands = 7;
    for(let i=0;i<bands;i++){
      const y0 = (h*(0.18 + i*0.11)) + Math.sin(t*0.9 + i)*14;
      const amp = 18 + i*2;
      const freq = 0.006 + i*0.0007;
      const speed = 0.7 + i*0.08;
      const phase = t*speed + i*0.8;
      ctx.beginPath();
      for(let x=0;x<=w;x+=18){
        const y = y0 + Math.sin(x*freq + phase)*amp;
        if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      const a = 0.04 + (i/bands)*0.03;
      ctx.strokeStyle = (i%2===0) ? `rgba(70,176,255,${a})` : `rgba(255,64,129,${a*0.9})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function draw(tNow){
    ctx.clearRect(0,0,w,h);

    // soft beams
    const beam = ctx.createLinearGradient(0,0,w,h);
    beam.addColorStop(0,'rgba(70,176,255,0.035)');
    beam.addColorStop(1,'rgba(255,64,129,0.028)');
    ctx.fillStyle=beam;
    ctx.fillRect(0,0,w,h);

    // RF rings from 2-3 tower nodes
    const towers = nodes.filter(n=>n.kind==="tower").slice(0,3);
    towers.forEach((n,idx)=>{
      const base = (tNow*0.0012 + idx*0.33) % 1;
      for(let k=0;k<3;k++){
        const p=(base + k*0.33)%1;
        const r= 30 + p*260;
        const a = (1-p)*0.12;
        ctx.strokeStyle = `rgba(70,176,255,${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x,n.y,r,0,Math.PI*2);
        ctx.stroke();
      }
    });

    drawRFWaves(tNow);
    drawFibers(tNow);

    // links
    for(const L of links){
      const a=nodes[L.i], b=nodes[L.j];
      ctx.strokeStyle='rgba(70,176,255,0.08)';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(a.x,a.y);
      ctx.lineTo(b.x,b.y);
      ctx.stroke();
    }

    // nodes
    for(const n of nodes){
      n.phase += 0.015;
      const glow = 0.10 + 0.06*Math.sin(n.phase);
      if(n.kind==="tower"){
        // tower icon
        ctx.strokeStyle = `rgba(255,255,255,${0.16+glow})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y-10);
        ctx.lineTo(n.x-7, n.y+10);
        ctx.lineTo(n.x+7, n.y+10);
        ctx.closePath();
        ctx.stroke();

        // mast
        ctx.strokeStyle = `rgba(70,176,255,${0.22+glow})`;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y-12);
        ctx.lineTo(n.x, n.y+10);
        ctx.stroke();
      }else{
        ctx.fillStyle=`rgba(255,255,255,${0.10+glow})`;
        ctx.beginPath(); ctx.arc(n.x,n.y,3.8,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=`rgba(70,176,255,${0.18+glow})`;
        ctx.beginPath(); ctx.arc(n.x,n.y,2.2,0,Math.PI*2); ctx.fill();
      }
    }

    // packets
    for(const p of packets){
      const L=p.link;
      const a=nodes[L.i], b=nodes[L.j];
      const x = a.x + (b.x-a.x)*p.t;
      const y = a.y + (b.y-a.y)*p.t;

      const col = p.hue==="pink" ? `rgba(255,64,129,` : `rgba(70,176,255,`;
      ctx.fillStyle = col + `0.22)`;
      ctx.beginPath(); ctx.arc(x,y,7.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath(); ctx.arc(x,y,2.6,0,Math.PI*2); ctx.fill();

      // trail
      ctx.strokeStyle = col + `0.12)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - (b.x-a.x)*0.05, y - (b.y-a.y)*0.05);
      ctx.lineTo(x,y);
      ctx.stroke();
    }
  }

  function step(tNow){
    // spawn
    if(Math.random() < cfg.packetRate) spawnPacket();
    // update packets
    for(let i=packets.length-1;i>=0;i--){
      const p=packets[i];
      p.t += cfg.packetSpeed * p.dir;
      p.life -= 0.016;
      if(p.t<0 || p.t>1 || p.life<=0) packets.splice(i,1);
    }
    draw(tNow);
    if(!prefersReduced) requestAnimationFrame(step);
  }

  const ro = new ResizeObserver(()=>{ resize(); init(); });
  ro.observe(canvas);
  resize(); init();
  draw(0);
  if(!prefersReduced) requestAnimationFrame(step);
})();
