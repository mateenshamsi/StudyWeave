import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { buildCurriculumPrompt, CurriculumData } from '@/app/lib/aiPrompts'

export async function POST(request: NextRequest) {
  try {
    const data: CurriculumData = await request.json()

    // Basic validation
    if (
      !data.topic ||
      !data.readingLevel ||
      !data.age ||
      !data.language ||
      !data.learningStyle
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const prompt = buildCurriculumPrompt(data)

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      config: {
        temperature: 0.3, // LOWER = more structured
        maxOutputTokens: 4096,
      },
    })

    // ✅ Correct way to read text
    const generatedText =
  response.candidates?.[0]?.content?.parts
    ?.map((part: any) => part.text || '')
    .join('') || ''


    // Cleanup
    const cleanedText = generatedText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    let curriculum
    try {
      curriculum = JSON.parse(cleanedText)
    } catch (err) {
      console.error('AI RAW OUTPUT:', generatedText)
      return NextResponse.json(
        { error: 'Invalid AI JSON output' },
        { status: 500 }
      )
    }

    // (Optional but HIGHLY recommended)
    if (!curriculum.modules || !Array.isArray(curriculum.modules)) {
      return NextResponse.json(
        { error: 'Invalid curriculum structure' },
        { status: 500 }
      )
    }

    return NextResponse.json({ curriculum })

  } catch (error) {
    console.error('Curriculum Generation Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate curriculum' },
      { status: 500 }
    )
  }
}
