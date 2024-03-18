import React, { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  getCartProducts,
  addCartProducts,
  removeCartProducts,
} from "../services/services";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartItems = () => {
    setLoading(true);

    getCartProducts()
      .then((response) => {
        setCartProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = (product) => {
    setLoading(true);

    addCartProducts({ product_id: product.id })
      .then(() => {
        toast.success("პროდუქტი დაემატა კალათაში", {
          position: "top-right",
        });
        fetchCartItems();
      })
      .catch((error) => {
        setError(error);
        toast.error("მოხდა შეცდომა", {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeFromCart = (productId, removeAll) => {
    setLoading(true);

    removeCartProducts(productId, removeAll)
      .then(() => {
        setCartProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        toast.success("პროდუქტი წარმატებით წაიშალა", {
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error("მოხდა შეცდომა", {
          position: "top-right",
        });
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        fetchCartItems,
        addToCart,
        removeFromCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
