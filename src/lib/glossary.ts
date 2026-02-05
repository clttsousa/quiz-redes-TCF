export type GlossaryEntry = {
  label: string
  short: string
  long?: string
  links?: { title: string; url: string }[]
}

/**
 * Glossário “N1-friendly” para termos que aparecem nas aulas.
 *
 * Chaves devem estar em minúsculo. O componente de tooltip tenta casar termos
 * por palavra inteira (ex.: "broadcast"), com variações simples (plural e maiúsculas).
 */
export const GLOSSARY: Record<string, GlossaryEntry> = {
  broadcast: {
    label: 'Broadcast',
    short: 'Mensagem enviada para “todo mundo” na mesma rede (mesma VLAN/sub-rede).',
    long:
      'Em redes IPv4, broadcast é usado quando o remetente não sabe quem é o destino exato (por exemplo, o cliente DHCP ainda não tem IP). Em roteadores, broadcast normalmente não atravessa para outra rede, a menos que exista um mecanismo como DHCP Relay.',
    links: [
      {
        title: 'RFC 919/922 (Broadcasting Internet Datagrams)',
        url: 'https://datatracker.ietf.org/doc/html/rfc919',
      },
    ],
  },
  unicast: {
    label: 'Unicast',
    short: 'Mensagem 1 → 1, de um dispositivo diretamente para outro.',
    long:
      'Exemplo: quando você acessa um site, o seu PC fala com o IP do servidor (unicast). Em DHCP, algumas etapas podem ser broadcast e outras unicast, dependendo do cenário.',
  },
  multicast: {
    label: 'Multicast',
    short: 'Mensagem 1 → muitos, mas só para um grupo específico.',
    long:
      'Diferente de broadcast (que vai para todos), multicast é entregue apenas para quem “entrou” no grupo. Muito usado em streaming, IPTV, roteamento dinâmico etc.',
  },
  vlan: {
    label: 'VLAN',
    short: '“Rede lógica” dentro do switch: separa tráfego em segmentos diferentes.',
    long:
      'Duas máquinas no mesmo switch podem estar em VLANs diferentes e, nesse caso, não “se enxergam” diretamente. DHCP pode falhar se o servidor estiver em outra VLAN sem relay.',
  },
  'dhcp relay': {
    label: 'DHCP Relay',
    short: 'Repassa solicitações DHCP entre redes diferentes.',
    long:
      'Como broadcast não atravessa roteador, o relay (geralmente no roteador/L3 switch) recebe o broadcast DHCP e encaminha como unicast para o servidor DHCP em outra rede.',
    links: [
      { title: 'RFC 2131 (DHCP)', url: 'https://datatracker.ietf.org/doc/html/rfc2131' },
    ],
  },
  lease: {
    label: 'Lease',
    short: '“Aluguel” do IP: por quanto tempo o endereço é válido.',
    long:
      'Quando o lease expira, o cliente precisa renovar. Normalmente ele tenta renovar antes (T1/T2). Se não conseguir, pode perder conectividade.',
  },
  apipa: {
    label: 'APIPA',
    short: 'IP automático 169.254.x.x quando o DHCP não responde (Windows).',
    long:
      'É um “plano B” para comunicação local limitada, mas geralmente não permite acesso à internet. Indica falha de DHCP (ou caminho até o DHCP).',
  },
  gateway: {
    label: 'Gateway padrão',
    short: 'Roteador usado para sair da rede local e alcançar outras redes.',
    long:
      'Sem gateway correto, você pode até falar com dispositivos da mesma sub-rede, mas não navega na internet nem acessa redes externas.',
  },
  'dns server': {
    label: 'DNS',
    short: 'Sistema que traduz nomes (ex.: google.com) em endereços IP.',
  },
  ttl: {
    label: 'TTL',
    short: 'Tempo de vida (cache) de um registro, muito usado no DNS.',
    long:
      'TTL alto = mais cache (menos consultas); TTL baixo = mudanças propagam mais rápido, mas aumenta consultas.',
  },
  arp: {
    label: 'ARP',
    short: 'Protocolo que descobre o MAC Address correspondente a um IP dentro da LAN.',
    long:
      'Se ARP falhar, o host não consegue entregar o pacote na rede local. Sintomas: ping para IP local falha mesmo com IP correto.',
  },
  pat: {
    label: 'PAT',
    short: 'Tradução usando portas: vários IPs privados saem por 1 IP público.',
    long:
      'Também chamado de ‘NAT overload’ ou ‘masquerade’. É o padrão em roteadores domésticos.',
  },
  cgnat: {
    label: 'CGNAT',
    short: 'NAT em larga escala feito pelo provedor para economizar IPv4 públicos.',
    long:
      'Impacta port forwarding e alguns jogos/serviços. Um sinal comum é a WAN do roteador estar em 100.64.0.0/10 ou outro IP privado.',
  },
  handshake: {
    label: 'Handshake',
    short: '‘Aperto de mão’: troca inicial para criar uma conexão (ex.: TCP).',
    long:
      'No TCP, o handshake (3-way) prepara a comunicação. O UDP não tem handshake, por isso tende a ser mais rápido.',
  },
  jitter: {
    label: 'Jitter',
    short: 'Variação do atraso na entrega dos pacotes.',
    long:
      'Em voz e vídeo, jitter alto causa ‘voz picotada’ e travadas. Wi‑Fi ruim e congestionamento são causas comuns.',
  },
  qos: {
    label: 'QoS',
    short: 'Regras para priorizar tráfego (ex.: voz) na rede.',
    long:
      'QoS pode reduzir impacto de congestionamento, priorizando VoIP e videoconferência.',
  },
  wpa2: {
    label: 'WPA2',
    short: 'Padrão de segurança Wi‑Fi com criptografia forte (quando usado com AES).',
    long:
      'Evite WEP. Prefira WPA2-AES ou WPA3, senha forte e, se possível, desative WPS.',
  },
  wpa3: {
    label: 'WPA3',
    short: 'Padrão mais novo de segurança Wi‑Fi, com melhorias contra ataques de senha.',
    long:
      'Nem todos dispositivos suportam; às vezes usa modo misto WPA2/WPA3.',
  },
}

export const GLOSSARY_TERMS = Object.keys(GLOSSARY)