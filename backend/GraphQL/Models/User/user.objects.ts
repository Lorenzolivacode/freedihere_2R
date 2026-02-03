import { Builder } from "../../Builder.js";
import { SexEnum } from "../../enum.js";

export const User = Builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    surname: t.exposeString("surname"),
    nickname: t.exposeString("nickname"),
    email: t.exposeString("email"),
    password: t.exposeString("password"),
    sex: t.expose("sex", { type: SexEnum }),
    birthday: t.expose("birthday", { type: "DateTime" }),
    height: t.exposeInt("height"),

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

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    id_user: t.exposeString("id_user"),
    user: t.relation("user"),
  }),
});

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

export const Meals = Builder.prismaObject("Meals", {
  fields: (t) => ({
    id: t.exposeString("id"),
    meal_name: t.exposeString("meal_name"),
    mealSnapshot: t.expose("mealSnapshot", { type: "JSON" }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    id_diary: t.exposeString("id_diary"),
    diaryUser: t.relation("diaryUser"),
    join_meal_food: t.relation("join_meal_food"),
  }),
});

export const join_meal_food = Builder.prismaObject("join_meal_food", {
  fields: (t) => ({
    id: t.exposeString("id"),
    weight: t.expose("weight", {
      type: "Decimal",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    id_meal: t.exposeString("id_meal"),
    meals: t.relation("meals"),
    id_detail: t.exposeString("id_detail"),
    detail: t.relation("detail"),
    id_recipe: t.exposeString("id_recipe"),
    recipe: t.relation("recipe"),
  }),
});

/* deletedAt: t.field({
  type: "String",
  resolve: (parent) =>
    parent.deletedAt ? parent.deletedAt.toISOString() : null,
}), */
