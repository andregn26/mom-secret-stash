import { ButtonSubmit } from "@/Components/Atoms/ButtonSubmit";
import { postCreateRecipe, getAllFoodTypes, postUpload, getAllIngredients } from "@/api";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { IngredientToAdd } from "@/types/recipeTypes";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { Instruction } from "@/types/recipeTypes";
import { Delete } from "@icon-park/react";
import { Ingredient } from "@/types/ingredientTypes";
import { FoodType } from "@/types/foodTypes";

export const PageCreateRecipe = () => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [allInstructions, setAllInstructions] = useState<Instruction[]>([]);
	const [newInstruction, setNewInstruction] = useState<Instruction>({
		step: 1,
		instruction: "",
	});
	const [allIngredientsFetched, setAllIngredientsFetched] = useState<Ingredient[]>([]);
	const [allIngredients, setAllIngredients] = useState<IngredientToAdd[]>([]);
	console.log("🚀 ~ PageCreateRecipe ~ allIngredients:", allIngredients);
	const [newIngredient, setNewIngredient] = useState<IngredientToAdd>({
		ingredientId: "",
		name: "",
		quantityForRecipe: 0,
		unit: 0,
	});
	const [allFoodTypes, setAllFoodTypes] = useState<FoodType[]>([]);
	const [foodTypeId, setFoodTypeId] = useState<string>("");
	const [prepTime, setPrepTime] = useState<number>(60);
	const [servings, setServings] = useState<number>(4);
	const [tools, SetTools] = useState<string[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [fileImg, setFileImg] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		getAllFoodTypes().then((foodTypesFetched) => {
			setAllFoodTypes(foodTypesFetched.data.foodType);
		});
		getAllIngredients()
			.then((ingredientsFetched) => {
				setAllIngredientsFetched(ingredientsFetched.data.foundedIngredients);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	}, []);

	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const optionsFoodType = allFoodTypes.map((foodType) => {
		return { value: foodType._id, label: foodType.name };
	});

	const optionsTools = [
		{ value: "Airfryer", label: "Airfryer" },
		{ value: "Oven", label: "Oven" },
		{ value: "Slow Cook", label: "Slow Cook" },
	];

	const optionsIngredients = allIngredientsFetched.map((ingredient) => {
		return { value: ingredient._id, label: `${ingredient.name} | ${ingredient.unit}`, unit: ingredient.unit };
	});

	const handleSelectFileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		setFileImg(e.target.files[0]);
	};

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
		if (newIngredient) {
			const updatedAllIngredients = [...allIngredients];
			updatedAllIngredients.push(newIngredient);
			setAllIngredients(updatedAllIngredients);
		}
	};

	const handleSelectNewIngredient = (ingredient) => {
		setNewIngredient((prev) => ({ ...prev, ingredientId: ingredient.value, name: ingredient.label, unit: ingredient.unit }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const data = new FormData();
		data.append("my_file", fileImg);
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
					ingredients: allIngredients.map(({ ingredientId, quantityForRecipe }) => ({ ingredientId, quantityForRecipe })),
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
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md text-base sm:text-lg ">
				<div className="flex flex-col gap-10 lg:grid grid-cols-3 lg:gap-10">
					{/* COL 1 */}
					<div className="flex flex-col lg:col-span-1 gap-8">
						{/* PICTURE */}
						<figure className="relative w-full h-64  rounded-sm overflow-hidden">
							<img
								className="object-cover h-64 w-full"
								src={"https://res.cloudinary.com/dia3czrcq/image/upload/t_w_400/bwgqzebwzh9wqg4zrdae.jpg"}
								alt=""
							/>
						</figure>
						<input type="file" className="file-input w-full" onChange={handleSelectFileImg} multiple={false} />
						{/* NAME */}
						<label className="form-control w-full">
							<input type="text" placeholder="Name" className="input w-full" value={name} onChange={(e) => setName(e.target.value)} />
						</label>
						{/* DESCRIPTION */}
						<div className="relative w-full min-w-[200px]">
							<textarea
								className="textarea w-full"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Description"
								rows={4}></textarea>
						</div>
						{/* SERVINGS AND PREP TIME */}
						<div className="flex justify-between gap-4 ">
							{/* PREP TIME */}
							<label className="form-control w-full">
								<div className="label">
									<span className="label-text truncate">Prep time (min)</span>
								</div>
								<input type="number" value={prepTime} min={0} onChange={(e) => setPrepTime(Number(e.target.value))} className="input w-full" />
							</label>
							{/* SERVINGS */}
							<label className="form-control w-full">
								<div className="label">
									<span className="label-text">Servings</span>
								</div>
								<input
									type="number"
									value={servings}
									min={0}
									onChange={(e) => setServings(Number(e.target.value))}
									className="input w-full max-w-xs"
								/>
							</label>
						</div>
						<Select
							placeholder="Pick one food type"
							onChange={(option) => setFoodTypeId(option!.value)}
							classNames={{
								control: ({ isFocused }) =>
									isFocused
										? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
										: "!border-2 !border-transparent !bg-base-100 !h-12",
								menu: () => " w-full border_red_2 text-sm rounded-sm",
								placeholder: () => "text-sm !text-neutral-content",
								singleValue: () => "text-sm !text-neutral-content",
							}}
							options={optionsFoodType}
						/>
						{/* TOOLS */}
						<Select
							placeholder="Select the tools"
							onChange={(e) => SetTools(e.map((el) => el.value))}
							isMulti
							classNames={{
								control: ({ isFocused }) =>
									isFocused
										? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
										: "!border-2 !border-transparent !bg-base-100 !h-12",
								menu: () => " w-full border_red_2 text-sm rounded-sm",
								placeholder: () => "text-sm !text-neutral-content",
								multiValue: () => "text-sm !text-neutral-content",
							}}
							options={optionsTools}
						/>
					</div>
					{/* COL 2 */}
					<div className="flex flex-col lg:col-span-2 gap-8">
						{/* NEW INGREDIENT */}
						<div id="CREATE-RECIPE-INGREDIENTS" className="flex flex-col gap-2 w-full">
							<h3 className="font-semibold text-lg text-primary">Ingredients</h3>
							<div>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text truncate">Name</span>
									</div>
									<Select
										placeholder="Select ingredients"
										onChange={(ingredient) => handleSelectNewIngredient(ingredient)}
										classNames={{
											control: ({ isFocused }) =>
												isFocused
													? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
													: "!border-2 !border-transparent !bg-base-100 !h-12",
											menu: () => " w-full border_red_2 text-sm rounded-sm",
											placeholder: () => "text-sm !text-neutral-content",
											singleValue: () => "text-sm !text-neutral-content",
										}}
										options={optionsIngredients}
									/>
								</label>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text truncate">Quantity</span>
									</div>
									<input
										type="number"
										value={newIngredient.quantityForRecipe}
										min={0}
										onChange={(e) => setNewIngredient((prev) => ({ ...prev, quantityForRecipe: Number(e.target.value) }))}
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
															<button onClick={(e) => handleIngredientDelete(e, index)} className="btn btn-primary  btn-xs ">
																<Delete theme="outline" size="12" />
															</button>
															<p className="text-sm">
																{ingredient.name} - <span>{ingredient.quantityForRecipe}</span>
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

						{/* NEW INSTRUCTION */}
						<div className="flex flex-col w-full">
							<h3 className="font-semibold text-lg text-primary">Instructions</h3>
							<div className="flex flex-col xl:flex-row gap-4 xl:items-end">
								<label className="form-control w-full xl:max-w-24">
									<div className="label">
										<span className="label-text">Step</span>
									</div>
									<input
										type="number"
										min={1}
										placeholder="1"
										className="input w-full"
										value={newInstruction.step}
										onChange={(e) => handleInstructionChange(e)}
										id={"step"}
									/>
								</label>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text">Instruction</span>
									</div>
									<input
										type="text"
										placeholder="Insert instructions one by one."
										className="input w-full"
										value={newInstruction.instruction}
										onChange={(e) => handleInstructionChange(e)}
										id={"instruction"}
									/>
								</label>

								<button className="btn btn-primary btn-outline" onClick={(e) => handleAddInstruction(e)}>
									+
								</button>
							</div>
							<div className="h-48 bg-base-100 mt-4 overflow-y-scroll rounded-sm">
								{allInstructions.length === 0 ? (
									<p className="h-full flex justify-center items-center text-sm">The instructions will be displayed here.</p>
								) : (
									<>
										<ol className="flex flex-col p-4 rounded-sm gap-4 w-full">
											{allInstructions.map((instruction, index) => {
												return (
													<li key={index}>
														<div className="border-b w-full flex items-center gap-4 pb-1">
															<button onClick={(e) => handleDeleteInstruction(e, index)} className="btn btn-primary  btn-xs ">
																<Delete theme="outline" size="12" />
															</button>
															<p className="text-sm">
																{instruction.step} - <span>{instruction.instruction}</span>
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

						<ButtonSubmit status={isLoading ? "submitting" : "idle"} buttonText="Create recipe" />
					</div>
				</div>
			</form>
		</>
	);
};
