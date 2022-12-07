import { createRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const fileInputRef = createRef<HTMLInputElement>();

	const openFileInputWindow = () => fileInputRef.current?.click();

	const convertImageToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length === 0) return console.log("No File Uploaded");
		if (e.target.files === null) return console.log("No File Uploaded");

		const uploadedImage = e.target.files[0];

		if (uploadedImage && uploadedImage.size > 2000000) return console.log("Image Too Big");

		const formData = new FormData();

		formData.append("image", uploadedImage);

		setLoading(true);

		axios.post("http://localhost:5000/upload", formData).then((res) => {
			const { message } = res.data;
			if (message === "success") {
				setImage(res.data.image);
				setLoading(false);
			}
		});
	};

	const downloadResultImage = () => {
		if (image === null) return;

		const a = document.createElement("a");
		a.download = "result_image.jpg";
		a.href = `data:image/jpg;base64,${image}`;
		a.click();
	};

	return (
		<div className="App">
			<h1>Face Detection App</h1>
			{image && <img src={`data:image/jpg;base64,${image}`} style={{ width: 400 }} />}
			<div className="card">
				<input
					accept="image/*"
					style={{ display: "none" }}
					ref={fileInputRef}
					type="file"
					onChange={convertImageToBase64}
				/>
				{loading ? (
					<button disabled>Loading...</button>
				) : (
					<>
						<button onClick={openFileInputWindow}>Upload Your Image</button>
						{image && (
							<button style={{ marginLeft: 16 }} onClick={downloadResultImage}>
								Download
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default App;
