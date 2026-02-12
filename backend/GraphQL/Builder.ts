import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "../generated/pothos-types.js";
import { getDatamodel } from "../generated/pothos-types.js";
//import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma, Prisma } from "../src/lib/prisma.js";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
//import { Prisma } from "../generated/prisma/client.js";
//import * as GeneratedClient from "../generated/prisma/client.js";
import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import { PrismaClient } from "generated/prisma/index.js";

export interface GraphQLContext {
  prisma: PrismaClient;
  userId: string | null;
  req: Request;
}

export const Builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: GraphQLContext;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    // Definiamo il mapping tra il nome GraphQL e il tipo TS di Prisma
    Decimal: { Input: Prisma.Decimal; Output: Prisma.Decimal };
    JSON: {
      Input: unknown;
      Output: unknown;
    };
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: () => prisma,
    dmmf: getDatamodel(),
  },
});

// Scalar con logica manuale (più sicuro con client generati custom)
Builder.scalarType("Decimal", {
  // 1. Definisci lo scalar con il nome
  serialize: (value) => {
    // value è di tipo Prisma.Decimal
    return (value as Prisma.Decimal).toString();
  },
  parseValue: (value) => {
    // value proviene dal client (stringa o numero)
    return new Prisma.Decimal(value as string | number);
  },
  parseLiteral: (ast) => {
    if (
      ast.kind === Kind.STRING ||
      ast.kind === Kind.INT ||
      ast.kind === Kind.FLOAT
    ) {
      return new Prisma.Decimal(ast.value);
    }
    // Invece di return null, lancia un GraphQLError
    throw new GraphQLError(
      `Decimal Scalar can only parse string, int or float but got ${ast.kind}`,
    );
  },
});

Builder.addScalarType("DateTime", DateTimeResolver);
Builder.addScalarType("JSON", JSONResolver, {});

// Inizializziamo i tipi base prima di registrare i models
Builder.queryType({});
Builder.mutationType({});

// Creiamo lo Scalar manualmente senza librerie esterne
/* const DecimalScalar = new GraphQLScalarType({
  name: "Decimal",
  description: "Tipo custom per gestire i Decimal di Prisma",
  serialize: (value) => (value as Prisma.Decimal).toString(), // Da server a client (stringa)
  parseValue: (value) => new Prisma.Decimal(value as string | number), // Da client a server
  parseLiteral: (ast) => {
    if (
      ast.kind === Kind.STRING ||
      ast.kind === Kind.INT ||
      ast.kind === Kind.FLOAT
    ) {
      return new Prisma.Decimal(ast.value);
    }
    return null;
  },
}); */

/* import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "../src/lib/prisma.js";

export interface GraphQLContext {
  userId: string | null;
  req: Request;
}

export const Builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: GraphQLContext;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    dmmf: prisma.dmmf,
  },
});

Builder.queryType({});
Builder.mutationType({});
 */
