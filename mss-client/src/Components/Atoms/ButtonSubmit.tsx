type ButtonSubmitProps = {
	status: "idle" | "submitting";
	buttonText: string;
};

export const ButtonSubmit = ({ status, buttonText }: ButtonSubmitProps) => {
	let disabled = false;

	if (status === "submitting") {
		disabled = true;
		buttonText = "Submitting";
	}

	return (
		<button disabled={disabled} type="submit" className={`btn btn-primary w-full  ${status === "submitting" && "btn-disabled"}`}>
			{buttonText}
		</button>
	);
};
