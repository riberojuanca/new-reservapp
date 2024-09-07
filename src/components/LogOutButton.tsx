"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <button className="uppercase" onClick={handleClick}>
      <small className="bg-stone-800 flex items-center justify-center text-stone-400  rounded-sm font-bold p-2">
        Logout
      </small>
    </button>
  );
};

export default LogoutButton;
