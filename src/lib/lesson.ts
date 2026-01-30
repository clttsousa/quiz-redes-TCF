import type { RenderQuestion } from '@/lib/types'

type Lesson = {
  title: string
  whyCorrect: string[]
  whyWrong: string[]
  keyTakeaways: string[]
  examTips: string[]
}

function norm(s: string) {
  return (s || '').toLowerCase()
}

function pickTopicHints(qText: string): Partial<Lesson> {
  const t = norm(qText)

  // OSI / TCP-IP
  if (/(osi|camada\s*\d|layer\s*\d|tcp\/ip)/.test(t)) {
    return {
      keyTakeaways: [
        'Camada 1: meio físico; Camada 2: enlace/MAC/VLAN; Camada 3: IP/roteamento; Camada 4: TCP/UDP.',
        'Perguntas de camada quase sempre citam palavras‑chave (MAC, IP, porta, switch, roteador).',
      ],
      examTips: [
        'Se aparecer “porta TCP/UDP” → pense em Camada 4.',
        'Se aparecer “MAC/VLAN/switch” → pense em Camada 2; “IP/sub-rede/roteamento” → Camada 3.',
      ],
    }
  }

  // TCP vs UDP
  if (/(tcp|udp)/.test(t)) {
    return {
      keyTakeaways: [
        'TCP: orientado a conexão, entrega confiável (ACK, retransmissão, controle de fluxo/congestionamento).',
        'UDP: sem conexão, menor overhead/latência; entrega não garantida.',
      ],
      examTips: [
        '“Confiabilidade/ordem/ACK” → TCP. “Tempo real/baixa latência” → UDP.',
      ],
    }
  }

  // IP / sub-rede
  if (/(subnet|sub-rede|cidr|mascara|máscara|ipv4|ipv6|gateway)/.test(t)) {
    return {
      keyTakeaways: [
        'Máscara/CIDR define a parte de rede e a quantidade de hosts.',
        'Gateway padrão é o próximo salto para redes diferentes.',
      ],
      examTips: [
        'Sempre identifique primeiro a máscara (ex.: /24) e calcule rede/broadcast/hosts.',
      ],
    }
  }

  // DNS / DHCP
  if (/(dns|dhcp)/.test(t)) {
    return {
      keyTakeaways: [
        'DNS resolve nomes ↔ IP. DHCP distribui IP, máscara, gateway e DNS automaticamente.',
      ],
      examTips: [
        '“Resolver nome” → DNS. “Entregar IP automático” → DHCP.',
      ],
    }
  }

  // NAT
  if (/(nat|masquerade)/.test(t)) {
    return {
      keyTakeaways: [
        'NAT traduz endereços privados ↔ público; PAT/NAT overload traduz também portas.',
      ],
      examTips: [
        'Se falar em “muitos hosts saindo com 1 IP público” → PAT (NAT overload).',
      ],
    }
  }

  // VLAN
  if (/(vlan|802\.1q|trunk|access)/.test(t)) {
    return {
      keyTakeaways: [
        'Access carrega 1 VLAN (sem tag). Trunk carrega múltiplas VLANs (com tag 802.1Q).',
      ],
      examTips: [
        'Se houver “tag/802.1Q/múltiplas VLANs” → trunk.',
      ],
    }
  }

  // Fibra
  if (/(fibra|óptica|optica|gpon|olt|onu|pon|dBm|atenu|otdr)/.test(t)) {
    return {
      keyTakeaways: [
        'dBm é potência (log). Atenuação é perda do sinal ao longo do enlace.',
        'GPON: OLT (central) ↔ ONU/ONT (cliente) via rede PON com splitters.',
      ],
      examTips: [
        'Se a pergunta citar dBm, atenuação, OTDR, splitters → trate como análise de enlace óptico.',
      ],
    }
  }

  return {}
}

export function buildLesson(q: RenderQuestion, selectedIdx?: number): Lesson {
  const selected = typeof selectedIdx === 'number' ? selectedIdx : undefined
  const correctText = q.choices[q.answer]
  const selectedText = selected !== undefined ? q.choices[selected] : ''
  const explain = q.explain?.trim()

  const base: Lesson = {
    title: 'Mini aula',
    whyCorrect: [],
    whyWrong: [],
    keyTakeaways: [],
    examTips: [],
  }

  // Why correct
  if (explain) {
    base.whyCorrect.push(explain)
  } else {
    base.whyCorrect.push('A alternativa correta é a que atende exatamente ao que o enunciado pede (conceito + condição).')
  }

  // Why wrong (personalized)
  if (selected !== undefined && selected !== q.answer) {
    base.whyWrong.push(`Você marcou “${selectedText}”. Compare com o enunciado: essa opção falha em algum requisito (termo‑chave, condição ou definição).`)
    base.whyWrong.push(`A correta (“${correctText}”) é a única que fecha com o conceito central e com as palavras‑chave da pergunta.`)
  } else if (selected === q.answer) {
    base.whyWrong.push('Boa! Agora tente explicar com suas palavras o “porquê” — isso fixa o conteúdo.')
  } else {
    base.whyWrong.push('Dica: antes de ver a resposta, tente identificar as palavras‑chave do enunciado e eliminar as alternativas que fogem do tema.')
  }

  // Topic hints
  const hints = pickTopicHints(q.q)
  if (hints.keyTakeaways) base.keyTakeaways.push(...hints.keyTakeaways)
  if (hints.examTips) base.examTips.push(...hints.examTips)

  // Fallback takeaways
  if (base.keyTakeaways.length === 0) {
    base.keyTakeaways.push('Procure a “palavra‑chave” (serviço, camada, protocolo, unidade) e relacione com a definição mais direta.')
  }
  if (base.examTips.length === 0) {
    base.examTips.push('Elimine primeiro as alternativas genéricas (“sempre”, “nunca”) e as que não têm relação direta com o enunciado.')
  }

  return base
}
