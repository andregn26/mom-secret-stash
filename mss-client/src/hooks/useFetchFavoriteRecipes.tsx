import { getFavoriteRecipes } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { RecipeFromDB } from "@/types/recipeTypes";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";

export const useFetchFavoriteRecipes = () => {
	const { userInSession } = useContext(AuthContext);
	const [favoriteRecipesFromDB, setFavoriteRecipesFromDB] = useState<RecipeFromDB[] | null>(null);
	const [isLoadingFavoriteRecipesFromDB, setIsLoadingFavoriteRecipesFromDB] = useState<boolean>(false);
	const [isFavoriteRecipesFetchingSuccess, setIsFavoriteRecipesFetchingSuccess] = useState<boolean>(true);
	const [errorFromAxios, setErrorFromAxios] = useState<AxiosError | null>(null);

	useEffect(() => {
		setIsLoadingFavoriteRecipesFromDB(true);
		const callAPIFavoriteRecipes = async () => {
			try {
				if (!userInSession) {
					setIsLoadingFavoriteRecipesFromDB(false);
					setIsFavoriteRecipesFetchingSuccess(false);
					throw Error("userInSession id not defined!");
				}
				const favoriteRecipesFetched = await getFavoriteRecipes(`${userInSession._id}`);
				setFavoriteRecipesFromDB(favoriteRecipesFetched.data.data.favoriteRecipes);
				console.info(favoriteRecipesFetched.data.debugMessage);
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					setErrorFromAxios(error);
				}
				console.warn(error);
				setIsFavoriteRecipesFetchingSuccess(false);
			} finally {
				setIsLoadingFavoriteRecipesFromDB(false);
			}
		};
		callAPIFavoriteRecipes();
		// const timer = setTimeout(() => {
		// 	setIsLoadingFavoriteRecipesFromDB(false);
		// }, 4000);
		// return () => clearTimeout(timer);
	}, [userInSession]);

	return { favoriteRecipesFromDB, isLoadingFavoriteRecipesFromDB, isFavoriteRecipesFetchingSuccess, errorFromAxios };
};
