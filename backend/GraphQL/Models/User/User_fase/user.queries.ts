import { Builder } from "../../../Builder.js";
import { prisma } from "../../../../src/lib/prisma.js";

Builder.queryField("faseUser", (t) =>
  t.prismaField({
    type: ["FaseUser"],
    resolve: (query, _p, _args, context) => {
      if (context.userId) {
        return prisma.faseUser.findMany({
          where: {
            id_user: context.userId,
          },
          ...query,
        });
      } else return null;
    },
  }),
);

/* Fase_specifics e  DiaryUser possono essere prese con riferimento a userId 
solo tramite FaseUser*/
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

Builder.queryField("diaryUser", (t) =>
  t.prismaField({
    type: "DiaryUser",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.diaryUser.findUnique({
        where: { id: args.id }, // per id diary
        ...query,
      });
    },
  }),
);
