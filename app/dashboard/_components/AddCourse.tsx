"use client"

import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

// Form validation schema
const courseFormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }).min(1, "Please select a language."),
  age: z.string()
    .min(1, "Please enter your age.")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 5 && Number(val) <= 100, {
      message: "Age must be between 5 and 100.",
    }),
  subject: z.string({
    required_error: "Please select a subject.",
  }).min(1, "Please select a subject."),
})

type CourseFormValues = z.infer<typeof courseFormSchema>

// Sample data for dropdowns
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

const subjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "literature", label: "Literature" },
  { value: "programming", label: "Programming" },
  { value: "art", label: "Art & Design" },
  { value: "music", label: "Music" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
]

function AddCourse() {
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const totalSteps = 1 // Currently we have 1 step, can be expanded later

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      language: "",
      age: "",
      subject: "",
    },
  })

  const onSubmit = async (data: CourseFormValues) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
    setIsSubmitted(true)
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Course Created Successfully!</h3>
                <p className="text-muted-foreground">
                  Your new course has been added to your dashboard. You can now start adding content and materials.
                </p>
              </div>
              <Button 
                onClick={() => {
                  setIsSubmitted(false)
                  form.reset()
                  setCurrentStep(1)
                }}
                className="w-full"
              >
                Create Another Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Add a New Course</h2>
        <p className="text-muted-foreground mt-2">
          Welcome, {user?.firstName || 'Student'}! Fill in the details below to create a new course.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Course Details</CardTitle>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <CardDescription>
            Select your preferred language, age, and subject for the course
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Step 1: Language, Age, and Subject */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Language Selection */}
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a language" />
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
                        <FormDescription>
                          Choose the language in which the course will be taught
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Age Input */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter your age" 
                            {...field}
                            min="5"
                            max="100"
                          />
                        </FormControl>
                        <FormDescription>
                          Your age helps us tailor the course content appropriately
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject Selection */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.value} value={subject.value}>
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the subject area for this course
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button type="submit">
                  Create Course
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default AddCourse
