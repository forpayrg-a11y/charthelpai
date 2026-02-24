import { NextRequest, NextResponse } from "next/server";
import { analyzeChartImage } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import { rateLimit } from "@/lib/rate-limit";

// Maksimum dosya boyutu: 4.5 MB (Yapay zeka modelleri için güvenli sınır)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        // 1. Rate Limiting (Kullanıcı giriş yapmadıysa IP'den engelle)
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
        const identifier = userId || ip;

        const { success } = await rateLimit.limit(identifier);

        if (!success) {
            return NextResponse.json(
                { error: "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin." },
                { status: 429 }
            );
        }

        // 2. Dosya Alma ve Güvenlik Kontrolleri
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Lütfen bir grafik görseli yükleyin." }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `Dosya boyutu çok büyük. Maksimum ${MAX_FILE_SIZE / (1024 * 1024)}MB yükleyebilirsiniz.` },
                { status: 400 }
            );
        }

        // 3. Yapay Zeka İşlemi
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await analyzeChartImage(buffer, file.type);

        // 4. Veritabanı Kaydı
        if (userId) {
            try {
                await connectToDatabase();
                await Analysis.create({
                    userId,
                    asset: result.asset,
                    timeframe: result.timeframe,
                    sentiment: result.sentiment,
                    confidence: result.confidence,
                    volatility: result.volatility,
                    trendAlignment: result.trendAlignment,
                    patterns: result.patterns,
                    // Mapping levels back to support/resistance for your DB
                    supportZones: result.levels?.entry !== "N/A" ? [result.levels.entry] : [],
                    resistanceZones: result.levels?.tp || [],
                    description: result.description,
                    riskScore: result.riskScore,
                });
            } catch (dbError) {
                // DB çökse bile kullanıcı analiz sonucunu ekranda görecek
                console.error("Veritabanı kayıt hatası:", dbError);
            }
        }

        // Başarılı sonucu Frontend'e gönder
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("AI Analiz Hatası:", error);
        return NextResponse.json(
            { error: "Grafik analiz edilemedi: " + (error.message || "Bilinmeyen bir hata oluştu.") },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: "Analiz servisi aktif. Lütfen POST isteği atın." });
}