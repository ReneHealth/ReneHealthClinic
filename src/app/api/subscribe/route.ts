import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !serverPrefix || !audienceId) {
      console.error("Missing Mailchimp environment variables.");

      return NextResponse.json(
        { error: "Newsletter service is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email.trim().toLowerCase(),
          status: "subscribed",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Mailchimp API error:", data);

      return NextResponse.json(
        {
          error:
            data.title === "Member Exists"
              ? "This email is already subscribed."
              : data.detail || "Unable to subscribe. Please try again.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! You've been added to our mailing list.",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}