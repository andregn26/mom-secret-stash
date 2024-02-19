import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { RecipeCard } from "@/Components/Organisms/Recipes/RecipeCard";
import { getAllRecipes } from "@/api";
import React, { useEffect, useState } from "react";

type Props = {};

export const PageExplore = (props: Props) => {
	const [dataFromAPI, setDataFromAPI] = useState(null);
	console.log("🚀 ~ PageExplore ~ dataFromAPI:", dataFromAPI);

	useEffect(() => {
		const callAPIFavoriteRecipes = async () => {
			try {
				const fetchedFavoriteRecipes = await getAllRecipes();
				setDataFromAPI(fetchedFavoriteRecipes.data.allRecipes);
			} catch (error) {
				console.log(error);
			}
		};

		callAPIFavoriteRecipes();
	}, []);

	return (
		<>
			<NavigationHeader pageName="Explore Recipes" />{" "}
			<div className="gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full justify-items-center">
				{dataFromAPI && (
					<>
						{dataFromAPI.map((recipe) => (
							<RecipeCard key={recipe._id} data={recipe} />
						))}
					</>
				)}
			</div>
		</>
	);
};
