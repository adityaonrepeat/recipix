import { useEffect, useState } from "react";
import { fetchMyRecipes, addRecipe } from "../api/recipes";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [newRecipe, setNewRecipe] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!token) return;
    (async () => {
      const data = await fetchMyRecipes(token);
      setRecipes(data);
    })();
  }, [token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const added = await addRecipe(newRecipe, token!);
    setRecipes([...recipes, added]); // ✅ appends new recipe to list
    setNewRecipe({ title: "", description: "" });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Recipes</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Recipe</button>
      </form>

      <div className="mt-8">
        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          recipes.map((r) => (
            <div key={r._id} className="border rounded p-3 mb-2">
              <h2 className="font-semibold">{r.title}</h2>
              <p>{r.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
