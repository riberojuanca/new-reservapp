import LoginForm from "@/components/loginForm";
import { auth, signIn } from "@/auth";
import LogoutButton from "@/components/LogOutButton";
import Image from "next/image";
import Link from "next/link";
import LoginFormServer from "@/components/LoginFormServer";

async function loginPage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <article>
        <div>loginPage</div>
        <LoginForm />
        <LoginFormServer />
      </article>
    );
  }
  console.log(session);
  return (
    <main className=" w-fit h-screen flex flex-col justify-center items-start min-h-fit mx-auto gap-2">
      <div className="flex items-center gap-2">
        <Image
          className="w-20 h-20 object-cover rounded-md"
          width={400}
          height={400}
          src={(session.user.image as string) || "/default-image-user.png"}
          alt="user image"
        />
        <div className="flex flex-col ">
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
      </div>
      <div className="w-full flex gap-2">
        <Link
          className="w-full bg-orange-600 flex items-center justify-center text-stone-600 uppercase rounded-sm font-bold p-1"
          href={"/dashboard"}
        >
          Ir al dashboard
        </Link>
        <div className="w-fit">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}

export default loginPage;
