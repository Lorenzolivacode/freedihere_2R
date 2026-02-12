/* eslint-disable */
import type { Prisma, User, DataUser, FaseUser, Fase_specifics, DiaryUser, Meals, join_meal_food, Pans, Category, Subcategory, Foods, Macro, Details, Detail_specifics, Brand, Shop, join_shop_brand, join_detail_shop, Recipe, join_subs_recipe, join_recipe_recipe, join_detail_recipe } from "../generated/prisma/index.js";
import type { PothosPrismaDatamodel } from "@pothos/plugin-prisma";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "dataUser" | "faseUser" | "pans" | "details" | "recipe";
        ListRelations: "dataUser" | "faseUser" | "pans" | "details" | "recipe";
        Relations: {
            dataUser: {
                Shape: DataUser[];
                Name: "DataUser";
                Nullable: false;
            };
            faseUser: {
                Shape: FaseUser[];
                Name: "FaseUser";
                Nullable: false;
            };
            pans: {
                Shape: Pans[];
                Name: "Pans";
                Nullable: false;
            };
            details: {
                Shape: Details[];
                Name: "Details";
                Nullable: false;
            };
            recipe: {
                Shape: Recipe[];
                Name: "Recipe";
                Nullable: false;
            };
        };
    };
    DataUser: {
        Name: "DataUser";
        Shape: DataUser;
        Include: Prisma.DataUserInclude;
        Select: Prisma.DataUserSelect;
        OrderBy: Prisma.DataUserOrderByWithRelationInput;
        WhereUnique: Prisma.DataUserWhereUniqueInput;
        Where: Prisma.DataUserWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    FaseUser: {
        Name: "FaseUser";
        Shape: FaseUser;
        Include: Prisma.FaseUserInclude;
        Select: Prisma.FaseUserSelect;
        OrderBy: Prisma.FaseUserOrderByWithRelationInput;
        WhereUnique: Prisma.FaseUserWhereUniqueInput;
        Where: Prisma.FaseUserWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "fase_specifics";
        ListRelations: "fase_specifics";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            fase_specifics: {
                Shape: Fase_specifics[];
                Name: "Fase_specifics";
                Nullable: false;
            };
        };
    };
    Fase_specifics: {
        Name: "Fase_specifics";
        Shape: Fase_specifics;
        Include: Prisma.Fase_specificsInclude;
        Select: Prisma.Fase_specificsSelect;
        OrderBy: Prisma.Fase_specificsOrderByWithRelationInput;
        WhereUnique: Prisma.Fase_specificsWhereUniqueInput;
        Where: Prisma.Fase_specificsWhereInput;
        Create: {};
        Update: {};
        RelationName: "fase" | "diaryUser";
        ListRelations: "diaryUser";
        Relations: {
            fase: {
                Shape: FaseUser;
                Name: "FaseUser";
                Nullable: false;
            };
            diaryUser: {
                Shape: DiaryUser[];
                Name: "DiaryUser";
                Nullable: false;
            };
        };
    };
    DiaryUser: {
        Name: "DiaryUser";
        Shape: DiaryUser;
        Include: Prisma.DiaryUserInclude;
        Select: Prisma.DiaryUserSelect;
        OrderBy: Prisma.DiaryUserOrderByWithRelationInput;
        WhereUnique: Prisma.DiaryUserWhereUniqueInput;
        Where: Prisma.DiaryUserWhereInput;
        Create: {};
        Update: {};
        RelationName: "fase_specific" | "meals";
        ListRelations: "meals";
        Relations: {
            fase_specific: {
                Shape: Fase_specifics;
                Name: "Fase_specifics";
                Nullable: false;
            };
            meals: {
                Shape: Meals[];
                Name: "Meals";
                Nullable: false;
            };
        };
    };
    Meals: {
        Name: "Meals";
        Shape: Meals;
        Include: Prisma.MealsInclude;
        Select: Prisma.MealsSelect;
        OrderBy: Prisma.MealsOrderByWithRelationInput;
        WhereUnique: Prisma.MealsWhereUniqueInput;
        Where: Prisma.MealsWhereInput;
        Create: {};
        Update: {};
        RelationName: "diaryUser" | "join_meal_food";
        ListRelations: "join_meal_food";
        Relations: {
            diaryUser: {
                Shape: DiaryUser;
                Name: "DiaryUser";
                Nullable: false;
            };
            join_meal_food: {
                Shape: join_meal_food[];
                Name: "join_meal_food";
                Nullable: false;
            };
        };
    };
    join_meal_food: {
        Name: "join_meal_food";
        Shape: join_meal_food;
        Include: Prisma.join_meal_foodInclude;
        Select: Prisma.join_meal_foodSelect;
        OrderBy: Prisma.join_meal_foodOrderByWithRelationInput;
        WhereUnique: Prisma.join_meal_foodWhereUniqueInput;
        Where: Prisma.join_meal_foodWhereInput;
        Create: {};
        Update: {};
        RelationName: "meals" | "detail" | "recipe";
        ListRelations: never;
        Relations: {
            meals: {
                Shape: Meals;
                Name: "Meals";
                Nullable: false;
            };
            detail: {
                Shape: Details | null;
                Name: "Details";
                Nullable: true;
            };
            recipe: {
                Shape: Recipe | null;
                Name: "Recipe";
                Nullable: true;
            };
        };
    };
    Pans: {
        Name: "Pans";
        Shape: Pans;
        Include: Prisma.PansInclude;
        Select: Prisma.PansSelect;
        OrderBy: Prisma.PansOrderByWithRelationInput;
        WhereUnique: Prisma.PansWhereUniqueInput;
        Where: Prisma.PansWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
        };
    };
    Category: {
        Name: "Category";
        Shape: Category;
        Include: Prisma.CategoryInclude;
        Select: Prisma.CategorySelect;
        OrderBy: Prisma.CategoryOrderByWithRelationInput;
        WhereUnique: Prisma.CategoryWhereUniqueInput;
        Where: Prisma.CategoryWhereInput;
        Create: {};
        Update: {};
        RelationName: "subcat";
        ListRelations: "subcat";
        Relations: {
            subcat: {
                Shape: Subcategory[];
                Name: "Subcategory";
                Nullable: false;
            };
        };
    };
    Subcategory: {
        Name: "Subcategory";
        Shape: Subcategory;
        Include: Prisma.SubcategoryInclude;
        Select: Prisma.SubcategorySelect;
        OrderBy: Prisma.SubcategoryOrderByWithRelationInput;
        WhereUnique: Prisma.SubcategoryWhereUniqueInput;
        Where: Prisma.SubcategoryWhereInput;
        Create: {};
        Update: {};
        RelationName: "cat" | "food" | "join_recipe";
        ListRelations: "food" | "join_recipe";
        Relations: {
            cat: {
                Shape: Category;
                Name: "Category";
                Nullable: false;
            };
            food: {
                Shape: Foods[];
                Name: "Foods";
                Nullable: false;
            };
            join_recipe: {
                Shape: join_subs_recipe[];
                Name: "join_subs_recipe";
                Nullable: false;
            };
        };
    };
    Foods: {
        Name: "Foods";
        Shape: Foods;
        Include: Prisma.FoodsInclude;
        Select: Prisma.FoodsSelect;
        OrderBy: Prisma.FoodsOrderByWithRelationInput;
        WhereUnique: Prisma.FoodsWhereUniqueInput;
        Where: Prisma.FoodsWhereInput;
        Create: {};
        Update: {};
        RelationName: "subcat" | "dets";
        ListRelations: "dets";
        Relations: {
            subcat: {
                Shape: Subcategory | null;
                Name: "Subcategory";
                Nullable: true;
            };
            dets: {
                Shape: Details[];
                Name: "Details";
                Nullable: false;
            };
        };
    };
    Macro: {
        Name: "Macro";
        Shape: Macro;
        Include: Prisma.MacroInclude;
        Select: Prisma.MacroSelect;
        OrderBy: Prisma.MacroOrderByWithRelationInput;
        WhereUnique: Prisma.MacroWhereUniqueInput;
        Where: Prisma.MacroWhereInput;
        Create: {};
        Update: {};
        RelationName: "detail" | "recipe";
        ListRelations: never;
        Relations: {
            detail: {
                Shape: Details | null;
                Name: "Details";
                Nullable: true;
            };
            recipe: {
                Shape: Recipe | null;
                Name: "Recipe";
                Nullable: true;
            };
        };
    };
    Details: {
        Name: "Details";
        Shape: Details;
        Include: Prisma.DetailsInclude;
        Select: Prisma.DetailsSelect;
        OrderBy: Prisma.DetailsOrderByWithRelationInput;
        WhereUnique: Prisma.DetailsWhereUniqueInput;
        Where: Prisma.DetailsWhereInput;
        Create: {};
        Update: {};
        RelationName: "macro" | "food" | "brand" | "user" | "join_meal_food" | "specifics" | "join_shops" | "join_recipe";
        ListRelations: "join_meal_food" | "specifics" | "join_shops" | "join_recipe";
        Relations: {
            macro: {
                Shape: Macro | null;
                Name: "Macro";
                Nullable: true;
            };
            food: {
                Shape: Foods;
                Name: "Foods";
                Nullable: false;
            };
            brand: {
                Shape: Brand | null;
                Name: "Brand";
                Nullable: true;
            };
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            join_meal_food: {
                Shape: join_meal_food[];
                Name: "join_meal_food";
                Nullable: false;
            };
            specifics: {
                Shape: Detail_specifics[];
                Name: "Detail_specifics";
                Nullable: false;
            };
            join_shops: {
                Shape: join_detail_shop[];
                Name: "join_detail_shop";
                Nullable: false;
            };
            join_recipe: {
                Shape: join_detail_recipe[];
                Name: "join_detail_recipe";
                Nullable: false;
            };
        };
    };
    Detail_specifics: {
        Name: "Detail_specifics";
        Shape: Detail_specifics;
        Include: Prisma.Detail_specificsInclude;
        Select: Prisma.Detail_specificsSelect;
        OrderBy: Prisma.Detail_specificsOrderByWithRelationInput;
        WhereUnique: Prisma.Detail_specificsWhereUniqueInput;
        Where: Prisma.Detail_specificsWhereInput;
        Create: {};
        Update: {};
        RelationName: "detail";
        ListRelations: never;
        Relations: {
            detail: {
                Shape: Details | null;
                Name: "Details";
                Nullable: true;
            };
        };
    };
    Brand: {
        Name: "Brand";
        Shape: Brand;
        Include: Prisma.BrandInclude;
        Select: Prisma.BrandSelect;
        OrderBy: Prisma.BrandOrderByWithRelationInput;
        WhereUnique: Prisma.BrandWhereUniqueInput;
        Where: Prisma.BrandWhereInput;
        Create: {};
        Update: {};
        RelationName: "join_shop" | "dets";
        ListRelations: "join_shop" | "dets";
        Relations: {
            join_shop: {
                Shape: join_shop_brand[];
                Name: "join_shop_brand";
                Nullable: false;
            };
            dets: {
                Shape: Details[];
                Name: "Details";
                Nullable: false;
            };
        };
    };
    Shop: {
        Name: "Shop";
        Shape: Shop;
        Include: Prisma.ShopInclude;
        Select: Prisma.ShopSelect;
        OrderBy: Prisma.ShopOrderByWithRelationInput;
        WhereUnique: Prisma.ShopWhereUniqueInput;
        Where: Prisma.ShopWhereInput;
        Create: {};
        Update: {};
        RelationName: "join_brand" | "join_details";
        ListRelations: "join_brand" | "join_details";
        Relations: {
            join_brand: {
                Shape: join_shop_brand[];
                Name: "join_shop_brand";
                Nullable: false;
            };
            join_details: {
                Shape: join_detail_shop[];
                Name: "join_detail_shop";
                Nullable: false;
            };
        };
    };
    join_shop_brand: {
        Name: "join_shop_brand";
        Shape: join_shop_brand;
        Include: Prisma.join_shop_brandInclude;
        Select: Prisma.join_shop_brandSelect;
        OrderBy: Prisma.join_shop_brandOrderByWithRelationInput;
        WhereUnique: Prisma.join_shop_brandWhereUniqueInput;
        Where: Prisma.join_shop_brandWhereInput;
        Create: {};
        Update: {};
        RelationName: "brand" | "shop";
        ListRelations: never;
        Relations: {
            brand: {
                Shape: Brand;
                Name: "Brand";
                Nullable: false;
            };
            shop: {
                Shape: Shop;
                Name: "Shop";
                Nullable: false;
            };
        };
    };
    join_detail_shop: {
        Name: "join_detail_shop";
        Shape: join_detail_shop;
        Include: Prisma.join_detail_shopInclude;
        Select: Prisma.join_detail_shopSelect;
        OrderBy: Prisma.join_detail_shopOrderByWithRelationInput;
        WhereUnique: Prisma.join_detail_shopWhereUniqueInput;
        Where: Prisma.join_detail_shopWhereInput;
        Create: {};
        Update: {};
        RelationName: "detail" | "shop";
        ListRelations: never;
        Relations: {
            detail: {
                Shape: Details;
                Name: "Details";
                Nullable: false;
            };
            shop: {
                Shape: Shop;
                Name: "Shop";
                Nullable: false;
            };
        };
    };
    Recipe: {
        Name: "Recipe";
        Shape: Recipe;
        Include: Prisma.RecipeInclude;
        Select: Prisma.RecipeSelect;
        OrderBy: Prisma.RecipeOrderByWithRelationInput;
        WhereUnique: Prisma.RecipeWhereUniqueInput;
        Where: Prisma.RecipeWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe_princ" | "recipe_ingr" | "user" | "join_meal_food" | "macros" | "join_subs" | "join_details";
        ListRelations: "recipe_princ" | "recipe_ingr" | "join_meal_food" | "macros" | "join_subs" | "join_details";
        Relations: {
            recipe_princ: {
                Shape: join_recipe_recipe[];
                Name: "join_recipe_recipe";
                Nullable: false;
            };
            recipe_ingr: {
                Shape: join_recipe_recipe[];
                Name: "join_recipe_recipe";
                Nullable: false;
            };
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            join_meal_food: {
                Shape: join_meal_food[];
                Name: "join_meal_food";
                Nullable: false;
            };
            macros: {
                Shape: Macro[];
                Name: "Macro";
                Nullable: false;
            };
            join_subs: {
                Shape: join_subs_recipe[];
                Name: "join_subs_recipe";
                Nullable: false;
            };
            join_details: {
                Shape: join_detail_recipe[];
                Name: "join_detail_recipe";
                Nullable: false;
            };
        };
    };
    join_subs_recipe: {
        Name: "join_subs_recipe";
        Shape: join_subs_recipe;
        Include: Prisma.join_subs_recipeInclude;
        Select: Prisma.join_subs_recipeSelect;
        OrderBy: Prisma.join_subs_recipeOrderByWithRelationInput;
        WhereUnique: Prisma.join_subs_recipeWhereUniqueInput;
        Where: Prisma.join_subs_recipeWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe" | "subs";
        ListRelations: never;
        Relations: {
            recipe: {
                Shape: Recipe;
                Name: "Recipe";
                Nullable: false;
            };
            subs: {
                Shape: Subcategory;
                Name: "Subcategory";
                Nullable: false;
            };
        };
    };
    join_recipe_recipe: {
        Name: "join_recipe_recipe";
        Shape: join_recipe_recipe;
        Include: Prisma.join_recipe_recipeInclude;
        Select: Prisma.join_recipe_recipeSelect;
        OrderBy: Prisma.join_recipe_recipeOrderByWithRelationInput;
        WhereUnique: Prisma.join_recipe_recipeWhereUniqueInput;
        Where: Prisma.join_recipe_recipeWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe_princ" | "recipe_ingr";
        ListRelations: never;
        Relations: {
            recipe_princ: {
                Shape: Recipe;
                Name: "Recipe";
                Nullable: false;
            };
            recipe_ingr: {
                Shape: Recipe;
                Name: "Recipe";
                Nullable: false;
            };
        };
    };
    join_detail_recipe: {
        Name: "join_detail_recipe";
        Shape: join_detail_recipe;
        Include: Prisma.join_detail_recipeInclude;
        Select: Prisma.join_detail_recipeSelect;
        OrderBy: Prisma.join_detail_recipeOrderByWithRelationInput;
        WhereUnique: Prisma.join_detail_recipeWhereUniqueInput;
        Where: Prisma.join_detail_recipeWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe" | "detail";
        ListRelations: never;
        Relations: {
            recipe: {
                Shape: Recipe;
                Name: "Recipe";
                Nullable: false;
            };
            detail: {
                Shape: Details;
                Name: "Details";
                Nullable: false;
            };
        };
    };
}
export function getDatamodel(): PothosPrismaDatamodel { return JSON.parse("{\"datamodel\":{\"models\":{\"User\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"surname\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"nickname\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"password\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"SEX\",\"kind\":\"enum\",\"name\":\"sex\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"birthday\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"height\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"ROLE\",\"kind\":\"enum\",\"name\":\"role\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DataUser\",\"kind\":\"object\",\"name\":\"dataUser\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DataUserToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"FaseUser\",\"kind\":\"object\",\"name\":\"faseUser\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"FaseUserToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Pans\",\"kind\":\"object\",\"name\":\"pans\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PansToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"details\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"DataUser\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"weight\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"waistline\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"crew_neck\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"chest\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"arm\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"thigh\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"calf\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"fat_mass\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"BMI\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"day\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DataUserToUser\",\"relationFromFields\":[\"id_user\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"id_user\",\"createdAt\"]}]},\"FaseUser\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"fase_name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"multiply_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"FaseUserToUser\",\"relationFromFields\":[\"id_user\"],\"isUpdatedAt\":false},{\"type\":\"Fase_specifics\",\"kind\":\"object\",\"name\":\"fase_specifics\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"FaseUserToFase_specifics\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"id_user\",\"fase_name\"]}]},\"Fase_specifics\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"deltaKcal_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"fat_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"sat_fat_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"carbo_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"sugar_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"fiber_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"proteins_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"salt_perc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"validFrom\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"validTo\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_fase\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"FaseUser\",\"kind\":\"object\",\"name\":\"fase\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"FaseUserToFase_specifics\",\"relationFromFields\":[\"id_fase\"],\"isUpdatedAt\":false},{\"type\":\"DiaryUser\",\"kind\":\"object\",\"name\":\"diaryUser\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiaryUserToFase_specifics\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"DiaryUser\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"aspected_kcal\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"day\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_fase_specific\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Fase_specifics\",\"kind\":\"object\",\"name\":\"fase_specific\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiaryUserToFase_specifics\",\"relationFromFields\":[\"id_fase_specific\"],\"isUpdatedAt\":false},{\"type\":\"Meals\",\"kind\":\"object\",\"name\":\"meals\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiaryUserToMeals\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"day\",\"id_fase_specific\"]}]},\"Meals\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"meal_name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"mealSnapshot\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_diary\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DiaryUser\",\"kind\":\"object\",\"name\":\"diaryUser\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiaryUserToMeals\",\"relationFromFields\":[\"id_diary\"],\"isUpdatedAt\":false},{\"type\":\"join_meal_food\",\"kind\":\"object\",\"name\":\"join_meal_food\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"MealsTojoin_meal_food\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"join_meal_food\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"weight\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_meal\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Meals\",\"kind\":\"object\",\"name\":\"meals\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"MealsTojoin_meal_food\",\"relationFromFields\":[\"id_meal\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_detail\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"detail\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsTojoin_meal_food\",\"relationFromFields\":[\"id_detail\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_recipe\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeTojoin_meal_food\",\"relationFromFields\":[\"id_recipe\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"id_meal\",\"id_detail\"]},{\"name\":null,\"fields\":[\"id_meal\",\"id_recipe\"]}]},\"Pans\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"pan_name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"pan_weight\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PansToUser\",\"relationFromFields\":[\"id_user\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Category\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"category_name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Subcategory\",\"kind\":\"object\",\"name\":\"subcat\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CategoryToSubcategory\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Subcategory\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_cat\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"subcategory_name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Category\",\"kind\":\"object\",\"name\":\"cat\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"CategoryToSubcategory\",\"relationFromFields\":[\"id_cat\"],\"isUpdatedAt\":false},{\"type\":\"Foods\",\"kind\":\"object\",\"name\":\"food\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"FoodsToSubcategory\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_subs_recipe\",\"kind\":\"object\",\"name\":\"join_recipe\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SubcategoryTojoin_subs_recipe\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Foods\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"food\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"food_note\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_sub\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Subcategory\",\"kind\":\"object\",\"name\":\"subcat\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"FoodsToSubcategory\",\"relationFromFields\":[\"id_sub\"],\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"dets\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsToFoods\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"food\",\"id_sub\"]}]},\"Macro\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"kcal\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"fat\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"sat_fat\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"carbo\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"sugar\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"fiber\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"proteins\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"salt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"isFSApproximated\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"conversion_perc\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"total_weight\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_detail\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"detail\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsToMacro\",\"relationFromFields\":[\"id_detail\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_recipe\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"MacroToRecipe\",\"relationFromFields\":[\"id_recipe\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Details\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"detail_product\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"note\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Macro\",\"kind\":\"object\",\"name\":\"macro\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsToMacro\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_food\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Foods\",\"kind\":\"object\",\"name\":\"food\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsToFoods\",\"relationFromFields\":[\"id_food\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_brand\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Brand\",\"kind\":\"object\",\"name\":\"brand\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BrandToDetails\",\"relationFromFields\":[\"id_brand\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsToUser\",\"relationFromFields\":[\"id_user\"],\"isUpdatedAt\":false},{\"type\":\"join_meal_food\",\"kind\":\"object\",\"name\":\"join_meal_food\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsTojoin_meal_food\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Detail_specifics\",\"kind\":\"object\",\"name\":\"specifics\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Detail_specificsToDetails\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_detail_shop\",\"kind\":\"object\",\"name\":\"join_shops\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsTojoin_detail_shop\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_detail_recipe\",\"kind\":\"object\",\"name\":\"join_recipe\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsTojoin_detail_recipe\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Detail_specifics\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"unity_weight\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_detail\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"detail\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Detail_specificsToDetails\",\"relationFromFields\":[\"id_detail\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Brand\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name_brand\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"join_shop_brand\",\"kind\":\"object\",\"name\":\"join_shop\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BrandTojoin_shop_brand\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"dets\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BrandToDetails\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Shop\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name_shop\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"join_shop_brand\",\"kind\":\"object\",\"name\":\"join_brand\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShopTojoin_shop_brand\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_detail_shop\",\"kind\":\"object\",\"name\":\"join_details\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShopTojoin_detail_shop\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"join_shop_brand\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_brand\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Brand\",\"kind\":\"object\",\"name\":\"brand\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BrandTojoin_shop_brand\",\"relationFromFields\":[\"id_brand\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_shop\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Shop\",\"kind\":\"object\",\"name\":\"shop\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShopTojoin_shop_brand\",\"relationFromFields\":[\"id_shop\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"id_brand\",\"id_shop\"]}]},\"join_detail_shop\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_detail\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"detail\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsTojoin_detail_shop\",\"relationFromFields\":[\"id_detail\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_shop\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Shop\",\"kind\":\"object\",\"name\":\"shop\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ShopTojoin_detail_shop\",\"relationFromFields\":[\"id_shop\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Recipe\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name_recipe\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"recipe_note\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"join_recipe_recipe\",\"kind\":\"object\",\"name\":\"recipe_princ\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"recipePrincipal\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_recipe_recipe\",\"kind\":\"object\",\"name\":\"recipe_ingr\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"recipeIngridient\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeToUser\",\"relationFromFields\":[\"id_user\"],\"isUpdatedAt\":false},{\"type\":\"join_meal_food\",\"kind\":\"object\",\"name\":\"join_meal_food\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeTojoin_meal_food\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Macro\",\"kind\":\"object\",\"name\":\"macros\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"MacroToRecipe\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_subs_recipe\",\"kind\":\"object\",\"name\":\"join_subs\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeTojoin_subs_recipe\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"join_detail_recipe\",\"kind\":\"object\",\"name\":\"join_details\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeTojoin_detail_recipe\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"join_subs_recipe\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_recipe\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeTojoin_subs_recipe\",\"relationFromFields\":[\"id_recipe\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_sub\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Subcategory\",\"kind\":\"object\",\"name\":\"subs\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SubcategoryTojoin_subs_recipe\",\"relationFromFields\":[\"id_sub\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"join_recipe_recipe\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"amount_food_perc\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_recipePrinc\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe_princ\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"recipePrincipal\",\"relationFromFields\":[\"id_recipePrinc\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_recipeIngr\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe_ingr\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"recipeIngridient\",\"relationFromFields\":[\"id_recipeIngr\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"join_detail_recipe\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Decimal\",\"kind\":\"scalar\",\"name\":\"amount_food_perc\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"deletedAt\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_recipe\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Recipe\",\"kind\":\"object\",\"name\":\"recipe\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"RecipeTojoin_detail_recipe\",\"relationFromFields\":[\"id_recipe\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id_detail\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Details\",\"kind\":\"object\",\"name\":\"detail\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DetailsTojoin_detail_recipe\",\"relationFromFields\":[\"id_detail\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]}}}}"); }