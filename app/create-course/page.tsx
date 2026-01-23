"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Sparkles, PlayCircle, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Form validation schema
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
    console.log('Curriculum form submitted:', data)
    // Handle form submission
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        className={`h-16 px-6 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                          field.value === "visual"
                            ? 'border-teal-primary bg-teal-light'
                            : 'border-border bg-background hover:bg-muted'
                        }`}
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
                        className={`h-16 px-6 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                          field.value === "textbook"
                            ? 'border-teal-primary bg-teal-light'
                            : 'border-border bg-background hover:bg-muted'
                        }`}
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
              className="w-full h-14 text-base font-semibold rounded-xl hover:opacity-90"
              style={{ backgroundColor: 'var(--teal-primary)', color: 'white' }}
            >
              Generate Curriculum
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCourse
