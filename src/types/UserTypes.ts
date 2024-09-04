export interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string; // Ajusta este tipo según tu modelo Prisma
  createdAt: Date;
  updatedAt: Date;
}
