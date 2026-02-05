# Rede Wireless (Wi‑Fi) – Segurança (WPA2/WPA3), sinal e boas práticas

## 🧠 Mapa mental (visão geral)

![Mapa mental – wireless](/study/images/wireless-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- Diferença prática entre WPA2 e WPA3
- Fatores que derrubam sinal (interferência, canal, distância)
- Boas práticas de instalação (posição, canal, 2.4 vs 5 GHz)
- Como diagnosticar ‘conecta e cai’, ‘lento’, ‘sem internet’

---

## 1) Introdução (do zero)

Wi‑Fi é a rede sem fio mais comum. Ela é prática, mas é sensível a:
- interferência
- distância/barreiras
- saturação do canal
- equipamentos mal posicionados

No suporte, muitos incidentes “da internet” são na verdade **Wi‑Fi ruim**.

## 2) Conceitos fundamentais

### WPA2
Padrão muito comum e ainda aceitável, mas mais antigo.

### WPA3
Mais moderno e seguro, melhora proteção contra ataques de senha (quando suportado).

### 2.4 GHz vs 5 GHz
- **2.4 GHz**: mais alcance, mais interferência, menos velocidade
- **5 GHz**: menos interferência, mais velocidade, menos alcance

### Interferência
Micro-ondas, Bluetooth, paredes, vizinhos no mesmo canal, etc.

---

## 3) Como funciona (passo a passo)

![Diagrama – wireless](/study/images/wireless-bestpractices.svg)

### Boas práticas (passo a passo)
1. Roteador/AP em local alto e central
2. Preferir 5 GHz para desempenho (quando possível)
3. Ajustar canal para reduzir interferência
4. Separar SSIDs (2.4 e 5) se necessário
5. Atualizar firmware e usar senhas fortes

---

## 4) Exemplos reais no Suporte (cenários)

### Wi‑Fi conecta e cai
**Sintoma:** Conecta, depois desconecta ou fica ‘sem internet’.

**O que isso indica:** Interferência, sinal fraco, roaming ruim, AP saturado.

**Como confirmar:**
- Testar perto do roteador
- Testar em 2.4 e 5 GHz
- Ver quantidade de dispositivos conectados

**Como resolver:**
- Reposicionar roteador/AP
- Trocar canal
- Usar repetidor/mesh corretamente
- Reduzir saturação

### Wi‑Fi lento em horários específicos
**Sintoma:** De noite fica lento, de manhã ok.

**O que isso indica:** Canal saturado pelos vizinhos ou banda saturada.

**Como confirmar:**
- Testar cabo (se possível)
- Testar outro canal
- Ver uso de streaming/jogos

**Como resolver:**
- Mudar canal/banda
- Atualizar roteador
- Implementar QoS básico (se houver)


---

## 5) Troubleshooting (checklist profissional)

### Checklist Wi‑Fi
1. Sinal: está forte? (próximo vs longe)
2. Banda: 2.4 ou 5? Qual está melhor?
3. Canal: há muita interferência?
4. Saturação: muitos dispositivos? upload alto?
5. Teste cabo para separar “internet” de “Wi‑Fi”.

## 6) Conexões com outros temas

- UDP/VoIP é sensível a Wi‑Fi ruim (ver **UDP**)
- DHCP pode falhar se o Wi‑Fi estiver instável (ver **DHCP**)
- DNS pode parecer lento por Wi‑Fi ruim (ver **DNS**)

---

## 7) Detalhe técnico (opcional)

**Melhor prática de suporte:**  
- Se for possível, teste com **cabo** para isolar se o problema é Wi‑Fi.  
- Se no cabo fica perfeito → foque em canal, posição, bandas, interferência.

**Segurança:**  
Evitar WEP (inseguro). Preferir WPA2/WPA3. Senhas fracas são um problema real.

---

## 8) O que mais cai em prova (pegadinhas)

- 5 GHz é mais rápido, mas tem menos alcance
- WEP é inseguro (evitar)
- Interferência pode derrubar estabilidade mesmo com ‘internet boa’

## ✅ Checklist final (domínio do tema)

- [ ] Sei explicar WPA2 vs WPA3 em linguagem simples
- [ ] Entendo 2.4 GHz vs 5 GHz e quando usar cada um
- [ ] Sei o que interfere no sinal
- [ ] Consigo aplicar boas práticas de instalação

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
wh8KVt0_LGk
```
### Aula mais completa
```youtube
Bk3cH0HnvAE
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é Wi‑Fi? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-wifi/
- ANATEL (orientações gerais): https://www.gov.br/anatel/pt-br
