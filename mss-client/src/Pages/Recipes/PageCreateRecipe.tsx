/* eslint-disable no-mixed-spaces-and-tabs */
import { RecipeIngredients } from "@/Components/Organisms/Recipes/RecipeIngredients";
import { Instructions } from "@/Components/Organisms/Recipes/RecipeInstructions";
import { ProfilePic } from "@/Components/Organisms/Recipes/RecipeProfilePic";
import { postCreateRecipe, postUpload } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { useFetchAllFoodTypes } from "@/hooks/useFetchAllFoodTypes";
import { useFetchAllIngredients } from "@/hooks/useFetchAllIngredients";
import { InputsRecipe, Instruction, NewIngredient } from "@/types/recipeTypes";
import { isAxiosError } from "axios";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const optionsTools = [
	{ value: "Airfryer", label: "Airfryer" },
	{ value: "Oven", label: "Oven" },
	{ value: "Slow Cook", label: "Slow Cook" },
];

export const PageCreateRecipe = () => {
	const { allFoodTypesFromDB, isLoadingFoodTypesFromDB } = useFetchAllFoodTypes();
	const { allIngredientsFromDB, isLoadingAllIngredientsFromDB } = useFetchAllIngredients();

	const isLoadingData = isLoadingFoodTypesFromDB || isLoadingAllIngredientsFromDB;

	const navigate = useNavigate();

	const { userInSession } = useContext(AuthContext);
	const [fileImg, setFileImg] = useState<File | null>(null);
	const [instructions, setInstructions] = useState<Instruction[]>([]);

	const [foodTypeId, setFoodTypeId] = useState<string>("");
	const [selectedTools, setSelectedTools] = useState<string[]>([]);
	const optionsFoodType: { value: string; label: string }[] = allFoodTypesFromDB
		? allFoodTypesFromDB.map((foodType) => {
				return { value: foodType._id, label: foodType.name };
		  })
		: [];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsRecipe>();

	// Ingredients

	const [allIngredients, setAllIngredients] = useState<NewIngredient[]>([]);

	const handleFormSubmit: SubmitHandler<InputsRecipe> = async (data) => {
		console.log({ instructions, data, foodTypeId, selectedTools });
		try {
			const formData = new FormData();
			formData.append("my_file", fileImg as Blob);
			const profileImgData = await postUpload(formData);
			const createdRecipe = await postCreateRecipe({
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
			{isLoadingData || !allIngredientsFromDB || !allFoodTypesFromDB ? (
				<div className="w-full h-[500px] skeleton"></div>
			) : (
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md text-base sm:text-lg">
					<div className="flex flex-col gap-10 lg:grid grid-cols-3 lg:gap-10">
						{/* COL 1 */}
						<div className="flex flex-col lg:col-span-1 gap-8">
							<ProfilePic setFileImg={setFileImg} />
							{/* NAME */}
							<div className="w-full">
								<label className="form-control w-full">
									<input placeholder="Recipe Name" {...register("name", { required: "Name of the recipe is required" })} className="input w-full" />
								</label>
								{errors.name && <p className="pt-2 text-xs text-error">{errors.name.message}</p>}
							</div>
							{/* DESCRIPTION */}
							<div className="relative w-full min-w-[200px]">
								<textarea className="textarea w-full" {...register("description")} placeholder="Description" rows={4}></textarea>
							</div>
							{/* PREP TIME & SERVINGS */}
							<div className="flex justify-between gap-4 ">
								<div className="w-full">
									<label className="form-control w-full">
										<div className="label">
											<span className="label-text truncate">Prep time (min)</span>
										</div>
										<input
											type="number"
											placeholder="Prep Time"
											{...register("prepTime", { required: "Prep time is required" })}
											className="input w-full max-w-xs"
										/>
									</label>
									{errors.prepTime && <p className="pt-2 text-xs text-error">{errors.prepTime.message}</p>}
								</div>
								<div className="w-full">
									<label className="form-control w-full">
										<div className="label">
											<span className="label-text">Servings</span>
										</div>
										<input
											type="number"
											placeholder="Servings"
											{...register("servings", { required: "Servings is required" })}
											className="input w-full max-w-xs"
										/>
									</label>

									{errors.servings && <p className="pt-2 text-xs text-error">{errors.servings.message}</p>}
								</div>
							</div>

							{/* FOOD TYPE */}
							<Select
								placeholder="Pick one food type"
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

							{/* TOOLS */}
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
							/>
						</div>

						{/* COL 2 */}
						<div className=" flex flex-col lg:col-span-2 gap-8 justify-between h-full">
							<div>
								<RecipeIngredients
									allIngredientsFromDB={allIngredientsFromDB}
									allIngredients={allIngredients}
									setAllIngredients={setAllIngredients}
								/>
								<Instructions instructions={instructions} setInstructions={setInstructions} />
							</div>

							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</div>
				</form>
			)}
		</>
	);
};
