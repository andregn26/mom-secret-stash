import { getRecipe } from "@/api";
import { Recipe } from "@/types/recipeTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PageSingleRecipe = () => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
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
					<figure>
						<img className="w-24 h-24" src={recipe.imageUrl} alt="" />
					</figure>
					<h1>NAME: {recipe.name}</h1>
					<p>DESCRIPTION: {recipe.description}</p>
					<p>
						CREATED BY: {recipe.createdBy.firstName} {recipe.createdBy.lastName}
					</p>
				</>
			) : (
				<p>Wainting for recipe</p>
			)}
		</div>
	);
};
