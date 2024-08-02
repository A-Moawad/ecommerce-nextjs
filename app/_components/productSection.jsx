"use client";
import { useEffect, useState } from "react";
import ProductApis from "../_utils/ProductApis";
import ProductsList from "./ProductsList";

const ProductSection = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getLatestProducts = async () => {
      try {
        const res = await ProductApis.getLatestProducts();
        console.log(res.data.data);
        setProductList(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch latest products", error);
        setProductList([]);
      }
    };

    getLatestProducts();
  }, []);

  return (
    <div className="px-10 md:px-20 pt-10">
      <h1 className="text-4xl text-center pb-10">Our Latest Products</h1>
      <ProductsList productList={productList} />
    </div>
  );
};

export default ProductSection;
