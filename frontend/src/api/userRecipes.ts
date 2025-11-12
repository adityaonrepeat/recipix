const API = import.meta.env.VITE_API_BASE + "/api/recipes";

export async function fetchMyRecipes(token: string) {
  const res = await fetch(`${API}/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addRecipe(data: any, token: string) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
