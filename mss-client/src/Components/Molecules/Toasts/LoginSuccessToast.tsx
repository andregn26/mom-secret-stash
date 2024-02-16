import { User } from "@/types/userTypes";
import { Toast } from "react-hot-toast";

type Props = {
	t: Toast;
	user: User;
};

export const LoginSuccessToast = ({ t, user }: Props) => {
	return (
		<div
			className={`${
				t.visible ? "animate-enter" : "animate-leave"
			} w-full max-w-xs bg-neutral shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
			<div className="flex-1 w-0 p-4">
				<div className="flex items-start">
					<div className="flex-shrink-0 pt-0.5"></div>
					<div className="ml-3 flex-1">
						<p className="text-sm font-medium text-neutral-content">
							Welcome, {user.firstName} {user.lastName}!
						</p>
						<p className="mt-1 text-sm text-neutral-content/60">Start exploring the best recipes!</p>
					</div>
				</div>
			</div>
		</div>
	);
};
