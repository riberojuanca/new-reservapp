import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogOutButton";

const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="z-10 bg-transparent backdrop-blur-md  w-full h-16 fixed top-0 flex items-center justify-between p-6">
      <div className="flex items-center justify-center">
        <div className="text-4xl">🦧</div>
        <h1 className="uppercase font-bold px-2">Reservapp</h1>
      </div>
      {session ? (
        <div className="flex gap-2 justify-center items-center">
          <div>
            <h1 className="px-1">Hola, {session.user.name} 👋🏽</h1>
          </div>
          <Image
            className="w-12 h-12 object-cover rounded-md"
            width={400}
            height={400}
            src={session.user.image || "/default-image-user.png"}
            alt=""
          ></Image>
          <div className="w-fit p-1">
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href={"/login"}>
            <button>Login</button>
          </Link>
          <Link href={"/register"}>
            <button>Register</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
