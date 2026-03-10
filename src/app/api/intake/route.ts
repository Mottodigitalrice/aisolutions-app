import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { z } from "zod";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const intakeSchema = z.object({
  businessName: z.string().min(1),
  businessType: z.string().min(1),
  currentWebsite: z.string().optional(),
  instagram: z.string().optional(),
  referenceSites: z.string().optional(),
  description: z.string().optional(),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});

// CORS headers for cross-origin requests (e.g., from static aisolutions.jp page)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = intakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "入力内容に不備があります。", details: parsed.error.flatten() },
        { status: 400, headers: corsHeaders }
      );
    }

    const data = parsed.data;

    // Create inbound request in Convex
    if (convexUrl) {
      const client = new ConvexHttpClient(convexUrl);
      await client.mutation(api.functions.inboundRequests.create, {
        businessName: data.businessName,
        businessType: data.businessType,
        currentWebsite: data.currentWebsite || undefined,
        instagram: data.instagram || undefined,
        referenceSites: data.referenceSites || undefined,
        description: data.description || undefined,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || undefined,
      });
    }

    // Also forward to n8n webhook for notification pipeline
    try {
      await fetch("https://n8n.mottodigital.jp/webhook/aisolutions-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Non-blocking — webhook failure should not block the user
    }

    return NextResponse.json(
      { success: true, message: "リクエストを受け付けました。" },
      { headers: corsHeaders }
    );
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500, headers: corsHeaders }
    );
  }
}
