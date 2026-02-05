# Redes de Computadores – Fundamentos (LAN/WAN/MAN, topologias e equipamentos)

## 🧠 Mapa mental (visão geral)

![Mapa mental – redes](/study/images/redes-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- O que é uma rede e por que ela existe
- Diferença entre LAN, MAN e WAN (com exemplos do dia a dia)
- Topologias clássicas (estrela, barramento, anel, mesh) e o que muda na prática
- Equipamentos comuns (switch, roteador, modem, ONU) e como identificar em campo

---

## 1) Introdução (do zero)

Uma **rede de computadores** é um conjunto de dispositivos (PCs, celulares, servidores, impressoras, câmeras) conectados para **trocar dados** e **compartilhar recursos** (internet, arquivos, sistemas, impressão).

No suporte, “rede” aparece de forma prática assim:
- “Conectei no Wi‑Fi, mas não navega”
- “A intranet não abre, mas o Google abre”
- “O PC pega IP, mas não enxerga o servidor”
- “Caiu a internet de todo mundo”

A ideia é sempre a mesma: entender **por onde os dados passam** e **qual peça está falhando**.

## 2) Conceitos fundamentais

### LAN, MAN, WAN
- **LAN**: rede local (casa, escritório, andar). Normalmente mais rápida e com controle interno.
- **MAN**: rede metropolitana (interliga várias LANs na mesma cidade/região).
- **WAN**: rede de longa distância (interliga cidades/estados/países). A internet é a maior WAN.

### Topologia
Topologia é “o desenho” de como os nós se conectam:
- **Estrela**: todos conectam num ponto central (switch/roteador). É a mais comum.
- **Barramento**: todos compartilham o mesmo meio (antiga em coaxial).
- **Anel**: cada nó passa adiante (historicamente em alguns padrões).
- **Mesh**: vários caminhos possíveis (muito usado em redes sem fio/mesh).

### Switch x Roteador
- **Switch**: conecta dispositivos **na mesma rede** (mesmo segmento), “comuta” quadros.
- **Roteador**: conecta **redes diferentes** (roteia pacotes) e geralmente é quem liga a LAN à internet.

### Modem x ONU
- **Modem**: traduz o sinal do provedor (cabo/DSL) para Ethernet.
- **ONU/ONT**: faz papel semelhante em fibra (termina a fibra e entrega Ethernet).

---

## 3) Como funciona (passo a passo)

![Diagrama – redes](/study/images/topologias.svg)

### Como pensar a rede (modelo mental simples)
1. **Dispositivo** → conecta via cabo ou Wi‑Fi
2. **Switch/AP** → entrega conectividade dentro da LAN
3. **Roteador/Gateway** → leva para outra rede (internet/intranet)
4. **Serviços** → DHCP (IP), DNS (nome), NAT (saída), etc.

**Pergunta de ouro do suporte:**  
✅ “O cliente pega IP? Qual IP? Qual gateway? Qual DNS?”  
Isso define 80% do diagnóstico.

---

## 4) Exemplos reais no Suporte (cenários)

### “Conecta no Wi‑Fi, mas sem internet”
**Sintoma:** Usuário conectado, mas apps não navegam.

**O que isso indica:** Pode ser DNS, gateway, autenticação do provedor ou portal cativo.

**Como confirmar:**
- Verifique IP/gateway/DNS no dispositivo
- Teste ping no gateway
- Teste ping em um IP público (ex.: 1.1.1.1) e depois em um domínio

**Como resolver:**
- Corrigir DNS/gateway via DHCP
- Reiniciar roteador/ONT/modem
- Verificar se há portal cativo/autenticação

### “Computador com IP 169.254.x.x”
**Sintoma:** Windows mostra IP automático 169.254 (APIPA).

**O que isso indica:** DHCP não respondeu (ou rede desconectada).

**Como confirmar:**
- Checar cabo/sinal Wi‑Fi
- ipconfig /all para ver DHCP habilitado
- Testar outra porta/cabo

**Como resolver:**
- Verificar servidor DHCP/roteador
- Ajustar VLAN/relay se houver
- Reiniciar serviço DHCP no roteador


---

## 5) Troubleshooting (checklist profissional)

### Checklist rápido (ordem recomendada)
1. **Camada física**: cabo, link, LEDs, Wi‑Fi com sinal ok
2. **IP**: endereço, máscara, gateway, DNS (ipconfig /all)
3. **Conectividade**: ping gateway → ping IP público → ping domínio
4. **Serviços**: DHCP, DNS, NAT, rota
5. **Escopo**: é “um usuário” ou “todo mundo”?

### Comandos úteis (Windows)
```bash
ipconfig /all
ping <gateway>
ping 1.1.1.1
nslookup google.com
tracert 1.1.1.1
```

## 6) Conexões com outros temas

- DHCP entrega IP/gateway/DNS (ver **DHCP**)
- DNS influencia “abre por nome” (ver **DNS**)
- Saída para internet depende de NAT (ver **NAT/CGNAT**)
- Roteamento correto depende de gateway/rotas (ver **Rotas e Gateway**)

---

## 7) Detalhe técnico (opcional)

**Dica de leitura de cenário:**  
- Se “tudo na LAN funciona”, mas “não sai pra internet”: pense em **roteador/gateway/NAT/DNS**.  
- Se “nem IP pega”: pense em **cabo, switch, VLAN, DHCP**.  
- Se “um serviço específico falha”: pense em **DNS, rota, firewall, MTU**.

**Termos-chave (veja no glossário):** broadcast, unicast, gateway, VLAN, APIPA.

---

## 8) O que mais cai em prova (pegadinhas)

- Switch não ‘dá internet’ sozinho: ele só conecta dispositivos na mesma rede
- ONU/ONT não é roteador (a menos que esteja em modo router)
- Mesh ≠ repetidor simples: mesh cria múltiplos caminhos e gerencia melhor a malha

## ✅ Checklist final (domínio do tema)

- [ ] Consigo explicar LAN, MAN e WAN com exemplos
- [ ] Sei reconhecer topologia estrela e mesh e quando elas fazem sentido
- [ ] Sei diferenciar switch, roteador, modem e ONU pelo papel na rede
- [ ] Consigo olhar um problema e levantar hipóteses (IP? DNS? gateway?)

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
9UJ0vUV8llY
```
### Aula mais completa
```youtube
VVy_AFWNEEA
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é rede de computadores? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-a-computer-network/
- Cisco (conceitos básicos de rede): https://www.netacad.com/pt-br
