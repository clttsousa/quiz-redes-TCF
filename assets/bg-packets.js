
(() => {
  const canvas = document.getElementById('pktBg');
  const net = document.getElementById('netBg');
  if(!canvas || !net) return;
  const ctx = canvas.getContext('2d', {alpha:true});
  let w=0,h=0,dpr=1;

  const rand=(a,b)=>a+Math.random()*(b-a);
  const packets=[];
  const N=14;

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function spawn(){
    return {
      x: rand(0,w), y: rand(0,h),
      vx: rand(-0.6,0.6), vy: rand(-0.6,0.6),
      t: rand(0,1), life: rand(1.6,2.6),
      r: rand(1.2,2.2)
    };
  }

  function init(){
    packets.length=0;
    for(let i=0;i<N;i++) packets.push(spawn());
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of packets){
      p.t += 1/60;
      p.x += p.vx;
      p.y += p.vy;
      const a = Math.max(0, 1 - p.t/p.life);
      // glow dot
      ctx.fillStyle = `rgba(70,176,255,${0.22*a})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y, p.r*3.2, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${0.18*a})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y, p.r, 0, Math.PI*2);
      ctx.fill();

      // tiny trail
      ctx.strokeStyle = `rgba(70,176,255,${0.10*a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x - p.vx*10, p.y - p.vy*10);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      if(p.t > p.life || p.x<-40 || p.x>w+40 || p.y<-40 || p.y>h+40){
        const np = spawn();
        p.x=np.x; p.y=np.y; p.vx=np.vx; p.vy=np.vy; p.t=0; p.life=np.life; p.r=np.r;
      }
    }
    requestAnimationFrame(step);
  }

  const ro = new ResizeObserver(()=>resize());
  ro.observe(canvas);
  resize(); init(); step();
})();
