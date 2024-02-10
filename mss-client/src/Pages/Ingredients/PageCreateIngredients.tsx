import React, { useState } from "react";
import { postCreateIngredient } from "@/api";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import toast from "react-hot-toast";
import axios from "axios";

export const PageCreateIngredients = () => {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(0);
	const [unit, setUnit] = useState<string>("");
	const [calories, setCalories] = useState<number>(0);
	const [fat, setFat] = useState<number>(0);
	const [carbs, setCarbs] = useState<number>(0);
	const [protein, setProtein] = useState<number>(0);
	const [fiber, setFiber] = useState<number>(0);
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

	const selectCategory: string[] = [
		"Grocery",
		"Bio & Nutrition",
		"Fishery and Butchery",
		"Dairy and Eggs",
		"Fruits and vegetables",
		"Charcuterie and Cheese",
		"Bakery and Pastry",
		"Frozen",
		"Drinks and Wine Racks",
	];
	const selectUnit: string[] = ["Cup", "Gallon", "Gram", "Liter", "Milliliter", "Tablespoon", "Teaspoon", "Whole"];

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoadingPost(true);
			const res = await postCreateIngredient({ name, category, quantity, unit, calories, fat, carbs, protein, fiber });
			setName("");
			setQuantity(0);
			setCalories(0);
			setFat(0);
			setCarbs(0);
			setProtein(0);
			setFiber(0);
			console.log(res);
			toast.success(res.data.message);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message);
			} else {
				toast("Something went wrong!");
			}
		} finally {
			setIsLoadingPost(false);
		}
	};

	return (
		<>
			<NavigationHeader pageName="Create Ingredient" />
			<div>
				<form
					onSubmit={(e) => handleSubmit(e)}
					className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md flex flex-col gap-4">
					<div className="flex gap-4">
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Name</span>
							</div>
							<input className="input w-full" id="ingredient-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
						</label>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Pick category</span>
							</div>
							<select className="select" id="ingredient-category" required defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
								{selectCategory.map((category, index) => {
									return (
										<option key={index} value={category}>
											{category}
										</option>
									);
								})}
							</select>
						</label>
					</div>
					<div className="flex gap-4">
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Quantity</span>
							</div>
							<input
								className="input w-full"
								id="ingredient-quantity"
								type="number"
								required
								value={quantity!}
								onChange={(e) => setQuantity(Number(e.target.value))}
								min="0"
							/>
						</label>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Choose the unit</span>
							</div>
							<select className="select" id="ingredient-unit" required defaultValue={unit} onChange={(e) => setUnit(e.target.value)}>
								{selectUnit.map((unit, index) => {
									return (
										<option key={index} value={unit}>
											{unit}
										</option>
									);
								})}
							</select>
						</label>
					</div>

					<div className="grid grid-cols-2 xl:grid-cols-6 gap-4">
						<label className="form-control w-full col-span-2">
							<div className="label">
								<span className="label-text">Calories</span>
							</div>
							<input
								className="input w-full"
								id="ingredient-calories"
								type="number"
								required
								value={calories!}
								onChange={(e) => setCalories(Number(e.target.value))}
								min="0"
							/>
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Fat</span>
							</div>
							<input
								className="input w-full"
								id="ingredient-fat"
								type="number"
								required
								value={fat!}
								onChange={(e) => setFat(Number(e.target.value))}
								min="0.0"
								step="0.1"
							/>
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Carbs</span>
							</div>
							<input
								className="input w-full"
								id="ingredient-carbs"
								type="number"
								required
								value={carbs!}
								onChange={(e) => setCarbs(Number(e.target.value))}
								min="0.0"
								step="0.1"
							/>
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Protein</span>
							</div>
							<input
								className="input w-full"
								id="ingredient-protein"
								type="number"
								required
								value={protein!}
								onChange={(e) => setProtein(Number(e.target.value))}
								min="0.0"
								step="0.1"
							/>
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Fiber</span>
							</div>
							<input
								className="input w-full"
								id="ingredient-fiber"
								type="number"
								required
								value={fiber!}
								onChange={(e) => setFiber(Number(e.target.value))}
							/>
						</label>
					</div>

					<button className="btn btn-primary w-full lg:max-w-48 self-end mt-8" disabled={isLoadingPost} type="submit">
						Create Ingredient
					</button>
				</form>
			</div>
		</>
	);
};
