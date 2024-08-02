"use client"
import Image from "next/image";
import { ChartNoAxesColumnIcon, Logs } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductItem = ({ product }) => {

  const { attributes } = product || {};
  const { title, category, description, banner, price } = attributes || {};
  const imageUrl = banner?.data?.attributes?.url;
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/product-details/${product.id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-gray-50 rounded-lg hover:shadow-lg hover:border border-teal-400 hover:bg-gray-100 cursor-pointer"
    >
      {imageUrl && (
        <Image
          className="rounded-t-lg h-[170px] object-cover w-[100%]"
          src={imageUrl}
          alt={title || "Product image"}
          width={400}
          height={350}
        />
      )}
      <div className="flex justify-between p-3">
        <div className="">
          <h2 className="text-[16px] font-bold">{title}</h2>
          <h3 className="text-gray-400 text-[14px] flex gap-2 items-center">
            <Logs className="w-4 h-4" />
            {category}
          </h3>
          <p className="text-gray-600 line-clamp-3">{description}</p>
        </div>
        <div className="text-right text-[14px] font-semibold h-4">
          ${price && price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
