"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Footer() {
  const { user } = useUser;
  return (
    user && (
      <div>
        <h3>Footer</h3>
      </div>
    )
  );
}

export default Footer;
