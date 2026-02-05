# NAT – Static, Dynamic, Masquerade/PAT e CGNAT (na prática)

## 🧠 Mapa mental (visão geral)

![Mapa mental – nat](/study/images/nat-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- O que é NAT e por que ele existe
- Diferença entre Static NAT, Dynamic NAT e Masquerade/PAT
- O que é CGNAT e por que afeta portas e acesso remoto
- Como diagnosticar problemas típicos (portas, jogos, câmeras, VPN)

---

## 1) Introdução (do zero)

**NAT** (Network Address Translation) é a técnica usada para permitir que muitos dispositivos com **IP privado** acessem a internet usando um ou poucos **IPs públicos**.

No suporte, NAT aparece muito quando:
- “jogo não abre portas”
- “câmera não acessa de fora”
- “VPN não conecta”
- “cliente está em CGNAT”

## 2) Conceitos fundamentais

### IP privado x público
Privado é usado dentro da rede; público é roteável na internet.

### NAT (conceito)
Tradução entre IP privado ↔ IP público na borda da rede.

### PAT/Masquerade
Variação do NAT que também traduz **portas**, permitindo muitos clientes compartilharem 1 IP público.

### CGNAT
NAT feito pelo provedor (Carrier Grade). O cliente não recebe IP público direto.

---

## 3) Como funciona (passo a passo)

![Diagrama – nat](/study/images/nat-basico.svg)

![Diagrama – nat](/study/images/nat-pat-flow.svg)

### Fluxo típico (internet residencial)
1. Dispositivo usa IP privado (ex.: 192.168.0.10)
2. Roteador faz NAT/PAT para um IP público (ex.: 200.x.x.x)
3. A internet responde para o IP público/porta
4. O roteador “desfaz” a tradução e entrega ao dispositivo correto

**Por que isso importa?**  
Sem “entrada” configurada (port forwarding), conexões iniciadas de fora geralmente não chegam no dispositivo interno.

---

## 4) Exemplos reais no Suporte (cenários)

### Câmera/DVR não acessa de fora
**Sintoma:** Acesso local ok, remoto não funciona.

**O que isso indica:** Falta port forwarding ou cliente está em CGNAT.

**Como confirmar:**
- Verificar IP WAN do roteador (é público?)
- Comparar com IP mostrado em sites 'meu ip'
- Testar portas em ferramenta externa

**Como resolver:**
- Se IP público: configurar port forwarding/UPnP com cuidado
- Se CGNAT: solicitar IP público ao provedor ou usar solução cloud/P2P

### Jogo online com NAT ‘Strict’
**Sintoma:** Matchmaking ruim, voz falha, não hospeda sala.

**O que isso indica:** Portas bloqueadas/CGNAT/UPnP desligado.

**Como confirmar:**
- Checar se há CGNAT
- Ver se UPnP está habilitado (quando apropriado)
- Verificar firewall do roteador/PC

**Como resolver:**
- Configurar port forwarding (se IP público)
- Habilitar UPnP com cautela
- Se CGNAT: IP público ou VPN/solução do jogo


---

## 5) Troubleshooting (checklist profissional)

### Checklist NAT/CGNAT
1. Cliente tem **IP público na WAN** do roteador?
2. IP público mudou (dinâmico)? (DDNS pode ajudar)
3. Há **duplo NAT** (roteador atrás de roteador)?
4. Portas necessárias estão liberadas/encaminhadas?
5. Firewall bloqueando?

**Duplo NAT** é muito comum quando:
- modem do provedor está em modo router + roteador próprio atrás.

## 6) Conexões com outros temas

- IP público x privado é base (ver **IP Público x Privado**)
- Roteamento/gateway influencia tráfego de saída (ver **Rotas e Gateway**)
- DNS pode mascarar problema de NAT (ex.: acesso por nome vs IP) (ver **DNS**)

---

## 7) Detalhe técnico (opcional)

**Modelo mental:**  
- NAT é como “recepção do prédio”: todos lá dentro (IPs privados) saem para a rua (internet) usando um endereço externo do prédio (IP público).  
- Com **PAT**, a recepção usa “ramais” (portas) para diferenciar quem pediu o quê.

Em **CGNAT**, o “prédio” é do provedor: vários clientes diferentes compartilham IP público.

---

## 8) O que mais cai em prova (pegadinhas)

- CGNAT não é ‘NAT do roteador’: é do provedor
- PAT é NAT com tradução de portas (muito comum em residências)
- Port forwarding só funciona se houver IP público (ou exceção no provedor)

## ✅ Checklist final (domínio do tema)

- [ ] Sei explicar NAT de forma simples
- [ ] Sei diferenciar NAT estático, dinâmico e PAT/masquerade
- [ ] Entendo CGNAT e o impacto em portas/acesso remoto
- [ ] Consigo orientar cliente sobre port forwarding quando aplicável

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
7M_eGJEzCvc
```
### Aula mais completa
```youtube
UyhHnZYiLdw
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é NAT? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-nat/
- NIC.br – IPv4, IPv6 e escassez (PT-BR): https://www.nic.br/ipv6/
- Wikipedia PT – CGNAT: https://pt.wikipedia.org/wiki/Carrier-grade_NAT
