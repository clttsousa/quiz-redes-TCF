# Modelo TCP/IP – Camadas, Funções e Comparação com OSI

## 🧠 Mapa mental (visão geral)

![Mapa mental – tcpip](/study/images/tcpip-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. Por que existe “modelo de camadas”?
Em redes, muita coisa acontece ao mesmo tempo: aplicativos, criptografia, transporte, endereçamento, mídia física…
Para organizar isso, usamos **modelos em camadas**. Eles ajudam a:
- **entender** onde um problema está (aplicação? transporte? roteamento? cabo?)
- **padronizar** tecnologias (cada camada tem responsabilidades)
- **trocar componentes** sem quebrar tudo (ex.: trocar Wi‑Fi por cabo sem mudar o navegador)

No suporte, pensar em camadas é como diagnosticar um carro:
- **o motor liga** (camada física ok)
- **a marcha engata** (enlace ok)
- **o carro anda até o destino** (roteamento ok)
- **o GPS encontra endereço** (DNS ok)
- **o app funciona** (aplicação ok)

---

## 2. O modelo TCP/IP (4 camadas)
![Camadas TCP/IP](/study/images/tcpip-camadas.svg)

### 2.1 Aplicação
Onde estão os protocolos usados por programas:
- HTTP/HTTPS, DNS, DHCP, SMTP, SSH, FTP, NTP…
No suporte: erro no site, proxy, DNS, autenticação.

### 2.2 Transporte
Como os dados são entregues de ponta a ponta entre processos:
- **TCP** (confiável, com controle de fluxo, handshake)
- **UDP** (rápido, sem garantia)
No suporte: portas bloqueadas, queda de sessão, latência/jitter.

### 2.3 Internet
Endereçamento e roteamento entre redes:
- IP, ICMP, roteamento
No suporte: gateway, rota, “não alcança outra rede”, traceroute.

### 2.4 Acesso à Rede
Como os dados vão para o meio físico:
- Ethernet, Wi‑Fi, ARP, switches, cabos
No suporte: porta do switch, cabo, interferência, VLAN.

---

## 3. Comparação TCP/IP x OSI (o que você precisa saber)
OSI tem 7 camadas (modelo teórico). TCP/IP é o modelo prático da internet.

Tabela (visão simplificada):
- OSI 7/6/5 (Aplicação/Apresentação/Sessão) → TCP/IP **Aplicação**
- OSI 4 (Transporte) → TCP/IP **Transporte**
- OSI 3 (Rede) → TCP/IP **Internet**
- OSI 2/1 (Enlace/Física) → TCP/IP **Acesso à Rede**

📌 Pegadinha comum: “OSI é usado na internet?”  
O que usamos na prática é o **TCP/IP**. O OSI serve como **referência didática**.

---

## 4. O que acontece quando você abre um site (passo a passo)
Vamos imaginar: você abre `https://intranet.empresa.com`

1. **Aplicação**: o navegador prepara a requisição HTTP/HTTPS.
2. **Aplicação**: DNS resolve o nome para um IP (se ainda não tiver em cache).
3. **Transporte**: TCP (ou QUIC/UDP no caso de HTTP/3) abre conexão.
4. **Internet**: IP escolhe o caminho até o servidor (roteamento).
5. **Acesso à Rede**: Ethernet/Wi‑Fi envia quadros até o gateway/switch.
6. Resposta volta pelo caminho inverso e o navegador renderiza.

No suporte, você pode mapear o erro:
- não resolve nome → DNS (Aplicação)
- resolve mas não conecta → Transporte (porta/bloqueio)
- não chega no IP → Internet (rota/gateway)
- perde pacote na LAN → Acesso à Rede (cabo/Wi‑Fi)

---

## 5. Diagnóstico por camadas (rápido e eficiente)
- **Acesso à Rede**: link conectado? Wi‑Fi com sinal? porta do switch?
- **Internet**: IP válido? gateway correto? ping no gateway?
- **Transporte**: porta liberada? firewall bloqueando?
- **Aplicação**: DNS? proxy? credenciais? certificado?

---

## 6. Referências (PT‑BR)
- Cloudflare Learning (HTTP, DNS, TCP/IP): https://www.cloudflare.com/pt-br/learning/
- Microsoft Learn – conceitos de rede (PT‑BR): https://learn.microsoft.com/pt-br/windows-server/networking/

---


## 🎥 Vídeos (PT‑BR)

### Modelo TCP/IP – explicação

```youtube
iWy6HD0E9hA
```

Link: https://www.youtube.com/watch?v=iWy6HD0E9hA

### OSI x TCP/IP – comparação

```youtube
B3GneMzPYNE
```

Link: https://www.youtube.com/watch?v=B3GneMzPYNE

