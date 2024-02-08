import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { ButtonMenu } from "@/Components/Atoms/ButtonMenu";
import { NavigationProfile } from "@/Components/Organisms/NavigationProfile";
import { CloseSmall, User } from "@icon-park/react";

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
                className={`absolute left-0 top-0 z-[9999] flex h-screen w-64 lg:w-68  flex-col overflow-y-hidden bg-[#4c0519] text-neutral duration-300 ease-linear lg:static  ${isAsideOpen ? "translate-x-0" : "lg:translate-x-0 translate-x-[-100%] "
                    }`}>
                {/* HEADER */}
                <div className="flex items-center justify-between gap-2 px-4 py-4 lg:py-6">
                    <NavLink to={"/"}>LOGO</NavLink>
                    <button className="lg:hidden" onClick={() => setIsAsideOpen(false)}>
                        <CloseSmall theme="outline" size="24" className="text-neutral" />
                    </button>
                </div>
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <ul>
                        <li>
                            <NavLink onClick={() => setIsAsideOpen(false)} className={({ isActive }) =>
                            (isActive ? 'group mss-link font-semibold text-primary-content' : 'group mss-link font-normal text-primary-content/80'
                            )} to={"/profile"}><User theme="outline" size="18" className="text-neutral" />Profile</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsAsideOpen(false)} className={({ isActive }) =>
                            (isActive ? 'group mss-link font-semibold text-primary-content' : 'group mss-link font-normal text-primary-content/80'
                            )} to={"/explore"}>Explore</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsAsideOpen(false)} className={({ isActive }) =>
                            (isActive ? 'group mss-link font-semibold text-primary-content' : 'group mss-link font-normal text-primary-content/80'
                            )} to={`/${user?._id}/my-recipes`}>My recipes</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsAsideOpen(false)} className={({ isActive }) =>
                            (isActive ? 'group mss-link font-semibold text-primary-content' : 'group mss-link font-normal text-primary-content/80'
                            )} to={"/recipe/favorites"}>Favorite recipes</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsAsideOpen(false)} className={({ isActive }) =>
                            (isActive ? 'group mss-link font-semibold text-primary-content' : 'group mss-link font-normal text-primary-content/80'
                            )} to={"/recipe/create"}>Create Recipe</NavLink>
                        </li>
                    </ul>

                </nav>
            </aside >
            <div className="relative h-full flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header className="sticky top-0 z-[999] flex w-full bg-neutral shadow-md">
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
                                    <NavLink className="btn btn-ghost btn-sm" to={"/login"}>
                                        Login
                                    </NavLink>
                                    <NavLink className="btn btn-sm btn-primary" to={"/register"}>
                                        Register
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>
                {children}
            </div>
        </>
    );
};
