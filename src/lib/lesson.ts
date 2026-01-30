import type { RenderQuestion } from '@/lib/types'

export type Lesson = {
  title: string
  /** One sentence the user can say out loud to fix the concept */
  oneLiner?: string
  /** Short concept framing (1–3 bullets) */
  concept?: string[]
  /** How to solve / think (2–5 bullets) */
  steps?: string[]
  /** Why the correct option is correct (2–5 bullets) */
  whyCorrect: string[]
  /** Why the user missed it / common traps (2– showing personalized guidance) */
  whyWrong: string[]
  /** Notes about distractors (top 2-3 most plausible wrong options) */
  distractors?: string[]
  /** Key takeaways to remember */
  keyTakeaways: string[]
  /** Exam tips (shortcuts) */
  examTips: string[]
}

function norm(s: string) {
  return (s || '').toLowerCase()
}

// Simple PT-BR stopwords (enough for similarity + keyword extraction)
const STOP = new Set([
  'a',
  'o',
  'os',
  'as',
  'um',
  'uma',
  'uns',
  'umas',
  'de',
  'do',
  'da',
  'dos',
  'das',
  'em',
  'no',
  'na',
  'nos',
  'nas',
  'por',
  'para',
  'pra',
  'com',
  'sem',
  'sobre',
  'entre',
  'e',
  'ou',
  'mas',
  'se',
  'que',
  'qual',
  'quais',
  'quando',
  'onde',
  'como',
  'porquê',
  'porque',
  'por que',
  'é',
  'são',
  'ser',
  'estar',
  'tem',
  'têm',
  'uma',
  'isso',
  'essa',
  'esse',
  'estas',
  'estes',
  'aquele',
  'aquela',
  'aquilo',
  'mais',
  'menos',
  'muito',
  'pouco',
  'também',
  'apenas',
  'só',
  'toda',
  'todo',
  'todas',
  'todos',
  'cada',
  'mesmo',
  'mesma',
  'mesmos',
  'mesmas',
  'geral',
  'geralmente',
  'normalmente',
])

function tokens(s: string) {
  const out: string[] = []
  const raw = norm(s)
    .replace(/[^a-z0-9áàâãéèêíìîóòôõúùûç/.-]+/gi, ' ')
    .split(/\s+/)
    .filter(Boolean)
  for (const w of raw) {
    if (w.length < 3) continue
    if (STOP.has(w)) continue
    out.push(w)
  }
  return out
}

function overlapScore(a: string[], b: string[]) {
  const setB = new Set(b)
  let hit = 0
  for (const x of a) if (setB.has(x)) hit++
  return hit
}

function firstMeaningfulLine(explain?: string) {
  if (!explain) return undefined
  const clean = explain.replace(/\s+/g, ' ').trim()
  if (!clean) return undefined
  // keep it short for one-liner
  const cut = clean.length > 140 ? clean.slice(0, 140).replace(/\s+\S*$/, '') + '…' : clean
  return cut
}

type Hints = {
  concept?: string[]
  steps?: string[]
  keyTakeaways?: string[]
  examTips?: string[]
  oneLiner?: string
  trapPatterns?: Array<{ re: RegExp; note: string }>
}

