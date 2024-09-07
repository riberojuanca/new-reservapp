import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const image = data.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Usa el nombre del archivo codificado
    const fileName = encodeURIComponent(image.name);
    const filePath = path.join(process.cwd(), "public", fileName);

    // Asegúrate de que el directorio exista
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await writeFile(filePath, buffer);

    // Genera la URL pública basada en la estructura de la carpeta 'public'
    const publicUrl = `http://localhost:3000/${fileName}`;

    return NextResponse.json({ filePath: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Error handling image upload", error);
    return NextResponse.json(
      { error: "Error handling image upload" },
      { status: 500 }
    );
  }
}
