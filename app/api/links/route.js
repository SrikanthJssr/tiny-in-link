import { query } from "@/lib/db";
import { isValidUrl, generateCode } from "@/lib/utils";

// =========================
// CREATE LINK (POST)
// =========================
export async function POST(req) {
  try {
    const body = await req.json();
    const { target_url, custom_code } = body;

    // 1. Validate URL
    if (!target_url || !isValidUrl(target_url)) {
      return Response.json({ error: "Invalid URL" }, { status: 400 });
    }

    // 2. Final code (custom or generated)
    let code = custom_code?.trim();

    if (code) {
      // Check for duplicate custom code
      const exists = await query("SELECT code FROM links WHERE code = $1", [code]);
      if (exists.rows.length > 0) {
        return Response.json({ error: "Custom code already exists" }, { status: 409 });
      }
    } else {
      // Generate random 6-character code
      code = generateCode(6);
    }

    // 3. Insert into DB
    const result = await query(
      `INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *`,
      [code, target_url]
    );

    // 4. Build short URL
    const shortUrl = `${process.env.BASE_URL}/${code}`;

    return Response.json(
      { message: "Link created", link: result.rows[0], shortUrl },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/links error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}



// =========================
// LIST ALL LINKS (GET)
// =========================
export async function GET() {
  try {
    const result = await query(
      "SELECT * FROM links ORDER BY created_at DESC"
    );

    return Response.json(
      { links: result.rows },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET /api/links error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
