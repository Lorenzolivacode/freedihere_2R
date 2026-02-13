import { Builder } from "../../Builder.js";
import { RoleEnum, SexEnum } from "../../enum.js";

export const User = Builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    surname: t.exposeString("surname"),
    nickname: t.exposeString("nickname", { nullable: true }),
    email: t.exposeString("email"),
    password: t.exposeString("password"),
    sex: t.expose("sex", { type: SexEnum }),
    birthday: t.expose("birthday", { type: "DateTime" }),
    height: t.exposeInt("height"),
    role: t.expose("role", { type: RoleEnum, nullable: true }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    recipe: t.relation("recipe"),
    pans: t.relation("pans"),
    dataUser: t.relation("dataUser"),
  }),
});

export const DataUser = Builder.prismaObject("DataUser", {
  fields: (t) => ({
    id: t.exposeString("id"),
    weight: t.expose("weight", {
      type: "Decimal",
    }),
    waistline: t.expose("waistline", {
      type: "Decimal",
      nullable: true,
    }),
    crew_neck: t.expose("crew_neck", {
      type: "Decimal",
      nullable: true,
    }),
    chest: t.expose("chest", {
      type: "Decimal",
      nullable: true,
    }),
    arm: t.expose("arm", {
      type: "Decimal",
      nullable: true,
    }),
    thigh: t.expose("thigh", {
      type: "Decimal",
      nullable: true,
    }),
    calf: t.expose("calf", {
      type: "Decimal",
      nullable: true,
    }),
    fat_mass: t.expose("fat_mass", {
      type: "Decimal",
      nullable: true,
    }),
    BMI: t.expose("BMI", {
      type: "Decimal",
      nullable: true,
    }),
    day: t.expose("day", { type: "DateTime" }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    user: t.relation("user"),
  }),
});

/* deletedAt: t.field({
  type: "String",
  resolve: (parent) =>
    parent.deletedAt ? parent.deletedAt.toISOString() : null,
}), */
