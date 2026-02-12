import { Builder } from "../../../Builder.js";
import { SexEnum } from "../../../enum.js";

export const FaseUser = Builder.prismaObject("FaseUser", {
  fields: (t) => ({
    id: t.exposeString("id"),
    fase_name: t.exposeString("fase_name"),
    multiply_perc: t.exposeInt("multiply_perc"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    id_user: t.exposeString("id_user"),
    user: t.relation("user"),
    fase_specifics: t.relation("fase_specifics"),
  }),
});

export const Fase_specifics = Builder.prismaObject("Fase_specifics", {
  fields: (t) => ({
    id: t.exposeString("id"),
    deltaKcal_perc: t.exposeInt("deltaKcal_perc"),
    fat_perc: t.exposeInt("fat_perc"),
    sat_fat_perc: t.exposeInt("sat_fat_perc"),
    carbo_perc: t.exposeInt("carbo_perc"),
    sugar_perc: t.exposeInt("sugar_perc"),
    fiber_perc: t.exposeInt("fiber_perc"),
    proteins_perc: t.exposeInt("proteins_perc"),
    salt_perc: t.exposeInt("salt_perc"),

    validFrom: t.expose("validFrom", { type: "DateTime" }),
    validTo: t.expose("validTo", { type: "DateTime", nullable: true }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    id_fase: t.exposeString("id_fase"),
    fase: t.relation("fase"),
    diaryUser: t.relation("diaryUser"),
  }),
});

export const DiaryUser = Builder.prismaObject("DiaryUser", {
  fields: (t) => ({
    id: t.exposeString("id"),
    aspected_kcal: t.expose("aspected_kcal", {
      type: "Decimal",
    }),
    day: t.expose("day", { type: "DateTime" }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    id_fase_specific: t.exposeString("id_fase_specific"),
    fase_specific: t.relation("fase_specific"),
    meals: t.relation("meals"),
  }),
});
