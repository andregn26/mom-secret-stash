import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredient, putEditIngredient } from "@/api";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { IngredientsForm } from "@/Components/Organisms/Ingredients/IngredientsForm";
import toast from "react-hot-toast";
import axios from "axios";
import { Ingredient } from "@/types/ingredientTypes";

export const PageEditIngredient = () => {
	const navigate = useNavigate();
	const { ingredientId } = useParams();
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(0);
	const [unit, setUnit] = useState<string>("");
	const [calories, setCalories] = useState<number>(0);
	const [fat, setFat] = useState<number>(0);
	const [carbs, setCarbs] = useState<number>(0);
	const [protein, setProtein] = useState<number>(0);
	const [fiber, setFiber] = useState<number>(0);
	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			if (typeof ingredientId !== "string") {
				return;
			}
			try {
				const response = await getIngredient(ingredientId);
				const fetchedIngredient: Ingredient = response.data.foundedIngredient;
				if (fetchedIngredient) {
					setName(fetchedIngredient.name);
					setCategory(fetchedIngredient.category);
					setQuantity(fetchedIngredient.quantity);
					setUnit(fetchedIngredient.unit);
					setCalories(fetchedIngredient.calories);
					setFat(fetchedIngredient.fat);
					setCarbs(fetchedIngredient.carbs);
					setProtein(fetchedIngredient.protein);
					setFiber(fetchedIngredient.fiber);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [ingredientId]);

	const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoadingEdit(true);
			if (typeof ingredientId === "string") {
				const res = await putEditIngredient(ingredientId, { name, category, quantity, unit, calories, fat, carbs, protein, fiber });
				toast.success(res.data.message);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message);
			} else {
				toast("Something went wrong!");
			}
		} finally {
			setIsLoadingEdit(false);
			navigate("/ingredients/all");
		}
	};

	return (
		<>
			<NavigationHeader pageName="Edit Ingredient" />
			<IngredientsForm
				onSubmit={handleSubmitEdit}
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
				isLoading={isLoadingEdit}
				btnText="Confirm"
			/>
		</>
	);
};
