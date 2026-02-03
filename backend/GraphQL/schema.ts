// backend/GraphQL/schema.ts
import { Builder } from "./Builder.js";

// Importiamo prima gli enum (devono essere registrati prima dei models che li usano)
import "./enum.js";

// Carichiamo tutti i modelli (registra query/mutation)
// Il Builder è già inizializzato con queryType e mutationType in Builder.ts
import "./Models/index.js";

export const schema = Builder.toSchema();