export const SITE = {
  name: "Matheus Zenziski",
  short: "Matheus",
  role: "Engenheiro de Software",
  focus: "Backend, arquitetura distribuída e IA aplicada",
  email: "matheus.zenziski@gmail.com",
  location: "Curitiba, Brasil",
  timezone: "UTC-3",
  status: "disponível para novos projetos",
  socials: {
    linkedin: "https://www.linkedin.com/in/matheus-zenz",
  },
} as const;

export const NAV_ITEMS = [
  { id: "capa", label: "capa" },
  { id: "profissional", label: "o trabalho" },
  { id: "pessoal", label: "o pessoal" },
  { id: "contato", label: "contato" },
] as const;

export type Area = "profissional" | "pessoal";

export const PROFILE = {
  eyebrow: "caderno de campo · vol. 01",
  tagline: "anotações, código e umas ideias rabiscadas sobre o mundo.",
  shortIntro:
    "Engenheiro de software com 6+ anos em sistemas distribuídos, cloud e IA. Gosto de problemas grandes, times pequenos e cadernos que cabem no bolso.",
  intro:
    "Sou engenheiro de software há 6+ anos, construindo sistemas que precisam aguentar o tranco: plataformas financeiras, SaaS corporativo, arquiteturas distribuídas e, mais recentemente, agentes de IA em produção. Gosto de problemas grandes, times pequenos e cadernos que cabem no bolso.",
  note:
    "trabalho com backend, mas o que me move é entender como as peças se encaixam.",
  availability: "aberto a conversas sobre backend, IA e produto",
} as const;

export const APPROACH: string[] = [
  "começo pelo problema, não pela stack.",
  "prefiro sistemas simples de operar a arquiteturas impressionantes no papel.",
  "documento decisões — o futuro eu agradece.",
  "trabalho perto do produto e longe de hype.",
];

export interface Stat {
  value: string;
  label: string;
  note: string;
}

export const STATS: Stat[] = [
  { value: "6+", label: "anos de estrada", note: "fintech, SaaS e cloud" },
  { value: "-80%", label: "custo de infra", note: "de US$ 40k a US$ 8k/mês" },
  { value: "10x", label: "latência em pico", note: "sem perder estabilidade" },
  { value: "6k", label: "pessoas atendidas", note: "zero downtime crítico" },
];

export interface Project {
  id: string;
  name: string;
  type: "app" | "api" | "infra" | "site";
  status: "online" | "progress" | "archived";
  year: string;
  role: string;
  tagline: string;
  note: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  impact: string;
  code: { file: string; lang: string; lines: string[] };
  links: { demo?: string; repo?: string };
}

