"use client";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import CartApis from "../_utils/CartApis";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { isSignedIn, user, isLoaded } = useUser();
  const [quantities, setQuantities] = useState({});

  const router = useRouter();

  console.log("Cart", cart);

  useEffect(() => {
    if (isSignedIn && user && user.primaryEmailAddress) {
      const fetchCartItems = async () => {
        try {
          const res = await CartApis.getUserCartItems(
            user.primaryEmailAddress.emailAddress
          );
          const data = res.data.data;
          const formattedData = data.map((item) => ({
            id: item.id,
            product: item.attributes.products.data[0],
            quantity: 1, // Default quantity
          }));
          setCart(formattedData);
          const initialQuantities = formattedData.reduce((acc, item) => {
            acc[item.id] = 1; // Default quantity
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } catch (err) {
          console.error("Failed to fetch cart items", err);
        }
      };
      fetchCartItems();
    }
  }, [isSignedIn, user, setCart]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    CartApis.deleteCartItem(id);
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  const increaseQuantity = (id) => {
    setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  };

  const decreaseQuantity = (id) => {
    setQuantities({
      ...quantities,
      [id]: Math.max(1, quantities[id] - 1),
    });
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total + item.product.attributes.price * quantities[item.id],
      0
    );
  };

  const handleCheckout = () => {
    const totalPrice = getTotalPrice();
    router.push(`/checkout?amount=${totalPrice}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col justify-between p-4 border rounded shadow-sm"
              >
                <div className="flex flex-col items-center gap-5">
                  <img
                    src={
                      item.product?.attributes?.banner?.data?.attributes?.url
                    }
                    alt={item.product.attributes.title}
                    className="w-[100%] h-[100%] object-cover rounded m-auto"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.product.attributes.title}
                    </h2>
                    <p className="text-gray-600">
                      {item.product.attributes.description}
                    </p>
                    <p className="text-gray-800 font-bold">
                      Price: ${item.product.attributes.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
                    >
                      -
                    </button>
                    <span>{quantities[item.id]}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">Total: ${getTotalPrice()}</h2>
          <button
            className="w-[100%] my-5 px-4 py-2  bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
          <p className="text-center text-gray-600 mb-5">
            Note: All courses will be sent via email
          </p>
        </>
      ) : (
        <p className="text-gray-600 text-sm">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
