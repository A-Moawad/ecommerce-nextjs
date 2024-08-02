"use client";
import { useState, useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../../_utils/CartApis";
import CartContext from "../../../_context/CartContext";

const AddToCartBtn = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/sign-in");
    } else {
      setLoading(true);
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
      console.log("Data being sent to API:", data);
      try {
        const res = await CartApis.addToCart(data);
        console.log("Cart added successfully", res);

        // Update the cart state with the new product
        setCart((prevCart) => [
          ...prevCart,
          { id: res?.data?.id, product: product },
        ]);

        alert("Product added to cart successfully!");
      } catch (error) {
        console.error("Failed to add product to cart", error.response);
        if (error.response) {
          console.log("Error response data:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-primary px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      disabled={loading}
    >
      <ShoppingCart />
      <span className="text-sm font-medium">
        {loading ? "Adding..." : "Add To Cart"}
      </span>
    </button>
  );
};

export default AddToCartBtn;
