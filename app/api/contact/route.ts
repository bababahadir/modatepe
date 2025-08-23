import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }); // 15 dk
    return true;
  }

  if (limit.count >= 5) {
    // 15 dk içinde max 5 istek
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // 🔑 Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 📩 Mail gönderme
    await transporter.sendMail({
      from: `"${validatedData.name}" <${validatedData.email}>`,
      to: process.env.GMAIL_USER, // mesaj sana gelsin
      subject: "Yeni İletişim Formu Mesajı",
      text: `
Ad Soyad: ${validatedData.name}
E-posta: ${validatedData.email}
Telefon: ${validatedData.phone}

Mesaj:
${validatedData.message}
      `,
    });

    return NextResponse.json(
      { message: "Mesajınız başarıyla gönderildi ✅" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Form verilerinde hata var. Lütfen kontrol ediniz." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Mesaj gönderilirken bir hata oluştu ❌" },
      { status: 500 }
    );
  }
}