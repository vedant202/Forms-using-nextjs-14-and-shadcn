"use client";
import {FormField,FormItem
    ,FormLabel,FormControl,
    FormDescription,
    FormMessage} from "@/components/ui/form";
    import {Input} from "@/components/ui/input";
    import {useForm} from "react-hook-form";
    import { z } from "zod";
    import { X } from "lucide-react";
    import { zodResolver } from "@hookform/resolvers/zod";
    import {schema} from "./formSchema";
    import { Form } from "@/components/ui/form";
    import { Button } from "@/components/ui/button";
    import { onSubmitAction } from "./formSubmit";
    import { useFormState } from "react-dom";
    import { useRef } from "react";
    

export default function MailForm() {
    const [state,formAction]=useFormState(onSubmitAction,{
        message:"",
      });
    
      const form = useForm<z.output<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          first: "",
          last: "",
          email: "",
          ...(state?.fields ?? {}),
        },
      });
      
    
    
      const formRef = useRef<HTMLFormElement>(null);
    

  return (
    <Form {...form} >

        {state.message!="" && !state.issues && (<div className="text-red-500"><X fill="red"/>{state.message}</div>)}

        {state?.issues && (
          <div className="text-red-500">
            <ul>
              {
                state.issues.map((issue)=>(
                  <li key={issue} className="flex gap-1">
                    <X fill="red"/>
                    {issue}
                  </li>
                ))
              }

            </ul>

          </div>
        )}

        <form className="space-y-8"
        ref={formRef}
        action={formAction}
        onSubmit={(evt)=>{
          evt.preventDefault();
          console.log("evt",evt)
          form.handleSubmit(()=>{
            formRef.current?.submit();
          })(evt);
        }
        }
        >
          <div className="flex gap-2">
          <FormField 
          name="first"
          control={form.control}
          render={
            ({field})=>(
              
              <FormItem>
        <FormLabel >First Name</FormLabel>
        <FormControl >
          <Input placeholder=""{...field} />
        </FormControl>
        <FormDescription >Your First name</FormDescription>
        <FormMessage />
      </FormItem>
            )
          }
           />


<FormField 
          name="last"
          control={form.control}
          render={
            ({field})=>(
              
              <FormItem>
        <FormLabel >Last Name</FormLabel>
        <FormControl >
          <Input placeholder=""{...field} />
        </FormControl>
        <FormDescription >Your Last name</FormDescription>
        <FormMessage />
      </FormItem>
            )
          }
           />

</div>
      
      <FormField 
          name="email"
          control={form.control}
          render={
            ({field})=>(
              
              <FormItem>
        <FormLabel >Email</FormLabel>
        <FormControl >
          <Input placeholder=""{...field} />
        </FormControl>
        <FormDescription >Enter Your email</FormDescription>
        <FormMessage />
      </FormItem>
            )
          }
           />


          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )
}
