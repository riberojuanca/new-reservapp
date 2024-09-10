"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <button
      className="bg-transparent backdrop-blur-md  uppercase"
      onClick={handleClick}
    >
      <small className="flex items-center justify-center text-stone-400 hover:text-white  rounded-sm font-bold py-2">
        Logout
      </small>
    </button>
  );
};

export default LogoutButton;
