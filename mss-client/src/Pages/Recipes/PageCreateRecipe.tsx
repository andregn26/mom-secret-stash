import { postCreateRecipe, postUpload, getAllIngredients } from "@/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { NewIngredient, NewInstruction } from "@/types/recipeTypes";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { Ingredient } from "@/types/ingredientTypes";
import { RecipeForm } from "@/Components/Organisms/Recipes/RecipeForm";
import { useFetchAllFoodTypes } from "@/hooks/useFetchAllFoodTypes";

export const PageCreateRecipe = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	// STATE - PRIMITIVE VALUES
	const [fileImg, setFileImg] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [prepTime, setPrepTime] = useState<number>(60);
	const [servings, setServings] = useState<number>(4);
	// STATE - NON-PRIMITIVE VALUES
	const [allInstructions, setAllInstructions] = useState<NewInstruction[]>([]);
	const [newInstruction, setNewInstruction] = useState<NewInstruction>({
		step: 1,
		instruction: "",
	});
	const [allIngredientsFromDB, setAllIngredientsFromDB] = useState<Ingredient[]>([]);
	const [allIngredients, setAllIngredients] = useState<NewIngredient[]>([]);
	const [newIngredient, setNewIngredient] = useState<NewIngredient>({
		ingredientId: "",
		name: "",
		quantityForRecipe: 0,
		unit: 0,
	});

	const [foodTypeId, setFoodTypeId] = useState<string>("");
	const [tools, setTools] = useState<string[]>([]);

	const { allFoodTypesFromDB, isLoadingFoodTypesFromDB } = useFetchAllFoodTypes();

	useEffect(() => {
		getAllIngredients()
			.then((ingredientsFetched) => {
				setAllIngredientsFromDB(ingredientsFetched.data.foundedIngredients);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	}, []);

	const handleSelectFileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFileImg(e.target.files[0]);
		}
	}; // can i transfer to recipe form?

	const optionsIngredients = allIngredientsFromDB.map((ingredient) => {
		return { value: ingredient._id, label: `${ingredient.name} | ${ingredient.unit}`, unit: ingredient.unit };
	});

	const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewInstruction((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	const handleAddInstruction = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const updatedAllInstructions = [...allInstructions];
		updatedAllInstructions.push(newInstruction);
		setAllInstructions(updatedAllInstructions);
		setNewInstruction((prev) => ({
			step: prev.step + 1,
			instruction: "",
		}));
	};

	const handleDeleteInstruction = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		setAllInstructions((prev) => prev.filter((elem) => prev.indexOf(elem) !== index));
	};

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const data = new FormData();
		data.append("my_file", fileImg as Blob);
		postUpload(data)
			.then((imgData) => {
				return imgData.data.url;
			})
			.then((imageUrl) => {
				return postCreateRecipe({
					name,
					description,
					createdBy: user!._id,
					instructions: allInstructions,
					ingredients: allIngredients.map(({ ingredientId, quantityForRecipe }) => ({ ingredient: ingredientId, quantityForRecipe })),
					foodType: foodTypeId,
					prepTime,
					servings,
					imageUrl: imageUrl,
					tools,
				});
			})
			.then((res) => {
				console.log(res);
				toast.success(res.data.message);
				navigate(`/${user!._id}/my-recipes`);
			})
			.catch((error) => toast.error(error.response.data.message))
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<NavigationHeader pageName="Create a new recipe" />
			<RecipeForm
				isLoading={isLoading}
				type="create"
				onSubmit={handleSubmit}
				onChangeFile={handleSelectFileImg}
				name={name}
				setName={setName}
				description={description}
				setDescription={setDescription}
				prepTime={prepTime}
				setPrepTime={setPrepTime}
				servings={servings}
				setServings={setServings}
				allFoodTypesFromDB={allFoodTypesFromDB}
				setFoodTypeId={setFoodTypeId}
				setTools={setTools}
				optionsIngredients={optionsIngredients}
				newIngredient={newIngredient}
				setNewIngredient={setNewIngredient}
				allIngredients={allIngredients}
				newInstruction={newInstruction}
				allInstructions={allInstructions}
				handleInstructionChange={handleInstructionChange}
				handleSelectNewIngredient={handleSelectNewIngredient}
				handleAddIngredient={handleAddIngredient}
				handleIngredientDelete={handleIngredientDelete}
				handleAddInstruction={handleAddInstruction}
				handleDeleteInstruction={handleDeleteInstruction}
				isLoadingFoodTypesFromDB={isLoadingFoodTypesFromDB}
			/>
		</>
	);
};
