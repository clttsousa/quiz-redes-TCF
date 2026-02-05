# Redes de Computadores – Fundamentos para Suporte

## 🧠 Mapa mental (visão geral)

![Mapa mental – redes](/study/images/redes-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. O que é uma rede (explicação bem direta)
Uma **rede de computadores** é um conjunto de dispositivos (PCs, notebooks, celulares, impressoras, servidores, câmeras, IoT) conectados para **trocar dados** e **compartilhar recursos**.

Pense assim:
- **Sem rede**: cada computador é uma “ilha”.
- **Com rede**: você consegue acessar arquivos, imprimir, usar sistemas internos e sair para a internet.

No suporte, entender rede ajuda a responder perguntas como:
- “Meu Wi‑Fi conecta, mas não abre nada.”
- “Consigo acessar o sistema interno, mas não a internet.”
- “A impressora sumiu para todo mundo.”
- “Só em um setor da empresa está sem rede.”

---

## 2. Componentes básicos de uma rede
Uma rede normalmente tem:
- **Dispositivos finais**: PC, celular, impressora (clientes).
- **Meio de transmissão**: cabo (Ethernet), ar (Wi‑Fi), fibra.
- **Equipamentos de rede**: switch, roteador, AP, modem/ONU.
- **Serviços**: DHCP, DNS, autenticação, firewall, proxy.
- **Endereçamento**: IP, máscara, gateway, DNS.

---

## 3. Tipos de rede (LAN, MAN, WAN) – com exemplos reais
### LAN (Local Area Network)
Rede local: escritório, casa, laboratório, andar/empresa.
- Ex.: rede do escritório + Wi‑Fi corporativo.

### MAN (Metropolitan Area Network)
Rede em escala de cidade/metrópole.
- Ex.: interligação de prédios/filiais na mesma cidade por operadora.

### WAN (Wide Area Network)
Rede em longa distância (país/mundo).
- Ex.: a **internet** é uma WAN.
- Ex.: filiais em estados diferentes conectadas por VPN/MPLS.

📌 Dica de prova: LAN = curto alcance, WAN = grande alcance. MAN = intermediário (cidade).

---

## 4. Topologias (estrela, barramento, anel, malha)
Topologia é o “desenho” de como os nós se conectam.

### Estrela (a mais comum hoje)
Todos os dispositivos conectam a um ponto central (switch/AP).
- Vantagem: se um cabo/PC falhar, o resto continua.
- Desvantagem: se o switch central cair, afeta todos.

### Barramento (antiga)
Todos compartilham o mesmo “caminho”.
- Hoje quase não se usa, mas cai em prova.
- Problema: colisões e dependência de um meio comum.

### Anel
Nós conectados em círculo.
- Se um ponto falha, pode derrubar o anel (depende da tecnologia).

### Malha (mesh)
Vários caminhos possíveis entre nós.
- Muito usado em redes **wireless mesh** e em backbone.
- Vantagem: alta redundância.
- Desvantagem: mais complexo.

---

## 5. Equipamentos comuns (e o que cada um faz de verdade)
### Switch
Conecta dispositivos na **mesma LAN** e encaminha tráfego com base no **MAC Address**.
- Atua principalmente na Camada de **Acesso à Rede** (L2).
- No suporte: problemas típicos envolvem porta desativada, VLAN errada, loop.

### Roteador
Conecta **redes diferentes** (sub-redes/VLANs) e encaminha pacotes por **IP**.
- Atua na camada **Internet** (L3).
- No suporte: gateway errado, rota ausente, NAT, regras.

### Modem / ONU
Faz a “ponte” entre sua rede e a rede da operadora.
- **Modem**: comum em DSL/cabo.
- **ONU**: comum em fibra (FTTH).
- No suporte: link físico, autenticação, sinal óptico, PPPoE.

### Access Point (AP)
Distribui Wi‑Fi e conecta o wireless ao cabeado.
- No suporte: canal ruim, interferência, potência, roaming.

---

## 6. Erros comuns vistos no suporte (com leitura rápida)
- **Sem IP** ou IP 169.254 (APIPA): normalmente DHCP.
- **Sem internet mas com rede local**: gateway/DNS/NAT.
- **Conecta no Wi‑Fi mas “sem acesso”**: DHCP/DNS/captive portal.
- **Só um setor sem rede**: switch/VLAN/cabo.
- **Só um site não abre**: DNS/filtro/proxy.

---

## 7. Checklist (quando o usuário diz “sem rede”)
1. O dispositivo tem IP válido? (`ipconfig /all`)
2. O gateway responde? (`ping gateway`)
3. Resolve nome? (`nslookup google.com`)
4. Acessa IP externo? (`ping 8.8.8.8`)
5. É problema no Wi‑Fi (sinal/canal) ou no cabeado (porta/cabo)?

---

## 8. Referências (PT‑BR)
- Cloudflare Learning – redes e internet (PT‑BR): https://www.cloudflare.com/pt-br/learning/
- NIC.br – materiais educativos: https://www.nic.br

---


## 🎥 Vídeos (PT‑BR)

### Redes de Computadores – fundamentos

```youtube
9UJ0vUV8llY
```

Link: https://www.youtube.com/watch?v=9UJ0vUV8llY

### Redes de Computadores – aula completa

```youtube
VVy_AFWNEEA
```

Link: https://www.youtube.com/watch?v=VVy_AFWNEEA

