import { z } from "zod";

export const NewMuseumSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string().min(10).max(255).optional(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});