export const PROJECTS: Project[] = [
  {
    id: "ai-agents-platform",
    name: "plataforma de agentes de IA",
    type: "api",
    status: "online",
    year: "2025",
    role: "arquitetura & backend",
    tagline:
      "Microsserviços orquestrando agentes autônomos e chatbots conversacionais.",
    note: "meu problema favorito até hoje: escala sem queimar tokens.",
    problem:
      "A operação precisava escalar o atendimento com agentes de IA sem multiplicar custo de infraestrutura, consumo de tokens e latência.",
    solution:
      "Arquitetei uma plataforma de microsserviços em TypeScript com Azure Service Bus, pipeline assíncrono de LLM com otimização de prompts e streaming, além de RAG com cache semântico em Redis.",
    stack: ["TypeScript", "Azure Service Bus", "IBM Watsonx", "Redis", "RAG", "LLM"],
    metrics: [
      { label: "custo de infra", value: "-45%" },
      { label: "consumo de tokens", value: "reduzido" },
      { label: "throughput", value: "aumentado" },
    ],
    impact:
      "Custo de infraestrutura 45% menor, com mais throughput e qualidade de resposta em produção.",
    code: {
      file: "src/agents/orchestrator.ts",
      lang: "ts",
      lines: [
        "const agent = await orchestrator.run({",
        "  workflow: 'support-triage',",
        "  context: await knowledgeBase.search(query),",
        "  cache: redis.semantic({ ttl: 3600 })",
        "});",
        "",
        "return stream(agent, { onToken: emit });",
      ],
    },
    links: {},
  },
  {
    id: "legacy-ecommerce-cloud",
    name: "e-commerce legado → cloud",
    type: "infra",
    status: "online",
    year: "2025",
    role: "modernização",
    tagline:
      "Modernização de um e-commerce legado para arquitetura cloud-native no Azure.",
    note: "às vezes o melhor código é o que você consegue apagar.",
    problem:
      "O e-commerce legado custava US$ 40 mil/mês e tinha baixa elasticidade para acompanhar picos de demanda.",
    solution:
      "Modernizei a plataforma para uma arquitetura cloud-native no Azure, com serviços gerenciados, containers e automação de infraestrutura.",
    stack: ["Azure", "Docker", "Kubernetes", "CI/CD", "Node.js"],
    metrics: [
      { label: "custo mensal", value: "-80%" },
      { label: "economia/mês", value: "US$ 32K" },
      { label: "arquitetura", value: "cloud-native" },
    ],
    impact:
      "Custo mensal reduzido de US$ 40 mil para US$ 8 mil — US$ 32 mil/mês de economia.",
    code: {
      file: "infra/ecommerce.bicep",
      lang: "bicep",
      lines: [
        "resource webApp 'Microsoft.Web/sites@2023-12-01' = {",
        "  name: 'ecommerce-prod'",
        "  location: 'brazilsouth'",
        "  properties: {",
        "    siteConfig: {",
        "      linuxFxVersion: 'NODE|20-lts'",
        "    }",
        "  }",
        "}",
      ],
    },
    links: {},
  },
  {
    id: "delivery-microservice",
    name: "microsserviço de entregas",
    type: "api",
    status: "online",
    year: "2024",
    role: "backend",
    tagline: "Serviço de entregas de alta vazão com Python e FastAPI.",
    note: "pico de tráfego é onde o design aparece de verdade.",
    problem:
      "O serviço de entregas degradava sob tráfego de pico, elevando o tempo de resposta da operação.",
    solution:
      "Desenvolvi um microsserviço de alta vazão em Python e FastAPI, com processamento assíncrono e otimização de I/O.",
    stack: ["Python", "FastAPI", "Redis", "Docker"],
    metrics: [
      { label: "latência em pico", value: "10x" },
      { label: "throughput", value: "alto" },
      { label: "stack", value: "FastAPI" },
    ],
    impact: "Tempos de resposta 10x melhores sob pico, sem perda de estabilidade.",
    code: {
      file: "app/main.py",
      lang: "py",
      lines: [
        "@app.post('/deliveries')",
        "async def create_delivery(payload: DeliveryIn):",
        "    delivery = await service.create(payload)",
        "    await queue.publish('delivery.created', delivery.id)",
        "    return delivery",
      ],
    },
    links: {},
  },
  {
    id: "recruitment-platform",
    name: "plataforma de recrutamento",
    type: "app",
    status: "online",
    year: "2024",
    role: "arquitetura & backend",
    tagline:
      "Plataforma orientada a eventos para 6.000 consultores de vendas.",
    note: "6 mil pessoas usando algo que eu desenhei no papel.",
    problem:
      "A operação de recrutamento precisava suportar milhares de consultores e transações de crédito sem indisponibilidade crítica.",
    solution:
      "Construí uma plataforma orientada a eventos, com serviços desacoplados e processamento resiliente para acompanhar o volume.",
    stack: ["Node.js", "TypeScript", "Event-Driven", "PostgreSQL", "Docker"],
    metrics: [
      { label: "consultores ativos", value: "6.000" },
      { label: "crédito transacionado", value: "R$ 27 bi" },
      { label: "downtime crítico", value: "0" },
    ],
    impact:
      "6.000 consultores ativos e R$ 27 bilhões transacionados com zero downtime crítico.",
    code: {
      file: "src/events/on-candidate-hired.ts",
      lang: "ts",
      lines: [
        "export async function onCandidateHired(event: CandidateHired) {",
        "  await Promise.all([",
        "    onboarding.start(event.candidateId),",
        "    credits.reserve(event.creditAmount),",
        "    analytics.track('hired', event),",
        "  ]);",
        "}",
      ],
    },
    links: {},
  },
  {
    id: "multi-tenant-api",
    name: "APIs multi-tenant",
    type: "api",
    status: "online",
    year: "2023",
    role: "backend",
    tagline:
      "APIs REST white-label com isolamento dinâmico de tenants e feature flags.",
    note: "um código, muitos clientes, nenhum vazamento.",
    problem:
      "O onboarding de clientes white-label era lento e exigia customizações manuais por tenant.",
    solution:
      "Arquitetei APIs REST multi-tenant em Node.js e Express.js, com isolamento dinâmico de tenants e feature flags.",
    stack: ["Node.js", "Express.js", "TypeScript", "Feature Flags", "PostgreSQL"],
    metrics: [
      { label: "onboarding", value: "-30%" },
      { label: "isolamento", value: "multi-tenant" },
      { label: "feature flags", value: "dinâmico" },
    ],
    impact:
      "Tempo de integração de clientes reduzido em 30%, com isolamento e configuração por tenant.",
    code: {
      file: "src/middleware/tenant.ts",
      lang: "ts",
      lines: [
        "export function tenantResolver(req: Request, _res, next: NextFunction) {",
        "  const tenant = req.headers['x-tenant-id'];",
        "  if (!tenant) throw new UnauthorizedError();",
        "  req.tenant = tenants.load(tenant);",
        "  next();",
        "}",
      ],
    },
    links: {},
  },
  {
    id: "serasa-cache",
    name: "cache de consultas SERASA",
    type: "infra",
    status: "online",
    year: "2023",
    role: "backend & infra",
    tagline: "Camada de cache Redis para consultas de crédito com TTL adaptativo.",
    note: "economizar às vezes é uma questão de lembrar da resposta.",
    problem:
      "As consultas recorrentes aos birôs de crédito geravam custo alto e latência desnecessária.",
    solution:
      "Implementei uma camada de cache Redis de alta concorrência com TTL adaptativo para consultas ao SERASA.",
    stack: ["Redis", "Node.js", "TypeScript", "Cache", "TTL"],
    metrics: [
      { label: "custo de consultas", value: "-70%" },
      { label: "concorrência", value: "alta" },
      { label: "TTL", value: "adaptativo" },
    ],
    impact: "Redução de mais de 70% no custo de consultas a birôs de crédito.",
    code: {
      file: "src/cache/serasa.ts",
      lang: "ts",
      lines: [
        "async function querySerasa(document: string) {",
        "  const key = `serasa:${document}`;",
        "  const cached = await redis.get(key);",
        "  if (cached) return JSON.parse(cached);",
        "",
        "  const result = await serasa.query(document);",
        "  await redis.set(key, JSON.stringify(result), 'EX', adaptiveTtl(result));",
        "  return result;",
        "}",
      ],
    },
    links: {},
  },
  {
    id: "tax-compliance-saas",
    name: "SaaS de conformidade fiscal",
    type: "app",
    status: "online",
    year: "2023",
    role: "backend & produto",
    tagline: "Backend multi-tier com automação de OCR na Google Cloud.",
    note: "documento fiscal virando dado útil em menos de 30 segundos.",
    problem:
      "O processo de conformidade fiscal era manual e consumia horas operacionais por cliente.",
    solution:
      "Construí o backend multi-tier de um SaaS fiscal com NestJS, PostgreSQL e React na GCP, além de pipeline de OCR com Python e GCP Cloud Functions.",
    stack: ["NestJS", "PostgreSQL", "React", "GCP", "Python", "OCR"],
    metrics: [
      { label: "horas economizadas", value: "90+/mês" },
      { label: "latência OCR", value: "<30s" },
      { label: "economia anual", value: "US$ 9K" },
    ],
    impact:
      "Mais de 90 horas mensais economizadas por cliente e parsing de documentos em menos de 30 segundos.",
    code: {
      file: "src/tax/tax.service.ts",
      lang: "ts",
      lines: [
        "@Injectable()",
        "export class TaxCalculationService {",
        "  constructor(private readonly repo: TaxRepository) {}",
        "",
        "  async calculate(tenantId: string, period: Period) {",
        "    const rules = await this.repo.rules(tenantId, period);",
        "    return rules.reduce(applyRule, baseAmount(period));",
        "  }",
        "}",
      ],
    },
    links: {},
  },
  {
    id: "loan-origination",
    name: "originação de empréstimos",
    type: "app",
    status: "online",
    year: "2022",
    role: "backend",
    tagline: "Serviço de crédito com garantia de veículos, do zero ao contrato.",
    note: "máquina de estados é poesia com regras de negócio.",
    problem:
      "O ciclo de aprovação de crédito com garantia de veículos era longo e dependia de entrada manual.",
    solution:
      "Desenvolvi o serviço de originação com JavaScript, MongoDB e APIs Salesforce, refatorando fluxos de aprovação e máquinas de estado.",
    stack: ["JavaScript", "MongoDB", "Salesforce", "State Machine", "Node.js"],
    metrics: [
      { label: "crédito originado", value: "R$ 2 mi" },
      { label: "janela", value: "90 dias" },
      { label: "ciclo de venda", value: "30min → 5min" },
    ],
    impact:
      "Mais de R$ 2 milhões processados em 90 dias e ciclo de fechamento reduzido de 30+ minutos para menos de 5.",
    code: {
      file: "src/loans/approval.ts",
      lang: "ts",
      lines: [
        "const approval = stateMachine({",
        "  idle: { submit: 'analysis' },",
        "  analysis: { approve: 'approved', reject: 'rejected' },",
        "  approved: { sign: 'closed' }",
        "});",
        "",
        "await approval.transition('submit');",
        "await salesforce.sync({ opportunity: loan.id });",
      ],
    },
    links: {},
  },
];

