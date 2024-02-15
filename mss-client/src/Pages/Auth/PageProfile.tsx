import { useEffect, useState } from "react";
import { EditName } from "@icon-park/react";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { useParams } from "react-router-dom";
import { User } from "@/types/userTypes";
import { getUserDetails } from "@/api";

export const PageProfile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	console.log("🚀 ~ PageProfile ~ user:", user);

	useEffect(() => {
		setIsLoading(true);
		const fetchUserDetails = async () => {
			try {
				if (!userId) throw Error("user id not found!");
				const response = await getUserDetails(userId);
				setUser(response.data.userDetails);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		const interval = setTimeout(() => {
			fetchUserDetails();
		}, 1500);

		return () => clearTimeout(interval);
	}, [userId]);

	return (
		<>
			<NavigationHeader pageName="My Profile" />

			<div className="overflow-hidden rounded-md  bg-neutral shadow-sm border">
				<div className="px-4 py-6 md:py-10 text-center ">
					<div className="relative flex justify-center w-32 h-32 mx-auto">
						<figure className={`${isLoading && "skeleton"} relative overflow-hidden rounded-full`}>
							<img className="object-cover w-32 h-32" id="profilePic" src={user?.profileImg} alt="" />
						</figure>
						<label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary ">
							<EditName theme="outline" size="16" className="text-neutral/80" />
						</label>
					</div>
					<div className="mt-4">
						<h3 className={`${isLoading && "skeleton h-6 w-48 mx-auto"} mb-2 text-2xl font-semibold text-neutral-content`}>
							{user?.firstName} {user?.lastName}
						</h3>
						<p className={`${isLoading && "skeleton h-6 w-48 mx-auto"} font-medium text-neutral-content/80`}>{user?.email}</p>
						<div className={`${isLoading && "skeleton h-12"} mx-auto mt-4 mb-5 grid max-w-96 grid-cols-2 rounded-md border border-stroke py-2`}>
							{!user ? null : (
								<>
									<div className=" flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 sm:flex-row">
										<span className="font-semibold text-neutral-content">{user?.createdRecipesCount}</span>
										<span className="text-sm">Recipes created</span>
									</div>
									<div className="flex flex-col items-center justify-center gap-1 px-4 sm:flex-row">
										<span className="font-semibold text-neutral-content">300</span>
										<span className="text-sm">Favorites</span>
									</div>
								</>
							)}
						</div>
						<div className="mx-auto max-w-screen-sm">
							<h4 className="font-semibold text-neutral-content">About me</h4>
							<p className="mt-4">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro molestiae, tempore voluptatibus dolorum mollitia, ex illum dicta quasi,
								incidunt eaque eius. Mollitia ut tenetur, exercitationem reiciendis laborum incidunt eligendi expedita.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
