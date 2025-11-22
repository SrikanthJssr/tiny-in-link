import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    // ✅ Unwrap params (Next.js 16 passes it as a Promise)
    const { code } = await context.params;

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    // ✅ Fetch link details
    const result = await query(
      "SELECT * FROM links WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const link = result.rows[0];

    // ✅ Update click count & last clicked
    await query(
      "UPDATE links SET click_count = click_count + 1, last_clicked = NOW() WHERE code = $1",
      [code]
    );

    // ✅ Redirect to the full target URL
    return NextResponse.redirect(link.target_url);

  } catch (err) {
    console.error("REDIRECT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
