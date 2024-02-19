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
									// <div
									// 	key={recipe._id}
									// 	className="flex flex-col justify-center items-center bg-neutral h-full rounded-md w-[250px] overflow-hidden shadow-md border">
									// 	<figure className="relative w-full h-64 p-4 ">
									// 		<img src={recipe.imageUrl} alt="" className="object-cover w-full h-full rounded-sm" />
									// 		<div className="absolute bottom-6 left-6 z-10">
									// 			<Link to={"/"} className="badge badge-accent shadow-sm text-xs">
									// 				{recipe.foodType.name}
									// 			</Link>
									// 		</div>
									// 	</figure>
									// 	<div className="px-4 pt-2 pb-2 h-full w-full flex flex-col gap-2">
									// 		<Link to={`/recipe/${recipe._id}`} className="text-left w-full">
									// 			<h1 className="w-full font-semibold text-neutral-content/90 text-left text-sm h-8">{recipe.name}</h1>
									// 		</Link>
									// 		<div className="flex justify-between text-sm mt-2 text-accent">
									// 			<p className="flex gap-1 items-center ">
									// 				<AlarmClock theme="outline" size="12" />
									// 				<span className="tooltip tooltip-accent" data-tip="minutes">
									// 					{recipe.prepTime}
									// 				</span>
									// 			</p>
									// 			<span className="tooltip tooltip-accent" data-tip="by serving">
									// 				{recipe.totalCaloriesPerServing} Calories
									// 			</span>
									// 		</div>
									// 	</div>

									// 	<div className="w-full flex justify-around gb-base-100 p-4">
									// 		<Link className="btn btn-transparent  w-24" to={`/recipe/${recipe._id}/edit`}>
									// 			<EditOne theme="outline" size="16" className="text-accent" />
									// 		</Link>
									// 		<ButtonDelete
									// 			btnClassName="btn btn-transparent  w-24"
									// 			renderComponent="deleteButton"
									// 			btnTextOrElement={<Delete theme="outline" size="16" className="text-error" />}
									// 			nameOfItemToDelete={recipe.name}
									// 			handleDelete={() => handleDelete(recipe._id)}
									// 		/>
									// 	</div>
									// </div>
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
