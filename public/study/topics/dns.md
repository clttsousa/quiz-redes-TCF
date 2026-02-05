# DNS – Domain Name System (resolução, recursivo x autoritativo)

## 🧠 Mapa mental (visão geral)

![Mapa mental – dns](/study/images/dns-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. O que é DNS (sem mistério)
O **DNS** é como a “agenda de contatos” da internet:
- você digita um **nome** (ex.: `empresa.com`)
- o DNS responde o **IP** correspondente (ex.: `203.0.113.10`)

Sem DNS, você teria que memorizar números (IPs).  
No suporte, DNS é um dos campeões de incidentes porque:
- um DNS ruim deixa “tudo lento”
- DNS fora do ar faz “nada abrir”
- DNS errado quebra intranet/sistemas internos

---

## 2. Resolução de nomes – passo a passo (didático)
![Fluxo DNS](/study/images/dns-flow.svg)

Quando você acessa `www.exemplo.com`:

1. O dispositivo verifica cache local (já resolvi isso antes?)
2. Pergunta para o **DNS configurado** (normalmente via DHCP)
3. Se esse DNS for **recursivo**, ele pergunta na internet em seu nome:
   - root servers → TLD (.com) → autoritativo do domínio
4. Retorna o IP, guarda em cache pelo **TTL**
5. O navegador usa o IP para conectar ao servidor

📌 O ponto-chave: DNS NÃO “abre site”; ele só traduz o nome em IP.

---

## 3. DNS Recursivo x Autoritativo (diferença que cai em prova)
### DNS Recursivo
É o “pesquisador”: busca a resposta para você.
Ex.: DNS do provedor, do roteador, do Google/Cloudflare.

### DNS Autoritativo
É a “fonte oficial” do domínio.
Ex.: os servidores que dizem: “o IP oficial de `empresa.com` é X”.

---

## 4. Registros DNS mais comuns (com exemplos)
- **A**: nome → IPv4  
  Ex.: `intranet.empresa.com A 10.0.0.10`
- **AAAA**: nome → IPv6
- **CNAME**: apelido  
  Ex.: `www CNAME site.empresa.com`
- **MX**: e-mail do domínio
- **TXT**: validações (SPF, DKIM, etc.)
- **NS**: servidores autoritativos do domínio

No suporte, os mais cobrados são A/AAAA/CNAME e a ideia de MX.

---

## 5. Problemas comuns (como aparece no atendimento)
### Caso 1: “Consigo pingar o IP, mas não o nome”
Isso quase sempre é DNS.
- Teste: `ping 8.8.8.8` funciona, mas `ping google.com` não

### Caso 2: “Só a intranet não abre”
- DNS interno errado
- VPN/DNS split
- cache desatualizado

### Caso 3: “Site abre em um PC e no outro não”
- cache DNS diferente
- DNS diferente (um está apontando para outro servidor)

---

## 6. Ferramentas e comandos (muito útil pro suporte)
Windows:
```bash
ipconfig /all
nslookup intranet.empresa.com
ipconfig /flushdns
```

Linux/macOS:
```bash
dig intranet.empresa.com
nslookup intranet.empresa.com
```

---

## 7. DNS em empresas (pontos importantes)
- Pode haver DNS interno (Active Directory)
- Pode haver **split DNS** (interno resolve diferente do externo)
- DNS pode ser filtrado (bloqueios por categoria, segurança)

---

## 8. Pegadinhas de prova
- DNS “faz a conexão”? ❌ Não. Só resolve nome.
- TTL alto = troca demora a propagar.
- Recursivo ≠ autoritativo.

---

## 9. Referências (PT‑BR)
- Cloudflare – O que é DNS? (PT‑BR): https://www.cloudflare.com/pt-br/learning/dns/what-is-dns/
- NIC.br – Conceitos de DNS: https://www.nic.br
- Locaweb – Guia DNS (PT‑BR): https://www.locaweb.com.br/ajuda/wiki/dns/

---


## 🎥 Vídeos (PT‑BR)

### DNS – como funciona

```youtube
Q_aIVbS6wVc
```

Link: https://www.youtube.com/watch?v=Q_aIVbS6wVc

### DNS – aula completa

```youtube
QpDHFriwKXg
```

Link: https://www.youtube.com/watch?v=QpDHFriwKXg

