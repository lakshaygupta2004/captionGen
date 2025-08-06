import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";

type Props = {
    onOpenModal: (type: 'login' | 'signup') => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
};

const EditPage: React.FC<Props> = ({ onOpenModal, isAuthenticated, setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [captions, setCaptions] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [previewImage, setPreviewImage] = useState<string>("");

    const initialImageUrl = location.state?.imageUrl;

    useEffect(() => {
        if (!initialImageUrl) {
            navigate("/");
        } else {
            setImages([initialImageUrl]);
            setPreviewImage(initialImageUrl);
        }
    }, [initialImageUrl, navigate]);

    const handleGenerate = () => {
        setCaptions([
            "This is a caption from backend.",
            "Another AI-generated description.",
            "Image contains natural scenery.",
        ]);
    };

    const handleAddImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataUrl = reader.result as string;
                setImages(prev => [...prev, imageDataUrl]);
                setPreviewImage(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 text-gray-800 flex flex-col">
            {/* Header */}
            <Header
                onOpenModal={onOpenModal}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />

            {/* Main */}
            <main className="flex-1 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
                {/* Left Column - Image Preview */}
                <section className="w-full lg:w-2/3 flex flex-col gap-4">
                    <div className="bg-white rounded-xl p-4 h-[420px]">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-full object-contain rounded-xl"
                            />
                        ) : (
                            <div className="text-center text-gray-400 h-full flex items-center justify-center">
                                No image selected
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="self-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Generate Captions
                    </button>
                </section>


                {/* Right Column - Captions */}
                <aside className="w-full lg:w-1/3 bg-white rounded-xl p-6 h-[420px] overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Generated Captions</h2>
                    {captions.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                            {captions.map((caption, idx) => (
                                <li key={idx}>{caption}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Click "Generate Captions" to view suggestions.</p>
                    )}
                </aside>
            </main>

            {/* Thumbnails */}
            <section className="container mx-auto px-4 pb-10">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Your Images</h3>
                <div className="flex items-center gap-4 flex-wrap">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer ${img === previewImage ? 'ring-2 ring-blue-600' : ''}`}
                            onClick={() => setPreviewImage(img)}
                            title="Click to preview"
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    {/* Add Image Button */}
                    <button
                        onClick={handleAddImageClick}
                        className="w-16 h-16 bg-blue-50 border border-dashed border-blue-400 rounded-lg flex items-center justify-center text-2xl text-blue-500 hover:bg-blue-100"
                        aria-label="Add New Image"
                    >
                        +
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </section>
        </div>
    );
};

export default EditPage;