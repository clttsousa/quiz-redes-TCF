# Quiz Redes - TCF (React + Vite + Tailwind + shadcn/ui)

## Rodar localmente
```bash
npm install
npm run dev
```

## Build (para deploy)
```bash
npm run build
npm run preview
```

## Banco de perguntas (JSON)
- Arquivo: `public/questions/bank.json`
- No site: `/questions/bank.json`

## Cloudflare Pages
Configuração recomendada:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- (Root directory vazio se o `package.json` está na raiz do repo)

### SPA / Rotas
Este projeto inclui `public/_redirects` para evitar 404 ao atualizar páginas (React Router).
