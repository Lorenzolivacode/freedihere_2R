# Piano d'azione — Freedihere 2R Frontend

## Context

L'obiettivo è costruire il frontend completo dell'app a partire dalla struttura DB e dalle mutation/query già presenti. L'app è SPA (single-page) con navigazione tramite componenti intercambiabili. Deve rispettare le regole di `claude-instructions.md` / `app/CLAUDE.md`: architettura modulare atoms→molecules→organisms, separazione UI/logica, TypeScript strict, colori da `index.css`, dark mode nativa Tailwind.

Il componente `foodForm.tsx` (temp/) è da considerare come riferimento della logica esistente, ma violava le regole architetturali → verrà rimpiazzato dalla struttura corretta.

---

## 0. Prerequisiti — Analisi gap GraphQL

### Query/Mutation backend esistenti
- `users()`, `user(id)` → User
- `getFoodsByInput(input)`, `getFoodsByFullName(input, id_sub?, id_brand?, id_shop?)` → Foods
- `createFood(...)` → Foods
- `getBrands()`, `getShops()`, `getSubcategories()` → lookup
- User_fase: queries + mutations (backend)
- User_meal: queries + mutations (backend)

### Frontend `gql_crud/` esistenti
- `user/queries.ts` → `GET_USERDATA_BASE`
- `foods_dets/queries.ts` → `GET_FOODS_BY_INPUT`
- `foods_dets/mutations.ts` → `CREATE_FOOD_DETS`
- `brands_shop/queries.ts` → `GET_BRANDS`, `GET_SHOPS`
- `cats_subs/queries.ts` → `GET_SUBCATEGORIES`

### ⚠️ Query/Mutation frontend DA CREARE

| File da creare | Operazioni |
|---|---|
| `gql_crud/cats_subs/queries.ts` (estendere) | `GET_CATEGORIES` |
| `gql_crud/foods_dets/queries.ts` (estendere) | `GET_FOODS_BY_FULL_NAME` (con macro completi + isFxApproximated) |
| `gql_crud/diary/queries.ts` | `GET_DIARY_BY_DATE`, `GET_DIARIES_BY_PERIOD` |
| `gql_crud/diary/mutations.ts` | da valutare dopo verifica backend |
| `gql_crud/meals/queries.ts` | `GET_MEALS_BY_DATE` (con join_meal_food + macro) |
| `gql_crud/meals/mutations.ts` | `CREATE_MEAL`, `UPDATE_MEAL` |
| `gql_crud/user/queries.ts` (estendere) | `GET_DATA_USER_BY_DATE` (peso, misure) |
| `gql_crud/recipes/queries.ts` | `GET_RECIPES_BY_INPUT`, `GET_RECIPE_DETAILS` |
| `gql_crud/recipes/mutations.ts` | `CREATE_RECIPE` |

### ⚠️ Query/Mutation backend DA VERIFICARE / CREARE

- `getCategories()` — solo mutations trovate in Category, potrebbero mancare le queries
- `getMealsByDate(userId, date)` — verificare in `User_meal/user.queries.ts`
- `getDiaryByDate(userId, date)` — verificare in `User_fase/user.queries.ts`
- `getDataUserByDate(userId, date)` — verificare in `user.queries.ts`
- `getRecipesByInput(input)` — verificare in `Recipe/`
- `createRecipe(...)` — verificare in `Recipe/`

---

## 1. Dark Mode e CSS Base

- [ ] **1.1** Rimuovere la classe `.darkmode` da `app/src/index.css`
- [ ] **1.2** Convertire le variabili CSS in coppia `light/dark` usando `@layer base` con selettore `:root` (light) e `.dark` (dark) — standard Tailwind v3 con `darkMode: 'class'` in `tailwind.config.js`
- [ ] **1.3** Aggiungere `darkMode: 'class'` in `app/tailwind.config.js`
- [ ] **1.4** Definire in `index.css` le classi `@apply` riutilizzabili: `btn-primary`, `btn-secondary`, `btn-ghost`, `input-base`, `card`, `modal-overlay`, `modal-box`, `section-title`, `badge-macro` (kcal, fat, carbo, prot, ecc.)
- [ ] **1.5** Usare sempre `text-[--color-foreground]`, `bg-[--color-background]`, `text-[--color-primary]` etc. in ogni componente (mai colori inline)

