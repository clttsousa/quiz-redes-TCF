# IP Público x IP Privado – Faixas, usos e CGNAT (sem confusão)

## 🧠 Mapa mental (visão geral)

![Mapa mental – ip-publico-privado](/study/images/ip-publico-privado-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- Diferença prática entre IP público e privado
- Quais são as faixas de IP privado mais comuns
- O que é CGNAT e por que ele é usado
- Como identificar se o cliente está atrás de CGNAT

---

## 1) Introdução (do zero)

IP é o “endereço” na rede. A grande diferença é:
- **IP público**: é roteável na internet (visível “na rua”)
- **IP privado**: é usado dentro de redes locais e **não é roteável** na internet

No suporte, isso aparece em: acesso remoto, câmeras, jogos, VPN e abertura de portas.

## 2) Conceitos fundamentais

### Faixas privadas
As principais faixas privadas (IPv4) são:
- **10.0.0.0/8**
- **172.16.0.0/12**
- **192.168.0.0/16**

### IP público
Normalmente é o IP que aparece em sites ‘meu IP’ (quando não há CGNAT).

### CGNAT (por quê)
Como IPv4 é escasso, provedores compartilham IP público entre vários clientes.

### Como detectar CGNAT
Se o IP na WAN do roteador for privado (100.64/10, 10/8, 172.16/12, 192.168/16), há grande chance de CGNAT/duplo NAT.

---

## 3) Como funciona (passo a passo)

### Exemplo rápido
- Seu PC: 192.168.0.10 (privado)
- Seu roteador: traduz (NAT) para 200.x.x.x (público)
- Internet responde para o IP público → roteador entrega para o privado certo

Em CGNAT: o provedor faz outra tradução acima do seu roteador.

---

## 4) Exemplos reais no Suporte (cenários)

### Cliente quer acessar câmera de fora
**Sintoma:** Port forwarding configurado, mas não funciona.

**O que isso indica:** Cliente em CGNAT ou duplo NAT.

**Como confirmar:**
- Ver IP WAN no roteador
- Comparar com ‘meu IP’
- Checar se WAN é 100.64/10 ou 10/8

**Como resolver:**
- Solicitar IP público ao provedor
- Usar solução cloud/P2P
- Colocar modem em bridge (se duplo NAT)

### VPN corporativa falha em casa
**Sintoma:** Conecta e cai ou não autentica.

**O que isso indica:** Bloqueio/CGNAT/portas/MTU.

**Como confirmar:**
- Testar outra rede (4G)
- Checar se há CGNAT
- Verificar DNS e gateway

**Como resolver:**
- Ajustar configuração do roteador
- Contatar provedor para IP público
- Usar VPN com opção NAT traversal


---

## 5) Troubleshooting (checklist profissional)

### Checklist IP público/privado
1. Qual IP o dispositivo recebeu? (LAN)
2. Qual IP a WAN do roteador recebeu?
3. Esse IP é público mesmo?
4. Há modem + roteador (duplo NAT)?

Dica: muitas queixas de “porta não abre” são na verdade **CGNAT**.

## 6) Conexões com outros temas

- NAT depende de IP público (ver **NAT/CGNAT**)
- DHCP entrega IP privado na LAN (ver **DHCP**)
- Rotas/gateway explicam como sair para internet (ver **Rotas e Gateway**)

---

## 7) Detalhe técnico (opcional)

**Faixa comum do CGNAT (100.64.0.0/10):**  
Muitos provedores usam essa faixa para a rede interna deles (entre cliente e CGNAT).  
Se o roteador recebe algo como **100.64.x.x**, isso indica CGNAT.

Com CGNAT, **port forwarding costuma não funcionar**, pois o IP público é compartilhado.

---

## 8) O que mais cai em prova (pegadinhas)

- IP privado não é roteável na internet
- CGNAT é ‘NAT no provedor’, não no roteador do cliente
- Duplo NAT pode acontecer mesmo sem CGNAT

## ✅ Checklist final (domínio do tema)

- [ ] Sei dizer se um IP é público ou privado
- [ ] Conheço as faixas privadas principais
- [ ] Entendo por que existe CGNAT
- [ ] Consigo orientar impacto de CGNAT em portas/acesso remoto

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
OYPd6aHon_8
```
### Aula mais completa
```youtube
sxiI-Tpd9JQ
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é endereço IP? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-an-ip-address/
- NIC.br – IPv6 e escassez de IPv4 (PT-BR): https://www.nic.br/ipv6/
- Wikipedia PT – Endereço IP: https://pt.wikipedia.org/wiki/Endere%C3%A7o_IP