// Category-driven knowledge base (short, practical, exam-focused)
const KB: Record<string, Hints> = {
  Conceitos: {
    concept: ['Rede = dispositivos interligados trocando dados e compartilhando recursos (serviços, arquivos, internet).'],
    steps: ['Puxe a definição central do termo do enunciado.', 'Elimine opções que descrevem *um serviço* ou *um dispositivo* (rede é o conjunto e a comunicação).'],
    examTips: ['Se a alternativa “reduz” a ideia (ex.: “um PC com internet”), quase sempre está errada.'],
  },
  'Tipos de Rede': {
    concept: ['LAN: área local (casa/escritório). MAN: área metropolitana. WAN: longa distância (cidades/países). PAN: pessoal (curta).'],
    steps: ['Identifique a *escala geográfica* citada (casa → LAN; cidade → MAN; países → WAN).'],
    examTips: ['Quando o enunciado fala “filiais/cidades/ISP”, pense em WAN.'],
  },
  Topologias: {
    concept: ['Topologia física/lógica define como os nós se conectam: estrela (switch), barramento (meio compartilhado), anel, malha.'],
    steps: ['Procure a palavra que indica o “formato” (centralizado = estrela; todos com todos = malha).'],
    examTips: ['Em redes modernas Ethernet com switch, a resposta costuma ser “estrela”.'],
  },
  Equipamentos: {
    concept: ['Switch (L2) comuta por MAC; roteador (L3) encaminha por IP; AP conecta Wi‑Fi; modem termina o link do provedor.'],
    steps: ['Pergunta de equipamento = qual *camada* ele resolve (MAC x IP x Rádio).', 'Leia os verbos: “rotear/encaminhar” → roteador; “comutar” → switch.'],
    examTips: ['Se fala em “sub-rede”/“gateway” → roteador. Se fala em “VLAN/MAC” → switch.'],
  },
  'OSI vs TCP/IP': {
    concept: ['OSI (7 camadas) é modelo conceitual; TCP/IP (4/5) é modelo prático usado na internet.'],
    steps: ['Localize a palavra‑chave: MAC/VLAN (L2), IP/roteamento (L3), TCP/UDP/porta (L4), HTTP/DNS (L7).'],
    keyTakeaways: ['L1 físico • L2 enlace • L3 rede • L4 transporte • L7 aplicação (no OSI).'],
    examTips: ['“Porta” = L4; “IP” = L3; “MAC” = L2.'],
  },
  'TCP/IP': {
    concept: ['TCP: conexão, confiável (ACK/retransmissão), ordenado. IP: endereçamento/roteamento.'],
    steps: ['Se o enunciado pede “confiabilidade/ordem/ACK/handshake”, é TCP.', 'Se pede “endereçar/rotear”, é IP (camada de rede).'],
    examTips: ['TCP = entrega garantida; IP = melhor esforço (best-effort).'],
    trapPatterns: [
      { re: /sem\s+conex(ã|a)o|baixa\s+lat(ê|e)ncia|tempo\s+real/i, note: 'Essas palavras‑chave puxam para UDP, não TCP.' },
    ],
  },
  UDP: {
    concept: ['UDP: sem conexão, menor overhead e latência; não garante entrega/ordem.'],
    steps: ['Procure “tempo real”, “streaming”, “voip”, “dns” → costuma ser UDP.', 'Se falar “ACK/entrega confiável” → não é UDP.'],
    examTips: ['UDP é comum quando perder um pacote é melhor que atrasar (voz/vídeo).'],
  },
  'UDP/TCP': {
    concept: ['TCP = confiável/ordenado; UDP = rápido/sem garantia.'],
    steps: ['Traduza as palavras do enunciado: confiável/ordem/controle → TCP; baixa latência/tempo real → UDP.'],
    examTips: ['Se o enunciado cita “handshake” → TCP (SYN, SYN‑ACK, ACK).'],
  },
  'Sub-rede': {
    concept: ['Sub-rede divide uma rede em blocos menores usando máscara/CIDR; define rede, broadcast e faixa de hosts.'],
    steps: [
      '1) Pegue o prefixo (/24, /26…).',
      '2) Ache o “tamanho do bloco” no octeto relevante (ex.: /26 → bloco 64).',
      '3) Rede = múltiplo do bloco; Broadcast = rede + bloco − 1; Hosts = entre eles.',
    ],
    examTips: ['Decore blocos: /25=128, /26=64, /27=32, /28=16, /29=8, /30=4.'],
  },
  DNS: {
    concept: ['DNS traduz nomes ↔ IP (ex.: www → 142.250…).'],
    steps: ['Se a pergunta fala “resolver nome”, “registro A/CNAME/MX”, é DNS.', 'Não confunda com DHCP (entrega IP).'],
    examTips: ['DNS “não dá IP pro PC”; ele responde consultas. Quem dá IP é o DHCP.'],
  },
  DHCP: {
    concept: ['DHCP distribui IP, máscara, gateway e DNS automaticamente (DORA: Discover, Offer, Request, Ack).'],
    steps: ['Se fala em “atribuir IP automático” → DHCP.', 'Se fala em “resolver nomes” → DNS (não DHCP).'],
    examTips: ['A sigla DORA cai muito em prova.'],
  },
  NAT: {
    concept: ['NAT traduz IP privado ↔ público; PAT traduz também portas para muitos saírem com 1 IP.'],
    steps: ['Se a pergunta diz “muitos hosts com 1 IP público” → PAT/NAT overload.', 'Se fala “publicar serviço interno” → port forwarding.'],
    examTips: ['Privado (RFC1918) não roteia na internet; precisa NAT para sair.'],
  },
  'IP Público x Privado': {
    concept: ['IP público é roteável na internet; IP privado (10/8, 172.16/12, 192.168/16) é usado dentro da rede.'],
    steps: ['Identifique a faixa do IP; se for RFC1918 → privado.', 'Se o enunciado fala “internet/roteável global”, pense em público.'],
    examTips: ['CGNAT = provedor fazendo NAT para vários clientes (complica portas/serviços).'],
  },
  CGNAT: {
    concept: ['CGNAT é NAT em escala do provedor: vários clientes compartilham poucos IPv4 públicos.'],
    steps: ['Se o sintoma é “não consigo abrir portas / acessar de fora”, suspeite CGNAT.', 'A saída típica é IPv4 público, IPv6 ou túnel/VPN.'],
    examTips: ['CGNAT não “derruba internet”, mas limita entrada (inbound).'],
  },
  Roteamento: {
    concept: ['Roteamento decide o melhor caminho entre redes (tabela de rotas, next-hop, métricas).'],
    steps: ['Se envolve “gateway/next hop/tabela”, é roteamento (L3).', 'Diferencie rota estática (manual) de dinâmica (OSPF/RIP/BGP).'],
    examTips: ['“Default route” (0.0.0.0/0) = caminho padrão quando não há rota mais específica.'],
  },
  Wireless: {
    concept: ['Wi‑Fi é rede sem fio; canais e interferência impactam desempenho; 2.4 GHz tem mais alcance, 5 GHz mais velocidade/menos interferência.'],
    steps: ['Se o problema é “interferência/canais”, pense em 2.4 GHz.', 'Se o objetivo é “mais throughput”, 5 GHz costuma ajudar (menos alcance).'],
    examTips: ['Canais não sobrepostos em 2.4 GHz: 1, 6, 11 (regra clássica).'],
  },
  Segurança: {
    concept: ['Segurança em redes envolve confidencialidade, integridade e disponibilidade (CIA).'],
    steps: ['Identifique o objetivo: criptografar (confidencialidade), validar alteração (integridade), manter serviço (disponibilidade).'],
    examTips: ['“Phishing” = engenharia social; “DoS” = disponibilidade; “VPN/SSH” = canal seguro.'],
  },
  SSH: {
    concept: ['SSH cria acesso remoto seguro (criptografado) geralmente na porta 22.'],
    steps: ['Se a pergunta fala em “acesso remoto seguro/terminal”, é SSH.', 'HTTP/FTP/Telnet não criptografam por padrão.'],
    examTips: ['Telnet (23) é “SSH sem segurança” — costuma ser pegadinha.'],
  },
  'Proxy/VPN': {
    concept: ['Proxy intermedeia requisições; VPN cria túnel seguro e estende a rede de forma lógica.'],
    steps: ['Se o foco é “intermediar/filtrar cache”, pense Proxy.', 'Se o foco é “túnel/segurança/acesso à rede interna”, pense VPN.'],
    examTips: ['VPN é camada de segurança + roteamento; Proxy é mais “aplicação”.'],
  },
  Aplicação: {
    concept: ['Camada de aplicação: HTTP/HTTPS, DNS, SMTP, FTP etc. São protocolos usados pelos serviços finais.'],
    steps: ['Se a questão cita serviço (web, e-mail, nomes), pense em aplicação.', 'Portas padrão ajudam a identificar protocolo.'],
    examTips: ['HTTPS (443), HTTP (80), DNS (53), SMTP (25), SSH (22).'],
  },
  'Protocolos de Aplicação': {
    concept: ['Protocolos de aplicação entregam o serviço ao usuário (web, e-mail, resolução de nomes).'],
    steps: ['Mapeie serviço → protocolo (web → HTTP/HTTPS; e-mail → SMTP/IMAP/POP3; nomes → DNS).'],
    examTips: ['Em prova, “porta + serviço” costuma ser suficiente para matar a questão.'],
  },
  Fibra: {
    concept: ['Fibra óptica transmite dados por luz; baixa atenuação e alta capacidade.'],
    steps: ['Se a questão fala de OLT/ONU/GPON/splitter, trate como rede PON.', 'Se fala dBm/atenuação, trate como orçamento óptico (link budget).'],
    examTips: ['Atenuação soma perdas (fibra + conectores + emendas + splitters).'],
  },
  'Fibra Óptica': {
    concept: ['dBm é potência logarítmica; OTDR mede eventos e perdas no enlace; splitters dividem potência.'],
    steps: ['Some as perdas e compare com a potência disponível/limite do receptor.', 'Entenda que splitters “comem” potência (perda alta).'],
    examTips: ['Atenção ao sinal: −18 dBm é *mais forte* que −28 dBm (menos negativo).'],
  },
}

