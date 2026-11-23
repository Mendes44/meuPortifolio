export const areas = [
  "Todos",
  "SaaS",
  "Sites comerciais",
  "Cloud & AWS",
  "Full Stack",
  "Frontend",
  "Backend & APIs",
  "Redes & Linux",
  "Dados",
  "Automação",
  "Acadêmicos",
] as const;
export type Area = (typeof areas)[number];
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  areas: Area[];
  technologies: string[];
  status: "Demonstração" | "Projeto de estudo";
  repo?: string;
  demo?: string;
  image?: string;
  imageMode?: "screenshot" | "logo";
  gallery?: string[];
  visual: "website" | "app" | "api" | "terminal" | "data";
  color: string;
  features: string[];
  problem: string;
  technical: string;
  architecture: string[];
  note?: string;
  endpoints?: string[];
  source: string;
  featured?: boolean;
};
const gh = "https://github.com/Mendes44/";

// ADICIONE NOVOS PROJETOS AQUI:
// copie um dos objetos abaixo, defina um `slug` único e preencha os links,
// tecnologias, descrição e detalhes. A página /projetos é atualizada automaticamente.
export const projects: Project[] = [
  {
    slug: "fixapp",
    title: "FixApp",
    subtitle: "Operação completa para assistências técnicas.",
    description:
      "SaaS multiempresa para ordens de serviço, clientes, estoque, vendas, PDV, financeiro, relatórios e gestão de equipes.",
    areas: ["SaaS", "Full Stack", "Dados"],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "PWA"],
    status: "Demonstração",
    featured: true,
    demo: "https://fixapp-bay.vercel.app/",
    image: "/images/fixapp-dashboard.png",
    imageMode: "screenshot",
    gallery: ["/images/fixapp-orders.png"],
    visual: "app",
    color: "blue",
    features: [
      "Arquitetura multi-tenant com isolamento por loja e políticas RLS",
      "Ordens de serviço, fotos, diagnóstico, assinatura digital e acompanhamento",
      "Estoque, vendas, PDV, caixa, devoluções e relatórios gerenciais",
      "PWA instalável, backups criptografados e monitoramento com Sentry",
      "Testes Vitest, Playwright, pgTAP, carga e recuperação de desastre",
    ],
    problem:
      "Centralizar a operação de assistências técnicas que normalmente depende de sistemas isolados, planilhas e processos manuais.",
    technical:
      "Next.js com fronteiras server-side, Supabase Auth e PostgreSQL, isolamento multiempresa, auditoria, CSP, validação Zod e suítes automatizadas.",
    architecture: [
      "PWA Next.js",
      "Autenticação e autorização por tenant",
      "Server Actions / RPCs",
      "PostgreSQL + RLS + Storage",
    ],
    note: "Produto em evolução e demonstração protegida por autenticação. O repositório é privado por conter regras do produto e documentação operacional.",
    source: "https://fixapp-bay.vercel.app/",
  },
  {
    slug: "copa-cozinha",
    title: "Copa Cozinha",
    subtitle: "Quitandas, afeto e três casas em uma experiência digital.",
    description:
      "Site institucional responsivo com vitrine filtrável, unidades, cardápio digital, mapa e formulário de eventos via WhatsApp.",
    areas: ["Sites comerciais", "Frontend"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Leaflet"],
    status: "Demonstração",
    featured: true,
    demo: "https://copacozinha.vercel.app/",
    image: "/images/logo-copa-cozinha.svg",
    imageMode: "logo",
    visual: "website",
    color: "green",
    features: [
      "Vitrine de produtos organizada por categorias",
      "Leitor de cardápio com páginas, zoom, PDF e mapa",
      "Três unidades com horários, endereços e rotas",
      "Formulário de eventos que prepara o atendimento no WhatsApp",
      "SEO, dados estruturados, sitemap e acessibilidade responsiva",
    ],
    problem:
      "Apresentar a identidade, os produtos e as três casas da marca sem perder o caminho rápido para cardápio, localização e eventos.",
    technical:
      "App Router, imagens otimizadas, mapa carregado sob demanda, conteúdo centralizado e metadados estruturados para cada unidade.",
    architecture: ["Next.js", "Conteúdo da marca", "Leaflet / OpenStreetMap", "WhatsApp"],
    note: "Projeto de cliente. O código-fonte permanece privado; a demonstração pública está disponível.",
    source: "https://copacozinha.vercel.app/",
  },
  {
    slug: "stok-atacadista",
    title: "Stok Atacadista",
    subtitle: "Vitrine comercial preparada para campanhas e conversão.",
    description:
      "Site responsivo de atacado e varejo com catálogo filtrável, atendimento pelo WhatsApp e painel privado de mídia e conversões.",
    areas: ["Sites comerciais", "Full Stack", "Dados"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Google Analytics"],
    status: "Demonstração",
    featured: true,
    demo: "https://www.stokoutlet.com.br/",
    visual: "website",
    image: "/images/logo-stok.webp",
    imageMode: "logo",
    color: "purple",
    features: [
      "Catálogo por categorias e chamadas diretas para WhatsApp",
      "Preservação de UTMs, gclid e fbclid para campanhas",
      "Eventos de conversão preparados para GTM, GA4 e Meta Pixel",
      "Painel administrativo server-side para Google Ads e Analytics",
      "Imagens WebP, cache e cabeçalhos de segurança",
    ],
    problem:
      "Transformar o catálogo da loja em uma vitrine rápida, mensurável e voltada à geração de conversas comerciais.",
    technical:
      "Frontend estático com build próprio e painel separado no servidor, mantendo credenciais de mídia fora do navegador.",
    architecture: ["Vitrine estática", "WhatsApp", "GTM / GA4", "Painel de métricas"],
    note: "Projeto de cliente com código e painel de campanhas privados. A demonstração pública está disponível no domínio oficial.",
    source: "https://www.stokoutlet.com.br/",
  },
  {
    slug: "tradicao-do-peixe",
    title: "Tradição do Peixe",
    subtitle: "Restaurante, cardápio e experiência da casa.",
    description:
      "Site institucional com galeria otimizada, cardápio, vídeo da casa, contato, localização e mensuração condicionada ao consentimento.",
    areas: ["Sites comerciais", "Frontend"],
    technologies: ["Vite", "HTML5", "CSS3", "JavaScript", "Google Tag Manager"],
    status: "Demonstração",
    featured: true,
    demo: "https://tradicaodopeixe.com.br/",
    image: "/images/logo-tradicao-do-peixe.png",
    imageMode: "logo",
    visual: "website",
    color: "rust",
    features: [
      "Galeria responsiva com imagens WebP e carregamento progressivo",
      "Tour em vídeo carregado somente quando solicitado",
      "Cardápio, WhatsApp, mapa e rotas para o restaurante",
      "SEO, dados estruturados, sitemap e redirecionamentos do site anterior",
      "Consent Mode v2 e eventos de conversão sem dados pessoais",
    ],
    problem:
      "Modernizar a presença digital do restaurante preservando SEO, campanhas e os acessos existentes do site anterior.",
    technical:
      "Vite com imagens responsivas, vídeo em faststart, carregamento sob demanda e integração controlada com GTM, Analytics e Ads.",
    architecture: ["Vite", "Conteúdo otimizado", "GTM / Consent Mode", "Vercel"],
    note: "Site publicado para cliente real, com domínio próprio e preservação de métricas e redirecionamentos históricos.",
    source: "https://tradicaodopeixe.com.br/",
  },
  {
    slug: "village-kids",
    title: "Village Kids",
    subtitle: "Diversão, festas e experiências para toda a família.",
    description:
      "Site comercial responsivo para apresentar cinco unidades, festas infantis, espaços, temas e atendimento direto pelo WhatsApp.",
    areas: ["Sites comerciais", "Frontend"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    status: "Demonstração",
    featured: true,
    demo: "https://villagekidsbh.com.br/",
    image: "/images/logo-village-kids.svg",
    imageMode: "logo",
    visual: "website",
    color: "orange",
    features: [
      "Apresentação de cinco unidades em Belo Horizonte e Nova Lima",
      "Galerias organizadas por espaço e experiência",
      "Pacotes de festas, temas e serviços adicionais",
      "Formulário de orçamento conectado ao atendimento pelo WhatsApp",
      "Navegação responsiva com informações de horários e localização",
    ],
    problem:
      "Reunir unidades, experiências e opções de festas em uma presença digital clara para famílias que precisam comparar espaços e solicitar orçamento.",
    technical:
      "Interface responsiva orientada a conteúdo, com seções reutilizáveis para unidades, galerias, festas, depoimentos e conversão pelo WhatsApp.",
    architecture: [
      "Site responsivo",
      "Conteúdo das unidades",
      "Galerias e festas",
      "WhatsApp",
    ],
    note: "Projeto de cliente com demonstração pública no domínio oficial. O código-fonte permanece privado.",
    source: "https://villagekidsbh.com.br/",
  },
  {
    slug: "aws-tres-camadas",
    title: "Arquitetura em três camadas na AWS",
    subtitle: "Rede, processamento assíncrono e observabilidade.",
    description:
      "Laboratório documentado com CloudFront, ALB, EC2 privadas, Auto Scaling, SQS, DynamoDB, CloudWatch e alta disponibilidade entre zonas.",
    areas: ["Cloud & AWS", "Redes & Linux"],
    technologies: ["AWS", "EC2", "SQS", "DynamoDB", "CloudWatch", "VPC"],
    status: "Projeto de estudo",
    featured: true,
    repo: gh + "Aplicacao-3Camadas-AWS",
    image: "/images/aws-3-camadas.png",
    visual: "app",
    color: "orange",
    features: [
      "VPC distribuída em duas zonas de disponibilidade",
      "CloudFront, Application Load Balancer e grupos Auto Scaling",
      "Processamento desacoplado com SQS e fila de mensagens mortas",
      "Persistência no DynamoDB e recuperação point-in-time",
      "Dashboard, alarmes CloudWatch e notificações por SNS",
    ],
    problem:
      "Compreender como entrada, capacidade, filas, persistência e monitoramento se relacionam em uma arquitetura AWS resiliente.",
    technical:
      "Estudo de caso construído pelo Console AWS, com diagrama editável, evidências, limites técnicos, plano de testes, custos e roteiro de reprodução.",
    architecture: ["CloudFront / ALB", "EC2 / Auto Scaling", "SQS / DLQ", "DynamoDB / CloudWatch"],
    note: "Recursos foram desligados após o laboratório para evitar custos. O repositório preserva o diagrama, as evidências e as decisões técnicas.",
    source: gh + "Aplicacao-3Camadas-AWS/blob/main/README.md",
  },
  {
    slug: "chico-do-peixe",
    title: "Chico do Peixe",
    subtitle: "Uma presença digital à altura da casa.",
    description:
      "Site de restaurante com cardápio, galeria, atrações e contato direto para reservas.",
    areas: ["Sites comerciais", "Frontend"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "Demonstração",
    featured: true,
    repo: gh + "Chico-do-Peixe",
    demo: "https://chico-do-peixe.vercel.app/",
    image: "/images/logo-chico-do-peixe.webp",
    imageMode: "logo",
    visual: "website",
    color: "rust",
    features: [
      "Cardápio organizado por categorias",
      "Galeria e carrosséis com controles de pausa",
      "Contato por WhatsApp e acesso ao iFood",
      "Páginas de história, atrações e privacidade",
    ],
    problem:
      "Reunir as informações do restaurante e facilitar o caminho entre conhecer a casa e entrar em contato.",
    technical:
      "Componentes reutilizáveis, navegação multipágina e otimização de imagens com next/image e Sharp.",
    architecture: [
      "Páginas Next.js",
      "Componentes React",
      "Conteúdo do restaurante",
      "WhatsApp / iFood",
    ],
    source: gh + "Chico-do-Peixe/blob/main/README.md",
  },
  {
    slug: "verdinho",
    title: "Restaurante Verdinho",
    subtitle: "Quatro unidades. Uma experiência.",
    description:
      "Site com unidades, cardápio, encomendas por WhatsApp e acesso ao sistema de reservas.",
    areas: ["Sites comerciais", "Frontend"],
    technologies: ["Next.js", "React", "TypeScript"],
    status: "Demonstração",
    repo: gh + "verdinho-restaurante",
    demo: "https://verdinho-restaurante.vercel.app/",
    image: "/images/logo-verdinho.webp",
    imageMode: "logo",
    visual: "website",
    color: "green",
    features: [
      "Páginas individuais para quatro unidades",
      "Cardápio e galeria",
      "Formulário que prepara encomendas no WhatsApp",
      "Link para Mesa Certa e mapa sob demanda",
    ],
    problem:
      "Organizar os diferentes endereços e serviços para que cada visitante encontre a unidade e o atendimento desejados.",
    technical:
      "Conteúdo centralizado, páginas compartilhando componentes e medição opcional condicionada ao consentimento.",
    architecture: [
      "Next.js + React",
      "Dados das unidades",
      "Formulário de encomendas",
      "WhatsApp / Mesa Certa",
    ],
    source: gh + "verdinho-restaurante/blob/main/package.json",
  },
  {
    slug: "mesa-certa",
    title: "Mesa Certa",
    subtitle: "O próximo encontro começa com uma reserva.",
    description:
      "Interface de reservas com seleção de data, horário e pessoas, além de consulta de reserva.",
    areas: ["Frontend"],
    technologies: ["TypeScript"],
    status: "Demonstração",
    demo: "https://reserva-mesas-app-xi.vercel.app/reservar/bistro-da-vila",
    visual: "app",
    color: "blue",
    features: [
      "Seleção de data e horário",
      "Quantidade de pessoas",
      "Fluxo de reserva em etapas",
      "Acesso à consulta de reservas",
    ],
    problem:
      "Oferecer um ponto de entrada online para o cliente consultar opções e iniciar uma reserva de mesa.",
    technical:
      "Interface orientada por disponibilidade e estados do fluxo de reserva.",
    architecture: [
      "Visitante",
      "Data e horário",
      "Quantidade de pessoas",
      "Fluxo de reserva",
    ],
    note: "Código privado. A demonstração depende da disponibilidade de horários do restaurante.",
    source: "https://reserva-mesas-app-xi.vercel.app/reservar/bistro-da-vila",
  },
  {
    slug: "appbraza",
    title: "APPBraza",
    subtitle: "Organização do convite ao rateio.",
    description:
      "Planejador de churrascos com convidados, compras, despesas, pagamentos e relatórios.",
    areas: ["Full Stack", "Dados"],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
    status: "Demonstração",
    repo: gh + "appChurrasco",
    demo: "https://app-churrasco-nine.vercel.app/",
    visual: "app",
    color: "orange",
    features: [
      "Autenticação Google com Supabase",
      "Eventos e convites individuais",
      "Cálculos de compras e rateio de despesas",
      "Relatórios em PDF e Excel",
      "Políticas RLS e armazenamento privado",
    ],
    problem:
      "Centralizar confirmações, planejamento das compras e divisão dos custos de um churrasco.",
    technical:
      "Separação entre convidados e organizador, autorização no servidor, regras de rateio e persistência com PostgreSQL.",
    architecture: [
      "Next.js + React",
      "Rotas HTTP autenticadas",
      "Supabase Auth",
      "PostgreSQL + RLS",
    ],
    note: "O painel exige a conta autorizada pelo organizador.",
    endpoints: [
      "/api/eventos",
      "/api/convidados",
      "/api/despesas",
      "/api/pagamentos",
    ],
    source: gh + "appChurrasco/blob/main/README.md",
  },
  {
    slug: "gestao-api",
    title: "Gestão API",
    subtitle: "Clientes e serviços, organizados em uma API.",
    description:
      "API Java para cadastro de clientes, serviços prestados e pesquisa por nome e mês.",
    areas: ["Backend & APIs", "Dados"],
    technologies: ["Java", "Spring Boot", "SQL", "H2"],
    status: "Projeto de estudo",
    repo: gh + "gestaoAPI",
    visual: "api",
    color: "blue",
    features: [
      "Cadastro, listagem, atualização e exclusão de clientes",
      "Registro de serviços vinculados a clientes",
      "Busca de serviços por nome e mês",
      "Validação de entradas e respostas de erro",
    ],
    problem:
      "Modelar o relacionamento entre clientes e serviços e disponibilizar operações por HTTP.",
    technical:
      "Controladores REST, repositórios JPA, DTO de serviço e conversão de valores monetários.",
    architecture: [
      "Requisição HTTP",
      "Controller / DTO",
      "Spring Data JPA",
      "H2",
    ],
    endpoints: [
      "GET /api/clientes",
      "POST /api/clientes",
      "GET /api/clientes/{id}",
      "PUT /api/clientes/{id}",
      "DELETE /api/clientes/{id}",
      "GET /api/servicos-prestados",
      "POST /api/servicos-prestados",
    ],
    note: "Projeto backend — código disponível no GitHub. README a adicionar; frontend referenciado por submódulo precisa de revisão. Não há autenticação confirmada na implementação consultada.",
    source:
      gh + "gestaoAPI/tree/main/src/main/java/mendes44/github/com/cliente/rest",
  },
  {
    slug: "linux-ssh",
    title: "Linux & SSH",
    subtitle: "Acesso remoto, configuração e diagnóstico.",
    description:
      "Laboratório de administração de Ubuntu Server com SSH, firewall e rede NAT.",
    areas: ["Redes & Linux"],
    technologies: ["Linux", "Ubuntu", "SSH", "UFW"],
    status: "Projeto de estudo",
    repo: gh + "Lab01-Linux-SSH",
    visual: "terminal",
    color: "purple",
    features: [
      "Ubuntu Server em VirtualBox",
      "Autenticação por chave ED25519",
      "Firewall UFW e permissões Linux",
      "Diagnóstico de DNS, portas e conectividade",
      "Verificação de autenticação em logs",
    ],
    problem:
      "Preparar um servidor virtual para administração remota e documentar como diagnosticar falhas de acesso.",
    technical:
      "Redirecionamento NAT, permissões restritivas, configuração do cliente OpenSSH e validação nos logs do systemd.",
    architecture: [
      "Windows / PowerShell",
      "NAT do VirtualBox",
      "OpenSSH / ED25519",
      "Ubuntu + UFW",
    ],
    source: gh + "Lab01-Linux-SSH/blob/main/README.md",
  },
  {
    slug: "contratos",
    title: "Parcelamento de contratos",
    subtitle: "Regras de negócio com interfaces Java.",
    description:
      "Geração de parcelas com vencimentos, juros e taxas em uma aplicação de terminal.",
    areas: ["Automação", "Acadêmicos"],
    technologies: ["Java"],
    status: "Projeto de estudo",
    repo: gh + "ContractPaymentAutomation",
    visual: "terminal",
    color: "orange",
    features: [
      "Entrada do contrato e quantidade de parcelas",
      "Vencimentos mensais com LocalDate",
      "Cálculo de juros e taxa por parcela",
      "Serviço desacoplado por interface",
    ],
    problem:
      "Calcular um cronograma de parcelas a partir do valor e da data de um contrato.",
    technical:
      "Composição e injeção de um OnlinePaymentService no serviço de contratos.",
    architecture: [
      "Entrada no terminal",
      "ContractService",
      "OnlinePaymentService",
      "Lista de parcelas",
    ],
    note: "Simulação local de regras de pagamento. A classe PayPalService calcula taxas; não executa pagamentos reais nem integra a API do PayPal.",
    source: gh + "ContractPaymentAutomation/tree/main/src/services",
  },
  {
    slug: "aluguel-veiculos",
    title: "Aluguel de veículos",
    subtitle: "Do período de locação à fatura.",
    description:
      "Cálculo de locação por hora ou diária, com impostos e emissão de resumo no terminal.",
    areas: ["Acadêmicos"],
    technologies: ["Java"],
    status: "Projeto de estudo",
    repo: gh + "car-park",
    visual: "terminal",
    color: "green",
    features: [
      "Entrada de retirada e retorno",
      "Cobrança por hora ou diária",
      "Cálculo de impostos via interface",
      "Resumo da fatura",
    ],
    problem:
      "Transformar o tempo de locação e as tarifas em um valor final de cobrança.",
    technical:
      "Duration para períodos, arredondamento de horas e dias e separação das regras tributárias.",
    architecture: ["CarRental", "RentalService", "TaxService", "Invoice"],
    source: gh + "car-park/tree/main/src/model/services",
  },
  {
    slug: "csv-java",
    title: "Processamento de CSV",
    subtitle: "Arquivos de entrada, dados de saída.",
    description:
      "Leitura de itens vendidos e geração de um resumo CSV com o total de cada produto.",
    areas: ["Dados", "Automação", "Acadêmicos"],
    technologies: ["Java", "CSV"],
    status: "Projeto de estudo",
    repo: gh + "LendoeEscrevendoCsv",
    visual: "data",
    color: "purple",
    features: [
      "Leitura de nome, preço e quantidade",
      "Cálculo do total por produto",
      "Criação de out/summary.csv",
      "Tratamento de falhas de leitura e gravação",
    ],
    problem:
      "Consolidar os valores de itens vendidos em um arquivo de saída reutilizável.",
    technical:
      "BufferedReader, BufferedWriter, modelagem de produtos e fechamento de recursos com try-with-resources.",
    architecture: [
      "CSV de entrada",
      "Product",
      "Preço × quantidade",
      "summary.csv",
    ],
    note: "Exercício com CSV simples; arquivos com aspas, vírgulas em campos e entradas inválidas precisam de tratamento adicional.",
    source:
      gh +
      "LendoeEscrevendoCsv/blob/main/src/manipulacaoDados/ManipulandoArquivosPastas.java",
  },
  {
    slug: "xadrez-java",
    title: "Xadrez em Java",
    subtitle: "Orientação a objetos em cada jogada.",
    description:
      "Partida de xadrez no terminal com tabuleiro, movimentos, capturas e promoção de peças.",
    areas: ["Acadêmicos"],
    technologies: ["Java"],
    status: "Projeto de estudo",
    repo: gh + "projeto-jogodexadrez",
    visual: "terminal",
    color: "blue",
    features: [
      "Origem e destino de jogadas",
      "Exibição de movimentos possíveis",
      "Registro de peças capturadas",
      "Fluxo de promoção e tratamento de exceções",
    ],
    problem:
      "Representar peças, posições e regras de uma partida usando orientação a objetos.",
    technical:
      "Separação entre tabuleiro, peças, partida e interface de terminal, usando herança e composição.",
    architecture: ["Terminal / UI", "ChessMatch", "ChessPiece", "Board"],
    note: "Projeto de estudo. O fluxo de entrada inválida na promoção precisa de revisão.",
    source: gh + "projeto-jogodexadrez/blob/main/src/application/Program.java",
  },
  {
    slug: "pedidos-java",
    title: "Sistema de pedidos",
    subtitle: "Modelagem de um pedido, item a item.",
    description:
      "Simulação de cadastro de pedidos para praticar entidades, composição, listas e estados.",
    areas: ["Acadêmicos"],
    technologies: ["Java"],
    status: "Projeto de estudo",
    repo: gh + "programPedidos",
    visual: "terminal",
    color: "rust",
    features: [
      "Cadastro de pedido em aplicação de terminal",
      "Modelagem com classes e composição",
      "Lista de itens e enumeração de estados",
    ],
    problem:
      "Organizar os dados e o estado de um pedido em entidades relacionadas.",
    technical:
      "Uso de enumerações, listas, datas e composição para representar o domínio.",
    architecture: ["Entrada de dados", "Pedido", "Itens", "Resumo"],
    source: gh + "programPedidos/blob/main/README.md",
  },
  {
    slug: "feriados",
    title: "Calendário de feriados",
    subtitle: "Os próximos feriados no terminal.",
    description:
      "Consulta de feriados nacionais fixos com filtro por data e saída formatada.",
    areas: ["Acadêmicos", "Automação"],
    technologies: ["JavaScript", "Node.js"],
    status: "Projeto de estudo",
    repo: gh + "Calendario-Feriados",
    visual: "terminal",
    color: "green",
    features: [
      "Quantidade de resultados escolhida pelo usuário",
      "Filtro dos próximos feriados",
      "Data e dia da semana formatados",
      "Organização em dados, serviços e exibição",
    ],
    problem:
      "Consultar as próximas datas a partir de uma lista de feriados fixos.",
    technical: "Separação por camadas e manipulação de datas em JavaScript.",
    architecture: [
      "index.js",
      "Serviço de filtros",
      "Dados de feriados",
      "Exibição no terminal",
    ],
    note: "A lista não calcula automaticamente feriados móveis.",
    source: gh + "Calendario-Feriados/blob/main/README.md",
  },
  {
    slug: "salario-inflacao",
    title: "Salário × inflação",
    subtitle: "JavaScript aplicado à comparação de dados.",
    description:
      "Consulta de séries locais e comparação percentual entre crescimento salarial e IPCA.",
    areas: ["Dados", "Acadêmicos"],
    technologies: ["JavaScript", "Node.js"],
    status: "Projeto de estudo",
    repo: gh + "SalarioVsInflacao",
    visual: "data",
    color: "blue",
    features: [
      "Consulta de valores por ano",
      "Cálculo da variação percentual",
      "Comparação com IPCA",
      "Formatação de moeda e percentuais",
    ],
    problem:
      "Praticar a comparação de séries anuais e apresentar os resultados de forma legível.",
    technical:
      "Arrays de objetos, iteração, menu no terminal e fórmulas percentuais.",
    architecture: [
      "Séries locais",
      "Menu Node.js",
      "Cálculo percentual",
      "Tabela no terminal",
    ],
    note: "Exercício com dados estáticos. Não é uma fonte de indicadores econômicos atualizados.",
    source: gh + "SalarioVsInflacao/blob/main/README.md",
  },
  {
    slug: "jogo-memoria",
    title: "Jogo da memória",
    subtitle: "Lógica e organização em camadas.",
    description:
      "Jogo de pares no terminal com validação de escolhas e testes das regras da partida.",
    areas: ["Acadêmicos"],
    technologies: ["JavaScript", "Node.js"],
    status: "Projeto de estudo",
    repo: gh + "JogoDaMemoria",
    visual: "terminal",
    color: "purple",
    features: [
      "Baralho de oito pares",
      "Validação de escolhas e comparação de cartas",
      "Condições de vitória e derrota",
      "Testes de regras e de uma partida completa",
    ],
    problem:
      "Implementar um jogo de memória separando suas regras da entrada e saída no terminal.",
    technical:
      "Controlador, serviço e exibição com testes automatizados descritos no repositório.",
    architecture: [
      "Terminal",
      "Controlador",
      "Serviço do jogo",
      "Configuração de cartas",
    ],
    source: gh + "JogoDaMemoria/blob/main/README.md",
  },
];
export function filterProjects(
  area: string,
  technology: string,
  query: string,
) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return projects.filter(
    (p) =>
      (area === "Todos" || p.areas.includes(area as Area)) &&
      (technology === "Todas" || p.technologies.includes(technology)) &&
      normalize(
        `${p.title} ${p.description} ${p.technologies.join(" ")}`,
      ).includes(normalize(query.trim())),
  );
}
