import { useState } from "react";

type ProfileImgProps = {
	setFileImg: React.Dispatch<React.SetStateAction<File | null>>;
};

export const ProfilePic = ({ setFileImg }: ProfileImgProps) => {
	const [preview, setPreview] = useState<string | null>(null);
	const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) throw Error("event.target.files not found!");
		const file = event.target.files[0];
		const urlImage = URL.createObjectURL(file);
		setPreview(urlImage);
		setFileImg(file);
	};
	return (
		<>
			<figure className="relative w-full h-64  rounded-sm overflow-hidden">
				<img
					className="object-cover h-64 w-full"
					src={preview ? preview : "https://res.cloudinary.com/dia3czrcq/image/upload/t_w_400/bwgqzebwzh9wqg4zrdae.jpg"}
					alt=""
				/>
			</figure>
			<input type="file" className="file-input w-full" onChange={handleUploadedFile} multiple={false} />
		</>
	);
};
