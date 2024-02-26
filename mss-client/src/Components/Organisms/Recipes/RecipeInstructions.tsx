import { Instruction } from "@/types/recipeTypes";
import { Delete } from "@icon-park/react";

type InstructionsProps = {
	instructions: Instruction[];
	setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>;
};

export const Instructions = ({ instructions, setInstructions }: InstructionsProps) => {
	const addInstruction = () => {
		const newStep = instructions.length + 1;
		setInstructions([...instructions, { step: newStep, instruction: "" }]);
	};

	const removeInstruction = (index: number) => {
		const updatedInstructions = instructions.filter((_, i) => i !== index);
		setInstructions(updatedInstructions.map((instruction, idx) => ({ ...instruction, step: idx + 1 })));
	};

	const handleInstructionChange = (index: number, instructionText: string) => {
		const updatedInstructions = [...instructions];
		updatedInstructions[index] = { ...instructions[index], instruction: instructionText };
		setInstructions(updatedInstructions);
	};

	return (
		<div className="mt-4">
			<h3 className="font-semibold text-lg text-primary mb-2">Instructions</h3>
			<div className="bg-base-100 rounded-sm p-4">
				{instructions.map((instruction, index) => (
					<div key={index} className=" w-full">
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text text-xs">{`Step ${instruction.step}:`}</span>
							</div>
							<div className="flex flex-col gap-2 md:flex-row-reverse">
								<input
									type="text"
									placeholder={`Instruction nº ${instruction.step}`}
									className="input input-sm w-full text-sm"
									value={instruction.instruction}
									onChange={(e) => handleInstructionChange(index, e.target.value)}
								/>
								<button type="button" onClick={() => removeInstruction(index)} className="btn btn-sm btn-error">
									<Delete theme="outline" size="12" />
								</button>
							</div>
						</label>
					</div>
				))}{" "}
				<button type="button" onClick={addInstruction} className="my-4 btn btn-outline btn-primary w-full">
					Add Instruction
				</button>
			</div>
		</div>
	);
};
