import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { ButtonMenu } from "@/Components/Atoms/ButtonMenu";
import { NavigationProfile } from "@/Components/Organisms/NavigationProfile";
import { CloseSmall, User, VegetableBasket, Like, FileAddition, ListAdd, Cook, ChefHatOne } from "@icon-park/react";
import { Logo } from "@/Components/Atoms/Logo";

type TemplateNavigationProps = {
	children?: React.ReactNode;
};

type NavLinkItemProps = {
	to: string;
	handleClick: (value: React.SetStateAction<boolean>) => void;
	icon: React.ReactNode;
	linkName: string;
};

const NavLinkItem = ({ to, handleClick, icon, linkName }: NavLinkItemProps) => {
	return (
		<li>
			<NavLink
				onClick={() => handleClick(false)}
				className={({ isActive }) =>
					isActive
						? "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 duration-300 ease-in-out hover:bg-secondary/40 hover:text-secondary-content font-semibold text-secondary-content"
						: "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 duration-300 ease-in-out hover:bg-primary/40 hover:text-secondary-content font-normal text-secondary-content/80"
				}
				to={to}>
				{icon}
				{linkName}
			</NavLink>
		</li>
	);
};

export const TemplateNavigation = ({ children }: TemplateNavigationProps) => {
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
				className={`absolute left-0 top-0 z-[9999] flex h-screen w-64 lg:w-68  flex-col overflow-y-hidden bg-secondary text-neutral duration-300 ease-linear lg:static  ${
					isAsideOpen ? "translate-x-0" : "lg:translate-x-0 translate-x-[-100%] "
				}`}>
				{/* HEADER */}
				<div className="flex items-center justify-between gap-2 px-4 py-4 lg:py-6">
					<NavLink to={"/"}>
						<Logo />
					</NavLink>
					<button className="lg:hidden" onClick={() => setIsAsideOpen(false)}>
						<CloseSmall theme="outline" size="24" className="text-neutral" />
					</button>
				</div>
				<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
					<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
						<div>
							<h3 className="mb-4 ml-4 text-sm font-semibold text-primary-content/50">MENU</h3>
							<ul className="mb-6 flex flex-col gap-1.5">
								<NavLinkItem to={`/profile/${user?._id}`} linkName="Profile" handleClick={setIsAsideOpen} icon={<User theme="outline" size="18" />} />
								<NavLinkItem to="/explore" linkName="Explore" handleClick={setIsAsideOpen} icon={<ChefHatOne theme="outline" size="18" />} />
								<NavLinkItem
									to={`/${user?._id}/my-recipes`}
									linkName="My recipes"
									handleClick={setIsAsideOpen}
									icon={<Cook theme="outline" size="18" />}
								/>
								<NavLinkItem
									to={`/recipe/favorites`}
									linkName="Favorite recipes"
									handleClick={setIsAsideOpen}
									icon={<Like theme="outline" size="18" />}
								/>

								<NavLinkItem
									to={`/ingredients/all`}
									linkName="Ingredients"
									handleClick={setIsAsideOpen}
									icon={<VegetableBasket theme="outline" size="18" />}
								/>
							</ul>
						</div>
						<div>
							<h3 className="mb-4 ml-4 text-sm font-semibold text-primary-content/50">CREATE</h3>
							<ul className="mb-6 flex flex-col gap-1.5">
								<NavLinkItem
									to={`/recipe/create`}
									linkName="New Recipe"
									handleClick={setIsAsideOpen}
									icon={<FileAddition theme="outline" size="18" />}
								/>
								<NavLinkItem
									to={`/ingredients/create`}
									linkName="New Ingredient"
									handleClick={setIsAsideOpen}
									icon={<ListAdd theme="outline" size="18" />}
								/>
							</ul>
						</div>
					</nav>
				</div>
			</aside>
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
