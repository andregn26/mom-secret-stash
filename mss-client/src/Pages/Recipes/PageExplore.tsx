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
				setDataFromAPI(fetchedFavoriteRecipes.data);
			} catch (error) {
				console.log(error);
			}
		};

		callAPIFavoriteRecipes();
	}, []);

	return (
		<div className="flex lfex-col gap-8">
			<pre className="text-xs">{JSON.stringify(dataFromAPI, null, 2)}</pre>
		</div>
	);
};
