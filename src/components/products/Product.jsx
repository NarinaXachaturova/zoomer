import React from "react";

import { useNavigate } from "react-router-dom";

/* Button */
import Button from "../button/Button";

/* Icons */
import CartIcon from "../icons/CartIcon";
import LikeIcon from "../icons/LikeIcon";

/* Context */
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/LikedContext";

const Product = ({ product }) => {
  const { addToWishlist, likedProducts, removeFromWishlist } = useWishlist();

  const isProductLiked = likedProducts.some(
    (likedProduct) => likedProduct.likedProduct.id === product.id
  );

  const { addToCart } = useCart();

  const nav = useNavigate();

  const handleProductClick = (productId) => {
    nav(`/product/${productId}`);
  };

  return (
    <div className="relative bg-white cursor-pointer h-80 w-50">
      <div
        className="absolute top-0 right-0 m-2"
        onClick={() =>
          isProductLiked
            ? removeFromWishlist(likedProducts[0].id)
            : addToWishlist(product)
        }
      >
        <LikeIcon color={isProductLiked ? "red" : "grey"} />
      </div>

      <div onClick={() => handleProductClick(product.id)}>
        <img
          src={product?.image}
          className="w-full h-40 object-contain"
          alt={product?.title}
        />
        <div className="flex flex-col justify-start">
          <div className="font-bold text-[17px]">
            {product?.salePrice ? (
              <div className="flex gap-2 items-center">
                <span className="text-red-500">{product?.salePrice}₾</span>
                <span className="line-through text-sm ">
                  {product?.price} ₾
                </span>
              </div>
            ) : (
              <span>{product?.price}₾</span>
            )}
          </div>
          <h1 className="line-clamp-1 w-[130px]">{product?.title}</h1>
        </div>
      </div>

      <Button
        className="bg-orange text-black rounded-[5px] text-[13px]"
        icon={<CartIcon width="20px" height="20px" />}
        onClick={() => addToCart(product)}
        children={"დამატება"}
      />
    </div>
  );
};

export default Product;
