import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, getProducts } from "../services/services";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/LikedContext";
import LikeIcon from "../components/icons/LikeIcon";
import CartIcon from "../components/icons/CartIcon";
import SimilarProductsSlider from "../components/slider/SimilarProducts";
import Button from "../components/button/Button";
import Breadcrumb from "../components/breadcrumb/Index";

export default function ProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, likedProducts, removeFromWishlist } = useWishlist();
  const nav = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const isAuthenticated = localStorage.getItem("accessToken");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchData = async (productId) => {
    try {
      const response = await getProduct(productId);
      setProductData(response.data);
      setCategoryName(response.data.category_name);

      const similarResponse = await getProducts({
        categoryName: response.data.category_name,
      });

      const filteredSimilarProducts = similarResponse.data.products.filter(
        (product) => product.id !== productId
      );
      setSimilarProducts(filteredSimilarProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData(productId);
  }, [productId]);

  const isProductLiked = likedProducts.some(
    (likedProduct) => likedProduct.likedProduct.id === productId
  );

  const handlePurchase = async () => {
    try {
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      nav(`/payment`, { state: { productData } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = () => {
    try {
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      addToCart(productData);
    } catch (error) {
      console.error(error);
    }
  };

  const breadcrumbs = [
    { label: "მთავარი", path: "/" },
    {
      label: categoryName ? categoryName : "product category",
      path: `/products?categoryName=${categoryName}`,
    },
    { label: productData?.title || "Product title" },
  ];

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row items-center mb-[100px]">
        <div className="lg:w-[50%] mb-8 lg:mb-0">
          <div className="bread-crumb">
            <nav className="w-full pb-2 mb-4 lg:mb-6 ">
              <ul className="flex flex-row">
                {breadcrumbs.map((breadcrumb, index) => (
                  <Breadcrumb
                    key={index}
                    label={breadcrumb.label}
                    path={breadcrumb.path}
                    isLast={index === breadcrumbs.length - 1}
                  />
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col items-center lg:items-start relative">
            <p
              className={`text-lg font-bold mb-4 lg:mb-6 text-center lg:text-left`}
            >
              {productData ? productData.title : ""}
            </p>

            <img
              src={productData?.image}
              alt={productData?.title || "Product"}
              className="h-[300px] lg:h-[400px] mb-4 lg:mb-6"
            />

            <div
              className="absolute right-0 top-0 m-2 lg:m-0"
              onClick={() =>
                isProductLiked
                  ? removeFromWishlist(likedProducts[0].id)
                  : addToWishlist(productData)
              }
            >
              <LikeIcon color={isProductLiked ? "red" : "grey"} />
            </div>

            <div
              className={`w-full lg:w-[300px] mb-4 lg:mb-0 text-center lg:text-left`}
            >
              <p>{productData ? productData.description : ""}</p>
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] flex flex-col justify-center items-center lg:items-start gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h1 className="text-red-500 font-bold text-center lg:text-left">
              Product Price
            </h1>
            {productData?.salePrice ? (
              <div className="flex gap-2 items-center">
                <span className="text-red-500">{productData?.salePrice}₾</span>
                <span className="line-through text-base">
                  {productData?.price} ₾
                </span>
              </div>
            ) : (
              <span>{productData?.price}₾</span>
            )}
          </div>

          <div className="flex flex-col gap-4 items-center lg:items-start">
            <Button
              children={"შეძენა"}
              className="bg-primary text-sm lg:text-base px-8 py-2 w-[300px]"
              onClick={handlePurchase}
            />

            <Button
              children={"დამატება"}
              className={`bg-orange text-sm lg:text-base px-8 py-2 w-[300px]`}
              icon={<CartIcon width="20px" height="20px" />}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-[50px]">
          <h1 className="mb-[30px] text-[20px]">მსგავსი პროდუქტები</h1>
          <div className="similar-products">
            <SimilarProductsSlider similarProducts={similarProducts} />
          </div>
        </div>
      )}
      {showLoginModal && (
        <LoginModal
          showModal={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
