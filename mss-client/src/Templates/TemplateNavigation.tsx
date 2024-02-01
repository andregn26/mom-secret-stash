import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { ButtonMenu } from "@/Components/Atoms/ButtonMenu";
import { NavigationProfile } from "@/Components/Organisms/NavigationProfile";

export const TemplateNavigation = () => {
    const { isLoggedIn, logoutUser } = useContext(AuthContext);

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
    const handleProfileMenuOpen = () => {
        setIsProfileMenuOpen((prev) => !prev);
    };
    return (
        <div className="sticky top-0 z-[999]">
            <header className=" flex w-full bg-white shadow-md">
                <nav className="flex w-full flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                        <ButtonMenu />
                    </div>

                    <div className=" w-full flex justify-end">
                        {isLoggedIn ? (
                            <NavigationProfile handleProfileMenuOpen={handleProfileMenuOpen} logoutUser={logoutUser} isProfileMenuOpen={isProfileMenuOpen} />
                        ) : (

                            <div className="flex gap-1">
                                <Link className="btn btn-ghost btn-sm" to={"/login"}>Login</Link>
                                <Link className="btn btn-sm btn-primary" to={"/register"}>Register</Link>
                            </div>

                        )}
                    </div>

                    {/* {!isLoggedIn ? <><Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link></> : <><Link to={"/profile"}>Profile</Link> <button onClick={logoutUser}>Logout</button> </>
                } */}
                </nav>
            </header>
        </div >
    )
}