Você é um desenvolvedor Frontend Senior e Creative Technologist especializado em UI/UX de alto nível. Seu objetivo é construir um site de portfólio para um desenvolvedor de software sênior que está atuando como freelancer.

### CONCEITO E ESTÉTICA
- Estilo: "Terminal & IDE Neobrutalista Moderno".
- Esquema de cores: Fundo escuro profundo (#0a0a0a, #121212), detalhes em Verde Neon/Terminal (#00FF66 ou #02e059), cinzas neutros para texto secundário e alto contraste.
- Atmosfera: Parece uma interface de controle de sistemas/IDE de alta performance, mas é 100% funcional, responsiva e intuitiva para clientes não-técnicos navegarem sem precisar digitar comandos no terminal (embora comandos opcionais devam existir).

### PROIBIDO (EVITAR "AI SLOP" E CLICHÊS):
- NÃO use os templates genéricos de portfólio de IA (cards padronizados com gradiente flutuante, textos clichês como "Transformando ideias em código", orbes brilhantes de fundo).
- NÃO faça telas de carregamento longas que travam a navegação do usuário.
- NÃO sacrifique a usabilidade do site para parecer um terminal puro dos anos 80. Deve ser um site funcional em primeiro lugar, com linguagem estética de terminal.

### ARQUITETURA DE UI E COMPONENTES
1. Header / Barra de Status do Sistema:
   - Apresente métricas de status em tempo real (ex: "STATUS: AVAILABLE FOR FREELANCE", hora local UTC/BRT, uptime simulado, versão do sistema v2.6.0).
   - Menu de navegação rápido com atalhos de teclado visíveis (ex: [1] Projetos, [2] Serviços, [3] Git Log, [4] Contato) e suporte a Command Palette (Cmd+K / Ctrl+K).

2. Hero Section:
   - Em vez da introdução convencional, crie uma área de "System Init" rápida em texto monospaçado que se transforma em uma apresentação de autoridade técnica.
   - Apresente diretamente as especialidades do desenvolvedor, stack principal e chamada para contratação/freelance.

3. Seção de Projetos (Cases Freelance):
   - Estilo "File Explorer / Database Viewer".
   - Cada projeto deve parecer um arquivo do sistema que expande ao ser clicado (`layoutId` do Framer Motion).
   - Inclua detalhes como: problema resolvido, stack utilizada, diff de código/snippet relevante, métricas reais de impacto e link direto para demo/GitHub.

4. Seção de Experiência (Git History Timeline):
   - Apresente a trajetória profissional como um log de `git commit` ou linha do tempo interativa com hashes de commit fictícios, branches de evolução e cargos.

5. Seção Freelance / Serviços & System Capabilities:
   - Apresente os serviços de forma direta (Ex: Desenvolvimento Full-Stack, Arquitetura de Software, Refatoração, MVP Rápido).
   - Inclua estimativa de disponibilidade e formato de trabalho.

6. Seção de Contato (CLI Terminal Prompt):
   - Um mini-terminal interativo funcional no final da página onde o usuário pode enviar uma mensagem (preenchendo nome, e-mail e proposta) como se estivesse executando um comando `send-message --email`. Forneça também um formulário convencional com toggle visual.

### ANIMAÇÕES E INTERAÇÕES (Framer Motion)
- Use Framer Motion para todas as transições de estado.
- Efeitos de micro-interação: hover nos botões com resposta de terminal (cursor customizado ou indicador `>`), efeito de "typing" sutil e instantâneo, animação de entrada em cascata (staggered children).
- Animações de layout fluídas (`AnimatePresence` para filtros de projetos e modais de detalhes).
- Animação sutil de scanline CRT no fundo (opcional via CSS puro, mantendo performance a 60fps).

### STACK TÉCNICA
- Next.js (App Router), React, Tailwind CSS, Framer Motion, Lucide-react para ícones minimalistas.

Gere a estrutura de componentes modular, clean e pronta para produção.