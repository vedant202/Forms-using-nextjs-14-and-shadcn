import { z } from "zod";

export const schema = z.object({
    first:z.string()
    .trim()
    .min(1,{message:"first name is required",})
    .refine((value)=>/^[a-zA-Z]+$/.test(value ?? ""),"Please enter valid first"),

    last:z.string().trim().min(1,{message:"Last Name is required",}),

    email: z.string().trim().email({
        message: "Invalid email address.",
      }),
})
