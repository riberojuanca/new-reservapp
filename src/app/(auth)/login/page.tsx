import LoginForm from "@/components/loginForm";
import { auth, signIn, signOut } from "@/auth";
import LogoutButton from "@/components/LogOutButton";
import Image from "next/image";

async function loginPage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <article>
        <div>loginPage</div>
        <LoginForm />
        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <button type="submit">Iniciar con Github</button>
        </form>
      </article>
    );
  }
  console.log(session);
  return (
    <div>
      <LogoutButton />
      <p>{session.user.name}</p>
      <img src={session.user.image as string} alt="user image" />
    </div>
  );
}

export default loginPage;