**File chiave:** `app/src/index.css`, `app/tailwind.config.js`

---

## 2. Tipi condivisi

- [ ] **2.1** Creare `app/src/types/user.types.ts` — `IUserBase`, `IDataUser`
- [ ] **2.2** Creare `app/src/types/food.types.ts` — `IFood`, `IDetail`, `IMacro`, `IDetailSpecific`, `IFoodSearchResult`, `IFoodFull`
- [ ] **2.3** Creare `app/src/types/meal.types.ts` — `IMeal`, `IJoinMealFood`, `IMealWithFoods`
- [ ] **2.4** Creare `app/src/types/diary.types.ts` — `IDiaryUser`, `IFaseUser`
- [ ] **2.5** Creare `app/src/types/recipe.types.ts` — `IRecipe`, `IJoinDetailRecipe`
- [ ] **2.6** Creare `app/src/types/navigation.types.ts` — `NavSection` enum/union (`'dashboard' | 'user' | 'diary' | 'foods'`)

**File chiave:** `app/src/types/`

---

## 3. Atoms — Componenti UI base

- [ ] **3.1** `Button.tsx` — varianti: `primary`, `secondary`, `ghost`, `danger`; props: `label`, `onClick`, `disabled`, `loading`, `size`
- [ ] **3.2** `Input.tsx` — text input con label; props: `label`, `value`, `onChange`, `placeholder`, `readOnly`, `error`
- [ ] **3.3** `Textarea.tsx` — textarea con label; stessa struttura di Input
- [ ] **3.4** Usare il `Select.tsx` esistente (`app/src/components/atoms/Select.tsx`) — correggere i problemi senza installare librerie extra
- [ ] **3.5** `Badge.tsx` — badge colorato per macro (usa variabili CSS `--color-fat`, `--color-carbo`, ecc.); props: `label`, `value`, `type`
- [ ] **3.6** `Modal.tsx` — wrapper modale con overlay; porta il contenuto tramite Portal su `document.body`; props: `isOpen`, `onClose`, `title`, `children`
- [ ] **3.7** `Spinner.tsx` — loading spinner
- [ ] **3.8** `Toggle.tsx` — switch on/off; props: `value`, `onChange`, `label`
- [ ] **3.9** `DatePicker.tsx` — input date nativo con stile progetto
- [ ] **3.10** `Notification.tsx` — toast/banner per successo/errore
- [ ] **3.11** `Select.tsx` — da correggere senza perdere le funzionalità

**File chiave:** `app/src/components/atoms/`

---

## 4. Molecules — Componenti composti

- [ ] **4.1** `MacroBadgeGroup.tsx` — gruppo di Badge con tutti i macro di un alimento; props: `macro: IMacro`
- [ ] **4.2** `FoodSearchBar.tsx` ⭐ *(molecola riutilizzabile richiesta)* — searchbar + Select Category + Select Sub + Select Brand + Select Shop; props: `onSearch`, `filters`, `onFilterChange`; usato in Dashboard modale, Alimenti, Ricette
- [ ] **4.3** `FoodRow.tsx` — riga alimento in tabella pasto: nome (readOnly), macro (readOnly), input peso; evidenziazione gialla se `isFxApproximated=true`, rossa se `fiber` o `salt` nulli; props: `food: IJoinMealFood`, `onWeightChange`
- [ ] **4.4** `MealCard.tsx` — card pasto con nome e lista macro totali; cliccabile; props: `meal: IMealWithFoods`, `onClick`
- [ ] **4.5** `MacroSummary.tsx` — riepilogo totale macro (consumati + residui); props: `consumed: IMacro`, `expected: IMacro`
- [ ] **4.6** `DiaryCard.tsx` — card giornata del diario: data, macro residui, dati DataUser; cliccabile; props: `diary: IDiaryUser`, `dataUser?: IDataUser`, `onClick`
- [ ] **4.7** `WeekCalendar.tsx` — calendarietto 7 giorni settimana corrente con giorno selezionabile; props: `selectedDate`, `onDateChange`
- [ ] **4.8** `PeriodSelect.tsx` — select settimana/mese/anno; props: `value`, `onChange`
- [ ] **4.9** `GiornataComponent.tsx` ⭐ *(riutilizzabile Dashboard + Diario)* — lista pasti del giorno con macro totali, bottone per aprire modale pasto; props: `date: Date`, `meals: IMealWithFoods[]`, `onEditMeal`, `onAddMeal`
- [ ] **4.10** `FoodDetailPanel.tsx` — pannello dettaglio alimento completo (food→detail→macro→brand→shop→specifics) per modale Alimenti

