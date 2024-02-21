import { getMyRecipes } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { RecipeFromDB } from "@/types/recipeTypes";
import { useEffect, useState, useContext } from "react";

export const useFetchMyRecipes = (userId: string | undefined) => {
	const { userInSession } = useContext(AuthContext);
	const [isUserInSession, setIsUserInSession] = useState<boolean>(false);
	const [myRecipesFromDB, setMyRecipesFromDB] = useState<RecipeFromDB[] | null>(null);
	const [isLoadingMyRecipesFromDB, setIsLoadingMyRecipesFromDB] = useState<boolean>(false);
	const [isMyRecipesFetchingSuccess, setIsMyRecipesFetchingSuccess] = useState<boolean>(true);
	const [forceUseEffect, setForceUseEffect] = useState<boolean>(false);

	useEffect(() => {
		setForceUseEffect(false);
		setIsLoadingMyRecipesFromDB(true);
		const getRecipeFromAPI = async () => {
			if (userId) {
				if (userId === userInSession?._id) {
					setIsUserInSession(true);
					try {
						const recipesFetched = await getMyRecipes(userId);
						setMyRecipesFromDB(recipesFetched.data.recipes);
						setIsMyRecipesFetchingSuccess(true);
					} catch (error) {
						console.log(error);
						setIsMyRecipesFetchingSuccess(false);
					} finally {
						setIsLoadingMyRecipesFromDB(false);
					}
				}
			}
		};
		getRecipeFromAPI();
		// const timer = setTimeout(() => {
		// 	setIsLoadingMyRecipesFromDB(false);
		// }, 700);
		// return () => clearTimeout(timer);
	}, [userInSession?._id, userId, forceUseEffect]);

	return { isUserInSession, setForceUseEffect, myRecipesFromDB, isLoadingMyRecipesFromDB, isMyRecipesFetchingSuccess };
};
