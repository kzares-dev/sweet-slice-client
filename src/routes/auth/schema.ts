import { z } from "zod";

export const formSchema = z.object({
    password: z.string().min(2).max(50),
    email: z.string().email(),
});

export type FormSchema = typeof formSchema;