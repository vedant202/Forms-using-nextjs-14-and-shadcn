"use server"

import React from 'react'
import { SignupSchema } from './SignupSchema'
import {SafeParseReturnType, z} from 'zod'

export type FormState = {
    message:string,
    fields?:Record<string,string>,
    issues?:string[]
}

export default async function serverHandleSubmit(data:unknown):Promise<FormState> {
  const formData = data as object;
  console.log("formData ",formData);
  
  const parsed = SignupSchema.safeParse(formData);
  console.log("parsed ",parsed)
  if(!parsed.success){
    const fields:Record<string,string>={};
    for(const key of Object.keys(data as object)){
        fields[key] = data[key];
    }
    

    return {
        message:"Invalid Form Data",
        issues:parsed.error.issues.map(i=>i.message),
        fields:fields
    }
  }

  let email:string = parsed.data.email;
  
  return{

    message:"Success",
  }
}

