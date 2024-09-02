"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutButton;
