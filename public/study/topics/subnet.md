# Máscara de Sub-rede – Conceito, Cálculo e Exemplos

## 🧠 Mapa mental (visão geral)

![Mapa mental – subnet](/study/images/subnet-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. Por que existe máscara de sub-rede?
A máscara (ou prefixo **/24**, **/26** etc.) define:
- qual parte do IP é **rede**
- qual parte do IP é **host**

Isso permite dividir uma rede grande em redes menores (sub-redes), por exemplo:
- separar setores (TI, Financeiro, Visitantes)
- melhorar organização e segurança
- reduzir broadcast

---

## 2. Conceitos básicos (sem pular etapa)
- **Rede**: “bairro” onde os dispositivos estão.
- **Host**: “casa” (dispositivo) dentro do bairro.
- **Network address**: primeiro endereço da rede (não é usado por host)
- **Broadcast address**: último endereço da rede (mensagem para todos)
- **Gateway**: roteador dentro da rede (normalmente o .1)

---

## 3. Notação /24, /26… (como ler)
O número após a barra é quantos bits são “rede”.

Exemplos:
- **/24** → 24 bits de rede, 8 bits de host (255.255.255.0)
- **/26** → 26 bits rede, 6 bits host (255.255.255.192)
- **/30** → muito comum em links ponto-a-ponto

---

## 4. Quantos hosts cabem? (fórmula)
Hosts = **2^(bits de host) − 2**

Por que “−2”?
- 1 é o endereço de rede
- 1 é o broadcast

Exemplos:
- /24 → 8 bits host → 2^8 − 2 = 256 − 2 = **254**
- /26 → 6 bits host → 64 − 2 = **62**
- /30 → 2 bits host → 4 − 2 = **2**

---

## 5. Visual rápido (para memorizar)
![Subnet visual](/study/images/subnet-visual.svg)

| Prefixo | Máscara | Hosts úteis |
|---|---|---|
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /29 | 255.255.255.248 | 6 |
| /30 | 255.255.255.252 | 2 |

---

## 6. Exemplo completo (muito didático)
Rede: **192.168.10.0/26**

- /26 → máscara 255.255.255.192
- Tamanho do bloco: 64 (porque 256/4 = 64)
Sub-redes:
- 192.168.10.0 – 192.168.10.63
- 192.168.10.64 – 192.168.10.127
- 192.168.10.128 – 192.168.10.191
- 192.168.10.192 – 192.168.10.255

Para a primeira sub-rede:
- Network: 192.168.10.0
- Hosts: 192.168.10.1 até 192.168.10.62
- Broadcast: 192.168.10.63

---

## 7. Como isso aparece no suporte
### Sintoma: “Não enxerga o servidor, mas está na rede”
Causa comum: máscara errada.
- PC com /24 tentando falar com rede que exige /26, ou vice-versa.

Teste:
- conferir IP/máscara/gateway com `ipconfig /all`
- comparar com a regra da rede

---

## 8. Pegadinhas
- /24 não é “padrão universal”; depende do ambiente.
- Máscara errada pode deixar a internet funcionar e a intranet não (ou o contrário).

---

## 9. Referências (PT‑BR)
- NIC.br – materiais de redes: https://www.nic.br
- Apostila Sub-redes (PT‑BR): https://www.teleco.com.br/tutoriais/tutorialsubrede/

---


## 🎥 Vídeos (PT‑BR)

### Subnetting – didático

```youtube
XjYmTzZzGi8
```

Link: https://www.youtube.com/watch?v=XjYmTzZzGi8

### Subnetting – exercícios

```youtube
CKBWCaiZrsw
```

Link: https://www.youtube.com/watch?v=CKBWCaiZrsw

