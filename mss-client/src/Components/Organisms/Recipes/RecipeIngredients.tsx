import { IngredientFromDB } from "@/types/ingredientTypes";
import { NewIngredient } from "@/types/recipeTypes";
import { Delete } from "@icon-park/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Select, { SingleValue } from "react-select";

type RecipeIngredientsProps = {
	allIngredients: NewIngredient[];
	setAllIngredients: React.Dispatch<React.SetStateAction<NewIngredient[]>>;
	allIngredientsFromDB: IngredientFromDB[];
};

export const RecipeIngredients = ({ allIngredientsFromDB, allIngredients, setAllIngredients }: RecipeIngredientsProps) => {
	const [newIngredient, setNewIngredient] = useState<NewIngredient>({
		ingredientId: "",
		name: "",
		quantityForRecipe: 0,
		unit: 0,
	});
	const optionsIngredients = allIngredientsFromDB
		? allIngredientsFromDB.map((ingredient) => {
				return { value: ingredient._id, label: `${ingredient.name} | ${ingredient.unit}`, unit: ingredient.unit };
		  })
		: [];
	const handleIngredientDelete = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		setAllIngredients((prev) => prev.filter((ingredient) => prev.indexOf(ingredient) !== index));
	};

	const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (newIngredient.ingredientId === "" || !newIngredient.name || !newIngredient.unit) {
			toast.error("Something went wrong!");
			return;
		}

		let ingredientExists = false;
		allIngredients.forEach((ingredient) => {
			if (ingredient.ingredientId === newIngredient.ingredientId) {
				ingredientExists = true;
				toast.error("Ingredient already added.");
			}
		});
		if (!ingredientExists) {
			const updatedAllIngredients = [...allIngredients];
			updatedAllIngredients.push(newIngredient);
			setAllIngredients(updatedAllIngredients);
		}
	};

	const handleSelectNewIngredient = (ingredient: { value: string; label: string; unit: number }) => {
		setNewIngredient((prev) => ({ ...prev, ingredientId: ingredient.value, name: ingredient.label, unit: ingredient.unit }));
	};
	return (
		<>
			{" "}
			<div id="CREATE-RECIPE-INGREDIENTS" className="flex flex-col w-full">
				<h3 className="font-semibold text-lg text-primary">Ingredients</h3>
				<div className="flex flex-col xl:flex-row gap-4 xl:items-end">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text truncate">Name</span>
						</div>
						<Select
							placeholder="Select ingredients"
							onChange={(ingredient: SingleValue<{ value: string; label: string; unit: number }>) => handleSelectNewIngredient(ingredient!)}
							classNames={{
								control: ({ isFocused }) =>
									isFocused
										? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
										: "!border-2 !border-transparent !bg-base-100 !h-12",
								menuList: () => " bg-base-200 rounded-sm text-sm",
								option: ({ isFocused, isSelected }) => (isSelected ? "!bg-primary text-white" : isFocused ? "!bg-primary/20" : ""),
								placeholder: () => "text-sm !text-neutral-content",
								singleValue: () => "text-sm !text-neutral-content",
							}}
							options={optionsIngredients}
						/>
					</label>
					<label className="form-control w-full xl:max-w-16">
						<div className="label">
							<span className="label-text truncate">Quantity</span>
						</div>
						<input
							type="number"
							value={newIngredient.quantityForRecipe}
							min={0}
							onChange={(e) => setNewIngredient((prev: NewIngredient) => ({ ...prev, quantityForRecipe: Number(e.target.value) }))}
							className="input w-full"
						/>
					</label>
					<button className="btn btn-primary btn-outline" onClick={(e) => handleAddIngredient(e)}>
						+
					</button>
				</div>
				<div className="h-48 bg-base-100 mt-4 overflow-y-scroll rounded-sm">
					{allIngredients.length === 0 ? (
						<p className="h-full flex justify-center items-center text-sm">The ingredients will be displayed here.</p>
					) : (
						<>
							<ol className="flex flex-col p-4 rounded-sm gap-4 w-full">
								{allIngredients.map((ingredient, index) => {
									return (
										<li key={index}>
											<div className="border-b w-full flex items-center gap-4 pb-1">
												<button onClick={(e) => handleIngredientDelete(e, index)} className="btn btn-error  btn-xs ">
													<Delete theme="outline" size="12" />
												</button>
												<p className="text-sm">
													{ingredient.name} -{" "}
													<span>
														{ingredient.quantityForRecipe} {ingredient.unit}
													</span>
												</p>
											</div>
										</li>
									);
								})}
							</ol>
						</>
					)}
				</div>
			</div>
		</>
	);
};
