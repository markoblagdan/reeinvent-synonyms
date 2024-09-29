import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "synonyms.csv");

  let data;

  try {
    data = await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error("Error reading synonyms file:", error);
    return;
  }

  console.log(data.slice(0, 100));

  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
