import { UserLogin, UserRegister } from "./types/userTypes";
import { IngredientFromDB } from "./types/ingredientTypes";
import axios from "axios";
import { PostAndPutRecipe } from "./types/recipeTypes";
const BASE_URL = `${import.meta.env.VITE_API}` || "http://localhost:5005/api";

// AUTH
export const postSignup = (user: UserRegister) => {
	return axios.post(`${BASE_URL}/auth/signup`, user);
};

export const postLogin = (user: UserLogin) => {
	return axios.post(`${BASE_URL}/auth/login`, user);
};

export const getVerify = (storedToken: string) => {
	return axios.get(`${BASE_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } });
};

export const getUserDetails = (userId: string) => {
	return axios.get(`${BASE_URL}/profile/${userId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
	});
};

export const postUpload = (data: FormData) => {
	return axios.post(`${BASE_URL}/upload`, data);
};

// USER: The CRUD operations are reserved to logged users
export const getMyRecipes = (userId: string) => {
	return axios.get(`${BASE_URL}/profile/${userId}/my-recipes`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
	});
};

export const getFavoriteRecipes = (userId: string) => {
	return axios.get(`${BASE_URL}/profile/${userId}/favorites`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
	});
};

// RECIPES: The CRUD operations are reserved to logged users
export const getRecipe = (recipeId: string) => {
	return axios.get(`${BASE_URL}/recipe/${recipeId}`);
};

export const getAllRecipes = () => {
	return axios.get(`${BASE_URL}/recipe/all`);
};

export const postCreateRecipe = (newRecipe: PostAndPutRecipe) => {
	return axios.post(`${BASE_URL}/recipe/create`, newRecipe);
};

export const putEditRecipe = (recipeId: string, recipeToEdit: PostAndPutRecipe) => {
	return axios.put(`${BASE_URL}/recipe/${recipeId}/edit`, recipeToEdit);
};

export const deleteRecipe = (recipeId: string) => {
	return axios.delete(`${BASE_URL}/recipe/${recipeId}/delete`);
};

export const getAllFoodTypes = () => {
	return axios.get(`${BASE_URL}/food-types/all`);
};

export const putAddRecipeToFavorites = (recipeId: string) => {
	return axios.put(
		`${BASE_URL}/recipe/${recipeId}/add-to-favorite`,
		{},
		{
			headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
		}
	);
};

export const putRemoveRecipeFromFavorites = (recipeId: string) => {
	return axios.put(
		`${BASE_URL}/recipe/${recipeId}/remove-from-favorite`,
		{},
		{
			headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
		}
	);
};

// INGREDIENTS: The CRUD operations are reserved to Admin users
export const postCreateIngredient = (newIngredient: IngredientFromDB) => {
	return axios.post(`${BASE_URL}/ingredients/create`, newIngredient, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
};

export const getAllIngredients = () => {
	return axios.get(`${BASE_URL}/ingredients/all`);
};

export const getIngredient = (IngredientId: string) => {
	return axios.get(`${BASE_URL}/ingredients/${IngredientId}`);
};

export const putEditIngredient = (IngredientId: string, ingredientToEdit: IngredientFromDB) => {
	return axios.put(`${BASE_URL}/ingredients/edit/${IngredientId}`, ingredientToEdit, {
		headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
	});
};

export const deleteIngredient = (IngredientId: string) => {
	return axios.delete(`${BASE_URL}/ingredients/delete/${IngredientId}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
	});
};
