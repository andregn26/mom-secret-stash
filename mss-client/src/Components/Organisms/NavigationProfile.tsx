import { Link } from "react-router-dom";
import { IconAvatar } from "@/Components/Icons/Base";

type Props = {
    handleProfileMenuOpen: () => void,
    isProfileMenuOpen: boolean,
    logoutUser: () => void
}

export const NavigationProfile = ({ handleProfileMenuOpen, isProfileMenuOpen, logoutUser }: Props) => {
    return (
        <div className="relative">
            <button onClick={handleProfileMenuOpen} className="flex items-center gap-4">
                <figure className="h-12 w-12 overflow-hidden rounded-full">
                    <img src="https://i.pravatar.cc/150?img=3" alt="User" />
                </figure>
            </button>
            {isProfileMenuOpen && (
                <div className="absolute right-0 mt-6 flex w-48 flex-col rounded-sm border border-stroke bg-white shadow-default  ">
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-8">
                        <li>
                            <Link
                                className="flex items-center gap-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                to={"/"}>
                                <IconAvatar /> Main Page
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center gap-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                to={"/profile"}>
                                <IconAvatar /> My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center gap-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                to={"/my-recipes"}>
                                <IconAvatar /> My Recipes
                            </Link>
                        </li>
                    </ul>
                    <button onClick={logoutUser} className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">Logout</button>
                </div>
            )}
        </div>
    );
};
