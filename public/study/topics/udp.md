# UDP – Conceito, Diferenças para TCP e Quando Usar

## 🧠 Mapa mental (visão geral)

![Mapa mental – udp](/study/images/udp-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. Intuição: “entrega rápida” vs “entrega garantida”
O **UDP** é um protocolo de transporte focado em **velocidade e simplicidade**.
Ele não garante entrega, ordem nem controle de congestionamento como o TCP.

Analogia:
- **TCP** = Sedex com rastreio e confirmação de recebimento.
- **UDP** = panfleto jogado na caixa: rápido, mas pode falhar.

No suporte, isso importa porque alguns serviços **preferem perder um pacote** do que “travar” esperando retransmissão.

---

## 2. O que o UDP faz (e o que NÃO faz)
✅ Faz:
- Encapsula dados de aplicação em **datagramas**
- Usa **portas** para identificar serviços (ex.: DNS 53)
- Permite comunicação simples e rápida

❌ Não faz:
- Handshake
- Reenvio automático
- Garantia de ordem
- Controle de fluxo

---

## 3. UDP x TCP (comparação para prova)
![UDP vs TCP](/study/images/udp-vs-tcp.svg)

| Característica | UDP | TCP |
|---|---|---|
| Confiabilidade | baixa (sem garantia) | alta (garantia) |
| Ordem | não garante | garante |
| Handshake | não | sim (3-way handshake) |
| Latência | menor | maior |
| Uso típico | streaming, VoIP, DNS | web tradicional, e-mail, arquivos |

📌 Pegadinha: “UDP é sempre melhor?”  
Não. Depende do objetivo: **confiabilidade** vs **latência**.

---

## 4. Quando usar UDP (com exemplos de verdade)
### DNS
Consulta rápida. Se perder, o cliente consulta de novo.
- Porta: **53/UDP** (também pode usar TCP em alguns casos)

### VoIP e chamadas
O áudio/vídeo precisa ser contínuo. Se atrasar, fica ruim.
- O aplicativo pode mascarar perda com jitter buffer.

### Streaming ao vivo / jogos online
Perder um pacote isolado é menos grave do que travar.

### NTP (sincronização de tempo)
Mensagens pequenas, repetíveis.

---

## 5. O que dá errado (e como aparece no suporte)
### Sintomas comuns
- “Voz robótica / cortes” em chamadas → **jitter/perda** (UDP sensível)
- Streaming com “quadros quebrados” → perda de pacotes
- DNS instável → timeouts, servidor bloqueando UDP 53

### Como confirmar
- `ping` (latência)
- `tracert` / `traceroute` (rota)
- Ferramentas: `iperf` (UDP mode), Wireshark

---

## 6. Dicas de troubleshooting (bem prática)
- Verifique **Wi‑Fi**: interferência, canal, distância → aumenta perda/jitter
- Verifique **QoS** (quando existe): prioriza voz/vídeo
- Verifique firewall: UDP pode ser bloqueado mais facilmente em ambientes restritos

---

## 7. Referências (PT‑BR)
- Cloudflare – O que é UDP? (PT‑BR): https://www.cloudflare.com/pt-br/learning/ddos/glossary/user-datagram-protocol-udp/
- Cloudflare – O que é TCP? (para comparar) (PT‑BR): https://www.cloudflare.com/pt-br/learning/ddos/glossary/tcp-ip/

---


## 🎥 Vídeos (PT‑BR)

### UDP x TCP – diferenças

```youtube
wMHAqYuukGo
```

Link: https://www.youtube.com/watch?v=wMHAqYuukGo

### Protocolos de transporte – aula

```youtube
3MvynTbLPIw
```

Link: https://www.youtube.com/watch?v=3MvynTbLPIw

