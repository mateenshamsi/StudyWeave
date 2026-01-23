# Curriculum Generator Setup Guide

## 🎉 What's Been Implemented

Your AI-powered curriculum generator is now ready! When a user fills out the form and clicks "Generate Curriculum," the system will:

1. ✅ Collect all form data (topic, reading level, age, language, prior knowledge, learning style)
2. ✅ Build a specialized AI prompt using your requirements
3. ✅ Call Google's Gemini AI API
4. ✅ Parse the JSON response
5. ✅ Display a beautiful, structured curriculum with modules and lessons

## 📁 Files Created

### 1. **app/lib/aiPrompts.ts**
Contains the `buildCurriculumPrompt()` function that formats your AI prompt with user input.

### 2. **app/api/generate-curriculum/route.ts**
API endpoint that:
- Receives form data
- Calls Gemini AI
- Handles errors
- Returns structured curriculum JSON

### 3. **app/create-course/page.tsx** (Updated)
The complete form with:
- Loading states (spinner animation)
- Error handling
- Results display with modules and lessons
- Reset functionality

## 🔐 Required: Setup Your Gemini API Key

### Step 1: Get Your API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Step 2: Add to Environment Variables
Create a `.env.local` file in the root directory:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Restart Your Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
bun run dev
```

## 🧪 Testing the Generator

1. Navigate to: `http://localhost:3000/create-course`
2. Fill out the form:
   - **Topic**: "Quantum Physics"
   - **Reading Level**: "Intermediate"
   - **Age**: "17"
   - **Language**: "English"
   - **Prior Knowledge**: "Basic physics and mathematics"
   - **Learning Style**: Select either "Visual (Video)" or "Textbook (Read)"
3. Click "Generate Curriculum"
4. Wait 5-10 seconds for AI generation
5. View your personalized curriculum!

## 📋 Generated Curriculum Structure

The AI generates JSON with this structure:

```json
{
  "courseTitle": "Introduction to Quantum Physics",
  "courseDescription": "A comprehensive course...",
  "learningStyle": "visual",
  "modules": [
    {
      "moduleTitle": "Foundations of Quantum Mechanics",
      "moduleDescription": "Understanding the basics...",
      "lessons": [
        {
          "lessonTitle": "Wave-Particle Duality",
          "lessonDescription": "Exploring the dual nature...",
          "estimatedVideoDuration": 15,
          "videoSearchIntent": "wave particle duality quantum physics"
        }
      ]
    }
  ]
}
```

## 🎨 UI Features

### Form View
- ✅ Teal brand colors matching your logo
- ✅ Disabled inputs during generation
- ✅ Loading spinner with "Generating Curriculum..." text
- ✅ Error messages if generation fails

### Results View
- ✅ Success header with checkmark
- ✅ Course title and description
- ✅ Learning style badge
- ✅ Expandable modules and lessons
- ✅ Time estimates for each lesson
- ✅ Video search keywords (for video learning style)
- ✅ "Create Another Course" button
- ✅ "Save to Dashboard" button (ready for integration)

## 🛠️ Customization

### Modify AI Behavior
Edit `app/lib/aiPrompts.ts` to adjust the prompt:
- Change the AI's personality
- Add more rules
- Modify output format
- Add new fields

### Change AI Model
Edit `app/api/generate-curriculum/route.ts`, line 30:
```typescript
const model = 'gemini-2.0-flash-exp' // Change this
```

Available models:
- `gemini-2.0-flash-exp` - Fast, good balance
- `gemini-1.5-pro` - More accurate, slower
- `gemini-1.5-flash` - Fastest, less detailed

### Adjust Temperature
Edit `app/api/generate-curriculum/route.ts`, line 40:
```typescript
temperature: 0.7, // Lower = more consistent, Higher = more creative
```

## 🚀 Next Steps

1. **Save to Database**: Implement the "Save to Dashboard" button
2. **User Authentication**: Connect with Clerk auth
3. **History**: Show previously generated curricula
4. **Export**: Add PDF/Word export functionality
5. **Sharing**: Allow users to share curricula via link

## 🐛 Troubleshooting

### Error: "API key not configured"
- Make sure `.env.local` file exists in root directory
- Verify the key is named exactly: `GEMINI_API_KEY`
- Restart your dev server

### Error: "Failed to generate curriculum"
- Check your internet connection
- Verify your API key is valid
- Check console logs for details

### Slow Generation
- Normal for complex topics (5-15 seconds)
- Consider using `gemini-2.0-flash-exp` for faster results

## 📞 Support

If you need help:
1. Check the browser console for error messages
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Make sure your API key has usage quota remaining

---

**🎓 Your AI curriculum generator is ready to use!**
