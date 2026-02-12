import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

// ✅ Importa lo schema SOLO dopo aver caricato l'ambiente
import { schema } from "../GraphQL/schema.js";
import { prisma } from "./lib/prisma.js";
// Importa qui i tuoi resolver per registrarli

dotenv.config();

//const schema = Builder.toSchema();

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});
//console.log("SERVER: ", server);

const start = async () => {
  // Apollo 5 standalone gestisce i CORS automaticamente per localhost
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
    /* context: async ({ req }) => ({
      prisma,
      userId: req.headers.authorization || null,
    }), */
    context: async ({ req }) => {
      const userId = req.headers["x-user-id"] || null;

      return {
        prisma,
        userId,
      };
    },
  });

  console.log(`🚀 Server pronto su: ${url}`);
};

start().catch((err) => {
  console.error("❌ Errore durante l'avvio:", err);
});

/* import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
//import "./graphql/resolvers/User.js"; // Importa qui i tuoi file resolver per registrarli
//import "./graphql/resolvers/Food.js";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import { Builder } from "../GraphQL/Builder.js";

dotenv.config();

// 1. Generazione dello Schema da Pothos
const schema = Builder.toSchema();

// 2. Configurazione Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [
    // Abilita l'interfaccia Sandbox per testare le query nel browser
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// 3. Avvio del Server Standalone
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
    context: async ({ req }) => {
      // Qui gestirai l'autenticazione in futuro
      return {
        prisma,
        userId: req.headers.authorization || null,
      };
    },
  });

  console.log(`🚀 Server pronto su: ${url}`);
};

start().catch((err) => {
  console.error("❌ Errore durante l'avvio:", err);
});
 */