function inferHints(q: RenderQuestion): Hints {
  const cat = q.category?.trim()
  const byCat = cat && KB[cat] ? KB[cat] : undefined
  if (byCat) return byCat

  // Keyword fallback (for future categories)
  const t = norm(q.q)
  if (/(gpon|olt|onu|pon|otdr|dbm|atenu)/.test(t)) return KB['Fibra Óptica']
  if (/(subnet|sub-rede|cidr|máscara|mascara|\/2[0-9]|\/3[0-2])/.test(t)) return KB['Sub-rede']
  if (/(tcp|udp|handshake|ack)/.test(t)) return KB['UDP/TCP']
  if (/(dns)/.test(t)) return KB['DNS']
  if (/(dhcp)/.test(t)) return KB['DHCP']
  if (/(nat)/.test(t)) return KB['NAT']
  return {}
}

function pickPlausibleDistractors(q: RenderQuestion) {
  const qTok = tokens(q.q)
  return q.choices
    .map((c, idx) => ({ idx, c, score: overlapScore(tokens(c), qTok) }))
    .filter((x) => x.idx !== q.answer)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function reasonFromContrast(correct: string, wrong: string, cat?: string) {
  const c = norm(correct)
  const w = norm(wrong)

  // TCP/UDP
  if ((/tcp/.test(c) && /udp/.test(w)) || (/udp/.test(c) && /tcp/.test(w))) {
    if (/tcp/.test(c)) return 'Aqui a pegadinha é trocar UDP por TCP: o enunciado pede confiabilidade/controle, que são características do TCP.'
    return 'Aqui a pegadinha é trocar TCP por UDP: o enunciado valoriza velocidade/baixa latência e aceita perda, cenário típico de UDP.'
  }

  // DNS x DHCP
  if ((/dns/.test(c) && /dhcp/.test(w)) || (/dhcp/.test(c) && /dns/.test(w))) {
    if (/dns/.test(c)) return 'DNS resolve nomes; DHCP entrega configuração de rede. A errada confunde “resolver nome” com “atribuir IP”.'
    return 'DHCP atribui IP e parâmetros; DNS só responde consultas de nomes. A errada troca função de serviço.'
  }

  // IP público/privado
  if ((/privad/.test(c) && /públic/.test(w)) || (/públic/.test(c) && /privad/.test(w))) {
    return 'A confusão comum é achar que “privado” aparece na internet. Privados (RFC1918) não são roteáveis globalmente; públicos são.'
  }

  // Generic “sempre/nunca” trap
  if (/\bsempre\b|\bnunca\b/.test(w)) {
    return 'Cuidado com “sempre/nunca”: em redes quase tudo depende de cenário. Opções absolutas costumam ser pegadinha.'
  }

  // Category-specific generic note
  if (cat === 'Sub-rede') {
    return 'Essa alternativa costuma errar o passo de identificar bloco/rede/broadcast. Refaça o cálculo em 3 passos (bloco → rede → broadcast).'
  }

  return 'Essa alternativa parece plausível, mas falha em uma palavra‑chave do enunciado (função, camada, ou condição).'
}

export function buildLesson(q: RenderQuestion, selectedIdx?: number): Lesson {
  const selected = typeof selectedIdx === 'number' ? selectedIdx : undefined
  const correctText = q.choices[q.answer]
  const selectedText = selected !== undefined ? q.choices[selected] : ''
  const explain = q.explain?.trim()
  const hints = inferHints(q)

  const base: Lesson = {
    title: 'Mini aula',
    oneLiner: hints.oneLiner || firstMeaningfulLine(explain),
    concept: hints.concept ? [...hints.concept] : [],
    steps: hints.steps ? [...hints.steps] : [],
    whyCorrect: [],
    whyWrong: [],
    distractors: [],
    keyTakeaways: hints.keyTakeaways ? [...hints.keyTakeaways] : [],
    examTips: hints.examTips ? [...hints.examTips] : [],
  }

  // --- Why correct (make it unique to the question) ---
  base.whyCorrect.push(`A pergunta está testando: **${q.category}**. A alternativa correta é a que casa com a *definição/função* pedida no enunciado.`)
  base.whyCorrect.push(`A correta (“${correctText}”) responde exatamente “${q.q}”. Ela atende o requisito principal sem adicionar suposições.`)

  if (explain) {
    // Use bank explanation as “official” but expand with guidance.
    base.whyCorrect.push(`Explicação do conteúdo: ${explain}`)
  }

  // Add any trap patterns that match the question text
  if (hints.trapPatterns?.length) {
    const t = q.q
    for (const p of hints.trapPatterns) {
      if (p.re.test(t)) base.whyCorrect.push(p.note)
    }
  }

  // Ensure concept/steps exist (fallback)
  if (!base.concept || base.concept.length === 0) {
    base.concept = ['Identifique o conceito central (serviço/camada/protocolo) e relacione com a definição mais direta.']
  }
  if (!base.steps || base.steps.length === 0) {
    base.steps = [
      'Sublinhe as palavras‑chave do enunciado (função, camada, serviço).',
      'Elimine alternativas que mudam o “verbo” (ex.: resolver × atribuir; rotear × comutar).',
      'Escolha a opção que bate com a definição sem exageros (“sempre/nunca”).',
    ]
  }

  // --- Personalized “why wrong” ---
  if (selected !== undefined && selected !== q.answer) {
    base.whyWrong.push(`Você marcou “${selectedText}”. O ponto que derrubou aqui é a diferença entre *o que o enunciado pede* e *o que a alternativa descreve*.`)
    base.whyWrong.push(reasonFromContrast(correctText, selectedText, q.category))
    base.whyWrong.push(`Um jeito rápido de evitar isso: procure a palavra‑chave principal e faça a pergunta “isso é *função* ou *consequência*?” A correta costuma ser a função.`)
  } else if (selected === q.answer) {
    base.whyWrong.push('Boa! Para fixar, tente explicar em 1 frase qual é o conceito cobrado e *qual palavra do enunciado* te guiou.')
    base.whyWrong.push('Dica de ouro: quando você consegue justificar a alternativa errada (“por que não é”), você domina o conteúdo.')
  } else {
    base.whyWrong.push('Antes de ver a resposta, tente: (1) achar a palavra‑chave; (2) eliminar 2 opções por incompatibilidade; (3) decidir entre as 2 restantes.')
  }

  // --- Distractors (unique + dynamic) ---
  const plaus = pickPlausibleDistractors(q)
  for (const d of plaus) {
    base.distractors!.push(`“${d.c}” — ${reasonFromContrast(correctText, d.c, q.category)}`)
  }

  // --- Key takeaways & exam tips: ensure non-empty ---
  if (base.keyTakeaways.length === 0) {
    base.keyTakeaways.push('Pense: termo → definição → exemplo. Se a alternativa não bate com a definição, descarte.')
  }
  if (base.examTips.length === 0) {
    base.examTips.push('Em prova, “porta + serviço” e “palavra‑chave de camada” resolvem muitas questões.')
  }

  // --- One-liner: make it always present and tied to the correct option ---
  if (!base.oneLiner) {
    base.oneLiner = `a correta é “${correctText}” porque descreve a função pedida no enunciado sem confundir com conceitos parecidos`
  } else {
    // If explanation one-liner doesn't mention the correct idea, append a small anchor
    if (!norm(base.oneLiner).includes(norm(correctText).slice(0, 8))) {
      base.oneLiner = `${base.oneLiner} (por isso a correta é “${correctText}”).`
    }
  }

  return base
}
