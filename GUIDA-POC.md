# Pole Dance Aosta - Guida ai POC

Abbiamo esplorato **3 dimensioni** per il sito web, creando diverse varianti per ognuna. Questa guida ti aiuta a capire cosa cambia e come scegliere.

---

## Come visualizzare i POC

```bash
cd pole-dance-aosta
npm run dev
```

Apri http://localhost:4321 per vedere l'hub con tutti i POC.

---

## Le 3 dimensioni esplorate

### 1. STILE VISIVO

**Cosa cambia:** Colori, font, forme, mood generale - l'aspetto estetico del sito.

| URL | Nome | Descrizione |
|-----|------|-------------|
| `/poc1` | Soft & Welcoming | Rosa cipria, lavanda, forme arrotondate, molto morbido e accogliente |
| `/poc3` | Sportivo Friendly | Magenta e viola, forme dinamiche con diagonali, energico ma inclusivo |
| `/poc4` | Modern Warm | Bianco e nero con accenti terracotta, minimal, spazi puliti e moderni |
| `/poc8` | Immersivo Parallax | Sfondo scuro con rosa/viola neon, effetti scroll, stile cinematico |

**Domanda chiave:** Che sensazione vuoi trasmettere a prima vista?
- Caldo e rassicurante → POC 1
- Energico e dinamico → POC 3
- Elegante e moderno → POC 4
- Impattante e memorabile → POC 8

---

### 2. STRUTTURA INFORMATIVA

**Cosa cambia:** L'ordine delle sezioni, cosa viene mostrato prima, la gerarchia dei contenuti.

*Tutte queste varianti usano lo stesso stile visivo (POC 1 - Soft & Welcoming)*

| URL | Nome | Logica |
|-----|------|--------|
| `/poc1` | Standard | Hero → Chi siamo → Corsi → Insegnanti → Orari → Contatti |
| `/poc1a` | Story-driven | Focus sul viaggio di trasformazione: "Da dove parti → Dove arrivi" |
| `/poc1b` | Community-first | Apre con testimonianze e numeri (150+ iscritte, 98% tornano...) |
| `/poc1c` | Corso-centrica | I corsi sono protagonisti con dettagli, orari, guida alla scelta |
| `/poc1d` | Single-action | Ultra minimale: tutto punta a un'unica azione (prenota prova gratuita) |
| `/poc1e` | Problema-soluzione | Prima i problemi ("Ti senti bloccata?"), poi le soluzioni |

**Domanda chiave:** Cosa vuoi che l'utente veda/capisca per primo?
- La trasformazione possibile → Story-driven
- Che tante donne si trovano bene → Community-first
- I dettagli pratici dei corsi → Corso-centrica
- Solo l'essenziale per prenotare → Single-action
- Che capisci i suoi problemi → Problema-soluzione

---

### 3. TONO DI VOCE

**Cosa cambia:** Come "parla" il sito - le parole usate, lo stile di scrittura, l'emozione trasmessa.

*Tutte queste varianti usano stile POC 1 + struttura standard*

| URL | Nome | Come suona | Esempio |
|-----|------|------------|---------|
| `/poc1-t1` | Intimo-emotivo | Poetico, parla al cuore, metafore | "Riscopri la donna che sei sempre stata" |
| `/poc1-t2` | Amichevole-diretto | Come un'amica, informale, pratico | "Vieni a provare, ti aspettiamo!" |
| `/poc1-t3` | Empowering | Motivazionale, focus su forza | "Il tuo corpo e piu forte di quanto pensi" |

**Domanda chiave:** Come vuoi "parlare" alle potenziali clienti?
- Con empatia e profondita → Intimo-emotivo
- Con semplicita e simpatia → Amichevole-diretto
- Con energia e motivazione → Empowering

---

## Come funziona la scelta finale

Il sito finale sara una **combinazione** delle 3 dimensioni:

```
SITO FINALE = Stile visivo + Struttura + Tono
```

### Esempi di combinazioni possibili

| Combinazione | Risultato |
|--------------|-----------|
| POC 1 + Story-driven + Intimo | Sito caldo che racconta un viaggio di trasformazione |
| POC 4 + Single-action + Diretto | Sito minimal che va dritto al punto |
| POC 8 + Community-first + Empowering | Sito impattante che mostra una community forte |
| POC 3 + Corso-centrica + Diretto | Sito energico focalizzato sui corsi |

---

## Prossimi passi

1. **Guarda tutti i POC** navigando da http://localhost:4321
2. **Scegli 1 stile visivo** (quale ti piace esteticamente?)
3. **Scegli 1 struttura** (cosa vuoi comunicare prima?)
4. **Scegli 1 tono** (come vuoi parlare?)
5. **Comunicaci le scelte** e creeremo il sito finale combinando tutto

---

## Note tecniche

- Tutti i POC sono responsive (mobile + desktop)
- I contenuti sono placeholder, verranno sostituiti con quelli reali
- Le immagini sono segnaposto, verranno inserite foto vere
- Il form di contatto e la mappa sono placeholder funzionanti

---

## Riepilogo URL

### Stili visivi
- http://localhost:4321/poc1 - Soft & Welcoming
- http://localhost:4321/poc3 - Sportivo Friendly
- http://localhost:4321/poc4 - Modern Warm
- http://localhost:4321/poc8 - Immersivo Parallax

### Strutture (tutte con stile POC 1)
- http://localhost:4321/poc1 - Standard
- http://localhost:4321/poc1a - Story-driven
- http://localhost:4321/poc1b - Community-first
- http://localhost:4321/poc1c - Corso-centrica
- http://localhost:4321/poc1d - Single-action
- http://localhost:4321/poc1e - Problema-soluzione

### Toni (tutte con stile POC 1 + struttura standard)
- http://localhost:4321/poc1-t1 - Intimo-emotivo
- http://localhost:4321/poc1-t2 - Amichevole-diretto
- http://localhost:4321/poc1-t3 - Empowering
