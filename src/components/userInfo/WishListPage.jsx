import React from "react";

import { useNavigate } from "react-router-dom";

/* Context */
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/LikedContext";

/* Icons */
import CartIcon from "../icons/CartIcon";
import LikeIcon from "../icons/LikeIcon";

/* Buttons */
import Button from "../button/Button";

export default function WishList() {
  const { likedProducts, removeFromWishlist } = useWishlist();

  const { addToCart } = useCart();

  const nav = useNavigate();

  const handleProductClick = (productId) => {
    nav(`/product/${productId}`);
  };

  return (
    <div className="flex flex-wrap">
      <div className="flex flex-wrap gap-[60px] ml-[50px]">
        {likedProducts.map((product) => (
          <div key={product?.likedProduct.id} className="relative">
            <div>
              <button
                className="absolute m-3 cursor-pointer left-[150px]"
                onClick={() => removeFromWishlist(product.id)}
              >
                <LikeIcon color="red" />
              </button>
            </div>

            <div className="flex flex-col gap-3 cursor-pointer bg-white">
              <div onClick={() => handleProductClick(product.likedProduct.id)}>
                <img
                  src={product?.likedProduct.image}
                  className="h-[150px]"
                  alt={product?.likedProduct.title}
                />

                <div className="flex flex-col">
                  <div className="font-bold text-lg">
                    {product?.likedProduct.salePrice ? (
                      <div className="flex items-center">
                        <span className="text-red-500">
                          {product?.likedProduct.salePrice}₾
                        </span>

                        <span className="line-through text-[13px] ml-[10px]">
                          {product?.likedProduct.price} ₾
                        </span>
                      </div>
                    ) : (
                      <span>{product?.likedProduct.price}₾</span>
                    )}
                  </div>

                  <h3 className="line-clamp-1">
                    {product?.likedProduct.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-row">
                <Button
                  className="bg-orange text-black text-[12px]"
                  icon={<CartIcon width="20px" height="20px" />}
                  onClick={() => addToCart(product.likedProduct)}
                  children={"დამატება"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
