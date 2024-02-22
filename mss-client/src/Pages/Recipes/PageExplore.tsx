import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { RecipeCard } from "@/Components/Organisms/Recipes/RecipeCard";
import { useFetchAllRecipes } from "@/hooks/useFetchAllRecipes";

export const PageExplore = () => {
	const { allRecipesFromDB, isLoadingAllRecipesFromDB, isAllRecipesFromDBSuccess } = useFetchAllRecipes();
	const isLoading = !allRecipesFromDB || isLoadingAllRecipesFromDB;

	if (!isAllRecipesFromDBSuccess) return <div>Something went wrong while loading data</div>;

	return (
		<>
			<NavigationHeader pageName="Explore Recipes" />
			{!isLoading ? (
				<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
					{allRecipesFromDB.map((recipe) => (
						<RecipeCard key={recipe._id} data={recipe} />
					))}
				</div>
			) : (
				<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
					{[...Array(8)].map((_, i) => {
						return <div key={i} className="skeleton w-[250px] h-80"></div>;
					})}
				</div>
			)}
		</>
	);
};
