# IP Público x IP Privado – Faixas, Uso Prático e CGNAT

## 🧠 Mapa mental (visão geral)

![Mapa mental – ip-publico-privado](/study/images/ip-publico-privado-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. O que é um endereço IP (sem complicar)
O **IP** é um “endereço” usado para identificar um dispositivo na rede.
Ele permite que dados saiam de um ponto e cheguem ao destino certo.

No suporte, IP responde perguntas como:
- “Meu PC está na rede certa?”
- “Eu consigo chegar no servidor?”
- “Por que eu não consigo acessar remotamente?”

---

## 2. IP Privado (uso interno)
**IP privado** é usado dentro de redes locais (empresa/casa) e **não é roteado na internet**.
Faixas mais comuns (IPv4):
- **10.0.0.0/8**
- **172.16.0.0/12**
- **192.168.0.0/16**

Exemplo:
- 192.168.1.25 (PC)
- 192.168.1.1 (roteador/gateway)

📌 Dica: IP privado “vive” atrás de NAT.

---

## 3. IP Público (visível na internet)
**IP público** é roteável na internet e identifica sua rede para o mundo.
Exemplo:
- IP WAN do roteador: 200.200.200.10

---

## 4. Como isso se conecta (NAT)
Em quase todas as redes:
- dispositivos usam IP privado
- o roteador tem IP público
- NAT traduz do privado para o público

Se o usuário pergunta “qual meu IP?”, existe ambiguidade:
- IP do dispositivo (privado)
- IP da internet (público)

---

## 5. CGNAT (por que usamos e o que ele quebra)
**CGNAT** (Carrier-Grade NAT) é NAT feito **pela operadora**.
Ou seja: a operadora coloca vários clientes atrás de um IP público compartilhado.

Por que existe?
- falta de IPv4 público suficiente

Impactos no suporte:
- dificuldade para abrir portas (câmeras, servidor em casa, jogos P2P)
- alguns serviços de acesso remoto podem falhar sem técnicas adicionais
- usuário “acha” que tem IP público, mas na verdade é IP compartilhado

Como identificar (dica prática):
- IP WAN do roteador está em faixa privada (ex.: 100.64.0.0/10) → provável CGNAT
- sites mostram um IP diferente do WAN do roteador

Faixa comum do CGNAT:
- **100.64.0.0/10** (reservada para CGNAT)

---

## 6. Casos reais de suporte
### Caso: “Não consigo acessar minha câmera de fora”
Causas prováveis:
- CGNAT
- Port forwarding não aplicado
- Double NAT
- Firewall bloqueando

Soluções possíveis:
- pedir IP público (quando disponível)
- usar VPN/túnel/rede mesh (dependendo da política)
- usar IPv6 (quando suportado)

### Caso: “Meu RDP funciona na rede local mas não de fora”
- Falta de port forwarding
- CGNAT
- Regras de firewall

---

## 7. Checklist rápido (para atendimento)
1. Qual IP o dispositivo tem? (privado)
2. Qual IP a internet vê? (público)
3. O IP WAN do roteador é público ou é CGNAT?
4. Existe dupla NAT?
5. Precisa de acesso externo? então: CGNAT é o ponto chave.

---

## 8. Referências (PT‑BR)
- Cloudflare – IPv4 e esgotamento (PT‑BR): https://www.cloudflare.com/pt-br/learning/ipv6/ipv4-exhaustion/
- NIC.br – IPv6 e conceitos: https://www.nic.br/ipv6/
- Explicação CGNAT (PT‑BR): https://www.techtudo.com.br/noticias/2019/10/o-que-e-cgnat-entenda-a-tecnologia-que-afeta-o-acesso-remoto.ghtml

---


## 🎥 Vídeos (PT‑BR)

### IP público x privado – básico

```youtube
OYPd6aHon_8
```

Link: https://www.youtube.com/watch?v=OYPd6aHon_8

### CGNAT – impactos e como identificar

```youtube
sxiI-Tpd9JQ
```

Link: https://www.youtube.com/watch?v=sxiI-Tpd9JQ

