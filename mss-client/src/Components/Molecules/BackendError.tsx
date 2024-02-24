import { AxiosError } from "axios";
import { Error } from "@icon-park/react";
type Props = {
	errorFromAxios: AxiosError | null;
};

export const BackendError = ({ errorFromAxios }: Props) => {
	return (
		<div className="h-full flex flex-col justify-center items-center gap-4">
			<Error theme="filled" size="60" className="text-error" />
			<p className="font-semibold text-lg">{errorFromAxios ? <>{errorFromAxios.message}</> : <>Something went wrong!</>}</p>
			<p>If you're a developer, check the server console</p>
		</div>
	);
};