export interface ExperienceNode {
  date: string;
  period: string;
  role: string;
  company: string;
  place: string;
  bullets: string[];
  current?: boolean;
}

export const EXPERIENCE: ExperienceNode[] = [
  {
    date: "abr 2025",
    period: "abr 2025 — hoje",
    role: "Engenheiro de Software Sênior",
    company: "MBRF",
    place: "Curitiba · remoto",
    current: true,
    bullets: [
      "Arquitetei uma plataforma de microsserviços orquestrando agentes de IA autônomos e chatbots conversacionais com TypeScript e Azure Service Bus, reduzindo custos de infraestrutura em 45%.",
      "Desenvolvi um pipeline assíncrono de orquestração de LLM com otimização de prompts e streaming de respostas, reduzindo consumo de tokens e latência.",
      "Integrei bases de conhecimento corporativas com RAG e cache semântico em Redis, eliminando inferências redundantes e aumentando o throughput.",
      "Modernizei uma plataforma de e-commerce legada para arquitetura cloud-native no Azure, reduzindo custos mensais de US$ 40 mil para US$ 8 mil.",
      "Desenvolvi um microsserviço de entregas de alta vazão com Python e FastAPI, melhorando os tempos de resposta em 10x sob pico.",
    ],
  },
  {
    date: "out 2023",
    period: "out 2023 — mar 2025",
    role: "Engenheiro de Software",
    company: "Ademicon",
    place: "Curitiba",
    bullets: [
      "Desenvolvi uma plataforma de recrutamento escalável e orientada a eventos, com 6.000 consultores ativos e R$ 27 bilhões em créditos transacionados com zero indisponibilidade crítica.",
      "Arquitetei APIs REST multi-tenant white-label com Node.js e Express.js, com isolamento dinâmico de tenants e feature flags, reduzindo o onboarding em 30%.",
      "Reduzi em mais de 70% os custos de consultas a birôs de crédito (SERASA) com uma camada de cache Redis de alta concorrência e TTL adaptativo.",
      "Configurei pipelines de CI/CD com GitHub Actions e Docker, acelerando releases e garantindo qualidade com suítes Jest.",
    ],
  },
  {
    date: "dez 2022",
    period: "dez 2022 — jul 2023",
    role: "Engenheiro de Software",
    company: "Stage Consulting",
    place: "remoto",
    bullets: [
      "Construí o backend multi-tier de um SaaS de conformidade fiscal com NestJS, PostgreSQL e React na GCP, economizando mais de 90 horas mensais por cliente.",
      "Projetei um pipeline de extração de documentos e OCR com Python e GCP Cloud Functions, reduzindo a latência de parsing para menos de 30 segundos.",
      "Desenvolvi uma integração corporativa com PowerPoint em C# (.NET) para relatórios automatizados, economizando US$ 9.000 anuais.",
    ],
  },
  {
    date: "jan 2021",
    period: "jan 2021 — dez 2022",
    role: "Engenheiro de Software",
    company: "Ademicon",
    place: "Curitiba",
    bullets: [
      "Arquitetei pipelines de integração transacional com ERP usando Node.js e PostgreSQL durante uma transição de M&A, automatizando a sincronização de dados.",
      "Desenvolvi um serviço de originação de empréstimos com garantia de veículos integrando JavaScript, MongoDB e APIs Salesforce, processando mais de R$ 2 milhões nos primeiros 90 dias.",
      "Refatorei fluxos de aprovação de crédito e máquinas de estado, reduzindo o ciclo de fechamento de vendas de mais de 30 minutos para menos de 5.",
    ],
  },
];

