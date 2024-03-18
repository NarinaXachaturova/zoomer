import React, { useState, useEffect } from "react";

/* Services */
import { getProducts } from "../../services/services";

/* Slider */
import Slider from "../slider/DefaultSlider";

const Products = () => {
  const [laptops, setLaptops] = useState([]);

  const [smartPhones, setSmartPhones] = useState([]);

  const [saleProducts, setSaleProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const saleProductsResponse = await getProducts({ onlySales: true });
      if (saleProductsResponse.data.products) {
        setSaleProducts(saleProductsResponse.data.products);
      }

      const smartPhones = await getProducts({
        categoryName: "სმარტფონები",
      });
      if (smartPhones.data.products) {
        setSmartPhones(smartPhones.data.products);
      }

      const laptops = await getProducts({
        categoryName: "ლეპტოპები",
      });
      if (laptops.data.products) {
        setLaptops(laptops.data.products);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Slider title="ლეპტოპები" products={laptops} />

          <Slider title="სმარტფონები" products={smartPhones} />

          <Slider title="ფასდაკლებული პროდუქტები" products={saleProducts} />
        </>
      )}
    </div>
  );
};

export default Products;
