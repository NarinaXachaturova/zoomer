import React from "react";

import { useNavigate } from "react-router-dom";

/* Services */
import {
  addCartProducts,
  removeCartProducts,
  purchaseProducts,
} from "../services/services";

/* Context */
import { useCart } from "../context/CartContext";

/* Icons */
import TrashIcon from "../components/icons/TrashIcon";

/* Button */
import Button from "../components/button/Button";

export default function Cart() {
  const { cartProducts, setCartProducts, removeFromCart } = useCart();

  const nav = useNavigate();

  const calculateTotalPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.cartProduct.price * product.count,
      0
    );
  };

  const increaseCount = async (productId) => {
    addCartProducts({ product_id: productId })
      .then(() => {
        const updatedData = cartProducts.map((item) =>
          item.cartProduct.id === productId
            ? { ...item, count: item.count + 1 }
            : item
        );
        setCartProducts(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const decreaseQuantity = async (productId) => {
    removeCartProducts(productId, false)
      .then(() => {
        const updatedData = cartProducts.map((item) =>
          item.id === productId
            ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
            : item
        );

        setCartProducts(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePurchase = async () => {
    try {
      const response = await purchaseProducts({
        totalPrice: calculateTotalPrice(),
        totalItems: cartProducts.reduce((total, item) => total + item.count, 0),
      });

      nav("/payment");
    } catch (error) {
      console.error(error);
    }
  };

  const productItemActions = (product) => (
    <>
      <div className="flex justify-around items-center bg-primary text-white w-[110px] h-[29px] rounded-[50px] text-[12px] font-bold">
        <div className="flex gap-3 items-center">
          <div className="bg-orange-600 text-white flex justify-around items-center text-[12px] font-bold w-[100px] h-[30px] rounded-[30px]">
            <button
              onClick={() => decreaseQuantity(product.id)}
              disabled={product.count <= 1}
              className={`${product.count <= 1 && "opacity-50"}`}
            >
              -
            </button>
            <span>{product.count}</span>
            <button onClick={() => increaseCount(product.cartProduct.id)}>
              +
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => removeFromCart(product.id, true)}>
        <TrashIcon />
      </button>
    </>
  );

  return (
    <div className="container pt-[50px] pb-[400px]">
      <div className="pb-[20px] border-b-2">
        <p className="font-bold text-[28px] leading-7">
          შენს კალათაში{" "}
          {cartProducts.reduce((total, item) => total + item.count, 0)} ნივთია
        </p>
      </div>
      <div className="flex flex-col gap-y-[20px]">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div
              key={product?.cartProduct.id}
              className="bg-light-grey p-[12px] rounded-[12px] flex flex-col md:flex-row justify-between items-center md:items-start"
            >
              <div className="flex gap-2">
                <img
                  src={product?.cartProduct.image}
                  alt={product?.cartProduct.title}
                  className="w-[100px] h-[100px] rounded-[12px]"
                />
                <h1 className="font-bold mt-[10px]">
                  {product?.cartProduct.title}
                </h1>
              </div>
              <div className="flex gap-3 items-center mt-2 md:mt-0">
                {productItemActions(product)}
              </div>
            </div>
          ))
        ) : (
          <p>Empty Cart</p>
        )}
      </div>
      <div className="p-[20px] mt-5 w-full md:w-[450px] bg-light-grey flex justify-center flex-col gap-y-[25px] rounded-[12px]">
        <div className="flex justify-between items-center">
          <h2 className="text-black text-[18px] font-bold">
            გადასახდელი თანხა
          </h2>
          <span className="font-bold text-[18px]">
            {calculateTotalPrice().toFixed(2)}₾
          </span>
        </div>
        <div>
          <Button
            className="bg-primary text-white w-full"
            children={"ყიდვა"}
            onClick={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}
