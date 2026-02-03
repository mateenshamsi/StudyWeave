import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  varchar,
} from 'drizzle-orm/pg-core'

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),

  topic: varchar('topic', { length: 255 }).notNull(),
  learningStyle: varchar('learning_style', { length: 20 }).notNull(),

  age: integer('age').notNull(),
  readingLevel: varchar('reading_level', { length: 50 }).notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  priorKnowledge: text('prior_knowledge'),
  includeVideo: varchar('include_video', { length: 5 }).notNull().default('No'),
  curriculum: jsonb('curriculum').notNull(),
   createdBy:varchar('created_by',{length:255}).notNull(),
   userName :varchar('username',{length:255}).notNull(),
   userProfileImage : varchar('userProfileImage',{length:255}),
})
