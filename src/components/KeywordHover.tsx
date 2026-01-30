import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

const DEFINITIONS: Record<string, { title: string; body: string[] }> = {
  TCP: {
    title: "TCP (Transmission Control Protocol)",
    body: [
      "Camada de Transporte. Orientado à conexão (handshake).",
      "Entrega confiável: confirma recebimento, reordena e retransmite.",
      "Ideal quando perder dados é ruim (HTTP(S), e-mail, FTP).",
    ],
  },
  UDP: {
    title: "UDP (User Datagram Protocol)",
    body: [
      "Camada de Transporte. Não orientado à conexão.",
      "Mais rápido/leve, mas não garante entrega nem ordem.",
      "Usado quando atraso importa mais que perfeição (VoIP, streaming, DNS).",
    ],
  },
  DNS: {
    title: "DNS",
    body: [
      "Sistema que resolve nomes (ex.: site.com) para IP.",
      "Não entrega IP por DHCP: ele só consulta/resolve.",
      "Em prova: procure palavras como \"resolução\", \"nome\", \"registro\".",
    ],
  },
  DHCP: {
    title: "DHCP",
    body: [
      "Distribui automaticamente IP, máscara, gateway e DNS para o cliente.",
      "Usa DORA: Discover → Offer → Request → Acknowledge.",
      "Em prova: \"atribuir endereço\" quase sempre é DHCP.",
    ],
  },
  NAT: {
    title: "NAT",
    body: [
      "Traduz endereços (geralmente privado ↔ público).",
      "Permite vários dispositivos compartilharem um IP público.",
      "Comum em roteadores domésticos.",
    ],
  },
  CGNAT: {
    title: "CGNAT",
    body: [
      "NAT em escala de operadora (Carrier Grade NAT).",
      "Clientes compartilham IP público — pode dificultar portas/serviços.",
      "Em prova: ‘sem IP público’ / ‘compartilhado’ → CGNAT.",
    ],
  },
  VLAN: {
    title: "VLAN",
    body: [
      "Segmenta rede de camada 2 (switch) por IDs lógicas.",
      "Separação de broadcast domain sem separar fisicamente.",
      "Trunk carrega múltiplas VLANs (802.1Q).",
    ],
  },
  OSI: {
    title: "Modelo OSI",
    body: [
      "7 camadas: Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação.",
      "Dica: IP = camada 3, TCP/UDP = camada 4.",
    ],
  },
  IP: {
    title: "IP",
    body: [
      "Endereçamento e roteamento na camada 3.",
      "Não garante entrega (isso é TCP/UDP na camada 4).",
    ],
  },
  IPv4: {
    title: "IPv4",
    body: [
      "Endereços de 32 bits. Escassez levou a NAT/CGNAT.",
      "Classes são históricas; hoje usa-se CIDR.",
    ],
  },
  IPv6: {
    title: "IPv6",
    body: [
      "Endereços de 128 bits. Muito espaço, reduz necessidade de NAT.",
      "Tem SLAAC, link-local e multicast (não usa broadcast).",
    ],
  },
  CIDR: {
    title: "CIDR",
    body: [
      "Notação /n indica quantos bits são de rede.",
      "Quanto maior o /, menor a sub-rede (menos hosts).",
    ],
  },
  GPON: {
    title: "GPON",
    body: [
      "Rede óptica passiva (PON). Compartilha fibra com splitters.",
      "OLT (central) ↔ ONT/ONU (cliente).",
    ],
  },
  OLT: {
    title: "OLT",
    body: [
      "Equipamento na operadora (headend) que gerencia a rede GPON.",
      "Controla upstream/downstream e autenticação das ONTs.",
    ],
  },
  ONT: {
    title: "ONT/ONU",
    body: [
      "Terminal no cliente que converte sinal óptico em Ethernet/Wi‑Fi.",
      "Em prova: equipamento do assinante na fibra.",
    ],
  },
}

export function KeywordHover({ term, className }: { term: string; className?: string }) {
  const def = DEFINITIONS[term.toUpperCase()] || DEFINITIONS[term]
  if (!def) {
    return <span className={cn("kw", className)}>{term}</span>
  }
  return (
    <HoverCard openDelay={150} closeDelay={120}>
      <HoverCardTrigger asChild>
        <span
          className={cn(
            "kw cursor-help rounded-md px-1 py-0.5",
            "bg-primary/10 text-primary ring-1 ring-primary/15",
            "hover:bg-primary/15",
            className
          )}
        >
          {term}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-[340px]">
        <div className="text-sm font-semibold">{def.title}</div>
        <ul className="mt-2 grid gap-1 text-xs text-muted-foreground list-disc pl-4">
          {def.body.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  )
}
