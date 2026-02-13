import { Builder } from "../../../Builder.js";
import { prisma } from "../../../../src/lib/prisma.js";

// Restituisce il DiaryUser per un utente in una specifica data (formato ISO YYYY-MM-DD)
Builder.queryField("getDiaryByDate", (t) =>
  t.prismaField({
    type: "DiaryUser",
    nullable: true,
    args: {
      userId: t.arg.string({ required: true }),
      date: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      const start = new Date(args.date);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(args.date);
      end.setUTCHours(23, 59, 59, 999);

      return prisma.diaryUser.findFirst({
        ...query,
        where: {
          day: { gte: start, lte: end },
          fase_specific: {
            fase: { id_user: args.userId },
          },
        },
      });
    },
  })
);

// Restituisce tutti i DiaryUser per un utente in un periodo (formato ISO YYYY-MM-DD)
Builder.queryField("getDiariesByPeriod", (t) =>
  t.prismaField({
    type: ["DiaryUser"],
    args: {
      userId: t.arg.string({ required: true }),
      from: t.arg.string({ required: true }),
      to: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      const start = new Date(args.from);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(args.to);
      end.setUTCHours(23, 59, 59, 999);

      return prisma.diaryUser.findMany({
        ...query,
        where: {
          day: { gte: start, lte: end },
          fase_specific: {
            fase: { id_user: args.userId },
          },
        },
        orderBy: { day: "desc" },
      });
    },
  })
);
