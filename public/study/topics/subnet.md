# Máscara de Sub-rede – Apostila completa (CIDR, cálculo de hosts e prática)

## 🧠 Mapa mental (visão geral)

![Mapa mental – subnet](/study/images/subnet-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- Para que serve máscara de sub-rede (o porquê, não só definição)
- Entender CIDR (/24, /26, /30) sem decorar
- Calcular quantos hosts cabem em uma sub-rede
- Identificar endereço de rede e broadcast
- Usar subnetting no suporte (planejamento e troubleshooting)

---

## 1) Introdução (do zero)

Máscara de sub-rede define **quem está na mesma rede** e quem está “fora” (precisa ir pelo gateway).
Ela é fundamental para:
- separar redes (departamentos, VLANs)
- controlar broadcast
- planejar endereçamento
- evitar conflitos

No suporte, máscara errada causa: “tenho IP, mas não acesso o servidor”.

## 2) Conceitos fundamentais

### CIDR (ex.: /24)
É a forma curta de escrever quantos bits pertencem à rede. /24 significa 24 bits de rede e 8 bits para hosts (em IPv4).

### Endereço de rede
Primeiro endereço do bloco (identifica a sub-rede).

### Broadcast
Último endereço do bloco (envia para todos os hosts da sub-rede).

### Hosts úteis
Em IPv4 tradicional, não usamos o endereço de rede e broadcast para hosts (regra clássica).

---

## 3) Como funciona (passo a passo)

![Diagrama – subnet](/study/images/subnet-visual.svg)

![Diagrama – subnet](/study/images/subnet-map.svg)

### Como pensar (passo a passo)
1. IP + máscara definem o **bloco** (sub-rede)
2. Se destino está no mesmo bloco → envia direto (sem gateway)
3. Se destino está fora → envia para o **gateway padrão**

**Exemplo comum:**  
PC 192.168.1.50/24 enxerga 192.168.1.10 direto, mas para 192.168.2.10 precisa do gateway.

---

## 4) Exemplos reais no Suporte (cenários)

### Tem IP, mas não acessa servidor na mesma faixa
**Sintoma:** PC e servidor parecem ‘no mesmo 192.168.1.x’, mas não se enxergam.

**O que isso indica:** Máscara diferente (um /24 e outro /25, por exemplo).

**Como confirmar:**
- Comparar IP/máscara dos dois lados
- Testar ping
- Checar gateway

**Como resolver:**
- Padronizar máscara correta via DHCP
- Ajustar IPs para mesma sub-rede real

### Rede saturada com muitos broadcasts
**Sintoma:** Lentidão geral, muitas quedas.

**O que isso indica:** Sub-rede grande demais para o ambiente (broadcast domain enorme).

**Como confirmar:**
- Ver tamanho do /xx
- Analisar tráfego se possível
- Checar número de dispositivos

**Como resolver:**
- Segmentar em sub-redes menores
- Usar VLANs
- Planejar DHCP por escopo


---

## 5) Troubleshooting (checklist profissional)

### Checklist de sub-rede
1. IP, máscara, gateway estão coerentes?
2. O destino está na mesma rede? (mesmo bloco)
3. Se não, o gateway responde?
4. Há conflito de IP?

Dica: problemas de sub-rede se parecem com “cabo ruim”, mas são configuração.

## 6) Conexões com outros temas

- DHCP entrega máscara e gateway (ver **DHCP**)
- Roteamento depende da rede correta (ver **Rotas e Gateway**)
- Conceito de broadcast também aparece em DHCP (ver **DHCP**)

---

## 7) Detalhe técnico (opcional)

**Regra rápida para número de hosts (IPv4):**  
Hosts = 2^(bits de host) – 2

Exemplos:
- /24 → bits host = 8 → 2^8 – 2 = 254 hosts
- /26 → bits host = 6 → 62 hosts
- /30 → bits host = 2 → 2 hosts (muito usado em links ponto‑a‑ponto)

---

## 8) O que mais cai em prova (pegadinhas)

- /30 costuma ser usado para links ponto-a-ponto (2 hosts)
- Máscara errada pode impedir acesso mesmo com IP ‘parecido’
- Broadcast é o último IP do bloco

## ✅ Checklist final (domínio do tema)

- [ ] Consigo explicar o que a máscara faz (quem é rede e quem é host)
- [ ] Sei calcular hosts para /24, /26, /30
- [ ] Sei identificar rede e broadcast de um bloco simples
- [ ] Sei reconhecer sintomas de máscara/gateway errado no suporte

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
XjYmTzZzGi8
```
### Aula mais completa
```youtube
CKBWCaiZrsw
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é subnet? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-a-subnet/
- Wikipedia PT – Sub-rede: https://pt.wikipedia.org/wiki/Sub-rede
