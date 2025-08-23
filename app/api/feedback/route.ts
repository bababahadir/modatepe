import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  category: z.enum(["complaint", "suggestion"], {
    required_error: "Kategori seçimi zorunludur",
  }),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

// Rate limiting (örnek: 5 istek / 15 dk)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 5) {
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
    const validatedData = feedbackSchema.parse(body);

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
      to: process.env.GMAIL_USER,
      subject: `Yeni Geri Bildirim (${validatedData.category === "complaint" ? "Şikayet" : "Öneri"})`,
      text: `
Ad Soyad: ${validatedData.name}
E-posta: ${validatedData.email}
Telefon: ${validatedData.phone}
Kategori: ${validatedData.category === "complaint" ? "Şikayet" : "Öneri"}

Mesaj:
${validatedData.message}
      `,
    });

    return NextResponse.json(
      { message: "Geri bildiriminiz başarıyla gönderildi ✅" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Feedback form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Form verilerinde hata var. Lütfen kontrol ediniz." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Geri bildirim gönderilirken bir hata oluştu ❌" },
      { status: 500 }
    );
  }
}