const ProductNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-4xl font-bold text-gray-800">Product Not Found</h1>
        <p className="text-gray-600 mt-2">Sorry, the product you're looking for does not exist.</p>
        <a
          href="/"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Go Back Home
        </a>
      </div>
    );
  };

export default ProductNotFound;