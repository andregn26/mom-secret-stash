import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { ButtonMenu } from "@/Components/Atoms/ButtonMenu";
import { NavigationProfile } from "@/Components/Organisms/NavigationProfile";

type Props = {
    children?: React.ReactNode;
};

export const TemplateNavigation = ({ children }: Props) => {
    const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

    const handleProfileMenuOpen = () => {
        setIsProfileMenuOpen((prev) => !prev);
    };

    const logoutAndCloseMenu = () => {
        logoutUser();
        setIsProfileMenuOpen(false);
    };

    return (
        <>
            <aside
                className={`absolute left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-slate-900 duration-300 ease-linear lg:static  ${isAsideOpen ? "translate-x-0" : "lg:translate-x-0 translate-x-[-100%]"
                    }`}>
                <button onClick={() => setIsAsideOpen(false)}>fechar</button>
                <Link className="text-base-100" to={"/"}>Main Page</Link>
                <Link className="text-base-100" to={"/explore"}>Explore</Link>
                <Link className="text-base-100" to={"/recipes/my-recipes"}>My recipes</Link>
                <Link className="text-base-100" to={"/recipes/favorites"}>Favorite recipes</Link>
                <Link className="text-base-100" to={"/recipes/create"}>Create Recipe</Link>
            </aside>
            <div className="relative h-full flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header className="sticky top-0 z-[999] flex w-full bg-white shadow-md">
                    <nav className="flex w-full flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                            <ButtonMenu setIsAsideOpen={setIsAsideOpen} />
                        </div>

                        <div className=" w-full flex justify-end">
                            {isLoggedIn ? (
                                <NavigationProfile
                                    user={user}
                                    setIsProfileMenuOpen={setIsProfileMenuOpen}
                                    handleProfileMenuOpen={handleProfileMenuOpen}
                                    logoutUser={logoutAndCloseMenu}
                                    isProfileMenuOpen={isProfileMenuOpen}
                                />
                            ) : (
                                <div className="flex gap-1">
                                    <Link className="btn btn-ghost btn-sm" to={"/login"}>
                                        Login
                                    </Link>
                                    <Link className="btn btn-sm btn-primary" to={"/register"}>
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* {!isLoggedIn ? <><Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link></> : <><Link to={"/profile"}>Profile</Link> <button onClick={logoutUser}>Logout</button> </>
                } */}
                    </nav>
                </header>
                {children}
            </div>
        </>
    );
};
