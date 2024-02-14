import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { ButtonSubmit } from "@/Components/Atoms/ButtonSubmit";
import { Delete } from "@icon-park/react";
import { IngredientToAdd, Instruction } from "@/types/recipeTypes";
import { FoodType } from "@/types/foodTypes";

const optionsTools = [
	{ value: "Airfryer", label: "Airfryer" },
	{ value: "Oven", label: "Oven" },
	{ value: "Slow Cook", label: "Slow Cook" },
];

type ProfilePicProps = {
	type: "edit" | "create";
	onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fetchedImgLink?: string;
};
const ProfilePic = ({ type, onChangeFile, fetchedImgLink }: ProfilePicProps) => {
	return (
		<>
			<figure className="relative w-full h-64  rounded-sm overflow-hidden">
				<img
					className="object-cover h-64 w-full"
					src={type === "create" ? "https://res.cloudinary.com/dia3czrcq/image/upload/t_w_400/bwgqzebwzh9wqg4zrdae.jpg" : fetchedImgLink}
					alt=""
				/>
			</figure>
			<input type="file" className="file-input w-full" onChange={onChangeFile} multiple={false} />
		</>
	);
};
type NameProps = {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};
const Name = ({ value, setValue }: NameProps) => {
	return (
		<label className="form-control w-full">
			<input type="text" placeholder="Name" className="input w-full" value={value} onChange={(e) => setValue(e.target.value)} />
		</label>
	);
};
type DescriptionProps = {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};
const Description = ({ value, setValue }: DescriptionProps) => {
	return (
		<div className="relative w-full min-w-[200px]">
			<textarea className="textarea w-full" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Description" rows={4}></textarea>
		</div>
	);
};
type PrepTimeProps = {
	value: number;
	setValue: Dispatch<SetStateAction<number>>;
};
const PrepTime = ({ value, setValue }: PrepTimeProps) => {
	return (
		<label className="form-control w-full">
			<div className="label">
				<span className="label-text truncate">Prep time (min)</span>
			</div>
			<input type="number" value={value} min={0} onChange={(e) => setValue(Number(e.target.value))} className="input w-full" />
		</label>
	);
};
type ServingsProps = {
	value: number;
	setValue: Dispatch<SetStateAction<number>>;
};
const Servings = ({ value, setValue }: ServingsProps) => {
	return (
		<label className="form-control w-full">
			<div className="label">
				<span className="label-text">Servings</span>
			</div>
			<input type="number" value={value} min={0} onChange={(e) => setValue(Number(e.target.value))} className="input w-full max-w-xs" />
		</label>
	);
};
type FoodTypeProps = {
	type: string;
	setFoodTypeId: Dispatch<SetStateAction<string>>;
	optionsFoodType: { value: string; label: string }[];
	foodTypeId: string;
};
const FoodTypeComponent = ({ type, setFoodTypeId, optionsFoodType, foodTypeId }: FoodTypeProps) => {
	return (
		<>
			{type === "edit" && (
				<Select
					placeholder="Pick one food type"
					onChange={(option) => setFoodTypeId(option!.value)}
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
					options={optionsFoodType}
					defaultValue={optionsFoodType.find((foodType) => foodType.value.includes(foodTypeId))}
				/>
			)}
			{type === "create" && (
				<Select
					placeholder="Pick one food type"
					onChange={(option) => setFoodTypeId(option!.value)}
					classNames={{
						control: ({ isFocused }) =>
							isFocused
								? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
								: "!border-2 !border-transparent !bg-base-100 !h-12",
						menuList: () => " bg-base-200 rounded-sm",
						option: ({ isFocused }) => (isFocused ? " !bg-primary/20" : ""),
						placeholder: () => "text-sm !text-neutral-content",
						singleValue: () => "text-sm !text-neutral-content",
					}}
					options={optionsFoodType}
				/>
			)}
		</>
	);
};
type ToolsComponentProps = {
	type: string;
	setTools: Dispatch<SetStateAction<string[]>>;
	tools?: string[];
};
const ToolsComponent = ({ type, setTools, tools }: ToolsComponentProps) => {
	return (
		<>
			{type === "edit" && (
				<Select
					placeholder="Select the tools"
					onChange={(e) => setTools(e.map((el) => el.value))}
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
					value={optionsTools.filter((option) => tools?.includes(option.value))}
				/>
			)}
			{type === "create" && (
				<Select
					placeholder="Select the tools"
					onChange={(e) => setTools(e.map((el) => el.value))}
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
			)}
		</>
	);
};

