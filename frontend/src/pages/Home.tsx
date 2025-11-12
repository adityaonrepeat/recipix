import { useEffect, useState } from "react";
import { fetchRecipes } from "../api/recipes";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  if (loading) return <div className="text-center p-4">Loading recipes...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {recipes.map((recipe: any) => (
        <div
          key={recipe._id}
          className="border rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}
