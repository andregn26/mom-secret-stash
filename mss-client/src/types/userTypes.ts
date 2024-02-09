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
	_id: string;
	exp: number;
	iat: number;
};