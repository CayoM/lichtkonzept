import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    kind: z.enum(['privat', 'gewerbe']),
    year: z.number().int().min(1990).max(2100),
    summary: z.string().max(280),
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()).default([]),
    partners: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    portrait: z.string().optional(),
    initials: z.string().max(3),
    statement: z.string().max(160),
    placeholder: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { projects, team };
