import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const Upload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      navigate("/uploads", { state: { imageUrl } }); // Navigate with uploaded image
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleSampleImageClick = (url: string) => {
    navigate("/uploads", { state: { imageUrl: url } }); // Navigate with sample image
  };

  return (
    <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
      <h1 className="text-2xl md:text-4xl font-semibold max-w-xl leading-tight">
        Upload an image to <br /> Generate the Caption
      </h1>
      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 cursor-pointer"
      >
        Upload Image
      </button>

      <p className="mt-4 text-gray-600">
        or drop a file, paste image or <a href="#" className="text-blue-500 underline">URL</a>
      </p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-10 text-sm text-gray-600">
        <p>No image? Try one of these:</p>
        <div className="flex gap-2 justify-center mt-2">
          <img
            onClick={() => handleSampleImageClick("https://i.pinimg.com/736x/09/d2/b9/09d2b9f1e452f54a8260de445120cc76.jpg")}
            className="h-16 w-16 object-cover rounded cursor-pointer hover:opacity-80"
            src="https://i.pinimg.com/736x/09/d2/b9/09d2b9f1e452f54a8260de445120cc76.jpg"
            alt="sample"
          />
          <img
            onClick={() => handleSampleImageClick("https://i.pinimg.com/1200x/0d/a0/05/0da0053b5ac31b8004e624a6f7fc7d49.jpg")}
            className="h-16 w-16 object-cover rounded cursor-pointer hover:opacity-80"
            src="https://i.pinimg.com/1200x/0d/a0/05/0da0053b5ac31b8004e624a6f7fc7d49.jpg"
            alt="sample"
          />
          <img
            onClick={() => handleSampleImageClick("https://i.pinimg.com/736x/6c/25/45/6c2545513baa689a581038aedc07b6fc.jpg")}
            className="h-16 w-16 object-cover rounded cursor-pointer hover:opacity-80"
            src="https://i.pinimg.com/736x/6c/25/45/6c2545513baa689a581038aedc07b6fc.jpg"
            alt="sample"
          />
        </div>
      </div>
    </section>
  );
};

export default Upload;