type RecipeFormProps = {
	type: "edit" | "create";
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fetchedImgLink?: string;
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	description: string;
	setDescription: Dispatch<SetStateAction<string>>;
	prepTime: number;
	setPrepTime: Dispatch<SetStateAction<number>>;
	servings: number;
	setServings: Dispatch<SetStateAction<number>>;
	foodTypeId?: string;
	setFoodTypeId: Dispatch<SetStateAction<string>>;
	tools?: string[];
	setTools: Dispatch<SetStateAction<string[]>>;
	optionsIngredients: {
		value: string | undefined;
		label: string;
		unit: string;
	}[];
	newIngredient: IngredientToAdd;
	setNewIngredient: React.Dispatch<React.SetStateAction<IngredientToAdd>>;
	allIngredients: IngredientToAdd[];
	newInstruction: Instruction;
	isLoading: boolean;
	allInstructions: Instruction[];
	handleInstructionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectNewIngredient: (ingredient: { value: string; label: string; unit: number }) => void;
	handleAddIngredient: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleIngredientDelete: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
	handleAddInstruction: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleDeleteInstruction: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
	allFoodTypesFromDB: FoodType[];
};
export const RecipeForm = (props: RecipeFormProps) => {
	const optionsFoodType: { value: string; label: string }[] = props.allFoodTypesFromDB.map((foodType) => {
		return { value: foodType._id, label: foodType.name };
	});
	return (
		<>
			{props.isLoading ? (
				<p>Loading</p>
			) : (
				<>
					<form
						onSubmit={(e) => props.onSubmit(e)}
						className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md text-base sm:text-lg ">
						<div className="flex flex-col gap-10 lg:grid grid-cols-3 lg:gap-10">
							{/* COL 1 */}
							<div className="flex flex-col lg:col-span-1 gap-8">
								<ProfilePic onChangeFile={props.onChangeFile} type={props.type} fetchedImgLink={props.fetchedImgLink} />
								<Name value={props.name} setValue={props.setName} />
								<Description value={props.description} setValue={props.setDescription} />
								<div className="flex justify-between gap-4 ">
									<PrepTime value={props.prepTime} setValue={props.setPrepTime} />
									<Servings value={props.servings} setValue={props.setServings} />
								</div>
								<FoodTypeComponent
									type={props.type}
									setFoodTypeId={props.setFoodTypeId}
									optionsFoodType={optionsFoodType}
									foodTypeId={props.foodTypeId!}
								/>
								<ToolsComponent type={props.type} setTools={props.setTools} tools={props.tools} />
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
												onChange={(ingredient) => props.handleSelectNewIngredient(ingredient)}
												classNames={{
													control: ({ isFocused }) =>
														isFocused
															? " w-full !bg-base-100 !border-2 !border-base-300  !h-12 !cursor-pointer !shadow-none"
															: "!border-2 !border-transparent !bg-base-100 !h-12",
													menu: () => " w-full border_red_2 text-sm rounded-sm",
													placeholder: () => "text-sm !text-neutral-content",
													singleValue: () => "text-sm !text-neutral-content",
												}}
												options={props.optionsIngredients}
											/>
										</label>
										<label className="form-control w-full">
											<div className="label">
												<span className="label-text truncate">Quantity</span>
											</div>
											<input
												type="number"
												value={props.newIngredient.quantityForRecipe}
												min={0}
												onChange={(e) => props.setNewIngredient((prev) => ({ ...prev, quantityForRecipe: Number(e.target.value) }))}
												className="input w-full"
											/>
										</label>
										<button className="btn btn-primary btn-outline" onClick={(e) => props.handleAddIngredient(e)}>
											+
										</button>
									</div>
									<div className="h-48 bg-base-100 mt-4 overflow-y-scroll rounded-sm">
										{props.allIngredients.length === 0 ? (
											<p className="h-full flex justify-center items-center text-sm">The ingredients will be displayed here.</p>
										) : (
											<>
												<ol className="flex flex-col p-4 rounded-sm gap-4 w-full">
													{props.allIngredients.map((ingredient, index) => {
														return (
															<li key={index}>
																<div className="border-b w-full flex items-center gap-4 pb-1">
																	<button onClick={(e) => props.handleIngredientDelete(e, index)} className="btn btn-primary  btn-xs ">
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
												value={props.newInstruction.step}
												onChange={(e) => props.handleInstructionChange(e)}
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
												value={props.newInstruction.instruction}
												onChange={(e) => props.handleInstructionChange(e)}
												id={"instruction"}
											/>
										</label>

										<button className="btn btn-primary btn-outline" onClick={(e) => props.handleAddInstruction(e)}>
											+
										</button>
									</div>
									<div className="h-48 bg-base-100 mt-4 overflow-y-scroll rounded-sm">
										{props.allInstructions.length === 0 ? (
											<p className="h-full flex justify-center items-center text-sm">The instructions will be displayed here.</p>
										) : (
											<>
												<ol className="flex flex-col p-4 rounded-sm gap-4 w-full">
													{props.allInstructions.map((instruction, index) => {
														return (
															<li key={index}>
																<div className="border-b w-full flex items-center gap-4 pb-1">
																	<button onClick={(e) => props.handleDeleteInstruction(e, index)} className="btn btn-error  btn-xs ">
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

								<ButtonSubmit status={props.isLoading ? "submitting" : "idle"} buttonText="Create recipe" />
							</div>
						</div>
					</form>
				</>
			)}
		</>
	);
};
