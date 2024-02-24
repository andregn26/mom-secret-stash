import { getMyRecipes } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { RecipeFromDB } from "@/types/recipeTypes";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useContext } from "react";

export const useFetchMyRecipes = (userId: string | undefined) => {
	const { userInSession } = useContext(AuthContext);
	const [myRecipesFromDB, setMyRecipesFromDB] = useState<RecipeFromDB[] | null>(null);
	const [isLoadingMyRecipesFromDB, setIsLoadingMyRecipesFromDB] = useState<boolean>(false);
	const [errorFromAxios, setErrorFromAxios] = useState<AxiosError | null>(null);
	const [isMyRecipesFetchingSuccess, setIsMyRecipesFetchingSuccess] = useState<boolean>(true);
	const [forceUseEffect, setForceUseEffect] = useState<boolean>(false);

	useEffect(() => {
		setForceUseEffect(false);
		setIsLoadingMyRecipesFromDB(true);
		const callAPIMyRecipes = async () => {
			if (userId) {
				if (userId !== userInSession?._id) {
					setIsLoadingMyRecipesFromDB(false);
					setIsMyRecipesFetchingSuccess(false);
					throw Error("Incorrect ID");
				}
				try {
					const recipesFetched = await getMyRecipes(userId);
					setMyRecipesFromDB(recipesFetched.data.data);
					setIsMyRecipesFetchingSuccess(true);
					console.info(recipesFetched.data.debugMessage);
				} catch (error: unknown) {
					if (axios.isAxiosError(error)) {
						setErrorFromAxios(error);
					}
					console.warn(error);
					setIsMyRecipesFetchingSuccess(false);
				} finally {
					setIsLoadingMyRecipesFromDB(false);
				}
			}
		};

		callAPIMyRecipes();
		// const timer = setTimeout(() => {
		// 	setIsLoadingMyRecipesFromDB(false);
		// }, 3000);
		// return () => clearTimeout(timer);
	}, [userInSession?._id, userId, forceUseEffect]);

	return { setForceUseEffect, myRecipesFromDB, isLoadingMyRecipesFromDB, isMyRecipesFetchingSuccess, errorFromAxios };
};
