import { useContext, useEffect, useState } from "react";
import { deleteRecipe, getMyRecipes } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { RecipeFromDB } from "@/types/recipeTypes";
import { Link, useParams } from "react-router-dom";
import { ButtonDelete } from "@/Components/Atoms/ButtonDelete";
import toast from "react-hot-toast";
import { Delete, EditOne, AlarmClock } from "@icon-park/react";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";

export const PageMyRecipes = () => {
	const { user } = useContext(AuthContext);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [renderAfterDelete, setRenderAfterDelete] = useState<boolean>(false);
	const [allRecipesFromUser, setAllRecipesFromUser] = useState<RecipeFromDB[]>([]);
	const { userId } = useParams();

	useEffect(() => {
		setRenderAfterDelete(false);
		if (userId === user?._id) {
			setIsUser(true);
			getMyRecipes(userId!).then((allRecipesFromUser) => {
				// console.log("🚀 ~ getMyRecipes ~ allRecipesFromUser:", allRecipesFromUser)
				setAllRecipesFromUser(allRecipesFromUser.data.recipes);
			});
		}
	}, [userId, renderAfterDelete, user?._id]);

	const handleDelete = (recipeId: string) => {
		deleteRecipe(recipeId).then((deletedRecipe) => {
			toast.success("deleted recipe");
			console.log("🚀 ~ deleteRecipe ~ deletedRecipe:", deletedRecipe);
			setRenderAfterDelete(true);
		});
	};

	return (
		<>
			<NavigationHeader pageName="My Recipes" />
			{isUser ? (
				<>
					<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
						{allRecipesFromUser.map((recipe) => (
							<div
								key={recipe._id}
								className="flex flex-col justify-center items-center bg-neutral rounded-md w-[250px] overflow-hidden shadow-md border">
								<Link to={`/recipe/${recipe._id}`}>
									<figure className="relative w-full h-64 p-4 ">
										<img src={recipe.imageUrl} alt="" className="object-cover w-full h-full rounded-sm" />
										<div className="absolute bottom-6 left-6 z-10">
											<Link to={"/"} className="badge badge-accent shadow-sm text-xs">
												{recipe.foodType.name}
											</Link>
										</div>
									</figure>
									<div className="px-4 pt-2 pb-2">
										<h1 className="font-semibold text-neutral-content/90 text-base">{recipe.name}</h1>
										<div>
											<p className="flex gap-1 items-center text-sm mt-2 text-accent ">
												<AlarmClock theme="outline" size="12" />
												{recipe.prepTime} min | X Calories
											</p>
										</div>
									</div>
								</Link>

								<div className="w-full flex justify-around gb-base-100 p-4">
									<Link className="btn btn-transparent  w-24" to={`/recipe/${recipe._id}/edit`}>
										<EditOne theme="outline" size="16" className="text-accent" />
									</Link>
									<ButtonDelete
										btnClassName="btn btn-transparent  w-24"
										renderComponent="deleteButton"
										btnTextOrElement={<Delete theme="outline" size="16" className="text-error" />}
										nameOfItemToDelete={recipe.name}
										handleDelete={() => handleDelete(recipe._id)}
									/>
								</div>
							</div>
						))}
					</div>
					{/* <pre className=" text-xs text-wrap">{JSON.stringify(allRecipesFromUser, null, 2)}</pre> */}
				</>
			) : (
				<p>You don't have permission tho access this page</p>
			)}
		</>
	);
};
