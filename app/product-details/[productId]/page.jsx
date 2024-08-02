"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Logs } from "lucide-react";
import ProductApis from "../../_utils/ProductApis";
import BreadCrumb from "../../_components/BreadCrumb";
import ProductItem from "../../_components/ProductItem";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductsList from "../../_components/ProductsList";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [error, setError] = useState(null);

  // define properties
  const { attributes } = product || {};
  const { title, category, banner } = attributes || {};
  const imageUrl = banner?.data?.attributes?.url;

  // useEffect
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await ProductApis.getProductById(params?.productId);
        setProduct(res.data.data);
      } catch (error) {
        setError("Failed to fetch product details");
      }
    };

    fetchProductById();
  }, [params.productId]);

  useEffect(() => {
    if (category) {
      const fetchProductsByCategory = async () => {
        try {
          const res = await ProductApis.getProductsByCategory(category);
          setProductsByCategory(res.data.data);
          console.log(res.data.data);
        } catch (error) {
          console.error("Failed to fetch products by category", error);
        }
      };

      fetchProductsByCategory();
    }
  }, [category]);

  return (
    <div className="py-10 px-10">
      <BreadCrumb />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProductBanner imageUrl={imageUrl} title={title} />
        <ProductInfo product={product} />
      </div>
      <div className="mt-10">
        <h2 className="text-3xl mb-5">Related Products</h2>
        <ProductsList productList={productsByCategory} />
      </div>
    </div>
  );
};

export default ProductDetails;
