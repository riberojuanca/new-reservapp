import React from "react";
import prisma from "@/lib/db";
import DeleteDataButton from "@/components/DeleteDataButton";

export default async function GetUsers() {
  const users = prisma.user.findMany();
  const user = (await users).map((user) => {
    <p>{user.name}</p>;
  });
  return (
    <div>
      {(await users).map((user) => (
        <div key={user.id}>
          <p>
            {user.name} * {user.username} * {user.email} *{" "}
          </p>
        </div>
      ))}
      <DeleteDataButton />
    </div>
  );
}
