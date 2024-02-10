import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

export const PageEditIngredient = (props: Props) => {
	const { ingredientId } = useParams();
	console.log("🚀 ~ PageEditIngredient ~ ingredientId:", ingredientId);
	return (
		<div>
			PageEditIngredient
			<p>{ingredientId}</p>
		</div>
	);
};
