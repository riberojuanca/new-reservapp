import { auth } from "@/auth";
import LogoutButton from "@/components/LogOutButton";
import Image from "next/image";

async function dashboard() {
  const session = await auth();
  console.log(session?.user);
  if (!session) {
    return <div>No estas logueado</div>;
  }
  return (
    <article className="p-4 ">
      <div className="flex items-center gap-1 ">
        <div className="w-fit p-1">
          <LogoutButton />
        </div>
        <Image
          className="w-20 h-20 object-cover rounded-md"
          width={400}
          height={400}
          src={session.user.image || "/default-image-user.png"}
          alt=""
        ></Image>
        <div>
          <h1 className="px-1">Hola, {session.user.name} 👋🏽</h1>
        </div>
      </div>
    </article>
  );
}

export default dashboard;
