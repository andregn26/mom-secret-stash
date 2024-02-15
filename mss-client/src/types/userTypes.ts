export type UserRegister = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	profileImg?: string | null;
};

export type UserLogin = {
	email: string;
	password: string;
};

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	profileImg?: string;
	isUserAdmin: boolean;
	createdRecipesCount: number;
	_id: string;
	exp: number;
	iat: number;
};

export type JwtTokenUser = {
	email: string;
	isUserAdmin: boolean;
	_id: string;
};
