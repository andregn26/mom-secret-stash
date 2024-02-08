import { ButtonSubmit } from "@/Components/Atoms/ButtonSubmit";
import { postCreateRecipe, getAllFoodTypes } from "@/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { Ingredient, Recipe } from "@/types/recipeTypes";
import { InputText } from "@/Components/Atoms/InputText";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { Instruction } from "@/types/recipeTypes";

type FoodType = {
	createdAt: string,
	name: string,
	recipes: Recipe[],
	updatedAt: string,
	_id: string
}


export const PageCreateRecipe = () => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [allInstructions, setAllInstructions] = useState<Instruction[]>([]);
	const [newInstruction, setNewInstruction] = useState<Instruction>({ step: 1, instruction: "" });
	const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
	const [newIngredient, setNewIngredient] = useState<Ingredient>({ ingredient: "", quantity: "" });
	const [allFoodTypes, setAllFoodTypes] = useState<FoodType[]>([])
	const [foodType, setFoodType] = useState<string>("")
	const [prepTime, setPrepTime] = useState<number>(0)
	console.log("🚀 ~ PageCreateRecipe ~ prepTime:", prepTime)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		getAllFoodTypes().then((foodTypesFetched) => {
			setAllFoodTypes(foodTypesFetched.data.foodType)
		})
	}, [])

	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

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
		setNewInstruction((prev) => ({ step: prev.step + 1, instruction: "" }));
	};

	const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewIngredient((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (newIngredient.ingredient === "" || newIngredient.quantity === "") {
			toast.error("Please fill the new ingredient with a name and quantity");
			return;
		}
		if (newIngredient) {
			const updatedAllIngredients = [...allIngredients];
			updatedAllIngredients.push(newIngredient);
			setAllIngredients(updatedAllIngredients);
			setNewIngredient({ ingredient: "", quantity: "" });
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		postCreateRecipe({ name, description, createdBy: user?._id, instructions: allInstructions, ingredients: allIngredients, foodType })
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

	const handleDeleteInstruction = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault()
		setAllInstructions((prev) => {
			return prev.filter((elem) => prev.indexOf(elem) !== index);
		});
	};

	return (
		<>
			<NavigationHeader pageName="Create a new recipe" />
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md  text-base sm:text-lg ">
				<div className="flex-col lg:grid grid-cols-3 lg:gap-10">
					<div>
						<figure className="relative w-full h-64  rounded-sm overflow-hidden">
							<img
								className="object-cover h-64 w-full"
								src={
									"https://res.cloudinary.com/dia3czrcq/image/upload/t_w_400/bwgqzebwzh9wqg4zrdae.jpg"
								}
								alt=""
							/>

							<div className="absolute flex bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-950/90 from-10%">
								<div className="absolute bottom-2 left-2 w-[50%]">
									<div className="relative h-11 w-full min-w-[200px]">
										<InputText
											value={name}
											setValue={setName}
											id="name"
											label="Recipe Name"
											isBgDark={true}
										/>
									</div>
								</div>
							</div>
						</figure>
						<input type="file" className="file-input file-input-bordered file-input-sm w-full" />
					</div>
					<div className="flex flex-col col-span-2 gap-4">
						<div className="relative w-full min-w-[200px]">
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								id={"description"}
								placeholder={""}
								cols={10}
								rows={3}
								className="my-textarea peer"></textarea>
							<label className="my-textarea-placeholder before:content[' '] after:content[' ']">
								Description
							</label>
						</div>

						<div className="flex flex-col w-full">
							<div className="flex flex-row gap-4">
								<div className="relative h-11 w-full ">
									<input
										placeholder={"Potato"}
										value={newIngredient.ingredient}
										onChange={(e) => handleIngredientChange(e)}
										id={"ingredient"}
										type={"text"}
										className={`peer mss-text-input-format mss-text-input-color-bgLight`}
									/>
									<label
										className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
										Ingredient
									</label>
								</div>
								<div className="relative h-11 w-full ">
									<input
										placeholder={"200g"}
										value={newIngredient.quantity}
										onChange={(e) => handleIngredientChange(e)}
										id={"quantity"}
										type={"text"}
										className={`peer mss-text-input-format mss-text-input-color-bgLight`}
									/>
									<label
										className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
										Quantity
									</label>
								</div>
								<button
									className="btn btn-base-300"
									onClick={(e) => handleAddIngredient(e)}>
									+
								</button>
							</div>
							{allIngredients.map((elem, index) => {
								return (
									<div key={index}>
										{elem.ingredient} - {elem.quantity}
									</div>
								);
							})}
						</div>

						<div className="relative h-11 w-full ">
							<div className="flex flex-row gap-4">
								<div className="relative h-11 w-full max-w-14">
									<input
										placeholder={"ola"}
										value={newInstruction.step}
										min={1}
										onChange={(e) => handleInstructionChange(e)}
										id={"step"}
										type={"number"}
										className={`peer mss-text-input-format mss-text-input-color-bgLight`}
									/>
									<label
										className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
										Step
									</label>
								</div>
								<div className="relative h-11 w-full">
									<input
										placeholder={"Insert instructions one by one."}
										value={newInstruction.instruction}
										onChange={(e) => handleInstructionChange(e)}
										id={"instruction"}
										type={"text"}
										className={`peer mss-text-input-format mss-text-input-color-bgLight`}
									/>
									<label
										className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
										Instruction
									</label>
								</div>

							</div>

						</div>
						<button className="btn" onClick={(e) => handleAddInstruction(e)}>
							+
						</button>
						<ol className="list-decimal">
							{allInstructions.map((elem, index) => {
								return (
									<li key={index} className="flex justify-between">
										{elem.step} - {elem.instruction}
										<button
											onClick={(e) =>
												handleDeleteInstruction(e, index)
											}>
											delete
										</button>
									</li>
								);
							})}
						</ol>
						<select onChange={(e) => setFoodType(e.target.value)} required className="select select-bordered w-full max-w-xs">
							{allFoodTypes.map((foodType) => {
								return (
									<option key={foodType._id} value={foodType.name}>{foodType.name}</option>
								)
							})}
						</select>
						<div className="relative h-11 w-full max-w-14">
									<input
										value={prepTime}
										min={0}
										onChange={(e) => setPrepTime(Number(e.target.value))}
										id={"prepTime"}
										type={"number"}
										className={`peer mss-text-input-format mss-text-input-color-bgLight`}
									/>
									<label
										className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
										Prep Time
									</label>
								</div>
						<ButtonSubmit status={isLoading ? "submitting" : "idle"} buttonText="Create recipe" />
					</div>
				</div>
			</form>
		</>
	);
};