export interface StackGroup {
  label: string;
  tint: "sage" | "sky" | "mint";
  items: string[];
}

export const STACK_GROUPS: StackGroup[] = [
  {
    label: "linguagens",
    tint: "sage",
    items: ["TypeScript", "JavaScript", "Python", "C# / .NET", "SQL"],
  },
  {
    label: "back-end",
    tint: "sky",
    items: ["Node.js", "NestJS", "Express.js", "FastAPI", "APIs REST"],
  },
  {
    label: "dados & mensageria",
    tint: "mint",
    items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "Service Bus"],
  },
  {
    label: "cloud & infra",
    tint: "sky",
    items: ["Azure", "AWS", "GCP", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    label: "IA aplicada",
    tint: "sage",
    items: ["LLM APIs", "RAG", "Agentes", "Watsonx", "Vector DBs", "Prompt design"],
  },
  {
    label: "jeito de trabalhar",
    tint: "mint",
    items: ["event-driven", "multi-tenant", "observabilidade", "CI/CD", "design docs"],
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tint: "sage" | "sky" | "mint" | "sticky";
}

export const SERVICES: Service[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "APIs REST e serviços backend para produtos financeiros e SaaS corporativos, com foco em confiabilidade, multi-tenancy e integração.",
    deliverables: ["Node.js · TypeScript · NestJS", "Python · FastAPI", "APIs REST multi-tenant"],
    tint: "sage",
  },
  {
    id: "distributed",
    title: "Arquitetura distribuída",
    description:
      "Microsserviços e arquiteturas orientadas a eventos em Azure, AWS e GCP, com mensageria, containers e CI/CD.",
    deliverables: ["Microsserviços e event-driven", "Kafka · RabbitMQ · Service Bus", "Kubernetes · Docker"],
    tint: "sky",
  },
  {
    id: "ai",
    title: "IA & LLM",
    description:
      "Orquestração de LLMs e agentes autônomos em produção, com RAG, otimização de prompts e cache semântico.",
    deliverables: ["Agentic workflows", "RAG · Vector DBs", "Prompt optimization"],
    tint: "mint",
  },
  {
    id: "modernization",
    title: "Modernização",
    description:
      "Plataformas legadas para cloud-native, com redução de custo, latência e dívida técnica.",
    deliverables: ["Migração cloud-native", "Otimização de latência", "Redução de custos"],
    tint: "sticky",
  },
];

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    institution: "Pontifícia Universidade Católica do Paraná",
    degree: "Pós-Graduação em Arquitetura de Soluções",
    period: "em andamento · previsão 2027",
  },
  {
    institution: "UNINTER Centro Universitário Internacional",
    degree: "Bacharelado em Engenharia da Computação",
    period: "2019 — 2024",
  },
];

