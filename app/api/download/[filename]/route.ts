import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import path from "node:path";
import fs from "node:fs";

interface RequestParams {
  filename: string;
}

export async function GET(request: NextRequest, params: RequestParams) {
  const { filename } = params;

  // Get user from request

  // Return object as base64 or similar

  const filePath = path.join(process.cwd(), "client", "documents", filename);
}
