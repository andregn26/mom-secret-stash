import { useState, useContext } from "react";
import { getRecipe, putEditRecipe, getAllIngredients, postUpload } from "@/api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { RecipeForm } from "@/Components/Organisms/Recipes/RecipeForm";
import { NewInstruction, NewIngredient } from "@/types/recipeTypes";
import { Ingredient } from "@/types/ingredientTypes";

import { AuthContext } from "@/context/auth.context";
import axios from "axios";
import { useFetchAllFoodTypes } from "@/hooks/useFetchAllFoodTypes";

export const PageEditRecipe = () => {
	const { recipeId } = useParams();
	const navigate = useNavigate();
	const { userInSession } = useContext(AuthContext);
	// STATE - PRIMITIVE VALUES
	const [fileImg, setFileImg] = useState<File | null>(null);
	const [fetchedImgLink, setFetchedImgLink] = useState<string>("");
	const [editedName, setEditedName] = useState<string>("");
	const [editedDescription, setEditedDescription] = useState<string>("");
	const [editedPrepTime, setEditedPrepTime] = useState<number>(60);
	const [editedServings, setEditedServings] = useState<number>(4);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// STATE - OBJECT AND ARRAY VALUES
	const [editedTools, setEditedTools] = useState<string[]>([]);
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

	const { allFoodTypesFromDB, isLoadingFoodTypesFromDB } = useFetchAllFoodTypes();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				if (!recipeId) {
					throw Error;
				}
				const fetchedRecipe = await getRecipe(recipeId);
				const recipeFound = fetchedRecipe.data.recipeFounded;
				setFetchedImgLink(recipeFound.imageUrl);
				setEditedName(recipeFound.name);
				setEditedDescription(recipeFound.description);
				setEditedPrepTime(recipeFound.prepTime);
				setEditedServings(recipeFound.servings);
				setEditedTools(recipeFound.tools);
				setFoodTypeId(recipeFound.foodType._id);
				setAllInstructions(recipeFound.instructions);
				const ingredientsFetched = await getAllIngredients();
				setAllIngredientsFromDB(ingredientsFetched.data.foundedIngredients);

				const recipeIds = recipeFound.ingredients.map((ingredient: { ingredient: { _id: string } }) => ingredient.ingredient._id);
				setAllIngredients(
					ingredientsFetched.data.foundedIngredients
						.filter((option: { _id: string }) => recipeIds.includes(option._id))
						.map((ingredient: { _id: string; name: string; unit: string }) => {
							return {
								ingredientId: ingredient._id,
								quantityForRecipe: recipeFound.ingredients.find(
									(recipeIngredient: { ingredient: { _id: string } }) => recipeIngredient.ingredient._id === ingredient._id
								).quantityForRecipe,
								name: ingredient.name,
								unit: ingredient.unit,
							};
						})
				);
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					toast.error(error.message);
				}
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [recipeId]);

	const handleSelectFileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFileImg(e.target.files[0]);
		}
	};

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
		try {
			const data = new FormData();
			data.append("my_file", fileImg as Blob);
			const imgData = await postUpload(data);
			const imageUrl = imgData.data.url;
			if (!recipeId) {
				throw Error;
			}
			const res = await putEditRecipe(recipeId, {
				imageUrl: imageUrl,
				name: editedName,
				description: editedDescription,
				prepTime: editedPrepTime,
				servings: editedServings,
				instructions: allInstructions,
				ingredients: allIngredients.map(({ ingredientId, quantityForRecipe }) => ({ ingredient: ingredientId, quantityForRecipe })),
				foodType: foodTypeId,
				tools: editedTools,
			});
			console.log("🚀 ~ .then ~ res:", res);
			toast.success(res.data.message);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message);
			}
			console.log(error);
		} finally {
			setIsLoading(false);
			navigate(`/${userInSession!._id}/my-recipes`);
		}
	};
	return (
		<>
			<NavigationHeader pageName="Edit Recipe" />
			<RecipeForm
				isLoading={isLoading}
				type="edit"
				onSubmit={handleSubmit}
				onChangeFile={handleSelectFileImg}
				fetchedImgLink={fetchedImgLink}
				name={editedName}
				setName={setEditedName}
				description={editedDescription}
				setDescription={setEditedDescription}
				prepTime={editedPrepTime}
				setPrepTime={setEditedPrepTime}
				servings={editedServings}
				setServings={setEditedServings}
				allFoodTypesFromDB={allFoodTypesFromDB}
				setFoodTypeId={setFoodTypeId}
				foodTypeId={foodTypeId}
				setTools={setEditedTools}
				tools={editedTools}
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
