// backend/GraphQL/schema.ts
import { Builder } from "./Builder.js";
console.log("CIAO BUILDER: ", Builder);

// Inizializziamo i tipi base
Builder.queryType({});
Builder.mutationType({});

// Carichiamo tutti i modelli (registra query/mutation)
import "./Models/index.js";

export const schema = Builder.toSchema();
