import { prisma } from "../../../../src/lib/prisma.js";
import { Builder } from "../../../Builder.js";
import { SexEnum } from "../../../enum.js";

Builder.mutationField("UserFase", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: true }),
      surname: t.arg.string({ required: true }),
      nickname: t.arg.string({ required: false }),
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
      sex: t.arg({ type: SexEnum, required: true }),
      birthday: t.arg({ type: "DateTime", required: true }),
      height: t.arg.int({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
          surname: args.surname,
          nickname: args.nickname,
          email: args.email,
          password: args.password,
          sex: args.sex,
          birthday: args.birthday,
          height: args.height,
        },
        ...(query as any),
      });
    },
  }),
);
