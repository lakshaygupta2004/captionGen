import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Upload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleButtonClick = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/check-auth`, {
        withCredentials: true,
      });

      if (res.data.isAuthenticated) {
        fileInputRef.current?.click();
      } else {
        toast.error("Please log in first.");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      toast.error("Something went wrong. Try again.");
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      navigate("/uploads", { state: { imageUrl } }); // Navigate with uploaded image
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleSampleImageClick = async (url: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/check-auth`, {
        withCredentials: true,
      });

      if (res.data.isAuthenticated) {
        navigate("/uploads", { state: { imageUrl: url } });
      } else {
        toast.error("Please log in first.");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      toast.error("Something went wrong. Try again.");
    }
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
            onClick={() => handleSampleImageClick("https://ik.imagekit.io/wr6ziyjiu/img2.jpg?updatedAt=1754473053956")}
            className="h-16 w-16 object-cover rounded cursor-pointer hover:opacity-80"
            src="https://ik.imagekit.io/wr6ziyjiu/img2.jpg?updatedAt=1754473053956"
            alt="sample"
          />
          <img
            onClick={() => handleSampleImageClick("https://ik.imagekit.io/wr6ziyjiu/img1.jpg?updatedAt=1754473053969")}
            className="h-16 w-16 object-cover rounded cursor-pointer hover:opacity-80"
            src="https://ik.imagekit.io/wr6ziyjiu/img1.jpg?updatedAt=1754473053969"
            alt="sample"
          />
          <img
            onClick={() => handleSampleImageClick("https://ik.imagekit.io/wr6ziyjiu/img3.jpg?updatedAt=1754473053917")}
            className="h-16 w-16 object-cover rounded cursor-pointer hover:opacity-80"
            src="https://ik.imagekit.io/wr6ziyjiu/img3.jpg?updatedAt=1754473053917"
            alt="sample"
          />
        </div>
      </div>
    </section>
  );
};

export default Upload;