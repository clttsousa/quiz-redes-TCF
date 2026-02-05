# NAT – Network Address Translation (Static, Dynamic, Masquerade/PAT)

## 🧠 Mapa mental (visão geral)

![Mapa mental – nat](/study/images/nat-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. O que é NAT (em português simples)
**NAT** é uma técnica usada em roteadores/firewalls para **traduzir** um endereço IP para outro.
Na prática, é como “re-etiquetar” o remetente/destinatário para permitir que muitos dispositivos privados acessem a internet usando poucos IPs públicos.

Por que isso é importante no suporte?
- Quase toda rede doméstica/empresa usa NAT.
- Muitos problemas de acesso externo (porta, servidor, câmera) envolvem NAT.

---

## 2. Por que o NAT existe?
O IPv4 tem poucos endereços disponíveis. Para “caber” todo mundo na internet:
- Redes internas usam **IP privado**
- A borda usa **IP público**
- NAT faz a tradução entre eles

---

## 3. Tipos de NAT (o que prova costuma cobrar)
![NAT básico](/study/images/nat-basico.svg)

### 3.1 Static NAT (1:1)
Um IP privado sempre vira o mesmo IP público.
- Uso: publicar servidor interno com IP público fixo (menos comum hoje).

### 3.2 Dynamic NAT (pool)
Vários IPs públicos disponíveis, atribuídos dinamicamente.
- Uso: empresas com bloco pequeno de públicos.

### 3.3 Masquerade / PAT (muitos:1)
Também chamado de **NAT Overload**.
Vários IPs privados compartilham **um IP público**, diferenciando conexões por **porta**.
- É o padrão em roteadores domésticos.

📌 Termo-chave: PAT = Port Address Translation.

---

## 4. NAT no dia a dia (exemplo real)
Rede interna:
- PC: 192.168.1.10
- Roteador LAN: 192.168.1.1
- IP público no roteador: 200.200.200.10

Quando o PC acessa um site:
- Origem interna: 192.168.1.10:52344
- NAT/PAT traduz para: 200.200.200.10:40001
- O retorno vem para 200.200.200.10:40001, e o roteador “desfaz” o NAT e entrega ao PC.

---

## 5. NAT e publicação de serviços (port forwarding)
Se você precisa acessar algo de fora (câmera, servidor, RDP), usa:
- **Port Forwarding**: encaminha porta do IP público para IP privado

Exemplo:
- 200.200.200.10:3389 → 192.168.1.50:3389

⚠️ No suporte, atenção a:
- IP do servidor precisa ser fixo (ou reserva DHCP)
- firewall local e do roteador
- CGNAT (pode impedir acesso externo)

---

## 6. Problemas comuns no suporte
### “Internet funciona, mas não consigo acessar de fora”
- Possível CGNAT
- Port forwarding errado
- IP interno mudou
- Porta bloqueada pelo provedor/firewall

### “Alguns serviços não funcionam (jogos, VoIP)”
- NAT restritivo
- UPnP desativado (depende do cenário)
- Double NAT (dois roteadores fazendo NAT)

---

## 7. Troubleshooting (passo a passo)
1. Confirmar IP WAN do roteador (é público mesmo?)
2. Verificar se há **double NAT** (modem+roteador)
3. Testar porta externamente
4. Verificar firewall e regras
5. Checar se o serviço está escutando na porta correta (no servidor interno)

---

## 8. Referências (PT‑BR)
- Cloudflare – O que é NAT? (PT‑BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-nat/
- Guia prático sobre NAT e portas (PT‑BR): https://www.vivaolinux.com.br/dica/NAT-e-masquerade-no-Linux

---


## 🎥 Vídeos (PT‑BR)

### NAT/PAT – explicado

```youtube
7M_eGJEzCvc
```

Link: https://www.youtube.com/watch?v=7M_eGJEzCvc

### Port Forwarding – na prática

```youtube
UyhHnZYiLdw
```

Link: https://www.youtube.com/watch?v=UyhHnZYiLdw

