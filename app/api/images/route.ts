"use server";

import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const filePath = url.searchParams.get("filePath");

  if (!filePath) {
    return new NextResponse("filePath query parameter is required", { status: 400 });
  }

  const imagePath = path.join(process.cwd(), "client", "images", filePath);

  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageType = path.extname(imagePath).slice(1);
    const headers = new Headers();
    headers.set("Content-Type", `image/${imageType}`);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return new NextResponse(imageBuffer, {
      status: 200,
      headers,
    });
  } else {
    return new NextResponse("Image not found", { status: 404 });
  }
}
