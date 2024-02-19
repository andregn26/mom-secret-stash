import { deleteRecipe } from "@/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { useFetchMyRecipes } from "@/hooks/useFetchMyRecipes";
import { RecipeCard } from "@/Components/Organisms/Recipes/RecipeCard";

export const PageMyRecipes = () => {
	const { userId } = useParams();

	const { setForceUseEffect, isUserInSession, myRecipesFromDB, isLoadingMyRecipesFromDB } = useFetchMyRecipes(userId);
	const isLoading = !myRecipesFromDB || isLoadingMyRecipesFromDB;

	const handleDelete = (recipeId: string) => {
		deleteRecipe(recipeId).then(() => {
			toast.success("deleted recipe");
			setForceUseEffect(true);
		});
	};

	return (
		<>
			<NavigationHeader pageName="My Recipes" />
			{isUserInSession ? (
				<>
					<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
						{!isLoading ? (
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

					{/* <pre className=" text-xs text-wrap">{JSON.stringify(allRecipesFromUser, null, 2)}</pre> */}
				</>
			) : (
				<p>You don't have permission tho access this page</p>
			)}
		</>
	);
};
