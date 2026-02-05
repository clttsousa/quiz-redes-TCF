# Rotas e Gateway – Roteamento correto (estático x dinâmico) para suporte

## 🧠 Mapa mental (visão geral)

![Mapa mental – rotas-gateway](/study/images/rotas-gateway-mindmap.svg)

> Use este mapa para entender o tema como um todo antes de entrar nos detalhes.

## ✅ O que você vai aprender

- O que é gateway padrão e por que ele é vital
- Diferença entre rota estática e dinâmica (sem complicar)
- Como um roteador decide para onde enviar pacotes
- Diagnóstico de ‘não alcança outra rede’ (tracert, gateway, rota)

---

## 1) Introdução (do zero)

Gateway padrão é o “próximo salto” que o dispositivo usa para falar com **outras redes**.
Sem gateway, o PC só conversa com quem está na **mesma sub-rede**.

No suporte, muitos casos de “tenho IP, mas não acesso X” são gateway/rota.

## 2) Conceitos fundamentais

### Gateway padrão
Endereço do roteador na sua rede. É para onde vão pacotes destinados fora da sub-rede.

### Rota
Regra dizendo: para alcançar a rede X, envie para o próximo salto Y.

### Rota estática
Configurada manualmente. Simples e previsível.

### Rota dinâmica
Aprendida via protocolo (ex.: OSPF, BGP) – mais comum em redes grandes.

---

## 3) Como funciona (passo a passo)

![Diagrama – rotas-gateway](/study/images/routing-gateway.svg)

### Como o roteamento decide (visão simples)
1. Verifica se o destino está na mesma rede (IP+máscara)
2. Se estiver: envia direto
3. Se não estiver: envia ao **gateway**
4. O roteador consulta tabela de rotas e encaminha para o próximo salto

Por isso máscara e gateway corretos são essenciais.

---

## 4) Exemplos reais no Suporte (cenários)

### Acessa internet, mas não acessa rede da empresa (VPN)
**Sintoma:** Sites abrem, mas servidor interno não.

**O que isso indica:** Rota para rede interna não existe ou VPN não empurrou rotas.

**Como confirmar:**
- Verificar status da VPN
- tracert para IP interno
- Ver rotas (se aplicável)

**Como resolver:**
- Reconectar VPN
- Ajustar perfil da VPN para enviar rotas
- Validar gateway e DNS interno

### Tem IP e DNS ok, mas não alcança outra sub-rede
**Sintoma:** A rede local funciona, mas outra rede interna não responde.

**O que isso indica:** Falta de rota no roteador ou gateway errado.

**Como confirmar:**
- Ping gateway
- tracert destino
- Checar tabela de rotas no roteador (se possível)

**Como resolver:**
- Adicionar rota estática correta
- Corrigir gateway entregue via DHCP
- Ajustar VLAN/roteamento entre redes


---

## 5) Troubleshooting (checklist profissional)

### Checklist de rotas/gateway
1. O cliente tem gateway padrão?
2. O gateway responde?
3. O destino está na mesma sub-rede?
4. Se não, o caminho (tracert) morre onde?
5. Há firewall bloqueando?

### Comandos úteis (Windows)
```bash
ipconfig /all
ping <gateway>
tracert <destino>
```

## 6) Conexões com outros temas

- Gateway vem do DHCP (ver **DHCP**)
- Máscara define se vai direto ou via gateway (ver **Sub-rede**)
- NAT/CGNAT afeta tráfego de saída (ver **NAT/CGNAT**)

---

## 7) Detalhe técnico (opcional)

**Tracert/Traceroute** mostra o caminho (saltos) até o destino.
- Se para no primeiro salto → problema no gateway local
- Se sai do gateway mas não chega → problema de rota/ISP/firewall

Em ambientes corporativos, rotas estáticas são comuns para redes específicas (VPN, filiais).

---

## 8) O que mais cai em prova (pegadinhas)

- Sem gateway você não sai da sub-rede
- Rota estática é manual; dinâmica depende de protocolo
- Máscara errada pode fazer o PC ‘achar’ que o destino é local

## ✅ Checklist final (domínio do tema)

- [ ] Sei explicar o que é gateway padrão
- [ ] Entendo diferença entre rota estática e dinâmica
- [ ] Consigo usar tracert para diagnosticar o caminho
- [ ] Sei reconhecer quando o destino está fora da sub-rede

## 🎥 Vídeos (PT-BR)
### Vídeo rápido
```youtube
NMQCcXG8TAU
```
### Aula mais completa
```youtube
HhJSNEhiqEA
```

## 📚 Leituras e referências (PT-BR)

- Cloudflare – O que é roteamento? (PT-BR): https://www.cloudflare.com/pt-br/learning/network-layer/what-is-routing/
- Wikipedia PT – Roteamento: https://pt.wikipedia.org/wiki/Roteamento
