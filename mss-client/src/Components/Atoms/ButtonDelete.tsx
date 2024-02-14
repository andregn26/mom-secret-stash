import { useRef } from "react";
import { Link } from "react-router-dom";

type ButtonDeleteProps = {
	btnClassName?: string;
	btnTextOrElement: string | React.ReactElement;
	nameOfItemToDelete: string;
	handleDelete: () => void;
	renderComponent: "default" | "deleteButton" | "allIngredients";
	editLink?: string;
};

export const ButtonDelete = ({
	btnClassName,
	btnTextOrElement,
	nameOfItemToDelete,
	handleDelete,
	renderComponent = "default",
	editLink,
}: ButtonDeleteProps) => {
	const modal = useRef<HTMLDialogElement>(null);

	switch (renderComponent) {
		case "allIngredients":
			return (
				<>
					<button onClick={() => modal.current?.showModal()}>{btnTextOrElement}</button>
					<dialog ref={modal} className="modal">
						<div className="modal-box">
							<h3 className="font-bold text-lg">Atention!</h3>
							<p className="py-4">
								What do you want to do with <span className="text-bold">{nameOfItemToDelete}</span>?
							</p>
							<div className="flex">
								<form method="dialog" className="space-x-2">
									<button onClick={handleDelete} className="btn btn-error">
										Delete
									</button>
									<Link to={editLink!} className="btn btn-ghost">
										Edit
									</Link>
								</form>
							</div>
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
							</form>
						</div>
						<form method="dialog" className="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>
				</>
			);
		case "deleteButton":
			return (
				<>
					<button className={`${btnClassName}`} onClick={() => modal.current?.showModal()}>
						{btnTextOrElement}
					</button>
					<dialog ref={modal} className="modal">
						<div className="modal-box">
							<h3 className="font-bold text-lg">Atention!</h3>
							<p className="py-4">
								Are you sure you want do delete <span className="text-bold">{nameOfItemToDelete}</span>?
							</p>
							<div className="flex">
								<form method="dialog" className="space-x-2">
									<button onClick={() => handleDelete()} className="btn btn-error">
										Yes
									</button>
									<button className="btn btn-ghost">No</button>
								</form>
							</div>
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
							</form>
						</div>
						<form method="dialog" className="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>
				</>
			);

		default:
			return <div>No matching component</div>;
	}
};
