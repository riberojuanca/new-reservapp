// components/LoginFormServer.tsx
import { signIn } from "@/auth";

export default function LoginFormServer() {
  return (
    <>
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
      <form
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "/dashboard",
          });
        }}
      >
        <button type="submit">Iniciar con Google</button>
      </form>
    </>
  );
}
