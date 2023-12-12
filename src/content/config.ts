import { defineCollection, z } from "astro:content";

const skillsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  skills: skillsCollection,
};
