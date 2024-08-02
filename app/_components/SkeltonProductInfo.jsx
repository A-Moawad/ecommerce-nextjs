import React from "react";

const SkeletonProductInfo = () => {
  const skeletonClasses = "h-[20px] bg-slate-200 animate-pulse";

  return (
    <div className="flex flex-col gap-5">
      <div className={`${skeletonClasses} w-[400px]`} />
      <div className={`${skeletonClasses} w-[70px]`} />
      <div className={`${skeletonClasses} w-[400px]`} />
      <div className={`${skeletonClasses} w-[400px]`} />
      <div className={`${skeletonClasses} w-[400px]`} />
      <div className={`${skeletonClasses} w-[100px]`} />
    </div>
  );
};

export default SkeletonProductInfo;
