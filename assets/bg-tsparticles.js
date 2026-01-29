(function(){
  // tsParticles telecom background: nodes + links + "data packets" stream
  function boot(){
    const el = document.getElementById("tsparticles");
    if(!el || !window.tsParticles) return;

    document.body.classList.add("use-tsp");

    const opts = {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: { value: 46, density: { enable: true, area: 900 } },
        color: { value: ["#46b0ff", "#ff4081", "#7dd3fc"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.18, max: 0.55 } },
        size: { value: { min: 1, max: 2.6 } },
        links: {
          enable: true,
          distance: 135,
          color: "#46b0ff",
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.55,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" }
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.35 } },
          push: { quantity: 2 }
        }
      },
      // "Pacotes": pequenos trilhos que surgem de vez em quando e atravessam
      emitters: [
        {
          position: { x: -5, y: 50 },
          rate: { quantity: 1, delay: 0.65 },
          particles: {
            color: { value: ["#46b0ff", "#ff4081"] },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
            opacity: { value: { min: 0.35, max: 0.9 } },
            move: {
              enable: true,
              speed: 2.2,
              direction: "right",
              straight: true
            },
            life: { duration: { sync: true, value: 1.7 }, count: 1 }
          }
        },
        {
          position: { x: 105, y: 15 },
          rate: { quantity: 1, delay: 0.95 },
          particles: {
            color: { value: ["#7dd3fc", "#46b0ff"] },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
            opacity: { value: { min: 0.25, max: 0.85 } },
            move: {
              enable: true,
              speed: 2.0,
              direction: "left",
              straight: true
            },
            life: { duration: { sync: true, value: 1.8 }, count: 1 }
          }
        }
      ]
    };

    // degrade gracefully if emitters not supported in current build
    try{
      window.tsParticles.load("tsparticles", opts);
    }catch(err){
      // fallback: remove emitters
      try{
        delete opts.emitters;
        window.tsParticles.load("tsparticles", opts);
      }catch(_){}
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else boot();
})();