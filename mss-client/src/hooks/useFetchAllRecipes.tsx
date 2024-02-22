import { getAllRecipes } from "@/api";
import { RecipeFromDB } from "@/types/recipeTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useFetchAllRecipes = () => {
	const [allRecipesFromDB, setAllRecipesFromDB] = useState<RecipeFromDB[] | null>(null);
	const [isLoadingAllRecipesFromDB, setIsLoadingAllRecipesFromDB] = useState<boolean>(false);
	const [isAllRecipesFromDBSuccess, setIsAllRecipesFromDBSuccess] = useState<boolean>(true);

	useEffect(() => {
		setIsLoadingAllRecipesFromDB(true);
		const callAPIAllRecipes = async () => {
			try {
				const fetchedAllRecipes = await getAllRecipes();
				setAllRecipesFromDB(fetchedAllRecipes.data.allRecipes);
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					console.log(error);
				} else {
					toast.error("Something went wrong!");
				}
				setIsAllRecipesFromDBSuccess(false);
			} finally {
				setIsLoadingAllRecipesFromDB(false);
			}
		};
		callAPIAllRecipes();
		// const timer = setTimeout(() => {
		// 	setIsLoadingAllRecipesFromDB(false);
		// }, 4000);
		// return () => clearTimeout(timer);
	}, []);

	return { allRecipesFromDB, isLoadingAllRecipesFromDB, isAllRecipesFromDBSuccess };
};
