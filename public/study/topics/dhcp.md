# DHCP – Guia completo (DORA, lease, reservas, relay e troubleshooting)

## 🧠 Mapa mental (visão geral)

![Mapa mental – dhcp](/study/images/dhcp-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- O que é DHCP e por que ele é essencial
- Como funciona o processo DORA (com broadcast)
- O que é lease, renovação e reserva (reservation)
- Como DHCP Relay funciona entre VLANs
- Como diagnosticar rápido (APIPA, pool cheio, conflitos)

---

## 1) Introdução (do zero)

O **DHCP** (Dynamic Host Configuration Protocol) entrega automaticamente as configurações de rede para os dispositivos:
- IP
- máscara
- gateway
- DNS
- tempo de concessão (lease)

Sem DHCP, a equipe teria que configurar tudo manualmente. Em suporte, DHCP é **um dos maiores causadores de “sem internet”**.

## 2) Conceitos fundamentais

### DHCP Server x Client
Servidor concede configurações; cliente solicita. Normalmente o roteador ou um servidor Windows/Linux faz o papel de servidor.

### Lease (concessão)
É o ‘aluguel’ do IP. Expira e pode ser renovado automaticamente.

### Reserva (Reservation)
IP fixo para um dispositivo específico (amarrado ao MAC). Útil para impressoras, servidores, PDV.

### Portas e protocolo
DHCP usa **UDP 67 (server)** e **UDP 68 (client)**.

---

## 3) Como funciona (passo a passo)

![Diagrama – dhcp](/study/images/dhcp-dora.svg)

![Diagrama – dhcp](/study/images/dhcp-relay.svg)

![Diagrama – dhcp](/study/images/dhcp-mapa-mental.svg)

### Processo DORA (passo a passo)
1. **Discover** (broadcast): “Existe DHCP aí?”
2. **Offer**: “Tenho o IP X disponível”
3. **Request**: “Quero o IP X”
4. **ACK**: “Confirmado. Aqui estão IP/máscara/gateway/DNS”

Depois, o cliente renova antes de expirar:
- **T1** (renovação com o mesmo servidor)
- **T2** (tentativa com outros servidores, se necessário)

---

## 4) Exemplos reais no Suporte (cenários)

### IP 169.254.x.x (APIPA)
**Sintoma:** PC pega IP automático 169.254 e não navega.

**O que isso indica:** DHCP não respondeu (cabo/VLAN/servidor/pool).

**Como confirmar:**
- ipconfig /all (ver DHCP habilitado)
- Testar cabo/porta
- Testar outro dispositivo na mesma tomada

**Como resolver:**
- Verificar servidor DHCP/roteador
- Checar se pool está cheio
- Se houver VLANs, verificar relay

### Dispositivo ‘pega IP’, mas sem navegar
**Sintoma:** Tem IP, mas sites não abrem.

**O que isso indica:** DNS/gateway incorreto entregue pelo DHCP.

**Como confirmar:**
- Ver gateway e DNS no ipconfig /all
- Ping gateway
- Ping 1.1.1.1
- nslookup

**Como resolver:**
- Corrigir opções do DHCP (gateway/DNS)
- Reiniciar lease (release/renew)
- Padronizar DNS correto


---

## 5) Troubleshooting (checklist profissional)

### Checklist DHCP (ordem de diagnóstico)
1. **IP**: o cliente recebeu IP válido da rede?
2. **Gateway e DNS**: vieram corretos?
3. **Pool**: há IPs disponíveis?
4. **Conflito**: há IP duplicado?
5. **VLAN/Relay**: o broadcast está chegando ao servidor?

### Comandos úteis (Windows)
```bash
ipconfig /all
ipconfig /release
ipconfig /renew
ipconfig /flushdns
```

Dica: se **vários clientes** estão com APIPA ao mesmo tempo, pense no **servidor DHCP** ou no **switch/VLAN**.

## 6) Conexões com outros temas

- DHCP entrega DNS (ver **DNS**)
- DHCP entrega gateway/rota padrão (ver **Rotas e Gateway**)
- Problemas de Wi‑Fi também afetam DHCP (ver **Wireless**)

---

## 7) Detalhe técnico (opcional)

**Por que o Discover é broadcast?**  
Porque o cliente ainda não sabe **qual** é o servidor DHCP e ainda pode estar sem IP. O broadcast garante que a mensagem chegue a todos no segmento.

**DHCP Relay** é necessário quando o cliente e o servidor estão em **redes/VLANs diferentes**, pois broadcast não atravessa roteador.

---

## 8) O que mais cai em prova (pegadinhas)

- DHCP usa UDP, não TCP
- APIPA (169.254) indica falta de DHCP, não ‘internet fora’ diretamente
- Broadcast não atravessa roteador sem DHCP Relay

## ✅ Checklist final (domínio do tema)

- [ ] Sei explicar DHCP e o que ele entrega
- [ ] Sei descrever DORA e por que há broadcast
- [ ] Sei reconhecer APIPA (169.254) como falta de DHCP
- [ ] Sei quando preciso de DHCP Relay (VLANs diferentes)
- [ ] Sei checar pool/lease/reserva e resolver conflitos

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
T6DfFgFOKm4
```
### Aula mais completa
```youtube
EES4_1dI3is
```

## 📚 Leituras e referências (PT-BR)

- Microsoft Learn (DHCP – PT-BR): https://learn.microsoft.com/pt-br/windows-server/networking/technologies/dhcp/dhcp-top
- Cloudflare – O que é DHCP? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-dhcp/
- Wikipedia PT – DHCP: https://pt.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol
