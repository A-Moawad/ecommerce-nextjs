import Image from "next/image";

const ProductBanner = ({ imageUrl, title }) => {
  return (
    <div className="flex-1 hover:shadow-md rounded-lg">
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
        {imageUrl ? (
          <Image
            className="object-cover rounded-lg hover:shadow-md hover:border border-teal-400 cursor-pointer"
            src={imageUrl}
            alt={title}
            layout="fill"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default ProductBanner;
