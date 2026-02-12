import { Builder } from "../../../Builder.js";
import { prisma } from "../../../../src/lib/prisma.js";

Builder.queryField("faseUser", (t) =>
  t.prismaField({
    type: ["FaseUser"],
    resolve: (query) => {
      return prisma.faseUser.findMany({
        ...query, // where userId
      });
    },
  }),
);

Builder.queryField("fase_specifics", (t) =>
  t.prismaField({
    type: "Fase_specifics",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.fase_specifics.findUnique({
        where: { id: args.id }, // per id_fase
        ...query,
      });
    },
  }),
);
Builder.queryField("DiaryUser", (t) =>
  t.prismaField({
    type: "DiaryUser",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.diaryUser.findUnique({
        where: { id: args.id }, // findUnique per day - findMany per id_fase_specific
        ...query,
      });
    },
  }),
);
