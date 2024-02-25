import { BackendError } from "@/Components/Molecules/BackendError";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { RecipeCard } from "@/Components/Organisms/Recipes/RecipeCard";
import { useFetchFavoriteRecipes } from "@/hooks/useFetchFavoriteRecipes";
import { NavLink } from "react-router-dom";

export const PageFavorites = () => {
	const { favoriteRecipesFromDB, isLoadingFavoriteRecipesFromDB, errorFromAxios } = useFetchFavoriteRecipes();

	if (!favoriteRecipesFromDB && !isLoadingFavoriteRecipesFromDB) return <BackendError errorFromAxios={errorFromAxios} />;

	return (
		<>
			<NavigationHeader pageName="My Favorites" />
			{!isLoadingFavoriteRecipesFromDB && favoriteRecipesFromDB ? (
				<>
					{favoriteRecipesFromDB.length === 0 ? (
						<div className="h-full grow flex flex-col justify-center items-center gap-8">
							<p className="text-lg font-semibold text-center h-full">
								You don't have any recipe in your favorites list. <br /> Start exploring to see the best recipes!
							</p>
							<NavLink className="btn btn-primary" to={"/explore"}>
								Explore recipes
							</NavLink>
						</div>
					) : (
						<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
							{favoriteRecipesFromDB.map((recipe) => {
								return <RecipeCard key={recipe._id} data={recipe} />;
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
