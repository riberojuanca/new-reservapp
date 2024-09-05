import { auth } from "@/auth";
import LogoutButton from "@/components/LogOutButton";
import prisma from "@/lib/db";
import Image from "next/image";

async function dashboard() {
  const session = await auth();
  console.log(session?.user);
  if (!session) {
    return <div>No estas logueado</div>;
  }
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session.user.email,
  //   },
  // });
  // if (!user) return <div>No estas logueado</div>;

  return (
    <article className="p-4">
      {session.user.image !== null ? (
        <div className="flex items-center gap-4">
          <img
            className="w-20 h-20 rounded-md"
            src={`${session.user.image}`}
            alt=""
          ></img>
          <div>
            <h1>Hola, {session.user.name} 👋🏽</h1>
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div>
            <h1>Hola, {session.user.name} 👋🏽</h1>
            <LogoutButton />
          </div>
        </div>
      )}
    </article>
  );
}

export default dashboard;
