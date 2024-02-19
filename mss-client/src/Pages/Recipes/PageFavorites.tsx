import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { RecipeCard } from "@/Components/Organisms/Recipes/RecipeCard";
import { useFetchFavoriteRecipes } from "@/hooks/useFetchFavoriteRecipes";
import { NavLink } from "react-router-dom";

export const PageFavorites = () => {
	const { favoriteRecipesFromDB, isLoadingFavoriteRecipesFromDB, isFoodTypesFetchingSuccess } = useFetchFavoriteRecipes();
	console.log("🚀 ~ PageFavorites ~ favoriteRecipesFromDB:", favoriteRecipesFromDB);
	const isLoading = !favoriteRecipesFromDB || isLoadingFavoriteRecipesFromDB;

	return (
		<>
			<NavigationHeader pageName="My Favorites" />
			{!isLoading ? (
				<>
					{" "}
					{favoriteRecipesFromDB.length === 0 ? (
						<div>
							You don't have any recipe in your favorites list. Start exploring to see the best recipes!
							<NavLink className="btn btn-primary" to={"/explore"}>
								Explore recipes
							</NavLink>
						</div>
					) : (
						<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
							{favoriteRecipesFromDB.map((recipe) => {
								return <RecipeCard data={recipe} />;
							})}
						</div>
					)}
				</>
			) : (
				<>
					<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
						{[...Array(8)].map((_, i) => {
							return <div key={i} className="skeleton w-[250px] h-80"></div>;
						})}
					</div>
				</>
			)}
		</>
	);
};
