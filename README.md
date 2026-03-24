<div align="center">

# · CENA

*Explorador editorial de filmes e séries*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com)
[![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/documentation/api)

[Demo ao vivo](https://luidhydev.vercel.app) · [Reportar bug](https://github.com/Luidhy-Davii/Cena/issues) · [Sugerir feature](https://github.com/Luidhy-Davii/Cena/issues)

</div>

---

## O que é

Cena é um explorador de filmes e séries com identidade editorial forte. Consome a API do TMDB para exibir o que está em cartaz, os mais populares e as séries em alta. Tudo em uma interface dark, tipográfica e responsiva.

---

## Começando

```bash
# Clone e instale
git clone https://github.com/Luidhy-Davii/Cena.git
cd cena
npm install
```

Crie o arquivo `.env` na raiz:

```env
VITE_TMDB_API_KEY=sua_chave_v3_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

> Obtenha sua chave gratuita em [themoviedb.org](https://www.themoviedb.org/settings/api)

```bash
npm run dev
# http://localhost:5173
```

---

## Funcionalidades

- Filmes em cartaz, populares e séries em alta via TMDB
- Destaque editorial com backdrop full-bleed e poster flutuante
- Modal de detalhes com sinopse, score e trailer integrado
- Navbar responsiva com menu mobile animado
- Links do header com scroll suave e ativação de aba automática

---

## Stack

| | Tecnologia | Uso |
|---|---|---|
| ⚛️ | React 18 | Interface e estado |
| ⚡ | Vite 5 | Bundler e dev server |
| 🎨 | Sass (SCSS) | Design system e estilos |
| 🎬 | TMDB API | Dados de filmes e séries |
| ✨ | GSAP | Animações (planejado) |

---

## Estrutura

```
src/
├── components/
│   ├── navbar/       # Navbar responsiva
│   ├── hero/         # Seção de abertura
│   └── discover/     # Grid + modal + tabs
├── hooks/
│   └── useMovies.js  # Fetch por aba ativa
├── services/
│   └── api.js        # Endpoints TMDB
└── styles/
    ├── _reset.scss
    └── _variables.scss
```

---

## Roadmap

**Concluído**
- [x] Navbar com menu mobile e acessibilidade
- [x] Hero editorial
- [x] Discover com 3 abas e modal de trailer
- [x] Navegação por abas via header

**Em andamento**
- [ ] Paginação de filmes e séries
- [ ] Filtro por gênero
- [ ] Dark / Light mode
- [ ] Página de detalhe completa
- [ ] Sistema de favoritos

---

## Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build de produção
npm run preview   # Preview do build
npm run lint      # ESLint
```

---

## Contribuindo

1. Fork o projeto
2. Crie sua branch — `git checkout -b feat/minha-feature`
3. Commit — `git commit -m 'feat: descrição da mudança'`
4. Push — `git push origin feat/minha-feature`
5. Abra um Pull Request

---

<div align="center">

Dados fornecidos por [TMDB](https://www.themoviedb.org) · Feito por [Luidhy Davi](https://luidhydev.vercel.app)

</div>