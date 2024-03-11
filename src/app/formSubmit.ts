"use server";

import { schema } from "./formSchema";

export type FormState = {
    message:string,
    fields?:Record<string,string>,
    issues?:string[]
}

export async function onSubmitAction(prevState:FormState,data:FormData):Promise<FormState> {
    console.log("PrevState :- ",prevState);
    console.log("FormData :- ",data);
    
    const formData = Object.fromEntries(data);
    const parsed = schema.safeParse(formData);

    console.log("FormData Converted into Object:- ",formData);
    console.log("Zod Parsed FormData :- ",parsed);

    if(!parsed.success){
        const fields:Record<string,string>={}

        for(const key of Object.keys(formData)){
            fields[key] = formData[key].toString();
        }

        return {
            message:"Invalid form data",
            fields:fields,
            issues:parsed.error.issues.map(i=>i.message)
        };
    }

    if(!formData?.email.toString().includes(".com")){
        return {
            message:"Invalid email and An email must include .com",
            fields:parsed.data
        }
    }

    return { message: "User registered" };
}
