import React from "react";

type Props = {
	title: string;
	children: React.ReactNode;
};

export const FormContainer = ({ title, children }: Props) => {
	return (
		<div className="relative py-3 sm:max-w-xl sm:mx-auto flex flex-col justify-center h-full">
			<div className="relative px-4 py-6 bg-white shadow-lg rounded-sm sm:p-10">
				<div className="max-w-md mx-auto">
					<div>
						<h2 className="text-2xl font-semibold">{title}</h2>
					</div>
					<div className="">{children}</div>
				</div>
			</div>
		</div>
	);
};
