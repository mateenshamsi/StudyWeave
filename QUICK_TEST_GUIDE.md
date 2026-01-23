# 🧪 Quick Test Guide - Curriculum Generator

## Your Setup is Complete! ✅

Since your `GEMINI_API_KEY` is already in your `.env` file, you're ready to generate curricula.

## Manual Testing Steps

### 1. Open the Form
Navigate to: **http://localhost:3000/create-course**

### 2. Fill Out a Sample Request

**Example Test Data:**
- **Topic**: `Machine Learning Basics`
- **Reading Level**: `Intermediate`
- **Age**: `25`
- **Language**: `English`
- **Prior Knowledge**: `Basic programming knowledge`
- **Learning Style**: Click on `Visual (Video)` button

### 3. Click "Generate Curriculum"

You should see:
1. ⏳ Loading spinner with "Generating Curriculum..." text
2. ⏱️ Wait 5-15 seconds for AI generation
3. ✅ Success screen with your curriculum!

## Expected Output

The AI will generate something like:

```
📚 Course Title: Introduction to Machine Learning

📝 Description: A comprehensive course covering fundamental ML concepts...

🎯 Learning Style: Video Learning

📦 Module 1: Foundations of Machine Learning
   └─ Lesson 1: What is Machine Learning?
      ⏱️ 12 min | 🔍 Keywords: "machine learning introduction basics"
   └─ Lesson 2: Types of Machine Learning
      ⏱️ 15 min | 🔍 Keywords: "supervised unsupervised learning"

📦 Module 2: Core Algorithms
   └─ Lesson 1: Linear Regression
      ⏱️ 18 min | 🔍 Keywords: "linear regression explained"
   ...
```

## Try Different Scenarios

### Test 1: Video Learning Style
- Topic: "Quantum Physics"
- Style: Visual (Video)
- Expected: Lessons with video duration + search keywords

### Test 2: Reading Style
- Topic: "Roman History"  
- Style: Textbook (Read)
- Expected: Lessons with reading time estimates

### Test 3: Different Reading Levels
- Try `Beginner`, `Intermediate`, `Advanced`, `Expert`
- Notice how curriculum complexity changes

### Test 4: Different Ages
- Age 12: Simpler language
- Age 25: More technical terms
- Age 50: Different learning pace

## What to Check

✅ **Form Validation**
- Try submitting without required fields
- See error messages appear

✅ **Loading State**
- Button shows spinner
- Form fields are disabled
- "Generating Curriculum..." text appears

✅ **Error Handling**
- If API fails, you'll see error message
- Form remains functional to retry

✅ **Success Display**
- Beautiful card layout
- Modules and lessons clearly organized
- Time estimates visible
- Video keywords (for video style)
- "Create Another Course" button works

## Troubleshooting

### ⚠️ "API key not configured"
```bash
# Make sure your .env or .env.local has:
GEMINI_API_KEY=your_actual_key_here

# Then restart the server:
bun run dev
```

### ⚠️ Request takes too long
- Normal for first request (cold start)
- Complex topics take 10-15 seconds
- Simple topics: 5-10 seconds

### ⚠️ JSON Parse Error
- AI might return non-JSON sometimes
- Click "Create Another Course" and try again
- Consider adjusting the prompt in `app/lib/aiPrompts.ts`

## Console Debugging

Open browser DevTools (F12) and check:

1. **Console Tab**: Look for any errors
2. **Network Tab**: Check `/api/generate-curriculum` request
3. **Response**: View the actual AI output

## Next Features to Add

Once testing is successful:
1. 🗄️ Save curricula to database
2. 📋 View curriculum history
3. 📤 Export as PDF
4. 🔗 Share via link
5. ✏️ Edit generated curricula
6. ⭐ Favorite/bookmark courses

---

**🚀 Start testing now at http://localhost:3000/create-course**
