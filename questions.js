window.QUESTION_BANK = [
  {
    "id": "net-001",
    "category": "Conceitos",
    "difficulty": "easy",
    "q": "O que é uma rede de computadores?",
    "choices": [
      "Um conjunto de dispositivos interligados para compartilhar dados e recursos",
      "Um único computador com internet",
      "Apenas um serviço de e-mail",
      "Um programa de antivírus"
    ],
    "answer": 0,
    "explain": "Rede é a interconexão de dispositivos (hosts) para comunicação e compartilhamento de recursos."
  },
  {
    "id": "net-002",
    "category": "Tipos de Rede",
    "difficulty": "easy",
    "q": "Qual tipo de rede normalmente cobre uma residência ou escritório pequeno?",
    "choices": [
      "WAN",
      "LAN",
      "MAN",
      "PAN (cidade inteira)"
    ],
    "answer": 1,
    "explain": "LAN (Local Area Network) cobre áreas pequenas como casa, laboratório, escritório ou prédio."
  },
  {
    "id": "net-003",
    "category": "Tipos de Rede",
    "difficulty": "easy",
    "q": "WAN é mais associada a qual cenário?",
    "choices": [
      "Rede dentro de um único prédio",
      "Rede dentro de um campus",
      "Rede que conecta cidades/países",
      "Rede entre dois computadores por cabo curto"
    ],
    "answer": 2,
    "explain": "WAN (Wide Area Network) conecta redes em grandes distâncias (cidades, estados, países)."
  },
  {
    "id": "net-004",
    "category": "Tipos de Rede",
    "difficulty": "medium",
    "q": "MAN geralmente representa uma rede que cobre:",
    "choices": [
      "Um único cômodo",
      "Uma cidade/metrópole",
      "Somente um país",
      "Apenas um roteador"
    ],
    "answer": 1,
    "explain": "MAN (Metropolitan Area Network) costuma abranger uma área metropolitana (cidade)."
  },
  {
    "id": "topo-001",
    "category": "Topologias",
    "difficulty": "easy",
    "q": "Na topologia em estrela, os dispositivos se conectam principalmente a:",
    "choices": [
      "Um cabo único compartilhado",
      "Um equipamento central (ex: switch)",
      "Em círculo (um após o outro)",
      "Todos com todos"
    ],
    "answer": 1,
    "explain": "Na estrela, os hosts se ligam a um ponto central, como um switch."
  },
  {
    "id": "topo-002",
    "category": "Topologias",
    "difficulty": "medium",
    "q": "Uma desvantagem clássica da topologia em barramento é:",
    "choices": [
      "Exige um equipamento central caro",
      "Colisão e falha no cabo principal derrubam o segmento",
      "Não permite aumentar a rede",
      "Só funciona com fibra óptica"
    ],
    "answer": 1,
    "explain": "No barramento, todos compartilham o meio; colisões eram comuns e um rompimento no cabo pode afetar o segmento."
  },
  {
    "id": "topo-003",
    "category": "Topologias",
    "difficulty": "medium",
    "q": "Na topologia em anel, a comunicação costuma seguir:",
    "choices": [
      "Um cabo central",
      "Uma sequência circular de nós",
      "Uma malha total",
      "Somente por Wi‑Fi"
    ],
    "answer": 1,
    "explain": "No anel, os nós formam um circuito. Em variantes clássicas, dados passam de nó a nó em círculo."
  },
  {
    "id": "topo-004",
    "category": "Topologias",
    "difficulty": "hard",
    "q": "Qual topologia tende a oferecer maior redundância, porém com maior custo de cabos/links?",
    "choices": [
      "Barramento",
      "Estrela simples",
      "Mesh (malha)",
      "Anel simples"
    ],
    "answer": 2,
    "explain": "Mesh possui múltiplos caminhos; se um link falha, outro pode manter a comunicação, mas custa mais."
  },
  {
    "id": "eqp-001",
    "category": "Equipamentos",
    "difficulty": "easy",
    "q": "Qual equipamento opera principalmente na comutação de quadros Ethernet dentro de uma LAN?",
    "choices": [
      "Switch",
      "Modem",
      "ONU",
      "Servidor DNS"
    ],
    "answer": 0,
    "explain": "Switch encaminha quadros por MAC dentro da LAN (camada de enlace)."
  },
  {
    "id": "eqp-002",
    "category": "Equipamentos",
    "difficulty": "easy",
    "q": "Qual equipamento é responsável por encaminhar pacotes entre redes diferentes (roteamento)?",
    "choices": [
      "Switch",
      "Roteador",
      "Patch panel",
      "Repetidor passivo"
    ],
    "answer": 1,
    "explain": "Roteador conecta redes e encaminha pacotes IP entre elas (camada de rede)."
  },
  {
    "id": "eqp-003",
    "category": "Equipamentos",
    "difficulty": "medium",
    "q": "Em FTTH/GPON, a ONU (ou ONT) na casa do cliente serve para:",
    "choices": [
      "Traduzir nomes de domínio",
      "Terminar a fibra e converter o sinal óptico para interfaces do cliente (Ethernet/Wi‑Fi)",
      "Aumentar a potência elétrica da rede",
      "Fazer NAT em todos os casos"
    ],
    "answer": 1,
    "explain": "ONU/ONT finaliza a conexão óptica e disponibiliza Ethernet/Wi‑Fi para os dispositivos do cliente."
  },
  {
    "id": "eqp-004",
    "category": "Equipamentos",
    "difficulty": "medium",
    "q": "Um modem (em contexto de acesso) tem como função típica:",
    "choices": [
      "Comutar quadros na LAN",
      "Modular/demodular sinais para um meio de acesso (ex: cabo/DSL)",
      "Fazer roteamento BGP",
      "Substituir um servidor DHCP"
    ],
    "answer": 1,
    "explain": "Modem faz modulação/demodulação para acesso (dependendo da tecnologia: cabo, DSL etc.)."
  },
  {
    "id": "tcpip-001",
    "category": "TCP/IP",
    "difficulty": "easy",
    "q": "Qual é a ordem correta das camadas do modelo TCP/IP (do topo para baixo)?",
    "choices": [
      "Aplicação → Transporte → Internet → Acesso à Rede",
      "Aplicação → Sessão → Transporte → Internet",
      "Física → Enlace → Rede → Transporte",
      "Apresentação → Aplicação → Transporte → Internet"
    ],
    "answer": 0,
    "explain": "No TCP/IP: Aplicação, Transporte, Internet e Acesso à Rede."
  },
  {
    "id": "tcpip-002",
    "category": "TCP/IP",
    "difficulty": "medium",
    "q": "No TCP/IP, a camada 'Internet' é mais comparável a qual camada do OSI?",
    "choices": [
      "Aplicação",
      "Transporte",
      "Rede",
      "Enlace"
    ],
    "answer": 2,
    "explain": "A camada Internet do TCP/IP corresponde principalmente à Camada de Rede do OSI."
  },
  {
    "id": "tcpip-003",
    "category": "OSI vs TCP/IP",
    "difficulty": "medium",
    "q": "O modelo OSI possui quantas camadas?",
    "choices": [
      "4",
      "5",
      "7",
      "8"
    ],
    "answer": 2,
    "explain": "O OSI é composto por 7 camadas: Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação."
  },
  {
    "id": "tcpip-004",
    "category": "TCP/IP",
    "difficulty": "hard",
    "q": "Qual conjunto representa melhor camadas que o TCP/IP 'agrupa' em 'Aplicação' quando comparado ao OSI?",
    "choices": [
      "Física + Enlace",
      "Rede + Transporte",
      "Sessão + Apresentação + Aplicação",
      "Enlace + Rede"
    ],
    "answer": 2,
    "explain": "O TCP/IP costuma agrupar Sessão, Apresentação e Aplicação (do OSI) na camada de Aplicação."
  },
  {
    "id": "tcpip-005",
    "category": "TCP/IP",
    "difficulty": "easy",
    "q": "A função principal da camada de Transporte é:",
    "choices": [
      "Resolver nomes DNS",
      "Endereçar MAC",
      "Comunicação fim a fim entre processos, controle de entrega (TCP/UDP)",
      "Roteamento entre ASNs"
    ],
    "answer": 2,
    "explain": "Transporte fornece comunicação fim a fim entre aplicações (portas), usando TCP/UDP."
  },
  {
    "id": "tcpip-006",
    "category": "TCP/IP",
    "difficulty": "easy",
    "q": "Na camada de Acesso à Rede (TCP/IP) ficam tecnologias como:",
    "choices": [
      "HTTP e DNS",
      "TCP e UDP",
      "IP e ICMP",
      "Ethernet e Wi‑Fi"
    ],
    "answer": 3,
    "explain": "Acesso à Rede cobre o enlace/física: Ethernet, Wi‑Fi, PPP, etc."
  },
  {
    "id": "udp-001",
    "category": "UDP/TCP",
    "difficulty": "easy",
    "q": "UDP é considerado:",
    "choices": [
      "Orientado à conexão e com retransmissão garantida",
      "Não orientado à conexão e sem garantia de entrega",
      "Criptografado por padrão",
      "Um protocolo de roteamento"
    ],
    "answer": 1,
    "explain": "UDP é connectionless e não garante entrega/ordem; pode ser mais rápido e simples."
  },
  {
    "id": "udp-002",
    "category": "UDP/TCP",
    "difficulty": "medium",
    "q": "Uma diferença típica entre TCP e UDP é:",
    "choices": [
      "TCP não usa portas",
      "UDP faz controle de congestionamento completo",
      "TCP oferece entrega confiável e ordenada; UDP não garante",
      "UDP sempre é mais seguro que TCP"
    ],
    "answer": 2,
    "explain": "TCP fornece confiabilidade/ordem/retransmissão; UDP é mais simples e não garante."
  },
  {
    "id": "udp-003",
    "category": "UDP/TCP",
    "difficulty": "medium",
    "q": "Quando faz sentido preferir UDP?",
    "choices": [
      "Quando a aplicação tolera perdas e quer baixa latência (ex: voz ao vivo)",
      "Quando precisa de garantia absoluta de entrega",
      "Quando quer evitar qualquer retransmissão",
      "Quando o firewall bloqueia TCP"
    ],
    "answer": 0,
    "explain": "Apps de baixa latência e tolerantes a perda (VoIP, streaming ao vivo) costumam usar UDP."
  },
  {
    "id": "udp-004",
    "category": "UDP/TCP",
    "difficulty": "easy",
    "q": "Qual destes é um exemplo comum de uso de UDP?",
    "choices": [
      "SMTP",
      "DNS (consultas comuns)",
      "SSH",
      "IMAP"
    ],
    "answer": 1,
    "explain": "DNS usa UDP em muitas consultas (TCP pode ser usado em casos específicos, como respostas grandes/transferência de zona)."
  },
  {
    "id": "nat-001",
    "category": "NAT",
    "difficulty": "easy",
    "q": "O que é NAT?",
    "choices": [
      "Um método de criptografia de pacotes",
      "Tradução de endereços IP (e frequentemente portas) entre redes",
      "Um tipo de Wi‑Fi",
      "Um protocolo de roteamento dinâmico"
    ],
    "answer": 1,
    "explain": "NAT traduz endereços IP (e muitas vezes portas) para permitir comunicação entre IPs privados e a Internet."
  },
  {
    "id": "nat-002",
    "category": "NAT",
    "difficulty": "medium",
    "q": "Qual tipo de NAT mantém um mapeamento fixo 1:1 entre IP privado e IP público?",
    "choices": [
      "Dynamic NAT",
      "Static NAT",
      "Masquerade/PAT",
      "CGNAT"
    ],
    "answer": 1,
    "explain": "Static NAT faz mapeamento estático (fixo), geralmente 1:1."
  },
  {
    "id": "nat-003",
    "category": "NAT",
    "difficulty": "medium",
    "q": "Masquerade/PAT normalmente significa:",
    "choices": [
      "Sem tradução de portas",
      "Tradução de muitos IPs privados para um IP público usando portas diferentes",
      "Apenas traduz MAC",
      "Apenas traduz DNS"
    ],
    "answer": 1,
    "explain": "PAT (Port Address Translation) permite vários hosts compartilharem 1 IP público usando diferentes portas."
  },
  {
    "id": "nat-004",
    "category": "IP Público x Privado",
    "difficulty": "easy",
    "q": "Qual faixa é privada (RFC1918) no IPv4?",
    "choices": [
      "8.8.8.0/24",
      "172.16.0.0/12",
      "1.1.1.0/24",
      "200.100.0.0/16"
    ],
    "answer": 1,
    "explain": "Faixas privadas incluem 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16."
  },
  {
    "id": "nat-005",
    "category": "IP Público x Privado",
    "difficulty": "medium",
    "q": "Por que provedores usam CGNAT?",
    "choices": [
      "Para aumentar a velocidade do Wi‑Fi",
      "Para economizar endereços IPv4 públicos, compartilhando um IP público por muitos clientes",
      "Para substituir DNS",
      "Para evitar roteamento"
    ],
    "answer": 1,
    "explain": "CGNAT reduz consumo de IPv4 públicos ao compartilhar IP público entre muitos assinantes (com tradução de portas)."
  },
  {
    "id": "nat-006",
    "category": "IP Público x Privado",
    "difficulty": "hard",
    "q": "Um impacto comum do CGNAT para o usuário é:",
    "choices": [
      "Impossibilidade total de usar internet",
      "Dificuldade em hospedar serviços/abrir portas (port forwarding) diretamente",
      "Obrigatoriedade de usar IPv6",
      "Aumento automático de segurança WPA3"
    ],
    "answer": 1,
    "explain": "Com CGNAT, o cliente não tem IP público exclusivo; abrir portas para acesso externo pode ser limitado."
  },
  {
    "id": "dhcp-001",
    "category": "DHCP",
    "difficulty": "easy",
    "q": "Qual é a função principal do DHCP?",
    "choices": [
      "Criptografar tráfego",
      "Atribuir IP e parâmetros de rede automaticamente aos clientes",
      "Trocar rotas entre roteadores",
      "Substituir o NAT"
    ],
    "answer": 1,
    "explain": "DHCP automatiza configuração: IP, máscara, gateway, DNS etc."
  },
  {
    "id": "dhcp-002",
    "category": "DHCP",
    "difficulty": "medium",
    "q": "Qual a sequência clássica do processo DHCP (DORA)?",
    "choices": [
      "Discover → Offer → Request → Acknowledge",
      "Request → Offer → Discover → Ack",
      "Offer → Discover → Ack → Request",
      "Ack → Offer → Request → Discover"
    ],
    "answer": 0,
    "explain": "DORA: Discover, Offer, Request, Acknowledge."
  },
  {
    "id": "dhcp-003",
    "category": "DHCP",
    "difficulty": "medium",
    "q": "Qual item NÃO é um benefício típico do DHCP?",
    "choices": [
      "Reduz configuração manual",
      "Ajuda a evitar erros de IP duplicado",
      "Pode distribuir DNS e gateway",
      "Garante criptografia de ponta a ponta"
    ],
    "answer": 3,
    "explain": "DHCP não criptografa tráfego; ele apenas distribui configurações."
  },
  {
    "id": "dhcp-004",
    "category": "DHCP",
    "difficulty": "hard",
    "q": "Um risco em redes sem controles (ex: sem DHCP Snooping) é:",
    "choices": [
      "Um cliente não conseguir usar Wi‑Fi",
      "Ataque de DHCP rogue (servidor falso) distribuindo gateway/DNS malicioso",
      "Aumento de throughput",
      "Redução de latência por padrão"
    ],
    "answer": 1,
    "explain": "DHCP rogue pode entregar configurações falsas e redirecionar tráfego (ex: DNS malicioso)."
  },
  {
    "id": "dns-001",
    "category": "DNS",
    "difficulty": "easy",
    "q": "Qual é a função do DNS?",
    "choices": [
      "Converter nomes de domínio em endereços IP (e outros registros)",
      "Criptografar pacotes IP",
      "Substituir DHCP",
      "Roteamento entre redes"
    ],
    "answer": 0,
    "explain": "DNS resolve nomes (ex: www.site.com) para IP e fornece outros registros (MX, TXT, etc.)."
  },
  {
    "id": "dns-002",
    "category": "DNS",
    "difficulty": "medium",
    "q": "Um servidor DNS recursivo faz o quê?",
    "choices": [
      "Apenas responde por uma zona que ele é autoridade",
      "Consulta outros servidores em nome do cliente até obter a resposta",
      "Somente traduz endereços privados",
      "Somente funciona com TCP"
    ],
    "answer": 1,
    "explain": "Recursivo resolve o nome consultando a hierarquia DNS (root, TLD, autoritativo) em nome do cliente."
  },
  {
    "id": "dns-003",
    "category": "DNS",
    "difficulty": "medium",
    "q": "Um servidor DNS autoritativo é aquele que:",
    "choices": [
      "Sempre consulta a internet inteira",
      "Tem a resposta oficial para uma zona/domínio configurado",
      "Somente roda em roteadores",
      "Sempre usa UDP 443"
    ],
    "answer": 1,
    "explain": "Autoritativo possui os registros oficiais de uma zona e responde por ela."
  },
  {
    "id": "dns-004",
    "category": "DNS",
    "difficulty": "hard",
    "q": "Qual afirmação é mais correta sobre DNS e UDP/TCP?",
    "choices": [
      "DNS nunca usa TCP",
      "DNS usa UDP na maioria das consultas; TCP pode ser usado para respostas grandes e transferências de zona",
      "DNS sempre usa TCP por segurança",
      "DNS só funciona com HTTPS"
    ],
    "answer": 1,
    "explain": "DNS geralmente usa UDP 53; TCP 53 aparece em casos como respostas grandes e zone transfer."
  },
  {
    "id": "sub-001",
    "category": "Sub-rede",
    "difficulty": "easy",
    "q": "A máscara de sub-rede serve para:",
    "choices": [
      "Definir quais bits do IP representam rede e host",
      "Aumentar a potência do sinal Wi‑Fi",
      "Trocar pacotes UDP por TCP",
      "Criar um nome DNS"
    ],
    "answer": 0,
    "explain": "Máscara indica a parte de rede e a parte de host em um endereço IP."
  },
  {
    "id": "sub-002",
    "category": "Sub-rede",
    "difficulty": "medium",
    "q": "Em uma rede /24 (255.255.255.0), quantos hosts úteis existem?",
    "choices": [
      "254",
      "256",
      "128",
      "1022"
    ],
    "answer": 0,
    "explain": "/24 possui 256 endereços; menos rede e broadcast: 256−2 = 254 hosts úteis."
  },
  {
    "id": "sub-003",
    "category": "Sub-rede",
    "difficulty": "medium",
    "q": "Em uma rede /30, quantos hosts úteis existem?",
    "choices": [
      "2",
      "6",
      "14",
      "30"
    ],
    "answer": 0,
    "explain": "/30 tem 4 endereços; 2 úteis (ideal para links ponto-a-ponto)."
  },
  {
    "id": "sub-004",
    "category": "Sub-rede",
    "difficulty": "hard",
    "q": "Qual é o total de endereços em uma sub-rede /26?",
    "choices": [
      "64",
      "32",
      "128",
      "62"
    ],
    "answer": 0,
    "explain": "/26 deixa 6 bits para hosts → 2^6 = 64 endereços (62 úteis)."
  },
  {
    "id": "sub-005",
    "category": "Sub-rede",
    "difficulty": "hard",
    "q": "Qual máscara corresponde a /27?",
    "choices": [
      "255.255.255.224",
      "255.255.255.192",
      "255.255.255.240",
      "255.255.255.0"
    ],
    "answer": 0,
    "explain": "/27: 24 bits completos + 3 bits no último octeto → 11100000 = 224."
  },
  {
    "id": "wifi-001",
    "category": "Wireless",
    "difficulty": "easy",
    "q": "WPA2 e WPA3 são relacionados a:",
    "choices": [
      "Endereçamento IP",
      "Segurança/autenticação e criptografia no Wi‑Fi",
      "Topologias de rede cabeada",
      "Protocolo de roteamento"
    ],
    "answer": 1,
    "explain": "WPA2/WPA3 são padrões de segurança para redes Wi‑Fi (autenticação/criptografia)."
  },
  {
    "id": "wifi-002",
    "category": "Wireless",
    "difficulty": "medium",
    "q": "Qual fator pode interferir no sinal Wi‑Fi?",
    "choices": [
      "Paredes grossas e estruturas metálicas",
      "DNS recursivo",
      "Máscara /24",
      "NAT estático"
    ],
    "answer": 0,
    "explain": "Obstáculos físicos, interferência, distância e canal ocupados afetam o Wi‑Fi."
  },
  {
    "id": "wifi-003",
    "category": "Wireless",
    "difficulty": "medium",
    "q": "Uma boa prática de instalação de roteador/AP é:",
    "choices": [
      "Colocar dentro de armário metálico",
      "Instalar em local alto e central, longe de fontes de interferência",
      "Fixar atrás de geladeira",
      "Usar sempre canal mais alto possível sem medir"
    ],
    "answer": 1,
    "explain": "Posicionamento central e alto melhora cobertura; evitar interferências (micro-ondas, paredes metálicas, etc.)."
  },
  {
    "id": "wifi-004",
    "category": "Wireless",
    "difficulty": "hard",
    "q": "Em geral, a banda 5 GHz comparada à 2,4 GHz tende a:",
    "choices": [
      "Ter maior alcance e melhor atravessar paredes",
      "Ter menos canais e mais interferência",
      "Ter maior taxa e menos interferência, porém menor alcance/penetração",
      "Não suportar WPA2"
    ],
    "answer": 2,
    "explain": "5 GHz costuma ter mais capacidade e menos interferência, mas menor alcance e penetração em obstáculos."
  },
  {
    "id": "route-001",
    "category": "Roteamento",
    "difficulty": "easy",
    "q": "O gateway padrão em uma rede local normalmente é:",
    "choices": [
      "O switch",
      "O roteador que encaminha tráfego para outras redes/Internet",
      "O servidor DHCP",
      "O servidor DNS autoritativo"
    ],
    "answer": 1,
    "explain": "Gateway padrão é o roteador usado quando o destino não está na rede local."
  },
  {
    "id": "route-002",
    "category": "Roteamento",
    "difficulty": "medium",
    "q": "Rotas estáticas são:",
    "choices": [
      "Aprendidas automaticamente por protocolo dinâmico",
      "Configuradas manualmente e não mudam a menos que alguém altere",
      "Somente usadas em Wi‑Fi",
      "Exclusivas de IPv6"
    ],
    "answer": 1,
    "explain": "Rotas estáticas são inseridas manualmente (fixas), úteis em cenários simples/controle."
  },
  {
    "id": "route-003",
    "category": "Roteamento",
    "difficulty": "medium",
    "q": "Uma vantagem de roteamento dinâmico é:",
    "choices": [
      "Exige zero CPU",
      "Atualiza rotas automaticamente conforme mudanças na rede",
      "Não precisa de endereços IP",
      "Não funciona em redes grandes"
    ],
    "answer": 1,
    "explain": "Protocolos dinâmicos adaptam-se a falhas/mudanças, reduzindo esforço manual."
  },
  {
    "id": "route-004",
    "category": "Roteamento",
    "difficulty": "hard",
    "q": "Por que o roteamento correto é importante?",
    "choices": [
      "Para aumentar a potência do modem",
      "Para garantir que pacotes sigam caminhos válidos, evitando loops e indisponibilidade",
      "Para impedir uso de DHCP",
      "Para substituir NAT"
    ],
    "answer": 1,
    "explain": "Rotas corretas evitam loops, buracos negros e garantem conectividade fim a fim."
  },
  {
    "id": "mix-001",
    "category": "Conceitos",
    "difficulty": "medium",
    "q": "Em uma LAN com switch, por que colisões são raras (comparado a hubs)?",
    "choices": [
      "Switch cria domínios de colisão separados por porta e pode operar full-duplex",
      "Switch aumenta o MTU",
      "Switch impede uso de IP privado",
      "Switch converte UDP em TCP"
    ],
    "answer": 0,
    "explain": "Cada porta do switch é um domínio de colisão; com full-duplex, colisões praticamente não ocorrem."
  },
  {
    "id": "mix-002",
    "category": "TCP/IP",
    "difficulty": "medium",
    "q": "Qual camada (TCP/IP) é responsável por endereçamento IP e roteamento básico?",
    "choices": [
      "Aplicação",
      "Transporte",
      "Internet",
      "Acesso à Rede"
    ],
    "answer": 2,
    "explain": "A camada Internet lida com IP e encaminhamento (roteamento) entre redes."
  },
  {
    "id": "mix-003",
    "category": "Equipamentos",
    "difficulty": "hard",
    "q": "Qual afirmação sobre switch e roteador é mais correta?",
    "choices": [
      "Switch opera com IP e roteia entre redes; roteador opera com MAC na LAN",
      "Switch encaminha quadros por MAC na LAN; roteador encaminha pacotes por IP entre redes",
      "Ambos fazem a mesma coisa",
      "Roteador só funciona com fibra"
    ],
    "answer": 1,
    "explain": "Switch: camada 2 (MAC); Roteador: camada 3 (IP), conectando redes."
  },
  {
    "id": "mix-004",
    "category": "DNS",
    "difficulty": "medium",
    "q": "A resolução de nomes geralmente começa em um cliente consultando:",
    "choices": [
      "Somente o servidor autoritativo final",
      "Um servidor DNS recursivo configurado (ex: do provedor/roteador)",
      "Um roteador BGP",
      "Um servidor DHCP"
    ],
    "answer": 1,
    "explain": "O cliente normalmente pergunta ao resolver recursivo configurado; ele busca a resposta na hierarquia DNS."
  },
  {
    "id": "mix-005",
    "category": "NAT",
    "difficulty": "hard",
    "q": "Qual cenário é um exemplo de Dynamic NAT (em sentido clássico)?",
    "choices": [
      "Mapeamento fixo 1:1 permanente",
      "Vários IPs privados compartilhando 1 IP público via portas (PAT)",
      "IP privado recebe um IP público temporário de um pool quando precisa sair",
      "Sem tradução nenhuma"
    ],
    "answer": 2,
    "explain": "Dynamic NAT usa um pool de IPs públicos e aloca temporariamente para hosts internos."
  },
  {
    "id": "mix-006",
    "category": "DHCP",
    "difficulty": "easy",
    "q": "Além do IP, o DHCP frequentemente fornece:",
    "choices": [
      "MAC do switch",
      "Gateway padrão e DNS",
      "Senha do Wi‑Fi",
      "Tabela de rotas BGP"
    ],
    "answer": 1,
    "explain": "Opções comuns: máscara, gateway, DNS, domínio, tempo de lease etc."
  },
  {
    "id": "mix-007",
    "category": "Sub-rede",
    "difficulty": "medium",
    "q": "Em /25, quantos hosts úteis existem?",
    "choices": [
      "126",
      "128",
      "254",
      "62"
    ],
    "answer": 0,
    "explain": "/25 tem 128 endereços; 126 hosts úteis (128−2)."
  },
  {
    "id": "mix-008",
    "category": "Wireless",
    "difficulty": "medium",
    "q": "Qual ação ajuda a reduzir interferência e melhorar desempenho no Wi‑Fi?",
    "choices": [
      "Usar canais menos congestionados após análise (site survey)",
      "Desligar o DHCP",
      "Aumentar a máscara para /16",
      "Habilitar NAT estático"
    ],
    "answer": 0,
    "explain": "Escolha de canal e posicionamento do AP (com medição) costuma melhorar estabilidade/desempenho."
  },
  {
    "id": "mix-009",
    "category": "Roteamento",
    "difficulty": "medium",
    "q": "Se um PC não acessa a internet mas acessa outros PCs na mesma LAN, um suspeito comum é:",
    "choices": [
      "Máscara de sub-rede inexistente",
      "Gateway padrão incorreto ou ausente",
      "Switch queimado sempre",
      "DNS autoritativo do domínio"
    ],
    "answer": 1,
    "explain": "Sem gateway padrão correto, o host fala na LAN, mas não alcança redes externas."
  },
  {
    "id": "mix-010",
    "category": "IP Público x Privado",
    "difficulty": "medium",
    "q": "Qual faixa é privada no IPv4?",
    "choices": [
      "192.168.0.0/16",
      "100.64.0.0/10",
      "203.0.113.0/24",
      "169.254.0.0/16"
    ],
    "answer": 0,
    "explain": "RFC1918: 192.168.0.0/16 é privada. 100.64.0.0/10 é faixa CGNAT (compartilhada), 169.254/16 é link-local."
  },
  {
    "id": "mix-011",
    "category": "IP Público x Privado",
    "difficulty": "hard",
    "q": "A faixa 100.64.0.0/10 é mais associada a:",
    "choices": [
      "IP público global",
      "Rede privada RFC1918",
      "Endereços para CGNAT (shared address space)",
      "Multicast"
    ],
    "answer": 2,
    "explain": "100.64.0.0/10 é usada como espaço compartilhado para CGNAT (não roteável globalmente)."
  },
  {
    "id": "mix-012",
    "category": "TCP/IP",
    "difficulty": "hard",
    "q": "Em termos gerais, o que a camada de Aplicação do TCP/IP engloba?",
    "choices": [
      "Somente HTTP",
      "Apenas protocolos de enlace",
      "Protocolos e serviços como HTTP, DNS, SMTP (inclui funções de sessão/apresentação do OSI)",
      "Somente roteamento IP"
    ],
    "answer": 2,
    "explain": "Na prática, a camada de Aplicação do TCP/IP inclui vários protocolos (HTTP, DNS, SMTP...) e agrupa funções."
  },
  {
    "id": "mix-013",
    "category": "Conceitos",
    "difficulty": "medium",
    "q": "Qual afirmação descreve melhor 'endereço IP'?",
    "choices": [
      "Identificador lógico para comunicação em rede (camada IP)",
      "Identificador físico gravado na placa (sempre MAC)",
      "Nome de domínio",
      "Senha do roteador"
    ],
    "answer": 0,
    "explain": "IP é um endereço lógico usado para roteamento e comunicação entre redes."
  },
  {
    "id": "mix-014",
    "category": "NAT",
    "difficulty": "medium",
    "q": "Qual é a função do NAT em redes com IP privado?",
    "choices": [
      "Permitir que hosts com IP privado acessem a internet traduzindo para um IP público",
      "Impedir que qualquer tráfego saia",
      "Trocar o protocolo UDP por TCP",
      "Aumentar alcance do Wi‑Fi"
    ],
    "answer": 0,
    "explain": "NAT traduz IP/porta privados em públicos para saída à internet."
  },
  {
    "id": "mix-015",
    "category": "Sub-rede",
    "difficulty": "hard",
    "q": "Qual é a máscara em decimal pontuado para /20?",
    "choices": [
      "255.255.240.0",
      "255.255.248.0",
      "255.255.224.0",
      "255.255.255.0"
    ],
    "answer": 0,
    "explain": "/20: 255.255.(11110000).0 → 255.255.240.0"
  },
  {
    "id": "mix-016",
    "category": "DHCP",
    "difficulty": "medium",
    "q": "O 'lease time' do DHCP é:",
    "choices": [
      "Tempo de vida do DNS",
      "Tempo que o IP fica emprestado ao cliente antes de renovar",
      "Tempo de autenticação WPA3",
      "Tempo de boot do roteador"
    ],
    "answer": 1,
    "explain": "Lease é a duração da concessão do endereço IP ao cliente."
  },
  {
    "id": "mix-017",
    "category": "DNS",
    "difficulty": "hard",
    "q": "Qual registro DNS é usado para indicar o servidor de e-mail de um domínio?",
    "choices": [
      "A",
      "CNAME",
      "MX",
      "PTR"
    ],
    "answer": 2,
    "explain": "MX aponta para servidores responsáveis por e-mail do domínio."
  },
  {
    "id": "mix-018",
    "category": "Wireless",
    "difficulty": "hard",
    "q": "Uma diferença prática entre WPA2-Personal e WPA3-Personal é:",
    "choices": [
      "WPA3 melhora o handshake/segurança (ex: SAE) em comparação ao WPA2-PSK",
      "WPA3 elimina necessidade de senha",
      "WPA2 só funciona em 5 GHz",
      "WPA3 substitui IP"
    ],
    "answer": 0,
    "explain": "WPA3-Personal usa SAE e reforça segurança contra ataques de dicionário offline, entre outras melhorias."
  },
  {
    "id": "fib-001",
    "category": "Fibra Óptica",
    "difficulty": "easy",
    "q": "Quais são os conectores de fibra óptica mais comuns citados no conteúdo?",
    "choices": [
      "RJ45, BNC, F-Type, SMA",
      "SC, LC, ST e FC",
      "USB-C, HDMI, DisplayPort, VGA",
      "MPO, BNC, RJ11 e SC"
    ],
    "answer": 1,
    "explain": "Os conectores mais comuns citados são SC, LC, ST e FC."
  },
  {
    "id": "fib-002",
    "category": "Fibra Óptica",
    "difficulty": "easy",
    "q": "Qual conector tem ponteira de 2,5 mm e encaixe do tipo push-pull, geralmente quadrado?",
    "choices": [
      "LC",
      "SC",
      "ST",
      "FC"
    ],
    "answer": 1,
    "explain": "SC (Subscriber Connector) usa ferrule de 2,5 mm e encaixe push‑pull; é muito comum em telecom/FTTx."
  },
  {
    "id": "fib-003",
    "category": "Fibra Óptica",
    "difficulty": "medium",
    "q": "Qual conector é menor (1,25 mm) e é muito usado em data centers por alta densidade?",
    "choices": [
      "SC",
      "FC",
      "LC",
      "ST"
    ],
    "answer": 2,
    "explain": "LC (Lucent Connector) tem ferrule de 1,25 mm e é ideal para alta densidade em racks/data centers."
  },
  {
    "id": "fib-004",
    "category": "Fibra Óptica",
    "difficulty": "medium",
    "q": "Qual conector tem corpo cilíndrico e trava tipo baioneta (muito usado em redes antigas e laboratórios)?",
    "choices": [
      "ST",
      "SC",
      "LC",
      "FC"
    ],
    "answer": 0,
    "explain": "ST (Straight Tip) usa trava tipo baioneta e foi comum em LANs antigas e ambientes educacionais."
  },
  {
    "id": "fib-005",
    "category": "Fibra Óptica",
    "difficulty": "hard",
    "q": "Qual conector possui corpo metálico com fixação roscada, oferecendo alta estabilidade e resistência a vibrações?",
    "choices": [
      "LC",
      "FC",
      "SC",
      "ST"
    ],
    "answer": 1,
    "explain": "FC (Ferrule Connector) é roscado, firme e indicado para medições/laboratórios e ambientes com vibração."
  },
  {
    "id": "fib-006",
    "category": "Fibra Óptica",
    "difficulty": "medium",
    "q": "Se a prioridade é densidade máxima de portas em um switch/patch panel, qual conector tende a ser a melhor escolha?",
    "choices": [
      "LC",
      "SC",
      "ST",
      "FC"
    ],
    "answer": 0,
    "explain": "LC é menor (1,25 mm), ocupando menos espaço e aumentando a densidade de conexões."
  },
  {
    "id": "fib-007",
    "category": "Fibra Óptica",
    "difficulty": "easy",
    "q": "Qual opção descreve melhor quando usar SC?",
    "choices": [
      "Alta precisão em medições ópticas",
      "Alta densidade em data centers",
      "Redes de telecom e FTTx",
      "Somente redes antigas LAN"
    ],
    "answer": 2,
    "explain": "SC é muito comum em telecom/FTTx por ser robusto, barato e fácil de conectar/desconectar."
  },
  {
    "id": "app-001",
    "category": "Protocolos de Aplicação",
    "difficulty": "easy",
    "q": "Qual protocolo é usado para comunicação na Web entre navegador e servidor?",
    "choices": [
      "HTTP",
      "FTP",
      "SMTP",
      "SSH"
    ],
    "answer": 0,
    "explain": "HTTP/HTTPS define como o navegador e o servidor trocam conteúdo de páginas e recursos."
  },
  {
    "id": "app-002",
    "category": "Protocolos de Aplicação",
    "difficulty": "easy",
    "q": "Qual é a porta padrão do HTTP (sem criptografia)?",
    "choices": [
      "22",
      "25",
      "80",
      "443"
    ],
    "answer": 2,
    "explain": "HTTP geralmente usa a porta 80. HTTPS costuma usar 443."
  },
  {
    "id": "app-003",
    "category": "Protocolos de Aplicação",
    "difficulty": "medium",
    "q": "FTP é usado principalmente para:",
    "choices": [
      "Enviar e-mails",
      "Transferir arquivos entre cliente e servidor",
      "Resolver nomes de domínio",
      "Roteamento dinâmico"
    ],
    "answer": 1,
    "explain": "FTP (File Transfer Protocol) é um protocolo clássico para upload e download de arquivos."
  },
  {
    "id": "app-004",
    "category": "Protocolos de Aplicação",
    "difficulty": "easy",
    "q": "SMTP é o protocolo padrão para:",
    "choices": [
      "Transferência de arquivos",
      "Envio de e-mails",
      "Acesso remoto seguro",
      "Resolução DNS"
    ],
    "answer": 1,
    "explain": "SMTP (Simple Mail Transfer Protocol) é usado para envio de e-mails e comunicação entre servidores de e-mail."
  },
  {
    "id": "app-005",
    "category": "Protocolos de Aplicação",
    "difficulty": "medium",
    "q": "Quais portas são comumente associadas ao SMTP?",
    "choices": [
      "53, 123 e 161",
      "25, 465 e 587",
      "80 e 443",
      "20 e 21"
    ],
    "answer": 1,
    "explain": "SMTP costuma usar 25 (relay), 587 (submission) e 465 (TLS implícito, em muitos cenários)."
  },
  {
    "id": "app-006",
    "category": "Protocolos de Aplicação",
    "difficulty": "medium",
    "q": "Quando você acessa https://www.microsoft.com/ no navegador, qual protocolo faz a requisição da página?",
    "choices": [
      "FTP",
      "HTTP/HTTPS",
      "SMTP",
      "DHCP"
    ],
    "answer": 1,
    "explain": "O navegador usa HTTP; com 'https', é HTTP sobre TLS (HTTPS)."
  },
  {
    "id": "app-007",
    "category": "Protocolos de Aplicação",
    "difficulty": "hard",
    "q": "Qual afirmação é mais correta sobre HTTP/HTTPS?",
    "choices": [
      "HTTPS usa TCP/IP e normalmente porta 443",
      "HTTPS substitui completamente o TCP",
      "HTTP sempre usa UDP",
      "HTTPS não usa criptografia"
    ],
    "answer": 0,
    "explain": "HTTPS é HTTP com criptografia (TLS) e geralmente opera na porta 443, sobre TCP."
  },
  {
    "id": "cgn-001",
    "category": "CGNAT",
    "difficulty": "easy",
    "q": "O que é CGNAT?",
    "choices": [
      "Um tipo de Wi-Fi",
      "NAT em nível de provedor para economizar IPv4, compartilhando IP público",
      "Um protocolo de e-mail",
      "Um conector de fibra"
    ],
    "answer": 1,
    "explain": "CGNAT (Carrier-Grade NAT) permite que vários clientes compartilhem um mesmo IPv4 público usando tradução de portas."
  },
  {
    "id": "cgn-002",
    "category": "CGNAT",
    "difficulty": "medium",
    "q": "No CGNAT, o que normalmente diferencia as conexões de clientes que compartilham o mesmo IP público?",
    "choices": [
      "O nome do domínio",
      "A máscara de sub-rede",
      "As portas (PAT)",
      "O endereço MAC público"
    ],
    "answer": 2,
    "explain": "CGNAT usa tradução de portas (PAT) para diferenciar fluxos de clientes sob um mesmo IP público."
  },
  {
    "id": "cgn-003",
    "category": "CGNAT",
    "difficulty": "hard",
    "q": "Uma desvantagem comum do CGNAT para o usuário final é:",
    "choices": [
      "Não conseguir navegar em sites",
      "Dificuldade em hospedar serviços e fazer port forwarding direto",
      "Obrigatoriedade de usar WPA3",
      "Impossibilidade de usar DNS"
    ],
    "answer": 1,
    "explain": "Sem IP público exclusivo, abrir portas para acesso externo (servidores, câmeras, jogos) pode ser limitado."
  },
  {
    "id": "pv-001",
    "category": "Proxy/VPN",
    "difficulty": "easy",
    "q": "Qual descrição combina melhor com um proxy?",
    "choices": [
      "Cria túnel criptografado para todo tráfego",
      "Atua como intermediário; o site vê o IP do proxy",
      "Distribui IP automaticamente (DHCP)",
      "Resolve nomes (DNS)"
    ],
    "answer": 1,
    "explain": "Proxy faz ponte entre usuário e destino; geralmente só mascara IP para aquele tráfego."
  },
  {
    "id": "pv-002",
    "category": "Proxy/VPN",
    "difficulty": "medium",
    "q": "Qual diferença típica entre VPN e proxy é:",
    "choices": [
      "VPN cria túnel criptografado para todo tráfego; proxy pode não criptografar",
      "Proxy sempre é mais seguro que VPN",
      "VPN só funciona para HTTP",
      "Proxy substitui NAT"
    ],
    "answer": 0,
    "explain": "VPN criptografa e encapsula o tráfego (túnel). Proxy pode apenas redirecionar sem proteção do conteúdo."
  },
  {
    "id": "pv-003",
    "category": "Proxy/VPN",
    "difficulty": "hard",
    "q": "Em uma rede Wi‑Fi pública, para reduzir risco de espionagem do tráfego, a melhor escolha é:",
    "choices": [
      "Proxy HTTP simples",
      "VPN",
      "Desligar o DNS",
      "Aumentar MTU"
    ],
    "answer": 1,
    "explain": "VPN cria um túnel criptografado, protegendo dados em redes públicas."
  },
  {
    "id": "ssh-001",
    "category": "SSH",
    "difficulty": "easy",
    "q": "Qual é a porta padrão do SSH?",
    "choices": [
      "21",
      "22",
      "25",
      "53"
    ],
    "answer": 1,
    "explain": "SSH usa porta padrão 22 (embora possa ser alterada)."
  },
  {
    "id": "ssh-002",
    "category": "SSH",
    "difficulty": "medium",
    "q": "O SSH foi criado principalmente para substituir quais protocolos inseguros (sem criptografia) no acesso remoto/arquivos?",
    "choices": [
      "Telnet e FTP",
      "HTTP e DNS",
      "DHCP e NAT",
      "ICMP e ARP"
    ],
    "answer": 0,
    "explain": "SSH substitui Telnet (terminal) e também permite transferência segura via SCP/SFTP (em vez de FTP puro)."
  },
  {
    "id": "ssh-003",
    "category": "SSH",
    "difficulty": "medium",
    "q": "Uma vantagem importante do SSH é:",
    "choices": [
      "Criptografa a sessão, protegendo comandos e credenciais",
      "Funciona apenas em LAN",
      "Remove necessidade de IP",
      "Não usa autenticação"
    ],
    "answer": 0,
    "explain": "SSH cifra o tráfego e suporta autenticação por senha ou chaves (mais seguro)."
  },
  {
    "id": "ssh-004",
    "category": "SSH",
    "difficulty": "hard",
    "q": "Qual alternativa é um exemplo correto de comando SSH para acessar um servidor?",
    "choices": [
      "ssh://usuario@192.168.0.10:22",
      "ssh usuario@192.168.0.10",
      "connect ssh 192.168.0.10 usuario",
      "telnet usuario@192.168.0.10"
    ],
    "answer": 1,
    "explain": "O formato típico é: ssh usuario@IP (porta opcional com -p)."
  },
  {
    "id": "dns-ps-001",
    "category": "DNS",
    "difficulty": "medium",
    "q": "Em uma arquitetura DNS primário/secundário, o servidor primário (master) é:",
    "choices": [
      "Apenas cache recursivo",
      "Onde a zona original é mantida e editada",
      "Sempre o mais próximo do usuário",
      "O que recebe zona por transferência"
    ],
    "answer": 1,
    "explain": "O primário contém a zona original e é onde se fazem alterações (registros oficiais)."
  },
  {
    "id": "dns-ps-002",
    "category": "DNS",
    "difficulty": "medium",
    "q": "O servidor DNS secundário (slave) normalmente:",
    "choices": [
      "Edita os registros diretamente",
      "Recebe cópia da zona por transferência de zona (zone transfer)",
      "Funciona apenas com UDP",
      "Substitui o roteador"
    ],
    "answer": 1,
    "explain": "O secundário responde consultas com base em uma cópia sincronizada da zona."
  },
  {
    "id": "dns-ps-003",
    "category": "DNS",
    "difficulty": "hard",
    "q": "Por que usar DNS secundário (ou múltiplos secundários) é uma boa prática?",
    "choices": [
      "Para reduzir a necessidade de IPv6",
      "Para redundância, disponibilidade e distribuição de carga/latência",
      "Para aumentar potência do Wi‑Fi",
      "Para trocar TCP por UDP"
    ],
    "answer": 1,
    "explain": "Vários servidores aumentam disponibilidade, suportam falhas e distribuem consultas (desempenho/resiliência)."
  },
  {
    "id": "nat-adv-001",
    "category": "NAT",
    "difficulty": "medium",
    "q": "SNAT (Source NAT) altera principalmente:",
    "choices": [
      "O IP de destino (entrada)",
      "O IP de origem (saída)",
      "O MAC de origem",
      "O DNS do cliente"
    ],
    "answer": 1,
    "explain": "SNAT muda o endereço de origem (muito usado para tráfego de saída)."
  },
  {
    "id": "nat-adv-002",
    "category": "NAT",
    "difficulty": "medium",
    "q": "DNAT (Destination NAT) é usado tipicamente para:",
    "choices": [
      "Distribuir IP automaticamente",
      "Redirecionar conexões de entrada para um host interno (port forwarding)",
      "Resolver nomes",
      "Trocar rotas automaticamente"
    ],
    "answer": 1,
    "explain": "DNAT altera destino, direcionando tráfego externo para um servidor interno (ex.: porta 80 → 192.168.0.10:80)."
  },
  {
    "id": "nat-adv-003",
    "category": "NAT",
    "difficulty": "hard",
    "q": "Qual cenário é um exemplo de DNAT?",
    "choices": [
      "Seu PC sai para a Internet com IP privado traduzido",
      "Roteador redireciona acesso ao IP público:80 para 192.168.0.10:80",
      "Servidor DHCP entrega gateway padrão",
      "DNS recursivo consulta o root"
    ],
    "answer": 1,
    "explain": "DNAT trata a entrada: redireciona conexões externas para um destino interno específico."
  },
  {
    "id": "net-005",
    "category": "DNS",
    "difficulty": "medium",
    "q": "Qual é a principal função de um servidor DNS recursivo?",
    "choices": [
      "Armazenar a zona oficial do domínio e aceitar alterações diretas",
      "Consultar outros servidores DNS em nome do cliente até obter a resposta",
      "Gerar endereços IP automaticamente (DHCP)",
      "Traduzir IP privado em IP público (NAT)"
    ],
    "answer": 1,
    "explain": "O DNS recursivo resolve a consulta para o cliente, fazendo consultas a outros servidores (raiz, TLD e autoritativos) até achar a resposta final.",
    "tip": "Pense: recursivo = 'corre atrás' da resposta para você."
  },
  {
    "id": "net-006",
    "category": "DNS",
    "difficulty": "medium",
    "q": "No modelo primário/secundário de DNS, o que o servidor secundário (slave) faz?",
    "choices": [
      "Recebe cópia da zona do primário via transferência de zona e responde consultas",
      "É o único que permite editar registros DNS",
      "Só resolve nomes da rede local, não da internet",
      "Substitui o DHCP na entrega de IP"
    ],
    "answer": 0,
    "explain": "O secundário mantém uma cópia sincronizada da zona do primário (master). Ele aumenta redundância e disponibilidade respondendo consultas mesmo se o primário falhar."
  },
  {
    "id": "net-007",
    "category": "NAT",
    "difficulty": "medium",
    "q": "Qual cenário descreve corretamente um DNAT?",
    "choices": [
      "Vários PCs saindo para a internet compartilhando um IP público",
      "Redirecionar acessos externos na porta 80 do IP público para um servidor interno 192.168.0.10:80",
      "Distribuir IPs automaticamente para os clientes",
      "Criptografar tráfego entre cliente e servidor"
    ],
    "answer": 1,
    "explain": "DNAT (Destination NAT) altera o destino do pacote para encaminhar tráfego de entrada para um host interno (ex.: port forwarding)."
  },
  {
    "id": "net-008",
    "category": "CGNAT",
    "difficulty": "medium",
    "q": "Qual faixa é comumente associada ao CGNAT (RFC 6598) para endereços compartilhados?",
    "choices": [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "100.64.0.0/10",
      "192.168.0.0/16"
    ],
    "answer": 2,
    "explain": "A faixa 100.64.0.0/10 é reservada para Carrier-Grade NAT (CGNAT), usada por provedores para endereços compartilhados entre clientes."
  },
  {
    "id": "net-009",
    "category": "Wireless",
    "difficulty": "easy",
    "q": "Qual prática melhora a qualidade do Wi‑Fi em ambientes com muita interferência?",
    "choices": [
      "Deixar todos os roteadores no mesmo canal",
      "Posicionar o roteador em local alto/central e escolher um canal menos congestionado",
      "Usar senha fraca para reduzir latência",
      "Desligar WPA2/WPA3 para aumentar o alcance"
    ],
    "answer": 1,
    "explain": "Localização e canal influenciam muito. Em ambientes congestionados, escolher canal adequado e posicionar o AP corretamente melhora sinal e reduz interferência."
  },
  {
    "id": "net-010",
    "category": "Segurança",
    "difficulty": "easy",
    "q": "Qual a diferença mais importante entre VPN e Proxy em termos de segurança?",
    "choices": [
      "Proxy sempre criptografa todo tráfego; VPN não",
      "VPN cria um túnel criptografado para todo o tráfego; proxy pode não criptografar e costuma atuar por aplicação",
      "Proxy e VPN são a mesma coisa",
      "VPN só funciona em redes cabeadas"
    ],
    "answer": 1,
    "explain": "VPN normalmente criptografa todo o tráfego em um túnel. Proxy pode apenas intermediar conexão e nem sempre protege os dados (depende do tipo/uso)."
  },
  {
    "id": "net-011",
    "category": "SSH",
    "difficulty": "easy",
    "q": "Qual é a porta padrão do SSH e seu objetivo principal?",
    "choices": [
      "80 — transferir páginas web",
      "22 — acesso remoto seguro com criptografia",
      "53 — resolver nomes DNS",
      "25 — enviar e-mails via SMTP"
    ],
    "answer": 1,
    "explain": "SSH usa por padrão a porta 22 e permite acesso remoto seguro (com criptografia), substituindo protocolos inseguros como Telnet."
  },
  {
    "id": "net-012",
    "category": "Aplicação",
    "difficulty": "easy",
    "q": "Qual protocolo é usado para envio de e-mails entre servidores e clientes?",
    "choices": [
      "HTTP",
      "FTP",
      "SMTP",
      "ICMP"
    ],
    "answer": 2,
    "explain": "SMTP (Simple Mail Transfer Protocol) é o protocolo padrão para envio de e-mails."
  },
  {
    "id": "net-013",
    "category": "Aplicação",
    "difficulty": "easy",
    "q": "Em geral, HTTP utiliza qual porta e HTTPS qual porta?",
    "choices": [
      "HTTP 25 / HTTPS 22",
      "HTTP 80 / HTTPS 443",
      "HTTP 53 / HTTPS 80",
      "HTTP 21 / HTTPS 20"
    ],
    "answer": 1,
    "explain": "HTTP geralmente usa porta 80, e HTTPS (HTTP com TLS) usa porta 443."
  },
  {
    "id": "net-014",
    "category": "Fibra",
    "difficulty": "medium",
    "q": "Qual conector é mais comum em data centers por permitir alta densidade de portas?",
    "choices": [
      "SC",
      "LC",
      "ST",
      "FC"
    ],
    "answer": 1,
    "explain": "LC tem ponteira menor (1,25 mm) e ocupa menos espaço, ideal para alta densidade em racks e data centers."
  },
  {
    "id": "net-015",
    "category": "Fibra",
    "difficulty": "easy",
    "q": "Qual conector de fibra usa fixação roscada e é conhecido por alta estabilidade?",
    "choices": [
      "FC",
      "ST",
      "LC",
      "SC"
    ],
    "answer": 0,
    "explain": "FC possui corpo metálico com rosca, oferecendo conexão firme e resistente a vibrações, comum em medições e laboratórios."
  },
  {
    "id": "net-016",
    "category": "Roteamento",
    "difficulty": "medium",
    "q": "Qual afirmação sobre gateway padrão está correta?",
    "choices": [
      "É sempre o servidor DNS",
      "É o endereço do roteador que encaminha tráfego para fora da rede local",
      "Só existe em redes Wi‑Fi",
      "É o IP público do provedor"
    ],
    "answer": 1,
    "explain": "Gateway padrão é o roteador usado para encaminhar tráfego para outras redes quando o destino não está na rede local."
  },
  {
    "id": "net-017",
    "category": "Roteamento",
    "difficulty": "hard",
    "q": "Rotas estáticas são mais indicadas quando:",
    "choices": [
      "A rede muda frequentemente e precisa se adaptar automaticamente",
      "Você quer simplicidade em redes pequenas e caminhos fixos",
      "Você precisa de convergência automática em falhas",
      "Você quer balanceamento dinâmico sem configurar nada"
    ],
    "answer": 1,
    "explain": "Rotas estáticas são configuradas manualmente e são boas para redes pequenas/estáveis. Rotas dinâmicas se adaptam melhor a mudanças e falhas."
  },
  {
    "id": "net-018",
    "category": "TCP/IP",
    "difficulty": "medium",
    "q": "No modelo TCP/IP, qual camada é responsável por endereçamento IP e roteamento?",
    "choices": [
      "Aplicação",
      "Transporte",
      "Internet",
      "Acesso à Rede"
    ],
    "answer": 2,
    "explain": "A camada Internet do TCP/IP lida com endereçamento IP e roteamento (IP, ICMP)."
  },
  {
    "id": "net-019",
    "category": "UDP",
    "difficulty": "medium",
    "q": "Quando o UDP costuma ser preferido ao TCP?",
    "choices": [
      "Quando é obrigatório confirmar entrega de cada pacote",
      "Quando baixa latência é mais importante que confiabilidade total (ex.: VoIP/streaming)",
      "Quando se precisa de criptografia nativa",
      "Quando há necessidade de controle de congestionamento robusto"
    ],
    "answer": 1,
    "explain": "UDP tem menos overhead e menor latência, ideal para voz/streaming, onde perda pequena é aceitável e retransmissão pode piorar a experiência."
  },
  {
    "id": "net-020",
    "category": "DHCP",
    "difficulty": "medium",
    "q": "Qual é a ordem correta do processo DHCP (DORA)?",
    "choices": [
      "Discover → Offer → Request → Acknowledge",
      "Request → Discover → Offer → Acknowledge",
      "Offer → Discover → Acknowledge → Request",
      "Discover → Request → Offer → Acknowledge"
    ],
    "answer": 0,
    "explain": "DHCP funciona via DORA: Discover, Offer, Request, Acknowledge."
  },
  {
    "id": "net-021",
    "category": "Sub-rede",
    "difficulty": "hard",
    "q": "Uma rede /26 possui quantos endereços IP no total e quantos hosts utilizáveis?",
    "choices": [
      "64 IPs no total, 62 hosts utilizáveis",
      "32 IPs no total, 30 hosts utilizáveis",
      "128 IPs no total, 126 hosts utilizáveis",
      "16 IPs no total, 14 hosts utilizáveis"
    ],
    "answer": 0,
    "explain": "Uma /26 tem 2^(32-26)=64 endereços. Em IPv4, normalmente 2 são reservados (rede e broadcast), sobrando 62 hosts utilizáveis."
  },
  {
    "id": "net-022",
    "category": "Equipamentos",
    "difficulty": "easy",
    "q": "Qual equipamento é responsável por conectar a rede do provedor via fibra até o cliente (em FTTH)?",
    "choices": [
      "Switch",
      "ONU",
      "Hub",
      "Firewall"
    ],
    "answer": 1,
    "explain": "A ONU (Optical Network Unit) faz a terminação da fibra no cliente e entrega a interface Ethernet/Wi‑Fi (dependendo do equipamento)."
  },
  {
    "id": "net-023",
    "category": "Topologias",
    "difficulty": "medium",
    "q": "Em qual topologia a falha de um cabo principal pode derrubar toda a rede, pois há um único meio compartilhado?",
    "choices": [
      "Estrela",
      "Anel",
      "Barramento",
      "Mesh"
    ],
    "answer": 2,
    "explain": "Na topologia em barramento, todos compartilham o mesmo meio. Uma falha no cabo principal ou terminações pode impactar toda a rede."
  }
];
