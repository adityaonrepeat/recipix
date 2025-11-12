import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const fetchRecipes = async () => {
  const res = await axios.get(`${API}/recipes`);
  return res.data;
};

export const fetchMyRecipes = async (token: string) => {
  const res = await axios.get(`${API}/recipes/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addRecipe = async (recipe: any, token: string) => {
  const res = await axios.post(`${API}/recipes`, recipe, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
