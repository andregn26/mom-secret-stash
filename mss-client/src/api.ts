import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API}` || "http://localhost:5005/api";

type RegisterUser = { firstName: string; lastName: string; email: string; password: string; profileImg?: string | null };
type LoginUser = { email: string; password: string };

export const postSignup = (user: RegisterUser) => {
	return axios.post(`${BASE_URL}/auth/signup`, user);
};

export const postLogin = (user: LoginUser) => {
	return axios.post(`${BASE_URL}/auth/login`, user);
};

export const getVerify = (storedToken: string) => {
	return axios.get(`${BASE_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } });
};
