import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { getRecipe } from "@/api";
import { Recipe } from "@/types/recipeTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AlarmClock, EveryUser } from "@icon-park/react";

export const PageSingleRecipe = () => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	console.log("🚀 ~ PageSingleRecipe ~ recipe:", recipe);
	const { recipeId } = useParams();
	useEffect(() => {
		if (recipeId) {
			getRecipe(recipeId).then((fetchedRecipe) => {
				console.log(fetchedRecipe);
				setRecipe(fetchedRecipe.data.recipeFounded);
			});
		}
	}, [recipeId]);

	return (
		<div>
			{recipe ? (
				<>
					<NavigationHeader pageName={recipe.name} />
					<div className="flex flex-col  mt-10 items-center">
						<figure className="relative w-full h-64  rounded-sm overflow-hidden">
							<img className="object-cover h-64 w-full" src={recipe.imageUrl} alt={`${recipe.name}`} />
							<div className="absolute bottom-2 left-2 z-10">
								<Link to={"/"} className="badge badge-accent badge-lg  font-semibold ">
									{recipe.foodType.name}
								</Link>
							</div>
							<div className="absolute top-2 left-2  max-w-xs bg-base-200/80 px-4 py-2 rounded-sm border mx-auto">
								<div className=" flex items-center gap-8 flex-row-reverse justify-between">
									<figure className="hidden sm:block w-10 h-10 overflow-hidden rounded-full">
										<img
											className="object-cover w-full h-full"
											src={recipe.createdBy.profileImg}
											alt={`recipe-creator-${recipe.createdBy.firstName}-${recipe.createdBy.lastName}`}
										/>
									</figure>
									<div className="flex flex-col">
										<span className="text-xs text-neutral-content/60">Created by</span>
										<span className="text-sm font-semibold text-neutral-content/80">
											{recipe.createdBy.firstName} {recipe.createdBy.lastName}
										</span>
									</div>
								</div>
							</div>
						</figure>
						<div className="py-4 px-6 flex w-full text-center flex-col bg-base-200 rounded-b-sm ">
							<div className="">
								<div className="flex justify-between mb-2">
									<span className="flex gap-1 items-center text-base mt-2 text-accent font-bold">
										<AlarmClock theme="outline" size="18" />
										{recipe.prepTime} min
									</span>
									<span className="flex gap-1 items-center text-base mt-2 text-accent font-bold">
										<EveryUser theme="outline" size="18" />
										{recipe.servings} servings
									</span>
								</div>
								<p className="max-w-screen-sm mx-auto font-semibold text-sm text-neutral-content/80">{recipe.description}</p>
							</div>
						</div>
					</div>
					{/* COL 2 */}
					<div className="flex flex-col gap-6 mt-10 lg:gap-24 lg:grid lg:grid-cols-6">
						{/* INGREDIENTS */}
						<div className="lg:col-span-2">
							<h3 className="text-accent text-lg font-semibold mb-2">Ingredients</h3>
							<ul className="list-disc list-inside marker:text-neutral-400">
								{recipe.ingredients.map((ingredient) => {
									return (
										<li key={ingredient._id}>
											{ingredient.quantityForRecipe} {ingredient.ingredient.unit} {ingredient.ingredient.name}
										</li>
									);
								})}
							</ul>
						</div>
						{/* INSTRUCTIONS */}
						<div className="lg:col-span-4">
							<h3 className="text-accent text-lg font-semibold mb-2">Instructions</h3>
							<ul>
								{recipe.instructions.map((instruction) => {
									return (
										<li key={instruction._id}>
											{instruction.step} {instruction.instruction}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</>
			) : (
				<p>Wainting for recipe</p>
			)}
		</div>
	);
};
