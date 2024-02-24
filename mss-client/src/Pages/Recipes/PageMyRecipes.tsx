import { deleteRecipe } from "@/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { useFetchMyRecipes } from "@/hooks/useFetchMyRecipes";
import { RecipeCard } from "@/Components/Organisms/Recipes/RecipeCard";
import { BackendError } from "@/Components/Molecules/BackendError";

export const PageMyRecipes = () => {
	const { userId } = useParams();

	const { setForceUseEffect, myRecipesFromDB, isLoadingMyRecipesFromDB, errorFromAxios } = useFetchMyRecipes(userId);

	const handleDelete = (recipeId: string) => {
		deleteRecipe(recipeId).then(() => {
			toast.success("deleted recipe");
			setForceUseEffect(true);
		});
	};

	if (!myRecipesFromDB && !isLoadingMyRecipesFromDB) return <BackendError errorFromAxios={errorFromAxios} />;

	return (
		<>
			<NavigationHeader pageName="My Recipes" />

			<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
				{!isLoadingMyRecipesFromDB && myRecipesFromDB ? (
					<>
						{myRecipesFromDB.map((recipe) => (
							<RecipeCard key={recipe._id} handleDelete={handleDelete} data={recipe} isEditable={true} />
						))}
					</>
				) : (
					<>
						{[...Array(8)].map((_, i) => {
							return <div key={i} className="skeleton w-[250px] h-80"></div>;
						})}
					</>
				)}
			</div>
		</>
	);
};
