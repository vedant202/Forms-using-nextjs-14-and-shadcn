### Shadcn forms
#### 1.Install form component from shadcn
npx shadcn-ui@latest add form

#### 2.Define the shape of your form using a Zod schema. You can read more about using Zod
   

export  const SignupSchema=z.object({

email:z.string().email({message:"email is required"}).trim(),

accountType:z.enum(["personal","company"]),

companyName:z.string().trim().optional(),

password: z.string().trim().min(4).max(20),

ConfirmPassord:z.string().trim().min(4).max(20),

  

}).refine((data)=>{

return data.password===data.ConfirmPassord;

},{

message:"Passwords doesn't match",

path:["ConfirmPassord"]

}).refine((data)=>{

if(data.accountType==="company"){

console.log("checking zod ",!!data.companyName)

return !!data.companyName;

}

return  true;

},{

message:"Enter company name",

path:["companyName"]

});

### 3. Define a form

Use the  `useForm`  hook from  `react-hook-form`  to create a form.
    
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
}

#### 4. Build your form
const form = useForm()

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} />
      </FormControl>
      <FormDescription>This is your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>





