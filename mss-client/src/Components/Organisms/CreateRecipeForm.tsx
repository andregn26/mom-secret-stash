import { RecipeFigure } from "@/Components/Molecules/CreateRecipe/RecipeFigure";
import { ButtonSubmit } from "@/Components/Atoms/ButtonSubmit";

type Props = {
    handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void
    name:string,
    setName: () =>void,
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
};

export const CreateRecipeForm = ({handleSubmit,name, setName, description, setDescription}: Props) => {
	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md text-base sm:text-lg ">
			<div className="flex-col lg:grid grid-cols-3 lg:gap-10">
				{/* COL 1 */}
				<div className="flex flex-col col-span-1">
					{/* NAME AND PICTURE */}
					<RecipeFigure value={name} setValue={setName} />
					<input type="file" className="file-input file-input-bordered file-input-sm w-full" />
				</div>
				{/* COL 2 */}
				<div className="flex flex-col col-span-2 gap-4">
					{/* DESCRIPTION */}
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
							<button className="btn btn-base-300" onClick={(e) => handleAddIngredient(e)}>
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
									<button onClick={(e) => handleDeleteInstruction(e, index)}>
										delete
									</button>
								</li>
							);
						})}
					</ol>
					<select
						onChange={(e) => setFoodTypeId(e.target.value)}
						required
						className="select select-bordered w-full max-w-xs">
						{allFoodTypes.map((foodType) => {
							return (
								<option key={foodType._id} value={foodType._id}>
									{foodType.name}
								</option>
							);
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
						<label className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
							Prep Time
						</label>
					</div>
					<div className="relative h-11 w-full max-w-14">
						<input
							value={servings}
							min={0}
							onChange={(e) => setServings(Number(e.target.value))}
							id={"servings"}
							type={"number"}
							className={`peer mss-text-input-format mss-text-input-color-bgLight`}
						/>
						<label className={`after:content[''] mss-text-label-format mss-text-label-color-bgLight`}>
							Servings
						</label>
					</div>
					<ButtonSubmit status={isLoading ? "submitting" : "idle"} buttonText="Create recipe" />
				</div>
			</div>
		</form>
	);
};
