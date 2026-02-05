# UDP – Diferenças entre UDP e TCP e quando usar

## 🧠 Mapa mental (visão geral)

![Mapa mental – udp](/study/images/udp-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- O que é UDP e por que ele existe
- Diferenças práticas UDP vs TCP (sem decorar)
- Quando usar UDP (DNS, VoIP, streaming) e por quê
- Como reconhecer problemas típicos (perda, jitter, latência)

---

## 1) Introdução (do zero)

O **UDP** é um protocolo de transporte que prioriza **rapidez e simplicidade**.
Ele envia dados “no melhor esforço” (best-effort), sem garantir entrega, ordem ou retransmissão.

No suporte, UDP aparece muito em:
- **DNS** (consulta/resposta rápida)
- **VoIP** (chamadas)
- **Streaming ao vivo**

## 2) Conceitos fundamentais

### UDP (o básico)
Envia datagramas sem conexão. Não faz handshake. Não garante entrega nem ordem.

### TCP (comparação)
Cria conexão (handshake), garante entrega e ordem (com retransmissão).

### Quando UDP vence
Quando atraso é pior do que perda (voz/vídeo) ou quando as mensagens são pequenas e rápidas (DNS).

---

## 3) Como funciona (passo a passo)

![Diagrama – udp](/study/images/udp-vs-tcp.svg)

### UDP vs TCP (passo a passo mental)
- **TCP**: conecta → envia → confirma → retransmite se falhar
- **UDP**: envia → (talvez) recebe → sem confirmação

**Exemplo DNS:** normalmente usa UDP porque é rápido e a mensagem é curta.

---

## 4) Exemplos reais no Suporte (cenários)

### VoIP com ‘voz picotando’
**Sintoma:** A ligação conecta, mas a voz falha ou fica robótica.

**O que isso indica:** Perda de pacotes/jitter (UDP sensível).

**Como confirmar:**
- Teste latência e perda (ping contínuo)
- Verifique qualidade do Wi‑Fi/cabo
- Se possível, medir jitter em ferramenta de VoIP

**Como resolver:**
- Preferir cabo ao Wi‑Fi
- Melhorar sinal/canal Wi‑Fi
- Ajustar QoS se existir no roteador

### Streaming ao vivo travando
**Sintoma:** Travamentos frequentes, qualidade cai.

**O que isso indica:** Instabilidade/variação de latência; perda de pacotes.

**Como confirmar:**
- Testar estabilidade (ping)
- Verificar saturação de banda
- Testar em outra rede

**Como resolver:**
- Reduzir uso da rede (upload)
- Ajustar canal Wi‑Fi
- Priorizar tráfego se houver QoS


---

## 5) Troubleshooting (checklist profissional)

### Checklist UDP (quando a aplicação é tempo real)
1. **Latência** (ping): está alta?
2. **Jitter**: a latência varia muito?
3. **Perda**: há pacotes perdidos?
4. **Meio**: Wi‑Fi costuma piorar (interferência).
5. **Banda**: upload saturado derruba VoIP/stream.

Dica: muitos problemas “de aplicativo” são na verdade **instabilidade de rede**.

## 6) Conexões com outros temas

- DNS normalmente usa UDP (ver **DNS**)
- Wi‑Fi ruim aumenta jitter/perda (ver **Wireless**)
- TCP/IP ajuda a localizar o problema por camada (ver **TCP/IP**)

---

## 7) Detalhe técnico (opcional)

**Modelo mental:**  
- TCP = “correio com rastreio e confirmação”  
- UDP = “gritar uma mensagem e torcer para ouvir a resposta”

Em aplicações em tempo real, retransmitir pode piorar (chega atrasado e atrapalha).
Por isso VoIP/streaming preferem UDP, com mecanismos próprios de correção.

---

## 8) O que mais cai em prova (pegadinhas)

- UDP não tem handshake como TCP
- UDP não garante entrega/ordem
- DNS pode usar TCP em casos específicos (respostas grandes/transferência de zona)

## ✅ Checklist final (domínio do tema)

- [ ] Consigo explicar UDP em linguagem simples
- [ ] Sei diferenciar UDP e TCP por características práticas
- [ ] Sei citar casos comuns de uso do UDP
- [ ] Sei quais problemas são típicos de tráfego em tempo real (jitter/perda)

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
wMHAqYuukGo
```
### Aula mais completa
```youtube
3MvynTbLPIw
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é UDP? (PT-BR): https://www.cloudflare.com/pt-br/learning/ddos/glossary/user-datagram-protocol-udp/
- Cloudflare – TCP vs UDP (PT-BR): https://www.cloudflare.com/pt-br/learning/ddos/glossary/tcp-vs-udp/
