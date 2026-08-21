import { z } from "zod";

export const createLinkSchema = z.object({
  original_url: z
    .string()
    .url("Invalid URL format")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL MUST use http or https",
    ),

  slug: z.string().optional(),
});
