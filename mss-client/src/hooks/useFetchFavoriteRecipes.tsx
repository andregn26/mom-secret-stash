import { getFavoriteRecipes } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { RecipeFromDB } from "@/types/recipeTypes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useFetchFavoriteRecipes = () => {
	const { user } = useContext(AuthContext);
	const [favoriteRecipesFromDB, setFavoriteRecipesFromDB] = useState<RecipeFromDB[] | null>(null);
	const [isLoadingFavoriteRecipesFromDB, setIsLoadingFavoriteRecipesFromDB] = useState<boolean>(false);
	const [isFoodTypesFetchingSuccess, setIsFoodTypesFetchingSuccess] = useState<boolean>(true);

	useEffect(() => {
		setIsLoadingFavoriteRecipesFromDB(true);
		const callAPIFavoriteRecipes = async () => {
			try {
				if (!user) throw Error("user id not defined!");
				const fetchedFavoriteRecipes = await getFavoriteRecipes(`${user._id}`);
				setFavoriteRecipesFromDB(fetchedFavoriteRecipes.data.foundedUserFavoriteRecipes.favoriteRecipes);
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					console.log(error);
				} else {
					toast.error("Something went wrong!");
				}
				setIsFoodTypesFetchingSuccess(false);
			}
		};
		callAPIFavoriteRecipes();
		const timer = setTimeout(() => {
			setIsLoadingFavoriteRecipesFromDB(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, [user]);

	return { favoriteRecipesFromDB, isLoadingFavoriteRecipesFromDB, isFoodTypesFetchingSuccess };
};
