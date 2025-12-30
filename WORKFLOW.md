# Pole Dance Aosta - Workflow di Sviluppo

## Struttura Progetto

```
pole-dance-aosta/              → REPO GIT
├── .github/workflows/         → Deploy automatico GitHub Pages
├── videos/                    → Video (hero-placeholder.mp4)
└── _sviluppo/                 → PROGETTO ASTRO
    ├── src/
    │   ├── pages/index.astro  → Pagina principale
    │   ├── data/content.json  → Contenuti (testi, prezzi, orari)
    │   ├── styles/poc1.css    → Stili CSS
    │   ├── components/        → Componenti riutilizzabili
    │   └── layouts/           → Layout pagine
    ├── public/                → File statici (logo, favicon)
    └── astro.config.mjs       → Configurazione Astro
```

## Workflow di Lavoro

### 1. Avviare il Dev Server
```bash
cd pole-dance-aosta/_sviluppo
npm run dev
```
Il sito sarà su: `http://localhost:4321/poledanceaosta/`

### 2. Fare Modifiche
- Contenuti (testi, prezzi): `src/data/content.json`
- Struttura pagina: `src/pages/index.astro`
- Stili: `src/styles/poc1.css`

### 3. Prassi Prima del Push
**IMPORTANTE - Seguire sempre questi passaggi:**

1. **Aprire il browser** su `localhost:4321/poledanceaosta/` per mostrare le modifiche
2. **Attendere conferma** dell'utente
3. **Solo dopo conferma**, procedere con:
   - `git add -A`
   - `git commit -m "descrizione modifiche"`
   - `git pull origin main --rebase` (se necessario)
   - `git push origin main`
4. **Aprire GitHub Pages** per verificare il deploy:
   - https://matteovillettaz-blip.github.io/poledanceaosta/

## URL Utili

- **Dev locale**: http://localhost:4321/poledanceaosta/
- **Sito live**: https://matteovillettaz-blip.github.io/poledanceaosta/
- **GitHub repo**: https://github.com/matteovillettaz-blip/poledanceaosta
- **GitHub Actions**: https://github.com/matteovillettaz-blip/poledanceaosta/actions

## Note

- Il deploy su GitHub Pages è automatico dopo ogni push su `main`
- Il build impiega circa 30 secondi
- I prezzi sono placeholder "XX" da sostituire con i valori reali
