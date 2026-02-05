# DHCP – Dynamic Host Configuration Protocol (Apostila Completa)

## 🧠 Mapa mental (visão geral)

![Mapa mental – dhcp](/study/images/dhcp-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. Introdução (por que DHCP é “base”)
O **DHCP** automatiza a configuração de rede. Em vez de configurar IP manualmente em cada dispositivo, o DHCP entrega:
- IP
- máscara
- gateway padrão
- DNS
- (e outras opções, conforme a rede)

No suporte, DHCP aparece assim:
- usuário “conecta” no Wi‑Fi, mas fica **Sem Internet**
- PC pega **169.254.x.x (APIPA)**
- “Conflito de IP”
- “Só alguns dispositivos navegam”

---

## 2. Conceitos fundamentais (sem pular etapas)
- **DHCP Server**: serviço/equipamento que concede parâmetros.
- **DHCP Client**: dispositivo que solicita.
- **Lease**: tempo de “aluguel” do IP.
- **Pool / Escopo (scope)**: faixa de IPs disponíveis.
- **Reserva (reservation)**: IP fixo associado a um **MAC Address**.
- **Opções DHCP**: parâmetros extras (DNS, domínio, NTP, rota, etc.).
- **APIPA**: fallback automático 169.254.0.0/16 quando não consegue DHCP.

### Portas (IPv4)
- **UDP 67** (servidor)
- **UDP 68** (cliente)

📌 Glossário rápido:
- **broadcast**: mensagem para “todos na LAN” (porque o cliente ainda não sabe quem é o servidor).
- **unicast**: mensagem direta para um destino específico.

---

## 3. Processo DORA (passo a passo, com o “porquê”)
![Fluxo DHCP – DORA](/study/images/dhcp-dora.svg)

1) **Discover (broadcast)**  
O cliente “grita” na rede: “Existe servidor DHCP aí?”
- Por que broadcast? Porque o cliente ainda não tem IP e não sabe o IP do servidor.

2) **Offer**  
O servidor oferece:
- um IP disponível
- máscara
- gateway
- DNS
- tempo de lease

3) **Request**  
O cliente escolhe uma oferta e pede formalmente.

4) **ACK**  
O servidor confirma e “aluga” aquele IP pelo tempo definido.

✅ Se houver erro, pode ocorrer **NAK** (negação).

---

## 4. O que o DHCP entrega (opções mais comuns)
Além do IP, as opções mais relevantes para suporte:
- **Option 1**: máscara
- **Option 3**: gateway
- **Option 6**: DNS
- **Option 15**: sufixo de domínio (ex.: empresa.local)
- **Lease time**: tempo de validade

Em ambientes corporativos, podem existir opções para:
- servidores NTP
- proxy/WPAD
- rotas específicas

---

## 5. Renovação (T1/T2) – o “depois do DORA”
Muita gente aprende DORA e para por aí. Mas em suporte, o “tempo” é crucial.

- **T1 (renovação)**: o cliente tenta renovar com o mesmo servidor (geralmente unicast).
- **T2 (rebinding)**: se falhar, tenta renovar com qualquer servidor DHCP.

Se o lease expira e o cliente não renova:
- ele pode perder conectividade (principalmente em redes com controle rígido)

---

## 6. DHCP Relay (quando há mais de uma rede)
Broadcast não atravessa roteadores. Então, se o servidor DHCP está em outra rede/VLAN, você precisa de **DHCP Relay**.

![DHCP Relay – visão geral](/study/images/dhcp-relay.svg)

Exemplo típico:
- Clientes na VLAN 20
- Servidor DHCP na VLAN 10
- O roteador/switch L3 faz relay (`ip helper-address`)

No suporte, relay mal configurado gera:
- clientes na VLAN “sem IP”
- APIPA
- reclamação “só esse andar não pega rede”

---

## 7. Cenários de suporte (bem reais)
### 7.1 IP 169.254.x.x (APIPA)
**Causa provável:** não recebeu resposta DHCP.
**Confirme:** `ipconfig /all` mostra Autoconfiguração IPv4.

Checklist:
- cabo/Wi‑Fi ok?
- SSID correto?
- VLAN correta no switch/AP?
- pool de IP acabou?
- serviço DHCP ativo?
- relay está configurado?

### 7.2 Pool esgotado
Sintomas:
- novos dispositivos não pegam IP
- rede “funciona para uns e não para outros”

Soluções:
- aumentar o pool
- reduzir lease (com cuidado)
- remover leases “fantasmas”

### 7.3 IP duplicado
Causas comuns:
- alguém configurou IP manual dentro do pool
- reserva mal planejada

Boa prática:
- separar uma faixa para IP fixo fora do pool
- usar reservas no DHCP para equipamentos que precisam “IP fixo”

---

## 8. Troubleshooting com comandos (Windows e Linux)
Windows:
```bash
ipconfig /all
ipconfig /release
ipconfig /renew
```

Linux:
```bash
ip a
sudo dhclient -r
sudo dhclient
```

Dicas:
- `ipconfig /renew` ajuda a “forçar” o processo.
- `ipconfig /all` mostra se o DNS/gateway veio via DHCP.

---

## 9. Segurança (nível suporte: o que você precisa saber)
Em redes corporativas, pode existir:
- **DHCP Snooping** (switch bloqueia DHCP “falso”)
- **Port Security** (limita MACs por porta)
- **802.1X** (controle de acesso por autenticação)

Sintomas:
- usuário conecta mas não ganha IP
- só funciona após autenticar
- somente alguns dispositivos passam

---

## 10. Pegadinhas de prova (e confusões comuns)
- DHCP usa TCP? ❌ Não, usa UDP.
- IP automático = DHCP? ❌ Pode ser APIPA.
- DHCP sempre atravessa roteador? ❌ Precisa de relay.
- Trocar DNS “resolve internet”? Às vezes sim, mas não corrige gateway errado.

---

## 11. Leituras (PT‑BR)
- Microsoft Learn – noções básicas de DHCP: https://learn.microsoft.com/pt-br/windows-server/troubleshoot/dynamic-host-configuration-protocol-basics
- Material didático (PDF DHCP): https://www.lsi.usp.br/~penasio/cursos/adm_redes/aula_DHCP.pdf

---

## 12. Treino
Depois de estudar, treine questões de **DHCP** (DORA, portas, relay, APIPA e cenários).

## 🎥 Vídeos (PT‑BR)

### DHCP essencial (PT‑BR)

```youtube
T6DfFgFOKm4
```

Link: https://www.youtube.com/watch?v=T6DfFgFOKm4

### Como funciona o DHCP (PT‑BR)

```youtube
EES4_1dI3is
```

Link: https://www.youtube.com/watch?v=EES4_1dI3is

