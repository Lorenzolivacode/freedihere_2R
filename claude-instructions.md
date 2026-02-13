# 📘 Frontend Engineering Rules — freedihare-2R-first-app

Queste regole definiscono come deve essere scritto il codice frontend del progetto.
Devono essere sempre rispettate durante ogni implementazione o refactor.

---

## Il frontend segue un’architettura:

- modulare
- tipizzata
- scalabile
- orientata alla riusabilità
- separazione netta tra UI e logica

---

## Il codice deve essere:

- leggibile anche dopo mesi
- facilmente estendibile
- privo di logica duplicata
- composto da funzioni piccole e prevedibili

---

## 🗂 Struttura ufficiale del progetto frontend

```
app/src
│
├─ components/
│ ├─ atoms/ → elementi base UI (Button, Input, Label…)
│ ├─ molecules/ → combinazioni di atoms (Field, CardHeader…)
│ └─ organisms/ → sezioni UI complesse (Form, Sidebar…)
│
├─ gql_crud/
│ ├─ ...models/
│ │ ├─ queries.ts
│ │ └─ mutations.ts
│
├─ utils/ ← HOOK, funzioni generiche, logica riusabile
├─ types/ ← types generici, interface generiche e riutilizzabili
│
├─ App.tsx
└─ main.tsx
```

---

## 🔴 Regola fondamentale

### Tipo di codice Dove va:

- UI pura -> components/
- Hook personalizzati -> utils/hooks
- Funzioni generiche -> utils/generic_function.ts
- Query / Mutation GraphQL -> gql_crud/
- Tipizzazioni (types/interfaces) -> types/

---

## ⚛️ Regole per i componenti React

### Un componente UI:

- deve essere riutilizzabile
- deve ricevere dati solo tramite props tipizzate oppure oggetti
- può contenere varianti per gestire più casi UI dello stesso componente
  (es. button danger, primary, ghost)
- NON deve contenere logica business
- NON deve fare chiamate GraphQL
- NON deve contenere fetch, mutation o trasformazioni complesse
- NON devono essere componenti matrioska
  (es. card, titleCard, titleContent, etc.)

```typescript
type InputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

// Componente puramente visivo
export function TextInput({ label, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
```

---

## 🧩 Regole per gli hook e la logica

### TUTTA la logica deve vivere in: `app/src/utils/`

Include:

- custom hooks
- helper
- funzioni di trasformazione
- gestione stato complesso

```typescript
// utils/useCreateFood.ts
export function useCreateFood() {
  const [mutate, state] = useMutation(CREATE_FOOD);

  const createFood = async (input: CreateFoodInput) => {
    return mutate({ variables: input });
  };

  return { createFood, ...state };
}
//Il componente UI deve solo chiamare createFood().
```

---

## 🔌 Regole GraphQL

- Le operazioni GraphQL sono SOLO in gql_crud
- Divise per modello
- Query e mutation separate
- Mai scrivere gql inline nei componenti

---

## ✍️ Commenti nel codice

I commenti devono:

- essere in italiano
- spiegare cosa e perché, solo se la logica è complessa
- essere sintetici

✔ Corretto:

// Prisma richiede numeri per i campi Decimal

❌ Errato:

// assegno il valore

---

## 📏 Limiti dimensionali del codice

| Elemento----- | Limite            |
| ------------- | ----------------- |
| Funzione----- | max ~40–80 righe  |
| Hook--------- | max ~150 righe    |
| Componente--- | max 200–300 righe |

**Se si supera → spezzare.**

---

## 🎨 Regole di stile

- I colori e variabili di design devono provenire solo da index.css
- Non introdurre colori inline non definiti
- Tailwind utility-first
- Evitare classi troppo lunghe → creare componenti riusabili
- Promuovere l'utilizzo e riutilizzo di classi @apply con tailwind css -> impostate in index.css

---

## 🧼 Best practice obbligatorie

Claude deve **sempre**:

