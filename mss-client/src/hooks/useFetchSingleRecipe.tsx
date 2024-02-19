import { getRecipe } from "@/api";
import { RecipeFromDB } from "@/types/recipeTypes";
import { useEffect, useState } from "react";

export const useFetchSingleRecipe = (paramRecipeId: string) => {
	const [singleRecipeFromAPI, setSingleRecipeFromAPI] = useState<RecipeFromDB | null>(null);
	const [singleRecipeCaloriesStatsFromAPI, setSingleRecipeCaloriesStatsFromAPI] = useState<{
		totalCarbs: number;
		totalFat: number;
		totalProtein: number;
		totalFiber: number;
	} | null>(null);
	const [isLoadingSingleRecipe, setIsLoadingSingleRecipe] = useState<boolean>(false);
	const [isDataFetchingSuccess, setIsDataFetchingSuccess] = useState<boolean>(true);

	useEffect(() => {
		setIsLoadingSingleRecipe(true);
		const getRecipeFromAPI = async () => {
			if (paramRecipeId) {
				try {
					const recipeFetched = await getRecipe(paramRecipeId);
					setSingleRecipeFromAPI(recipeFetched.data.recipeFounded);
					setSingleRecipeCaloriesStatsFromAPI(recipeFetched.data.recipeCaloriesStats);
					setIsDataFetchingSuccess(true);
				} catch (error) {
					console.log(error);
					setIsDataFetchingSuccess(false);
				} finally {
					setIsLoadingSingleRecipe(false);
				}
			}
		};
		getRecipeFromAPI();
		// const timer = setTimeout(() => {
		// 	setIsLoadingSingleRecipe(false);
		// }, 1000);
		// return () => clearTimeout(timer);
	}, [paramRecipeId]);

	return { singleRecipeFromAPI, singleRecipeCaloriesStatsFromAPI, isLoadingSingleRecipe, isDataFetchingSuccess };
};
