import { useNavigate } from "react-router-dom";

type NavigationHeaderProps = {
	pageName?: string;
	isLoading?: boolean;
};

export const NavigationHeader = ({ pageName = "Something went wrong", isLoading }: NavigationHeaderProps) => {
	const navigate = useNavigate();
	return (
		<>
			{!isLoading ? (
				<div className="flex justify-between items-center mb-4 gap-8">
					<h2 className="text-xl lg:text-2xl font-semibold text-accent">{pageName}</h2>
					<button className="btn btn-sm btn-outline btn-accent" onClick={() => navigate(-1)}>
						Go back
					</button>
				</div>
			) : (
				<div className="skeleton h-12"></div>
			)}
		</>
	);
};