- usare TypeScript rigoroso
- evitare any
- usare nomi descrittivi
- evitare duplicazioni
- preferire funzioni pure
- usare early return
- separare UI e logica

🚫 Cose **vietate**

❌ Logica business dentro componenti UI
❌ Mutation GraphQL nei componenti
❌ Funzioni giganti
❌ Componenti monolitici
❌ Tipi impliciti
❌ Stili hardcoded

---

## 🎯 Obiettivo del codice

### Il codice deve essere:

- modulare
- prevedibile
- pulito
- scalabile
- facile da mantenere
- semplice



---
---
---
---

# TASK DA ESEGUIRE SEGUENDO LE REGOLE SOPRA

L'obiettivo è creare il front-end dell'applicazione partendo dalla struttura del database e considerando le mutations già create.
La grafica dev'essere pulita, moderna, intuitiva. Devi usare i colori in `app/src/index.css` come scritto nelle regole.
Ricordati di creare quanti più componenti riutilizzabili possibili.
Non devi per forza rifarti alla grafica già presente, puoi ristrutturare capo. NON I COLORI.

Attenzione al componente Select: lo devi usare, ma devi risolvere i problemi senza però installare librerie extra se non necessario.

## ELENCO DELLE TASK

### Implementazione dark mode
- [ ] Realizzazione dell'alternativa del pacchetto di colori dark in `index.css` (al momento è nella subclass .darkmode, ma dev'essere implementata secondo standard e funzionalità reali di tailwind css)
- [ ] Assicurati di usare sempre classi e colori dinamici per la darkmode in ogni parte dell'app così da rendere lo switch automatico quando (nelle fasi successive) sarà implementata la logica di cambio tema.

### Creazione pagine e componenti
L'app si basa su un sistema di *single page* con componenti interscambiabili. Una sola pagina con componenti che si scambiano di posto in base alla selezione.

**Pagina principale:**
- [ ] Deve possedere un menù di navigazione che permetta di muoversi fra i seguenti componenti:
    - Dashboard
    - Dettagli utente
    - Diario
    - Alimenti
- [ ] Deve possedere un main condiviso all'interno del quale mostrare il contenuto di quei componenti.
- [ ] Le modali in futuro dovranno essere renderizzate sopra tutta la pagina.

**Componente Dashboard:**
- [ ] Deve possedere un bottone "Aggiungi pasto", il quale:
    - [ ] Apre una modale con all'interno le seguenti informazioni e funzioni:
        - [ ] Select "Nome pasto"
        - [ ] Searchbar "Ricerca Alimento"
        - [ ] Select "Category" (serve a filtrare ricerca)
        - [ ] Select "Subs" (serve a filtrare ricerca)
        - [ ] Select "Brand" (serve a filtrare ricerca)
        - [ ] Select "Shop" (serve a filtrare ricerca)
        - [ ] List/Table di alimenti selezionati
            - [ ] Ogni alimento deve avere:
                - [ ] Nome alimento (readOnly)
                - [ ] I valori di tutti i macro (readOnly)
                - [ ] Input per inserire il peso
            - [ ] Evidenzia in giallo tutto il record se il campo isFxApproximated è true
            - [ ] Evidenzia in rosso tutto il record se un valore fra fiber o salt è vuoto
        - [ ] Bottone d'invio/conferma per creazione/modifica del pasto
        Questa modale dovrà servire sia per la creazione che per la modifica dei pasti.
        Se questa modale è interagibile da Dashboard, allora la data di riferimento è quella attuale.
        Se questa modale è interagibile dal Diario, allora la data di riferimento sarà presa dal giorno selezionato in quel contesto.
