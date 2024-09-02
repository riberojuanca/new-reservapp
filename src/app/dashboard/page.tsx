import { auth } from "@/auth";
import LogoutButton from "@/components/LogOutButton";
import prisma from "@/lib/db";

async function dashboard() {
  const session = await auth();
  if (!session) {
    return <div>No estas logueado</div>;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      <div>
        <h1>Hola, {user.name} 👋🏽</h1>
      </div>
      <LogoutButton />
    </div>
  );
}

export default dashboard;