export interface LanguageEntry {
  language: string;
  level: string;
}

export const LANGUAGES: LanguageEntry[] = [
  { language: "Português", level: "nativo" },
  { language: "Inglês", level: "fluente / profissional" },
];

/* --------------------------------------------------------------------------
   Lado pessoal — edite à vontade. Este é o caderno de gostos, não o currículo.
   -------------------------------------------------------------------------- */

export interface NowItem {
  label: string;
  value: string;
  detail: string;
  tint: "sage" | "sky" | "sticky" | "mint";
}

export const NOW: NowItem[] = [
  {
    label: "lendo",
    value: "Neuromancer",
    detail: "William Gibson · 1984",
    tint: "sage",
  },
  {
    label: "assistindo",
    value: "Severance",
    detail: "temporada 2, devagar",
    tint: "sky",
  },
  {
    label: "jogando",
    value: "Outer Wilds",
    detail: "de novo. sempre.",
    tint: "sticky",
  },
  {
    label: "ouvindo",
    value: "Bonobo — Kerala",
    detail: "no repeat há dias",
    tint: "mint",
  },
  {
    label: "estudando",
    value: "design de sistemas",
    detail: "rabiscos no caderno",
    tint: "sky",
  },
  {
    label: "tomando",
    value: "café coado",
    detail: "mais um, com certeza",
    tint: "sage",
  },
];

