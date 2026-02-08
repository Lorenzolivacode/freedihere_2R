import { Builder } from "./Builder.js";

export const SexEnum = Builder.enumType("SEX", {
  values: ["M", "F"],
});
export const RoleEnum = Builder.enumType("ROLE", {
  values: ["ADMIN", "USER"],
});
