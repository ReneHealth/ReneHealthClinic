import { NextResponse } from "next/server";

const WORDPRESS_URL = process.env.WP_URL;
const CONTACT_FORM_7_ID = process.env.CONTACT_FORM_7_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      service,
      dateTime,
      message,
    } = body;

    // Required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    // Check environment configuration
    if (!WORDPRESS_URL || !CONTACT_FORM_7_ID) {
      console.error(
        "Missing WORDPRESS_URL or CONTACT_FORM_7_ID environment variable."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Contact form is not configured correctly.",
        },
        { status: 500 }
      );
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone || "");
    formData.append("service", service || "");
    formData.append("dateTime", dateTime || "");
    formData.append("message", message);

    const cf7Url =
      `${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/` +
      `${CONTACT_FORM_7_ID}/feedback`;

    const response = await fetch(cf7Url, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    const result = await response.json();

    console.log("Contact Form 7 response:", result);

    if (!response.ok || result.status !== "mail_sent") {
      return NextResponse.json(
        {
          success: false,
          message:
            result.message ||
            "Unable to send your appointment request.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your appointment request has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact Form 7 submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your request. Please try again.",
      },
      { status: 500 }
    );
  }
}