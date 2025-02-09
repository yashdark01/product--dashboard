import { useState, useEffect } from "react";
import axios from "axios";
import InlineLoader from "../components/InlineLoader";
import Select from "react-select";
import ProductCard from "../components/ProductCard";
import ProductNotFound from "../components/ProductNotFound";
import ErrorPage from "../components/Error";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState([]);
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setCategory([...new Set(response.data.map((p) => p.category))]);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateCategory = category.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );

  const options = [
    { value: "all", label: "All Categories" },
    ...updateCategory.map((category) => ({ value: category, label: category })),
  ];

  const priceOptions = [
    { value: "asc", label: "Low → High" },
    { value: "desc", label: "High → Low" },
  ];
  const filteredProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        (isLiked === true || localStorage.getItem(`${product.id}`) === "true")
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  if (loading) return <InlineLoader />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="w-full min-h-screen bg-white p-4 md:py-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl 2xl:max-w-full mx-auto">
        <div className="mb-8 space-y-4 md:space-y-0 flex flex-col xl:flex-row justify-between md:gap-6 items-center">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              className=" min-w-full  md:w-full p-3 rounded-xl border border-zinc-300 hover:border-zinc-400 hover:shadow-sm bg-slate-50 text-black placeholder-gray-400   transition duration-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 sm:gap-6 ">
            {/* <select
            className="w-full md:w-64 p-3 rounded-xl bg-white border border-black text-black  focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all" >All Categories</option>
            {[...new Set(products.map((p) => p.category))].map((category) => (
              <option key={category} value={category} >
                {category}
              </option>
            ))}
          </select> */}
            <div className=" flex  justify-between items-center gap-3 sm:gap-6 ">
              <Select
                options={options}
                onChange={(selectedOption) =>
                  setSelectedCategory(selectedOption.value)
                }
                className="w-36 sm:w-44"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderWidth: "1px",
                    borderColor: state.isFocused
                      ? "rgb(59 130 246)"
                      : "rgb(209 213 219)",
                    padding: "6px",
                    width: "100%",
                    minWidth: "120px",
                    maxWidth: "500px",
                    boxShadow: state.isFocused
                      ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
                      : "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgb(209 213 219)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "rgb(59 130 246)"
                      : "white",
                    color: state.isSelected ? "white" : "black",
                    padding: "8px",
                    "&:hover": {
                      backgroundColor: "rgb(219 234 254)",
                      color: "black",
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "rgb(156 163 175)",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "rgb(31 41 55)",
                  }),
                }}
              />

              <Select
                options={priceOptions}
                onChange={(priceOption) => setSortOrder(priceOption.value)}
                className="sm:w-44"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderWidth: "1px",
                    borderColor: state.isFocused
                      ? "rgb(59 130 246)"
                      : "rgb(209 213 219)",
                    padding: "6px",
                    width: "100%",
                    minWidth: "100px",
                    maxWidth: "500px",
                    boxShadow: state.isFocused
                      ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
                      : "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgb(209 213 219)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "rgb(59 130 246)"
                      : "white",
                    color: state.isSelected ? "white" : "black",
                    padding: "8px",
                    "&:hover": {
                      backgroundColor: "rgb(219 234 254)",
                      color: "black",
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "rgb(156 163 175)",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "rgb(31 41 55)",
                  }),
                }}
              />
            </div>

            <button
              className="w-auto cursor-pointer p-2 rounded-lg  hover:scale-[102%] transition duration-300"
              onClick={() => setIsLiked(!isLiked)}
            >
              {!isLiked ? (
                <FaHeart className="text-red-400 size-8" />
              ) : (
                <FaRegHeart className="text-red-400 size-8" />
              )}
            </button>
          </div>
        </div>
        {filteredProducts.length === 0 ? (
          <ProductNotFound />
        ) : (
          <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* {!filteredProducts.length && (
          <div className="text-center text-gray-400 mt-8 animate-pulse">
            No products found matching your criteria
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
