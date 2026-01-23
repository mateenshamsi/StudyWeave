export interface CurriculumData {
  topic: string
  readingLevel: string
  age: string
  language: string
  priorKnowledge?: string
  learningStyle: "visual" | "textbook"
}

export function buildCurriculumPrompt(data: CurriculumData): string {
  return `
You are an expert curriculum architect.

User Inputs:
Topic: ${data.topic}
Reading Level: ${data.readingLevel}
Age: ${data.age}
Language: ${data.language}
Prior Knowledge: ${data.priorKnowledge || 'None specified'}
Learning Style: ${data.learningStyle}

Rules:
- Do NOT generate explanations
- Do NOT generate video links
- Focus only on structure
- Output valid JSON ONLY
- No markdown, no extra text

If Learning Style is "visual":
- Include estimatedVideoDuration (in minutes)
- Include videoSearchIntent (keywords to search for videos)

If Learning Style is "textbook":
- Include estimatedReadingTime (in minutes)

Return JSON with this exact structure:
{
  "courseTitle": "string",
  "courseDescription": "string",
  "learningStyle": "visual" | "textbook",
  "modules": [
    {
      "moduleTitle": "string",
      "moduleDescription": "string",
      "lessons": [
        {
          "lessonTitle": "string",
          "lessonDescription": "string",
          ${data.learningStyle === "visual" 
            ? '"estimatedVideoDuration": number, "videoSearchIntent": "string"'
            : '"estimatedReadingTime": number'
          }
        }
      ]
    }
  ]
}
`.trim()
}
