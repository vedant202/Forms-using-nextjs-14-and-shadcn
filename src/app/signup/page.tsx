"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SignupSchema } from './SignupSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import serverHandleSubmit from './serverHandleSubmit';
import { useFormState, useFormStatus } from 'react-dom';

export default function page() {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      ConfirmPassord: "",
      companyName: "",
    },
  })

  const accountType = form.watch("accountType");
  const formRef = useRef<HTMLFormElement>(null);
  


  const handleSubmit = async (formData: z.infer<typeof SignupSchema>) => {
    const resp=await serverHandleSubmit(formData);
    console.log(resp)
    form.reset({
      email: "",
      password: "",
      companyName: "",
      ConfirmPassord: "",
      ...(resp?.fields ?? {}) 
    })
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-96">
        <h1 className='text-xl'>Signup Form using Next 14 app router and shadcn</h1>
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField control={form.control} name='email' render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder='Enter email' {...field}></Input>
            </FormControl>
            <FormMessage />
          </FormItem>

        )} />

        <FormField control={form.control} name='accountType'

          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>

                  <SelectTrigger>
                    <SelectValue placeholder="Select an Account Type"></SelectValue>
                  </SelectTrigger>

                </FormControl>
                <SelectContent>
                  <SelectItem value="personal">personal</SelectItem>
                  <SelectItem value="company">company</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}

        />

        {
          accountType === "company" && (<FormField control={form.control} name='companyName' render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter Company name' {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>

          )} />)
        }

{/* For confirm passord field */}
        <FormField control={form.control} name='password' render={({ field }) => (
          <FormItem>
            <FormLabel>password</FormLabel>
            <FormControl>
              <Input type='password' placeholder='Enter Password' {...field}></Input>
            </FormControl>
            <FormMessage />
          </FormItem>

        )} />
{/* Same as above for confirm passord field */}
<FormField control={form.control} name='ConfirmPassord' render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder='Enter Confirm Password' {...field}></Input>
            </FormControl>
            <FormMessage />
          </FormItem>

        )} />

        <Button className='w-full' type='submit'>submit</Button>

      </form>
    </Form>
    </div>
    </div>
  )
}
