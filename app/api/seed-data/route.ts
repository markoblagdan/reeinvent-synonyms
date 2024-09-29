import { globalRef } from "@/app/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    globalRef.synonymsRepository.seedSynonyms();
  } catch (error) {
    console.error("Error seeding synonyms data:", error);
    return NextResponse.json(
      { message: "Error seeding synonyms data" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Synonyms data seeded" },
    { status: 200 }
  );
}
