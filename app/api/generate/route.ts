import { generateVehicleImage } from "@/lib/replicate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await generateVehicleImage({
      imageUrl: body.imageUrl,
      studioPrompt: body.studioPrompt,
      logoUrl: body.logoUrl,
      withCleanup: body.withCleanup,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Erreur de génération IA", details: String(error) },
      { status: 500 },
    );
  }
}
