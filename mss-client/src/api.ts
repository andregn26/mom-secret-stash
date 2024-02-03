import { UserLogin, UserRegister } from "./types/userTypes";
import { RecipeToEdit } from "./types/recipeTypes";
import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API}` || "http://localhost:5005/api";

export const postSignup = (user: UserRegister) => {
	return axios.post(`${BASE_URL}/auth/signup`, user);
};

export const postLogin = (user: UserLogin) => {
	return axios.post(`${BASE_URL}/auth/login`, user);
};

export const getVerify = (storedToken: string) => {
	return axios.get(`${BASE_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } });
};

export const postUpload = (data: FormData) => {
	return axios.post(`${BASE_URL}/upload`, data);
};

export const postCreateRecipe = (newRecipe: FormData) => {
	return axios.post(`${BASE_URL}/recipe/create`, newRecipe);
};

export const putEditRecipe = (recipeId: string, recipeToEdit: RecipeToEdit) => {
	return axios.post(`${BASE_URL}/recipe/${recipeId}/edit`, recipeToEdit);
};
