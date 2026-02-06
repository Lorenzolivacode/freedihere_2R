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