export interface Film {
  title: string;
  year: string;
  note: string;
}

export const FILMS: Film[] = [
  {
    title: "Blade Runner 2049",
    year: "2017",
    note: "luz, silêncio e solidão de andróide. revisito sempre.",
  },
  {
    title: "Interestelar",
    year: "2014",
    note: "chorei na cena das mensagens. não nego.",
  },
  {
    title: "O Fabuloso Destino de Amélie Poulain",
    year: "2001",
    note: "pequenos gestos também são uma tecnologia.",
  },
  {
    title: "Tudo em Todo Lugar ao Mesmo Tempo",
    year: "2022",
    note: "caos, mães e montagem. preciso de mais filmes assim.",
  },
  {
    title: "Perfect Days",
    year: "2023",
    note: "sobre fazer o comum com atenção.",
  },
  {
    title: "O Senhor dos Anéis: O Retorno do Rei",
    year: "2003",
    note: "minha definição de escala épica.",
  },
];

export interface Book {
  title: string;
  author: string;
  note: string;
}

export const BOOKS: Book[] = [
  {
    title: "Neuromancer",
    author: "William Gibson",
    note: "o futuro com cheiro de chuva e neon.",
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    note: "primeiro livro que me fez querer desenhar mapas.",
  },
  {
    title: "O Guia do Mochileiro das Galáxias",
    author: "Douglas Adams",
    note: "toalha, pessimismo e piadas com o infinito.",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    note: "discordo de metade, gosto do outro tanto.",
  },
  {
    title: "A Insustentável Leveza do Ser",
    author: "Milan Kundera",
    note: "leveza que pesa.",
  },
  {
    title: "A Mão Esquerda da Escuridão",
    author: "Ursula K. Le Guin",
    note: "worldbuilding como argumento moral.",
  },
];

export interface Game {
  title: string;
  year: string;
  note: string;
}

export const GAMES: Game[] = [
  {
    title: "Outer Wilds",
    year: "2019",
    note: "o melhor uso de curiosidade como mecânica.",
  },
  {
    title: "Hollow Knight",
    year: "2017",
    note: "silêncio, insetos e um mapa que não te segura pela mão.",
  },
  {
    title: "Zelda: Breath of the Wild",
    year: "2017",
    note: "liberdade para esquecer a missão principal.",
  },
  {
    title: "Death Stranding",
    year: "2019",
    note: "andar, conectar, entregar. estranhamente sobre mim.",
  },
  {
    title: "Celeste",
    year: "2018",
    note: "difícil e gentil na medida certa.",
  },
  {
    title: "Disco Elysium",
    year: "2019",
    note: "um RPG que é mais sobre pensar do que lutar.",
  },
];

export interface Music {
  artist: string;
  note: string;
}

export const MUSIC: Music[] = [
  { artist: "Bonobo", note: "para programar sem pensar." },
  { artist: "Nujabes", note: "lo-fi antes de virar gênero." },
  { artist: "Radiohead", note: "a trilha de noites longas." },
  { artist: "Tame Impala", note: "quando quero um pouco de cor." },
  { artist: "Chico Buarque", note: "letras que funcionam como code review da vida." },
  { artist: "C418", note: "o som de um mundo inventado." },
];

export interface Hobby {
  title: string;
  note: string;
}

export const HOBBIES: Hobby[] = [
  { title: "pontilhismo", note: "desenhar em pontos, pacientemente." },
  { title: "café", note: "coados, pesados, um ritual." },
  { title: "fotografia analógica", note: "36 fotos por rolo. menos escolhas, mais intenção." },
  { title: "caminhadas", note: "longas, sem destino, com podcast." },
  { title: "astronomia amadora", note: "levantar o olho e me sentir pequeno." },
  { title: "teclados mecânicos", note: "um hobby barulhento." },
  { title: "cozinhar", note: "receitas são algoritmos com sabor." },
  { title: "mapas", note: "adoro um mapa bem desenhado." },
];

export const MANIFESTO: string[] = [
  "software bom é software em que se confia sem pensar nisso.",
  "gosto de complexidade que se resolve, não que se esconde.",
  "o corpo precisa de pausa; o cérebro também.",
  "curiosidade é um método de trabalho.",
  "aprender em público é mais honesto.",
];
