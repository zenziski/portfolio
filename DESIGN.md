# Caderno de campo — direção de design

Portfólio de Matheus Zenziski como um **sketchbook de programador**: anotações,
colagens, desenhos e estudos em pontilhismo. Nada de estética de terminal/IDE.

## Conceito

Duas áreas independentes dentro do mesmo caderno:

- **O trabalho** (`#profissional`) — bio, cases, experiência, stack, serviços e formação.
- **O pessoal** (`#pessoal`) — "no momento", filmes, livros, jogos, música, hobbies,
  manifesto e estudos em pontilhismo.

A navegação alterna entre as áreas com uma transição calma de página.

## Paleta

Tons pastel de verde e azul sobre papel levemente esverdeado.

| Token | Valor | Uso |
| --- | --- | --- |
| `paper` | `#f3f6ec` | fundo de papel |
| `paper-2 / paper-3` | `#e9efe1` / `#dde7d5` | camadas e texturas |
| `ink` | `#22312a` | texto principal |
| `ink-soft / ink-faint` | `#53655b` / `#839189` | texto secundário |
| `sage / sage-deep` | `#a9c8b2` / `#5f8f74` | verde pastel e acentos |
| `mint` | `#dcebd8` | notas e chips |
| `sky / sky-deep` | `#bed9e8` / `#4f7f9e` | azul pastel e acentos |
| `sticky` / `sticky-blue` | `#eef2c8` / `#dbe9f2` | post-its |

## Tipografia

- **Fraunces** (`font-display`) — títulos editoriais e itálicos.
- **Caveat** (`font-hand`) — anotações, legendas e voz do caderno.
- **Geist** (`font-sans`) — corpo de texto.
- **Geist Mono** (`font-mono`) — metadados, chips e trechos de código.

## Materiais e texturas

- Papel com grão sutil, pauta (`ruled`), grade (`grid-paper`) e pontilhado (`dot-paper`).
- Washi tape, post-its, clipes, carimbos e doodles desenhados à mão.
- Sombras de papel, leve rotação e bordas irregulares.
- Componentes em `components/sketch.tsx` e `components/doodles.tsx`.

## Pontilhismo

`components/dot-art.tsx` desenha arte em pontos via Canvas 2D:

- `globe` — globo girando lentamente, continentes em dots mais escuros.
- `horizon` — horizonte curvo de planeta, usado no rodapé.
- `wave` — faixas de ondas em pontos.
- `ridge` — montanhas pontilhadas com sol.

Tudo respeita `prefers-reduced-motion` e pausa fora da viewport.

## Movimento

Animações calmas, sem excesso: reveals no scroll (Framer Motion), flutuação e
balanço sutis, respiração nos indicadores de status e rotação lenta do globo.

## Conteúdo pessoal

Filmes, livros, jogos, música, hobbies, "no momento" e manifesto ficam em
`lib/data.ts`, na seção **Lado pessoal**. Basta trocar os itens para atualizar a
prateleira e os post-its.
