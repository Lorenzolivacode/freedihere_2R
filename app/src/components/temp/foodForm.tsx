import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { GET_BRANDS, GET_SHOPS } from "../../gql_crud/brands_shop/queries.js";
import { GET_SUBCATEGORIES } from "../../gql_crud/cats_subs/queries.js";
import { CREATE_FOOD_DETS } from "../../gql_crud/foods_dets/mutations.js";
import { GET_FOODS_BY_INPUT } from "../../gql_crud/foods_dets/queries.js";
import { getActiveUser, setActiveUser } from "../../utils/session.js";
import { GET_USERDATA_BASE } from "../../gql_crud/user/queries.js";

interface IUserBase {
  name: string;
  surname: string;
  nickname: string;
  role: string;
  birthday: Date;
  email: string;
  height: string;
  sex: string;
}

export default function CreateFoodForm() {
  let userId = getActiveUser();
  if (!userId) {
    userId = "lorenzoliva_admin";
    setActiveUser(userId);
  }

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<{ user: IUserBase }>(GET_USERDATA_BASE, {
    variables: { userId },
  });
  useEffect(() => {
    console.log("USER DATA: ", userData);
    if (userError) console.log("USER: ", userId, "\nUSER Error: ", userError);
    if (userLoading) console.log("USER Loading: ", userLoading);
  }, [userData, userLoading, userError]);

  const [createFood, { loading, error }] = useMutation(CREATE_FOOD_DETS);

  const {
    loading: brandsLoading,
    error: brandsError,
    data: brandsData,
  } = useQuery(GET_BRANDS);
  const {
    loading: subcategoriesLoading,
    error: subcategoriesError,
    data: subcategoriesData,
  } = useQuery(GET_SUBCATEGORIES);
  const {
    loading: shopsLoading,
    error: shopsError,
    data: shopsData,
  } = useQuery(GET_SHOPS);

  const [form, setForm] = useState({
    food: "",
    food_note: "",
    id_sub: "",
    detail_product: "",
    note: "",
    id_brand: "",
    join_shops: "",
    kcal: "",
    fat: "",
    sat_fat: "",
    carbo: "",
    sugar: "",
    fiber: "",
    proteins: "",
    salt: "",
    unity_weights: "",
  });
  const [selectedFood, setSelectedFood] = useState("");

  const [searchFood, setSearchFood] = useState("");

  /*   const {
    loading: foodsByInputLoading,
    error: foodsByInputError,
    data: foodsByInputData,
  } = useQuery(GET_FOODS_BY_INPUT, {
    variables: { input: searchFood },
    skip: !searchFood,
  }); */
  const [
    getFoods,
    {
      loading: _foodsByInputLoading,
      error: _foodsByInputError,
      data: foodsByInputData,
    },
  ] = useLazyQuery(GET_FOODS_BY_INPUT);

  const handleSearch = () => {
    if (searchFood) {
      getFoods({
        variables: { input: searchFood },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange", e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createFood({
      variables: {
        food: form.food,
        food_note: form.food_note || null,
        id_sub: form.id_sub,
        detail_product: form.detail_product || null,
        note: form.note || null,
        id_brand: form.id_brand || null,
        join_shops: form.join_shops
          ? form.join_shops.split(",").map((s) => s.trim())
          : [],
        kcal: parseFloat(form.kcal),
        fat: parseFloat(form.fat),
        sat_fat: parseFloat(form.sat_fat),
        carbo: parseFloat(form.carbo),
        sugar: parseFloat(form.sugar),
        fiber: parseFloat(form.fiber),
        proteins: parseFloat(form.proteins),
        salt: parseFloat(form.salt),
        ...(form.unity_weights
          ? {
              unity_weights: form.unity_weights
                .split(",")
                .map((n) => parseFloat(n.trim())),
            }
          : { unity_weights: [] }),
      },
    });
    setForm({
      food: "",
      food_note: "",
      id_sub: "",
      detail_product: "",
      note: "",
      id_brand: "",
      join_shops: "",
      kcal: "",
      fat: "",
      sat_fat: "",
      carbo: "",
      sugar: "",
      fiber: "",
      proteins: "",
      salt: "",
      unity_weights: "",
    });
  };

  useEffect(() => {
    console.log("Errore POST: ", error);
  }, [error]);
  useEffect(() => {
    if (!!selectedFood && foodsByInputData) {
      const foodsList = (
        foodsByInputData as {
          getFoodsByInput: {
            id: string;
            food: string;
            food_note: string;
            subcategory: { id: string; subcategory_name: string };
          }[];
        }
      ).getFoodsByInput;

      const food = foodsList.find(
        (f: {
          id: string;
          food: string;
          food_note: string;
          subcategory: { id: string; subcategory_name: string };
        }) => f.id === selectedFood,
      );

      if (food) {
        setForm((prev) => ({
          ...prev,
          food: food.food,
          id_sub: food.subcategory.id,
          food_note: food.food_note,
        }));
      }
    }
  }, [selectedFood]);

  const inputStyle =
    "w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500";

  const sectionTitle = "text-lg font-semibold text-gray-700 mt-6";

  if (
    brandsLoading ||
    !brandsData ||
    subcategoriesLoading ||
    !subcategoriesData ||
    shopsLoading ||
    !shopsData
  ) {
    return <p>Loading brands, subcategories and shops...</p>;
  }
  if (brandsError) {
    return <p>Error: {brandsError.message}</p>;
  }
  if (subcategoriesError) {
    return <p>Error: {subcategoriesError.message}</p>;
  }
  if (shopsError) {
    return <p>Error: {shopsError.message}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {!userLoading && !userError && (
        <div className="w-full flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {" "}
            Ciao {userData?.user?.name}
          </h2>
          <p>{userData?.user.email}</p>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Food</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BASIC */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center gap-2">
            <input
              name="searchFood"
              placeholder="Search by food name"
              onChange={(e) => setSearchFood(e.target.value)}
              value={searchFood}
              required
              className={inputStyle}
            />
            <button
              className="rounded-xl bg-sky-600 text-white shrink"
              onClick={handleSearch}
            >
              Cerca
            </button>
          </div>
          <select
            name="food"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedFood(e.target.value);
            }}
            value={selectedFood}
            className={`text-sky-600 ${inputStyle}`}
          >
            <option value="">Select a food</option>
            {(
              foodsByInputData as {
                getFoodsByInput?: { id: string; food: string }[];
              }
            )?.getFoodsByInput?.map(
              (subcategory: { id: string; food: string }) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.food}
                </option>
              ),
            )}
          </select>

          <input
            name="food"
            placeholder="Food name"
            onChange={handleChange}
            value={form.food}
            required
            className={inputStyle}
          />
          <input
            name="food_note"
            placeholder="Food note"
            onChange={handleChange}
            value={form.food_note}
            className={inputStyle}
          />
          {/* <input
            name="id_sub"
            placeholder="Subcategory ID"
            onChange={handleChange}
            value={form.id_sub}
            required
            className={inputStyle}
          /> */}
          {subcategoriesData && (
            <select
              name="id_sub"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(e as any)
              }
              value={form.id_sub}
              className={inputStyle}
            >
              <option value="">Select a subcategory</option>
              {(
                subcategoriesData as {
                  getSubcategories?: { id: string; subcategory_name: string }[];
                }
              )?.getSubcategories?.map(
                (subcategory: { id: string; subcategory_name: string }) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.subcategory_name}
                  </option>
                ),
              )}
            </select>
          )}
          {/* <input
            name="id_brand"
            placeholder="Brand ID"
            onChange={handleChange}
            value={form.id_brand}
            className={inputStyle}
          /> */}
          {brandsData && (
            <select
              name="id_brand"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(e as any)
              }
              value={form.id_brand}
              className={inputStyle}
            >
              <option value="">Select a brand</option>
              {(
                brandsData as {
                  getBrands?: { id: string; name_brand: string }[];
                }
              )?.getBrands?.map((brand: { id: string; name_brand: string }) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name_brand}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* DETAILS */}
        <h3 className={sectionTitle}>Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="detail_product"
            placeholder="Product detail"
            onChange={handleChange}
            value={form.detail_product}
            className={inputStyle}
          />
          <input
            name="note"
            placeholder="Detail note"
            onChange={handleChange}
            value={form.note}
            className={inputStyle}
          />
          {/*<input
              name="join_shops"
              placeholder="Shop IDs (comma separated)"
              onChange={handleChange}
              value={form.join_shops}
              className={inputStyle}
              /> */}
          {shopsData && (
            <select
              name="join_shops"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(e as any)
              }
              value={form.join_shops}
              className={inputStyle}
            >
              <option value="">Select a shop</option>
              {(
                shopsData as {
                  getShops?: { id: string; name_shop: string }[];
                }
              )?.getShops?.map((shop: { id: string; name_shop: string }) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name_shop}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* MACROS */}
        <h3 className={sectionTitle}>Macros</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            name="kcal"
            placeholder="Kcal"
            onChange={handleChange}
            value={form.kcal}
            required
            className={inputStyle}
          />
          <input
            name="fat"
            placeholder="Fat"
            onChange={handleChange}
            value={form.fat}
            required
            className={inputStyle}
          />
          <input
            name="sat_fat"
            placeholder="Sat Fat"
            onChange={handleChange}
            value={form.sat_fat}
            required
            className={inputStyle}
          />
          <input
            name="carbo"
            placeholder="Carbs"
            onChange={handleChange}
            value={form.carbo}
            required
            className={inputStyle}
          />
          <input
            name="sugar"
            placeholder="Sugar"
            onChange={handleChange}
            value={form.sugar}
            required
            className={inputStyle}
          />
          <input
            name="fiber"
            placeholder="Fiber"
            onChange={handleChange}
            value={form.fiber}
            required
            className={inputStyle}
          />
          <input
            name="proteins"
            placeholder="Proteins"
            onChange={handleChange}
            value={form.proteins}
            required
            className={inputStyle}
          />
          <input
            name="salt"
            placeholder="Salt"
            onChange={handleChange}
            value={form.salt}
            required
            className={inputStyle}
          />
        </div>

        {/* SPECIFICS */}
        <h3 className={sectionTitle}>Unity Weights</h3>

        <input
          name="unity_weights"
          placeholder="e.g. 100, 250, 500"
          onChange={handleChange}
          value={form.unity_weights}
          className={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Food"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-2">Error: {error.message}</p>
        )}

        {/* {data && (
          <p className="text-green-600 text-sm mt-2">
            Food created: <strong>{form.food}</strong>
          </p>
        )} */}
      </form>
    </div>
  );
}
