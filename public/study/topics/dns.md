# DNS – Apostila completa (resolução de nomes, cache/TTL, recursivo x autoritativo)

## 🧠 Mapa mental (visão geral)

![Mapa mental – dns](/study/images/dns-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- O que é DNS explicado do zero (com analogia)
- Como acontece a resolução de um nome (passo a passo)
- Diferença entre DNS recursivo e autoritativo
- O que é cache e TTL e por que isso afeta o suporte
- Como diagnosticar DNS (nslookup) e resolver problemas comuns

---

## 1) Introdução (do zero)

DNS é o “serviço de nomes” da rede. Ele traduz **nomes fáceis** (ex.: `intranet.empresa.local`) em **endereços IP** (ex.: `10.10.0.25`).

Analogia: pense no DNS como uma **agenda telefônica**:
- Você procura pelo nome
- A agenda devolve o “número” (IP)

No suporte, DNS dá muito incidente porque, quando ele falha:
- “nada abre” (parece internet fora)
- sites abrem por IP, mas não por nome
- sistemas internos quebram (DNS interno errado)

## 2) Conceitos fundamentais

### Nome de domínio
É o nome humano (ex.: `empresa.com`). Pode ter subdomínios (ex.: `vpn.empresa.com`).

### Registro DNS
É a “linha” na agenda. Os mais comuns:
- **A**: nome → IPv4
- **AAAA**: nome → IPv6
- **CNAME**: apelido → outro nome
- **MX**: e‑mail (servidores de correio)

### DNS recursivo
Servidor que faz a busca por você (pergunta para outros servidores até achar a resposta).

### DNS autoritativo
Servidor ‘dono da verdade’ daquela zona/domínio (quem tem a resposta oficial).

### Cache e TTL
DNS usa cache para acelerar:
- **Cache local** (no PC/celular)
- **Cache do DNS recursivo** (na rede/ISP)

**TTL** (Time To Live) é o tempo que uma resposta pode ficar guardada no cache.
TTL alto = menos consultas (mais rápido), mas mudanças demoram a propagar.

---

## 3) Como funciona (passo a passo)

![Diagrama – dns](/study/images/dns-flow.svg)

### Resolução de nomes (passo a passo)
Quando você digita `www.exemplo.com`:

1. **Cache local**: o dispositivo verifica se já sabe o IP.
2. **Pergunta ao DNS configurado**: geralmente vem do DHCP (roteador/empresa).
3. O DNS configurado (recursivo) pergunta na hierarquia:
   - **Root** → “quem responde pelo .com?”
   - **TLD (.com)** → “quem é o autoritativo do exemplo.com?”
   - **Autoritativo** → devolve o registro A/AAAA/CNAME…
4. O recursivo guarda em **cache** (por TTL) e responde ao cliente.

**Por que isso importa?**  
Porque às vezes “o servidor já mudou”, mas o cache ainda aponta para o IP antigo.

---

## 4) Exemplos reais no Suporte (cenários)

### Abre por IP, mas não por nome
**Sintoma:** Usuário consegue pingar 1.1.1.1, mas não acessa sites por nome.

**O que isso indica:** DNS não está respondendo ou DNS configurado está errado.

**Como confirmar:**
- Executar `nslookup google.com`
- Verificar DNS no `ipconfig /all`
- Testar outro DNS (temporário)

**Como resolver:**
- Corrigir DNS no DHCP/roteador
- Trocar DNS para um funcional
- Limpar cache (`ipconfig /flushdns`)

### Internet funciona, mas intranet não abre
**Sintoma:** Sites externos abrem, mas sistema interno não.

**O que isso indica:** DNS interno não configurado (cliente usando DNS público).

**Como confirmar:**
- Verificar DNS configurado
- Testar nslookup do nome interno
- Testar por IP do servidor interno

**Como resolver:**
- Configurar DNS interno via DHCP/VPN
- Ajustar política de rede/VPN para empurrar DNS correto


---

## 5) Troubleshooting (checklist profissional)

### Checklist DNS (ordem recomendada)
1. O cliente tem IP/gateway ok? (se não, olhar DHCP)
2. O DNS configurado responde? (nslookup)
3. Há diferença entre resolver nome externo e interno?
4. Cache/TTL pode estar prendendo IP antigo?

### Comandos úteis (Windows)
```bash
ipconfig /all
nslookup exemplo.com
ipconfig /flushdns
```

## 6) Conexões com outros temas

- DNS é entregue via DHCP (ver **DHCP**)
- UDP aparece em consultas DNS (ver **UDP**)
- Rotas/gateway precisam estar ok para alcançar DNS remoto (ver **Rotas e Gateway**)
- NAT/CGNAT pode afetar acesso a DNS específico (ver **NAT/CGNAT**)

---

## 7) Detalhe técnico (opcional)

**Por que às vezes DNS usa TCP?**  
Normalmente consultas usam UDP (rápido), mas pode usar TCP em casos como:
- resposta grande (ex.: muitos registros / DNSSEC)
- transferência de zona (entre servidores autoritativos)

**DNS interno x externo:**  
Empresas costumam ter DNS interno para nomes que não existem na internet (ex.: `servidor-arquivos.local`).
Se o cliente usar DNS público, esses nomes não resolvem.

---

## 8) O que mais cai em prova (pegadinhas)

- DNS não ‘dá internet’: ele só resolve nomes
- TTL alto pode causar ‘demora para atualizar’ após mudanças
- DNS recursivo ≠ autoritativo (papéis diferentes)

## ✅ Checklist final (domínio do tema)

- [ ] Sei explicar DNS com analogia simples
- [ ] Sei diferenciar recursivo e autoritativo
- [ ] Entendo cache e TTL e seu impacto
- [ ] Sei diagnosticar com nslookup e flushdns
- [ ] Consigo identificar DNS interno vs público no suporte

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
Q_aIVbS6wVc
```
### Aula mais completa
```youtube
QpDHFriwKXg
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é DNS? (PT-BR): https://www.cloudflare.com/pt-br/learning/dns/what-is-dns/
- Cloudflare – DNS recursivo vs autoritativo (PT-BR): https://www.cloudflare.com/pt-br/learning/dns/glossary/dns-recursive-resolver/
- Wikipedia PT – Sistema de nomes de domínio: https://pt.wikipedia.org/wiki/Sistema_de_Nomes_de_Dom%C3%ADnio
