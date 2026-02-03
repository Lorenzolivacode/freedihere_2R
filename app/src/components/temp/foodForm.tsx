import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_FOOD = gql`
  mutation CreateFood(
    $food: String!
    $food_note: String
    $id_sub: String!
    $detail_product: String
    $note: String
    $id_brand: String
    $join_shops: [String!]
    $kcal: Decimal!
    $fat: Decimal!
    $sat_fat: Decimal!
    $carbo: Decimal!
    $sugar: Decimal!
    $fiber: Decimal!
    $proteins: Decimal!
    $salt: Decimal!
    $unity_weights: [Decimal!]!
  ) {
    createFood(
      food: $food
      food_note: $food_note
      id_sub: $id_sub
      detail_product: $detail_product
      note: $note
      id_brand: $id_brand
      join_shops: $join_shops
      kcal: $kcal
      fat: $fat
      sat_fat: $sat_fat
      carbo: $carbo
      sugar: $sugar
      fiber: $fiber
      proteins: $proteins
      salt: $salt
      unity_weights: $unity_weights
    ) {
      id
      food
    }
  }
`;

export default function CreateFoodForm() {
  const [createFood, { loading, error, data }] = useMutation(CREATE_FOOD);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        unity_weights: form.unity_weights
          .split(",")
          .map((n) => parseFloat(n.trim())),
      },
    });
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

  const sectionTitle = "text-lg font-semibold text-gray-700 mt-6";

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Food</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BASIC */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="food"
            placeholder="Food name"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="food_note"
            placeholder="Food note"
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="id_sub"
            placeholder="Subcategory ID"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="id_brand"
            placeholder="Brand ID"
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* DETAILS */}
        <h3 className={sectionTitle}>Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="detail_product"
            placeholder="Product detail"
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="note"
            placeholder="Detail note"
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="join_shops"
            placeholder="Shop IDs (comma separated)"
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* MACROS */}
        <h3 className={sectionTitle}>Macros</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            name="kcal"
            placeholder="Kcal"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="fat"
            placeholder="Fat"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="sat_fat"
            placeholder="Sat Fat"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="carbo"
            placeholder="Carbs"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="sugar"
            placeholder="Sugar"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="fiber"
            placeholder="Fiber"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="proteins"
            placeholder="Proteins"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="salt"
            placeholder="Salt"
            onChange={handleChange}
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
          required
          className={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
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
