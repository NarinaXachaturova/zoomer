import React from "react";

import { useLocation } from "react-router-dom";

import PaymentForm from "../components/payment/PaymentForm";

export default function PaymentPage() {
  const location = useLocation();
  const productData = location.state ? location.state.productData : null;
  const { totalPrice, totalItems } = calculateTotal(productData);

  function calculateTotal(productData) {
    let totalPrice = 0;
    let totalItems = 0;

    if (productData?.id) {
      totalPrice = productData.salePrice
        ? productData.salePrice
        : productData.price;
      totalItems = 1;

      return { totalPrice, totalItems };
    } else if (productData) {
      const { totalPrice, totalItems } = productData;
      return { totalPrice, totalItems };
    } else {
      return { totalPrice, totalItems };
    }
  }

  return (
    <div>
      <PaymentForm
        paymentParams={{
          totalItems: productData ? totalItems : productData?.totalItems,
          totalPrice: productData ? totalPrice : productData?.totalPrice,
        }}
      />
    </div>
  );
}