**File chiave:** `app/src/components/molecules/`

---

## 5. Organisms — Sezioni UI complesse

- [ ] **5.1** `AppShell.tsx` — layout principale: sidebar/topbar navigazione + area main
- [ ] **5.2** `NavMenu.tsx` — menù navigazione con voci: Dashboard, Dettagli Utente, Diario, Alimenti; highlight voce attiva; props: `activeSection`, `onNavigate`
- [ ] **5.3** `MealModal.tsx` — modale creazione/modifica pasto: Select nome pasto, FoodSearchBar, FoodRow list, bottone conferma; props: `isOpen`, `onClose`, `date`, `meal?` (se modifica)
- [ ] **5.4** `Dashboard.tsx` — sezione: bottone Aggiungi pasto → MealModal, GiornataComponent (oggi), MacroSummary, segnaposto grafici futuro
- [ ] **5.5** `UserDetails.tsx` — sezione placeholder "Da sviluppare"
- [ ] **5.6** `Diary.tsx` — sezione: WeekCalendar + DatePicker, PeriodSelect, lista DiaryCard; click DiaryCard → modale con GiornataComponent
- [ ] **5.7** `Foods.tsx` — sezione con tre sottosezioni:
  - FoodSearchBar → risultati → bottone dettaglio → FoodDetailPanel in modale
  - Ricerca ricetta (FoodSearchBar senza brand/shop) → risultati → bottone dettaglio → modale ricetta
  - Form creazione alimento (dropdown)
  - Form creazione ricetta (dropdown)
- [ ] **5.8** `CreateFoodForm.tsx` — form accordion creazione alimento (Food + Detail + Macro + Specifics + bottone) con check duplicati
- [ ] **5.9** `CreateRecipeForm.tsx` — form accordion creazione ricetta (nome, sub multipla, FoodRow list, toggle cotto/crudo, peso crudo readOnly, peso cotto, crea)

**File chiave:** `app/src/components/organisms/`

---

## 6. GraphQL layer — Frontend

### 6.1 Verifiche/Aggiunte backend (prima di procedere)
- [ ] Verificare `backend/GraphQL/Models/Category/` → aggiungere `getCategories()` query se mancante
- [ ] Verificare `backend/GraphQL/Models/User/User_meal/user.queries.ts` → aggiungere `getMealsByDate(userId, date)` se mancante
- [ ] Verificare `backend/GraphQL/Models/User/User_fase/user.queries.ts` → aggiungere `getDiaryByDate(userId, date)` se mancante
- [ ] Verificare `backend/GraphQL/Models/User/user.queries.ts` → aggiungere `getDataUserByDate(userId, date)` se mancante
- [ ] Verificare `backend/GraphQL/Models/Foods/foods.queries.ts` → assicurarsi che `getFoodsByFullName` ritorni `isFxApproximated` e tutti i macro
- [ ] Verificare `backend/GraphQL/Models/Recipe/` → aggiungere queries `getRecipesByInput` e mutation `createRecipe` se mancanti
- [ ] Verificare `backend/GraphQL/Models/User/User_meal/user.mutations.ts` → confermare `createMeal`, `updateMeal`

