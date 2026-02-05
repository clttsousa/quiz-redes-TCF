# Rede Wireless – Segurança, Sinal e Boas Práticas

## 🧠 Mapa mental (visão geral)

![Mapa mental – wireless](/study/images/wireless-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.


## 1. O que é Wi‑Fi (e por que dá tanto problema)
Wi‑Fi é rede sem fio baseada em rádio.  
Como é rádio, sofre interferência e variações (paredes, distância, outros roteadores).

No suporte, os sintomas mais comuns:
- “Conecta, mas cai”
- “Conecta, mas fica lento”
- “Sinal cheio, mas não abre”
- “Funciona perto do roteador e longe não”

---

## 2. Segurança: WPA2 x WPA3 (o que você precisa saber)
### WPA2
- Ainda muito comum
- Usa AES (ideal) – evite TKIP
- Senha fraca = risco

### WPA3
- Mais moderno, proteção melhor contra ataques de senha
- Nem todos dispositivos antigos suportam

📌 Boas práticas:
- Preferir **WPA2-AES** ou **WPA3**
- Senha forte
- Desabilitar WPS se não for necessário
- Separar rede de visitantes

---

## 3. O que interfere no sinal (explicação bem prática)
- **Distância**: quanto mais longe, pior
- **Obstáculos**: parede, laje, vidro refletivo
- **Interferência**: micro-ondas, Bluetooth, redes vizinhas
- **Canal**: muitos APs no mesmo canal = disputa
- **Banda**:
  - **2.4 GHz**: maior alcance, mais interferência, menor velocidade
  - **5 GHz**: menor alcance, menos interferência, maior velocidade
  - **6 GHz (Wi‑Fi 6E)**: ainda melhor (quando disponível)

---

## 4. Boas práticas de instalação (padrão suporte)
- AP no alto, centralizado, longe de obstáculos
- Evitar perto de espelhos grandes e eletrodomésticos
- Preferir 5 GHz para dispositivos próximos
- Ajustar canal automaticamente ou escolher canais menos congestionados
- Em empresa: planejar roaming e potência

---

## 5. Diagnóstico rápido (roteiro do suporte)
1. O problema é **sinal** ou **internet**?
   - Se sinal baixo: é RF/posicionamento
   - Se sinal bom mas não navega: DHCP/DNS/gateway
2. Teste perto do AP (se melhora, é sinal)
3. Verifique banda e canal
4. Verifique segurança (WPA2/WPA3 compatibilidade)
5. Verifique quantidade de dispositivos e saturação

---

## 6. Erros comuns
- AP escondido atrás de TV/armário
- Repetidor mal posicionado (tem que “pegar sinal bom” do roteador)
- Canal lotado
- Mesh mal configurado
- Misturar WPA3-only com dispositivos antigos

---

## 7. Referências (PT‑BR)
- Cloudflare – O que é Wi‑Fi? (PT‑BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-wifi/
- TP-Link – dicas de sinal (PT‑BR): https://www.tp-link.com/br/support/faq/
- NIC.br – segurança e boas práticas: https://www.nic.br

---


## 🎥 Vídeos (PT‑BR)

### Wi‑Fi – sinais e canais

```youtube
wh8KVt0_LGk
```

Link: https://www.youtube.com/watch?v=wh8KVt0_LGk

### WPA2/WPA3 – segurança

```youtube
Bk3cH0HnvAE
```

Link: https://www.youtube.com/watch?v=Bk3cH0HnvAE

