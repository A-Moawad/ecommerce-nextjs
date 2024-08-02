"use client";
import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import CartContext from "../_context/CartContext";
import CartApis from "../_utils/CartApis";

const Header = () => {
  const { cart, setCart } = useContext(CartContext);
  const { isSignedIn, user, isLoaded } = useUser();
  const pathname = usePathname();
  console.log("cart items", cart);

  useEffect(() => {
    if (isSignedIn && user && user.primaryEmailAddress) {
      const fetchCartItems = async () => {
        try {
          const res = await CartApis.getUserCartItems(
            user.primaryEmailAddress.emailAddress
          );
          // console.log(res.data.data);
          const data = res.data.data;
          // setCart(res.data.data);
          data.forEach((item) => {
            setCart((oldCart) => [
              ...oldCart,
              { id: item.id, product: item?.attributes?.products?.data[0] },
            ]);
          });
        } catch (err) {
          console.error("Failed to fetch cart items", err);
        }
      };
      fetchCartItems();
    }
  }, [isSignedIn, user, setCart]);

  return (
    <div>
      {!(pathname.includes("sign-in") || pathname.includes("sign-up")) && (
        <header className="bg-white shadow-md">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                className="flex-1 md:flex md:items-center md:gap-12"
                href="/"
              >
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                  priority={true}
                />
              </Link>

              <div className="md:flex md:items-center md:gap-12">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        Home
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/product-details"
                      >
                        Explore
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        Projects
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="flex items-center gap-4">
                  {user ? (
                    <div className="flex items-center gap-5 ">
                      <h2 className="flex gap-1 items-center">
                        <Link href="/cart">
                          <ShoppingCart className="cursor-pointer hover:bg-gray-100 rounded-lg p-1 w-8 h-8" />
                        </Link>
                        <p className="text-lg font-semibold">({cart.length})</p>
                      </h2>
                      <UserButton />
                    </div>
                  ) : (
                    <div className="sm:flex sm:gap-4">
                      <a
                        className="rounded-md bg-primary hover:bg-secondary px-5 py-2.5 text-sm font-medium text-white shadow"
                        href="/sign-in"
                      >
                        Login
                      </a>

                      <div className="hidden sm:flex">
                        <a
                          className="rounded-md bg-gray-100 hover:bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-600"
                          href="/sign-up"
                        >
                          Register
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