### 6.2 Aggiornamenti frontend `gql_crud/`
- [ ] **6.2.1** `gql_crud/cats_subs/queries.ts` — aggiungere `GET_CATEGORIES`
- [ ] **6.2.2** `gql_crud/foods_dets/queries.ts` — aggiungere `GET_FOODS_BY_FULL_NAME` (con macro, brand, shop, isFxApproximated, specifics)
- [ ] **6.2.3** `gql_crud/diary/queries.ts` — `GET_DIARY_BY_DATE`, `GET_DIARIES_BY_PERIOD`
- [ ] **6.2.4** `gql_crud/meals/queries.ts` — `GET_MEALS_BY_DATE`
- [ ] **6.2.5** `gql_crud/meals/mutations.ts` — `CREATE_MEAL`, `UPDATE_MEAL`
- [ ] **6.2.6** `gql_crud/user/queries.ts` — aggiungere `GET_DATA_USER_BY_DATE`
- [ ] **6.2.7** `gql_crud/recipes/queries.ts` — `GET_RECIPES_BY_INPUT`, `GET_RECIPE_DETAILS`
- [ ] **6.2.8** `gql_crud/recipes/mutations.ts` — `CREATE_RECIPE`

---

## 7. Utils/Hooks layer

- [ ] **7.1** `utils/hooks/useFoodSearch.ts` — stato ricerca + filtri; chiama `GET_FOODS_BY_INPUT` / `GET_FOODS_BY_FULL_NAME`; ritorna `{ results, search, setSearch, filters, setFilters, loading }`
- [ ] **7.2** `utils/hooks/useMeal.ts` — `GET_MEALS_BY_DATE`, `CREATE_MEAL`, `UPDATE_MEAL`; ritorna `{ meals, createMeal, updateMeal, loading }`
- [ ] **7.3** `utils/hooks/useDiary.ts` — `GET_DIARY_BY_DATE`, `GET_DIARIES_BY_PERIOD`; ritorna `{ diary, diaries, loading }`
- [ ] **7.4** `utils/hooks/useCreateFood.ts` — `CREATE_FOOD_DETS`; check duplicati tramite `GET_FOODS_BY_FULL_NAME`; ritorna `{ createFood, loading, error, duplicates }`
- [ ] **7.5** `utils/hooks/useCreateRecipe.ts` — `CREATE_RECIPE`; ritorna `{ createRecipe, loading, error }`
- [ ] **7.6** `utils/hooks/useNavigation.ts` — stato navigazione SPA; `{ activeSection, navigate }`
- [ ] **7.7** `utils/macroCalc.ts` — funzioni pure:
  - `calcMacroFromWeight(macro: IMacro, weight: number): IMacro` — scala macro per peso
  - `sumMacros(macros: IMacro[]): IMacro` — somma array di macro
  - `calcRemainingMacros(consumed: IMacro, expectedKcal: number): IMacro` — calcola residui (1g fat=9kcal, 1g carbo/prot=4kcal)

**File chiave:** `app/src/utils/`

---

## 8. App Shell — Refactor App.tsx

- [ ] **8.1** Aggiornare `app/src/App.tsx` — rimuovere il vecchio render di `CreateFoodForm`; montare `AppShell` che contiene `NavMenu` + sezione attiva
- [ ] **8.2** `app/src/main.tsx` — nessuna modifica necessaria (ApolloClient già configurato)

---

## 9. Pulizia

- [ ] **9.1** Eliminare `app/src/components/temp/foodForm.tsx` una volta che `CreateFoodForm.tsx` (organism) è completo e integrato

---

## Ordine di esecuzione consigliato

```
Fase A: 1 → 2 → 3 (dark mode, tipi, atoms)
Fase B: 6.1 (verifica/fix backend) → 6.2 (frontend gql_crud)
Fase C: 7 (hooks/utils) in parallelo con Fase D
Fase D: 4 (molecules) → 5 (organisms) → 8 (App)
Fase E: 9 (pulizia)
```

---

## Verifica end-to-end

1. Avviare backend (`npm run dev` in `/backend`) e frontend (`npm run dev` in `/app`)
2. Navigare le 4 sezioni dal menu
3. Dashboard: creare un pasto → verificare comparsa nella "Giornata" + calcolo macro
4. Diario: selezionare un giorno passato → aprire card → vedere GiornataComponent
5. Alimenti: cercare alimento → vedere dettaglio completo → creare nuovo alimento → verificare check duplicati
6. Dark mode: toggle classe `.dark` su `<html>` → colori devono cambiare automaticamente
