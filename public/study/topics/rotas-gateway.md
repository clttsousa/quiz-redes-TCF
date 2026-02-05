# Criação de Rotas e Gateways – Conceitos e Boas Práticas

## 🧠 Mapa mental (visão geral)

![Mapa mental – rotas-gateway](/study/images/rotas-gateway-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. Gateway padrão (o conceito que resolve 80% dos casos)
O **gateway padrão** é o endereço do roteador usado quando o dispositivo precisa falar com **outra rede** (fora da sua sub-rede).
Na prática, é a “porta de saída” do seu bairro.

Exemplo:
- PC: 192.168.1.50/24  
- Gateway: 192.168.1.1  
- Internet: fora da rede 192.168.1.0/24 → então o PC envia para o gateway.

Se o gateway estiver errado, acontece isso:
- o PC fala com a **LAN** (impressora, colegas) ✅
- mas não fala com redes externas/internet ❌

---

## 2. Rotas (routing table) – como o roteador decide o caminho
Roteadores mantêm uma **tabela de rotas**. Cada rota possui:
- **destino** (rede/prefixo, ex.: 10.10.0.0/16)
- **next hop** (próximo salto) ou **interface**
- **métrica** (preferência)

Regra principal:
- **a rota mais específica vence** (maior prefixo, ex.: /24 vence /16).

---

## 3. Rotas estáticas x dinâmicas (na linguagem do suporte)
### Rotas estáticas
Configuradas manualmente.
- bom para ambientes pequenos
- exige manutenção (se mudar algo, tem que alterar)

### Rotas dinâmicas
Aprendidas via protocolos (OSPF/BGP/RIP).
- comum em redes grandes (core/operadora)
- adapta a falhas melhor

No suporte interno, você geralmente:
- valida o gateway do usuário
- valida se existe rota no firewall/roteador
- valida se a VPN adicionou rotas corretas (split tunnel)

---

## 4. Rota padrão (default route)
Quando um equipamento não tem rota específica para um destino, ele usa a **rota padrão**:
- IPv4: **0.0.0.0/0**
- IPv6: **::/0**

Em redes corporativas, a rota padrão normalmente aponta para:
- firewall/edge router
- link com a operadora

---

## 5. Exemplos práticos (para fixar)
### Exemplo A: usuário acessa um sistema em outra rede
- Rede do usuário: 192.168.10.0/24
- Servidor: 10.20.0.10/16

Para funcionar, precisa:
- gateway correto no PC
- rota no roteador/firewall para 10.20.0.0/16
- retorno (rota de volta) também correto

### Exemplo B: problema de assimetria
O tráfego “vai por um caminho e volta por outro”.
Pode causar falha intermitente (especialmente com firewalls stateful).

---

## 6. Troubleshooting (roteiro do suporte)
1. Conferir IP/máscara/gateway: `ipconfig /all`
2. Testar gateway: `ping <gateway>`
3. Testar rota:
   - `tracert <destino>` (Windows)
   - `traceroute <destino>` (Linux/macOS)
4. Se parar no gateway → problema após o gateway (rota/firewall)
5. Se nem chega no gateway → problema local (Wi‑Fi/cabo/VLAN)

Windows:
```bash
route print
tracert 10.20.0.10
```

---

## 7. Pegadinhas
- “Não abre site” nem sempre é rota — pode ser DNS.
- Gateway correto não resolve se o firewall bloquear a porta.
- VPN split tunnel pode criar “meio acesso” (alguns sistemas funcionam, outros não).

---

## 8. Referências (PT‑BR)
- Cisco Community BR – roteamento estático x dinâmico: https://community.cisco.com/t5/blogues-de-routing-switching/roteamento-est%C3%A1tico-vs-roteamento-din%C3%A2mico-qual-%C3%A9-o-melhor/ba-p/5051566
- Teleco – roteamento (PT‑BR): https://www.teleco.com.br/tutoriais/tutorialrotas.asp

## 🎥 Vídeos (PT‑BR)

### Roteamento estático e dinâmico

```youtube
NMQCcXG8TAU
```

Link: https://www.youtube.com/watch?v=NMQCcXG8TAU

### Gateway e rota padrão

```youtube
HhJSNEhiqEA
```

Link: https://www.youtube.com/watch?v=HhJSNEhiqEA

