(() => {
  const $ = (s)=>document.querySelector(s);

  const KEY = "redeQuizLastResult";

  function esc(s){
    return String(s??"").replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;" }[m]));
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

  function enrich(h){
    const explain = h.explain || h.explanation || "";
    const qtext = (h.q || h.question || "").toLowerCase();
    const cat = (h.category || "").toLowerCase();

    const byCat = (name)=> cat.includes(name);

    let concept = h.concept || "";
    let tip = h.tip || "";
    let example = h.example || "";

    // Category-driven dynamic coaching (telecom-friendly)
    if(!concept || !tip || !example){
      if(byCat("dns") || qtext.includes("dns")){
        concept ||= "DNS traduz nomes (ex.: www) em IPs. Recursivo resolve por você consultando outros servidores; autoritativo responde pelos registros oficiais da zona.";
        tip ||= "Atalho mental: recursivo = “vai atrás” da resposta; autoritativo = “fonte oficial”. Teste com nslookup/dig e compare resolvers.";
        example ||= "Telecom: cliente reclama “site não abre”, mas navegação em apps funciona. Trocar DNS do CPE/ONU ou corrigir zona autoritativa pode resolver sem mexer no link.";
      }else if(byCat("nat") || byCat("cgnat") || byCat("dnat") || qtext.includes("nat")){
        concept ||= "NAT traduz endereços: geralmente SNAT na saída (LAN → Internet). DNAT redireciona entrada (Internet → host interno). CGNAT compartilha um IP público entre vários clientes.";
        tip ||= "Pergunta-chave: é tráfego de saída ou entrada? Saída costuma ser SNAT/masquerade; entrada (port forwarding) é DNAT. Em CGNAT, porta aberta “não pega”.";
        example ||= "Telecom: cliente quer acessar DVR/câmera de fora. Se está em CGNAT, precisa IP público/IPv6 ou túnel/VPN; se tem IP público, configura DNAT no roteador.";
      }else if(byCat("dhcp") || qtext.includes("dhcp")){
        concept ||= "DHCP automatiza IP/máscara/gateway/DNS. O processo clássico é DORA: Discover → Offer → Request → Ack.";
        tip ||= "Dica: quando “não navega”, cheque se pegou IP válido, gateway e DNS. Renovar lease e olhar logs do servidor ajuda muito.";
        example ||= "Telecom: ONU/roteador do cliente pega IP errado (ou 169.254.x.x). Isso aponta DHCP falhando, pool cheio ou VLAN errada na OLT/switch.";
      }else if(byCat("udp") || (byCat("tcp") && qtext.includes("udp")) || qtext.includes("udp")){
        concept ||= "UDP é não orientado à conexão: menor overhead, sem garantia de entrega/ordem. TCP é orientado à conexão, confiável e com controle de congestionamento.";
        tip ||= "Regra rápida: latência/tempo real → UDP (VoIP/streaming/DNS). Integridade/ordem → TCP (web, arquivos, e-mail).";
        example ||= "Telecom: VoIP usa UDP para reduzir atraso. Se há perda/jitter no acesso, a qualidade cai (voz picota) mesmo com ‘internet funcionando’.";
      }else if(byCat("sub") || byCat("máscara") || byCat("mascara") || qtext.includes("255.") || qtext.includes("/")){
        concept ||= "Máscara define rede e hosts. Hosts úteis ≈ 2^(bits de host) − 2 (exceto casos especiais). Gateway precisa estar na mesma sub-rede do host.";
        tip ||= "Atalho: /24 → 254 hosts, /26 → 62, /27 → 30, /30 → 2. Sempre valide rede/broadcast antes de atribuir IP.";
        example ||= "Telecom: cliente com máscara errada não alcança o gateway do provedor; link ‘sobe’, mas não roteia. Corrigir máscara/gateway resolve.";
      }else if(byCat("wifi") || byCat("wireless") || qtext.includes("wpa")){
        concept ||= "Wi‑Fi é sensível a interferência (canal, distância, obstáculos). WPA2/WPA3 tratam a segurança; WPA3 melhora proteção contra ataques de senha.";
        tip ||= "Boas práticas: 5GHz para desempenho perto; 2.4GHz para alcance. Ajuste canal, evite sobreposição e posicione o AP alto/central.";
        example ||= "Telecom: cliente “tem fibra 600M” mas no Wi‑Fi dá 80M. Pode ser 2.4GHz congestionado ou AP mal posicionado — teste cabo primeiro.";
      }else if(byCat("fibra") || byCat("conector") || qtext.includes("sc") || qtext.includes("lc")){
        concept ||= "Conectores de fibra (SC/LC/ST/FC) variam em tamanho e fixação. LC é alta densidade; SC é comum em FTTx; FC é roscado e estável; ST é legado.";
        tip ||= "Dica: em rack/densidade alta → LC. Em campo/FTTx → SC. Em medição/lab com vibração → FC. Limpeza é essencial.";
        example ||= "Telecom: em CTO/ONT é comum SC/APC. Em data center, LC domina por ocupar menos espaço no patch panel.";
      }else if(qtext.includes("http") || qtext.includes("ftp") || qtext.includes("smtp") || qtext.includes("ssh")){
        concept ||= "HTTP navegação web, FTP transferência de arquivos (legado), SMTP envio de e-mails, SSH acesso remoto seguro e tunelamento.";
        tip ||= "Atalho: HTTP/HTTPS (80/443), SMTP (25/465/587), SSH (22). Evite FTP puro em produção; prefira SFTP/SSH.";
        example ||= "Telecom: para gerenciar equipamentos, SSH é padrão. Para publicar site, use SFTP/SSH em vez de FTP sem criptografia.";
      }else if(qtext.includes("proxy") || qtext.includes("vpn")){
        concept ||= "Proxy encaminha tráfego e pode mascarar IP, mas não garante criptografia. VPN cria túnel criptografado e protege o tráfego ponta a ponta até o servidor VPN.";
        tip ||= "Regra: se a prioridade é privacidade/segurança em Wi‑Fi público → VPN. Proxy serve mais para roteamento/controle e casos simples.";
        example ||= "Telecom: equipe NOC acessa sistemas internos via VPN corporativa; proxy pode ser usado para controle de navegação e políticas.";
      }else{
        concept ||= `Este tema (${h.category || "Redes"}) explica como dados e serviços funcionam em redes e como diagnosticar problemas com base em camadas e protocolos.`;
        tip ||= "Quando errar: releia o ‘por quê’, associe a um cenário real (cliente/ONU/OLT/roteador) e repita 2–3 questões do mesmo tópico.";
        example ||= "Telecom: valide sempre o básico na ordem: físico → IP/máscara/gateway → DNS → rotas/NAT → aplicação.";
      }
    }

    return { explain, concept, tip, example };
  }


  function buildTop(stats){
    const top = $("#top");
    if(!top) return;
    top.innerHTML = `
      <div class="card"><div class="text-xs text-white/60">Questões</div><div class="mt-1 text-2xl font-black">${stats.total}</div></div>
      <div class="card"><div class="text-xs text-white/60">Acertos</div><div class="mt-1 text-2xl font-black">${stats.hits}</div></div>
      <div class="card"><div class="text-xs text-white/60">Erros / não respondidas</div><div class="mt-1 text-2xl font-black">${stats.errs}</div></div>
      <div class="card"><div class="text-xs text-white/60">Taxa de acerto</div><div class="mt-1 text-2xl font-black">${stats.rate}%</div></div>
    `;
  }

  function render(){
    const raw = localStorage.getItem(KEY);
    if(!raw){
      $("#empty")?.classList.remove("hidden");
      return;
    }
    let data;
    try{ data = JSON.parse(raw); }catch(_){
      $("#empty")?.classList.remove("hidden");
      return;
    }

    const hist = data.history || [];
    const total = hist.length || (data.total || 0);
    const hits = hist.filter(h=>h.picked === h.correct).length;
    const errs = hist.filter(h=>h.picked !== h.correct).length;
    const rate = total ? Math.round((hits/total)*100) : 0;
    buildTop({total, hits, errs, rate});

    const cards = $("#cards");
    if(!cards) return;
    cards.innerHTML = "";

    const wrong = hist.filter(h=>h.picked !== h.correct);

    if(!wrong.length){
      cards.innerHTML = `<div class="card"><div class="text-lg font-black font-display">Você não errou nada 🎉</div>
        <div class="mt-2 text-sm text-white/70">Se quiser estudar mesmo assim, refaça no modo difícil e com tempo ligado.</div></div>`;
      return;
    }

    wrong.forEach((h, idx)=>{
      const pickedTxt = (h.picked === null ? "— (não respondida)" : h.choices?.[h.picked]);
      const correctTxt = h.choices?.[h.correct];
      const extra = enrich(h);

      const el = document.createElement("details");
      el.className = "card";
      el.open = idx === 0;

      el.innerHTML = `
        <summary class="cursor-pointer">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div class="min-w-0">
              <div class="text-xs text-white/60">Erro ${idx+1} • ${esc(h.difficulty || "")}</div>
              <div class="mt-1 text-base font-extrabold leading-snug">${esc(h.q)}</div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="chip">${catIcon(h.category)} ${esc(h.category || "Geral")}</span>
                <span class="chip">✅ Correta: ${esc(correctTxt || "")}</span>
              </div>
            </div>
            <div class="chip">↕ Abrir/fechar</div>
          </div>
        </summary>

        <div class="mt-4 grid grid-cols-2 gap-3">
          <div class="card" style="background: rgba(244,63,94,.08); border-color: rgba(244,63,94,.25);">
            <div class="text-xs text-white/60">Sua resposta</div>
            <div class="mt-2 text-sm font-extrabold text-rose-200">${esc(pickedTxt || "")}</div>
          </div>
          <div class="card" style="background: rgba(34,197,94,.08); border-color: rgba(34,197,94,.25);">
            <div class="text-xs text-white/60">Gabarito</div>
            <div class="mt-2 text-sm font-extrabold text-emerald-200">${esc(correctTxt || "")}</div>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-3 gap-3">
          <div class="card">
            <div class="text-xs text-white/60">Por que a correta é essa</div>
            <div class="mt-2 text-sm text-white/75 leading-relaxed">${esc(extra.explain)}</div>
          </div>
          <div class="card">
            <div class="text-xs text-white/60">Conceito</div>
            <div class="mt-2 text-sm text-white/75 leading-relaxed">${esc(extra.concept)}</div>
          </div>
          <div class="card">
            <div class="text-xs text-white/60">Exemplo em telecom</div>
            <div class="mt-2 text-sm text-white/75 leading-relaxed">${esc(extra.example)}</div>
          </div>
        </div>

        <div class="mt-3 card">
          <div class="text-xs text-white/60">Dica prática</div>
          <div class="mt-2 text-sm text-white/75 leading-relaxed">${esc(extra.tip)}</div>
        </div>
      `;
      cards.appendChild(el);
    });
  }

  $("#btnClearStore")?.addEventListener("click", ()=>{
    localStorage.removeItem(KEY);
    location.reload();
  });

  render();
})();