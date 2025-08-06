const Upload = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
      <h1 className="text-2xl md:text-4xl font-semibold max-w-xl leading-tight">
        Upload an image to <br /> Generate the Caption
      </h1>
      <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700">
        Upload Image
      </button>
      <p className="mt-4 text-gray-600">or drop a file, paste image or <a href="#" className="text-blue-500 underline">URL</a></p>

      <div className="mt-10 text-sm text-gray-600">
        <p>No image? Try one of these:</p>
        <div className="flex gap-2 justify-center mt-2">
          <img className="h-16 w-16 object-cover rounded" src="https://i.pinimg.com/736x/09/d2/b9/09d2b9f1e452f54a8260de445120cc76.jpg" alt="sample" />
          <img className="h-16 w-16 object-cover rounded" src="https://i.pinimg.com/1200x/0d/a0/05/0da0053b5ac31b8004e624a6f7fc7d49.jpg" alt="sample" />
          <img className="h-16 w-16 object-cover rounded" src="https://i.pinimg.com/736x/6c/25/45/6c2545513baa689a581038aedc07b6fc.jpg" alt="sample" />
        </div>
      </div>
    </section>
  );
};

export default Upload;
