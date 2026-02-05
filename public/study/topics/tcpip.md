# Modelo TCP/IP – Camadas, funções e comparação com OSI

## 🧠 Mapa mental (visão geral)

![Mapa mental – tcpip](/study/images/tcpip-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- Para que serve um modelo em camadas (por que isso ajuda no suporte)
- O que cada camada do TCP/IP faz, com exemplos
- Como comparar TCP/IP com OSI sem decorar
- Como usar camadas para diagnosticar problemas (camada física, IP, DNS, etc.)

---

## 1) Introdução (do zero)

O modelo **TCP/IP** é uma forma organizada de entender como dados saem do seu computador e chegam a outro.
Ele divide o processo em **camadas**, para que cada parte tenha uma responsabilidade.

No suporte, pensar em camadas ajuda a evitar “chute”:
- Se a **camada de acesso** falha → cabo/Wi‑Fi
- Se a **camada de internet** falha → IP/rota/gateway
- Se a **camada de transporte** falha → portas/serviços
- Se a **camada de aplicação** falha → DNS/HTTP/app

## 2) Conceitos fundamentais

### Camada de Aplicação
Onde vivem os protocolos usados pelos apps (HTTP/HTTPS, DNS, SMTP, DHCP, etc.). É o que o usuário ‘vê’.

### Camada de Transporte
Entrega dados de ponta a ponta (TCP/UDP). Aqui entram portas, confiabilidade, ordem, retransmissão.

### Camada de Internet
Endereçamento e roteamento (IP). Decide por onde os pacotes vão passar entre redes.

### Camada de Acesso à Rede
Como os bits passam no meio físico (Ethernet, Wi‑Fi). Envolve frames, MAC, sinal.

---

## 3) Como funciona (passo a passo)

![Diagrama – tcpip](/study/images/tcpip-stack.svg)

![Diagrama – tcpip](/study/images/tcpip-camadas.svg)

### Exemplo: abrir um site (visão por camadas)
1. **Aplicação**: navegador pede `https://site.com` (DNS pode entrar)
2. **Transporte**: cria conexão TCP (ou QUIC/UDP) usando portas
3. **Internet**: IP define destino e rota via gateway
4. **Acesso**: Ethernet/Wi‑Fi envia os quadros pelo meio

**Por que isso importa?**  
Porque você testa em etapas: DNS → IP → rota → porta → aplicação.

---

## 4) Exemplos reais no Suporte (cenários)

### “Wi‑Fi conectado, mas nada abre” (camadas)
**Sintoma:** Sinal ok, conectado, mas sem navegação.

**O que isso indica:** Pode falhar em IP/gateway/DNS (camadas Internet/Aplicação).

**Como confirmar:**
- Ver IP/gateway/DNS
- Ping gateway
- Ping 1.1.1.1
- nslookup domínio

**Como resolver:**
- Corrigir DHCP/DNS
- Verificar gateway/rota
- Checar bloqueio de firewall/portal cativo

### “Só um sistema interno não abre”
**Sintoma:** Internet ok, mas intranet/app interno falha.

**O que isso indica:** DNS interno, rota para rede interna, ou porta do serviço.

**Como confirmar:**
- Testar resolução (nslookup)
- Testar ping/tracert para IP interno
- Testar porta (se aplicável)

**Como resolver:**
- Ajustar DNS (servidor interno)
- Ajustar rota/VPN
- Liberar porta/serviço no firewall


---

## 5) Troubleshooting (checklist profissional)

### Diagnóstico por camadas (roteiro)
- **Acesso**: tem link/cabo/Wi‑Fi? IP pega?
- **Internet**: gateway responde? rota sai?
- **Transporte**: serviço/porta acessível?
- **Aplicação**: DNS/HTTP/app ok?

Quanto mais você “desce” nas camadas, mais básico e certeiro fica o teste.

## 6) Conexões com outros temas

- Transporte: diferenças TCP vs UDP (ver **UDP**)
- Internet: roteamento e gateway (ver **Rotas e Gateway**)
- Aplicação: DNS (ver **DNS**)
- Saída para internet: NAT/CGNAT (ver **NAT/CGNAT**)

---

## 7) Detalhe técnico (opcional)

**Comparação com OSI (sem decorar):**
- OSI tem 7 camadas; TCP/IP agrupa algumas.
- Em prática de suporte: o importante é **mapear o sintoma** para “camada provável”.

Exemplo rápido:
- “Conectado mas sem IP” → Acesso/DHCP
- “Tem IP mas não sai” → Internet (gateway/rota)
- “Sai por IP mas não por nome” → Aplicação (DNS)

---

## 8) O que mais cai em prova (pegadinhas)

- DNS é aplicação (não ‘camada de internet’)
- IP é camada de internet (roteamento), não transporte
- TCP/UDP estão em transporte; portas pertencem a transporte

## ✅ Checklist final (domínio do tema)

- [ ] Consigo explicar o que é camada e por que isso ajuda no diagnóstico
- [ ] Sei o papel de Aplicação/Transporte/Internet/Acesso
- [ ] Sei dar exemplo de protocolo em cada camada
- [ ] Consigo enquadrar um problema comum em uma camada provável

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
iWy6HD0E9hA
```
### Aula mais completa
```youtube
B3GneMzPYNE
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é TCP/IP? (PT-BR): https://www.cloudflare.com/pt-br/learning/ddos/glossary/tcp-ip/
- Khan Academy (conceitos de camadas – PT): https://pt.khanacademy.org/computing/computer-science/internet-intro