- [ ] Lasciare spazio da qualche parte per inserire i grafici in futuro (per adesso non ci sono)
- [ ] Deve possedere un componente (riutilizzabile) "Giornata", impostato al giorno di oggi, con dentro l'elenco delle macro totali consumate divise per pasto. Cliccando sul singolo pasto si apre la modale di sopra per permettere modifiche / aggiunte.
- [ ] Riepilogo totale della giornata con le somme dei singoli macro in modo da avere una visione chiara dei consumi del giorno.
- [ ] Riepilogo totale delle macro residue da poter sfruttare, calcolati prendendo in considerazione il campo expectedKcal del model DiaryUser e calcolando gli altri macro considerando che:
    - 1g di grassi equivale a 9kcal
    - 1g di carboidrati/zuccheri equivale a 4kcal
    - 1g di proteine equivale a 4kcal
[EXTRA]: Il gruppo Searchbar "Ricerca Alimento", Select "Category", Select "Subs", Select "Brand" e Select "Shop" devono essere realizzati come componente molecolare riutilizzabile.

**Componente Dettagli Utente:**
- Lasciala vuota con placeholder "Da sviluppare"

**Componente Diario:**
- [ ] Calendarietto settimanale semplificato che mostra solo la settimana corrente per muoversi facilmente ad altri giorni / filtrare i risultati sottostanti.
- [ ] DatePicker accanto al calendarietto per selezionare un giorno specifico di altri mesi/settimane.
- [ ] Elenco dei diary
    - [ ] Serve una select per scegliere se visualizzare tutti i diary della settimana, quelli del mese o quelli dell'anno (se si è selezionato un giorno, quello ha la precedenza)
    - [ ] Ogni card del diary deve contenere:
        - [ ] Giorno di riferimento (oggi o altri)
        - [ ] Riepilogo delle macro rimaste fra tutti i pasti del giorno calcolate come in precedenza
        - [ ] Sezione con riepilogo di tutti i dati del model DataUser del giorno relativo
        - [ ] Campo calcolato della massa grassa (da vedere in futuro, mettici un TODO)
    - [ ] Cliccando sulla card del giorno si apre una modale con la visualizzazione identica alla pagina Dashboard del giorno corrente > componente "Giornata"

**Componente Alimenti:**
- [ ] Prevede il componente di ricerca alimento creato in precedenza
    - [ ] In questo caso però una volta selezionato si apre la lista dei risultato + un bottone per visualizzare l'elemento singolo. Questo bottone apre una modale che contiene:
        - [ ] Tutti i dati dell'alimento selezionato, escluso il peso, da food fino a tutte le cose che sono collegate, in modo ordinato
- [ ] Prevede il componente di ricerca ricetta, uguale a ricerca alimento ma senza brand e shop, che mostra i risultati e al click del bottone per visualizzare i dettagli ricerca apre la modale con tutti i dettagli di tutta la ricetta + tutti i suoi alimenti in modo ordinato.
- [ ] Form dropdown di creazione alimento
    - [ ] Food
        - [ ] Input Nome food
        - [ ] Select Nome Sub
        - [ ] Textarea Note food
    - [ ] Detail
        - [ ] Input Nome detail
        - [ ] Select Nome Brand
        - [ ] Select Nome Shop
        - [ ] Textarea Note detail
    - [ ] Macro
        - [ ] Un input per ogni macro
    - [ ] Specifics
        - [ ] Input per unity weight
        - [ ] Bottone + per aggiungere input per unity weight
    - [ ] Bottone invia/crea
    - [ ] Check backend con notifica su frontend: se esiste già un alimento con food + sub ti deve mostrare sotto tutte le alternative che rispecchiano quella categoria così da cercare di evitare di farti creare troppi duplicati > semmai si seleziona quello già esistente solo per aggiungere il detail
- [ ] Form dropwodn di creazione ricetta:
    - [ ] Componente di ricerca alimento
    - [ ] Input nome ricetta
    - [ ] Select multipla di scelta sub da aggiungere a quelle calcolate/ereditate dai food
    - [ ] Elenco alimenti selezionati con input di peso come visto in passato (stessa lista presente nella modale del pasto)
    - [ ] Toggle cotto/crudo
    - [ ] Input readOnly weight che somma tutti i pesi a crudo
    - [ ] Input di peso cotto
    - [ ] Bottone crea ricetta