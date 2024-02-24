// import { EditName } from "@icon-park/react";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { useParams } from "react-router-dom";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { BackendError } from "@/Components/Molecules/BackendError";

export const PageProfile = () => {
	const { userId } = useParams();
	const { profileFromDB, isLoadingProfileFromDB, errorFromAxios } = useFetchProfile(userId);

	if (!profileFromDB && !isLoadingProfileFromDB) return <BackendError errorFromAxios={errorFromAxios} />;

	return (
		<>
			<NavigationHeader pageName="My Profile" />
			<div className="grow flex flex-col items-center justify-center">
				{isLoadingProfileFromDB ? (
					<div className="skeleton w-full max-w-screen-md mx-auto h-[400px] shadow-sm"></div>
				) : (
					<div className="w-full overflow-hidden rounded-md  bg-neutral shadow-sm border max-w-screen-md mx-auto">
						<div className="px-4 py-6 md:py-10 text-center ">
							<div className="relative flex justify-center w-32 h-32 mx-auto">
								<figure className={`relative overflow-hidden rounded-full`}>
									<img className="object-cover w-32 h-32" id="profilePic" src={profileFromDB?.profileImg} alt="" />
								</figure>

								{/* <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary ">
							<EditName theme="outline" size="16" className="text-neutral/80" />
						</label> */}
							</div>
							<div className="mt-4">
								<h3 className={`mb-2 text-2xl font-semibold text-neutral-content`}>
									{profileFromDB?.firstName} {profileFromDB?.lastName}
								</h3>
								<p className={`font-medium text-neutral-content/80`}>{profileFromDB?.email}</p>
								<div className={`mx-auto mt-4 mb-5 grid max-w-96 grid-cols-2 rounded-md border border-stroke py-2`}>
									{!profileFromDB ? null : (
										<>
											<div className=" flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 sm:flex-row">
												<span className="font-semibold text-neutral-content">{profileFromDB?.createdRecipesCount}</span>
												<span className="text-sm">Recipes created</span>
											</div>
											<div className="flex flex-col items-center justify-center gap-1 px-4 sm:flex-row">
												<span className="font-semibold text-neutral-content">{profileFromDB?.favoriteRecipes.length}</span>
												<span className="text-sm">Favorites</span>
											</div>
										</>
									)}
								</div>
								<div className={`mx-auto max-w-screen-sm`}>
									{!profileFromDB?.aboutMe ? null : (
										<>
											<h4 className="font-semibold text-neutral-content">About me</h4>
											<p className="mt-4">{profileFromDB?.aboutMe}</p>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
