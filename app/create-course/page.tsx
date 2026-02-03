"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Sparkles, PlayCircle, BookOpen, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { saveLayoutInDb } from '@/app/actions/courseActions'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from "uuid";

const curriculumFormSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  readingLevel: z.string().min(1, "Please select a reading level."),
  age: z.string()
    .min(1, "Please enter your age.")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 5 && Number(val) <= 100, {
      message: "Age must be between 5 and 100.",
    }),
  language: z.string().min(1, "Please select a language."),
  priorKnowledge: z.string().optional(),
  learningStyle: z.enum(["visual", "textbook"]),
})

type CurriculumFormValues = z.infer<typeof curriculumFormSchema>

interface Lesson {
  lessonTitle: string
  lessonDescription: string
  estimatedVideoDuration?: number
  videoSearchIntent?: string
  estimatedReadingTime?: number
}

interface Module {
  moduleTitle: string
  moduleDescription: string
  lessons: Lesson[]
}

export interface GeneratedCurriculum {
  courseTitle: string
  courseDescription: string
  learningStyle: string
  modules: Module[]
}

// Options data
const readingLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
]

const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "mandarin", label: "Mandarin Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "italian", label: "Italian" },
  { value: "arabic", label: "Arabic" },
]

function CreateCourse() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [curriculum, setCurriculum] = useState<GeneratedCurriculum | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const router = useRouter()
  const id = uuidv4();

  const form = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumFormSchema),
    defaultValues: {
      topic: "",
      readingLevel: "",
      age: "",
      language: "",
      priorKnowledge: "",
      learningStyle: "visual",
    },
  })

  const onSubmit = async (data: CurriculumFormValues) => {
    setIsGenerating(true)
    setError(null)
    setCurriculum(null)

    try {
      const response = await fetch('/api/generate-curriculum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate curriculum')
      }

      setCurriculum(result.curriculum)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error generating curriculum:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const resetForm = () => {
    setCurriculum(null)
    setError(null)
    setSaveSuccess(false)
    form.reset()
  }

  const handleSave = async () => {
    if (!curriculum) return

    setIsSaving(true)
    setError(null)

    try {
      const courseData = {
        topic: form.getValues('topic'),
        readingLevel: form.getValues('readingLevel'),
        age: form.getValues('age'),
        language: form.getValues('language'),
        priorKnowledge: form.getValues('priorKnowledge'),
        learningStyle: form.getValues('learningStyle'),
        curriculum,
      }

      await saveLayoutInDb(courseData)
      setSaveSuccess(true)
      router.replace( '/create-course/'+id )

    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save course')
      console.error('Error saving course:', err)
    } finally {
      setIsSaving(false)
    }
  }

  // Show generated curriculum
  if (curriculum) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-light">
              <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--teal-primary)' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Curriculum Generated!</h1>
              <p className="text-muted-foreground mt-1">Your personalized course is ready</p>
            </div>
          </div>

          {/* Curriculum Display */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{curriculum.courseTitle}</CardTitle>
              <CardDescription className="text-base">{curriculum.courseDescription}</CardDescription>
              <div className="flex gap-2 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-light" style={{ color: 'var(--teal-primary)' }}>
                  {curriculum.learningStyle === "visual" ? "📹 Video Learning" : "📖 Reading"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {curriculum.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-semibold mb-2">
                    Module {moduleIndex + 1}: {module.moduleTitle}
                  </h3>
                  <p className="text-muted-foreground mb-4">{module.moduleDescription}</p>
                  
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lessonIndex} 
                        className="p-4 rounded-lg border border-border bg-muted/30"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">
                              Lesson {lessonIndex + 1}: {lesson.lessonTitle}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {lesson.lessonDescription}
                            </p>
                            {lesson.videoSearchIntent && (
                              <p className="text-xs text-muted-foreground">
                                🔍 Video keywords: {lesson.videoSearchIntent}
                              </p>
                            )}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {lesson.estimatedVideoDuration && (
                              <span className="text-xs font-medium text-muted-foreground">
                                ⏱️ {lesson.estimatedVideoDuration} min
                              </span>
                            )}
                            {lesson.estimatedReadingTime && (
                              <span className="text-xs font-medium text-muted-foreground">
                                📚 {lesson.estimatedReadingTime} min
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={resetForm}
              variant="outline"
              className="flex-1"
              disabled={isSaving}
            >
              Create Another Course
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || saveSuccess}
              className="flex-1 hover:opacity-90"
              style={{ backgroundColor: 'var(--teal-primary)', color: 'white' }}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Saved Successfully!
                </>
              ) : isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save to Dashboard'
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-light">
            <Sparkles className="w-6 h-6" style={{ color: 'var(--teal-primary)' }} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create New Curriculum</h1>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive font-medium">❌ {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Topic Input */}
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Topic
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Astrophysics, Roman History..."
                      {...field}
                      className="h-14 bg-teal-light/40 border-teal-light text-base"
                      disabled={isGenerating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reading Level */}
            <FormField
              control={form.control}
              name="readingLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Reading Level
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isGenerating}
                  >
                    <FormControl>
                      <SelectTrigger className="h-14 bg-teal-light/40 border-teal-light text-base">
                        <SelectValue placeholder="Select reading level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {readingLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age and Language Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Input */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="17"
                        {...field}
                        min="5"
                        max="100"
                        className="h-14 bg-teal-light/40 border-teal-light text-base text-center"
                        disabled={isGenerating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Language Select */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Language
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isGenerating}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 bg-teal-light/40 border-teal-light text-base">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Prior Knowledge */}
            <FormField
              control={form.control}
              name="priorKnowledge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Prior Knowledge
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional..."
                      {...field}
                      className="h-14 bg-teal-light/40 border-teal-light text-base"
                      disabled={isGenerating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Learning Style */}
            <FormField
              control={form.control}
              name="learningStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Learning Style
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Visual/Video Option */}
                      <button
                        type="button"
                        onClick={() => field.onChange("visual")}
                        disabled={isGenerating}
                        className={`h-16 px-6 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                          field.value === "visual"
                            ? 'border-teal-primary bg-teal-light'
                            : 'border-border bg-background hover:bg-muted'
                        } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <PlayCircle 
                          className="w-5 h-5" 
                          style={{ color: field.value === "visual" ? 'var(--teal-primary)' : 'currentColor' }}
                        />
                        <span 
                          className="font-medium text-base"
                          style={{ color: field.value === "visual" ? 'var(--teal-primary)' : 'currentColor' }}
                        >
                          Visual (Video)
                        </span>
                      </button>

                      {/* Textbook/Read Option */}
                      <button
                        type="button"
                        onClick={() => field.onChange("textbook")}
                        disabled={isGenerating}
                        className={`h-16 px-6 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                          field.value === "textbook"
                            ? 'border-teal-primary bg-teal-light'
                            : 'border-border bg-background hover:bg-muted'
                        } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <BookOpen 
                          className="w-5 h-5" 
                          style={{ color: field.value === "textbook" ? 'var(--teal-primary)' : 'currentColor' }}
                        />
                        <span 
                          className="font-medium text-base"
                          style={{ color: field.value === "textbook" ? 'var(--teal-primary)' : 'currentColor' }}
                        >
                          Textbook (Read)
                        </span>
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full h-14 text-base font-semibold rounded-xl hover:opacity-90"
              style={{ backgroundColor: 'var(--teal-primary)', color: 'white' }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Curriculum...
                </>
              ) : (
                'Generate Curriculum'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCourse
