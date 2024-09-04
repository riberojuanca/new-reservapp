import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await prisma.user.deleteMany({});
    return NextResponse.json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json(
      { error: "Failed to delete users" },
      { status: 500 }
    );
  }
}
