import React, { useState } from "react";
import { postCreateIngredient } from "@/api";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import toast from "react-hot-toast";
import axios from "axios";
import { IngredientsForm } from "@/Components/Organisms/Ingredients/IngredientsForm";

export const PageCreateIngredients = () => {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("Grocery");
	const [quantity, setQuantity] = useState<number>(0);
	const [unit, setUnit] = useState<string>("Cup");
	const [calories, setCalories] = useState<number>(0);
	const [fat, setFat] = useState<number>(0);
	const [carbs, setCarbs] = useState<number>(0);
	const [protein, setProtein] = useState<number>(0);
	const [fiber, setFiber] = useState<number>(0);
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

	const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
			<IngredientsForm
				onSubmit={handleCreateSubmit}
				name={name}
				setName={setName}
				category={category}
				setCategory={setCategory}
				quantity={quantity}
				setQuantity={setQuantity}
				unit={unit}
				setUnit={setUnit}
				calories={calories}
				setCalories={setCalories}
				fat={fat}
				setFat={setFat}
				carbs={carbs}
				setCarbs={setCarbs}
				protein={protein}
				setProtein={setProtein}
				fiber={fiber}
				setFiber={setFiber}
				isLoading={isLoadingPost}
				btnText="Create"
			/>
		</>
	);
};
