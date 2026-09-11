import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const episodes = pgTable('episodes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  synopsis: text('synopsis'),
  releaseDate: text('release_date'),
  thumbnail: text('thumbnail'),
  videoUrl: text('video_url'),
  duration: text('duration'),
  featured: boolean('featured').default(false),
});

export const characters = pgTable('characters', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  image: text('image'),
  funFacts: text('fun_facts').array(),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  snippet: text('snippet'),
  content: text('content'),
  date: text('date'),
  author: text('author'),
  image: text('image'),
});

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});