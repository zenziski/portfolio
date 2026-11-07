export const SITE = {
  name: "Matheus Zenziski",
  version: "v2.6.0",
  role: "Engenheiro Backend Sênior",
  email: "matheus.zenziski@gmail.com",
  location: "Curitiba, PR · Remote (UTC-3)",
  status: "ABERTO A OPORTUNIDADES",
  socials: {
    linkedin: "https://www.linkedin.com/in/matheus-zenz",
  },
} as const;

export const NAV_ITEMS = [
  { key: "1", label: "Projetos", href: "#projetos", section: "projetos" },
  { key: "2", label: "Git Log", href: "#experiencia", section: "experiencia" },
  { key: "3", label: "Competências", href: "#competencias", section: "competencias" },
  { key: "4", label: "Formação", href: "#formacao", section: "formacao" },
  { key: "5", label: "Contato", href: "#contato", section: "contato" },
] as const;

export interface Project {
  id: string;
  name: string;
  type: "app" | "api" | "site" | "infra";
  status: "online" | "progress" | "archived";
  tagline: string;
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
    name: "ai-agents-platform",
    type: "api",
    status: "online",
    tagline: "Plataforma de microsserviços orquestrando agentes de IA autônomos e chatbots conversacionais.",
    problem:
      "A operação precisava escalar o atendimento com agentes de IA sem multiplicar custo de infraestrutura, consumo de tokens e latência.",
    solution:
      "Arquitetei uma plataforma de microsserviços em TypeScript com Azure Service Bus, pipeline assíncrono de LLM com otimização de prompts e streaming, além de RAG com cache semântico em Redis.",
    stack: ["TypeScript", "Azure Service Bus", "IBM Watsonx", "Redis", "RAG", "LLM"],
    metrics: [
      { label: "Custo de infra", value: "-45%" },
      { label: "Consumo de tokens", value: "reduzido" },
      { label: "Throughput", value: "aumentado" },
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
    name: "legacy-ecommerce-cloud",
    type: "infra",
    status: "online",
    tagline: "Modernização de e-commerce legado para arquitetura cloud-native no Azure.",
    problem:
      "O e-commerce legado custava US$ 40 mil/mês e tinha baixa elasticidade para acompanhar picos de demanda.",
    solution:
      "Modernizei a plataforma para uma arquitetura cloud-native no Azure, com serviços gerenciados, containers e automação de infraestrutura.",
    stack: ["Azure", "Docker", "Kubernetes", "CI/CD", "Node.js"],
    metrics: [
      { label: "Custo mensal", value: "-80%" },
      { label: "Economia/mês", value: "US$ 32K" },
      { label: "Arquitetura", value: "cloud-native" },
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
    name: "delivery-microservice",
    type: "api",
    status: "online",
    tagline: "Microsserviço de entregas de alta vazão com Python e FastAPI.",
    problem:
      "O serviço de entregas degradava sob tráfego de pico, elevando o tempo de resposta da operação.",
    solution:
      "Desenvolvi um microsserviço de alta vazão em Python e FastAPI, com processamento assíncrono e otimização de I/O.",
    stack: ["Python", "FastAPI", "Redis", "Docker"],
    metrics: [
      { label: "Latência em pico", value: "10x" },
      { label: "Throughput", value: "alto" },
      { label: "Stack", value: "FastAPI" },
    ],
    impact:
      "Tempos de resposta 10x melhores sob pico, sem perda de estabilidade.",
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
    name: "recruitment-platform",
    type: "app",
    status: "online",
    tagline: "Plataforma de recrutamento orientada a eventos para 6.000 consultores de vendas.",
    problem:
      "A operação de recrutamento precisava suportar milhares de consultores e transações de crédito sem indisponibilidade crítica.",
    solution:
      "Construí uma plataforma orientada a eventos, com serviços desacoplados e processamento resiliente para acompanhar o volume.",
    stack: ["Node.js", "TypeScript", "Event-Driven", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Consultores ativos", value: "6.000" },
      { label: "Crédito transacionado", value: "R$ 27 bi" },
      { label: "Downtime crítico", value: "0" },
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
    name: "multi-tenant-api",
    type: "api",
    status: "online",
    tagline: "APIs REST multi-tenant white-label com isolamento dinâmico e feature flags.",
    problem:
      "O onboarding de clientes white-label era lento e exigia customizações manuais por tenant.",
    solution:
      "Arquitetei APIs REST multi-tenant em Node.js e Express.js, com isolamento dinâmico de tenants e feature flags.",
    stack: ["Node.js", "Express.js", "TypeScript", "Feature Flags", "PostgreSQL"],
    metrics: [
      { label: "Onboarding", value: "-30%" },
      { label: "Isolamento", value: "multi-tenant" },
      { label: "Feature flags", value: "dinâmico" },
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
    name: "serasa-cache",
    type: "infra",
    status: "online",
    tagline: "Camada de cache Redis para consultas SERASA com TTL adaptativo.",
    problem:
      "As consultas recorrentes aos birôs de crédito geravam custo alto e latência desnecessária.",
    solution:
      "Implementei uma camada de cache Redis de alta concorrência com TTL adaptativo para consultas ao SERASA.",
    stack: ["Redis", "Node.js", "TypeScript", "Cache", "TTL"],
    metrics: [
      { label: "Custo de consultas", value: "-70%" },
      { label: "Concorrência", value: "alta" },
      { label: "TTL", value: "adaptativo" },
    ],
    impact:
      "Redução de mais de 70% no custo de consultas a birôs de crédito.",
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
    name: "tax-compliance-saas",
    type: "app",
    status: "online",
    tagline: "SaaS de conformidade fiscal multi-tier com automação de OCR na GCP.",
    problem:
      "O processo de conformidade fiscal era manual e consumia horas operacionais por cliente.",
    solution:
      "Construí o backend multi-tier de um SaaS fiscal com NestJS, PostgreSQL e React na GCP, além de pipeline de OCR com Python e GCP Cloud Functions.",
    stack: ["NestJS", "PostgreSQL", "React", "GCP", "Python", "OCR"],
    metrics: [
      { label: "Horas economizadas", value: "90+/mês" },
      { label: "Latência OCR", value: "<30s" },
      { label: "Economia anual", value: "US$ 9K" },
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
    name: "loan-origination",
    type: "app",
    status: "online",
    tagline: "Serviço de originação de empréstimos com garantia de veículos.",
    problem:
      "O ciclo de aprovação de crédito com garantia de veículos era longo e dependia de entrada manual.",
    solution:
      "Desenvolvi o serviço de originação com JavaScript, MongoDB e APIs Salesforce, refatorando fluxos de aprovação e máquinas de estado.",
    stack: ["JavaScript", "MongoDB", "Salesforce", "State Machine", "Node.js"],
    metrics: [
      { label: "Crédito originado", value: "R$ 2 mi" },
      { label: "Janela", value: "90 dias" },
      { label: "Ciclo de venda", value: "30min → 5min" },
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
  hash: string;
  date: string;
  branch: string;
  role: string;
  company: string;
  bullets: string[];
  current?: boolean;
}

export const EXPERIENCE: ExperienceNode[] = [
  {
    hash: "a1f7c40",
    date: "Abr 2025 — hoje",
    branch: "main",
    role: "Engenheiro de Software Sênior",
    company: "MBRF",
    current: true,
    bullets: [
      "Arquitetei uma plataforma de microsserviços orquestrando agentes de IA autônomos e chatbots conversacionais com TypeScript, Azure Service Bus, reduzindo custos de infraestrutura em 45%.",
      "Desenvolvi um pipeline assíncrono de orquestração de LLM com otimização de prompts e streaming de respostas, reduzindo consumo de tokens e latência e aumentando a qualidade das respostas.",
      "Integrei bases de conhecimento corporativas com RAG e cache semântico em Redis, eliminando inferências redundantes e aumentando significativamente o throughput.",
      "Modernizei uma plataforma de e-commerce legada para arquitetura cloud-native no Azure, reduzindo custos mensais de infraestrutura de US$ 40 mil para US$ 8 mil.",
      "Desenvolvi um microsserviço de entregas de alta vazão com Python e FastAPI, melhorando os tempos de resposta em 10x sob tráfego de pico.",
    ],
  },
  {
    hash: "7e2b9d1",
    date: "Out 2023 — Mar 2025",
    branch: "feature/recruitment-platform",
    role: "Engenheiro de Software",
    company: "Ademicon",
    bullets: [
      "Desenvolvi uma plataforma de recrutamento escalável e orientada a eventos, com suporte a 6.000 consultores de vendas ativos e R$ 27 bilhões em créditos transacionados com zero indisponibilidade crítica.",
      "Arquitetei APIs REST multi-tenant white-label com Node.js e Express.js, com isolamento dinâmico de tenants e feature flags, reduzindo o tempo de onboarding de clientes em 30%.",
      "Reduzi em mais de 70% os custos de consultas a birôs de crédito (SERASA) com uma camada de cache Redis de alta concorrência e TTL adaptativo.",
      "Configurei pipelines de CI/CD com GitHub Actions e Docker, acelerando releases e garantindo qualidade com suítes Jest.",
    ],
  },
  {
    hash: "4c8a02f",
    date: "Dez 2022 — Jul 2023",
    branch: "feature/tax-saas",
    role: "Engenheiro de Software",
    company: "Stage Consulting",
    bullets: [
      "Construí o backend multi-tier de um SaaS de conformidade fiscal com NestJS, PostgreSQL e React na GCP, economizando mais de 90 horas mensais por cliente.",
      "Projetei um pipeline de extração de documentos e OCR com Python e GCP Cloud Functions, reduzindo a latência de parsing para menos de 30 segundos.",
      "Desenvolvi uma integração corporativa com PowerPoint em C# (.NET) para relatórios automatizados, eliminando ferramentas de terceiros e economizando US$ 9.000 anuais.",
    ],
  },
  {
    hash: "0b5d3e8",
    date: "Jan 2021 — Dez 2022",
    branch: "feature/erp-integration",
    role: "Engenheiro de Software",
    company: "Ademicon",
    bullets: [
      "Arquitetei pipelines de integração transacional com ERP usando Node.js e PostgreSQL durante uma transição de M&A, automatizando a sincronização de dados e eliminando erros de entrada manual.",
      "Desenvolvi um serviço de originação de empréstimos com garantia de veículos integrando JavaScript, MongoDB e APIs Salesforce, processando mais de R$ 2 milhões nos primeiros 90 dias.",
      "Refatorei fluxos de aprovação de crédito e máquinas de estado, reduzindo o ciclo de fechamento de vendas de mais de 30 minutos para menos de 5 minutos.",
    ],
  },
];

export interface Service {
  id: string;
  command: string;
  title: string;
  description: string;
  deliverables: string[];
  stack: string;
}

export const SERVICES: Service[] = [
  {
    id: "backend",
    command: "build --backend",
    title: "Backend & APIs",
    description:
      "APIs REST e serviços backend para produtos financeiros e SaaS corporativos, com foco em confiabilidade, multi-tenancy e integração.",
    deliverables: ["Node.js · TypeScript · NestJS", "Python · FastAPI", "APIs REST multi-tenant"],
    stack: "Node · Python · TypeScript",
  },
  {
    id: "distributed",
    command: "arch --distributed",
    title: "Arquitetura Distribuída & Cloud",
    description:
      "Microsserviços e arquiteturas orientadas a eventos em Azure, AWS e GCP, com mensageria, containers e CI/CD.",
    deliverables: [
      "Microsserviços e event-driven",
      "Kafka · RabbitMQ · Service Bus",
      "Kubernetes · Docker · GitHub Actions",
    ],
    stack: "Azure · AWS · GCP",
  },
  {
    id: "ai",
    command: "ai --agents",
    title: "IA & LLM",
    description:
      "Orquestração de LLMs e agentes autônomos em produção, com RAG, otimização de prompts e cache semântico.",
    deliverables: [
      "Agentic workflows",
      "RAG · Vector DBs",
      "Prompt optimization · Semantic caching",
    ],
    stack: "Watsonx · LLM APIs · Redis",
  },
  {
    id: "modernization",
    command: "modernize --legacy",
    title: "Modernização & Performance",
    description:
      "Modernização de plataformas legadas para cloud-native, com redução de custo, latência e dívida técnica.",
    deliverables: [
      "Migração cloud-native",
      "Otimização de latência",
      "Redução de custos de infraestrutura",
    ],
    stack: "Azure · AWS · GCP",
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
    period: "Em andamento · previsão 2027",
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
  { language: "Português", level: "Nativo" },
  { language: "Inglês", level: "Fluente / Profissional completo" },
];
