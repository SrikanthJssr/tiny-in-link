import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// =========================
// GET SINGLE LINK STATS
// =========================
export async function GET(req, context) {
  try {
    const params = await context.params;   // FIXED
    const code = params.code;

    const result = await query(
      "SELECT * FROM links WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ link: result.rows[0] }, { status: 200 });

  } catch (error) {
    console.error("GET /api/links/:code error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// =========================
// DELETE LINK
// =========================
export async function DELETE(req, context) {
  try {
    const params = await context.params;   // FIXED
    const code = params.code;

    const result = await query(
      "DELETE FROM links WHERE code = $1 RETURNING *",
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Link deleted" }, { status: 200 });

  } catch (error) {
    console.error("DELETE /api/links/:code error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
