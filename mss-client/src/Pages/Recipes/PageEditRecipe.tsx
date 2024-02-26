/* eslint-disable no-mixed-spaces-and-tabs */
import { RecipeIngredients } from "@/Components/Organisms/Recipes/RecipeIngredients";
import { Instructions } from "@/Components/Organisms/Recipes/RecipeInstructions";
import { ProfilePic } from "@/Components/Organisms/Recipes/RecipeProfilePic";
import { postUpload, putEditRecipe } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { useFetchAllFoodTypes } from "@/hooks/useFetchAllFoodTypes";
import { useFetchAllIngredients } from "@/hooks/useFetchAllIngredients";
import { useFetchSingleRecipe } from "@/hooks/useFetchSingleRecipe";
import { InputsRecipe, Instruction, NewIngredient } from "@/types/recipeTypes";
import { isAxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const optionsTools = [
	{ value: "Airfryer", label: "Airfryer" },
	{ value: "Oven", label: "Oven" },
	{ value: "Slow Cook", label: "Slow Cook" },
];

export const PageEditRecipe = () => {
	const navigate = useNavigate();
	const { recipeId } = useParams();
	const { singleRecipeFromAPI, singleRecipeCaloriesStatsFromAPI, isLoadingSingleRecipe, isDataFetchingSuccess } = useFetchSingleRecipe(recipeId);
	const { allIngredientsFromDB } = useFetchAllIngredients();
	console.log("🚀 ~ PageEditRecipe ~ singleRecipeFromAPI:", singleRecipeFromAPI);
	const { userInSession } = useContext(AuthContext);
	const [fileImg, setFileImg] = useState<File | null>(null);
	const [allIngredients, setAllIngredients] = useState<NewIngredient[]>([]);
	const [instructions, setInstructions] = useState<Instruction[]>([]);
	const [foodTypeId, setFoodTypeId] = useState<string>("");
	const [selectedTools, setSelectedTools] = useState<string[]>([]);
	const { allFoodTypesFromDB } = useFetchAllFoodTypes();
	const optionsFoodType: { value: string; label: string }[] = allFoodTypesFromDB
		? allFoodTypesFromDB.map((foodType) => {
				return { value: foodType._id, label: foodType.name };
		  })
		: [];

	useEffect(() => {
		if (singleRecipeFromAPI && allIngredientsFromDB) {
			setInstructions(singleRecipeFromAPI.instructions);
			setFoodTypeId(singleRecipeFromAPI.foodType._id);
			const recipeIds = singleRecipeFromAPI.ingredients.map((ingredient: { ingredient: { _id: string } }) => ingredient.ingredient._id);
			console.log("🚀 ~ useEffect ~ recipeIds:", recipeIds);
			setAllIngredients(
				allIngredientsFromDB
					.filter((option: { _id: string }) => recipeIds.includes(option._id))
					.map((ingredient: { _id: string; name: string; unit: string }) => {
						return {
							ingredientId: ingredient._id,
							quantityForRecipe: singleRecipeFromAPI.ingredients.find(
								(recipeIngredient: { ingredient: { _id: string } }) => recipeIngredient.ingredient._id === ingredient._id
							).quantityForRecipe,
							name: ingredient.name,
							unit: ingredient.unit,
						};
					})
			);
		}
	}, [singleRecipeFromAPI, allIngredientsFromDB]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsRecipe>();

	const handleFormSubmit: SubmitHandler<InputsRecipe> = async (data) => {
		console.log({ instructions, data, foodTypeId, selectedTools });
		try {
			if (!recipeId) throw Error("recipe Id not defined");
			const formData = new FormData();
			formData.append("my_file", fileImg as Blob);
			const profileImgData = await postUpload(formData);
			// profileImgData.data.url
			const createdRecipe = await putEditRecipe(recipeId, {
				name: data.name,
				description: data.description,
				createdBy: userInSession!._id,
				foodType: foodTypeId,
				prepTime: data.prepTime,
				servings: data.servings,
				imageUrl: profileImgData.data.url,
				tools: selectedTools,
				instructions,
			});
			if (createdRecipe) {
				toast.success(createdRecipe.data.message);
				navigate(`/${userInSession!._id}/my-recipes`);
				console.log(createdRecipe);
			}
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message);
			}
			console.log(error);
		}
	};

	return (
		<>
			{!singleRecipeFromAPI || isLoadingSingleRecipe ? (
				<div className="h-96 skeleton"></div>
			) : (
				<>
					{" "}
					<form
						onSubmit={handleSubmit(handleFormSubmit)}
						className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md text-base sm:text-lg">
						{singleRecipeFromAPI ? (
							<div className="flex flex-col gap-10 lg:grid grid-cols-3 lg:gap-10">
								{/* COL 1 */}
								<div className="flex flex-col lg:col-span-1 gap-8">
									<ProfilePic setFileImg={setFileImg} />
									<div className="w-full">
										<input
											defaultValue={singleRecipeFromAPI?.name}
											placeholder="Recipe Name"
											{...register("name", { required: "Name of the recipe is required" })}
											className="input w-full"
										/>
										{errors.name && <p className="pt-2 text-xs text-error">{errors.name.message}</p>}
									</div>
									<div className="relative w-full min-w-[200px]">
										<textarea
											defaultValue={singleRecipeFromAPI?.description}
											className="textarea w-full"
											{...register("description")}
											placeholder="Description"
											rows={4}></textarea>
									</div>
									<div className="w-full">
										<input
											defaultValue={singleRecipeFromAPI?.prepTime}
											type="number"
											placeholder="Prep Time"
											{...register("prepTime", { required: "Prep time is required" })}
											className="input w-full"
										/>
										{errors.prepTime && <p className="pt-2 text-xs text-error">{errors.prepTime.message}</p>}
									</div>
									<div className="w-full">
										<input
											defaultValue={singleRecipeFromAPI?.servings}
											type="number"
											placeholder="Servings"
											{...register("servings", { required: "Servings is required" })}
											className="input w-full"
										/>
										{errors.servings && <p className="pt-2 text-xs text-error">{errors.servings.message}</p>}
									</div>

									{singleRecipeFromAPI && (
										<Select
											placeholder="Pick one food type"
											defaultValue={optionsFoodType.find((foodType) => foodType.value.includes(foodTypeId))}
											onChange={(option) => setFoodTypeId(option!.value)}
											classNames={{
												control: ({ isFocused }) =>
													isFocused
														? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
														: "!border-2 !border-transparent !bg-base-100 !h-12",
												menuList: () => "bg-base-200 rounded-sm text-sm",
												option: ({ isFocused }) => (isFocused ? " !bg-primary/20" : ""),
												placeholder: () => "text-sm !text-neutral-content",
												singleValue: () => "text-sm !text-neutral-content",
											}}
											options={optionsFoodType}
										/>
									)}

									<Select
										placeholder="Select the tools"
										onChange={(e) => setSelectedTools(e.map((el) => el.value))}
										isMulti
										closeMenuOnSelect={false}
										classNames={{
											control: ({ isFocused }) =>
												isFocused
													? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
													: "!border-2 !border-transparent !bg-base-100 !h-12",
											menu: () => " w-full text-sm rounded-sm",
											menuList: () => " bg-base-200 rounded-sm",
											option: ({ isFocused }) => (isFocused ? " !bg-primary/20" : ""),
											placeholder: () => "text-sm !text-neutral-content",
											multiValue: () => "text-sm !text-neutral-content",
											multiValueRemove: () => "hover:!bg-error !text-error hover:!text-neutral-content",
										}}
										options={optionsTools}
										value={optionsTools.filter((tool) => singleRecipeFromAPI?.tools.includes(tool.value))}
									/>
								</div>

								{/* COL 2 */}
								<div className="flex flex-col lg:col-span-2 gap-8 justify-between h-full">
									<div>
										<RecipeIngredients
											allIngredientsFromDB={allIngredientsFromDB}
											allIngredients={allIngredients}
											setAllIngredients={setAllIngredients}
										/>
										<Instructions instructions={instructions} setInstructions={setInstructions} />
									</div>

									<button type="submit" className="btn btn-primary">
										Save Recipe
									</button>
								</div>
							</div>
						) : (
							<p>is loading</p>
						)}
					</form>
				</>
			)}
		</>
	);
};
