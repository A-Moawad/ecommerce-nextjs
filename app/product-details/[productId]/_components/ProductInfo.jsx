import Link from "next/link";
import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import { AlertOctagon, BadgeCheck } from "lucide-react";
import SkeletonProductInfo from "../../../_components/SkeltonProductInfo";

const ProductInfo = ({ product }) => {
  const { attributes } = product || {};
  const { title, category, description, price, instantDelivery } =
    attributes || {};
  console.log("product: " + product);

  return (
    <div>
      {product?.id ? (
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-400 mb-2 text-sm">Category: {category}</p>
          <p className="text-gray-500 mb-2">{description}</p>
          <div className="text-gray-500 py-1">
            {instantDelivery ? (
              <div className="flex gap-2">
                <BadgeCheck className="text-secondary" />
                <p>Eligible for instant delivery</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <AlertOctagon className="text-red-500" />
                <p>Not eligible for instant delivery</p>
              </div>
            )}
          </div>
          <p className="text-secondary mb-4 text-xl font-bold">
            Price: ${price}
          </p>
          <AddToCartBtn product={product} />
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};

export default ProductInfo;
