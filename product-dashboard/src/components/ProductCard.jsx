import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [likeProduct, setLikeProduct] = useState(false);

  const handleLikeProduct = (id) => {
    const newLikeStatus = !likeProduct;
    setLikeProduct(newLikeStatus);
    localStorage.setItem(`${id}`, JSON.stringify(newLikeStatus));
  };

  useEffect(() => {
    const isLiked = JSON.parse(localStorage.getItem(`${product.id}`));
    setLikeProduct(isLiked);
  }, [product.id]);

  return (
    <div className="border border-gray-200 shadow-sm  rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-[101%] transition duration-300">
      <div className="relative h-48 w-auto p-2 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
        <button
          onClick={() => handleLikeProduct(product.id)}
          className="absolute bottom-0 right-5 cursor-pointer"
        >
          {likeProduct ? (
            <FaRegHeart className="text-red-400 size-5" />
          ) : (
            <FaHeart className="text-red-400 size-5" />
          )}
        </button>
      </div>

      <div className="w-full h-full p-4 bg-gray-100 text-white border-t">
        <h2 className=" text-black font-semibold mb-2 line-clamp-2">
          {product.title}
        </h2>
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-900 text-xl font-bold">${product.price}</p>
          <span className="text-xs px-2 py-1 border border-yellow-500 text-yellow-500 bg-white rounded-lg">
            {product.category}
          </span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center text-sm text-yellow-500">
          <span className="flex justify-around items-center">
            {Array.from({
              length: Math.round(product.rating.rate),
            }).map((_, index) => (
              <IoMdStar size={16} />
            ))}
            {Array.from({
              length: 5 - Math.round(product.rating.rate),
            }).map((_, index) => (
              <IoMdStarOutline size={16} />
            ))}
          </span>
          <span className="mx-2">|</span>
          <span>{product.rating.count} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
